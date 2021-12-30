const createIndexList = (numberOfIndices: number): number[] => Array.from(Array(numberOfIndices).keys());

const addClassModifier = (predicate: boolean, className: string, modifier = 'active'): string => predicate
  ? `${className} ${className}--${modifier}`
  : className;

export {createIndexList, addClassModifier};
