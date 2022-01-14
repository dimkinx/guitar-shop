import {KeyboardEvent, ChangeEvent, useEffect, useState, FormEvent} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {useDebounce} from 'use-debounce';
import {getPriceRange} from '../../store/filter/filter-selectors';
import {fetchPriceRange} from '../../store/filter/filter-api-actions';
import {EssenceType, GuitarType, StringCountType} from '../../enums';
import {APP_LOCALE, DEBOUNCE_DELAY, SearchParamKey, SearchParamPostfix} from '../../constants';

const GuitarTypeToStringCountMap = new Map([
  [GuitarType.Acoustic, [StringCountType.Six, StringCountType.Seven, StringCountType.Twelve]],
  [GuitarType.Electric, [StringCountType.Four, StringCountType.Six, StringCountType.Seven]],
  [GuitarType.Ukulele, [StringCountType.Four]],
]);

const StringCountToGuitarTypeMap = new Map([
  [StringCountType.Four, [GuitarType.Ukulele, GuitarType.Electric]],
  [StringCountType.Six, [GuitarType.Acoustic, GuitarType.Electric]],
  [StringCountType.Seven, [GuitarType.Acoustic, GuitarType.Electric]],
  [StringCountType.Twelve, [GuitarType.Acoustic]],
]);

const parseURLSearchParams = (
  essenceType: EssenceType,
  params: URLSearchParams,
  searchParamKey: string,
  typeMap?: Map<GuitarType | StringCountType, (GuitarType | StringCountType)[]> | undefined,
) => {
  const stateMap = new Map();
  const values = params.getAll(searchParamKey);

  if (essenceType === EssenceType.Current) {
    return values;
  }

  values.forEach((value) => stateMap.set(value, typeMap?.get(value as GuitarType | StringCountType)));

  if (essenceType === EssenceType.Available) {
    return [...new Set([...stateMap.values()].flat())];
  }

  return stateMap;
};

