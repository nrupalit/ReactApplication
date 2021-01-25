import React from "react";
import cx from "classnames";
import styles from "./button.module.css";
export function LargeButton(props) {
  const { values, onClick, style, classNames } = props;
  return (
    <>
      <button
        onClick={onClick}
        className={cx(styles["xLarge"], ...classNames)}
        style={style}
      >
        {values}
      </button>
    </>
  );
}

export function UploadButton(props) {
  const { values, styles } = props;
  return (
    <>
      <span className={styles["small"]} styles={styles}>
        {props.children}
        {values}
      </span>
    </>
  );
}

export function SidebarButton(props) {
  const { values, styles } = props;
  return (
    <>
      <button className={styles["sidebarButton"]} styles={styles}>
        {props.children}
        {values}
      </button>
    </>
  );
}
