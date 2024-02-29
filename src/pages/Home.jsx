import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setCategory } from '../store/slices/filterSlice';

import { SearchContext } from '../App';

import Categories from '../components/Categories';
import Pagination from '../components/Pagination';
import PizzaBlock from '../components/PizzaBlock';
import PizzaSkeleton from '../components/PizzaBlock/PizzaSkeleton';
import Sort from '../components/Sort';

export default function Home() {
  const activeCategory = useSelector(store => store.filter.category);
  const dispatch = useDispatch();

  const { searchValue } = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortType, setSortType] = useState({
    name: 'popularity',
    sortProp: 'rating',
  });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setIsLoading(true);

    const sortBy = sortType.sortProp;
    const order = sortType.sortProp.includes('-') ? 'asc' : 'desc';
    const category = activeCategory === 0 ? '' : `category=${activeCategory}&`;
    const search = searchValue ? `&search=${searchValue}` : '';

    fetch(
      `https://65de02ccdccfcd562f561234.mockapi.io/items?${category}sortBy=${sortBy}&order=${order}${search}&page=${currentPage}&limit=4`
    ).then(res =>
      res.json().then(json => {
        setItems(json);
        setIsLoading(false);
      })
    );
    window.scrollTo(0, 0);
  }, [activeCategory, sortType, searchValue, currentPage]);

  const categoryChangeHandler = categoryIndex => {
    dispatch(setCategory(categoryIndex));
  };
  const sortChangeHandler = sortIndex => {
    setSortType(sortIndex);
  };

  const pizzas = items.map(item => <PizzaBlock key={item.id} {...item} />);
  const skeletons = [...new Array(6)].map((el, i) => <PizzaSkeleton key={i} />);

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories
          activeCategory={activeCategory}
          categoryChangeHandler={categoryChangeHandler}
        />
        <Sort sortType={sortType} sortChangeHandler={sortChangeHandler} />
      </div>
      <h2 className='content__title'>All pizzas</h2>
      <div className='content__items'>{isLoading ? skeletons : pizzas}</div>
      <Pagination onPageChange={num => setCurrentPage(num)} />
    </div>
  );
}
