import React, { Component } from "react";
import cx from 'classnames'
import Bootstrap from './../../Bootstrap/bootstrap.module.css'
import Navbar from "../NavBar/Navbar";
import Footer from "../Footer/Footer";
import styles from "./Home.module.css";

//XLargeButton
import { XLargeButton } from 'Layout/styled component/Button';
export default class Register extends Component {
  render() {
    return (
      <div className={cx(Bootstrap['container-fluid'], styles['home__block'])}>
        <Navbar history={this.props.history.location.pathname} />
        <div className={Bootstrap.row}>
          <div className={Bootstrap.col}>
            <img
              src={require("../../assets/icons/D2B.png")}
              className={styles.home_main_img}
              height="300px"
            />
          </div>
          <div className={Bootstrap.w-100}></div>
          <div className={styles.home_main}>
            <div className={Bootstrap.row}>
              <div className={cx(Bootstrap['col-md-4'], Bootstrap['col-lg-4'], Bootstrap['col-sm-12'], styles.home_main_card)}>
                <div className={Bootstrap.row}>
                  <h3 className={styles.home_heading}>About Us</h3>
                </div>
                <hr className={styles['home__main--underline']} />
                <div className={Bootstrap.row}>
                  <p className={styles.home_paragraph}>
                    {" "}
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                    quis nostrud exercitation ullamco
                  </p>
                </div>
                <div className={Bootstrap.row}>
                  <XLargeButton className={styles.home_button_coffee_color}>
                    Read More
                  </XLargeButton>
                </div>
              </div>
              <div className={cx(Bootstrap['col-md-4'], Bootstrap['col-lg-4'], Bootstrap['col-sm-12'], styles.home_main_card)}>
                <div className={Bootstrap.row}>
                  <h3 className={styles.home_heading}>Projects</h3>
                </div>
                <hr className={styles['home__main--underline']} />
                <div className={Bootstrap.row}>
                  <p className={styles.home_paragraph}>
                    {" "}
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                    quis nostrud exercitation ullamco
                  </p>
                </div>
                <div className={Bootstrap.row}>
                  <XLargeButton className={styles.home_button_coffee_color}>Read More</XLargeButton>
                </div>
              </div>

              <div className={cx(Bootstrap['col-md-4'], Bootstrap['col-lg-4'], Bootstrap['col-sm-12'], styles.home_main_card)}>
                <div className={Bootstrap.row}>
                  <h3 className={styles.home_heading}>Resources</h3>
                </div>
                <hr className={styles['home__main--underline']} />
                <div className={Bootstrap.row}>
                  <p className={styles.home_paragraph}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                      incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                      quis nostrud exercitation ullamco
                  </p>
                </div>
                <div className={Bootstrap.row}>
                  <XLargeButton className={styles.home_button_coffee_color}>Read More</XLargeButton>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.home__footer}>
          <Footer history={this.props.history.location.pathname} />
        </div>
      </div>
    );
  }
}
