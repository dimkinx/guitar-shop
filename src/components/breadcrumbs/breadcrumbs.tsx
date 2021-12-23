function Breadcrumbs(): JSX.Element {
  return (
    <ul className="breadcrumbs page-content__breadcrumbs">
      <li className="breadcrumbs__item">
        <a className="link" href="#">Главная</a>
      </li>
      <li className="breadcrumbs__item">
        <a className="link">Каталог</a>
      </li>
    </ul>
  );
}

export default Breadcrumbs;
