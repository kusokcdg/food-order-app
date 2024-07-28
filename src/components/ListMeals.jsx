import { useContext } from "react";

import Meal from "./Meal.jsx";
import { MealsContext } from "../store/initial-meals-context";

const ListMeals = () => {
  const { meals, errorFetch, isFetching } = useContext(MealsContext);

  if (!!errorFetch) { return <div className="process-fetch">{errorFetch.message}</div> }
  return (
    <>
      {isFetching && <div className="process-fetch">Data is fetching...</div>}
      {!isFetching && (
        <div id="meals">
          {
            meals.map(meal =>
              <div key={`${meal.id}`}>
                <Meal {...meal} />
              </div>
            )
          }
        </div>
      )}
    </>
  );
}

export default ListMeals;