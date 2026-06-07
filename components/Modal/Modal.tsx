"use client";

import { useEffect } from "react";
import css from "./Modal.module.css";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

interface ModalProps {
  children: React.ReactNode;
  closeModal: () => void;
}

function Modal({ children, closeModal }: ModalProps) {
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Escape") {
        closeModal();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [closeModal]);

  return createPortal(
    <div
      onClick={handleBackdropClick}
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
    >
      <div className={css.modal}>{children}</div>
    </div>,
    document.body
  );
}

export default Modal;
