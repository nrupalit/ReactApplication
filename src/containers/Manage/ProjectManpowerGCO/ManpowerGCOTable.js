import React from "react";
import "./manpowertable.css";

export default function ManpowerGCOTable(props) {
  let rowIndex = 0;
  let {
    header,
    row,
    edit,
    onCheck2,
    onInputChange,
    index,
    check,
    checkedArray,
    checkedIndex
  } = props;
  // alert(JSON.stringify(index))

  let headerJsx = () => {
    if (index == 0) {
      return header.map(header => {
        return (
          <th
            style={{
              borderRight: "4px solid white"
            }}
          >
            {header}
          </th>
        );
      });
    }
  };
  let rowJsx = () => {
    // alert(JSON.stringify(row))
    let layoutrow = row.map((row, rowIndex) => {
      return (
        // <tr>
        <tr id={`row:${rowIndex}`} key={`row:${rowIndex}`}>
          {/* {edit==true? (<td>
        </td>):null} */}
          {/* {alert(rowIndex)} */}
          <td style={{ display: "none" }} className="checkbox-wrapper">
            <input type="checkbox" onChange={e => onCheck2(e, rowIndex)} />
          </td>
          <td style={{ display: "none" }} id={row._id}>
            {row._id}
          </td>
          <td id={`cell:${rowIndex}`} key={`cell:${rowIndex}`}>
            <input
              type="text"
              value={row.designation}
              className="tablerowinput"
              name="designation"
              style={{ textAlign: "center", border: "none" }}
              onChange={e => onInputChange(e, rowIndex)}
              disabled={
                edit == false || checkedArray.indexOf(rowIndex) == -1
                  ? true
                  : false
              }
            />
          </td>
          <td id={`cell:${rowIndex}`} key={`cell:${rowIndex}`}>
            <select
              name="uom"
              className="tablerowinput"
              style={{
                textAlign: "center",
                border: "none",
                left: "20px",
                position: "relative",
                fontSize: "0.8em"
              }}
              onChange={e => onInputChange(e, rowIndex)}
              disabled={
                edit == false || checkedArray.indexOf(rowIndex) == -1
                  ? true
                  : false
              }
            >
              {row.uom == "hours" && (
                <>
                  <option selected="selected" value="hours">
                    hours
                  </option>
                  <option value="days">days</option>
                  <option value="months">months</option>
                </>
              )}

              {row.uom == "days" && (
                <>
                  <option value="hours">hours</option>
                  <option selected="selected" value="days">
                    days
                  </option>
                  <option value="months">months</option>
                </>
              )}
              {row.uom == "months" && (
                <>
                  <option value="hours">hours</option>
                  <option value="days">days</option>
                  <option selected="selected" value="months">
                    months
                  </option>
                </>
              )}
            </select>
            {/* <input
              type="text"
              value={row.uom}
              className="tablerowinput"
              name="uom"
              style={{ textAlign: "center", border: "none" }}
              onChange={e => onInputChange(e, rowIndex)}
              disabled={
                edit == false || checkedArray.indexOf(rowIndex) == -1
                  ? true
                  : false
              }
            /> */}
          </td>
          <td id={`cell:${rowIndex}`} key={`cell:${rowIndex}`}>
            <input
              type="number"
              value={row.cost}
              className="tablerowinput"
              name="cost"
              style={{ textAlign: "center", border: "none" }}
              onChange={e => onInputChange(e, rowIndex)}
              disabled={
                edit == false || checkedArray.indexOf(rowIndex) == -1
                  ? true
                  : false
              }
            />
          </td>
          <td id={`cell:${rowIndex}`} key={`cell:${rowIndex}`}>
            <input
              type="number"
              value={row.billing}
              className="tablerowinput"
              name="billing"
              style={{ textAlign: "center", border: "none" }}
              onChange={e => onInputChange(e, rowIndex)}
              disabled={
                edit == false || checkedArray.indexOf(rowIndex) == -1
                  ? true
                  : false
              }
            />
          </td>
          <td id={`cell:${rowIndex}`} key={`cell:${rowIndex}`}>
            <input
              type="number"
              maxLength="1"
              max="7"
              value={row.workdays}
              className="tablerowinput"
              name="workdays"
              style={{ textAlign: "center", border: "none" }}
              onChange={e => onInputChange(e, rowIndex)}
              disabled={
                edit == false || checkedArray.indexOf(rowIndex) == -1
                  ? true
                  : false
              }
            />
          </td>
          <td id={`cell:${rowIndex}`} key={`cell:${rowIndex}`}>
            <select
              name="offdays"
              multiple
              className="tablerowinput"
              style={{
                textAlign: "center",
                border: "none",
                left: "20px",
                position: "relative",
                fontSize: "0.8em",
                height: "20px"
              }}
              onChange={e => onInputChange(e, rowIndex)}
              disabled={
                edit == false || checkedArray.indexOf(rowIndex) == -1
                  ? true
                  : false
              }
            >
              <option value="sun">sun</option>
              <option value="mon">mon</option>
              <option value="tue">tue</option>
              <option value="wed">wed</option>
              <option value="thu">thu</option>
              <option value="fri">fri</option>
              <option value="sat">sat</option>
            </select>
            {/*             <input
              type="text"
              value={row.offdays}
              className="tablerowinput"
              name="offdays"
              style={{ textAlign: "center", border: "none" }}
              onChange={e => onInputChange(e, rowIndex)}
              disabled={
                edit == false || checkedArray.indexOf(rowIndex) == -1
                  ? true
                  : false
              }
            /> */}
          </td>
        </tr>
      );
    });
    //  alert(JSON.stringify(layoutrow))
    return layoutrow;
  };
  // )
  return (
    <form className="manpowergco__scrolltable">
      <table className="manpowergco__scrolltable">
        <thead>
          <tr
            className="header"
            style={{
              height: "60px"
            }}
          >
            <th style={{ display: "none" }} className="empty-header" />
            {/* {edit==true? ( */}

            {/* ):null} */}
            {headerJsx()}
          </tr>
        </thead>
        <tbody>
          {rowJsx()}
          {/* </tr> */}
        </tbody>
      </table>
    </form>
  );
}
