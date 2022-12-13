import { Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from 'axios';

const EditFoodModal = ({ item, show, handleClose }) => {
  const [id, setId] = useState(item.id),
    [name, setName] = useState(item.name),
    [price, setPrice] = useState(item.price),
    [category_id, setCategory_id] = useState(item.category_id),
    [cost, setCost] = useState(item.cost),
    [image, setImage] = useState(item.image),
    [info, setInfo] = useState(item.info),
    [qty_day, setQty_day] = useState(item.qty_day);

  const save = async (e) => {
    if (!name || !qty_day || !image || !category_id || !cost || !price) {
      alert('Chưa điền đầy đủ thông tin');
    }
    else {
      let form_data = new FormData();
      form_data.append('id', id);
      form_data.append('name', name);
      form_data.append('info', info);
      form_data.append('qty_day', qty_day);
      form_data.append('image', image);
      form_data.append('category_id', category_id);
      form_data.append('price', price);
      form_data.append('cost', cost);
      const json = {};
      Array.from(form_data.entries()).forEach(([key, value]) => {
        json[key] = value;
      })
      axios.put(`/api/food`, JSON.stringify(json), {
        headers: {
          'content-type': 'multipart/form-data'
        }
      })
      .catch(err => console.error(err));
      handleClose();
    }
  }

  useEffect(() => {
    if (item) {
      setId(item.id);
      setName(item.name);
      setPrice(item.price);
      setCategory_id(item.category_id);
      setCost(item.cost);
      setImage(item.image);
      setInfo(item.info);
      setQty_day(item.qty_day);
    }
  }, [item])
  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      onHide={handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>Chỉnh sửa thông tin món ăn</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container">
          <div className="col-sm-12" >
            <form>
              <div className="input-group">
                <span className="input-group-text"> Tên món </span>
                <input id="name" name="name" className="form-control" type="text" value={name} onChange={e => setName(e.target.value)} required />
              </div>
            </form>
            <br />
            <div className="row">
              <div className="col-sm-6">
                <form>
                  <div className="input-group">
                    <span className="input-group-text"> Phân loại </span>
                    <input type="number" min={1} max={6} id="category_id" name="category_id" className="form-control" value={category_id} onChange={e => setCategory_id(e.target.value)} required />
                  </div>
                </form>
                <br />
              </div>
              <div className="col-sm-6">
                <form>
                  <div className="input-group">
                    <span className="input-group-text" > Số lượng </span>
                    <input name="qty_day" id="qty_day" min={1} type="number" className="form-control" value={qty_day} onChange={e => setQty_day(e.target.value)} required />
                  </div>
                </form >
              </div>
              <br />
              <form>
                <div className="input-group">
                  <span className="input-group-text"> Mô tả </span>
                  <input name="info" id="info" type="text" className="form-control" value={info} onChange={e => setInfo(e.target.value)} required />
                </div>
                <br />
              </form>
              <div className="container-fluid">
                <div className="row" >
                  <div className="col-sm-6">
                    <form>
                      <div className="input-group">
                        <span className="input-group-text"> Giá vốn </span>
                        <input type="number" id="cost" min={1000} step={1000} className="form-control" name="cost" value={cost} onChange={e => setCost(e.target.value)} required />
                      </div>
                    </form >
                    <br />
                  </div>
                  <div className="col-sm-6" >
                    <form >
                      <div className="input-group">
                        <span className="input-group-text"> Giá bán </span>
                        <input id="price" type="number" min={1000} step={1000} className="form-control" value={price} name="price" onChange={e => setPrice(e.target.value)} required />
                      </div>
                    </form >
                  </div>
                </div>
              </div>

            </div>
            <br />
          </div>
          <div className="col-sm-12" >
            <div className="menu_image" style={{ textAlign: 'center' }}>
              {/* {image && <button type='button' style={{ position: 'absolute', marginLeft: '35%', border: 'none' }} onClick={() => setImage('')} > <i className='fa fa-times'></i> </button>}
              {!image && <input type="file" id="image" required />} */}
              <img src={image} style={{ display: item ? 'block' : 'none', marginLeft: '20%', width: '50%', height: '50%', textAlign: 'center' }} alt={''} width='80%' height='80%' />

            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-secondary" onClick={handleClose}>
          Đóng
        </button>
        <button className="btn btn-primary" onClick={save}>
          Lưu
        </button>
      </Modal.Footer>
    </Modal>
  )
}

export default EditFoodModal;