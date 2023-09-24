import React from 'react'

function Modal({ visible,children,onClose,text }:any) {
  return (
      <div className={`modal ${visible ? "modal-open" : "" }`}>
        <div className="modal-box">
          <p className="py-4">{text}</p>
          <div className="modal-action">
              {children}
            <label htmlFor="my_modal_6" onClick={onClose} className="btn">Close!</label>
          </div>
        </div>
      </div>
    
    
    )
}

export default Modal