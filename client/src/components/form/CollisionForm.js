import PropTypes from "prop-types";
import React, { Component } from "react";
import ImageUploader from "react-images-upload";
import { connect } from "react-redux";

// Action func
import { collisioncreate, imageExport } from "../../actions/FormActions";
// Keys
import keys from "../../config/keys_dev";
// Helper
import SelectList from "../common/SelectList";

// let pic;
let pr, pr1;

class CollisionForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      claim: "",
      class: "",
      size: "",
      url: "",
      formData: [],
      pictures: [],
      severity: "",
      fileName: "",
      ppr: "",
      ppr1: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.fileChange = this.fileChange.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  componentDidMount() {
    const data = JSON.parse(sessionStorage.getItem("signup"));
    this.setState({ formData: data });
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  fileChange = e => {
    switch (e.target.name) {
      case "selectedFile":
        if (e.target.files.length > 0) {
          this.setState({ fileName: e.target.files[0].name });
        }
        break;
      default:
        this.setState({ [e.target.name]: e.target.value });
    }
  };

  onDrop(picture) {
    this.setState({ pictures: this.state.pictures.concat(picture) });
  }

  onSubmit = e => {
    e.preventDefault();

    const collisionData = {
      claim: this.state.claim,
      class: this.state.class,
      size: this.state.size,
      premium: "8",
      inception: "8",
      policies: "1",
      severity: this.state.severity
    };

    const image = { url: this.state.pictures };

    // pic = image.url.File.name;

    const result = {};

    Object.keys(this.state.formData).forEach(
      key => (result[key] = this.state.formData[key])
    );

    Object.keys(collisionData).forEach(
      key => (result[key] = collisionData[key])
    );

    console.log(image);
    console.log(result);

    var AWS = require("aws-sdk");

    AWS.config = new AWS.Config();
    AWS.config.accessKeyId = `${keys.accessKeyId}`;
    AWS.config.secretAccessKey = `${keys.secretAccessKey}`;
    AWS.config.region = "us-east-2";

    // create JSON object for parameters for invoking Lambda function
    var pullParams = {
      FunctionName: "predictImage",
      InvocationType: "RequestResponse",
      LogType: "None",
      Payload: JSON.stringify({ Body: "jpg.jpg" })
    };

    var pullParams1 = {
      FunctionName: "predictCost",
      InvocationType: "RequestResponse",
      LogType: "None",
      Payload: JSON.stringify({ Body: "json.json" })
    };

    // create variable to hold data returned by the Lambda function
    var pullResults, pullResults1;

    var lambda = new AWS.Lambda();

    lambda.invoke(pullParams, (error, data) => {
      if (error) {
        prompt(error);
      } else {
        pullResults = JSON.parse(JSON.stringify(data)).Payload;
        console.log(pullResults);
        pr = pullResults;
        //console.log(pr);
        this.setState({ ppr: pr });
      }
    });

    var lambda1 = new AWS.Lambda();

    lambda1.invoke(pullParams1, (error, data) => {
      if (error) {
        prompt(error);
      } else {
        pullResults1 = JSON.parse(JSON.stringify(data)).Payload;
        // console.log(pullResults);
        pr1 = pullResults1;
        this.setState({ ppr1: pr1 });
      }
    });

    console.log(pr + " " + pr1);
    // console.log(collisionData);
    const fname = { filename: this.state.fileName };
    this.props.imageExport(fname);
    this.props.collisioncreate(result, this.props.history);
    /* sessionStorage.setItem(
      "signup"
      //JSON.stringify(JSON.parse(this.state.formData.concat(collisionData)))
    ); */
  };

  handleClick(e) {
    this.setState({ [e.target.name]: e.target.value });

    this.refs.fileUploader.click();
    console.log(e);
  }

  render() {
    console.log(this.state.ppr);
    const claimOptions = [
      { label: "Claim Reason", value: "None" },
      { label: "Collision", value: "0" },
      { label: "Scratch/Dent", value: "1" },
      { label: "Hail", value: "2" },
      { label: "Other", value: "3" }
    ];

    const classOptions = [
      { label: "Vehicle Class", value: "None" },
      { label: "Small", value: "0" },
      { label: "Medium", value: "1" },
      { label: "Large", value: "2" }
    ];

    const sizeOptions = [
      { label: "Vehicle Size", value: "None" },
      { label: "Two-Door Car", value: "0" },
      { label: "Four-Door Car", value: "1" },
      { label: "SUV", value: "2" },
      { label: "Luxury SUV", value: "3" },
      { label: "Sports Car", value: "4" },
      { label: "Luxury Car", value: "5" }
    ];

    const severityOptions = [
      { label: "Choose severity", value: "None" },
      { label: "1", value: "1" },
      { label: "2", value: "2" },
      { label: "3", value: "3" },
      { label: "4", value: "4" },
      { label: "5", value: "5" }
    ];

    const { fileName } = this.state;
    let file = null;

    file = fileName ? (
      <span>File Selected -{fileName}</span>
    ) : (
      <span>Choose a file...</span>
    );

    console.log(this.state.formData);
    return (
      <div className="container pt-5" style={{ paddingBottom: "200px" }}>
        <h3 className="font-weight-bold text-center">Enter Collision Data</h3>

        <form onSubmit={this.onSubmit} className="pt-3">
          <div class="row">
            <div class="col">
              <label for="formGroupExampleInput">Specify claim reason</label>
              <SelectList
                name="claim"
                placeholder="claim"
                value={this.state.claim}
                onChange={this.onChange}
                options={claimOptions}
              />
            </div>
            <div class="col">
              <label for="formGroupExampleInput">Enter vehicle class</label>
              <SelectList
                name="class"
                placeholder="class"
                value={this.state.class}
                onChange={this.onChange}
                options={classOptions}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label for="formGroupExampleInput">Enter vehicle size</label>
              <SelectList
                name="size"
                placeholder="size"
                value={this.state.size}
                onChange={this.onChange}
                options={sizeOptions}
              />
            </div>
            <div className="col">
              <label for="formGroupExampleInput">Enter severity</label>
              <SelectList
                name="severity"
                placeholder="severity"
                value={this.state.severity}
                onChange={this.onChange}
                options={severityOptions}
              />
            </div>
          </div>

          <div>
            <input
              id="file"
              type="file"
              name="selectedFile"
              onChange={event => this.fileChange(event)}
            />
            <label htmlFor="file">{file}</label>
          </div>

          <br />

          <button
            type="submit"
            className="btn mt-3"
            style={{ backgroundColor: "#6c63ff", borderRadius: "20px" }}
          >
            <span
              className="pl-2 pr-2"
              style={{
                color: "white"
              }}
            >
              Get Recommendation!
            </span>
          </button>

          <h4 className="pt-4 font-weight-bold">
            {pr === null || "undefined" ? "Still investigating..." : pr}
            {this.state.ppr}
          </h4>

          <h4 className="pt-3 font-weight-bold">
            {pr1 === null || "undefined" ? "Still calculating..." : "$" + pr1}
            {this.state.ppr1}
          </h4>
        </form>
      </div>
    );
  }
}

CollisionForm.propTypes = {
  collisioncreate: PropTypes.func.isRequired,
  imageExport: PropTypes.func.isRequired
};

export default connect(
  null,
  { collisioncreate, imageExport }
)(CollisionForm);
