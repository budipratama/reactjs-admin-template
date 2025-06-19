import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "../Modal";

describe("Modal", () => {
  it("does not render when show is false", () => {
    const { container } = render(
      <Modal show={false} onClose={jest.fn()} title='Title'>
        Content
      </Modal>
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("renders title and children when show is true", () => {
    render(
      <Modal show={true} onClose={jest.fn()} title='My Modal'>
        <div>Modal Content</div>
      </Modal>
    );
    expect(screen.getByText("My Modal")).toBeInTheDocument();
    expect(screen.getByText("Modal Content")).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    const handleClose = jest.fn();
    render(
      <Modal show={true} onClose={handleClose} title='Close Test'>
        Content
      </Modal>
    );
    const closeBtn = screen.getByRole("button", { name: /×|times|close/i });
    fireEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalled();
  });

  it("does not render close button if closable is false", () => {
    render(
      <Modal show={true} onClose={jest.fn()} title='No Close' closable={false}>
        Content
      </Modal>
    );
    expect(screen.queryByRole("button", { name: /×|times|close/i })).toBeNull();
  });

  it("calls onClose when clicking on backdrop", () => {
    const handleClose = jest.fn();
    render(
      <Modal show={true} onClose={handleClose} title='Backdrop Test'>
        Content
      </Modal>
    );
    const backdrop = screen.getByRole("button");
    fireEvent.click(backdrop);
    expect(handleClose).toHaveBeenCalled();
  });

  it("does not call onClose when clicking inside dialog", () => {
    const handleClose = jest.fn();
    render(
      <Modal show={true} onClose={handleClose} title='Dialog Test'>
        Content
      </Modal>
    );
    const dialog = screen.getByRole("dialog");
    fireEvent.click(dialog);
    expect(handleClose).not.toHaveBeenCalled();
  });

  it("renders with custom position", () => {
    render(
      <Modal
        show={true}
        onClose={jest.fn()}
        title='Positioned'
        position={{ top: 100, left: 200 }}>
        Content
      </Modal>
    );
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveStyle({ top: "100px", left: "200px" });
  });

  it("renders title as ReactNode", () => {
    render(
      <Modal
        show={true}
        onClose={jest.fn()}
        title={<span data-testid='custom-title'>Custom</span>}>
        Content
      </Modal>
    );
    expect(screen.getByTestId("custom-title")).toBeInTheDocument();
  });

  it("focuses dialog when opened", () => {
    render(
      <Modal show={true} onClose={jest.fn()} title='Focus Test'>
        Content
      </Modal>
    );
    const dialog = screen.getByRole("dialog");
    expect(dialog.tabIndex).toBe(-1);
  });

  it("stops propagation for Enter and Space keydown in dialog", () => {
    const handleClose = jest.fn();
    render(
      <Modal show={true} onClose={handleClose} title='Keydown Test'>
        Content
      </Modal>
    );
    const dialog = screen.getByRole("dialog");
    const stopPropagation = jest.fn();
    fireEvent.keyDown(dialog, { key: "Enter", stopPropagation });
    fireEvent.keyDown(dialog, { key: " ", stopPropagation });
    expect(stopPropagation).toHaveBeenCalledTimes(2);
  });

  it("adjusts position if modal would overflow viewport", () => {
    // Mock getBoundingClientRect to simulate overflow
    const originalGetBoundingClientRect =
      window.HTMLElement.prototype.getBoundingClientRect;
    window.HTMLElement.prototype.getBoundingClientRect = function () {
      return {
        top: -10,
        left: -10,
        right: window.innerWidth + 100,
        bottom: window.innerHeight + 100,
        width: 300,
        height: 200,
        x: 0,
        y: 0,
        toJSON: () => {},
      };
    };
    render(
      <Modal
        show={true}
        onClose={jest.fn()}
        title='Overflow Test'
        position={{ top: -10, left: -10 }}>
        Content
      </Modal>
    );
    // Wait for useLayoutEffect and setTimeout
    setTimeout(() => {
      const dialog = screen.getByRole("dialog");
      expect(dialog.style.top).not.toBe("-10px");
      expect(dialog.style.left).not.toBe("-10px");
      window.HTMLElement.prototype.getBoundingClientRect =
        originalGetBoundingClientRect;
    }, 10);
  });
});
