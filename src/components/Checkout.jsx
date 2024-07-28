import { useState, useRef, useContext } from "react";

import Modal from "./Modal.jsx";
import { CartContext } from "../store/cart-meals-context.jsx";
import { sendOrder } from "../http.js";

const Checkout = ({ orderItems, actionsAncestorsModal }) => {
    const modalResponse = useRef();
    const { resetCart } = useContext(CartContext);

    const [responseOrder, setResponseOrder] = useState();
    const [isFetching, setIsFetching] = useState(false);
    const [errorFetch, setErrorFetch] = useState();

    const [errorValidation, setErrorValidation] = useState({
        name: false,
        email: false,
        street: false,
        'postal-code': false
    });

    const actionsmodalResponse = (
        <button
            className='button'
            onClick={() => (
                modalResponse.current.close(), actionsAncestorsModal()
            )}>
            Okay
        </button>
    );

    async function handleSubmit(event) {
        event.preventDefault();

        const fd = new FormData(event.target);
        const data = Object.fromEntries(fd.entries());
        let error = {
            name: false,
            email: false,
            street: false,
            'postal-code': false
        };

        setResponseOrder('');
        setErrorFetch('');

        if (!data.email.includes('@')) error.email = true;
        if (data.name.trim().length === 0) error.name = true;

        let isErrorExist = Object.values(error).find(value => value === true);
        if (!!isErrorExist) {
            setErrorValidation(error);
            return
        }

        setErrorValidation({
            name: false,
            email: false,
            street: false,
            'postal-code': false
        });

        setIsFetching(true);
        try {
            const response = await sendOrder({ customer: data, items: orderItems })
            setResponseOrder(response);
        } catch (error) {
            setErrorFetch({ message: error.message || 'Failed checkout order!' })
            setIsFetching(false);
            return
        }
        setIsFetching(false);

        modalResponse.current.open();
        event.target.reset();
        resetCart();
    };

    return (
        <>
            <Modal
                ref={modalResponse}
                title={'Success'}
                actions={actionsmodalResponse}
            >
                {responseOrder}
            </Modal>

            <form noValidate id='checkout' onSubmit={handleSubmit}>
                <div className="control">
                    <label htmlFor="name">Full Name</label>
                    <input id="name" type="text" name="name" />
                    {errorValidation.name && <div className="control-error">This field is required.</div>}
                </div>
                <div className="control">
                    <label htmlFor="email">E-Mail Address</label>
                    <input id="email" type="email" name="email" />
                    {errorValidation.email && <div className="control-error">Please enter a valid email address.</div>}
                </div>
                <div className="control">
                    <label htmlFor="street">Street</label>
                    <input id="street" type="text" name="street" />
                </div>
                <div className="control-row">
                    <div className="control">
                        <label htmlFor="city">City</label>
                        <input id="city" type="text" name="city" />
                    </div>
                    <div className="control">
                        <label htmlFor="postal-code">Postal Code</label>
                        <input id="postal-code" type="" name="postal-code" />
                    </div>
                </div>
            </form>
            {isFetching ? 'Sending form...' : errorFetch ? errorFetch.message : ''}
        </>
    );
};

export default Checkout;