import React from "react";
import "./Modal.css";

interface ModalProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ message, isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>{message}</p>
        <button onClick={onClose}>OK</button>
      </div>
    </div>
  );
};

export default Modal;
