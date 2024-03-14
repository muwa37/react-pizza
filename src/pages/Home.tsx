import qs from 'qs';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Categories from '../components/Categories';
import LoadingError from '../components/LoadingError';
import Pagination from '../components/Pagination';
import PizzaBlock from '../components/PizzaBlock';
import PizzaSkeleton from '../components/PizzaBlock/PizzaSkeleton';
import Sort from '../components/Sort';
import { useAppDispatch } from '../store';
import { selectFilter } from '../store/filter/selectors';
import { setFilters } from '../store/filter/slice';
import { selectPizzaData } from '../store/pizza/selectors';
import { fetchPizzas } from '../store/pizza/slice';
import { sortTypes } from '../utils/consts';

export default function Home() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { category, sort, searchValue, currentPage } =
    useSelector(selectFilter);
  const { items, loadingStatus } = useSelector(selectPizzaData);

  const isSearch = useRef(false);
  const isMounted = useRef(false);

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
  }, [category, sort, searchValue, currentPage, navigate]);

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
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);

    const getPizzas = async () => {
      const sortBy = sort.sortProp.replace('-', '');
      const order = sort.sortProp.includes('-') ? 'asc' : 'desc';
      const activeCategory = category === 0 ? '' : `category=${category}&`;
      const search = searchValue ? `&search=${searchValue}` : '';

      dispatch(
        fetchPizzas({ sortBy, order, activeCategory, search, currentPage })
      );
    };

    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [category, sort, searchValue, currentPage, dispatch]);

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
        <LoadingError />
      ) : (
        <div className='content__items'>
          {loadingStatus === 'loading' ? skeletons : pizzas}
        </div>
      )}
      <Pagination />
    </div>
  );
}
