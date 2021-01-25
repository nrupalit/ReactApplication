import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from 'actions/action_authentication';
import Navbar from "components/NavBar/Navbar";
import Footer from "components/Footer/Footer";
import Leftsidebar from "components/SideBar/left/leftsidebar";
import Rightsidebar from "components/SideBar/right/rightsidebar";
//admin
import ViewProfile from './ViewProfile'

import HOC from 'HOC/ProjectHOC'



export class DashBoard extends Component {

  state={
    formval: {
      comp_name: "",
      comp_brand: "",
      comp_logo: null,
      addr: "",
      pin: "",
      state: "",
      country: "",
      city: "",
      first_name: "",
      last_name: "",
      acct_type: "company",
      email: "",
      mobile: "",
      pwd: "",
      comp_phone: "",
      comp_email: "",
      acc_type:"",
      cpwd:'',
    },
  }

  handleSubmit=(e)=>{
    e.preventDefault()
    // alert('hii')
  }

  componentWillMount=()=>{
    this.props.fetchUserProfile({
      otheruser:this.props.userId
    },this.props.token)
  }

  componentWillReceiveProps=(props)=>{
      if(props.viewProfile!=null){
        // alert(JSON.stringify(props.viewProfile))
        this.setState({
          formdata:props.viewProfile
        })
      }
  }
  viewProfile=()=>{
if(this.state.formdata!=null){
  return    <ViewProfile  type={'company'}
  formval={this.state.formdata}
  handleSubmit={this.handleSubmit}
  handleChange={''}
  passwordErrorMsg={''}
  emailErrorMsg={''}
  uploadLogo={''}
  logoName={''}
  CityChange={''}
  dataList={''}
  selectCity={''}
  ToggleCity={''}/>
}
   
  }
  render() {
    return (
      <>
        <Navbar/>
        <Leftsidebar history={this.props.history}/>
        <Rightsidebar  history={this.props.history}/>
        <Footer/>
        <div onClick={this.props.hideProjectSideBar}>
        {this.viewProfile()}
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  token:state.auth.token,
  userId:state.auth.data[0]._id,
  viewProfile:state.serverData.viewProfile,
})


export default HOC(connect(mapStateToProps, action)(DashBoard))
