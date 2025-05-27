import { ReactNode, CSSProperties } from "react";
import "../styles/components/_modal.scss";

interface ModalProps {
  show: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  position?: { top: number; left: number };
}

const Modal = ({ show, onClose, title, children, position }: ModalProps) => {
  if (!show) return null;

  const dialogStyle: CSSProperties = position
    ? {
        position: "absolute",
        top: position.top,
        left: position.left,
        transform: "none",
        minWidth: 0,
        maxWidth: "none",
      }
    : {};
  const backdropStyle: CSSProperties = position
    ? { background: "none", pointerEvents: "auto" }
    : {};

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only close if click is on the backdrop, not on the dialog
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className='modal__backdrop'
      style={backdropStyle}
      onClick={handleBackdropClick}>
      <div
        className='modal__dialog'
        style={dialogStyle}
        onClick={(e) => e.stopPropagation()}>
        <div className='modal__header'>
          {title && <h5 className='modal__title'>{title}</h5>}
          <button className='modal__close' onClick={onClose}>
            &times;
          </button>
        </div>
        <div className='modal__body'>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
