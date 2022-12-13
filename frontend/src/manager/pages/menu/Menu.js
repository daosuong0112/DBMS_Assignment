import React, { Component } from 'react';
import axios from 'axios';
import "./Menu.css";
import AddMenu from "./AddMenu.js";
import { Table } from "react-bootstrap"
import EditFoodModal from './EditFoodModal';

class Menu extends Component {

  state = {
    id: 0,
    name: "",
    info: "",
    qty_day: 0,
    image: null,
    category_id: 1,
    price: 0,
    cost: 0,
    dish: [],
    drink: [],
    show: false,
    editItem: {}
  };


  componentDidMount() {
    this.getData();
  }
  getData() {
    axios
      .get("/api/food?type=1&type=2")
      .then((res) => this.setState({ dish: res.data }))
      .catch(error => console.error(error));
    axios
      .get("/api/food?type=3&type=4&type=5&type=6")
      .then((res) => this.setState({ drink: res.data }))
      .catch(error => console.error(error));
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  };
  handleClose = () => {
    this.setState({ show: false, editItem: {} });
    setTimeout(() => this.getData(), 500)
  }

  handleImageChange = (e) => {
    this.setState({
      image: e.target.files[0]
    })
  };

  handleDelete = (id, name) => {
    if (window.confirm(`Bạn có muốn xóa món ${name} khỏi thực đơn không?`)) {
      axios.delete(`/api/food/` + id)
        .then(() => { this.getData(); }
        ).catch(error => console.error(error));
    }
    else { };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.state.name || !this.state.qty_day || !this.state.image || !this.state.category_id || !this.state.cost || !this.state.price) {
      alert('Chưa điền đầy đủ thông tin');
    }
    else {
      let form_data = new FormData();
      form_data.append('id', this.state.id);
      form_data.append('name', this.state.name);
      form_data.append('info', this.state.info);
      form_data.append('qty_day', this.state.qty_day);
      form_data.append('image', this.state.image);
      form_data.append('category_id', this.state.category_id);
      form_data.append('price', this.state.price);
      form_data.append('cost', this.state.cost);
      axios.post(`/api/food`, form_data, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      })
        .then(() => {
          this.setState({
            name: "",
            info: "",
            qty_day: 0,
            image: null,
            category_id: 1,
            price: 0,
            cost: 0,
          });
          this.getData();
        })
        .catch(err => console.log(err))
    }
  };

  render() {
    const data = [...this.state.dish, ...this.state.drink];
    return (
      <div className="App">
        <h1 className="fw-bold p-3" > Thêm món </h1>
        <form onSubmit={this.handleSubmit}>

          <div className="Menu_1"  >

            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-8" >
                  <form>
                    <div className="input-group">
                      <span className="input-group-text"> Tên món </span>
                      <input id="name" name="name" className="form-control" type="text" value={this.state.name} onChange={this.handleChange} required />
                    </div>
                  </form>
                  <br />
                  <div className="row">
                    <div className="col-sm-6">
                      <form>
                        <div className="input-group">
                          <span className="input-group-text"> Phân loại </span>
                          <input type="number" min={1} max={2} id="category_id" name="category_id" className="form-control" value={this.state.category_id} onChange={this.handleChange} required />
                        </div>
                      </form>
                      <br />
                    </div>
                    <div className="col-sm-6">
                      <form>
                        <div className="input-group">
                          <span className="input-group-text" > Số lượng </span>
                          <input name="qty_day" id="qty_day" min={1} type="number" className="form-control" value={this.state.qty_day} onChange={this.handleChange} required />
                        </div>
                      </form >
                    </div>
                    <br />
                    <form>
                      <div className="input-group">
                        <span className="input-group-text"> Mô tả </span>
                        <input name="info" id="info" type="text" className="form-control" value={this.state.info} onChange={this.handleChange} required />
                      </div>
                      <br />
                    </form>
                    <div className="container-fluid">
                      <div className="row" >
                        <div className="col-sm-6">
                          <form>
                            <div className="input-group">
                              <span className="input-group-text"> Giá vốn </span>
                              <input type="number" id="cost" min={1000} step={1000} className="form-control" name="cost" value={this.state.cost} onChange={this.handleChange} required />
                            </div>
                          </form >
                          <br />
                        </div>
                        <div className="col-sm-6" >
                          <form >
                            <div className="input-group">
                              <span className="input-group-text"> Giá bán </span>
                              <input id="price" type="number" min={0} step={1000} className="form-control" value={this.state.price} name="price" onChange={this.handleChange} required />
                            </div>
                          </form >
                        </div>
                      </div>
                    </div>
                    <div className="container-fluid">
                      <div className="row" >
                        <div className="col-sm-6">
                        </div>
                      </div>
                    </div>
                  </div>
                  <br />
                </div>
                <div className="col-sm-4" >
                  <div className="menu_image" style={{ textAlign: 'center' }}>
                    {this.state.image && <button type='button' style={{ position: 'absolute', marginLeft: '35%', border: 'none' }} onClick={() => this.setState({ image: null })}> <i className='fa fa-times'></i> </button>}
                    {!this.state.image && <input type="file" id="image" onChange={this.handleImageChange} required />}
                    <img src={this.state.image ? URL.createObjectURL(this.state.image) : ''} style={{ display: this.state.image ? 'block' : 'none', marginTop: '10%', marginLeft: '10%', width: '70%', height: '80%' }} alt={this.state.image} width='80%' height='80%' />
            
                  </div>
                </div>
              </div>
            </div>

          </div>
          <div className="container-fluid">
            <div className="row" >
              <div className="col-sm-8">
                <div className="type_button">
                  <button className="btn btn-primary" style={{ whiteSpace: 'nowrap' }} type="submit">Thêm vào</button>
                </div>
              </div>
              <div className="col-sm-4"> <AddMenu /></div>
            </div>
          </div>
          {data && <div className="container-fluid" style={{ marginTop: '20px' }}>
            <Table striped bordered hover>
              <thead>
                <th style={{ with: 'auto', whiteSpace: 'nowrap' }}>ID</th>
                <th style={{ with: 'auto', whiteSpace: 'nowrap' }}>Tên món</th>
                <th style={{ with: 'auto', whiteSpace: 'nowrap' }}>Giá vốn</th>
                <th style={{ with: 'auto', whiteSpace: 'nowrap' }}>Giá bán</th>
                <th style={{ with: 'auto', whiteSpace: 'nowrap' }}>Thông tin</th>
                <th style={{ with: 'auto', whiteSpace: 'nowrap' }}>Hình ảnh</th>
                <th style={{ with: 'auto', whiteSpace: 'nowrap' }}>Số lượng</th>
                <th style={{ with: 'auto', whiteSpace: 'nowrap' }}>Thao tác</th>
              </thead>

              <tbody>
                {data && data.map((item, index) => {
                  return <tr key={index}>
                    <td style={{ width: 'auto', verticalAlign: "middle" }}> {item.id} </td>
                    <td style={{ width: '30%', textAlign: 'left', verticalAlign: "middle" }}> {item.name}</td>
                    <td style={{ width: 'auto', verticalAlign: "middle" }}>{item.cost} </td>
                    <td style={{ width: 'auto', verticalAlign: "middle" }}>{item.price} </td>
                    <td style={{ width: '40%', textAlign: 'left', verticalAlign: "middle" }}>{item.info} </td>
                    <td style={{ width: '20%', verticalAlign: "middle" }}><div className="product-img"><img src={item.image} alt="" /></div></td>
                    <td style={{ width: 'auto', verticalAlign: "middle" }}> {item.qty_day}</td>
                    <td style={{ width: 'auto', verticalAlign: "middle", whiteSpace: 'nowrap' }}>
                      <button className='btn btn-info' style={{ marginRight: '5px' }} onClick={e => e.preventDefault() || this.setState({ show: true, editItem: item })}>
                        <i className='fa fa-cog'></i>
                      </button>
                      <button className='btn btn-danger' onClick={e => e.preventDefault() || this.handleDelete(item.id, item.name)}>
                        <i className='fa fa-times'></i>
                      </button>
                    </td>
                  </tr>
                })}
              </tbody>
            </Table>
          </div>}
        </form>
        <EditFoodModal show={this.state.show} handleClose={this.handleClose} item={this.state.editItem}/>
      </div>
    );
  }
}

export default Menu;
