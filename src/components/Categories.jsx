import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setCategory } from '../store/slices/filterSlice'; //TODO: separate const

const categories = ['All', 'Meat', 'Vegetarian', 'Grill', 'Spicy', 'Closed'];

export default function Categories() {
  const dispatch = useDispatch();
  const activeCategory = useSelector(store => store.filter.category);
  const categoryChangeHandler = categoryIndex => {
    dispatch(setCategory(categoryIndex));
  };

  return (
    <div className='categories'>
      <ul>
        {categories.map((category, i) => (
          <li
            key={i}
            onClick={() => categoryChangeHandler(i)}
            className={activeCategory === i ? 'active' : ''}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}
