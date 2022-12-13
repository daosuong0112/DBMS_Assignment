import Item from "./Item";
import "../css/box.css"
import axios from "axios";
import React, { useState, useEffect } from "react";
const FoodType = [
    "Món chính",
    "Món ăn vặt"
]

const Menu = ({ name, desc, price, addItem }) => {
    const [data, setData] = useState([]);

    const [filter, setFilter] = useState([]);
    function handleFilter(e) {
        if (e.target.checked) {
            setFilter(
                [...filter,
                parseInt(e.target.value)
                ])
        } else {
            setFilter(filter.filter(a => a != parseInt(e.target.value)))
        }
    }
    useEffect(() => {
        let query = ''
        if (!filter.length) query = 'type=1&type=2';
        else filter.forEach(type => query += `type=${type}&`)
        axios
            .get(`/api/food?${query}`)
            .then((res) => setData(res.data));
    }, [filter])

    return (
        <>
            <section className="filters" style={{ textAlign: 'right' }}>
                <ul>
                    {FoodType.map(type => (
                        <li key={type}>
                            <label>
                                <input
                                    type="checkbox"
                                    value={type == "Món chính" ? 1 : 2}
                                    onChange={handleFilter}
                                />
                                {type}
                            </label>
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
