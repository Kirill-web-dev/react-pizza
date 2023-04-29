import React from "react";
import axios from "axios";

import Categories from "../components/Categories";
import Sorting from "../components/Sorting";
import PizzaCard from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/PizzaLoadingBlock";
import Pagination from "../components/Pagination";

import { SearchContext } from "../App";

function Home() {
    const {searchPizza} = React.useContext(SearchContext)
    const [pizzaItems, setPizzasItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [categoryID, setCategoryID] = React.useState(0);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [sortType, setSortType] = React.useState({
        name: "популярности",
        sortProperty: "rating",
    });

    React.useEffect(() => {
        setIsLoading(true);

        const category = categoryID > 0 ? `category=${categoryID}` : "";
        const order = sortType.sortProperty.includes("-") ? "asc" : "desc";
        const correctSort = sortType.sortProperty.replace("-", "");
        const search = searchPizza ? `search=${searchPizza}` : "";

        axios
            .get(
                `https://644bf1bc4bdbc0cc3a9e9d4f.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${correctSort}&order=${order}?search=${search}`
            )
            .then((respons) => {
                setTimeout(() => {
                    setPizzasItems(respons.data);
                    setIsLoading(false);
                }, 200);
                window.scrollTo(0, 0);
            });
    }, [categoryID, sortType, searchPizza, currentPage]);

    const pizzas = pizzaItems
        .filter((pizza) =>
            pizza.name.toLowerCase().includes(searchPizza.toLowerCase())
        )
        .map((pizza, index) => <PizzaCard key={index} {...pizza} />);

    const skeleton = [...new Array(4)].map((_, index) => (
        <Skeleton key={index} />
    ));

    return (
        <div className="container">
            <div className="content__top">
                <Categories
                    categoryValue={categoryID}
                    onChangeCategory={(id) => setCategoryID(id)}
                />
                <Sorting
                    sortValue={sortType}
                    onChangeSort={(id) => setSortType(id)}
                />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading ? skeleton : pizzas}
            </div>
            <Pagination onChangePage={number => setCurrentPage(number)} />
        </div>
    );
}

export default Home;
