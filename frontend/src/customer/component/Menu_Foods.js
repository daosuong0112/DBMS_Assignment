import Item from "./Item";
import "../css/box.css"
import axios from "axios";
import React, { useState, useEffect } from "react";
const FoodType = [
    "Món chính",
    "Món ăn vặt",
    "Tất cả"
]

const Menu = ({ name, desc }) => {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState('');
    function handleFilter(type) {
        if (type == "Món chính") {
            setFilter(1)
        }
        else if (type == "Món ăn vặt") {
            setFilter(2)
        }
        else setFilter('')
    }
    useEffect(() => {
        let query = ''
        if (!filter) query = 'type=1&type=2';
        else query = `type=${filter}`
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
                        <button className="btn btn-info" id={type} onClick={() => handleFilter(type)}> {type}</button>
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
