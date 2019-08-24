import React, { Component } from "react";
import {
  Container,
  Jumbotron,
  Row,
  Col,
  Card,
  Button,
  CardTitle,
  CardText
} from "reactstrap";

// Img
import Car from "../img/car.svg";
import Money from "../img/money.png";
import Time from "../img/time.png";
import AI from "../img/ai.png";
import Timeline from "../img/timeline.png";
import LandingImg from "../img/landing.png";

class Landing extends Component {
  render() {
    return (
      <div>
        <Jumbotron
          className="jumboSize"
          fluid
          style={{ backgroundColor: "#6c63ff", marginBottom: 0 }}
        >
          <Container fluid style={{ margin: "auto" }}>
            <div className="pl-5 pt-5">
              <h1 className="display-3 text-white">Autosurance</h1>
              <p className="lead text-white">
                A faster and unbaised solution to filing insurance claims.
              </p>
              <a
                href="/form"
                className="btn"
                style={{ backgroundColor: "white" }}
              >
                <span style={{ color: "#6c63ff" }}>Get Started</span>
              </a>
            </div>
          </Container>
        </Jumbotron>
        <img
          style={{ marginTop: 0, paddingTop: 0 }}
          src={LandingImg}
          className="img-fluid"
        />

        <Container>
          <hr width="75%" />
          <h3 className="text-center">Your Problem</h3>
          <Row className="pt-3">
            <Col sm="6">
              <Card body className="text-center" style={{ border: "none" }}>
                <img src={Time} className="img-fluid pb-2" />
                <h4 className="font-weight-bold">Spending too much time?</h4>
                <CardText>
                  Spend less time on accident filing and more time recovering.
                </CardText>
              </Card>
            </Col>
            <Col sm="6">
              <Card body className="text-center" style={{ border: "none" }}>
                <img src={Money} className="img-fluid pb-5" />
                <h4 className="font-weight-bold">
                  Think you are overspending?
                </h4>
                <CardText>
                  Get an unbiased and detailed report on your insurance accident
                  quote.
                </CardText>
              </Card>
            </Col>
          </Row>

          <hr width="75%" />
          <h3 className="text-center pt-4">Our Solution</h3>
          <Row>
            <div class="col-12 mt-3">
              <Card body style={{ border: "none" }}>
                <div class="card-horizontal">
                  <div class="img-square-wrapper text-center">
                    <img
                      class="img-fluid"
                      width="50%"
                      height="50%"
                      src={AI}
                      alt="Card image cap"
                    />
                  </div>
                  <div class="card-body">
                    <h4 class="card-title">Say Hello to Automation</h4>
                    <p class="card-text">
                      Using Artificial Intelligence and Computer Vision we
                      preprocess information for you, so that way you spend less
                      time worrying about insurance.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </Row>

          <div class="row">
            <div class="col-12 mt-3">
              <Card body style={{ border: "none" }}>
                <div class="card-horizontal">
                  <div class="card-body text-right">
                    <h4 class="card-title">From Three to One</h4>
                    <p class="card-text">
                      From Processing claims to Negotiating settlements to
                      verifying insurance coverage, we automate and reduce the
                      wait times for you!
                    </p>
                  </div>
                  <div class="img-square-wrapper text-center">
                    <img
                      class="img-fluid"
                      width="50%"
                      height="50%"
                      src={Timeline}
                      alt="Card image cap"
                    />
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

export default Landing;
