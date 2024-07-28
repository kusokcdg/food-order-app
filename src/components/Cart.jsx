import { useContext } from "react";

import { CartContext } from "../store/cart-meals-context";

const Cart = () => {
    const { mealsSelected, updateMealCart } = useContext(CartContext);

    const totalSum = mealsSelected.reduce((sum, meal) => sum + meal.price * meal.count,0)
    
    return (
        <div className="cart">
            <ul>
                {mealsSelected.map(meal => (
                    <li key={meal.id} className="cart-item">
                        <p>
                            {meal.name} - 1 x ${meal.price}
                        </p>
                        <div className="cart-item-actions">
                            <button onClick={() => updateMealCart(meal.id, -1)}>-</button>
                            {meal.count}
                            <button onClick={() => updateMealCart(meal.id, 1)}>+</button>
                        </div>
                    </li>
                ))}
            </ul>
            <p className="cart-total">{ `$${totalSum.toFixed(2)}`}</p>
        </div>
    );
}

export default Cart;