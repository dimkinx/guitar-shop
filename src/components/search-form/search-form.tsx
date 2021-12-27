import {useDispatch, useSelector} from 'react-redux';
import React, {FormEvent, KeyboardEvent, useEffect, useRef, useState} from 'react';
import {DEBOUNCE_DELAY, KeyAttributeValue, QueryParam} from '../../constants';
import {StatusType} from '../../enums';
import {getFoundProducts, getFoundProductsStatus} from '../../store/search/search-selectors';
import {fetchFoundProducts} from '../../store/search/search-api-actions';
import {setFoundProducts, setFoundProductsStatus} from '../../store/search/search-actions';
import {useDebounce} from 'use-debounce';
import {useHistory} from 'react-router-dom';

function SearchForm(): JSX.Element {
  const [searchValue, setSearchValue] = useState('');
  const [debouncedValue] = useDebounce(searchValue, DEBOUNCE_DELAY);
  const [isSelectListOpen, setIsSelectListOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const selectElements = useRef<Record<number, HTMLLIElement>>({});
  const foundProducts = useSelector(getFoundProducts);
  const foundProductsStatus = useSelector(getFoundProductsStatus);

  const history = useHistory();
  const dispatch = useDispatch();

  let timer: number | null = null;

  const handleFormFocus = () => {
    setIsSelectListOpen(true);

    if (timer) {
      clearTimeout(timer);
    }
  };

  const handleFormBlur = () => {
    setHighlightedIndex(-1);

    timer = setTimeout(() => {
      setIsSelectListOpen(false);
    });
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
  };

  const handleFormKeydown = (evt: KeyboardEvent) => {
    switch (evt.code) {
      case KeyAttributeValue.ArrowDown:
        evt.preventDefault();
        setHighlightedIndex(() => {
          const index = (highlightedIndex === foundProducts.length - 1) ? 0 : highlightedIndex + 1;
          selectElements.current[index]?.scrollIntoView({block: 'nearest'});
          return index;
        });
        break;
      case KeyAttributeValue.ArrowUp:
        evt.preventDefault();
        setHighlightedIndex(() => {
          const index = (highlightedIndex === 0) ? foundProducts.length - 1 : highlightedIndex - 1;
          selectElements.current[index]?.scrollIntoView({block: 'nearest'});
          return index;
        });
        break;
      case KeyAttributeValue.Enter:
        evt.preventDefault();
        if (highlightedIndex !== -1 && isSelectListOpen) {
          history.push(`#${foundProducts[highlightedIndex].id}`);
        }
        break;
      default:
        break;
    }
  };

  const handleInputChange = (evt: FormEvent<HTMLInputElement>) => {
    setSearchValue(evt.currentTarget.value);
    setHighlightedIndex(-1);
  };

  const handleSelectElementClick = (id: number) => () => {
    history.push(`#${id}`);
  };

  useEffect(() => {
    if (debouncedValue) {
      dispatch(fetchFoundProducts({
        ['name'.concat(QueryParam.Like)]: debouncedValue,
      }));
    }

    return () => {
      dispatch(setFoundProducts([]));
      dispatch(setFoundProductsStatus(StatusType.Idle));
    };
  }, [dispatch, debouncedValue]);

  return (
    <div
      onFocus={handleFormFocus}
      onBlur={handleFormBlur}
      onKeyDown={handleFormKeydown}
      className="form-search"
    >
      <form
        onSubmit={handleFormSubmit}
        className="form-search__form"
      >
        <button
          className="form-search__submit"
          type="submit"
          tabIndex={-1}
        >
          <svg className="form-search__icon" width="14" height="15" aria-hidden="true">
            <use xlinkHref="#icon-search" />
          </svg>
          <span className="visually-hidden">Начать поиск</span>
        </button>
        <label
          className="visually-hidden"
          htmlFor="search"
        >Поиск
        </label>
        <input
          onChange={handleInputChange}
          className="form-search__input"
          id="search"
          type="text"
          autoComplete="off"
          placeholder="что вы ищите?"
        />
        {foundProductsStatus === StatusType.Loading && (
          <img
            style={{position:'absolute', top:5, right:5}}
            width="30"
            height="30"
            src="./img/svg/loader.svg"
            alt="Загрузка..."
          />
        )}
      </form>
      {(isSelectListOpen && foundProducts.length > 0) && (
        <ul
          className="form-search__select-list"
          style={{zIndex: '1'}}
          tabIndex={-1}
        >
          {foundProducts.map((foundProduct, index) => (
            <li
              key={foundProduct.id}
              onClick={handleSelectElementClick(foundProduct.id)}
              ref={(node: HTMLLIElement) => (selectElements.current[index] = node)}
              style={highlightedIndex === index ? {color:'#545454'} : undefined}
              className="form-search__select-item"
            >{foundProduct.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchForm;
