import React from "react";
import CheckBox from "../checkbox";
import ManRow from "./manrow";

const ManTable = props => {
  let { manpower, actions, name, manhandlers, id } = props;
  return (
    <React.Fragment>
      {manpower.map((manrow, index) => (
        <div key={`item-${index}`}>
          <div
            style={{
              float: "left",
              display: actions.manedit ? "block" : "none",
              height: "30px",
              width: "90px",
              // marginLeft: "-10px"
            }}
          >
            <div
              style={{
                float: "left",
                width: "50%",
                textAlign: "center"
              }}
            >
              <span style={{ paddingTop: "10px" }} className="fa fa-arrows-v" />
            </div>
            <div style={{ width: "50%", textAlign: "left" }}>
              <CheckBox
                key={manrow.manid}
                id={manrow.manid}
                actions={actions}
                name={name}
                rowid={id}
                manCheck={manhandlers.onCheck}
              />
            </div>
          </div>
          <div
            style={{
              margin: "4px",
              marginLeft: actions.manedit == false ? "4px" : "90px"
            }}
          >
            <ManRow
              toggle={props.toggle}
              key={manrow.manid}
              id={manrow.manid}
              actions={actions}
              name={name}
              rowid={id}
              manrow={manrow}
              onChange={manhandlers.onChange}
            />
          </div>
        </div>
      ))}
    </React.Fragment>
  );
};
export default ManTable;
