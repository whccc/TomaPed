import React, { Component } from 'react';
import { BsFillKanbanFill, BsFillPeopleFill, BsFillPersonFill } from 'react-icons/bs';

import { Chart } from 'primereact/chart';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import './Home.css';
class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            customers: [
                {
                    Vendedor: "Wilson herney castro",
                    Cliente: "wilson herney castro",
                    Items: "45",
                    Valor: "$45.000"

                }

            ]
        };

    }
    actionBodyTemplate=(a)=>{
        return (
            <button>
                Ver
            </button>
        );
        alert(a)
        console.log(a)
    }
    render() {
        const state = {
            labels: ['Vendedor1', 'Vendedor2', 'Vendedor3'],
            datasets: [
                {
                    label: "Pedidos",
                    fill: false,
                    lineTension: 1,
                    backgroundColor: ['rgba(145, 227, 70, .5)', 'rgba(227, 142, 116, .5)', 'rgba(75,182,192,.5)'],
                    borderColor: ['rgba(145, 227, 70, 1)', 'rgba(227, 142, 116, 1)', 'rgba(75,182,192,1)'],
                    borderWidth: 1,
                    data: [65, 59, 80]
                }
            ]
        }

        const lightOptions = {
            legend: {
                labels: {
                    fontColor: '#495057'
                }
            }
        };

        return (
            <section className='Container-Home'>
                <div className='Container-HM'>
                    <div className='Container-Section-One'>
                        <div className='Container-SO'>
                            <div className='Container-info'>
                                <h6>PEDIDOS</h6>
                                <small>100</small>
                            </div>
                            <div className='Container-icon'>
                                <BsFillKanbanFill />
                            </div>
                        </div>

                        <div className='Container-SO'>
                            <div className='Container-info'>
                                <h6>CLIENTES</h6>
                                <small>100</small>
                            </div>
                            <div className='Container-icon'>
                                <BsFillPeopleFill />
                            </div>
                        </div>

                        <div className='Container-SO'>
                            <div className='Container-info'>
                                <h6>VENDEDORES</h6>
                                <small>100</small>
                            </div>
                            <div className='Container-icon'>
                                <BsFillPersonFill />
                            </div>
                        </div>
                    </div>

                    <div className='Container-Section-Two'>
                        <h4>PEDIDOS POR VENDEDOR DIARIO</h4>
                        <Chart type="pie" data={state} options={lightOptions} />
                    </div>

                    <div className='Container-Section-Three'>
                        <h4>ULTIMOS PEDIDOS</h4>
                        <div className="Container-table">
                            <DataTable value={this.state.customers} paginator
                                paginatorTemplate="CFirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                                currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={5} rowsPerPageOptions={[10, 20, 50]}
                            >
                                <Column field="Vendedor" header="Vendedor"></Column>
                                <Column field="Cliente" header="Cliente"></Column>
                                <Column field="Items" header="Nro Items"></Column>
                                <Column field="Valor" header="Valor"></Column>
                                <Column field="Valor" header="Valor"></Column>
                                <Column field="Valor" header="Valor"></Column>
                                <Column field="Valor" header="Valor"></Column>
                                <Column field="Valor" header="Valor"></Column> 
                                <Column body={this.actionBodyTemplate}></Column>
                            </DataTable>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

}
export default Home;