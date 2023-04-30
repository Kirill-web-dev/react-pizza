import React from 'react';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Categories, Sorting, PizzaCard, Skeleton, Pagination } from '../components';

import { setCategoryID, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { SearchContext } from '../App';
import { listSortParams } from '../components/Sorting';

function Home() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const isSearch = React.useRef(false);
	const isMounted = React.useRef(false);

	const { categoryID, sort, currentPage } = useSelector((state) => state.filterSlice);

	const { searchPizza } = React.useContext(SearchContext);
	const [pizzaItems, setPizzasItems] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);

	const onChangePage = (number) => {
		dispatch(setCurrentPage(number));
	};

	const onChangeCategory = (id) => {
		dispatch(setCategoryID(id));
	};

	const fetchPizzas = () => {
		setIsLoading(true);

		const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
		const correctSort = sort.sortProperty.replace('-', '');
		const category = categoryID > 0 ? `category=${categoryID}` : '';
		const search = searchPizza ? `&search=${searchPizza}` : '';

		axios
			.get(`https://644bf1bc4bdbc0cc3a9e9d4f.mockapi.io/pizzas?page=${currentPage}&limit=8&${category}&sortBy=${correctSort}&order=${order}${search}`)
			.then((response) => {
				setPizzasItems(response.data);
				setIsLoading(false);
			})
			.catch((err) => {
				setIsLoading(false);
			});
	};

	React.useEffect(() => {
		window.scrollTo(0, 0);

		if (!isSearch.current) {
			fetchPizzas();
		}

		isSearch.current = false;
	}, [categoryID, sort.sortProperty, searchPizza, currentPage]);

	React.useEffect(() => {
		if (isMounted.current) {
			const queryString = qs.stringify({
				sortProperty: sort.sortProperty,
				categoryID,
				currentPage,
			});

			navigate(`?${queryString}`);
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
			isSearch.current = true;
		}
	}, []);

	const pizzas = pizzaItems
		.filter((pizza) => pizza.name.toLowerCase().includes(searchPizza.toLowerCase()))
		.map((pizza, index) => (
			<PizzaCard
				key={pizza.id}
				{...pizza}
			/>
		));

	const skeleton = [...new Array(8)].map((_, index) => <Skeleton key={index} />);

	return (
		<div className="container">
			<div className="content__top">
				<Categories
					categoryValue={categoryID}
					onChangeCategory={onChangeCategory}
				/>
				<Sorting />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">{isLoading ? skeleton : pizzas}</div>
			<Pagination
				currentPage={currentPage}
				onChangePage={onChangePage}
			/>
		</div>
	);
}

export default Home;
