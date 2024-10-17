
import React from 'react';
import './Modal.css'; 

const Modal = ({ isOpen, onClose, image }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={onClose}>&times;</span>
        <img src={image} alt="Zoomed" className="zoomed-image" />
      </div>
    </div>
  );
};

export default Modal;
