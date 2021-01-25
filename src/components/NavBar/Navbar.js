import React from "react";
import {Link} from 'react-router-dom';
import { connect } from "react-redux";
import * as actions from "../../actions/action_authentication";
import cx from 'classnames'
import Bootstrap from './../../Bootstrap/bootstrap.module.css'
import styles from './navbar.module.css';
const D2BNav=(props)=>{
    const loginStatus =() =>{
        if(props.loginStatus==99){
            console.log("consoling from components/NavBar/Navbar.js")
            props.login_stopped()
        }
    }
return(
    <nav className={cx(Bootstrap.navbar,Bootstrap['navbar-expand-sm'],Bootstrap['fixed-top'],Bootstrap['bg-white'],styles.navbar)}>
           
           {props.auth!=null?(
            <Link to='/landing_page'     className={Bootstrap['navbar-brand']}      >
                <img src={require('../assets/icons/Logo.png') }alt="Logo"  />
            </Link>
           ):(
                <Link to='/home'    onClick={loginStatus} className={Bootstrap['navbar-brand']}      >
                    <img src={require('../assets/icons/Logo.png') }alt="Logo"  />
                </Link> 
                
           )}
           
            {/* </a> */}
            <form className={cx(Bootstrap['form-inline'],Bootstrap['ml-4'])}>
                 <img src={require('../assets/icons/location.png') }alt="Logo"/>
                 <input className={cx(Bootstrap['form-control'],Bootstrap['mr-sm-2'],
                 Bootstrap['ml-2'], styles['navbar-input'])} type="text" placeholder="Your Location"/>
            </form>
            
            {props.auth!=null?(
                
                <ul className={cx(Bootstrap['navbar-nav'],Bootstrap['ml-auto']
                )}
                style={{
                    alignItems: "center"
                }}
                >
                <a  className="dropdown-toggle mr-3 customdropbutton" data-toggle="dropdown"></a>
                <ul className=" dropdown-menu"
                style={{
                    // marginLeft:"45%"
                }}>
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
            
            ):(   
                <ul className={cx(Bootstrap['navbar-nav'], Bootstrap['ml-auto'])}>
                <li className={Bootstrap['nav-item']}>
                    <Link className={cx(Bootstrap['nav-link'],Bootstrap['mr-3'])}
                     to="/"
                     style={(props.history==='/' || props.history==='/home')?
                     {color:'#987c46'}:null
                     }
                     onClick={loginStatus}
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
                    onClick={loginStatus}
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
                          onClick={loginStatus}
                    >Login</Link>
                </li>
            </ul>
            
            )}
            
    </nav>

)
}

const mapStateToProps = state => {
    return {
      auth: state.auth,
      loginStatus:state.serverStatus.loginCompanyStatus
    };
  };
  
  export default connect(
    mapStateToProps,
    actions
  )(D2BNav);


// export default  D2BNav;