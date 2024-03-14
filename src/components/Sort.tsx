import { memo, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSort } from '../store/filter/selectors';
import { setSort } from '../store/filter/slice';
import { SortItem } from '../types/common';
import { sortTypes } from '../utils/consts';

export default memo(function Sort() {
  const dispatch = useDispatch();
  const sortType = useSelector(selectSort);
  const sortRef = useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = useState(false);

  const sortChangeHandler = (sortType: SortItem) => {
    dispatch(setSort(sortType));
    setIsVisible(false);
  };
  const outsideClickHandler = (e: MouseEvent) => {
    const current = sortRef.current;
    const path = e.composedPath();
    if (current && !path.includes(current)) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    document.body.addEventListener('click', outsideClickHandler);

    return () => {
      document.body.removeEventListener('click', outsideClickHandler);
    };
  }, []);

  return (
    <div ref={sortRef} className='sort'>
      <div onClick={() => setIsVisible(!isVisible)} className='sort__label'>
        <b>Sort by:</b>
        <span>{sortType.name}</span>
      </div>
      {isVisible && (
        <div className='sort__popup'>
          <ul>
            {sortTypes.map((el, i) => (
              <li
                onClick={() => sortChangeHandler(el)}
                key={i}
                className={el.sortProp === sortType.sortProp ? 'active' : ''}
              >
                {el.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});
