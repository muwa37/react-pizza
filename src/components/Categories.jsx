import React, { useState } from 'react';

//TODO: separate const

const categories = ['All', 'Meat', 'Vegetarian', 'Grill', 'Spicy', 'Closed'];

export default function Categories() {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <div className='categories'>
      <ul>
        {categories.map((category, i) => (
          <li
            key={i}
            onClick={() => setActiveCategory(i)}
            className={activeCategory === i ? 'active' : ''}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}
