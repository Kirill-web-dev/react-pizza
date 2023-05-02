import React from 'react';
import qs from 'qs';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Categories, Sorting, PizzaCard, Skeleton, Pagination } from '../components';

import { fetchPizzas } from '../redux/slices/pizzaSlice';
import { setCategoryID, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { SearchContext } from '../App';
import { listSortParams } from '../components/Sorting';

function Home() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isMounted = React.useRef(false);

    const { categoryID, sort, currentPage } = useSelector((state) => state.filterSlice);
    const { items, status } = useSelector((state) => state.pizzaSlice);

    const { searchPizza } = React.useContext(SearchContext);

    const onChangePage = (number) => {
        dispatch(setCurrentPage(number));
    };

    const onChangeCategory = (id) => {
        dispatch(setCategoryID(id));
    };

    const getPizzas = async () => {
        const correctSort = sort.sortProperty.replace('-', '');
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
        const category = categoryID > 0 ? `category=${categoryID}` : '';
        const search = searchPizza ? `&search=${searchPizza}` : '';

        dispatch(
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
    }, [categoryID, sort.sortProperty, searchPizza, currentPage]);

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

    const pizzas = items
        .filter((pizza) => pizza.name.toLowerCase().includes(searchPizza.toLowerCase()))
        .map((pizza) => (
            <PizzaCard
                key={pizza.id}
                {...pizza}
            />
        ));

    const skeleton = [...new Array(8)].map((_, index) => <Skeleton key={index} />);

    return (
        <div className='container'>
            <div className='content__top'>
                <Categories
                    categoryValue={categoryID}
                    onChangeCategory={onChangeCategory}
                />
                <Sorting />
            </div>
            <h2 className='content__title'>Все пиццы</h2>
            {status === 'error' ? (
                <div className='content__error-info'>
                    <h2>Произошла обшибка 😕</h2>
                    <p>Не удалось установитть подключение с сервером.</p>
                </div>
            ) : (
                <div className='content__items'>{status === 'loading' ? skeleton : pizzas}</div>
            )}
            <Pagination
                currentPage={currentPage}
                onChangePage={onChangePage}
            />
        </div>
    );
}

export default Home;
