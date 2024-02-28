import React, { useEffect, useState } from 'react';

import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import PizzaSkeleton from '../components/PizzaBlock/PizzaSkeleton';
import Sort from '../components/Sort';

export default function Home() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('https://65de02ccdccfcd562f561234.mockapi.io/items').then(res =>
      res.json().then(json => {
        setItems(json);
        setIsLoading(false);
      })
    );
  }, []);

  return (
    <>
      <div className='content__top'>
        <Categories />
        <Sort />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>
        {isLoading
          ? [...new Array(6)].map((el, i) => <PizzaSkeleton key={i} />)
          : items.map(item => <PizzaBlock key={item.id} {...item} />)}
      </div>
    </>
  );
}
