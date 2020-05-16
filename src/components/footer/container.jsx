import React, {
  Component
} from "react";
import PropTypes from "prop-types";

const propTypes = {
  children: PropTypes.node
};

const defaultProps = {};

class Footer extends Component {

  render() {

    return (
      <React.Fragment>
        <div>
          <a href="https://coreui.io" target="_blank" rel="noopener noreferrer">CoreUI</a>
          <span className="ml-1">&copy; 2020 creativeLabs.</span>
        </div>
        <div className="ml-md-auto">
          <span className="mr-1">Powered by</span>
          <a href="https://coreui.io/react" target="_blank" rel="noopener noreferrer">CoreUI for React</a>
        </div>
      </React.Fragment>
    );

  }

}

Footer.propTypes = propTypes;
Footer.defaultProps = defaultProps;

export default Footer;
