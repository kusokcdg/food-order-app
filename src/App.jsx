import Header from "./components/Header.jsx";
import ListMeals from "./components/ListMeals.jsx";
import path from '../backend/data/available-meals.json'

function App() {



  return (
    <>
      <Header />
      <ListMeals/>
    </>
  );
}

export default App;