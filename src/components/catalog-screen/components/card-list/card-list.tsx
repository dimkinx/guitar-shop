import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {getProducts} from '../../../../store/products/products-selectors';
import Card from '../card/card';
import {ModalCartAdd, ModalCartAddSuccess} from '../../../modals/modals';
import {Product} from '../../../../types/product';
import {FOCUS_TIMEOUT, TRANSITION_DELAY} from '../../../../common/constants';

function CardList(): JSX.Element {
  const products = useSelector(getProducts);

  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [isProductAddedToCart, setIsProductAddedToCart] = useState<boolean>(false);
  const [isModalCartAddOpen, setIsModalCartAddOpen] = useState<boolean>(false);
  const [isModalCartAddSuccessOpen, setIsModalCartAddSuccessOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isProductAddedToCart) {
      setTimeout(() => {
        setIsModalCartAddSuccessOpen(true);
      }, FOCUS_TIMEOUT + TRANSITION_DELAY);
    }

    return () => {
      setIsProductAddedToCart(false);
    };
  }, [isProductAddedToCart]);

  return (
    <>
      {products.map((product) => (
        <Card
          key={product.id}
          onModalCartAddOpenClick={setIsModalCartAddOpen}
          onCurrentProductSelect={setCurrentProduct}
          product={product}
        />
      ))}
      <ModalCartAdd
        isModalOpen={isModalCartAddOpen}
        onModalOpenSelect={setIsModalCartAddOpen}
        onAddToCartButtonClick={setIsProductAddedToCart}
        product={currentProduct}
      />
      <ModalCartAddSuccess
        isModalOpen={isModalCartAddSuccessOpen}
        onModalOpenSelect={setIsModalCartAddSuccessOpen}
      />
    </>
  );
}

export default CardList;
