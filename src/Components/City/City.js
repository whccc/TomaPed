import React, { Component } from 'react';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { URL_API } from '../../VariablesDeEntorno.js';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { Messages } from 'primereact/messages';
import { Dropdown } from 'primereact/dropdown';
import './City.css';
class City extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Zones: [

            ],
            Cities:[],
            intIdCity: "",
            strDescription: "",
            selectedZone: null,
            displayModal:false,
            blnButtonCreate:true,
            blnButtonEdit:false,
            globalFilterTable:""
        }
    }
    componentDidMount() {
        this.LoadCities();
        this.LoadZones();
    }
    //Validate data city
    ValidateCity = () => {
        try {
            if (this.state.strDescription.trim() == "") {
                document.getElementById('strDescription').focus();
                this.MessagesModalCity.show({ severity: 'error', summary: 'Digite una descripón' })
                return false;
            }
            if (this.state.selectedZone == null) {
                document.getElementById('dbZone').focus();
                this.MessagesModalCity.show({ severity: 'error', summary: 'Seleccione una zona' })
                return false;
            }
            return true;
        } catch (Error) {
            console.log(Error);
        }
    }
    //Create city
    CreateCity = async() => {
        try {
            if (!this.ValidateCity()) {
                return;
            }
            let objCity = {
                strDescription: this.state.strDescription,
                intIdZone: this.state.selectedZone.code
            }

            let strData = await axios.post(URL_API + "/api/city/create", objCity);
            if (strData.data.Success) {
                this.MessagesModalCity.show({ severity: 'success', summary: 'City creada con éxito.' })
                this.LoadCities();
                this.UpdateStateCity();
            }
        } catch (Error) {
            console.log(Error);
        }
    }
    //Edit city
    EditCityData=(objCity)=>{
        try{
            this.setState({
                displayModal:true,
                strDescription:objCity.strDescription,
                intIdCity:objCity.intIdCity,
                selectedZone:this.state.Zones.filter((DataZone) => { return DataZone.name == objCity.strDescriptionZone })[0],
                blnButtonEdit:true,
                blnButtonCreate:false
            });
        }catch(Error){
            console.log(Error);
        }
    }
    EditCity=async()=>{
        try{
            if(!this.ValidateCity()){
                return;
            }
            let objCity={
                intIdCity:this.state.intIdCity,
                strDescription:this.state.strDescription,
                intIdZone:this.state.selectedZone.code
            }
            let strData=await axios.put(URL_API+"/api/city/Edit",objCity);
            if(strData.data.Success){
                this.MessageCity.show({ severity: 'success', summary: 'City editada con éxito.' })
                this.UpdateStateCity();
                this.LoadCities();
            }
        }catch(Error){
            console.log(Error);
        }
    }
    //Load cities
    LoadCities=async()=>{
        try{
            let strData=await axios.get(URL_API+"/api/city");
            this.setState({Cities:strData.data.strData});
        }catch(Error){
            console.log(Error);
        }
    }
    //Load zones
    LoadZones = async () => {
        try {
            let strData = await axios.get(URL_API + "/api/zone")
            if (strData.data.Success) {
                let ArrayZone = [];
                await strData.data.strData.forEach((DataZone) => {
                    ArrayZone.push({
                        name: DataZone.strDescription,
                        code: DataZone.intIdZone
                    })
                });
                this.setState({ Zones: ArrayZone });
            }
        } catch (Error) {
            console.log(Error);
        }
    }

    //Update state
    UpdateStateCity=()=>{
        try{
            this.setState({
                displayModal:false,
                blnButtonCreate:true,
                blnButtonEdit:false,
                strDescription:"",
                intIdCity:0,
                selectedZone:null
            })
        }catch(Error){
            console.log(Error);
        }
    }





    /*********************MODAL***************************/
    //Modal
    DialogModal = () => {
        return (<Dialog header={this.state.blnButtonCreate ? "New City" : "Edit City"} visible={this.state.displayModal} onHide={this.UpdateStateCity}>
            <div className='Container-Data-Modal'>
                <div className="ContainerDataCity">
                        <span className="p-float-label">
                            <InputText id="strDescription" value={this.state.strDescription} onChange={(e) => this.setState({ strDescription: e.target.value })} />
                            <label htmlFor="strDescription">Descripción</label>
                        </span>
                        <br/>
                        <Dropdown scrollHeight="80px" value={this.state.selectedZone} options={this.state.Zones} className='SelectZone' id='dbZone' onChange={(e)=>{this.setState({selectedZone:e.value})}} optionLabel="name" placeholder="Select a Zone" />
                </div>
                <Messages ref={(el) => this.MessagesModalCity = el}></Messages>
                <div className='Container-button'>
                    <Button label="Create" style={{ display: this.state.blnButtonCreate ? "inline-block" : "none" }} className="bg-primary" onClick={this.CreateCity} />
                    <Button label="Edit" style={{ display: this.state.blnButtonEdit ? "inline-block" : "none" }} className="p-button-warning" onClick={this.EditCity} />
                    {" "}<Button label="Cancel" className="p-button-danger" onClick={this.UpdateStateCity} />
                </div>
            </div>
        </Dialog>);
    }
    /***************************TABLE***************/
    renderHeaderTable = () => {
        return (
            <div className="table-header">
                <div>
                    <Button label="New City" icon="pi pi-external-link" onClick={()=>{this.setState({displayModal:true})}} />
                </div>
                <div>
                    <span className="p-input-icon-left">
                        <i className="pi pi-search" />
                        <InputText type="search" onInput={(e) => this.setState({ globalFilterTable: e.target.value })} placeholder="Search" />
                    </span>

                </div>
            </div>
        );
    }
    ButtonsTable = (DataCity) => {
        return (
            <div>
                <Button icon="pi pi-pencil" className="p-button-rounded" className='bg-primary' onClick={() => this.EditCityData(DataCity)} />
                {" "}
             </div>
        );
    }
    render() {
        return (
            <section className='Container-City'>
                <div className='ContainerCity'>
                    <h1>Cities</h1> 
                    <Messages ref={(el) => this.MessageCity = el}></Messages>
                    <div className='Container-Modal'>
                        {this.DialogModal()}
                    </div>
                    <div className='Container-Table'>
                        <DataTable value={this.state.Cities} paginator
                            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={5}
                            globalFilter={this.state.globalFilterTable}
                            rowHover
                            header={this.renderHeaderTable()}
                        >
                            <Column field="intIdCity" header="Id"></Column>
                            <Column field="strDescription" header="Descripción"></Column>
                            <Column field="strDescriptionZone" header="Zone"></Column>
                            <Column header="Acciones" body={this.ButtonsTable}></Column>
                        </DataTable>
                    </div>
                </div>
            </section>
        );
    }

}

export default City;