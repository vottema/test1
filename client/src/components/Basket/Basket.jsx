import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchBuyItems, fetchInitBasket } from "../../redux/asyncActionCreators/basketAAC";
import ModalCheckItem from "../ModalCheckItem/ModalCheckItem";
import { fetchDelItems } from "../../redux/asyncActionCreators/basketAAC";
function Basket(props) {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchInitBasket())
  }, [dispatch])
  const { items } = useSelector(state => state.basketReducer)
  const { checkItems } = useSelector(state => state.basketReducer)
  const filterItems = checkItems.filter(item => +item.amount === 0).map(item => item.id)
  const { rates } = useSelector(state => state.ratesApiReducer)
  const pay = () => {
    const idItemsPay = items.map(item => item.id)
    dispatch(fetchInitBasket())
    if (filterItems.length === 0) {
      dispatch(fetchBuyItems({ id: idItemsPay }))
    }
  }
  const del = (event) => {
    dispatch(fetchDelItems({ id: event.target.id }))
    setTimeout(() => {
      dispatch(fetchInitBasket())
    }, 50);
  }
  return (
    <>
      <div className="row row-cols-1 row-cols-md-3 g-4 m-3">
        {items.length ?
          items.map(item =>
            <div className="col" key={item.id}>
              <div className="card h-100">
                <img src="https://zagadki-dlya-detej.ru/wp-content/webpc-passthru.php?src=https://zagadki-dlya-detej.ru/wp-content/uploads/2020/08/les.jpg&nocache=1" className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">
                    Price:
                    <br />
                    {`${item.priceUSD} USD`}
                    <br />
                    {`${Math.floor((item.priceUSD * rates) * 100) / 100} RUB`}
                  </p>
                  <p className="card-text">{`Количество на складе: ${item.amount}`}</p>
                  <button id={item.id} onClick={del} type="button" className="btn btn-danger">Удалить</button>
                </div>
              </div>
            </div>
          )
          :
          <div>
            Корзина пуста
          </div>
        }
      </div>
      <center>
        {items.length ? <button onClick={pay} type="button" className="btn btn-success">Оплатить</button> : ''}
      </center>
      {filterItems.length ?
        <ModalCheckItem idItems={filterItems} />
        :
        ''
      }
      <div className='payMess my-3'></div>
    </>
  );
}

export default Basket;
