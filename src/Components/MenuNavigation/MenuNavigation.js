import React, { Component } from 'react';
import {
    BsFillHouseDoorFill, BsFillPersonFill, BsFillGrid3X3GapFill,
    BsFillFlagFill, BsFillArchiveFill, BsFillBriefcaseFill, BsFillPeopleFill
} from "react-icons/bs";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Media from 'react-media';

import './MenuNavigation.css';
class MenuNavigation extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        const renderTooltipHome = (props) => (
            <Tooltip id="button-tooltip" {...props}>
                Home
            </Tooltip>
        );
        const renderTooltipSellers = (props) => (
            <Tooltip id="button-tooltip" {...props}>
                Sellers
            </Tooltip>
        );
        const renderTooltipZones = (props) => (
            <Tooltip id="button-tooltip" {...props}>
                Zones
            </Tooltip>
        );
        const renderTooltipCities = (props) => (
            <Tooltip id="button-tooltip" {...props}>
                Cities
            </Tooltip>
        );
        const renderTooltipProducts = (props) => (
            <Tooltip id="button-tooltip" {...props}>
                Products
            </Tooltip>
        );
        const renderTooltipTypeOrders = (props) => (
            <Tooltip id="button-tooltip" {...props}>
                Type state orders
            </Tooltip>
        );
        const renderTooltipCustomers = (props) => (
            <Tooltip id="button-tooltip" {...props}>
                Customers
            </Tooltip>
        );
        return (
            <nav className='Container-MenuNavigation'>
                <ul>
                    <li>
                        <OverlayTrigger
                            placement="right"
                            delay={{ show: 100, hide: 200 }}
                            overlay={renderTooltipHome}>
                            <a href="/">

                                <BsFillHouseDoorFill />
                                <Media query="(max-width: 599px)" render={() =>
                                (
                                    <small>Home</small>
                                )}
                                />
                            </a>

                        </OverlayTrigger>
                    </li>
                    <li>
                        <OverlayTrigger
                            placement="right"
                            delay={{ show: 100, hide: 200 }}
                            overlay={renderTooltipSellers}>
                            <a href="#">
                                <BsFillPersonFill />
                                <Media query="(max-width: 599px)" render={() =>
                                (
                                    <small>Sellers</small>
                                )}
                                />
                            </a>
                        </OverlayTrigger>
                    </li>
                    <li>
                        <OverlayTrigger
                            placement="right"
                            delay={{ show: 100, hide: 200 }}
                            overlay={renderTooltipZones}>
                            <a href="#">

                                <BsFillGrid3X3GapFill />
                                <Media query="(max-width: 599px)" render={() =>
                                (
                                    <small>Zones</small>
                                )}
                                />
                            </a>

                        </OverlayTrigger>
                    </li>
                    <li>
                        <OverlayTrigger
                            placement="right"
                            delay={{ show: 100, hide: 200 }}
                            overlay={renderTooltipCities}>
                            <a href="#">

                                <BsFillFlagFill />
                                <Media query="(max-width: 599px)" render={() =>
                                (
                                    <small>Cities</small>
                                )}
                                />
                            </a>

                        </OverlayTrigger>
                    </li>
                    <li>
                        <OverlayTrigger
                            placement="right"
                            delay={{ show: 100, hide: 200 }}
                            overlay={renderTooltipProducts}>
                            <a href="#">
                                <BsFillArchiveFill />
                                <Media query="(max-width: 599px)" render={() =>
                                (
                                    <small>Products</small>
                                )}
                                />
                            </a>

                        </OverlayTrigger>
                    </li>
                    <li>
                        <OverlayTrigger
                            placement="right"
                            delay={{ show: 100, hide: 200 }}
                            overlay={renderTooltipTypeOrders}>
                            <a href="#">
                                <BsFillBriefcaseFill />
                                <Media query="(max-width: 599px)" render={() =>
                                (
                                    <small>Type Orders</small>
                                )}
                                />
                            </a>

                        </OverlayTrigger>
                    </li>
                    <li>
                        <OverlayTrigger
                            placement="right"
                            delay={{ show: 100, hide: 200 }}
                            overlay={renderTooltipCustomers}
                        >
                            <a href="#">
                                <BsFillPeopleFill />
                                <Media query="(max-width: 599px)" render={() =>
                                (
                                    <small>Customers</small>
                                )}
                                />
                            </a>
                        </OverlayTrigger>
                    </li>
                    <li>

                    </li>
                </ul>
            </nav>
        );
    }
}

export default MenuNavigation;