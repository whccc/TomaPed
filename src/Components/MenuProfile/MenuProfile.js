import React, { Component } from 'react';
import TomaPedImg from '../../Images/TomaPed.png';
import { BsFillPersonFill, BsList } from "react-icons/bs";
import './MenuProfile.css';




class MenuProfile extends Component {
    constructor(props) {
        super(props)
        this.state={
            strDataUser:JSON.parse(localStorage.getItem('strJsonUser'))
        }
    }
    componentDidMount() {
        document.querySelector('.Container-Profile-Menu .Profile-Menu-Section-Three').addEventListener('click', () => {
            this.ViewMenu();
        });
    }
    ViewMenu = () => {
        try {
            let left = document.querySelector('.Container-MenuNavigation').style.left;
            if (window.innerWidth <= 1000) {
                if (left == '' || left == '-100%') {
                    document.querySelector('.Container-MenuNavigation').style.left = '0%';
                    document.querySelector('.Container-Profile-Menu .Profile-Menu-Section-Three').classList.add('w-IconMenu');

                } else {
                    document.querySelector('.Container-MenuNavigation').style.left = '-100%';
                    document.querySelector('.Container-Profile-Menu .Profile-Menu-Section-Three').classList.remove('w-IconMenu');

                }
            }
        } catch (ex) {
            console.log(ex);
        }
    }
    //Cerrar Sesión
    CerrarSesion=()=>{
        try{
            localStorage.removeItem("strJsonUser");
            window.location.href="/";
        }catch(Error){
            console.log(Error)
        }
    }
    render() {
        return (
            <header className='Container-Profile-Menu'>
                <div className='Profile-Menu-Section-Three'>
                    <BsList
                        className='IconMenu'
                    />
                </div>
                <div className='Container-PM'>
                    <div className='Profile-Menu-Section-One'>
                        <div className='Container-Img'>
                            <img src={TomaPedImg} />
                        </div>
                    </div>
                    <div className='Profile-Menu-Section-Two'>
                        <div className='Container-PMSTWO'>
                            <h6>
                                {this.state.strDataUser.strName.toUpperCase()}{" "}{this.state.strDataUser.strLastName.toUpperCase()}
                                <a href="#" onClick={this.CerrarSesion}>Cerrar Sesión</a>
                            </h6>
                            
                            <div className='Container-Icon'>
                                <BsFillPersonFill
                                    className='IconPerson'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

export default MenuProfile;