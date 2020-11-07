import React, { Component } from 'react';
import MenuNavigation from '../MenuNavigation/MenuNavigation';
import MenuProfile from '../MenuProfile/MenuProfile';
import Home from '../Home/Home';
import Sellers from '../Sellers/Sellers';
import Zones from '../Zones/Zones';
import { Route, Switch, BrowserRouter } from "react-router-dom";
import '../../../primereact/resources/themes/bootstrap4-light-blue/theme.css';
import '../../../primereact/resources/primereact.min.css';
import '../../../primeicons/primeicons.css';

import './Main.css';
class Main extends Component {

    render() {
        return (
            <main>
                <MenuProfile />
                <MenuNavigation />
                <BrowserRouter>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route exact path="/Sellers" component={Sellers}/>
                        <Route exact path="/Zones" component={Zones}/>
                    </Switch>
                </BrowserRouter>
            </main>
        );
    }

}

export default Main;