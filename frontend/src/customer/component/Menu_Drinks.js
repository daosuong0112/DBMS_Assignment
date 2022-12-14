import Item from "./Item";
import "../css/box.css"
import axios from "axios";
import React, { useState, useEffect } from "react";
const DrinkType = [
    { id: 3, name: "Nước ép" },
    { id: 4, name: "Trà Sữa" },
    { id: 5, name: "Trà" },
    { id: 6, name: "Chè" },
    { id: '', name: "Tất cả" }
]
const Menu = ({ name, desc, price, addItem }) => {
    const [data, setData] = useState([]);

    const [filter, setFilter] = useState('');
    function handleFilter(id) {
        setFilter(id);
    }
    useEffect(() => {
        let query = ''
        if (!filter) query = 'type=3&type=4&type=5&type=6';
        else query = `type=${filter}`;
        axios
            .get(`/api/food?${query}`)
            .then((res) => setData(res.data));
    }, [filter])

    return (<>
        <section
            className="filters" style={{ textAlign: 'right' }}>
            <ul>
                {DrinkType.map((type, index) => (
                    <li key={index}>
                        <button className="btn btn-info" id={type.id} onClick={() => handleFilter(type.id)}> {type.name}</button>
                    </li>
                ))}
            </ul>
        </section>
        <section className="features-boxed">
            <div className="container">
                <div className="intro">
                    <h2 className="text-center">{name}</h2>
                    <p className="text-center">{desc}</p>
                </div>
                <div className="row justify-content-center features">
                    {
                        data.map((data, index) => (
                            <Item
                                item_id={data.id}
                                name={data.name}
                                desc={data.info}
                                img={"http://127.0.0.1:8000" + data.image}
                                price={data.price}
                            />
                        ))
                    }
                </div>
            </div>
        </section>
    </>
    );
};

export default Menu;
