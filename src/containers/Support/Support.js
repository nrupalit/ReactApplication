import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from "../../actions/action_authentication";
import Navbar from '../../components/NavBar/Navbar';
import Footer from '../../components/Footer/Footer';
// import {supportFormValidator} from '../../utils/formValidators';
import ServerError from '../../Layout/ServerError/ServerError';
import ServerStatus from '../../Layout/ServerSucess/ServerStatus';
import Spinner from '../../Layout/Spinner/Spinner';
import Backdrop from '../../Layout/Backdrop/Backdrop';
// import cx from 'classnames'
// import Bootstrap from './../../Bootstrap/bootstrap.module.css'
import styles from "./Support.module.css";

//inner support form 
import SupportForm from './SupportForm';
class Support extends Component {  

    state={
        fileName:'',
        supportBody:{
            category:'info',
            description:'',
            attachment:'',
        }
    }

    refreshSucess=()=>{
      this.props.hideServerSucessModal();
  window.location.reload();
    }

    render() { 
     return (
        <div className={styles['support--header']}>
        {(this.props.isLoading)?(<Backdrop><Spinner/></Backdrop>):null}   
        {(this.props.isServerError)?(<Backdrop><ServerError  click={this.props.hideServerErrorModal}/></Backdrop>):null}   
        {(this.props.isServerStatus)?(<Backdrop><ServerStatus
         modalHeader={this.props.isServerMsg} modalCase={this.props.isServerStatus} 
         click={this.refreshSucess}/></Backdrop>):null} 
        <Navbar/>
        <SupportForm formdata={this.state.supportBody}/>
      <div className={styles.support_login}> 
      <Footer history={this.props.history.location.pathname} />
      </div>
      </div>
         );
    }
}



const mapStateToProps =(state)=> {
    return{
      isLoading:state.utilityLayout.isLoading,
      isServerError:state.utilityLayout.isServerError,
      isServerStatus:state.serverStatus.supportStatus,
      isServerMsg:state.serverStatus.supportMessage
    }
  }
  
export default connect(
    mapStateToProps,
    actions
  )(Support);
  
 