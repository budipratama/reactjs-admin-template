import { createContext, useContext, useState, ReactNode } from "react";
import Modal from "../components/Modal";
import { useMemo } from "react";

interface ModalContextType {
  show: boolean;
  content: ReactNode;
  title?: ReactNode; // ubah dari string ke ReactNode
  position?: { top: number; left?: number; right?: number };
  closable?: boolean;
  openModal: (
    content: ReactNode,
    options?: {
      title?: ReactNode; // ubah dari string ke ReactNode
      position?: { top: number; left?: number; right?: number };
      closable?: boolean;
    }
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
  const [title, setTitle] = useState<ReactNode | undefined>(undefined); // ubah dari string ke ReactNode
  const [position, setPosition] = useState<
    { top: number; left?: number; right?: number } | undefined
  >();
  const [closable, setClosable] = useState<boolean | undefined>(true);

  const openModal = (
    modalContent: ReactNode,
    options?: {
      title?: ReactNode; // ubah dari string ke ReactNode
      position?: { top: number; left?: number; right?: number };
      closable?: boolean;
    }
  ) => {
    setContent(modalContent);
    setTitle(options?.title);
    setPosition(options?.position);
    setClosable(options?.closable);
    setShow(true);
  };
  const closeModal = () => {
    setShow(false);
    setContent(null);
    setTitle(undefined);
    setPosition(undefined);
    setClosable(true);
  };

  const contextValue = useMemo(
    () => ({ show, content, title, position, closable, openModal, closeModal }),
    [show, content, title, position, closable]
  );

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      <Modal
        show={show}
        onClose={closeModal}
        position={position}
        title={title}
        closable={closable}>
        {content}
      </Modal>
    </ModalContext.Provider>
  );
};
