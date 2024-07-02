import { useRef } from 'react';

import Modal from './Modal.jsx';
import Cart from './Cart.jsx';
import Checkout from './Checkout.jsx';
import logo from '../assets/logo.jpg';

const Header = () => {
    // const modal = useRef();
    const modalCart = useRef();
    const modalCheckout = useRef();

    const actionsCart = (
        <>
            <button onClick={() => modalCart.current.close()}>Close</button>
            <button onClick={() => modalCheckout.current.open()}>Go to Checkout</button>
        </>
    );

    const actionsCheckout = (
        <>
            <button onClick={() => (
                modalCheckout.current.close(),
                modalCart.current.close())}
            >
                Close
            </button>
            <button onClick={() => modalCheckout.current.open()}>Submit Order</button>
        </>
    )

    return (
        <>
            <Modal ref={modalCart} actions={actionsCart}><Cart /></Modal>
            <Modal ref={modalCheckout} actions={actionsCheckout}><Checkout /></Modal>

            <div id="main-header">
                <div id="title">
                    <h1>Reactfood</h1>
                    <img src={logo} alt="burger" />
                </div>

                <div className=''>
                    <button className='text-button' onClick={() => modalCart.current.open()}>Cart(2)</button>
                </div>
            </div>
        </>
    );
}

export default Header;