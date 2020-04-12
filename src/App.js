import React from 'react';
import './App.css';
import { withRouter } from 'react-router-dom';
import Routes from './routes';

import Container from "react-bootstrap/Container"

const renderPage = () => {
  return (<Routes />);
}

class App extends React.Component {
  render() {
    const { pathname } = this.props.location;

    return (
      <div className="App">
        <Container>
            {renderPage()}
        </Container>
      </div>
    );
  };
}

export default withRouter(props => <App {...props} />);