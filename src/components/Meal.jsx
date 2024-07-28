import { useContext } from "react";

import { CartContext } from "../store/cart-meals-context";

const Meal = ({ id, name, image, price, description }) => {
    const { addMealCart: addMeal } = useContext(CartContext)

    return (
        <div className="meal-item">
            <article>
                <img src={`http://localhost:3000/${image}`} alt={name} />
                <h3>{name}</h3>
                <div className="meal-item-price">{price}</div>
                <div className="meal-item-description">{description}</div>
                <div className="meal-item-actions">
                    <button className="button" onClick={() => addMeal({ id, name, price })}>Add to Cart</button>
                </div>
            </article>
        </div>
    );
}

export default Meal;