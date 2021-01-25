import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import * as actions from "../../actions/action_authentication";
import cx from 'classnames'
import Bootstrap from './../../Bootstrap/bootstrap.module.css'
import styles from './navbar.module.css';
const D2BNav = (props) => {
    return (
          <nav className={cx("navbar navbar-expand-sm fixed-top bg-white",styles.navbar)} style={{alignItems: "center",
            borderBottom: "1px solid rgba(233, 230, 230, 0.8)"}}>
                
                {props.auth!=null?(
                 <Link to='/landing_page'     className={Bootstrap['navbar-brand']}      >
                     <img src={require('../assets/icons/Logo.png') }alt="Logo"  />
                 </Link>
                ):(
                 <Link to='/home'     className={Bootstrap['navbar-brand']}      >
                 <img src={require('../assets/icons/Logo.png') }alt="Logo"  />
             </Link> 
                )}
                
                 
                 <form className={cx(Bootstrap['form-inline'],Bootstrap['ml-4'])}>
                      <img src={require('../assets/icons/location.png') }alt="Logo"/>
                      <input className={cx(Bootstrap['form-control'],Bootstrap['mr-sm-2'],
                      Bootstrap['ml-2'], styles['navbar-input'])} type="text" placeholder="Your Location"/>
                 </form>
                 <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02"
                  aria-controls="navbarTogglerDemo02" aria-expanded="true" aria-label="Toggle navigation">
         <span className="navbar-toggler-icon"><i class="fa fa-navicon"></i></span>
       </button>
                 {props.auth!=null?(
                     <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                     <ul className="navbar-nav ml-auto"
                     
                     style={{
                         alignItems: "center"
                     }}
                     >
                              <a  className="dropdown-toggle mr-3 customdropbutton" data-toggle="dropdown">
             
             </a>
             <ul className=" dropdown-menu"
             
             style={{
                  marginLeft:"45%"
             }}
             >
             <Link className="dropdown-item" to="/viewProfile">View Profile</Link>
             
             </ul>
                     <li className={Bootstrap['nav-item']}>
                         <h2 className={cx(Bootstrap['nav-link'], Bootstrap['mr-2'])}
                         style={{
                             color:"#78849e"
                         }}  
                          >{props.auth.data.first_name}
                          </h2>
                     </li>
                     <li className={Bootstrap['nav-item']}>
                     <img src={require('./../../assets/icons/ava.png')} alt="Avatar" className={styles.avatar}/>
                     </li>
                     <li className={Bootstrap['nav-item']}>
                         <Link to="/login" className={cx(Bootstrap['nav-link'], Bootstrap['mr-2'])}
                         onClick={props.logout}
                         >Logout</Link>
                     </li>
                 </ul>
                 </div>
                 ):(   <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                     <ul className="navbar-nav ml-auto">
                     <li className={Bootstrap['nav-item']}>
                         <Link className={cx(Bootstrap['nav-link'],Bootstrap['mr-3'])}
                          to="/"
                          style={(props.history==='/' || props.history==='/home')?
                          {color:'#987c46'}:null
                          }
                          >Home
                          
                          </Link>
                     </li>
                     <li>
                     <a className={Bootstrap['nav-link']} href="#">|</a>
                     </li>
                     <li className={Bootstrap['nav-item']}>
                         <Link className={cx(Bootstrap['nav-link'],Bootstrap['mr-3'])}         
                         to="/register"
                         style={(props.history==='/register')?
                         {color:'#987c46'}:null
                         }
                         >Register
                         </Link>
                     </li>
                     <li>
                     <a className={Bootstrap['nav-link']} href="#">|</a>
                     </li>
                     <li className={Bootstrap['nav-item']}>
                         <Link className={cx(Bootstrap['nav-link'], Bootstrap['mr-3'])}
                          to="/login"
                          style={(props.history==='/login')?
                          {color:'#987c46'}:null
                               }
                         >Login</Link>
                     </li>
                 </ul>
                 </div>
                 )}
                 
         </nav>
      
        
    )
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    };
};

export default connect(
    mapStateToProps,
    actions
)(D2BNav);


// export default  D2BNav;