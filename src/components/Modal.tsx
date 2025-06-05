import {
  ReactNode,
  CSSProperties,
  useRef,
  useLayoutEffect,
  useState,
} from "react";
import "../styles/components/_modal.scss";

interface ModalProps {
  show: boolean;
  onClose: () => void;
  title?: ReactNode; // ubah dari string ke ReactNode
  children: ReactNode;
  position?: { top: number; left?: number; right?: number };
  closable?: boolean; // baru
}

const Modal = ({
  show,
  onClose,
  title,
  children,
  position,
  closable = true,
}: ModalProps) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [safePosition, setSafePosition] = useState<typeof position | undefined>(
    position
  );

  // Cek dan sesuaikan posisi modal agar tidak keluar viewport
  useLayoutEffect(() => {
    if (!show || !position) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    // Reset ke posisi awal
    setSafePosition(position);
    // Timeout agar style sudah ter-apply
    setTimeout(() => {
      const rect = dialog.getBoundingClientRect();
      let newTop = position.top;
      let newLeft = position.left ?? 0;
      let changed = false;
      // Jika keluar bawah viewport
      if (rect.bottom > window.innerHeight) {
        newTop = Math.max(window.innerHeight - rect.height - 16, 8); // 8px padding
        changed = true;
      }
      // Jika keluar kanan viewport
      if (rect.right > window.innerWidth) {
        newLeft = Math.max(window.innerWidth - rect.width - 16, 8);
        changed = true;
      }
      // Jika keluar kiri viewport
      if (rect.left < 0) {
        newLeft = 8;
        changed = true;
      }
      // Jika keluar atas viewport
      if (rect.top < 0) {
        newTop = 8;
        changed = true;
      }
      if (changed) {
        setSafePosition({ ...position, top: newTop, left: newLeft });
      }
    }, 0);
  }, [show, position]);

  if (!show) return null;

  const dialogStyle: CSSProperties = safePosition
    ? {
        position: "absolute",
        top: safePosition.top,
        left: safePosition.left,
        right: safePosition.right,
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
      role='button'
      tabIndex={-1}
      onClick={handleBackdropClick}>
      <div
        className='modal__dialog'
        ref={dialogRef}
        style={dialogStyle}
        role='dialog'
        aria-modal='true'
        aria-labelledby={title ? "modal-title" : undefined}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          // Prevent propagation for keyboard events like Enter or Space
          if (e.key === "Enter" || e.key === " ") {
            e.stopPropagation();
          }
        }}>
        <div className='modal__header'>
          {title && (
            <h5 id='modal-title' className='modal__title'>
              {title}
            </h5>
          )}
          {closable && (
            <button className='modal__close' onClick={onClose}>
              &times;
            </button>
          )}
        </div>
        <div className='modal__body'>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
