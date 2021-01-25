import { connect } from "react-redux";
import * as actions from "actions/action_authentication";
import React from 'react'
const hoc = WrappedComponent => {
    class HOC extends React.Component {

        state={

        }
      getStyles = props => {
      
      };

      hideProjectSideBar=()=>{
        // alert('pro')
          this.props.hideProjectSidebar()
      }
      hideResSideBar=()=>{
        // alert('nopro')
        this.props.hideResourcesSidebar()
    }
    showBoth=()=>{
      // alert('both')
    }

    hideBothSideBar=()=>{
      this.props.hideProjectSidebar()
      this.props.hideResourcesSidebar()
    }
      componentWillReceiveProps=(props)=>{
      }
      render() {
        const newprops = this.getStyles(this.props);
        // alert(JSON.stringify(this.props))
        if((this.props.projectPin!=true || this.props.projectPin==null ) && this.props.resPin==true){
             return <WrappedComponent {...this.props} hideProjectSideBar={this.hideProjectSideBar}  />;
            }
        if(this.props.projectPin==true && (this.props.resPin!=true||this.props.resPin==null )){
              return <WrappedComponent {...this.props}  hideProjectSideBar={this.hideResSideBar}  />;
             }
        if(this.props.projectPin==true && this.props.resPin==true){
            return <WrappedComponent {...this.props}  hideProjectSideBar={this.showBoth}  />;
        }   
        if((this.props.projectPin==false || this.props.projectPin==null) && (this.props.resPin==false||this.props.resPin==null)) {
          return <WrappedComponent {...this.props}  hideProjectSideBar={this.hideBothSideBar}  />;
      } 
      if(this.props.projectPin==null && this.props.resPin==null){
        return <WrappedComponent {...this.props}  hideProjectSideBar={this.hideBothSideBar}  />;
    } 
      }
    }

    const mapStateToProps = state => {
        return {
          projectToggle:state.utilityLayout.projectSidebar,
          projectPin:state.utilityLayout.projectPin,
          resPin:state.utilityLayout.resPin
          
        };
      };

    return connect(mapStateToProps,actions)(HOC);
  };
  
  export default hoc;