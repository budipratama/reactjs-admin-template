import { createContext, useContext, useState, ReactNode } from "react";
import Modal from "../components/Modal";

interface ModalContextType {
  show: boolean;
  content: ReactNode;
  title?: string;
  position?: { top: number; left: number };
  openModal: (
    content: ReactNode,
    options?: { title?: string; position?: { top: number; left: number } }
  ) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used within ModalProvider");
  return ctx;
};

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [show, setShow] = useState(false);
  const [content, setContent] = useState<ReactNode>(null);
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [position, setPosition] = useState<
    { top: number; left: number } | undefined
  >();

  const openModal = (
    modalContent: ReactNode,
    options?: { title?: string; position?: { top: number; left: number } }
  ) => {
    setContent(modalContent);
    setTitle(options?.title);
    setPosition(options?.position);
    setShow(true);
  };
  const closeModal = () => {
    setShow(false);
    setContent(null);
    setTitle(undefined);
    setPosition(undefined);
  };

  return (
    <ModalContext.Provider
      value={{ show, content, title, position, openModal, closeModal }}>
      {children}
      <Modal
        show={show}
        onClose={closeModal}
        position={position}
        title={title || ""}>
        {content}
      </Modal>
    </ModalContext.Provider>
  );
};