function CatalogFilter(): JSX.Element {
  const availablePriceRange = useSelector(getPriceRange);

  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const initialSearchParams = new URLSearchParams(location.search);
  const [searchParams, setSearchParams] = useState(initialSearchParams.toString());
  const [debouncedSearchParams] = useDebounce(searchParams, DEBOUNCE_DELAY);

  const initialStatePriceRange = {
    min: initialSearchParams.has(SearchParamKey.Price.concat(SearchParamPostfix.Gte))
      ? Number(initialSearchParams.get(SearchParamKey.Price.concat(SearchParamPostfix.Gte)))
      : null,
    max: initialSearchParams.has(SearchParamKey.Price.concat(SearchParamPostfix.Lte))
      ? Number(initialSearchParams.get(SearchParamKey.Price.concat(SearchParamPostfix.Lte)))
      : null,
  };

  const [priceRange, setPriceRange] = useState(initialStatePriceRange);

  const initialStateCurrentGuitarTypes = parseURLSearchParams(EssenceType.Current, initialSearchParams, SearchParamKey.Type) as GuitarType[];
  const [currentGuitarTypes, setCurrentGuitarTypes] = useState<GuitarType[]>(initialStateCurrentGuitarTypes);

  const initialStateCurrentStringCounts = parseURLSearchParams(EssenceType.Current, initialSearchParams, SearchParamKey.StringCount) as StringCountType[];
  const [currentStringCounts, setCurrentStringCounts] = useState<StringCountType[]>(initialStateCurrentStringCounts);

  const initialStateAvailableGuitarTypes = parseURLSearchParams(EssenceType.Available, initialSearchParams, SearchParamKey.StringCount, StringCountToGuitarTypeMap) as GuitarType[];
  const [availableGuitarTypes, setAvailableGuitarTypes] = useState<GuitarType[]>(initialStateAvailableGuitarTypes);

  const initialStateAvailableStringCounts = parseURLSearchParams(EssenceType.Available, initialSearchParams, SearchParamKey.Type, GuitarTypeToStringCountMap) as StringCountType[];
  const [availableStringCounts, setAvailableStringCounts] = useState<StringCountType[]>(initialStateAvailableStringCounts);

  const initialStateCurrentGuitarTypeMap = parseURLSearchParams(EssenceType.StateMap, initialSearchParams, SearchParamKey.Type, GuitarTypeToStringCountMap) as Map<GuitarType, StringCountType[]>;
  const [guitarTypeMap, setGuitarTypeMap] = useState(() => initialStateCurrentGuitarTypeMap);

  const initialStateCurrentStringCountMap = parseURLSearchParams(EssenceType.StateMap, initialSearchParams, SearchParamKey.StringCount, StringCountToGuitarTypeMap) as Map<StringCountType, GuitarType[]>;
  const [stringCountMap, setStringCountMap] = useState(() => initialStateCurrentStringCountMap);

  const handleOnlyNumberKeyPress = (evt: KeyboardEvent<HTMLInputElement>) => {
    if (!/\d/.test(evt.key)) {
      evt.preventDefault();
    }
  };

  const handlePriceRangeChange = (evt: FormEvent<HTMLInputElement>) => {
    const value = evt.currentTarget.value;
    const name = evt.currentTarget.name;

    (value === '')
      ? setPriceRange({...priceRange, [name]: null})
      : setPriceRange({...priceRange, [name]: Number(value.replace(/\s/g, ''))});
  };

  const handlePriceRangeMinBlur = () => {
    if ((priceRange.min === 0 || priceRange.min) && priceRange.min < availablePriceRange.min) {
      setPriceRange({...priceRange, min: availablePriceRange.min});
    }
    if (priceRange.min && priceRange.min > availablePriceRange.max) {
      setPriceRange({...priceRange, min: availablePriceRange.max});
    }
    if (priceRange.min && priceRange.max && priceRange.min > priceRange.max) {
      setPriceRange({...priceRange, min: priceRange.max});
    }
  };

  const handlePriceRangeMaxBlur = () => {
    if ((priceRange.max === 0 || priceRange.max) && priceRange.max < availablePriceRange.min) {
      setPriceRange({...priceRange, max: availablePriceRange.min});
    }
    if (priceRange.max && priceRange.max > availablePriceRange.max) {
      setPriceRange({...priceRange, max: availablePriceRange.max});
    }
    if (priceRange.min && priceRange.max && priceRange.max < priceRange.min) {
      setPriceRange({...priceRange, max: priceRange.min});
    }
  };

  const handleGuitarTypeChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const checkbox = evt.currentTarget;

    setCurrentGuitarTypes(checkbox.checked
      ? [...currentGuitarTypes, checkbox.name as GuitarType]
      : currentGuitarTypes.filter((type) => type !== checkbox.name));

    setGuitarTypeMap(checkbox.checked
      ? () => guitarTypeMap.set(
        checkbox.name as GuitarType,
        GuitarTypeToStringCountMap.get(checkbox.name as GuitarType) as StringCountType[],
      )
      : () => {
        guitarTypeMap.delete(checkbox.name as GuitarType);
        return guitarTypeMap;
      });
  };

  const handleStringCountChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const checkbox = evt.currentTarget;

    setCurrentStringCounts(checkbox.checked
      ? [...currentStringCounts, checkbox.dataset.stringCount as StringCountType]
      : currentStringCounts.filter((stringCount) => stringCount !== checkbox.dataset.stringCount));

    setStringCountMap(checkbox.checked
      ? () => stringCountMap.set(
        checkbox.dataset.stringCount as StringCountType,
        StringCountToGuitarTypeMap.get(checkbox.dataset.stringCount as StringCountType) as GuitarType[],
      )
      : () => {
        stringCountMap.delete(checkbox.dataset.stringCount as StringCountType);
        return stringCountMap;
      });
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    params.delete(SearchParamKey.Price.concat(SearchParamPostfix.Gte));
    params.delete(SearchParamKey.Price.concat(SearchParamPostfix.Lte));

    dispatch(fetchPriceRange(params));
  }, [dispatch, location.search]);

  useEffect(() => {
    if (priceRange.min) {
      if (priceRange.min < availablePriceRange.min) {
        setPriceRange({...priceRange, min: availablePriceRange.min});
      }
      if (priceRange.min > availablePriceRange.max) {
        setPriceRange({...priceRange, min: availablePriceRange.max});
      }
    }
  }, [availablePriceRange.min, availablePriceRange.max, priceRange.max]);

  useEffect(() => {
    if (priceRange.max) {
      if (priceRange.max < availablePriceRange.min) {
        setPriceRange({...priceRange, max: availablePriceRange.min});
      }
      if (priceRange.max > availablePriceRange.max) {
        setPriceRange({...priceRange, max: availablePriceRange.max});
      }
    }
  }, [availablePriceRange.min, availablePriceRange.max, priceRange.min]);

  useEffect(() => {
    setAvailableGuitarTypes(() => [...new Set([...stringCountMap.values()].flat())] as GuitarType[]);
  }, [stringCountMap.size]);

  useEffect(() => {
    setAvailableStringCounts(() => [...new Set([...guitarTypeMap.values()].flat())]);
  }, [guitarTypeMap.size]);

  useEffect(() => {
    if (availableGuitarTypes.length) {
      setCurrentGuitarTypes(currentGuitarTypes.filter((guitarType) => availableGuitarTypes.includes(guitarType)));
    }
    if (availableStringCounts.length) {
      setCurrentStringCounts(currentStringCounts.filter((stringCount) => availableStringCounts.includes(stringCount)));
    }
  }, [availableGuitarTypes.length, availableStringCounts.length]);

  useEffect(() => {
    setGuitarTypeMap(() => {
      guitarTypeMap.clear();
      currentGuitarTypes.forEach((guitarType) => guitarTypeMap.set(
        guitarType,
        GuitarTypeToStringCountMap.get(guitarType as GuitarType) as StringCountType[],
      ));
      return guitarTypeMap;
    });
  }, [currentGuitarTypes.length, guitarTypeMap.size]);

  useEffect(() => {
    setStringCountMap(() => {
      stringCountMap.clear();
      currentStringCounts.forEach((stringCount) => stringCountMap.set(
        stringCount,
        StringCountToGuitarTypeMap.get(stringCount as StringCountType) as GuitarType[],
      ));
      return stringCountMap;
    });
  }, [currentStringCounts.length, stringCountMap.size]);

  useEffect(() => {
    const params = new URLSearchParams();

    if (priceRange.min
      && priceRange.min >= availablePriceRange.min
      && priceRange.min <= availablePriceRange.max) {
      params.append(SearchParamKey.Price.concat(SearchParamPostfix.Gte), priceRange.min.toString());
    }

    if (priceRange.max
      && priceRange.max >= availablePriceRange.min
      && priceRange.max <= availablePriceRange.max) {
      params.append(SearchParamKey.Price.concat(SearchParamPostfix.Lte), priceRange.max.toString());
    }

    if (priceRange.min && priceRange.max
      && priceRange.min > priceRange.max) {
      params.delete(SearchParamKey.Price.concat(SearchParamPostfix.Gte));
    }

    if (priceRange.min && priceRange.max
      && priceRange.max < priceRange.min) {
      params.delete(SearchParamKey.Price.concat(SearchParamPostfix.Lte));
    }

    currentGuitarTypes.forEach((guitarType) => params.append(SearchParamKey.Type, guitarType));
    currentStringCounts.forEach((stringCount) => params.append(SearchParamKey.StringCount, stringCount));

    setSearchParams(params.toString());
  }, [priceRange.max, priceRange.min, availablePriceRange.max, availablePriceRange.min, currentGuitarTypes.length, currentStringCounts.length]);

  useEffect(() => {
    history.replace({
      pathname: location.pathname,
      search: debouncedSearchParams,
      hash: location.hash,
    });
  }, [debouncedSearchParams]);

  return (
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Цена, ₽</legend>
        <div className="catalog-filter__price-range">
          <div className="form-input">
            <label className="visually-hidden">Минимальная цена</label>
            <input
              onKeyPress={handleOnlyNumberKeyPress}
              onChange={handlePriceRangeChange}
              onBlur={handlePriceRangeMinBlur}
              type="text"
              id="min"
              name="min"
              value={priceRange.min === 0 || priceRange.min ? priceRange.min.toLocaleString(APP_LOCALE) : ''}
              placeholder={availablePriceRange.min.toLocaleString(APP_LOCALE)}
            />
          </div>
          <div className="form-input">
            <label className="visually-hidden">Максимальная цена</label>
            <input
              onKeyPress={handleOnlyNumberKeyPress}
              onChange={handlePriceRangeChange}
              onBlur={handlePriceRangeMaxBlur}
              type="text"
              id="max"
              name="max"
              value={priceRange.max === 0 || priceRange.max ? priceRange.max.toLocaleString(APP_LOCALE) : ''}
              placeholder={availablePriceRange.max.toLocaleString(APP_LOCALE)}
            />
          </div>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Тип гитар</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            onChange={handleGuitarTypeChange}
            className="visually-hidden"
            type="checkbox"
            id="acoustic"
            name="acoustic"
            checked={currentGuitarTypes.includes(GuitarType.Acoustic)}
            disabled={Boolean(availableGuitarTypes.length) && !availableGuitarTypes.includes(GuitarType.Acoustic)}
          />
          <label htmlFor="acoustic">Акустические гитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            onChange={handleGuitarTypeChange}
            className="visually-hidden"
            type="checkbox"
            id="electric"
            name="electric"
            checked={currentGuitarTypes.includes(GuitarType.Electric)}
            disabled={Boolean(availableGuitarTypes.length) && !availableGuitarTypes.includes(GuitarType.Electric)}
          />
          <label htmlFor="electric">Электрогитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            onChange={handleGuitarTypeChange}
            className="visually-hidden"
            type="checkbox"
            id="ukulele"
            name="ukulele"
            checked={currentGuitarTypes.includes(GuitarType.Ukulele)}
            disabled={Boolean(availableGuitarTypes.length) && !availableGuitarTypes.includes(GuitarType.Ukulele)}
          />
          <label htmlFor="ukulele">Укулеле</label>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Количество струн</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            onChange={handleStringCountChange}
            className="visually-hidden"
            type="checkbox"
            id="4-strings"
            name="4-strings"
            data-string-count={StringCountType.Four}
            checked={currentStringCounts.includes(StringCountType.Four)}
            disabled={Boolean(availableStringCounts.length) && !availableStringCounts.includes(StringCountType.Four)}
          />
          <label htmlFor="4-strings">4</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            onChange={handleStringCountChange}
            className="visually-hidden"
            type="checkbox"
            id="6-strings"
            name="6-strings"
            data-string-count={StringCountType.Six}
            checked={currentStringCounts.includes(StringCountType.Six)}
            disabled={Boolean(availableStringCounts.length) && !availableStringCounts.includes(StringCountType.Six)}
          />
          <label htmlFor="6-strings">6</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            onChange={handleStringCountChange}
            className="visually-hidden"
            type="checkbox"
            id="7-strings"
            name="7-strings"
            data-string-count={StringCountType.Seven}
            checked={currentStringCounts.includes(StringCountType.Seven)}
            disabled={Boolean(availableStringCounts.length) && !availableStringCounts.includes(StringCountType.Seven)}
          />
          <label htmlFor="7-strings">7</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            onChange={handleStringCountChange}
            className="visually-hidden"
            type="checkbox"
            id="12-strings"
            name="12-strings"
            data-string-count={StringCountType.Twelve}
            checked={currentStringCounts.includes(StringCountType.Twelve)}
            disabled={Boolean(availableStringCounts.length) && !availableStringCounts.includes(StringCountType.Twelve)}
          />
          <label htmlFor="12-strings">12</label>
        </div>
      </fieldset>
    </form>
  );
}

export default CatalogFilter;
