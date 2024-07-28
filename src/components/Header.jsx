import { useRef, useContext } from 'react';

import Modal from './Modal.jsx';
import Cart from './Cart.jsx';
import Checkout from './Checkout.jsx';
import logo from '../assets/logo.jpg';
import { CartContext } from '../store/cart-meals-context.jsx';

const Header = () => {
    const { mealsSelected } = useContext(CartContext);

    const modalCart = useRef();
    const modalCheckout = useRef();

    const actionsCart = (
        <>
            <button className='text-button' onClick={() => modalCart.current.close()}>Close</button>
            {!!(mealsSelected.length) && <button className='button' onClick={() => modalCheckout.current.open()}>Go to Checkout</button>}
        </>
    );

    const actionsCheckout = (
        <>
            <button className='text-button' onClick={() => modalCheckout.current.close()}>Close</button>
            <button form='checkout' className='button'>Submit Order</button>
        </>
    );

    return (
        <>
            <Modal ref={modalCart} title="Your Cart" actions={actionsCart}>
                {!!!(mealsSelected.length) ?
                    <div>Cart is empty. Order something tasty!</div> :
                    <Cart />}
            </Modal>
            <Modal ref={modalCheckout} title="Checkout" actions={actionsCheckout}>
                <Checkout 
                orderItems={mealsSelected}
                 actionsAncestorsModal={() => (
                    modalCheckout.current.close(),
                    modalCart.current.close()
                 )}
                  />
            </Modal>

            <div id="main-header">
                <div id="title">
                    <h1>Reactfood</h1>
                    <img src={logo} alt="burger" />
                </div>

                <button className='text-button' onClick={() => modalCart.current.open()}>
                    Cart({mealsSelected.length})
                </button>
            </div>
        </>
    );
}

export default Header;