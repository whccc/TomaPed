import React, { Component } from 'react';
import {
    BsFillHouseDoorFill, BsFillPersonFill, BsFillGrid3X3GapFill,
    BsFillFlagFill, BsFillArchiveFill, BsFillBriefcaseFill, BsFillPeopleFill
} from "react-icons/bs";

import './MenuNavigation.css';
class MenuNavigation extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <nav className='Container-MenuNavigation'>
                <ul>
                    <li>
                            <a href="/">
                                <BsFillHouseDoorFill />
                                <small>Home</small>
                            </a>
                    </li>
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
                            <a href="/TypeOrders">
                                <BsFillBriefcaseFill />
                                <small>Type Orders</small>
                            </a>
                    </li>
                    <li>
                         <a href="/Customers">
                                <BsFillPeopleFill />
                               
                                    <small>Customers</small>
                                
                            </a>
                    </li>
                    <li>

                    </li>
                </ul>
            </nav>
        );
    }
}

export default MenuNavigation;