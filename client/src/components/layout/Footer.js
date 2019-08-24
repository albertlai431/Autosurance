import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <footer class="text-muted pb-4">
        <div class="container">
          <hr />
          <p className="pt-3">
            Autosurance. Empowering customers one claim at a time.
          </p>
          <p>
            &copy;{" "}
            {new Date().getFullYear() === 2019
              ? new Date().getFullYear()
              : "2019 - " + new Date().getFullYear()}
          </p>
        </div>
      </footer>
    );
  }
}

export default Footer;
