import { useRef, useImperativeHandle, forwardRef } from 'react';
import { createPortal } from 'react-dom';

const Modal = forwardRef(function Modal({ actions, title, children }, ref) {
    const dialog = useRef();

    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal();
            },
            close() {
                dialog.current.close();
            }
        };
    });

    return createPortal(
        <dialog className="modal" ref={dialog}>
            <h2>{title}</h2>
            {children}
            <div className='modal-actions'>
                {actions}
            </div>
        </dialog>,
        document.getElementById("modal")
    );
});

export default Modal;