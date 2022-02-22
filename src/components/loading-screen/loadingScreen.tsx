import {Watch} from 'react-loader-spinner';
import {LoaderParam} from '../../common/constants';
import './style.css';

const {Color, Size: {Width, Height}} = LoaderParam;

function LoadingScreen(): JSX.Element {
  return (
    <>
      <h1 className="visually-hidden">Loading screen</h1>
      <div className="wrapper-loading">
        <Watch
          color={Color}
          width={Width}
          height={Height}
          ariaLabel="loading"
        />
      </div>
    </>
  );
}

export default LoadingScreen;
