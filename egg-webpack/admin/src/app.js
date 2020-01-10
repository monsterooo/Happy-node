import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const Test = styled.div`
  color: gold;
`;

class App extends React.Component {
  handleClick = () => {
    console.log('>>>');
  }
  render() {
    return (
      <div onClick={this.handleClick}>
        app class
        <Test>
          Test styled-components
        </Test>
      </div>
    )
  }
}

const div = document.createElement('div');
document.body.appendChild(div);
ReactDOM.render(<App />, div);

