import axios from 'axios';
import qs from 'qs';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Categories from '../components/Categories';
import Pagination from '../components/Pagination';
import PizzaBlock from '../components/PizzaBlock';
import PizzaSkeleton from '../components/PizzaBlock/PizzaSkeleton';
import Sort, { sortTypes } from '../components/Sort';
import { setFilters } from '../store/slices/filterSlice';

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { category, sort, searchValue, currentPage } = useSelector(
    store => store.filter
  );

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const fetchPizzas = () => {
    setIsLoading(true);

    const sortBy = sort.sortProp;
    const order = sort.sortProp.includes('-') ? 'asc' : 'desc';
    const activeCategory = category === 0 ? '' : `category=${category}&`;
    const search = searchValue ? `&search=${searchValue}` : '';

    axios
      .get(
        `https://65de02ccdccfcd562f561234.mockapi.io/items?${activeCategory}sortBy=${sortBy}&order=${order}${search}&page=${currentPage}&limit=4`
      )
      .then(res => {
        setItems(res.data);
        setIsLoading(false);
      });
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
        sortType => sortType.sortProp === params.sortProp
      );

      dispatch(setFilters({ ...params, sort }));
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      fetchPizzas();
    }

    isSearch.current = false;
  }, [category, sort, searchValue, currentPage]);

  const pizzas = items.map(item => <PizzaBlock key={item.id} {...item} />);
  const skeletons = [...new Array(6)].map((el, i) => <PizzaSkeleton key={i} />);

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories />
        <Sort />
      </div>
      <h2 className='content__title'>All pizzas</h2>
      <div className='content__items'>{isLoading ? skeletons : pizzas}</div>
      <Pagination />
    </div>
  );
}
