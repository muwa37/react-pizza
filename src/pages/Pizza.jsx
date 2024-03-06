import React from 'react';
import { useParams } from 'react-router-dom';

export default function Pizza() {
  const { id } = useParams();

  return (
    <div className='container'>
      <img src='' alt='pizza' />
      <h2>pizza {id} name</h2>
      <p>pizza description</p>
      <div>pizza options</div>
      <h4>pizza price</h4>
    </div>
  );
}
