import { useDispatch } from 'react-redux';

import minusBtn from '../assets/img/icons/minus-btn.svg';
import plusBtn from '../assets/img/icons/plus-btn.svg';
import removeBtn from '../assets/img/icons/remove-btn.svg';
import {
  decrementItemCount,
  incrementItemCount,
  removeItem,
} from '../store/cart/slice';
import { CartItemProps } from '../types/components/CartItem';

export default function CartItem({
  id,
  title,
  type,
  size,
  price,
  count,
  imageUrl,
}: CartItemProps) {
  const dispatch = useDispatch();

  const onPlusClick = () => {
    dispatch(incrementItemCount(id));
  };
  const onMinusClick = () => {
    dispatch(decrementItemCount(id));
  };
  const onRemoveClick = () => {
    dispatch(removeItem(id));
  };

  return (
    <div className='cart__item'>
      <div className='cart__item-img'>
        <img className='pizza-block__image' src={imageUrl} alt='Pizza' />
      </div>
      <div className='cart__item-info'>
        <h3>{title}</h3>
        <p>
          {type}, {size} см.
        </p>
      </div>
      <div className='cart__item-count'>
        <button
          disabled={count === 1}
          onClick={onMinusClick}
          className='button button--outline button--circle cart__item-count-minus'
        >
          <img src={minusBtn} alt='minus' />
        </button>
        <b>{count}</b>
        <button
          onClick={onPlusClick}
          className='button button--outline button--circle cart__item-count-plus'
        >
          <img src={plusBtn} alt='plus' />
        </button>
      </div>
      <div className='cart__item-price'>
        <b>{price * count} ₽</b>
      </div>
      <div className='cart__item-remove'>
        <button
          onClick={onRemoveClick}
          className='button button--outline button--circle'
        >
          <img src={removeBtn} alt='remove' />
        </button>
      </div>
    </div>
  );
}
