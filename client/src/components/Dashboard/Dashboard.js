import React, { Component } from "react";

import pfp from "../img/defaultpfp.png";

import { Row, Card, CardText } from "reactstrap";

class Dashboard extends Component {
  render() {
    return (
      <div className="container pt-4">
        <h3 className="font-weight-bold">Dashboard</h3>
        <Row>
          <div className="col-12 mt-3">
            <Card body style={{ border: "none" }}>
              <div className="card-horizontal">
                <div className="img-square-wrapper text-center">
                  <img
                    className="img-fluid"
                    width="50%"
                    height="50%"
                    src={pfp}
                    alt="Card image cap"
                    style={{ borderRadius: "50%" }}
                  />
                </div>
                <div className="card-body">
                  <h4 className="card-title">John Doe</h4>
                  <p className="card-text">
                    Age: 45 <br />
                    Gender: Male <br />
                    Country: Canada <br />
                    Employment: Employed <br />
                    Education: Masters <br />
                    <a
                      href="/dashboard"
                      className="btn mt-4"
                      style={{ backgroundColor: "#6c63ff" }}
                    >
                      <span style={{ color: "white" }}>Edit Profile</span>
                    </a>
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </Row>

        <div style={{ marginBottom: "50px" }}>
          <div style={{ float: "left" }}>
            <h5 className="font-weight-bold pt-3">Past Collision Reports</h5>
          </div>
          <div style={{ float: "right" }}>
            <button className="btn">
              <a href="/collision" style={{ color: "#6c63ff" }}>
                <i className="fas fa-plus"></i>
              </a>
            </button>
          </div>
        </div>

        <div className="card mt-3">
          <div className="card-body">
            <h5 className="font-weight-bold">Motor vehicle accident</h5>
            <p>
              <span className="font-weight-bold">Victims: </span>
              Steve Banks, Joe Mans <br />
              <span className="font-weight-bold">Description: </span>
              JOe is following a slow-moving vehicle down a country road. When
              he has an opportunity to safely pass the vehicle, Sam changes
              lanes to pass on the left-hand side of the road. As Sam
              approaches, the other vehicle suddenly swerves left into the
              oncome land, right in front of Sam, and he slams into the rear of
              the car. The elderly couple in the other car have suffered minor
              injuries, and Sam is worried that he will be liable, as he
              rear-ended the other car. <br />
            </p>
            <p className="text-muted">
              <span className="font-weight-bold">Date filed: </span> July 22,
              2019
            </p>
          </div>
        </div>

        <div className="card mt-3">
          <div className="card-body">
            <h5 className="font-weight-bold">Traffic collision</h5>
            <p>
              <span className="font-weight-bold">Victims: </span>
              Bob Rosh, Sam Gamy <br />
              <span className="font-weight-bold">Description: </span>
              Police investigating the accident, however, determine that the
              elderly driver swerved to miss a pothole, changing lanes suddenly
              and without warning. This is considered to be an unsafe lane
              change, and is illegal. Therefore, the elderly driver is
              determined to be at fault for the accident. <br />
            </p>
            <p className="text-muted">
              <span className="font-weight-bold">Date filed: </span> July 20,
              2019
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
