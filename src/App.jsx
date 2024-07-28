import Header from "./components/Header.jsx";
import ListMeals from "./components/ListMeals.jsx";

import InitMealsContextProvider from "./store/initial-meals-context.jsx";
import CartContextProvider from "./store/cart-meals-context.jsx";
import { MealsContext } from "./store/initial-meals-context.jsx";
function App() {

  return (
    <InitMealsContextProvider>
      <CartContextProvider>
        <Header />
        <ListMeals />
      </CartContextProvider>
    </InitMealsContextProvider>
  );
}

export default App;