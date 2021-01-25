import React, { Fragment } from "react";
import styles from "./mymanpower.module.css";
import "./mymanpower.css";
export default function ManpowerGCOTableNew(props) {
  let { formval, onEdit, onDelete } = props;
  return (
    <Fragment>
      <table className="feildmodetable" style={{ width: "100%", marginBottom: "40px" }}>
        <thead>
          <tr>
            <td>Sr No</td>
            <td>Designation</td>
            <td>Unit of Measure</td>
            <td>Cost per unit</td>
            <td>Billing per unit</td>
            <td>Workdays for week</td>
            <td>Off days</td>
            <td>Edit</td>
            <td>Delete</td>
          </tr>
        </thead>
        <tbody>
          {formval && formval.map((formval, index) => {
            if (formval.designation !== null && formval.designation !== "") {
              return (
                <Fragment key={index}>
                  <tr>
                    <td>{index + 1}</td>
                    <td>{formval.designation}</td>
                    <td>{formval.uom}</td>
                    <td>{formval.cost}</td>
                    <td>{formval.billing}</td>
                    <td>{formval.workdays}</td>
                    <td>{formval.offdays}</td>
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
                    <td
                      style={{
                        width: "100px",
                        height: "40px"
                      }}
                    >
                      <a
                        href=""
                        disabled={formval.is_active === 0 ? true : false}
                        onClick={onDelete(index)}
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
                        Delete
                      </a>
                    </td>
                  </tr>
                </Fragment>
              );
            }
            else {
              return null
            }
          })}
        </tbody>
      </table>
    </Fragment>
  );
}
