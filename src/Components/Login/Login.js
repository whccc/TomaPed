import React, { Component } from 'react';
import { InputText } from 'primereact/inputtext';
import TomaPedImg from '../../Images/TomaPed.png';
import { Messages } from 'primereact/messages';
import axios from 'axios';
import { URL_API } from '../../VariablesDeEntorno.js';
import './Login.css';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            strDocument: "",
            strPassword: ""
        }
    }
    //Validar Input
    ValidateInputs=()=>{
        try{
            if(this.state.strDocument.trim()==""){
                document.getElementById('txtDocument').focus();
                this.messagesvalidate.show({severity: 'error', summary: 'Digite documento.'})
                return false;
            }
            
            if(this.state.strPassword.trim()==""){
                document.getElementById('txtPassword').focus();
                this.messagesvalidate.show({severity: 'error', summary: 'Digite clave.'})
                return false;
            }
            return true;
        }catch(Error){
            console.log(Error);
        }
    }
    //Login
    Login=async()=>{
        try{
            if(!this.ValidateInputs()){
                return;
            }
            let objLogin={
                strDocument:this.state.strDocument,
                strPassword:this.state.strPassword
            }
            let strData=await axios.post(URL_API+"/api/Login",objLogin);
            if(strData.data.Success){
                localStorage.setItem('strJsonUser', JSON.stringify(strData.data))
                window.location.href="/";
            }else{
                this.messagesvalidate.show({severity: 'error', summary: 'Documento o clave no coinciden'});
            }
            console.log(strData);
        }catch(Error){
            console.log(Error);
        }
    }
    render() {
        return (
            <section className="Container-Login">
                <div className="ContainerLogin">
                    <div className="ContainerImg">
                        <img src={TomaPedImg}/>
                    </div>
                    
                    <input id="txtDocument" type="text" placeholder="Usuario" value={this.state.strDocument} onChange={(e) => this.setState({ strDocument: e.target.value })}/>
                    <input id="txtPassword" type="password" placeholder="Clave" value={this.state.strPassword} onChange={(e) => this.setState({ strPassword: e.target.value })}/>
                    <Messages ref={(el) => this.messagesvalidate = el}></Messages>
                    <button onClick={this.Login}>login</button>
                </div>
            </section>
        );
    }
}

export default Login;