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
import './Customers.css';
class Customers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayModal: false,
            Customers: [
            ],
            Cities: [
            ],
            strDocument: "",
            strName: "",
            strLastName: "",
            strEmail: "",
            strPhone: "",
            strAddress: "",
            selectedCity: null,
            blnButtonEdit: false,
            blnButtonCreate: true,
            globalFilterTable: ""
        };
    }
    componentDidMount() {
        this.LoadCustomers();
        this.LoadCities();
    }
    //Validar Input
    ValidateInput = () => {
        try {
            if (this.state.strDocument.trim() == "") {
                document.getElementById('strDocument').focus();
                this.MessagesModalCustomer.show({ severity: 'error', summary: 'Digite Documento' });
                return false;
            }
            if (this.state.strName.trim() == "") {
                document.getElementById('strName').focus();
                this.MessagesModalCustomer.show({ severity: 'error', summary: 'Digite Nombres' });
                return false;
            }
            if (this.state.strLastName.trim() == "") {
                document.getElementById('strLastName').focus();
                this.MessagesModalCustomer.show({ severity: 'error', summary: 'Digite Apellidos' });
                return false;
            }
            if (this.state.strEmail.trim() == "") {
                document.getElementById('strEmail').focus();
                this.MessagesModalCustomer.show({ severity: 'error', summary: 'Digite Email' });
                return false;
            }
            if (this.state.selectedCity == null) {
                document.getElementById('dbCity').focus();
                this.MessagesModalCustomer.show({ severity: 'error', summary: 'Seleccione City' });
                return false;
            }
            if (this.state.strPhone.trim() == "") {
                document.getElementById('strPhone').focus();
                this.MessagesModalCustomer.show({ severity: 'error', summary: 'Digite Celular' });
                return false;
            }
            if (this.state.strAddress.trim() == "") {
                document.getElementById('strAddress').focus();
                this.MessagesModalCustomer.show({ severity: 'error', summary: 'Digite Dirección' });
                return false;
            }
            return true;
        } catch (Error) {
            console.log(Error)
        }
    }
    //Create user
    CreateUserCustomer = async () => {
        try {
            if (!this.ValidateInput()) {
                return;
            }
            let strDataUserSelles = {
                strDocument: this.state.strDocument,
                strName: this.state.strName,
                strLastName: this.state.strLastName,
                strEmail: this.state.strEmail,
                strPhone: this.state.strPhone,
                strAddress: this.state.strAddress,
                intIdCity: this.state.selectedCity.code
            }
            let strData = await axios.post(URL_API + "/api/customer/create",
                strDataUserSelles);

                console.log(strData)
            if (strData.data.Success) {
                this.messages.show({ severity: 'success', summary: 'Customer create with success' });
                this.UpdateStateCustomer();
                //Load Customers
                this.LoadCustomers();
            }
        } catch (Error) {
            console.log(Error)
        }
    }
    
    //Load Customers
    LoadCustomers = async () => {
        try {
            let strData = await axios.get(URL_API + "/api/customer");
            if (strData.data.Success) {
                this.setState({ Customers: strData.data.strData })
            }
        } catch (Error) {
            console.log(Error)
        }
    }
    //Load Cities
    LoadCities = async () => {
        try {
            let strData = await axios.get(URL_API + "/api/city")
            if (strData.data.Success) {
                let ArrayZone = [];
                await strData.data.strData.forEach((DataCity) => {
                    ArrayZone.push({
                        name: DataCity.strDescription,
                        code: DataCity.intIdCity
                    })
                });
                this.setState({ Cities: ArrayZone });
            }
        } catch (Error) {
            console.log(Error);
        }
    }
    //Edit Data Customer
    EditCustomerData = async (objDataCustomer) => {
        try {
            await this.setState({
                displayModal: true,
                strDocument: objDataCustomer.strDocument,
                strName: objDataCustomer.strName,
                strLastName: objDataCustomer.strLastName,
                strEmail: objDataCustomer.strEmail,
                strPassword: objDataCustomer.strPassword,
                strPhone: objDataCustomer.strPhone,
                strAddress: objDataCustomer.strAddress,
                selectedCity: this.state.Cities.filter((DataCity) => { return DataCity.name == objDataCustomer.strDescriptionCity })[0],
                blnButtonEdit: true,
                blnButtonCreate: false
            })
        } catch (Error) {
            console.log(Error)
        }
    }
    //Edit Customer
    EditCustomer = async () => {
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
                intIdCity: this.state.selectedCity.code
            }
            let strData = await axios.put(URL_API + "/api/customer/edit",
                strDataUserSelles);
            console.log(strData)
            if (strData.data.Success) {
                this.messages.show({ severity: 'success', summary: 'Customer edit with success' });
                this.UpdateStateCustomer();
                //Load Customers
                this.LoadCustomers();
            }
        } catch (Error) {
            console.log(Error)
        }
    }
    //Actualizar state Customer
    UpdateStateCustomer = () => {
        this.setState({
            displayModal: false,
            strDocument: "",
            strName: "",
            strLastName: "",
            strEmail: "",
            strPassword: "",
            strPhone: "",
            strAddress: "",
            selectedCity: null,
            blnButtonEdit: false,
            blnButtonCreate: true
        });
    }
   
    /************Table******************** */

    renderHeaderTable = () => {
        return (
            <div className="table-header">
                <div>
                    <Button label="New Customer" icon="pi pi-external-link" onClick={this.displayModal} />
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
    ButtonsTable = (DataCustomer) => {
        return (
            <div>
                <Button icon="pi pi-pencil" className="p-button-rounded" className='bg-primary' onClick={() => this.EditCustomerData(DataCustomer)} />
                {" "}
             </div>
        );
    }
    /*******************MODAL************************/
    DialogModal = () => {
        return (<Dialog header={this.state.blnButtonCreate ? "New Customer" : "Edit Customer"} visible={this.state.displayModal} style={{ width: '90vw' }} onHide={this.UpdateStateCustomer}>
            <div className='Container-Data-Modal'>
                <div className="ContainerDataCustomer">
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
                        <Dropdown value={this.state.selectedCity} options={this.state.Cities} className='SelectZone' id='dbCity' onChange={this.onCityChange} optionLabel="name" placeholder="Select a city" />
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
                <Messages ref={(el) => this.MessagesModalCustomer = el}></Messages>

                <div className='Container-button'>
                    <Button label="Create" style={{ display: this.state.blnButtonCreate ? "inline-block" : "none" }} className="bg-primary" onClick={this.CreateUserCustomer} />
                    <Button label="Edit" style={{ display: this.state.blnButtonEdit ? "inline-block" : "none" }} className="p-button-warning" onClick={this.EditCustomer} />
                    <Button label="Cancel" className="p-button-danger" onClick={this.UpdateStateCustomer} />
                </div>


            </div>
        </Dialog>);
    }
    onCityChange = (e) => {
        this.setState(
            { selectedCity: e.value }
        );
    }
    displayModal = () => {
        this.setState({
            displayModal: this.state.displayModal ? false : true
        })
    }
    render() {
        return (
            <section className='Container-Customers'>
               
                <div className='Container-Sell'>
                    <h1>Customers</h1>
                     <Messages ref={(el) => this.messages = el}></Messages>
                    <div className='Container-Modal'>
                        {this.DialogModal()}
                    </div>
                    <div className='Container-Table'>
                        <DataTable value={this.state.Customers} paginator
                            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={5} 
                           globalFilter={this.state.globalFilterTable}
                            rowHover
                            header={this.renderHeaderTable()}
                        >
                            <Column field="strDocument" header="Cedula"></Column>
                            <Column field="strName" header="Nombres"></Column>
                            <Column field="strLastName" header="Apellidos"></Column>
                            <Column field="strEmail" header="Correo"></Column>
                            <Column field="strPhone" header="Celular"></Column>
                            <Column field="strAddress" header="Dirección"></Column>
                            <Column field="strDescriptionCity" header="Ciudad"></Column>
                            <Column header="Acciones" body={this.ButtonsTable}></Column>
                        </DataTable>
                    </div>
                </div>
            </section>
        );
    }
}

export default Customers;