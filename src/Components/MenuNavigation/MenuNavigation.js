import React, { Component } from 'react';
import {
    BsFillHouseDoorFill, BsFillPersonFill, BsFillGrid3X3GapFill,
    BsFillFlagFill, BsFillArchiveFill, BsFillPeopleFill
} from "react-icons/bs";

import './MenuNavigation.css';
class MenuNavigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            strDataUser: JSON.parse(localStorage.getItem('strJsonUser'))
        }
    }
    //DeterminarMenu
    Menu = () => {
        try {
            if (this.state.strDataUser.intIdTypeUser == 2) {
                return (
                    <li>
                        <a href="/CreateOrder">
                            <BsFillPeopleFill />
                            <small>Create Order</small>
                        </a>
                    </li>
                );
            } else {
                return (
                    <span>
                        <li>
                            <a href="/">
                                <BsFillHouseDoorFill />
                                <small>Home</small>
                            </a>
                        </li>
                        {/*<li>
                            <a href="/Order">
                                <BsFillPeopleFill />
                                <small>Order</small>
                            </a>
                        </li>*/}
                        <li>
                            <a href="/Sellers">
                                <BsFillPersonFill />
                                <small>Sellers</small>
                            </a>
                        </li>
                        <li>
                            <a href="/Zones">
                                <BsFillGrid3X3GapFill />
                                <small>Zones</small>
                            </a>
                        </li>
                        <li>
                            <a href="/Cities">
                                <BsFillFlagFill />
                                <small>Cities</small>
                            </a>
                        </li>
                        <li>
                            <a href="/Products">
                                <BsFillArchiveFill />
                                <small>Products</small>
                            </a>
                        </li>
                        <li>
                            <a href="/Customers">
                                <BsFillPeopleFill />
                                <small>Customers</small>
                            </a>
                        </li>
                    </span>);
            }
        } catch (Error) {
            console.log(Error)
        }
    }
    render() {
        return (
            <nav className='Container-MenuNavigation'>
                <ul>
                    {this.Menu()}
                </ul>
            </nav>
        );
    }
}

export default MenuNavigation;