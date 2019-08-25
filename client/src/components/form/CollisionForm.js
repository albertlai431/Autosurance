import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// Helper
import SelectList from "../common/SelectList";

// Action func
import { collisioncreate } from "../../actions/FormActions";

class CollisionForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      claim: "",
      class: "",
      size: "",
      url: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const collisionData = {
      claim: this.state.claim,
      class: this.state.class,
      size: this.state.size,
      url: this.state.url
    };

    console.log(collisionData);
    this.props.collisioncreate(collisionData, this.props.history);
  };

  handleClick(e) {
    this.setState({ [e.target.name]: e.target.value });

    this.refs.fileUploader.click();
    console.log(e);
  }

  render() {
    var AWS = require("aws-sdk");

    AWS.config = new AWS.Config();
    AWS.config.accessKeyId = "***REMOVED***";
    AWS.config.secretAccessKey = "***REMOVED***";
    AWS.config.region = "us-east-1";

    // create JSON object for parameters for invoking Lambda function
    var pullParams = {
      FunctionName: "predictImage",
      InvocationType: "RequestResponse",
      LogType: "None",
      Payload: JSON.stringify({ Body: "0001.jpg" })
    };

    // create variable to hold data returned by the Lambda function
    var pullResults;

    var lambda = new AWS.Lambda();

    lambda.invoke(pullParams, function(error, data) {
      if (error) {
        prompt(error);
      } else {
        pullResults = JSON.parse(JSON.stringify(data)).Payload;
        console.log(pullResults);
      }
    });
    console.log(pullResults);

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
          <div className="form-group">
            <label for="formGroupExampleInput">Enter vehicle size</label>
            <SelectList
              name="size"
              placeholder="size"
              value={this.state.size}
              onChange={this.onChange}
              options={sizeOptions}
            />
          </div>

          <button className="btn mt-3">
            <input
              type="file"
              id="file"
              ref="fileUploader"
              name="url"
              value={this.state.url}
              onChange={this.handleClick}
            />
          </button>

          <br />

          <button
            type="submit"
            className="btn mt-3"
            style={{ backgroundColor: "#6c63ff", borderRadius: "20px" }}
          >
            <span className="pl-2 pr-2" style={{ color: "white" }}>
              Get Recommendation!
            </span>
          </button>

          <h4 className="pt-4 font-weight-bold">
            {pullResults === null ? "Still investigating" : pullResults}
          </h4>
        </form>
      </div>
    );
  }
}

CollisionForm.propTypes = {
  collisioncreate: PropTypes.func.isRequired
};

export default connect(
  null,
  { collisioncreate }
)(CollisionForm);
