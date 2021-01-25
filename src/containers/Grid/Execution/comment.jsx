import React from "react";

const Comment = props => {
  return (
    <div
      className="head"
      style={{
        width: props.width,
        display: props.display,
        borderLeft: "1px solid white"
      }}
    >
      <div className="sm margin">
        <label className="title-label">Update Comment</label>
      </div>
      <div className="sm">
        <label className="title-label" />
      </div>
    </div>
  );
};
export default Comment;
