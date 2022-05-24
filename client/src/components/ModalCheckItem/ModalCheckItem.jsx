import { useDispatch } from 'react-redux';
import { fetchDelItems } from '../../redux/asyncActionCreators/basketAAC';
import './ModalCheckItem.css'

function ModalCheckItem({ idItems }) {
  const dispatch = useDispatch()
  const delItems = () => {
    dispatch(fetchDelItems({ id: idItems }))
    window.location.reload()
  }
  return (
    <div className="modal">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title"></h5>
          </div>
          <div className="modal-body">
            <p>Товары отсутствующие на складе будут убраны из корзины</p>
          </div>
          <div className="modal-footer">
            <button onClick={delItems} type="button" className="btn btn-primary">Ok</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalCheckItem;
