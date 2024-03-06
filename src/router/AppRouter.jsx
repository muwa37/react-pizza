import { Route, Routes } from 'react-router-dom';
import Main from '../layouts/Main';
import Cart from '../pages/Cart';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import Pizza from '../pages/Pizza';

export default function AppRouter() {
  return (
    <Routes>
      <Route path='/' element={<Main />}>
        <Route path='' element={<Home />} />
        <Route path='cart' element={<Cart />} />
        <Route path='pizza/:id' element={<Pizza />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  );
}
