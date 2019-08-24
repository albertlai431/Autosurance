import React, { Component } from "react";

// Helper
import SelectList from "../common/SelectList";

class CollisionForm extends Component {
  constructor() {
    super();

    this.state = {
      claim: "",
      class: "",
      size: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const collisionData = {
      claim: this.state.claim,
      class: this.state.class,
      size: this.state.size
    };

    console.log(collisionData);
  };

  render() {
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

          <button
            type="submit"
            className="btn mt-3"
            style={{ backgroundColor: "#6c63ff", borderRadius: "20px" }}
          >
            <span className="pl-2 pr-2" style={{ color: "white" }}>
              Get Recommendation!
            </span>
          </button>
        </form>
      </div>
    );
  }
}

export default CollisionForm;
