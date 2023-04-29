import React from "react";
import axios from "axios";

import Categories from "../components/Categories";
import Sorting from "../components/Sorting";
import PizzaCard from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/PizzaLoadingBlock";

function Home() {
    const [pizzaItems, setPizzasItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        axios
            .get("https://644bf1bc4bdbc0cc3a9e9d4f.mockapi.io/pizzas")
            .then((respons) => {
                setTimeout(() => {
                    setPizzasItems(respons.data);
                    setIsLoading(false);
                }, 500);
            });
    }, []);

    return (
        <div className="container">
            <div className="content__top">
                <Categories />
                <Sorting />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading
                    ? [...new Array(10)].map((_, index) => (
                          <Skeleton key={index} />
                      ))
                    : pizzaItems.map((pizza, index) => (
                          <PizzaCard key={index} {...pizza} />
                      ))}
            </div>
        </div>
    );
}

export default Home;