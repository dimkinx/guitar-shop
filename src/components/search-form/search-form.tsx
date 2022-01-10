import {FormEvent, KeyboardEvent, useEffect, useRef, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {useDebounce} from 'use-debounce';
import {getFoundProducts, getFoundProductsStatus} from '../../store/search/search-selectors';
import {fetchFoundProducts} from '../../store/search/search-api-actions';
import {setFoundProducts, setFoundProductsStatus} from '../../store/search/search-actions';
import {DEBOUNCE_DELAY, KeyAttributeValue, SearchParamPostfix, SearchParamKey} from '../../constants';
import {StatusType} from '../../enums';

function SearchForm(): JSX.Element {
  const [isSelectListOpen, setIsSelectListOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [searchValue, setSearchValue] = useState('');

  const [debouncedSearchValue] = useDebounce(searchValue, DEBOUNCE_DELAY);
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
    timer = setTimeout(() => {
      setIsSelectListOpen(false);
      setHighlightedIndex(-1);
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

  const handleSelectElementMouseEnter = (index: number) => () => {
    setHighlightedIndex(index);
  };

  const handleSelectElementClick = (id: number) => () => {
    history.push(`#${id}`);
  };

  useEffect(() => {
    if (debouncedSearchValue) {
      dispatch(fetchFoundProducts({
        [SearchParamKey.Name.concat(SearchParamPostfix.Like)]: debouncedSearchValue,
      }));
    }

    return () => {
      dispatch(setFoundProducts([]));
      dispatch(setFoundProductsStatus(StatusType.Idle));
    };
  }, [dispatch, debouncedSearchValue]);

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
        style={foundProducts.length <= 0 && foundProductsStatus === StatusType.Success
          ? {borderColor:'#c90606'}
          : undefined}
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
      {isSelectListOpen && foundProducts.length > 0 && (
        <ul
          className="form-search__select-list"
          style={{zIndex: '1'}}
          tabIndex={-1}
        >
          {foundProducts.map((foundProduct, index) => (
            <li
              key={foundProduct.id}
              onMouseEnter={handleSelectElementMouseEnter(index)}
              onClick={handleSelectElementClick(foundProduct.id)}
              ref={(node: HTMLLIElement) => (selectElements.current[index] = node)}
              className="form-search__select-item"
              style={highlightedIndex === index
                ? {color:'#545454'}
                : undefined}
            >{foundProduct.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchForm;
