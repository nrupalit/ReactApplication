//lib
import React, { Component,Fragment } from 'react';
import { connect } from "react-redux";
import * as actions from "../../../actions/action_authentication";
import cx from 'classnames';
import { CSVLink } from "react-csv";
//GRID COMPONENTS
import FormActionBtns from "../UtilsLayout/FormBtn/formactionbtns";
import Table from './ProjectManpowerMainTable';
import TableHeader from './ProjectManpowerMainTableHeader';
//components
import Navbar from '../../../components/NavBar/Navbar';
import Footer from '../../../components/Footer/Footer';
import Leftsidebar from '../../../components/SideBar/left/leftsidebar';
import Rightsidebar from '../../../components/SideBar/right/rightsidebar';
import Spinner from '../../../Layout/Spinner/Spinner';
import ServerError from '../../../Layout/ServerError/ServerError';
import ServerStatus from '../../../Layout/ServerSucess/ServerStatus';
import Backdrop from '../../../Layout/Backdrop/Backdrop';
//css styles
import Bootstrap from './../../../Bootstrap//bootstrap.module.css';

import  './ProjectManpowerSchedule.css'
export default class ProjectManpowerSchedule extends Component {
    state={actions:{
        edit:false,
        add:false,
        submit:false,
    },
    upperHeader:["MancPower"
  ],

    lowerHeader:["Type","Person","Workdays","Total Cost"
    ],
    row:[[ "1","2","3","4"],
        [ "1","2","3","4"],
        [ "1","2","3","4"],
        [ "1","2","3","4"],
        [ "1","2","3","4"],
    ],
    
  
};

componentDidMount(){
  this.setState({
    index:this.state.row.length,
  })
}
onDelete = () => {
    console.log(this.state.row);
    console.log(this.state.index);
    let oldrow=this.state.row
    let newrow=this.state.row.splice(this.state.index,1);
    
    console.log(oldrow);
    this.setState({row:oldrow});
}
    
    onEdit=()=>{
        this.setState({ edit: !this.state.edit });
        
    }
    
    onAdd=()=>{
        let emptyRow=['NewRow','','',''];
        let oldRow=this.state.row;
        let newrow=this.state.row.splice(this.state.index+1,0,emptyRow);
        this.setState({row:oldRow});
    }

    onCheck=(checkRow)=>{

        this.setState({index:checkRow});

    }

    onDownload=()=>{
       let headers=this.state.header;
       let data =this.state.row;
        
    }

    onInputChange=(val,row,col)=>{
      console.log(val,row,col);

      let oldRow=this.state.row;
      console.log(oldRow)
      let oldValue= this.state.row[row].splice(col,1);
      console.log(oldValue)
      let newValue=  this.state.row[row].splice(col,0,val);
      console.log(newValue)
this.setState({
  row:oldRow
})


    }
    section = {
        width: "100%",
        height: "85vh",
        margin: "0 auto",
        // position: "relative"
    };
    tableHeader = {
        width: "100px",
        backgroundColor: "#344466",
        color: "white",
        height: "50px",
        marginBottom: "2px",
        textAlign: "center",
        paddingTop: "10px",
        textAlign: "center",
        marginLeft: "10px",
    };
    
    actionbtn = [
        {
          id: 2,
          name: "Submit",
          bclass: "btn btn-outline-dark",
          iclass: "fa fa-save",
          onClick: this.onSave,
          color: "white"
        },
        {
          id: 3,
          name: "Delete",
          bclass: "btn btn-outline-dark",
          iclass: "fa fa-trash",
          onClick: this.onDelete,
          color: "white"
        },
        {
          id: 4,
          name: "Add",
          bclass: "btn btn-outline-dark",
          iclass: "fa fa-plus",
          onClick: this.onAdd,
          color: "white"
        },
        {
          name: "Edit",
          bclass: "btn btn-outline-dark",
          iclass: "fa fa-pencil",
          onClick: this.onEdit,
          color: "white"
        }
      ];
  render() {
    
    return (
        <Fragment>
      <Leftsidebar />
      <Rightsidebar/>
        {(this.props.isLoading)?(<Backdrop><Spinner/></Backdrop>):null}   
        {(this.props.isServerError)?(<Backdrop><ServerError 
        click={this.hideServerErrorModal}/></Backdrop>):null} 
        {(this.props.isServerStatus)?(<Backdrop><ServerStatus modalHeader={this.props.isServerMsg} 
        modalCase={this.props.isServerStatus} click={this.props.hideServerSucessModal}/></Backdrop>):null}
        <Navbar/>
       <div className={cx(Bootstrap['container-fluid'])}>
       <section style={this.section}>
          <div
            style={{
              backgroundColor: "#987c46",
              width: "100%",
              height: "50px",
              position: "relative"
            }}
          >
            <div style={{ float: "left" }}>
              <label
                style={{
                  position: "absolute",
                  top: "10px",
                  left: "30px",
                  color: "white",
                  fontSize:"24px"
                }}
              >
                Man Power
              </label>
            </div>

            {this.actionbtn.map(b => (
              <FormActionBtns actionbtn={b} key={b.id}  />
            ))

            }
                <button style={{
                  margin: "6px",
                  borderRadius: "15px",
                  width: "100px",
                  float: "right",
                  height:"25px",
                            color:"white"
    }}
            className="btn btn-outline-dark fa fa-download" >
            <CSVLink data={this.state.row} headers={this.state.upperheader} headers={this.state.lowerHeader}
             filename={"ManpowerGCO"+Date.now()+'.csv'}
            style={{color:"white"}}
            className="btn" >Download</CSVLink>  
            </button> 
          </div>
          <div />

          <form className="manpowergco__scrolltable">
       
        <Table upperHeader={this.state.upperHeader}
        lowerHeader={this.state.lowerHeader}
         row={this.state.row} 
         edit={this.state.edit} 
         onCheck={this.onCheck}
         onInputChange={this.onInputChange}  
         checkRow={this.state.index}      
         >
              <TableHeader
           upperHeader={this.state.upperHeader}
           lowerHeader={this.state.lowerHeader}
            row={this.state.row} 
            edit={this.state.edit} 
           />
        </Table>
<Table upperHeader={this.state.upperHeader}
        lowerHeader={this.state.lowerHeader}
         row={this.state.row} 
         edit={this.state.edit} 
         onCheck={this.onCheck}
         onInputChange={this.onInputChange}   
         checkRow={this.state.index}       
         />

<Table upperHeader={this.state.upperHeader}
        lowerHeader={this.state.lowerHeader}
         row={this.state.row} 
         edit={this.state.edit} 
         onCheck={this.onCheck}
         onInputChange={this.onInputChange}      
         checkRow={this.state.index}    
         />
         </form>
       </section>
       </div>
       </Fragment>
    )
  }
}


  