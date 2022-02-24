import {useState} from 'react';
import {useSelector} from 'react-redux';
import {getProductsInCart} from '../../store/cart/cart-selectors';
import {Header, Breadcrumbs, Footer} from '../shared/shared';
import {CartFooter, CartItem} from './components/components';
import {ModalCartDelete} from '../modals/modals';
import {ProductInCart} from '../../types/product';

function CartScreen(): JSX.Element {
  const products = useSelector(getProductsInCart);

  const [currentProduct, setCurrentProduct] = useState<ProductInCart | null>(null);
  const [isModalCartDeleteOpen, setIsModalCartDeleteOpen] = useState<boolean>(false);

  return (
    <>
      <div className="wrapper">
        <Header />
        <main className="page-content">
          <div className="container">
            <h1 className="title title--bigger page-content__title">Корзина</h1>
            <Breadcrumbs />
            <div className="cart">
              {products.length
                ? (
                  <>
                    {products.map((product) => (
                      <CartItem
                        key={product.id}
                        onModalCartDeleteOpenClick={setIsModalCartDeleteOpen}
                        onCurrentProductSelect={setCurrentProduct}
                        product={product}
                      />
                    ))}
                    <CartFooter />
                  </>
                )
                : <h3 className="title--center">В корзине пока нет товаров</h3>}
            </div>
          </div>
        </main>
        <Footer />
      </div>
      <ModalCartDelete
        isModalOpen={isModalCartDeleteOpen}
        onModalOpenSelect={setIsModalCartDeleteOpen}
        product={currentProduct}
      />
    </>
  );
}

export default CartScreen;
