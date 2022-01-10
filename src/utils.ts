const createIndexList = (numberOfIndices: number): number[] => Array.from(Array(numberOfIndices).keys());

const addClassModifier = (predicate: boolean, className: string, modifier = 'active'): string => predicate
  ? `${className} ${className}--${modifier}`
  : className;

const mergeSearchParams = (firstSearchParams: URLSearchParams, secondSearchParams: URLSearchParams): URLSearchParams => {
  const result = new URLSearchParams('');

  firstSearchParams.forEach((value, key) => result.append(key, value));
  secondSearchParams.forEach((value, key) => result.append(key, value));

  return result;
};

export {createIndexList, addClassModifier, mergeSearchParams};
