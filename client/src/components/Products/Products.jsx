import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchInitProducts } from "../../redux/asyncActionCreators/productsAAC";
import { fetchAddItem } from "../../redux/asyncActionCreators/productsAAC";
import { fetchCheckRates } from "../../redux/asyncActionCreators/ratesApiAAC";
import { fetchInitBasket } from "../../redux/asyncActionCreators/basketAAC";
function Products(props) {
  const dispatch = useDispatch()

  const [ratesUpdate, setRatesUpdate] = useState(0)
  useEffect(() => {
    dispatch(fetchCheckRates())
    setTimeout(() => {
      setRatesUpdate((prev) => prev + 1)
    }, 120000);
  }, [ratesUpdate])
  const { rates } = useSelector(state => state.ratesApiReducer)
 
  useEffect(() => {
    dispatch(fetchInitBasket())
    dispatch(fetchInitProducts())
  }, [dispatch])
  const { products } = useSelector(state => state.productsReducer)
  const { items } = useSelector(state => state.basketReducer)
  const idBasketItems = items.map(item => item.id)

  const newProducts = products.map(product => {
    if (idBasketItems.includes(product.id)) {
      return { ...product, check: true }
    } else {
      return product
    }
  })
  const addItem = (event) => {
    dispatch(fetchAddItem({ id: event.target.id }))
    const item = newProducts.filter(el => el.id === +event.target.id)
    dispatch({ type: 'UPDATE_BASKET', payload: item[0] });
  }
  return (
    <>
      <div className="row row-cols-1 row-cols-md-3 g-4 m-3">
        {products.length ? newProducts.map(product =>
          <div className="col" key={product.id}>
            <div className="card h-100">
              <img src="https://zagadki-dlya-detej.ru/wp-content/webpc-passthru.php?src=https://zagadki-dlya-detej.ru/wp-content/uploads/2020/08/les.jpg&nocache=1" className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">
                  Price:
                  <br />
                  {`${product.priceUSD} USD`}
                  <br />
                  {`${Math.floor((product.priceUSD * rates) * 100) / 100} RUB`}
                </p>
                <p className="card-text">{`Количество на складе: ${product.amount}`}</p>
                {product.amount === 0 || product.check ?
                  <button type="button" className="btn btn-dark" disabled>В корзину</button>:
                  <button id={product.id} onClick={addItem} type="button" className="btn btn-dark" >В корзину</button> 
                }
              </div>
            </div>
          </div>

        ) : 'NO DATA'}
      </div>
    </>
  );
}

export default Products;
