import React, { Component } from "react";
import { ChipView } from "Layout/styled component/Button";

class Label extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    hashtags: []
  };
  img = {
    width: "30px",
    height: "25px",
    backgroundColor: "white",
    border: "1px solid white",
    borderRadius: "50%",
    padding: "3px"
    // backgroundColor:"blue",
  };
  label = {
    height: "32px",
    textAlign: "left",
    padding: "3px 18px 3px 8px",
    overflowX: "auto",
    overflowY: "hidden",
    fontSize: "12px",
    width: "30px"
  };

  addHashTags = e => {
    let hashtags = [];
    if (e.key === "Enter") {
      // e.preventDefault();
      hashtags = this.state.hashtags;
      let newhashtags = e.target.value;
      hashtags = hashtags.concat(newhashtags);
      e.target.hashtags = hashtags;
      e.target.index = this.props.index;
      this.props.onPushHastags(e);
      this.setState({
        hashtags: hashtags
      });
      e.target.value = "";
    }

    return null;
  };

  ChipView = () => {
    return this.state.hashtags.map((tags, index) => {
      return (
        <div
          className="col-md-2"
          style={{
            marginBottom: "10px"
          }}
        >
          <ChipView>
            <img
              src={require("./../../../assets/icons/" + ["image.png"])}
              style={this.img}
            />
            {/* <img
              src={require("./../../../assets/icons/" + [this.props.labelobj.image])}
              style={this.img}
            /> */}
            <span style={{ padding: "5px" }}>{tags}</span>

            <i
              class="fas fa-times"
              style={{
                marginLeft: "10px",
                pointerEvents: "all"
              }}
              onClick={this.removeHashTags(index)}
              disabled={this.props.editToggle == true ? true : false}
            />
          </ChipView>
        </div>
      );
    });
  };

  removeHashTags = index => e => {
    let hashtags = this.state.hashtags;
    if (this.props.editToggle !== true) {
      hashtags.splice(index, 1);
      this.setState({
        hashtags: hashtags
      });
    }
  };

  componentWillMount = () => {
    // alert(JSON.stringify(this.props.labelobj.hashtags))
    if (
      this.props.labelobj.hashtags !== null &&
      this.props.labelobj.hashtags !== undefined &&
      Array.isArray(this.props.labelobj.hashtags)
    ) {
      this.setState({
        hashtags: this.props.labelobj.hashtags
      });
    }
  };

  downloadFile = (e, sUrl) => {
    var link = document.createElement("a");
    link.href = sUrl;
    link.setAttribute("target", "_blank");

    if (link.download !== undefined) {
      //Set HTML5 download attribute. This will prevent file from opening if supported.
      var fileName = sUrl.substring(sUrl.lastIndexOf("/") + 1, sUrl.length);
      link.setAttribute("download", fileName);
    }

    //Dispatching click event.
    if (document.createEvent) {
      var e = document.createEvent("MouseEvents");
      e.initEvent("click", true, true);
      link.style.display = "none";
      document.body.appendChild(link);
      link.dispatchEvent(e);
      return true;
    }
    if (sUrl.indexOf("?") === -1) {
      sUrl += "?download";
    }

    window.open(sUrl, "_blank");
    return true;
    //sUrl = "http://localhost:3000/assets/icons/D2B.png";
    /* let fileName = sUrl.substring(sUrl.lastIndexOf("/") + 1, sUrl.length);
    var xhr = new XMLHttpRequest();
    xhr.open("GET", sUrl, true);
    
    xhr.responseType = "blob";
    xhr.onload = function() {
      var urlCreator = window.URL || window.webkitURL;
      var imageUrl = urlCreator.createObjectURL(this.response);
      var tag = document.createElement("a");
      tag.href = imageUrl;
      tag.download = fileName;
      document.body.appendChild(tag);
      tag.click();
      document.body.removeChild(tag);
    };
    xhr.send(); */
  };

  render() {
    var { labelobj, index } = this.props;
    // alert(this.props.onPushHastags)
    // alert(this.props.index)
    // let lw = 12 * labelobj.file_name.length;
    return (
      <div
        className="row"
        style={{
          margin: "10px"
        }}
      >
        <div
          className="col-md-0"
          style={{
            paddingTop: "5px"
          }}
        >
          <span
            style={{
              fontSize: "14px"
            }}
          >
            {labelobj.id}
          </span>
        </div>
        <div className="col-md-5">
          <input
            type="text"
            style={{
              border: "none",
              display: "inline",
              boxShadow: "0 2px 2px 0 rgba(0, 0, 0, 0.048)"
            }}
            className="form-control"
            placeholder="File Information"
            name="file_information"
            onChange={this.props.onChangeLabels(index)}
            value={labelobj.file_information}
            disabled={this.props.editToggle == true ? true : false}
          />
        </div>
        <div className="col-md-2">
          <select
            type="text"
            ref="file_type"
            name="file_type"
            className="form-control"
            style={{
              border: "none",
              display: "inline",
              boxShadow: "0 2px 2px 0 rgba(0, 0, 0, 0.048)"
            }}
            style={{
              fontSize: "15px",
              height: "calc(3rem + 2px)",
              background:
                this.props.editToggle == true
                  ? "rgba(240, 239, 239, 0.822)"
                  : "#fff"
            }}
            onChange={this.props.onChangeLabels(index)}
            disabled={this.props.editToggle == true ? true : false}
          >
            <option
              value="BluePrint"
              selected={labelobj.file_type == "BluePrint" ? true : false}
            >
              Blue Print
            </option>
            <option
              value="BreifSpec"
              selected={labelobj.file_type == "BreifSpec" ? true : false}
            >
              Breif Spec
            </option>
            <option
              value="DesignSample"
              selected={labelobj.file_type == "DesignSample" ? true : false}
            >
              Design Sample
            </option>
            <option
              value="BluePrint"
              selected={labelobj.file_type == "BluePrint" ? true : false}
            >
              Blue Print
            </option>
          </select>
        </div>
        <div
          className="col-md-2"
          style={{
            background: "rgba(21, 101, 192, 0.18)",
            borderRadius: "8px",
            width: "80%",
            paddingTop: "3px"
          }}
        >
          <label>
            <img
              src={require("./../../../assets/icons/" + ["image.png"])}
              style={this.img}
            />
            {/* <img
              src={require("./../../../assets/icons/" + [labelobj.url])}
              style={this.img}
            /> */}
            <span
              style={{ padding: "5px" }}
              onClick={e => this.downloadFile(e, labelobj.url)}
            >
              {labelobj.name}
            </span>
          </label>
        </div>
        <div className="col-md-2">
          <input
            type="text"
            style={{
              border: "none",
              display: "inline",
              boxShadow: "0 2px 2px 0 rgba(0, 0, 0, 0.048)"

              // marginLeft:"-15px"   ,
            }}
            ref="hastags"
            className="form-control"
            placeholder="Enter Hashtags"
            onKeyPress={this.addHashTags}
            disabled={this.props.editToggle == true ? true : false}
            // onChange={this.props.onChangeLabels(index)}
          />
        </div>
        <div
          className="col-md-12"
          style={{
            marginTop: "10px"
          }}
        >
          <div class="row">{this.ChipView()}</div>
        </div>
      </div>
    );
  }
}
export default Label;
