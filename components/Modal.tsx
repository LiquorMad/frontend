import React from 'react'
import { Button } from './ui/button';

function Modal({ visible,children,onClose }:any) {
  return (
      <div className={`modal ${visible ? "modal-open" : "" }`}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">This modal works with a hidden checkbox!</p>
          <div className="modal-action">
              {children}
              <Button className="float-right" variant="outline" onClick={onClose}>No</Button>
            <label htmlFor="my_modal_6" className="btn">Close!</label>
          </div>
        </div>
      </div>
    
    
    )
}

export default Modal