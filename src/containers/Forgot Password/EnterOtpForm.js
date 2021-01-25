import React from "react";

import InputError from "Layout/InputError/InputError";
const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    otp: Yup.string()
      // .typeError("Pincode Must Be Number")
      .nullable()
      .test("mobilelen", "Otp Should be 4 digits", function(val) {
        let re = /^[0-9]{4,4}$/;
        if (re.test(val)) {
          return true;
        } else {
          return false;
        }
      }),
    pwd: Yup.string()
      .min(6, "Password has to be longer than 6 characters!")
      .test(
        "passwordalphanum",
        "Password must be AlphaNumeric Only and contain each one",
        function(val) {
          let re = /^(?:[0-9]+[a-z]|[a-z]+[0-9])[a-z0-9]*$/i;
          if (re.test(val)) {
            return true;
          } else {
            return false;
          }
        }
      )
      .required("Password is required"),
    cpwd: Yup.string()
      .min(6, "Password has to be longer than 6 characters!")
      .oneOf([Yup.ref("pwd"), null], "Passwords must match")
      .required("Confirm Password is required")
  }),

  mapPropsToValues: ({ formdata }) => ({
    ...formdata
  }),
  handleSubmit: (values, { props }) => {
    props.validateOtp(values);
  },

  displayName: "MyForm"
});

function EnterOtpForm() {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit
  } = props;

  const resendOtp = () => {
    props.resendOtp(values);
  };

  return (
    <>
      <div className="container col-md-4 reset-password-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <h1 className="">Reset Password!</h1>
          </div>
          <div className="row">
            <h4>Enter Otp Provided with email and password</h4>
          </div>
          <div className="row">
            <label
              style={{
                fontSize: "17px",
                color: "#787993"
              }}
            >
              Otp
            </label>
            <input
              type="text"
              placeholder="OTP"
              name="otp"
              className="form-control"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.otp}
            />
            <InputError
              errorMsg={errors.otp}
              value={touched.otp && errors.otp ? "e" : null}
            />
          </div>
          <div className="row">
            <label
              style={{
                fontSize: "17px",
                color: "#787993"
              }}
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              name="pwd"
              className="form-control"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            <InputError
              errorMsg={errors.pwd}
              value={touched.pwd && errors.pwd ? "e" : null}
            />
          </div>
          <div className="row">
            <input
              type="password"
              placeholder={"Confirm Password"}
              name="cpwd"
              className="form-control"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.cpassword}
            />
            <InputError
              errorMsg={errors.cpwd}
              value={touched.cpwd && errors.cpwd ? "e" : null}
            />
          </div>
          <div className="row align-self-center ">
            <XLargeButton type="submit">
              <center>Submit</center>
            </XLargeButton>
            <XLargeButton className="ml-5 " onClick={resendOtp} type="button">
              Resend Otp
            </XLargeButton>
          </div>
        </form>
      </div>
    </>
  );
}


export default connect(
    null,
    actions
  )(formikEnhancer(EnterOtpForm));