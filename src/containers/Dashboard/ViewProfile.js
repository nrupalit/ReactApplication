import React from 'react';

import Bootstrap from "Bootstrap/bootstrap.module.css";
import styles from "./viewProfile.module.css";
import cx from "classnames";

export default function RegisterForm(props) {
  const {type,handleSubmit,handleChange,CityChange,formval,emailErrorMsg}=props;
  // const {passwordErrorMsg,uploadLogo,logoName,dataList,selectCity,ToggleCity} = props;
  return (
    <>
      <div className={cx(Bootstrap["ml-5"], Bootstrap["mr-5"])}>
     <div className={cx(Bootstrap["container"], styles["register-wrapper"])}>
          <form onSubmit={handleSubmit}>
            <div
              className={cx(
                Bootstrap["form-group"],
                styles["register-form-headers"]
              )}
            >
              <h1>
                <center className={Bootstrap["mb-4"]}>
                 View Profile
                </center>
              </h1>
              <p className={styles["mystyle"]}>
                <h3>
                  <center className={Bootstrap["mb-3"]}>
                    Primary Details
                    <hr className={styles["register--underline"]} />
                  </center>
                </h3>
              </p>
            </div>

            <div
              className={cx(
                Bootstrap.row,
                Bootstrap["form-group"],
                styles["register-form-div"]
              )}
            >
              <div
                className={cx(
                  Bootstrap["col-md-6"],
                  styles["register-form-col-div"]
                )}
              >
                <label>
                  {" "}
                  Mobile Number
                </label>
                <input
                  class={Bootstrap["form-control"]}
                  type="text"
                  name="mobile"
                  maxLength="10"
                  onChange={handleChange}
                  value={formval.mobile}
                  // placeholder="Your mobile number"
                  required
                   disabled
                  disabled
                  // ref="mobileNo"
                />
              </div>
              <div
                className={cx(
                  Bootstrap["col-md-6"],
                  styles["register-form-col-div"]
                )}
              >
                <label>Email Address</label>
                <input
                  class={Bootstrap["form-control"]}
                  type="email"
                  name="email"
                  value={formval.email}
                  onChange={handleChange}
                  style={
                    (emailErrorMsg==true)?(
                {boxShadow: "0 2px 20px 0 rgba(223, 56, 56, 0.7)"}
                      ):{}
                  }
                  disabled
                  required
                   disabled

                />
                                {(emailErrorMsg==true)?(
                <label style={{
                  color:"red",
                  fontSize:"14px",
                  zIndex:"100000",
                  marginTop:"10px"
                }}>
                  {" "}
                 Email format is needed
               </label>):null}
              </div>
            </div>
            <div
              className={cx(
                Bootstrap.row,
                Bootstrap["form-group"],
                styles["register-form-div"]
              )}
            >
              <div
                className={cx(
                  Bootstrap["col-md-6"],
                  styles["register-form-col-div"]
                )}
              >
                <label>
                  {" "}
                  First Name
                </label>
                <input
                  class={Bootstrap["form-control"]}
                  type="text"
                  name="first_name"
                  onChange={handleChange}
                  value={formval.first_name}
                  disabled
                />
              </div>
              <div
                className={cx(
                  Bootstrap["col-md-6"],
                  styles["register-form-col-div"]
                )}
              >
                <label>
                  {" "}
                  Last Name
                </label>

                <input
                  class={Bootstrap["form-control"]}
                  type="text"
                  name="last_name"
                  onChange={handleChange}
                  value={formval.last_name}
                  required
                   disabled
                />
              </div>
            </div>

            <div
              className={cx(
                Bootstrap.row,
                Bootstrap["form-group"],
                styles["register-form-div"]
              )}
            >
              <div
                className={cx(
                  Bootstrap["col-md-6"],
                  styles["register-form-col-div"]
                )}
              >
                <label>
                  {" "}
                  City
                </label>
                <input
                  class={Bootstrap["form-control"]}
                  type="text"
                  name="city"
                  onChange={CityChange}
                  value={formval.addr.city}
                  required
                   disabled
                  list="cities"
                  disabled
                />
              </div>
              <div
                className={cx(
                  Bootstrap["col-md-6"],
                  styles["register-form-col-div"]
                )}
              >
                <label>
                  State
                </label>

                <input
                  class={Bootstrap["form-control"]}
                  type="text"
                  name="state"
                  onChange={handleChange}
                  value={formval.addr.state}
                  required
                   disabled
                  // placeholder="Your state name"
                  // ref="state"
                  disabled
                />
              </div>
            </div>
            <div
              className={cx(
                Bootstrap.row,
                Bootstrap["form-group"],
                styles["register-form-div"]
              )}
            >
              <div
                className={cx(
                  Bootstrap["col-md-6"],
                  styles["register-form-col-div"]
                )}
              >
                <label>
                  {" "}
                  Pin Code
                </label>
                <input
                  class={Bootstrap["form-control"]}
                  type="number"
                  name="pin"
                  onChange={handleChange}
                  value={formval.addr.pin}
                  required
                   disabled
                />
              </div>
              <div
                className={cx(
                  Bootstrap["col-md-6"],
                  styles["register-form-col-div"]
                )}
              >
                <label>
                  {" "}
                  Locality/Area
                </label>
                <input
                  class={Bootstrap["form-control"]}
                  type="text"
                  name="area"
                  onChange={handleChange}
                  value={formval.addr.area}
                  required
                   disabled
                />
              </div>
            </div>
            <div
              className={cx(
                Bootstrap.row,
                Bootstrap["form-group"],
                styles["register-form-div"]
              )}
            >
              <div
                className={cx(
                  Bootstrap["col-md-12"],
                  styles["register-form-col-div"]
                )}
              >
                <label> Address</label>
                {/* onChange={this.onChange.bind(this)} */}
                <input
                  class={Bootstrap["form-control"]}
                  type="text"
                  name="addr"
                  onChange={handleChange}
                  required
                   disabled
                   value={formval.addr.addr}
                  // placeholder="Permenant Address"
                  // ref="address"

                />
                {/* {this.state.address} */}
              </div>
            </div>
            <div
              className={cx(
                Bootstrap.row,
                Bootstrap["form-group"],
                styles["register-form-div"]
              )}
            >
            </div>
            {(type=="company")?(   
            <div
              className={cx(
                Bootstrap["form-group"],
                styles["register-form-headers"]
              )}
            >
              <p className={styles["mystyle"]}>
                <h3>
                  <center className={Bootstrap["mb-3"]}>
                    Company Details
                    <hr className={styles["register--underline"]} />
                  </center>
                </h3>
              </p>
            </div> ):null}
            {(type=="company")?(   
            <div
              className={cx(
                Bootstrap.row,
                Bootstrap["form-group"],
                styles["register-form-div"]
              )}
            >
         
              <div className={cx(Bootstrap["col-md-6"])}>
                <label>
                  {" "}
                  Company Name 
                </label>

                <input
                  class={Bootstrap["form-control"]}
                  type="text"
                  name="comp_name"
                  value={formval.comp_name}
                  onChange={handleChange}
                  disabled
                  // placeholder="Your company name"
                  // ref="comp_name"
                />
              </div>
              <div className={cx(Bootstrap["col-md-6"])}>
                <label>
                  {" "}
                  Company Brand 
                </label>

                <input
                  class={Bootstrap["form-control"]}
                  type="text"
                  name="comp_brand"
                  value={formval.comp_brand}
                  onChange={handleChange}
                  disabled
                  // placeholder="Your brand name"
                  // ref="comp_brand"
                />
              </div>
              
              {/* sd */}
             </div>
           ):null}
           <div
              className={cx(
                Bootstrap["form-group"],
                styles["register-form-headers"],
                Bootstrap["mt-3"],
                Bootstrap["mb-5"]
              )}
            >
            </div>
            <div
              className={cx(
                Bootstrap["form-group"],
                styles["register-form-headers"],
                Bootstrap["mb-5"]
              )}
            >
               <center>
                {/* <button type="normal" className={styles["register-main-edit-btn"]}>
                  Edit
                  <img
                    src={require("../../assets/icons/edit.svg")}
                    height="16px"
                    width="20px"
                    className={styles["button__icons"]}
                  />
                </button>
                <button className={styles["register-main-edit-btn"]}>
                  Save
                  <img
                    src={require("../../assets/icons/save.svg")}
                    height="16px"
                    width="20px"
                    className={styles["button__icons"]}
                  />
                </button> */}
                {/* <button className={styles["register-main-edit-btn"]}>
                  Next
                  <img
                    src={require("../../assets/icons/arrownext.svg")}
                    height="16px"
                    width="20px"
                    className={styles["button__icons"]}
                  />
                </button> */}
              </center>
            </div>
          </form>
        </div>
         </div>
    </>
  )
}
