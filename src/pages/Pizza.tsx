import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PizzaState } from '../types/common';

//TODO: add loading skeleton instead of h2

export default function Pizza() {
  const [pizza, setPizza] = useState<PizzaState>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchOnePizza() {
      try {
        const { data } = await axios.get(
          'https://65de02ccdccfcd562f561234.mockapi.io/items/' + id
        );
        setPizza(data);
      } catch (error) {
        alert('this pizza does not exist');
        navigate('/');
      }
    }

    fetchOnePizza();
  }, [id]);

  if (!pizza) {
    return <h2>loading pizza...</h2>;
  }

  return (
    <div className='container'>
      <img src={pizza.imageUrl} alt='pizza' />
      <h2>{pizza.title}</h2>
      <p>pizza description</p>
      <div>pizza options</div>
      <h4>{pizza.price} ₽</h4>
    </div>
  );
}
