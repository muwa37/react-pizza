import qs from 'qs';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Categories from '../components/Categories';
import Pagination from '../components/Pagination';
import PizzaBlock from '../components/PizzaBlock';
import PizzaSkeleton from '../components/PizzaBlock/PizzaSkeleton';
import Sort, { sortTypes } from '../components/Sort';
import { useAppDispatch } from '../store';
import { selectFilter, setFilters } from '../store/slices/filterSlice';
import { fetchPizzas, selectPizzaData } from '../store/slices/pizzaSlice';

//TODO: separate error into comp

export default function Home() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { category, sort, searchValue, currentPage } =
    useSelector(selectFilter);
  const { items, loadingStatus } = useSelector(selectPizzaData);

  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const getPizzas = async () => {
    const sortBy = sort.sortProp.replace('-', '');
    const order = sort.sortProp.includes('-') ? 'asc' : 'desc';
    const activeCategory = category === 0 ? '' : `category=${category}&`;
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(
      fetchPizzas({ sortBy, order, activeCategory, search, currentPage })
    );
  };

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProp: sort.sortProp,
        category,
        searchValue,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [category, sort, searchValue, currentPage]);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortTypes.find(
        sortType => sortType.sortProp === params.sortBy
      );

      if (Number.isNaN(Number(params.category))) {
        params.category = '0';
      }

      dispatch(
        setFilters({
          searchValue: params.searchValue as string,
          category: Number(params.category),
          currentPage: Number(params.currentPage),
          sort: sort || sortTypes[0],
        })
      );
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [category, sort, searchValue, currentPage]);

  const pizzas = items.map((item: any) => (
    <PizzaBlock key={item.id} {...item} />
  ));
  const skeletons = [...new Array(6)].map((el, i) => <PizzaSkeleton key={i} />);

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories />
        <Sort />
      </div>
      <h2 className='content__title'>Pizzas</h2>
      {loadingStatus === 'error' ? (
        <div className='content__error-info'>
          <h2>Loading error</h2>
          <p>Sorry, something went wrong while loading pizza</p>
        </div>
      ) : (
        <div className='content__items'>
          {loadingStatus === 'loading' ? skeletons : pizzas}
        </div>
      )}

      <Pagination />
    </div>
  );
}