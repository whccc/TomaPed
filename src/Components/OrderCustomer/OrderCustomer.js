import React, { Component } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import NotProduct from '../../Images/NotProduct.png';
import { Toast } from 'primereact/toast';
import { URL_API } from '../../VariablesDeEntorno';
import axios from 'axios';
import './OrderCustomer.css';


class OrderCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            globalFilterTable: "",
            tblCustomer: false,
            tblProducts: false,
            displayModal: false,
            JsonDataTable: [],
            JsonDataTableProducts: [],
            JsonProducts: {
                intIdProduct: "",
                strDescription: "",
                strPrice: 0,
                urlImg: null
            },
            JsonCustomers: {
                strDocument: "",
                strName: "",
                strPhone: "",
                strEmail: ""
            },
            blnBtDisable: true,
            strDataUser: JSON.parse(localStorage.getItem('strJsonUser')),
            intIdOrder: 0,
            txtProductSearch: "",
            strQuantityProduct: 1
        }
    }
    /************ORDER*****************/
    StartOrder = async () => {
        try {
            let objOrder = {
                strDocumentCustomer: this.state.JsonCustomers.strDocument,
                strDocumentSeller: this.state.strDataUser.strDocument
            }
            let strData = await axios.post(URL_API + "/api/order/create", objOrder);
            if (strData.data.Success) {
                this.setState({
                    intIdOrder: strData.data.intIdOrder
                })
            }
        } catch (Error) {
            console.log(Error)
        }
    }
    ButtonsOrder = () => {
        try {
            if (this.state.intIdOrder == 0) {
                return (
                    <Button disabled={!this.state.blnBtDisable ? false : true} label="Iniciar Pedido" icon="pi pi-check" onClick={this.StartOrder} />
                );
            } else {
                return (
                    <Button label="Finalizar Pedido" onClick={this.FinalizeOrder} icon="pi pi-check" />
                );
            }
        } catch (Error) {
            console.log(Error);
        }
    }
    AddProductOrder = () => {
        try {

            let objProduct = {
                intIdProduct: this.state.JsonProducts.intIdProduct,
                strPrice: this.state.JsonProducts.strPrice,
                intCantidad: this.state.strQuantityProduct,
                SubTotal: (this.state.strQuantityProduct * this.state.JsonProducts.strPrice)
            }

            let ArrayProduct = this.state.JsonDataTableProducts;
            ArrayProduct.push(objProduct);
            this.CreateDetailOrder();
            this.setState({
                JsonDataTableProducts: ArrayProduct,
                displayModal: false,
                JsonProducts: {
                    intIdProduct: "",
                    strDescription: "",
                    strPrice: 0,
                    urlImg: null
                },
                strQuantityProduct: 1
            });
        } catch (Error) {
            console.log(Error)
        }
    }
    FinalizeOrder = async () => {
        try {
            let objOrder = {
                intIdOrder: this.state.intIdOrder
            }
            let strData = await axios.put(URL_API + "/api/order/FinalizeOrder", objOrder);
            if (strData.data.Success) {
                this.toast.show({ severity: 'success', summary: 'Success',detail: 'Order finalize with Success' });
                this.setState({
                    globalFilterTable: "",
                    tblCustomer: false,
                    tblProducts: false,
                    displayModal: false,
                    JsonDataTable: [],
                    JsonDataTableProducts: [],
                    JsonProducts: {
                        intIdProduct: "",
                        strDescription: "",
                        strPrice: 0,
                        urlImg: null
                    },
                    JsonCustomers: {
                        strDocument: "",
                        strName: "",
                        strPhone: "",
                        strEmail: ""
                    },
                    blnBtDisable: true,
                    strDataUser: JSON.parse(localStorage.getItem('strJsonUser')),
                    intIdOrder: 0,
                    txtProductSearch: "",
                    strQuantityProduct: 1
                })
            }
        } catch (Error) {
            console.log(Error)
        }
    }
    CreateDetailOrder=async()=>{
        try{
            let objOrder={
                intQuantityOrder:this.state.strQuantityProduct,
                intTotalOrder:(this.state.strQuantityProduct*this.state.JsonProducts.strPrice),
                intPriceProduct:this.state.JsonProducts.strPrice,
                intIdProductOrder:this.state.JsonProducts.intIdProduct,
                intIdOrderP:this.state.intIdOrder
            }
            let strData=await axios.post(URL_API+"/api/order/createdetail",objOrder);
            if(strData.data.Success){

            }
        }catch(Error){
            console.log(Error);
        }
    }
    /*************CUSTOMER******************/
    LoadCustomers = async () => {
        try {
            let strData = await axios.get(URL_API + "/api/customer");
            if (strData.data.Success) {
                this.setState({ JsonDataTable: strData.data.strData })
            }
        } catch (Error) {
            console.log(Error)
        }
    }
    objDataCustomer = (objDataCustomer) => {
        try {
            this.setState({
                JsonCustomers: {
                    strDocument: objDataCustomer.strDocument,
                    strName: objDataCustomer.strName + " " + objDataCustomer.strLastName,
                    strEmail: objDataCustomer.strEmail,
                    strPhone: objDataCustomer.strPhone
                },
                blnBtDisable: false,
                displayModal: false
            })
        } catch (Error) {
            console.log(Error)
        }
    }
    /*****************************PRODUCTS*******************************/
    LoadProduct = async () => {
        try {
            let strData = await axios.get(URL_API + "/api/product/" + this.state.txtProductSearch);
            console.log(strData);
            if (strData.data.Success) {

                this.setState({
                    JsonProducts:
                    {
                        intIdProduct: strData.data.intIdProduct,
                        strDescription: strData.data.strDescription,
                        strPrice: strData.data.strPrice,
                        urlImg: URL_API + "/api/product/img/" + strData.data.intIdProduct + ".jpg"
                    },
                    displayModal: true,
                    tblCustomer: false,
                    tblProducts: true
                });
            }
        } catch (Error) {
            console.log(Error)
        }
    }
    ImgProduct = (objProduct) => {
        try {
            return (
                <img className="TblImgProduct" src={URL_API + "/api/product/img/" + objProduct.intIdProduct + ".jpg?" + Date.now()} />
            );
        } catch (Error) {
            console.log(Error)
        }
    }
    /*******************TABLE¨*************/
    GetTable = () => {
        try {
            if (this.state.tblCustomer) {
                return (
                    <DataTable value={this.state.JsonDataTable} paginator
                        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={5}
                        globalFilter={this.state.globalFilterTable}
                        rowHover
                    >
                        <Column field="strDocument" header="Documento"></Column>
                        <Column field="strName" header="Nombres"></Column>
                        <Column field="strLastName" header="Apellidos"></Column>
                        <Column field="strEmail" header="Email"></Column>
                        <Column field="strPhone" header="Celular"></Column>
                        <Column header="Acciones" body={this.ButtonsTable}></Column>
                    </DataTable>
                );
            }
            if (this.state.tblProducts) {
                return (
                    <div className="ContainerDataProduct">
                        <div className='ContainerImgProduct'>
                            <img src={this.state.JsonProducts.urlImg == null ? NotProduct : this.state.JsonProducts.urlImg} />
                        </div>
                        <div>
                            <span className="p-float-label">
                                <InputText id="intIdProduct" disabled={this.state.blnButtonCreate ? false : true} value={this.state.JsonProducts.intIdProduct} />
                                <label htmlFor="intIdProduct">Código</label>
                            </span>
                            <span className="p-float-label">
                                <InputText id="strPrice" disabled={this.state.blnButtonCreate ? false : true} keyfilter="int" value={this.state.JsonProducts.strPrice} />
                                <label htmlFor="strPrice">Precio</label>
                            </span>
                            <span className="p-float-label">
                                <InputText id="strDescription" disabled={this.state.blnButtonCreate ? false : true} value={this.state.JsonProducts.strDescription} />
                                <label htmlFor="strDescription">Descripción</label>
                            </span>
                            <span className="p-float-label">
                                <InputText id="strAquantity" keyfilter="int" value={this.state.strQuantityProduct} onChange={(e) => { this.setState({ strQuantityProduct: e.target.value }) }} />
                                <label htmlFor="strAquantity">Cantidad</label>
                            </span>
                            <div>
                                <Button icon="pi pi-check" label="Agregar" onClick={this.AddProductOrder} />

                            </div>
                        </div>

                    </div>
                );
            }
        } catch (Error) {
            console.log(Error)
        }
    }

    ButtonsTable = (DataTable) => {
        try {
            if (this.state.tblCustomer) {
                return (
                    <div>
                        <Button icon="pi pi-check" onClick={() => { this.objDataCustomer(DataTable) }} />
                    </div>
                );
            }
        } catch (Error) {
            console.log(Error)
        }
    }

    /*****************MODAL***********************/
    DialogModal = () => {
        return (<Dialog header={this.TitleModal()} visible={this.state.displayModal} onHide={() => { this.setState({ displayModal: false }) }}>
            <div className='Container-Data-Modal'>
                {this.GetTable()}
            </div>
        </Dialog>);
    }
    TitleModal = () => {
        try {
            if (this.state.tblCustomer) {
                return "Customer";
            }
            if (this.state.tblProducts) {
                return "Product";
            }
        } catch (Error) {
            console.log(Error);
        }
    }
    render() {
        return (
            <section className='Container-OrderCustomer'>
                {this.DialogModal()}
                <div className='ContainerCustomer'>
                    <Toast ref={(el) => this.toast = el}  position="top-right"/>
                    <div className="ContainerDataOrder">
                        <div className="ContainerDataOrder-one">
                            <div className="ContainerSearchpedido">
                                <h3>Pedido Nro. {this.state.intIdOrder}</h3>
                            </div>
                        </div>
                        <div className="ContainerDataOrder-Two">
                            <div>
                                <h1>Customer<Button style={{ padding: "0px" }} icon="pi pi-search" className="p-button-text" onClick={() => { this.setState({ tblCustomer: true, displayModal: true, tblProducts: false }); this.LoadCustomers() }} />
                                </h1>
                                <div>
                                    <span className="p-float-label">
                                        <InputText id="strDocument" disabled={this.state.blnBtDisable ? false : true} value={this.state.JsonCustomers.strDocument} onChange={(e) => this.setState({ JsonCustomers: { strDocument: e.target.value, strName: this.state.JsonCustomers.strName, strEmail: this.state.JsonCustomers.strEmail, strPhone: this.state.JsonCustomers.strPhone } })} />
                                        <label htmlhtmlFor="strDocument">Documento</label>
                                    </span>
                                    <span className="p-float-label">
                                        <InputText id="strName" disabled={this.state.blnBtDisable ? false : true} value={this.state.JsonCustomers.strName} onChange={(e) => this.setState({ JsonCustomers: { strDocument: this.state.JsonCustomers.strDocument, strName: e.target.value, strEmail: this.state.JsonCustomers.strEmail, strPhone: this.state.JsonCustomers.strPhone } })} />
                                        <label htmlhtmlFor="strName">Nombres</label>
                                    </span>
                                    <span className="p-float-label">
                                        <InputText id="strEmail" disabled={this.state.blnBtDisable ? false : true} value={this.state.JsonCustomers.strEmail} onChange={(e) => this.setState({ JsonCustomers: { strDocument: this.state.JsonCustomers.strDocument, strName: this.state.JsonCustomers.strName, strEmail: e.target.value, strPhone: this.state.JsonCustomers.strPhone } })} />
                                        <label htmlhtmlFor="strEmail">Email</label>
                                    </span>
                                    <span className="p-float-label">
                                        <InputText id="strPhone" disabled={this.state.blnBtDisable ? false : true} value={this.state.JsonCustomers.strPhone} onChange={(e) => this.setState({ JsonCustomers: { strDocument: this.state.JsonCustomers.strDocument, strName: this.state.JsonCustomers.strName, strEmail: this.state.JsonCustomers.strEmail, strPhone: e.target.value } })} />
                                        <label htmlhtmlFor="strPhone">Celular</label>
                                    </span>
                                </div>
                            </div>
                            <div className='ContainerButtons'>
                                {this.ButtonsOrder()}
                            </div>
                        </div>
                    </div>
                    <div className="ContainerDetailOrder">
                        <div className="ContainerSearchProduct">
                            <span className="p-input-icon-left">
                                <i className="pi pi-search" />
                                <InputText disabled={!this.state.blnBtDisable ? false : true} value={this.state.txtProductSearch} onChange={(e) => this.setState({ txtProductSearch: e.target.value })} placeholder="Search" />
                            </span>{" "}
                            <Button icon="pi pi-search" disabled={!this.state.blnBtDisable ? false : true} onClick={() => { this.LoadProduct() }} />
                        </div>
                        <div className="ContainerTable">
                            <DataTable value={this.state.JsonDataTableProducts} paginator
                                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                                rows={5}
                                globalFilter={this.state.globalFilterTable}
                                rowHover
                            >
                                <Column field="intIdProduct" header="Código"></Column>
                                <Column body={this.ImgProduct} header="Imagen"></Column>
                                <Column field="strPrice" header="Precio"></Column>
                                <Column field="intCantidad" header="Cantidad"></Column>
                                <Column field="SubTotal" header="SubTotal"></Column>
                            </DataTable>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

}

export default OrderCustomer;