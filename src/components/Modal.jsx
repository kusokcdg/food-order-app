import { useRef, useImperativeHandle, forwardRef } from 'react';
import { createPortal } from 'react-dom';

const Modal = forwardRef(function Modal({actions,children}, ref) {
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
            {children}
            {actions}
            {/* <button onClick={() => dialog.current.close()}>Close</button>
            <button>Go to Checkout</button> */}
        </dialog>,
        document.getElementById("modal")
    );
});

export default Modal;