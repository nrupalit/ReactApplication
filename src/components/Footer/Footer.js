import React, {Component } from "react";
import cx from 'classnames';
import {Link} from 'react-router-dom';
import Bootstrap from './../../Bootstrap/bootstrap.module.css'
import styles from'./footer.module.css'
const Footer=(props)=>{
        let footer;
        if (window.innerWidth > 400){
            footer = (
                <div>
                    <ul className={Bootstrap['navbar-nav']}>
                    <li className={Bootstrap['nav-item']}>
                        <Link className={Bootstrap['nav-link']} to="/faq" 
                                            style={( props.history==='/faq')?
                                            {color:'#987c46'}:null
                                            }
                        >FAQs</Link>
                    </li>
                    <li>
                    <a className={Bootstrap['nav-link']} to="#">|</a>
                    </li>
                    <li className={Bootstrap['nav-item']}>
                        <Link className={cx(Bootstrap['nav-link'],Bootstrap['ml-1'])} to="/support"
                                            style={( props.history==='/support')?
                                            {color:'#987c46'}:null
                                            }
                        
                        >Support</Link>
                    </li>
                    <li>
                    <a className={cx(Bootstrap['nav-link'],Bootstrap['ml-1'])} to="#">|</a>
                    </li>
                    <li className={Bootstrap['nav-item']}>
                        <Link className={cx(Bootstrap['nav-link'],Bootstrap['ml-1'])} to="/contactus"
                                            style={( props.history==='/contactus')?
                                            {color:'#987c46'}:null
                                            }
                        
                        >Contact Us</Link>
                    </li>
                    </ul>
                    {/* <ul className={cx(Bootstrap['navbar-nav'],Bootstrap['ml-auto'])}>
                        <li className="nav-item active">
                        <Link className={styles.footer_icon_img} to="https://www.instagram.com" target="_blank" >
                        <img src={ require('../assets/icons/instagram.png') }  className={cx(styles.footer_icon_img ,Bootstrap['ml-3'])} height="40%"   alt="" />
                    </Link>
                        </li>
                        <li className={Bootstrap['nav-item']}>
                        <Link className={styles.footer_icon_img}  to="https://www.twitter.com" target="_blank">
                        <img src={ require('../assets/icons/Twitter.png') }   className={cx(styles.footer_icon_img ,Bootstrap['ml-3'])}  height="40%"   alt="" />
                    </Link>
                        </li>
                        <li>
                        <Link className={styles.footer_icon_img}  to="https://www.facebook.com" target="_blank"> 
                        <img src={ require('../assets/icons/Facebook.png') }   className={cx(styles.footer_icon_img ,Bootstrap['ml-3'])} height="40%"   alt="" />
                    </Link>
                        </li>
                        <li className={Bootstrap['nav-item']}>
                        <Link className={styles.footer_icon_img}  to="https://www.instagram.com"  target="_blank" >
                        <img src={ require('../assets/icons/linkedin.png') }className={cx(styles.footer_icon_img ,Bootstrap['ml-3'],Bootstrap['mr-2'])} height="40%"   alt="" />
                    </Link> 
                        </li>
                    </ul> */}
                </div>
            )
        } else {
            footer = (null);
        }
return(
    // <footer className="footer">
        <nav className={cx(Bootstrap.navbar,Bootstrap['navbar-expand-sm'],Bootstrap['bg-white'],Bootstrap['fixed-bottom'],styles.footer)}>
            { footer }
        </nav>
 
)

}
export default Footer;