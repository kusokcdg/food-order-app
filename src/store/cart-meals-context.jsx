import { useState, createContext } from "react";

export const CartContext = createContext({
    mealsSelected: [],
    addMealCart: () => { },
    updateMealCart: () => { },
    resetCart: () => {},
});

const CartContextProvider = ({ children }) => {
    const [mealsCart, setMealsCart] = useState([]);

    function handleAddMeal(selectedMeal) {
        setMealsCart(prevMeals =>
            !!!(prevMeals.find(meal => meal.id === selectedMeal.id))
                ? [...prevMeals, { ...selectedMeal, count: 1 }]
                : [...prevMeals.map(meal => meal.id === selectedMeal.id ? { ...meal, count: meal.count + 1 } : meal)]
        );
    };

    function handleUpdateCountMeal(id, addCount) {
        setMealsCart(prevMeals =>  prevMeals.find(meal => meal.id === id).count + addCount > 0 ?
            [...prevMeals.map(meal => meal.id === id ? { ...meal, count: meal.count + addCount } : meal)] :
            [...prevMeals.filter(meal => meal.id != id)]
        );
    }

    function handleResetCart() {
        setMealsCart([]);
    }

    return (
        <CartContext.Provider
            value={{
                mealsSelected: mealsCart,
                addMealCart: handleAddMeal,
                updateMealCart: handleUpdateCountMeal,
                resetCart: handleResetCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartContextProvider;