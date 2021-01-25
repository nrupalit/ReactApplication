import React, { Fragment } from "react";
import styles from "./fieldmode.module.css";
import "./feildmodetable.css";
export default function FieldModeForm(props) {
  let { formval, onEdit, onDelete } = props;
  return (
    <>
      <table style={{ width: "100%", marginBottom: "40px" }} className="feildmodetable" >
        <thead>
          <tr>
            <td>Sr No</td>
            <td>First Name</td>
            <td>Last Name</td>
            <td>Email</td>
            <td>Mobile No</td>
            <td>Role</td>
            <td>Status</td>
            <td>Edit</td>
            <td>Delete</td>
          </tr>
        </thead>
        <tbody>
          {formval && formval.map((formval, index) => {
            if (formval.mobile !== null && formval.mobile !== "") {
              return (
                <Fragment key={index}>
                  <tr>
                    <td>{index + 1}</td>
                    <td>{formval.first_name}</td>
                    <td>{formval.last_name}</td>
                    <td>{formval.email}</td>
                    <td>{formval.mobile}</td>
                    <td>
                      {formval.userrole !== null ? formval.userrole.name : ""}
                    </td>
                    <td>{formval.is_active === 0 ? "Inactive" : "Active"}</td>
                    <td
                      style={{
                        width: "100px",
                        height: "40px"
                      }}
                    >
                      <a
                        href=""
                        disabled={formval.is_active === 0 || formval.userrole.name === "admin" ? true : false}
                        onClick={onEdit(index)}
                        className={
                          formval.is_active === 0 || (formval.userrole.name && formval.userrole.name === "admin")
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
                    <td
                      style={{
                        width: "100px",
                        height: "40px"
                      }}
                    >
                      {formval.new != true ? (
                        <a
                          href=""
                          onClick={onDelete(index)}
                          className={
                            formval.is_active === 0 || (formval.userrole.name && formval.userrole.name === "admin")
                              ? styles["disabled__link"]
                              : styles["link"]
                          }
                          disabled={formval.is_active === 0 ? true : false}
                          style={{
                            height: "30px",
                            width: "80px"
                          }}
                        >
                          Delete
                        </a>
                      ) : null}
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
