import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import arrowLeft from '../assets/img/icons/arrow-left.svg';
import cartLogo from '../assets/img/icons/black-cart.svg';
import clearCart from '../assets/img/icons/clear-cart.svg';
import CartItem from '../components/CartItem';
import EmptyCart from '../components/EmptyCart';
import { selectCart } from '../store/cart/selectors';
import { clearItems } from '../store/cart/slice';

export default function Cart() {
  const dispatch = useDispatch();
  const { totalPrice, items } = useSelector(selectCart);

  const totalCount = items.reduce(
    (sum: number, item: any) => sum + item.count,
    0
  );

  const onClearClick = () => {
    dispatch(clearItems());
  };

  if (totalPrice === 0) {
    return <EmptyCart />;
  }

  return (
    <div className='container container--cart'>
      <div className='cart'>
        <div className='cart__top'>
          <h2 className='content__title'>
            <img width={38} src={cartLogo} alt='cart-logo' />
            Cart
          </h2>
          <div onClick={onClearClick} className='cart__clear'>
            <img src={clearCart} alt='clear-cart' />
            <span>Clear cart</span>
          </div>
        </div>
        <div className='content__items'>
          {items.map((item: any) => (
            <CartItem key={item.id} {...item} />
          ))}
        </div>
        <div className='cart__bottom'>
          <div className='cart__bottom-details'>
            <span>
              Total count: <b>{totalCount} pc.</b>
            </span>
            <span>
              Order summary: <b>{totalPrice} ₽</b>
            </span>
          </div>
          <div className='cart__bottom-buttons'>
            <Link
              to='/'
              className='button button--outline button--add go-back-btn'
            >
              <img src={arrowLeft} alt='arrow-left' />
              <span>Go to pizzas</span>
            </Link>
            <button className='button pay-btn'>
              <span>Pay now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
