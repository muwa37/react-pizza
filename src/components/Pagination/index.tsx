import ReactPaginate from 'react-paginate';
import { useDispatch } from 'react-redux';
import { setCurrentPage } from '../../store/filter/slice';

import styles from './Pagination.module.scss';

export default function Pagination() {
  const dispatch = useDispatch();

  const onPageChange = (selectedItem: { selected: number }) => {
    dispatch(setCurrentPage(selectedItem.selected + 1));
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
