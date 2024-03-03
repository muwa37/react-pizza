import React from 'react';
import { Link } from 'react-router-dom';
import emptyCart from '../assets/img/empty-cart.png';

export default function EmptyCart() {
  return (
    <div class='cart cart--empty'>
      <h2>
        Cart is empty <icon>😕</icon>
      </h2>
      <p>
        Seems like you didn't chose any pizza.
        <br />
        Go to main page and find the one you're looking for.
      </p>
      <img src={emptyCart} alt='Empty cart' />
      <Link to='/' class='button button--black'>
        <span>Go back</span>
      </Link>
    </div>
  );
}
