import { useState, useEffect } from "react";

const ListMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [errorFetch, setErrorFetch] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true);
      try {
        const response = await fetch('http://localhost:3000/meals');
        const resData = await response.json();

        if (!response.ok) { throw Error('Failde fetch meals') }
        setMeals(resData);
      } catch (error) {
        setErrorFetch(error)
      }
      setIsFetching(false);
    }

    fetchData();
  }, [])

  if (errorFetch) { return <div>Error fetching data</div> }
  return (
    <>
      {isFetching && <div>Data is fetching...</div>}
      {!isFetching && (
        <div id="meals">
          {
            meals.map(meal =>
              <div key={`${meal.id}`} className="meal-item">
                <article>
                  <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
                  <h3>{meal.name}</h3>
                  <div className="meal-item-price">{meal.price}</div>
                  <div className="meal-item-description">{meal.description}</div>
                  <div className="meal-item-actions">
                    <button className="button">Add to Cart</button>
                  </div>
                </article>
              </div>
            )
          }
        </div>
      )}
    </>
  );
}

export default ListMeals;