import React from "react";
import SelectManpower from "../Estimation/SelectManpower";
var rowstyle = {
  width: "440px",
  height: "28px",
  margin: "2px",
  marginLeft: "0",
  display: "inline"
};
var rowstyleplan = {
  width: "440px",
  height: "28px",
  margin: "12px",
  marginRight: "0",
  marginLeft: "10px",
  display: "inline"
};
var input = {
  // border: "1px solid rgb(233, 233, 233)",
  borderRadius: "1px",
  height: "100%",
  marginRight: "2px",
  marginLeft: "5px",
  backgroundColor: "white",
  textAlign: "center",
  color: "rgb(120, 132, 158)"
};
const ManRowExecution = props => {
  let { actions, key, id, rowid, manrow, name, onChange } = props;
  let edit = actions.manedit;
  let border, boxshadow, dborder, dboxshadow;
  if (edit == false) {
    border = "0px solid #e9e9e9";
    boxshadow = "none";
  } else {
    border = "1px solid #e9e9e9";
    boxshadow = "rgba(0, 0, 0, 0.1) 5px 5px 10px";
  }
  dborder = "0px solid #e9e9e9";
  dboxshadow = "none";
  return (
    <React.Fragment>
      <div style={rowstyleplan} className="plan">
        <SelectManpower
          actions={actions}
          key={key}
          id={id}
          rowid={rowid}
          manrow={manrow}
          name={name}
          onChange={onChange}
          type="manpowerplan"
          mode="plan"
          stage="execution"
        />
        <input
          className={id + " persons-responsive"}
          name="persons"
          type="number"
          key={key}
          id={id}
          value={manrow.persons}
          style={{
            ...input,
            width: "64px",
            border: dborder,
            boxShadow: dboxshadow
          }}
          disabled={true}
          min={0}
        />
        <input
          className={id + " mandays-responsive"}
          name="mandays"
          type="text"
          key={key}
          id={id}
          value={manrow.mandays}
          style={{
            ...input,
            width: "64px",
            border: dborder,
            boxShadow: dboxshadow
          }}
          type="number"
          disabled={true}
          min={0}
        />
        <input
          className={id + " cost-responsive"}
          name="cost"
          type="text"
          key={key}
          id={id}
          value={manrow.cost}
          style={{
            ...input,
            width: edit ? "92px" : "92px",
            border: dborder,
            boxShadow: dboxshadow
          }}
          type="number"
          min={0}
          disabled={true}
        />
      </div>
      <div style={rowstyle} className="revised">
        <SelectManpower
          actions={actions}
          key={key}
          id={id}
          rowid={rowid}
          manrow={manrow}
          name={name}
          onChange={onChange}
          type="manpowerplan"
          mode="revised"
          stage="execution"
          isEdit={actions.manedit}
        />
        <input
          className={id}
          name="revised_persons"
          type="number"
          key={key}
          id={id}
          value={manrow.revised_persons}
          style={{
            ...input,
            width: actions.manedit == false ? "62px" : "62px",
            border: border,
            boxShadow: boxshadow,
            marginRight: edit ? "5px" : "0"
          }}
          onChange={e => onChange(e, name, rowid, id)}
          disabled={edit == false ? true : false}
          min={0}
        />
        <input
          className={id}
          name="revised_mandays"
          type="text"
          key={key}
          id={id}
          value={manrow.revised_mandays}
          style={{
            ...input,
            width: actions.manedit == false ? "62px" : "62px",
            border: border,
            boxShadow: boxshadow,
            marginRight: edit ? "5px" : "0"
          }}
          onChange={e => onChange(e, name, rowid, id)}
          type="number"
          disabled={edit == false ? true : false}
          min={0}
        />
        <input
          className={id}
          name="revised_total_cost"
          type="text"
          key={key}
          id={id}
          value={manrow.revised_total_cost}
          style={{
            ...input,
            width: edit ? "92px" : "92px",
            border: border,
            boxShadow: boxshadow,
            marginRight: edit ? "5px" : "0"
          }}
          onChange={e => onChange(e, name, rowid, id)}
          type="number"
          min={0}
          disabled={true}
        />
      </div>
      <div style={rowstyle} className="actual">
        <SelectManpower
          actions={actions}
          key={key}
          id={id}
          rowid={rowid}
          manrow={manrow}
          name={name}
          onChange={onChange}
          type="manpowerplan"
          mode="actual"
          stage="execution"
          isEdit={actions.manedit}
        />
        <input
          className={id}
          name="actual_persons"
          type="number"
          key={key}
          id={id}
          value={manrow.actual_persons}
          style={{
            ...input,
            width: actions.manedit == false ? "62px" : "62px",
            border: border,
            boxShadow: boxshadow,
            marginRight: edit ? "5px" : "0"
          }}
          onChange={e => onChange(e, name, rowid, id)}
          disabled={edit == false ? true : false}
          min={0}
        />
        <input
          className={id}
          name="actual_mandays"
          type="text"
          key={key}
          id={id}
          value={manrow.actual_mandays}
          style={{
            ...input,
            width: actions.manedit == false ? "62px" : "62px",
            border: border,
            boxShadow: boxshadow,
            marginRight: edit ? "5px" : "0"
          }}
          onChange={e => onChange(e, name, rowid, id)}
          type="number"
          disabled={edit == false ? true : false}
          min={0}
        />
        <input
          className={id}
          name="actual_total_cost"
          type="text"
          key={key}
          id={id}
          value={manrow.actual_total_cost}
          style={{
            ...input,
            width: actions.manedit == false ? "92px" : "92px",
            border: border,
            boxShadow: boxshadow,
            marginRight: edit ? "5px" : "0"
          }}
          onChange={e => onChange(e, name, rowid, id)}
          type="number"
          min={0}
          disabled={true}
        />
        <input
          className={id}
          name="update_comment"
          id={id}
          type="text"
          value={manrow.update_comment}
          style={{
            ...input,
            width: actions.manedit == false ? "120px" : "116px",
            border: border,
            boxShadow: boxshadow
          }}
          disabled={edit == false ? true : false}
          onChange={e => onChange(e, name, rowid, id)}
          min={1}
        />
      </div>
    </React.Fragment>
  );
};
export default ManRowExecution;
