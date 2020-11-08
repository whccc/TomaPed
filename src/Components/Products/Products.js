import React,{Component} from 'react';
import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { FileUpload } from 'primereact/fileupload';
import { Messages } from 'primereact/messages';
import NotProduct from '../../Images/NotProduct.png';
import { URL_API } from '../../VariablesDeEntorno';
import Helpers from '../../Helpers';
import './Products.css';
import axios from 'axios';
class Products extends Component{
    constructor(props){
        super(props);
        this.state={
            intIdProduct:"",
            strDescription:"",
            strPrice:"",
            strImgBase64:null,
            globalFilterTable:"",
            displayModal:false,
            blnButtonCreate:true,
            blnButtonEdit:false,
            JsonProducts:[]
        }
    }
    componentDidMount(){
        this.LoadProducts();
    }
    //Validate Data Product
    ValidateDataProduct=()=>{
        try{
            if(this.state.strImgBase64==null && this.state.blnButtonCreate==true){
                this.MessagesModalProduct.show({ severity: 'error', summary: 'Seleccione imagen del producto' });
                return false;
            }
            if(this.state.intIdProduct.trim()==""){
                document.getElementById('intIdProduct').focus();
                this.MessagesModalProduct.show({ severity: 'error', summary: 'Digite código' });
                return false;
            }
            if(this.state.strPrice==""){
                document.getElementById('strPrice').focus();
                this.MessagesModalProduct.show({ severity: 'error', summary: 'Digite precio' });
                return false;
            }
            if(this.state.strDescription.trim()==""){
                document.getElementById('strDescription').focus();
                this.MessagesModalProduct.show({ severity: 'error', summary: 'Digite descripción' });
                return false;
            }
            return true;
        }catch(Error){
            console.log(Error);
        }
    }
    //Create product
    CreateProduct=async()=>{
        try{
            if(!this.ValidateDataProduct()){
                return;
            }
            let objProduct={
                intIdProduct:this.state.intIdProduct,
                strPrice:this.state.strPrice,
                strDescription:this.state.strDescription,
                strImgBase64:this.state.strImgBase64
            }
            let strData=await axios.post(URL_API+"/api/product/create",objProduct);
            if(strData.data.Success){
                this.messages.show({ severity: 'success', summary: 'Producto creado con éxito' });
                this.UpdateStateProduct();
                this.LoadProducts();
            }

        }catch(Error){
            console.log(Error)
        }
    }
    //Load Products
    LoadProducts=async()=>{
        try{
            let strData=await axios.get(URL_API+"/api/product");
            if(strData.data.Success){
                this.setState({JsonProducts:strData.data.strData});
            }
        }catch(Error){
            console.log(Error)
        }
    }
    //Update state
    UpdateStateProduct=()=>{
        try{
            this.setState({
                intIdProduct:"",
                strDescription:"",
                strPrice:"",
                strImgBase64:null,
                globalFilterTable:"",
                displayModal:false,
                blnButtonCreate:true,
                blnButtonEdit:false
            })
        }catch(Error){
            console.log(Error);
        }
    }
    //Load img product
    LoadImgProduct=async(file)=>{
        let imgBase64=await Helpers.getBase64(file.target.files[0])
        await this.setState({
            strImgBase64:imgBase64
        })
        document.querySelector('.ContainerImgProduct img').src=this.state.strImgBase64;
    }
    //Edit product
    EditDataProduct=async(objProduct)=>{
        try{
             await this.setState({
                intIdProduct:objProduct.intIdProduct,
                strDescription:objProduct.strDescription,
                strPrice:objProduct.strPrice,
                displayModal:true,
                blnButtonCreate:false,
                blnButtonEdit:true,
                urlImg:URL_API+"/api/product/img/"+objProduct.intIdProduct+".jpg"
            });
            setTimeout(()=>{
                document.querySelector('.ContainerImgProduct img').src=this.state.urlImg;
            },200);
        }catch(Error){
            console.log(Error)
        }
    }
    EditProduct=async()=>{
        try{
            if(!this.ValidateDataProduct()){
                return;
            }
            let objProduct={
                intIdProduct:this.state.intIdProduct,
                strDescription:this.state.strDescription,
                strPrice:this.state.strPrice,
                strImgBase64:this.state.strImgBase64
            }
            let strData=await axios.put(URL_API+"/api/product/edit",objProduct);
            if(strData.data.Success){
                this.messages.show({ severity: 'success', summary: 'Producto actualizado con éxito' });
                this.UpdateStateProduct();
                this.LoadProducts();
            }
        }catch(Error){
            console.log(Error);
        }
    }
    /*****************MODAL***********************/
    DialogModal = () => {
        return (<Dialog header={this.state.blnButtonCreate ? "New Product" : "Edit Product"} visible={this.state.displayModal} onHide={this.UpdateStateProduct}>
            <div className='Container-Data-Modal'>
                <div className="ContainerDataProduct">
                        <div className='ContainerImgProduct' for="FileProduct">
                            <img src={NotProduct}/>
                        </div>
                        <div>
                            <label for="FileProduct">Seleccione Imagen</label>
                            <input accept="image/*" type="file" id="FileProduct" name="FileProduct" onChange={this.LoadImgProduct}/>
                            <span className="p-float-label">
                                <InputText id="intIdProduct" disabled={this.state.blnButtonCreate ? false : true} value={this.state.intIdProduct} onChange={(e) => this.setState({ intIdProduct: e.target.value })} />
                                <label htmlFor="intIdProduct">Código</label>
                            </span>
                            <span className="p-float-label">
                                <InputText id="strPrice" keyfilter="int" value={this.state.strPrice} onChange={(e) => this.setState({ strPrice: e.target.value })} />
                                <label htmlFor="strPrice">Precio</label>
                            </span>
                            <span className="p-float-label">
                                <InputText id="strDescription" value={this.state.strDescription} onChange={(e) => this.setState({ strDescription: e.target.value })} />
                                <label htmlFor="strDescription">Descripción</label>
                            </span>
                        </div>
                </div>
                <Messages ref={(el) => this.MessagesModalProduct = el}></Messages>
                <div className='Container-button'>
                    <Button label="Create" style={{ display: this.state.blnButtonCreate ? "inline-block" : "none" }} className="bg-primary" onClick={this.CreateProduct} />
                    <Button label="Edit" style={{ display: this.state.blnButtonEdit ? "inline-block" : "none" }} className="p-button-warning" onClick={this.EditProduct} />
                    {" "}<Button label="Cancel" className="p-button-danger" onClick={this.UpdateStateProduct} />
                </div>
            </div>
        </Dialog>);
    }
    /****************************TABLE*************++ */
     //HeaderTable
     renderHeaderTable = () => {
        return (
            <div className="table-header">
                <div>
                    <Button label="New Product" icon="pi pi-external-link" onClick={()=>{this.setState({displayModal:true})}} />
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
    ImgProduct=(objProduct)=>{
        try{
            return (
                <img className="TblImgProduct" src={URL_API+"/api/product/img/"+objProduct.intIdProduct+".jpg?"+Date.now()}/>
            );
        }catch(Error){
            console.log(Error)
        }
    }
    ButtonsTable = (DataProduct) => {
        return (
            <div>
                <Button icon="pi pi-pencil" className="p-button-rounded" className='bg-primary' onClick={() => this.EditDataProduct(DataProduct)} />
                {" "}
             </div>
        );
    }
    render(){
        return(
            <section className='Container-Product'>
                <div className='ContainerProduct'>
                 <h1>Product</h1>
                <Messages ref={(el) => this.messages = el}></Messages>
                <div className='Container-Modal'>
                    {this.DialogModal()}
                </div>
                <div className='Container-Table'>
                        <DataTable value={this.state.JsonProducts} paginator
                            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={5} 
                            globalFilter={this.state.globalFilterTable}
                            rowHover
                            header={this.renderHeaderTable()}
                        >
                            <Column field="intIdProduct" header="Código"></Column>
                            <Column body={this.ImgProduct} header="Imagen"></Column>
                            <Column field="strDescription" header="Descripción"></Column>
                            <Column field="strPrice" header="Precio"></Column>
                            <Column field="dtEntry" header="Ingreso"></Column>
                            <Column header="Acciones" body={this.ButtonsTable}></Column>
                        </DataTable>
                    </div>
                    </div>
            </section>
        );
    }

}

export default Products;