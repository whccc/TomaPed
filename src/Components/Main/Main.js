import React, { Component } from 'react';
import MenuNavigation from '../MenuNavigation/MenuNavigation';
import MenuProfile from '../MenuProfile/MenuProfile';
import Home from '../Home/Home';
import Sellers from '../Sellers/Sellers';
import Zones from '../Zones/Zones';
import Cities from '../City/City';
import Customers from '../Customers/Customers';
import Login from '../Login/Login';
import { Route, Switch, BrowserRouter } from "react-router-dom";
import '../../../primereact/resources/themes/bootstrap4-light-blue/theme.css';
import '../../../primereact/resources/primereact.min.css';
import '../../../primeicons/primeicons.css';

import './Main.css';
class Main extends Component {
    
    RenderViews() {
        if (window.location.pathname.toLowerCase() == "/login") {
            if(JSON.parse(localStorage.getItem('strJsonUser'))){
                window.location.href='/';
                return null;
            }
            return (<Login />);
        } else {
            if(!JSON.parse(localStorage.getItem('strJsonUser'))){
                window.location.href='/Login';
                return null;
            }

            return (
                <section>
                    <MenuProfile />
                    <MenuNavigation />
                    <BrowserRouter>
                        <Switch>
                            <Route exact path='/' component={Home} />
                            <Route exact path="/Sellers" component={Sellers} />
                            <Route exact path="/Zones" component={Zones} />
                            <Route exact path="/Cities" component={Cities} />
                            <Route exact path="/Customers" component={Customers} />
                        </Switch>
                    </BrowserRouter>
                </section>
            );
        }
    }
    render() {
        return (
            <main>
                {this.RenderViews()}
            </main>
        );
    }
}

export default Main;