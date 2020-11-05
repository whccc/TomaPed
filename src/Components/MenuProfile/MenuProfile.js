import React,{Component}  from 'react';
import TomaPedImg from '../../Images/TomaPed.png';
import {BsFillPersonFill,BsList} from "react-icons/bs";
import './MenuProfile.css';




class MenuProfile  extends Component{
    constructor(props){
        super(props)
    }
    componentDidMount(){
        document.querySelector('.Container-Profile-Menu .Profile-Menu-Section-Three').addEventListener('click',()=>{
             this.ViewMenu();
        });
    }
    ViewMenu =()=>{
        try{
            let left=document.querySelector('.Container-MenuNavigation ul').style.left;
            if(left=='' || left=='-100%'){
                document.querySelector('.Container-MenuNavigation ul').style.left='0%';  
                document.querySelector('.Container-Profile-Menu .Profile-Menu-Section-Three').classList.add('w-IconMenu');
            }else{
                document.querySelector('.Container-MenuNavigation ul').style.left='-100%';
                document.querySelector('.Container-Profile-Menu .Profile-Menu-Section-Three').classList.remove('w-IconMenu');
            }
        }catch(ex){
            console.log(ex);
        }
    }
    render(){
        return(
            <header className='Container-Profile-Menu'>
                <div className='Profile-Menu-Section-Three'>
                    <BsList
                        className='IconMenu'
                    />
                </div>
                <div className='Container-PM'>
                    <div className='Profile-Menu-Section-One'>
                        <div className='Container-Img'>
                            <img src={TomaPedImg}/>
                        </div>
                    </div>
                    <div className='Profile-Menu-Section-Two'>
                        <div className='Container-PMSTWO'>
                            <h6>WILSON CASTRO</h6>
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