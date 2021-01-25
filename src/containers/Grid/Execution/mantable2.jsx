import React from "react";
import CheckBox from "../checkbox";
import ManRowExecution from "./manrow2";
import "../dragula.css";
const ManTableExecution = props => {
  let { manpower, actions, name, manhandlers, id } = props;
  return (
    <React.Fragment>
      {manpower.map(manrow=> (
          <React.Fragment>
            <div
              style={{
                margin: "4px",
                marginLeft: actions.manedit == false ? "4px" : "2px"
              }}
            >
              <ManRowExecution
                key={manrow.manid}
                id={manrow.manid}
                actions={actions}
                name={name}
                rowid={id}
                manrow={manrow}
                onChange={manhandlers.onChange}
              />
            </div>
          </React.Fragment>
        ))
      }
    </React.Fragment>
  );
};
export default ManTableExecution;
