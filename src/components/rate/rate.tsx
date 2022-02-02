import {ReactNode} from 'react';
import {createIndexList} from '../../utils';
import {MAX_STARS_COUNT} from '../../constants';

type RateProps = {
  className: string;
  width: string;
  height: string;
  rating: number;
  children?: ReactNode;
}

function Rate({className, width, height, rating, children}: RateProps): JSX.Element {
  return (
    <div className={`rate ${className}`} aria-hidden="true">
      <span className="visually-hidden">Рейтинг:</span>
      {createIndexList(MAX_STARS_COUNT).map((value) => (
        <svg
          key={`${value}-star`}
          width={width}
          height={height}
          aria-hidden="true"
          data-testid={(Math.round(rating) > value) ? 'star' : ''}
        >
          <use xlinkHref={`#${(Math.round(rating) > value) ? 'icon-full-star' : 'icon-star'}`} />
        </svg>
      ))}
      {children}
    </div>
  );
}

export default Rate;
