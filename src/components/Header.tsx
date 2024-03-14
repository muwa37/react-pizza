import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import pizzaLogo from '../assets/img/icons/pizza-logo.svg';
import cartLogo from '../assets/img/icons/white-cart.svg';
import { selectCart } from '../store/cart/selectors';
import Search from './Search';

export default function Header() {
  const { items, totalPrice, totalCount } = useSelector(selectCart);
  const { pathname } = useLocation();
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      localStorage.setItem('cart', JSON.stringify(items));
    }
    isMounted.current = true;
  }, [items, totalPrice]);

  return (
    <div>
      <div className='header'>
        <div className='container'>
          <Link to='/'>
            <div className='header__logo'>
              <img width='38' src={pizzaLogo} alt='Pizza logo' />
              <div>
                <h1>Sample Pizza</h1>
                <p>most delicious pizza ever</p>
              </div>
            </div>
          </Link>
          {pathname !== '/cart' && (
            <>
              <Search />
              <div className='header__cart'>
                <Link to='/cart' className='button button--cart'>
                  <span>{totalPrice} ₽</span>
                  <div className='button__delimiter'></div>
                  <img src={cartLogo} alt='cart-logo' />
                  <span>{totalCount}</span>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
