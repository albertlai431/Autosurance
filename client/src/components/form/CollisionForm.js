import PropTypes from "prop-types";
import React, {Component} from "react";
import ImageUploader from "react-images-upload";
import {connect} from "react-redux";

// Action func
import {collisioncreate, imageExport} from "../../actions/FormActions";
// Keys
import keys from "../../config/keys_dev";
// Helper
import SelectList from "../common/SelectList";

class CollisionForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      claim : "",
      class : "",
      size : "",
      url : "",
      formData : [],
      pictures : [],
      severity : ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.onDrop = this.onDrop.bind(this);
  }

  componentDidMount() {
    const data = JSON.parse(sessionStorage.getItem("signup"));
    this.setState({formData : data});
  }

  onChange = e => { this.setState({[e.target.name] : e.target.value}); };

  onDrop(picture) {
    this.setState({pictures : this.state.pictures.concat(picture)});
  }

  onSubmit = e => {
    e.preventDefault();

    const collisionData = {
      claim : this.state.claim,
      class : this.state.class,
      size : this.state.size,
      premium : "8",
      inception : "8",
      policies : "1",
      severity : this.state.severity
    };

    const image = {url : this.state.pictures};

    const result = {};

    Object.keys(this.state.formData)
        .forEach(key => (result[key] = this.state.formData[key]));

    Object.keys(collisionData)
        .forEach(key => (result[key] = collisionData[key]));

    console.log(image);
    console.log(result);

    // console.log(collisionData);
    this.props.imageExport(image);
    this.props.collisioncreate(result, this.props.history);
    /* sessionStorage.setItem(
      "signup"
      //JSON.stringify(JSON.parse(this.state.formData.concat(collisionData)))
    ); */
  };

  handleClick(e) {
    this.setState({[e.target.name] : e.target.value});

    this.refs.fileUploader.click();
    console.log(e);
  }

  render() {
    var AWS = require("aws-sdk");

    AWS.config = new AWS.Config();
    AWS.config.accessKeyId = `${keys.accessKeyId}`;
    AWS.config.secretAccessKey = `${keys.secretAccessKey}`;
    AWS.config.region = "us-east-2";

    // create JSON object for parameters for invoking Lambda function
    var pullParams = {
      FunctionName : "predictImage",
      InvocationType : "RequestResponse",
      LogType : "None",
      Payload : JSON.stringify({Body : "0001.jpg"})
    };

    // create variable to hold data returned by the Lambda function
    var pullResults;

    var lambda = new AWS.Lambda();

    lambda.invoke(pullParams, function(error, data) {
      if (error) {
        prompt(error);
      } else {
        pullResults = JSON.parse(JSON.stringify(data)).Payload;
        // console.log(pullResults);
      }
    });
    console.log(pullResults);

    const claimOptions = [
      {label : "Claim Reason", value : "None"},
      {label : "Collision", value : "0"}, {label : "Scratch/Dent", value : "1"},
      {label : "Hail", value : "2"}, {label : "Other", value : "3"}
    ];

    const classOptions = [
      {label : "Vehicle Class", value : "None"}, {label : "Small", value : "0"},
      {label : "Medium", value : "1"}, {label : "Large", value : "2"}
    ];

    const sizeOptions = [
      {label : "Vehicle Size", value : "None"},
      {label : "Two-Door Car", value : "0"},
      {label : "Four-Door Car", value : "1"}, {label : "SUV", value : "2"},
      {label : "Luxury SUV", value : "3"}, {label : "Sports Car", value : "4"},
      {label : "Luxury Car", value : "5"}
    ];

    const severityOptions = [
      {label : "Choose severity", value : "None"}, {label : "1", value : "1"},
      {label : "2", value : "2"}, {label : "3", value : "3"},
      {label : "4", value : "4"}, {label : "5", value : "5"}
    ];

    console.log(this.state.formData);
    return (
      <div
    className = "container pt-5"
    style =
        {{ paddingBottom: "200px" }} >
        <h3 className = "font-weight-bold text-center">Enter Collision Data<
            /h3>

        <form onSubmit={this.onSubmit} className="pt-3">
          <div class="row">
            <div class="col">
              <label for="formGroupExampleInput">Specify claim reason</label><
        SelectList
    name = "claim"
    placeholder = "claim"
                value={this.state.claim}
                onChange={this.onChange}
                options={
      claimOptions}
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
                name = "severity"
                placeholder = "severity"
                value = {this.state.severity} onChange =
                    {this.onChange} options =
                { severityOptions } />
            </div >
                    </div>

          <ImageUploader
            withIcon={true}
            buttonText="Choose images"
            onChange={this.onDrop}
            imgExtension={[".jpg", ".gif", ".png", ".gif"]}
            maxFileSize={5242880}
          />

                    <br />

                    < button
                type = "submit"
                className = "btn mt-3"
                style =
                    {{ backgroundColor: "#6c63ff", borderRadius: "20px" }} >
                    <span className = "pl-2 pr-2" style = {{ color: "white" }}>
                        Get Recommendation!</span>
          </button>

                    <h4 className = "pt-4 font-weight-bold">{
                        pullResults === null
                            ? "Still investigating"
                            : pullResults}</h4>
        </form><
                    /div>
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
