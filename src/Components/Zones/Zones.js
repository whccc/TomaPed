import React, { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import { URL_API } from '../../VariablesDeEntorno.js';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { Messages } from 'primereact/messages';
import './Zones.css';


class Zones extends Component {
    constructor(props) {
        super(props);
        this.state = {
            JsonZones: [],
            globalFilterTable: "",
            blnButtonCreate: true,
            blnButtonEdit: false,
            displayModal: false,
            intIdZone: 0,
            strDescription: ""
        }
    }
    componentDidMount() {
        this.LoadZones();
    }
    //Load zones
    LoadZones = async () => {
        try {
            let strData = await axios.get(URL_API + "/api/zone");
            if (strData.data.Success) {
                this.setState({ JsonZones: strData.data.strData })
            }
        } catch (Error) {
            console.log(Error)
        }
    }
    //Create zone
    CreateZone=async()=>{
        try{
            if(!this.ValidateZone()){
                return;
            }
            let objZone={
                strDescription:this.state.strDescription
            }
            let strData=await axios.post(URL_API+"/api/zone/create",objZone);
            if(strData.data.Success){
                this.messages.show({ severity: 'success', summary: 'Zone creada con éxito.' });
                this.LoadZones();
                this.UpdateStateZone();
            }

        }catch(Error){
            console.log(Error);
        }
    }
    //Edit data zone
    EditZoneData=(objZone)=>{
        try{
            this.setState({
                intIdZone:objZone.intIdZone,
                strDescription:objZone.strDescription,
                displayModal:true,
                blnButtonCreate:false,
                blnButtonEdit:true
            })
        }catch(Error){
            console.log(Error);
        }
    }
    //Edit zone
    EditZone=async()=>{
        try{
            if(!this.ValidateZone()){
                return;
            }
            let objZone={
                intIdZone:this.state.intIdZone,
                strDescription:this.state.strDescription
            }
            let strData=await axios.put(URL_API+"/api/zone/edit",objZone);
            if(strData.data.Success){
                this.messages.show({ severity: 'success', summary: 'Zone editada con éxito.' });
                this.LoadZones();
                this.UpdateStateZone();
            }
        }catch(Error){
            console.log(Error);
        }
    }
    //Validate zone
    ValidateZone=()=>{
        if(this.state.strDescription.trim()==""){
            document.getElementById("strDescription").focus();
            this.MessagesModalSeller.show({severity:"error",summary:"Digite descripción"});
            return false;
        }
        return true;
    }
    //Display modal
    displayModal = () => {
        this.setState({
            displayModal: this.state.displayModal ? false : true
        })
    }
    //HeaderTable
    renderHeaderTable = () => {
        return (
            <div className="table-header">
                <div>
                    <Button label="New Zone" icon="pi pi-external-link" onClick={this.displayModal} />
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
    //Buttons
    ButtonsTable = (DataZone) => {
        return (
            <div>
                <Button icon="pi pi-pencil" className="p-button-rounded" className='bg-primary' onClick={() => this.EditZoneData(DataZone)} />
                {" "}
            </div>
        );
    }
    //Modal
    DialogModal = () => {
        return (<Dialog header={this.state.blnButtonCreate ? "New Zone" : "Edit Zone"} visible={this.state.displayModal} onHide={this.UpdateStateZone}>
            <div className='Container-Data-Modal'>
                <div className="ContainerDataSeller">
                        <span className="p-float-label">
                            <InputText id="strDescription" value={this.state.strDescription} onChange={(e) => this.setState({ strDescription: e.target.value })} />
                            <label htmlFor="strDescription">Descripción</label>
                        </span>
                </div>
                <Messages ref={(el) => this.MessagesModalSeller = el}></Messages>
                <div className='Container-button'>
                    <Button label="Create" style={{ display: this.state.blnButtonCreate ? "inline-block" : "none" }} className="bg-primary" onClick={this.CreateZone} />
                    <Button label="Edit" style={{ display: this.state.blnButtonEdit ? "inline-block" : "none" }} className="p-button-warning" onClick={this.EditZone} />
                    {" "}<Button label="Cancel" className="p-button-danger" onClick={this.UpdateStateZone} />
                </div>
            </div>
        </Dialog>);
    }
    //Update state
    UpdateStateZone = () => {
        this.setState({
            strDescription: "",
            intIdZone:0,
            displayModal: false
        })
    }
    render() {
        return (
            <section className='Container-Zone'>
                <div className='ContainerZone'>
                    <h1>Zones</h1>
                    <Messages ref={(el) => this.messages = el}></Messages>

                    <div className='Container-Modal'>
                        {this.DialogModal()}
                    </div>
                    <div className='Container-Table'>
                        <DataTable value={this.state.JsonZones} paginator
                            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={5} 
                            globalFilter={this.state.globalFilterTable}
                            rowHover
                            header={this.renderHeaderTable()}
                        >
                            <Column field="intIdZone" header="Id"></Column>
                            <Column field="strDescription" header="Descripción"></Column>
                            <Column header="Acciones" body={this.ButtonsTable}></Column>
                        </DataTable>
                    </div>
                </div>
            </section>
        );
    }
}

export default Zones;