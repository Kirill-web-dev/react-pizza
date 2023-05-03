import React from "react";
import qs from "qs";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Categories, Sorting, PizzaCard, Skeleton, Pagination } from "../components";

import { fetchPizzas, selectPizzaData } from "../redux/slices/pizzaSlice";
import { selectFilter, setCategoryID, setCurrentPage, setFilters } from "../redux/slices/filterSlice";
import { listSortParams } from "../components/Sorting";

const Home: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isMounted = React.useRef(false);

    const { categoryID, sort, currentPage, searchValue } = useSelector(selectFilter);
    const { items, status } = useSelector(selectPizzaData);

    const onChangePage = (page: number) => {
        dispatch(setCurrentPage(page));
    };

    const onChangeCategory = (index: number) => {
        dispatch(setCategoryID(index));
    };

    const getPizzas = async () => {
        const correctSort = sort.sortProperty.replace("-", "");
        const order = sort.sortProperty.includes("-") ? "asc" : "desc";
        const category = categoryID > 0 ? `category=${categoryID}` : "";
        const search = searchValue ? `&search=${searchValue}` : "";

        dispatch(
            // @ts-ignore
            fetchPizzas({
                correctSort,
                order,
                category,
                search,
                currentPage,
            })
        );

        window.scrollTo(0, 0);
    };

    React.useEffect(() => {
        getPizzas();
    }, [categoryID, sort.sortProperty, searchValue, currentPage]);

    React.useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sort.sortProperty,
                categoryID,
                currentPage,
            });

            navigate(`/?${queryString}`);
        }

        isMounted.current = true;
    }, [categoryID, sort.sortProperty, currentPage]);

    React.useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));
            const sort = listSortParams.find((obj) => obj.sortProperty === params.sortProperty);

            if (sort) {
                params.sort = sort;
            }

            dispatch(setFilters({ ...params, sort }));
        }
    }, []);

    const pizzas = items.map((pizza: any) => (
        <Link
            key={pizza.id}
            to={`/pizzas/${pizza.id}`}
        >
            <PizzaCard {...pizza} />
        </Link>
    ));

    const skeleton = [...new Array(8)].map((_, index) => <Skeleton key={index} />);

    return (
        <div className="container">
            <div className="content__top">
                <Categories
                    value={categoryID}
                    onChangeCategory={onChangeCategory}
                />
                <Sorting />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {status === "error" ? (
                <div className="content__error-info">
                    <h2>Произошла обшибка 😕</h2>
                    <p>Не удалось установитть подключение с сервером.</p>
                </div>
            ) : (
                <div className="content__items">{status === "loading" ? skeleton : pizzas}</div>
            )}
            <Pagination
                currentPage={currentPage}
                onChangePage={onChangePage}
            />
        </div>
    );
};

export default Home;
