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

const getFocusableElements = (parentElement: Element): Element[] => {
  const focusableElements = [...parentElement.querySelectorAll('a, button, input, textarea, select, details, [tabindex]')];

  return focusableElements.filter((focusableElement) => (
    !focusableElement.hasAttribute('disabled')
    && focusableElement.getAttribute('tabindex') !== '-1'
  ));
};

export {createIndexList, addClassModifier, mergeSearchParams, getFocusableElements};
