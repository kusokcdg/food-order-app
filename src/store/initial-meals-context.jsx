import { useState, useEffect, createContext } from "react";

import { fetchMeals } from "../http.js";

export const MealsContext = createContext({
  meals: [],
  isFetching: false,
  errorFetch: false,
});

const InitMealsContextProvider = ({ children }) => {
  const [meals, setMeals] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [errorFetch, setErrorFetch] = useState();

  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true);
      try {
        const dataMeals = await fetchMeals();
        setMeals(dataMeals);
      } catch (error) {
        setErrorFetch({ message: error.message || 'Unknown fetch error' })
      }
      setIsFetching(false);
    };

    fetchData();
  }, [])

  return (
    <MealsContext.Provider
      value={{
        meals: meals,
        isFetching: isFetching,
        errorFetch: errorFetch
      }}
    >
      {children}
    </MealsContext.Provider>
  );
};

export default InitMealsContextProvider;