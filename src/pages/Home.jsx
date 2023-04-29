import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";


import { setCategoryID } from "../redux/slices/filterSlice";
import Categories from "../components/Categories";
import Sorting from "../components/Sorting";
import PizzaCard from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/PizzaLoadingBlock";
import Pagination from "../components/Pagination";
import { SearchContext } from "../App";

function Home() {

    const dispatch = useDispatch();
    const {categoryID, sort} = useSelector(state => state.filterSlice);
    const sortType = sort.sortProperty;

    const {searchPizza} = React.useContext(SearchContext)
    const [pizzaItems, setPizzasItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [currentPage, setCurrentPage] = React.useState(1);
    
    React.useEffect(() => {
        setIsLoading(true);
        
        const order = sortType.includes("-") ? "asc" : "desc";
        const correctSort = sortType.replace("-", "");
        const category = categoryID > 0 ? `category=${categoryID}` : "";

        axios
        .get(
            `https://644bf1bc4bdbc0cc3a9e9d4f.mockapi.io/pizzas?page=${currentPage}&limit=8&${category}&sortBy=${correctSort}&order=${order}`
            )
            .then((respons) => {
                setTimeout(() => {
                    setPizzasItems(respons.data);
                    setIsLoading(false);
                }, 200);
                window.scrollTo(0, 0);
            });
        }, [categoryID, sortType, searchPizza, currentPage]);
        
    const onChangeCategory = (id) => {
        dispatch(setCategoryID(id));
   }

    const pizzas = pizzaItems
        .filter((pizza) =>
            pizza.name.toLowerCase().includes(searchPizza.toLowerCase())
        )
        .map((pizza, index) => <PizzaCard key={index} {...pizza} />);

    const skeleton = [...new Array(8)].map((_, index) => (
        <Skeleton key={index} />
    ));

    return (
        <div className="container">
            <div className="content__top">
                <Categories
                    categoryValue={categoryID}
                    onChangeCategory={onChangeCategory}
                />
                <Sorting/>
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
