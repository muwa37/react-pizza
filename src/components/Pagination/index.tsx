import ReactPaginate from 'react-paginate';
import { useDispatch } from 'react-redux';
import { setCurrentPage } from '../../store/slices/filterSlice';

import styles from './Pagination.module.scss';

//TODO: Rewrite with custom pagination

export default function Pagination() {
  const dispatch = useDispatch();

  const onPageChange = (e: any) => {
    dispatch(setCurrentPage(e.selected + 1));
  };

  return (
    <ReactPaginate
      className={styles.root}
      breakLabel='...'
      nextLabel='>'
      previousLabel='<'
      onPageChange={onPageChange}
      pageRangeDisplayed={4}
      pageCount={3}
    />
  );
}
