import React, { Component } from 'react';
import { BsFillKanbanFill, BsFillPeopleFill, BsFillPersonFill } from 'react-icons/bs';
import HelpersP from '../../Helpers';
import { URL_API } from '../../VariablesDeEntorno';
import { Chart } from 'primereact/chart';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import axios from 'axios';
import './Home.css';
import { helpers } from 'chart.js';
class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            intNroUser:0,
            intNroOrders:0,
            intNroCustomers:0,
            objSellers:{
            labels: ['Vendedor1', 'Vendedor2', 'Vendedor3'],
            datasets: [
                {
                    label: "Pedidos",
                    fill: false,
                    lineTension: 1,
                    backgroundColor: 'rgba(145, 227, 70, .5)',
                    borderColor: 'rgba(145, 227, 70, 1)',
                    borderWidth: 1,
                    data: []
                }
            ]},
            Orders: [
                

            ]
        };

    }   
    componentDidMount(){
        this.GetNroUserCustomerOrders();
        this.OrderBySellers();
        this.GetListOrders();
    }
    GetNroUserCustomerOrders=async()=>{
        try{
            let strData=await axios.get(URL_API+"/api/user/NroUser");
            this.setState({
                intNroUser:strData.data.strData[0].NroUsers,
                intNroCustomers:strData.data.strData[0].NroCustomers,
                intNroOrders:strData.data.strData[0].NroOrders
            })
        }catch(Error){
            console.log(Error)
        }
    }
    OrderBySellers=async()=>{
        try{
            let strData=await axios.get(URL_API+"/api/user");
            let labelsSellers=[];
            let dataSellers=[];
            let RGB=[];
            strData.data.strData.forEach(strDataSeller => {
                labelsSellers.push(strDataSeller.strName);
                dataSellers.push(strDataSeller.NroPedidos);
                RGB.push(HelpersP.colorRGB());
            });
            //Chat js
            this.setState({
                objSellers:
                {
                    labels: labelsSellers,
                    datasets: [
                        {
                            label: "Pedidos",
                            fill: false,
                            lineTension: 1,
                            backgroundColor: RGB,
                            borderColor: "#000",
                            borderWidth: 1,
                            data: dataSellers
                        }
                    ]
                }
            })
            console.log(this.state)
        }catch(Error){
            console.log(Error)
        }
    }
    GetListOrders=async()=>{
        try{
            let strData=await axios.get(URL_API+"/api/order");
            this.setState({
                Orders:strData.data.strData
            })
        }catch(Error){
            console.log(Error)
        }
    }

    render() {
      

     

        return (
            <section className='Container-Home'>
                <div className='Container-HM'>
                    <div className='Container-Section-One'>
                        <div className='Container-SO'>
                            <div className='Container-info'>
                                <h6>PEDIDOS</h6>
                                <small>{this.state.intNroOrders}</small>
                            </div>
                            <div className='Container-icon'>
                                <BsFillKanbanFill style={{color:"#3DAAD9"}}/>
                            </div>
                        </div>

                        <div className='Container-SO'>
                            <div className='Container-info'>
                                <h6>CLIENTES</h6>
                                <small>{this.state.intNroCustomers}</small>
                            </div>
                            <div className='Container-icon'>
                                <BsFillPeopleFill style={{color:"#3DAAD9"}} />
                            </div>
                        </div>

                        <div className='Container-SO'>
                            <div className='Container-info'>
                                <h6>VENDEDORES</h6>
                                <small>{this.state.intNroUser}</small>
                            </div>
                            <div className='Container-icon'>
                                <BsFillPersonFill style={{color:"#3DAAD9"}} />
                            </div>
                        </div>
                    </div>

                    <div className='Container-Section-Two'>
                        <h4>PEDIDOS POR VENDEDOR</h4>
                        <Chart type="horizontalBar" data={this.state.objSellers}  />
                    </div>

                    <div className='Container-Section-Three'>
                        <h4>ULTIMOS PEDIDOS</h4>
                        <div className="Container-table">
                            <DataTable value={this.state.Orders} paginator
                                 currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={5} 
                            >
                                <Column field="intIdOrder" header="Pedido"></Column>
                                <Column field="dtFechaInicio" header="Fecha"></Column>
                                <Column field="strNameSeller" header="Vendedor"></Column>
                                <Column field="strNameCustomer" header="Cliente"></Column>
                            </DataTable>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

}
export default Home;