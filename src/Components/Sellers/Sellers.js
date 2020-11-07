import React, { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import axios from 'axios';
import { URL_API } from '../../VariablesDeEntorno.js';
import { Messages } from 'primereact/messages';
import './Sellers.css';
class Sellers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayModal: false,
            Sellers: [
            ],
            Zones: [
            ],
            strDocument: "",
            strName: "",
            strLastName: "",
            strEmail: "",
            strPassword: "",
            strPhone: "",
            strAddress: "",
            selectedZone: null,
            blnButtonEdit: false,
            blnButtonCreate: true,
            globalFilterTable: ""
        };
    }
    componentDidMount() {
        this.LoadSellers();
        this.LoadZones();
    }
    //Create user
    CreateUserSeller = async () => {
        try {
            if (!this.ValidateInput()) {
                return;
            }
            let strDataUserSelles = {
                strDocument: this.state.strDocument,
                strName: this.state.strName,
                strLastName: this.state.strLastName,
                strEmail: this.state.strEmail,
                strPassword: this.state.strPassword,
                strPhone: this.state.strPhone,
                strAddress: this.state.strAddress,
                intIdTypeUser: 2,
                intIdZone: this.state.selectedZone.code
            }
            let strData = await axios.post(URL_API + "/api/user/create",
                strDataUserSelles);
            if (strData.data.Success) {
                this.messages.show({ severity: 'success', summary: 'Seller create with success' });
                this.UpdateStateSeller();
                //Load sellers
                this.LoadSellers();
            }
        } catch (Error) {
            console.log(Error)
        }
    }
    //Validar Input
    ValidateInput = () => {
        try {
            if (this.state.strDocument.trim() == "") {
                document.getElementById('strDocument').focus();
                this.MessagesModalSeller.show({ severity: 'error', summary: 'Digite Documento' });
                return false;
            }
            if (this.state.strName.trim() == "") {
                document.getElementById('strName').focus();
                this.MessagesModalSeller.show({ severity: 'error', summary: 'Digite Nombres' });
                return false;
            }
            if (this.state.strLastName.trim() == "") {
                document.getElementById('strLastName').focus();
                this.MessagesModalSeller.show({ severity: 'error', summary: 'Digite Apellidos' });
                return false;
            }
            if (this.state.strEmail.trim() == "") {
                document.getElementById('strEmail').focus();
                this.MessagesModalSeller.show({ severity: 'error', summary: 'Digite Email' });
                return false;
            }
            if (this.state.selectedZone == null) {
                document.getElementById('dbZone').focus();
                this.MessagesModalSeller.show({ severity: 'error', summary: 'Seleccione Zone' });
                return false;
            }
            if (this.state.strPassword.trim() == "") {
                document.getElementById('strPassword').focus();
                this.MessagesModalSeller.show({ severity: 'error', summary: 'Digite Clave' });
                return false;
            }
            if (this.state.strPhone.trim() == "") {
                document.getElementById('strPhone').focus();
                this.MessagesModalSeller.show({ severity: 'error', summary: 'Digite Celular' });
                return false;
            }
            if (this.state.strAddress.trim() == "") {
                document.getElementById('strAddress').focus();
                this.MessagesModalSeller.show({ severity: 'error', summary: 'Digite Dirección' });
                return false;
            }
            return true;
        } catch (Error) {
            console.log(Error)
        }
    }
    //Load Sellers
    LoadSellers = async () => {
        try {
            let strData = await axios.get(URL_API + "/api/user");
            if (strData.data.Success) {
                this.setState({ Sellers: strData.data.strData })
            }
        } catch (Error) {
            console.log(Error)
        }
    }
    //Load Zones
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
    //Edit Data Seller
    EditSellerData = async (objDataSeller) => {
        try {
            await this.setState({
                displayModal: true,
                strDocument: objDataSeller.strDocument,
                strName: objDataSeller.strName,
                strLastName: objDataSeller.strLastName,
                strEmail: objDataSeller.strEmail,
                strPassword: objDataSeller.strPassword,
                strPhone: objDataSeller.strPhone,
                strAddress: objDataSeller.strAddress,
                selectedZone: this.state.Zones.filter((DataZone) => { return DataZone.name == objDataSeller.strDescriptionZone })[0],
                blnButtonEdit: true,
                blnButtonCreate: false
            })
        } catch (Error) {
            console.log(Error)
        }
    }
    //Edit Seller
    EditSeller = async () => {
        try {
            if (!this.ValidateInput()) {
                return;
            }
            let strDataUserSelles = {
                strDocument: this.state.strDocument,
                strName: this.state.strName,
                strLastName: this.state.strLastName,
                strEmail: this.state.strEmail,
                strPassword: this.state.strPassword,
                strPhone: this.state.strPhone,
                strAddress: this.state.strAddress,
                intIdZone: this.state.selectedZone.code
            }
            let strData = await axios.put(URL_API + "/api/user/edit",
                strDataUserSelles);
            console.log(strData)
            if (strData.data.Success) {
                this.messages.show({ severity: 'success', summary: 'Seller edit with success' });
                this.UpdateStateSeller();
                //Load sellers
                this.LoadSellers();
            }
        } catch (Error) {
            console.log(Error)
        }
    }
    //Actualizar state Seller
    UpdateStateSeller = () => {
        this.setState({
            displayModal: false,
            strDocument: "",
            strName: "",
            strLastName: "",
            strEmail: "",
            strPassword: "",
            strPhone: "",
            strAddress: "",
            selectedZone: null,
            blnButtonEdit: false,
            blnButtonCreate: true
        });
    }
    onZoneChange = (e) => {
        this.setState(
            { selectedZone: e.value }
        );
    }
    displayModal = () => {
        this.setState({
            displayModal: this.state.displayModal ? false : true
        })
    }
    renderHeaderTable = () => {
        return (
            <div className="table-header">
                <div>
                    <Button label="New Seller" icon="pi pi-external-link" onClick={this.displayModal} />
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
    ButtonsTable = (DataSeller) => {
        return (
            <div>
                <Button icon="pi pi-pencil" className="p-button-rounded" className='bg-primary' onClick={() => this.EditSellerData(DataSeller)} />
                {" "}
             </div>
        );
    }
    DialogModal = () => {
        return (<Dialog header={this.state.blnButtonCreate ? "New Seller" : "Edit Seller"} visible={this.state.displayModal} style={{ width: '90vw' }} onHide={this.UpdateStateSeller}>
            <div className='Container-Data-Modal'>
                <div className="ContainerDataSeller">
                    <div>
                        <span className="p-float-label">
                            <InputText disabled={this.state.blnButtonCreate ? false : true} id="strDocument" keyfilter="int" value={this.state.strDocument} onChange={(e) => this.setState({ strDocument: e.target.value })} />
                            <label htmlFor="strDocument">Cédula</label>
                        </span>
                        <span className="p-float-label">
                            <InputText id="strName" value={this.state.strName} onChange={(e) => this.setState({ strName: e.target.value })} />
                            <label htmlFor="strName">Nombres</label>
                        </span>
                        <span className="p-float-label">
                            <InputText id="strLastName" value={this.state.strLastName} onChange={(e) => this.setState({ strLastName: e.target.value })} />
                            <label htmlFor="strLastName">Apellidos</label>
                        </span>
                        <span className="p-float-label">
                            <InputText id="strEmail" value={this.state.strEmail} onChange={(e) => this.setState({ strEmail: e.target.value })} />
                            <label htmlFor="strEmail" >Correo</label>
                        </span>
                    </div>
                    <div>
                        <Dropdown value={this.state.selectedZone} options={this.state.Zones} className='SelectZone' id='dbZone' onChange={this.onZoneChange} optionLabel="name" placeholder="Select a Zone" />

                        <span className="p-float-label">
                            <InputText id="strPassword" value={this.state.strPassword} onChange={(e) => this.setState({ strPassword: e.target.value })} />
                            <label htmlFor="strPassword" >Clave</label>
                        </span>
                        <span className="p-float-label">
                            <InputText id="strPhone" value={this.state.strPhone} onChange={(e) => this.setState({ strPhone: e.target.value })} />
                            <label htmlFor="strPhone">Celular</label>
                        </span>
                        <span className="p-float-label">
                            <InputText id="strAddress" value={this.state.strAddress} onChange={(e) => this.setState({ strAddress: e.target.value })} />
                            <label htmlFor="strAddress">Dirección</label>
                        </span>
                    </div>
                </div>
                <Messages ref={(el) => this.MessagesModalSeller = el}></Messages>

                <div className='Container-button'>
                    <Button label="Create" style={{ display: this.state.blnButtonCreate ? "inline-block" : "none" }} className="bg-primary" onClick={this.CreateUserSeller} />
                    <Button label="Edit" style={{ display: this.state.blnButtonEdit ? "inline-block" : "none" }} className="p-button-warning" onClick={this.EditSeller} />
                    <Button label="Cancel" className="p-button-danger" onClick={this.UpdateStateSeller} />
                </div>


            </div>
        </Dialog>);
    }
    render() {
        return (
            <section className='Container-Sellers'>
                <Messages ref={(el) => this.messages = el}></Messages>

                <div className='Container-Sell'>
                    <h1>Sellers</h1>
                    <div className='Container-Modal'>
                        {this.DialogModal()}
                    </div>
                    <div className='Container-Table'>
                        <DataTable value={this.state.Sellers} paginator
                            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={5} rowsPerPageOptions={[5,10,15]}
                           globalFilter={this.state.globalFilterTable}
                            rowHover
                            header={this.renderHeaderTable()}
                        >
                            <Column field="strDocument" header="Cedula"></Column>
                            <Column field="strName" header="Nombres"></Column>
                            <Column field="strLastName" header="Apellidos"></Column>
                            <Column field="strEmail" header="Correo"></Column>
                            <Column field="strPassword" header="Clave"></Column>
                            <Column field="strPhone" header="Celular"></Column>
                            <Column field="strAddress" header="Dirección"></Column>
                            <Column field="strDescriptionZone" header="Zona"></Column>
                            <Column header="Acciones" body={this.ButtonsTable}></Column>
                        </DataTable>
                    </div>
                </div>
            </section>
        );
    }
}

export default Sellers;