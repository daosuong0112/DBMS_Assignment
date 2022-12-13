import React, { Component } from 'react';
import Menu from './component/Menu_Foods';

export class Foods extends Component {
    render() {
        return (
            <div>
                <Menu name="Đồ ăn" desc="Delicious food is here" />
            </div>
        )
    }
}