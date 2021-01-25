import React from "react";
import Bootstrap from "./../../Bootstrap/bootstrap.module.css";
import styles from "./Support.module.css";
import cx from "classnames";
// import React from "react";
import { withFormik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import * as actions from "actions/action_authentication";

import InputError from 'Layout/InputError/InputError'
const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    category: Yup.string().required("Category is required"),
    description: Yup.string().required("Description is required"),
    attachment: Yup.string().required("Attachment is required")
  }),

  mapPropsToValues: ({ formdata }) => ({
    ...formdata
  }),
  handleSubmit: (values, { props }) => {
    props.login(values);
  },

  displayName: "MyForm"
});

const LoginForm = props => {
  const {
    values,
    touched,
    errors,
    dirty,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
    isSubmitting,
    onSubmit,
    action,
    setFieldValue
  } = props;
  return (
    <>
      
    </>
  );
};

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  actions
)(formikEnhancer(LoginForm));
