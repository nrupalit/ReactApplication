import React from "react";
import { Link } from "react-router-dom";
import "./errorpage.css";

export default function ErrorPage() {
  return (
    <>
      <div id="notfound">
        <div class="notfound">
          <div class="notfound-404">
            <h1>
              4
              <span
                style={{
                  color: "#c7a562"
                }}
              >
                0
              </span>
              4
            </h1>
          </div>
          <p
            style={{
              marginTop: "70px",
              color: "#454f63",
              fontSize: "14px"
            }}
          >
            The page you are looking for might is unavailable or required you to
            login
          </p>
          <Link
            to="/login"
            style={{
              textDecoration: "none",
              appearance: "none",
              marginRight: "30px"

              // marginBottom:"20px"
            }}
          >
            Login
          </Link>
          <Link to="/">home page</Link>
        </div>
      </div>
    </>
  );
}
