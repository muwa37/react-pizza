import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { SearchContext } from '../App';

import Categories from '../components/Categories';
import Pagination from '../components/Pagination';
import PizzaBlock from '../components/PizzaBlock';
import PizzaSkeleton from '../components/PizzaBlock/PizzaSkeleton';
import Sort from '../components/Sort';

export default function Home() {
  const { category, sort } = useSelector(store => store.filter);

  const { searchValue } = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
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

    window.scrollTo(0, 0);
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
      <Pagination onPageChange={num => setCurrentPage(num)} />
    </div>
  );
}
