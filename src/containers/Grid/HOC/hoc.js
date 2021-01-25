import React from "react";
const manpower = {
  task: "423px",
  rightbar: "722.5px",
  lginput: "365px",
  smi1margin: "-6px",
  smi2margin: "8px",
  col: "col-3",
  design: "1259px"
};
const schedule = {
  task: "470px",
  rightbar: "935px",
  lginput: "380px",
  smi1margin: "100px",
  smi2margin: "5px",
  col: "col-3",
  design: "884px"
};
const emanpower = {
  task: "300px",
  rightbar: "722.5px",
  lginput: "280px",
  smi1margin: "-6px",
  smi2margin: "8px",
  col: "col-3",
  design: "2890px",
  designbar: "1855px"
};
const emanpowerschedule = {
  task: "403px",
  rightbar: "722.5px",
  lginput: "365px",
  smi1margin: "-6px",
  smi2margin: "8px",
  col: "col-3",
  design: "1700px"
};
const eschedule = {
  task: "390px",
  rightbar: "935px",
  lginput: "380px",
  smi1margin: "0px",
  smi2margin: "5px",
  col: "col-3",
  design: "1470px"
};

const hoc = WrappedComponent => {
  class HOC extends React.Component {
    getStyles = props => {
      if (props.schedule) {
        return { ...props, styles: schedule, mode: "schedule" };
      } else if (props.manpower) {
        return { ...props, styles: manpower, mode: "manpower" };
      } else if (props.eschedule) {
        return { ...props, styles: eschedule, mode: "schedule" };
      } else if (props.emanpower) {
        return { ...props, styles: emanpower, mode: "manpower" };
      } else if (props.withschedule) {
        return { ...props, styles: emanpowerschedule, mode: "manschedule" };
      }
    };
    render() {
      const newprops = this.getStyles(this.props);

      return <WrappedComponent newprops={newprops} />;
    }
  }
  return HOC;
};

export default hoc;
