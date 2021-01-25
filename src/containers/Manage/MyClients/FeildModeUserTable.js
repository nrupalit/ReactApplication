import React, { Fragment } from "react";
import styles from "./fieldmode.module.css";
import "./feildmodetable.css";
export default function FieldModeForm(props) {
  let { formval, onEdit } = props;

  return (
    <>
      <table className="feildmodetable" style={{ width: "100%", marginBottom: "40px" }}>
        <thead>
          <tr>
            <td style={{ width: "16.67%" }}>Sr No</td>
            <td style={{ width: "16.67%" }}>First Name</td>
            <td style={{ width: "16.67%" }}>Last Name</td>
            <td style={{ width: "16.67%" }}>Email</td>
            <td style={{ width: "16.67%" }}>Mobile No</td>
            <td style={{ width: "16.67%" }}>Edit</td>
          </tr>
        </thead>
        <tbody>
          {formval && formval.map((formval, index) => {
            if (
              formval.client_mobile !== null &&
              formval.client_mobile !== ""
            ) {
              return (
                <Fragment key={index}>
                  <tr>
                    <td>{index + 1}</td>
                    <td>{formval.client_first_name}</td>
                    <td>{formval.client_last_name}</td>
                    <td>{formval.client_email}</td>
                    <td>{formval.client_mobile}</td>
                    <td
                      style={{
                        width: "100px",
                        height: "40px"
                      }}
                    >
                      <a
                        href=""
                        disabled={formval.is_active === 0 ? true : false}
                        onClick={onEdit(index)}
                        className={
                          formval.is_active === 0
                            ? styles["disabled__link"]
                            : styles["link"]
                        }
                        style={{
                          height: "30px",
                          width: "80px"
                        }}
                      >
                        Edit
                      </a>
                    </td>
                  </tr>
                </Fragment>
              );
            }
          })}
        </tbody>
      </table>
    </>
  );
}
