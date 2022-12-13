import Tables from "./Tables"
import { Table } from "react-bootstrap"
import { useState } from "react";
import React from 'react';

const POSITIONS = [
  "Quản lý", 
  "Shipper", 
  "Tiếp tân", 
]

const EManager = () => {
  const [filter, setFilter] = useState([])

  function handleFilter(e) {
    if (e.target.checked) {
      setFilter(
      [...filter,
        e.target.value
      ])
    } else {
      setFilter(filter.filter(a => a !== e.target.value))
    }
  }

  return (
    <>
      <h1 className="fw-bold p-3">Quản lý nhân viên</h1>
      <section 
      className="filters">      
      <ul>
        {POSITIONS.map(position => (
          <li key={position}>
            <label>
              <input 
                type="checkbox"
                value={(position === "Quản lý" ? "'M'" : (position === "Shipper" ? "'S'" : "'R'"))} 
                onChange={handleFilter}
                />
              {position}
            </label>
          </li>
        ))}
      </ul>
    </section>
      <div className="p-5 text-center">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Mã nhân viên</th>
              <th>Avatar</th>
              <th>Họ và Tên</th>
              <th>Email</th>
              <th>Chức vụ</th>
            </tr>
          </thead>
          <tbody>
            <Tables pos={filter}/>
          </tbody>
        </Table>
      </div>
    </>
  )
}

export default EManager