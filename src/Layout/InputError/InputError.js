import React from "react";

export default function InputError(props) {
  const { errorMsg, value } = props;
  // alert(value)
  if (value !== null) {
    return (
      <>
        <label
          style={{
            color: "red",
            fontSize: "14px",
            zIndex: "100000",
            marginTop: props.margin != null ? props.margin : "10px"
          }}
        >
          {" "}
          {errorMsg}
        </label>
      </>
    );
  } else {
    return <></>;
  }
}
