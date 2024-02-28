import React, { useEffect, useState } from 'react';

import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import PizzaSkeleton from '../components/PizzaBlock/PizzaSkeleton';
import Sort from '../components/Sort';

export default function Home() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(0);
  const [sortType, setSortType] = useState({
    name: 'popularity',
    sortProp: 'rating',
  });

  useEffect(() => {
    setIsLoading(true);

    const sortBy = sortType.sortProp;
    const order = sortType.sortProp.includes('-') ? 'asc' : 'desc';
    const category = activeCategory === 0 ? '' : `category=${activeCategory}&`;

    fetch(
      `https://65de02ccdccfcd562f561234.mockapi.io/items?${category}sortBy=${sortBy}&order=${order}`
    ).then(res =>
      res.json().then(json => {
        setItems(json);
        setIsLoading(false);
      })
    );
    window.scrollTo(0, 0);
  }, [activeCategory, sortType]);

  const categoryChangeHandler = categoryIndex => {
    setActiveCategory(categoryIndex);
  };

  const sortChangeHandler = sortIndex => {
    setSortType(sortIndex);
  };

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
      <div className='content__items'>
        {isLoading
          ? [...new Array(6)].map((el, i) => <PizzaSkeleton key={i} />)
          : items.map(item => <PizzaBlock key={item.id} {...item} />)}
      </div>
    </div>
  );
}
