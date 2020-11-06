import React, { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

import './Sellers.css';
class Sellers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayModal: false,
            customers: [
                {
                    Vendedor: "Wilson herney castro",
                    Cliente: "wilson herney castro",
                    Items: "45",
                    Valor: "$45.000"

                },
                {
                    Vendedor: "Wilson herney castro",
                    Cliente: "wilson herney castro",
                    Items: "45",
                    Valor: "$45.000"

                }, {
                    Vendedor: "Wilson herney castro",
                    Cliente: "wilson herney castro",
                    Items: "45",
                    Valor: "$45.000"

                }, {
                    Vendedor: "Wilson herney castro",
                    Cliente: "wilson herney castro",
                    Items: "45",
                    Valor: "$45.000"

                }, {
                    Vendedor: "Wilson herney castro",
                    Cliente: "wilson herney castro",
                    Items: "45",
                    Valor: "$45.000"

                }, {
                    Vendedor: "Wilson herney castro",
                    Cliente: "wilson herney castro",
                    Items: "45",
                    Valor: "$45.000"

                }, {
                    Vendedor: "Wilson herney castro",
                    Cliente: "wilson herney castro",
                    Items: "45",
                    Valor: "$45.000"

                }, {
                    Vendedor: "Wilson herney castro",
                    Cliente: "wilson herney castro",
                    Items: "45",
                    Valor: "$45.000"

                }, {
                    Vendedor: "Wilson herney castro",
                    Cliente: "wilson herney castro",
                    Items: "45",
                    Valor: "$45.000"

                }, {
                    Vendedor: "Wilson herney castro",
                    Cliente: "wilson herney castro",
                    Items: "45",
                    Valor: "$45.000"

                }, {
                    Vendedor: "Wilson herney castro",
                    Cliente: "wilson herney castro",
                    Items: "45",
                    Valor: "$45.000"

                }

            ]
        };
    }
    displayModal = () => {
        this.setState({
            displayModal: this.state.displayModal ? false : true
        })
    }

    DialogModal = () => {
        return (<Dialog header="New Seller" visible={this.state.displayModal} style={{ width: '90vw'}} onHide={() => { this.setState({ displayModal: false }) }}>
            <div className='Container-Data-Modal'>
                <span className="p-float-label">
                    <InputText id="in" value={this.state.value} onChange={(e) => this.setState({ value: e.target.value })} />
                    <label htmlhtmlFor="in">Cédula</label>
                </span>
                <span className="p-float-label">
                    <InputText id="in" value={this.state.value} onChange={(e) => this.setState({ value: e.target.value })} />
                    <label htmlhtmlFor="in">Nombres</label>
                </span>
                <span className="p-float-label">
                    <InputText id="in" value={this.state.value} onChange={(e) => this.setState({ value: e.target.value })} />
                    <label htmlhtmlFor="in">Apellidos</label>
                </span>
                <span className="p-float-label">
                    <InputText id="in" value={this.state.value} onChange={(e) => this.setState({ value: e.target.value })} />
                    <label htmlhtmlFor="in">Correo</label>
                </span>
                <span className="p-float-label">
                    <InputText id="in" value={this.state.value} onChange={(e) => this.setState({ value: e.target.value })} />
                    <label htmlhtmlFor="in">Celular</label>
                </span>
                <span className="p-float-label">
                    <InputText id="in" value={this.state.value} onChange={(e) => this.setState({ value: e.target.value })} />
                    <label htmlhtmlFor="in">Dirección</label>
                </span>
                <div className='Container-button'>
                    <Button label="Create"  className="bg-primary"/>
                    <Button label="Cancel"  className="p-button-danger" onClick={() => { this.setState({ displayModal: false }) }} />
                </div>
            </div>
        </Dialog>);
    }
    render() {
        return (
            <section className='Container-Sellers'>
                <div className='Container-Sell'>
                    <h3>Sellers</h3>
                    <div className='Container-Modal'>
                        <Button label="New Sellers" icon="pi pi-external-link" onClick={this.displayModal} />
                        {this.DialogModal()}
                    </div>
                    <div className='Container-Table'>
                        <DataTable value={this.state.customers} paginator
                            paginatorTemplate="CFirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={10} rowsPerPageOptions={[10, 20, 50]}
                        >
                            <Column field="Vendedor" header="Cedula"></Column>
                            <Column field="Cliente" header="Nombres"></Column>
                            <Column field="Items" header="Apellidos"></Column>
                            <Column field="Valor" header="Correo"></Column>
                            <Column field="Valor" header="Celular"></Column>
                            <Column field="Valor" header="Dirección"></Column>
                            <Column header="Acciones" body={this.actionBodyTemplate}></Column>
                        </DataTable>
                    </div>
                </div>
            </section>
        );
    }
}

export default Sellers;