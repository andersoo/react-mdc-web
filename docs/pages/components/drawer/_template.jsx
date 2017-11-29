import React, {PropTypes} from 'react'
import ReactDOM from 'react-dom'
import Permanent from './_Permanent'
import Temporary from './_Temporary'
import Persistent from './_Persistent'

class Template extends React.PureComponent {

  static propTypes = {
    children: PropTypes.node,
  }

  componentDidMount() {
    const permanent = document.getElementById("permanent");
    ReactDOM.render(<Permanent/>, permanent);

    const persistent = document.getElementById("persistent");
    ReactDOM.render(<Persistent/>, persistent);

    const temporary = document.getElementById("temporary");
    ReactDOM.render(<Temporary/>, temporary);
  } 

  render () {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}
export default Template;
