import React,{Component} from 'react';
import MenuNavigation from '../MenuNavigation/MenuNavigation';
import MenuProfile  from '../MenuProfile/MenuProfile';
import './Main.css';
class Main extends Component{

    render(){
        return(
            <main>
                <MenuProfile/>
                <MenuNavigation/>
            </main>
        );
    }

}

export default Main;