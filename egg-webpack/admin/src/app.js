import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import io from 'socket.io-client';

const Test = styled.div`
  color: gold;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: ''
    };
  }
  handleChange = e => {
    this.setState({ msg: e.target.value });
  }
  handleSendMessage = () => {
    const { msg } = this.state;

    window.socket.emit('msg', msg);
  }
  handleExecute = () => {
    window.socket.emit('execute', 'console.log("monsterooo")');
  }

  render() {
    return (
      <div>
        app class
        <Test>
          Test styled-components
          <input onChange={this.handleChange} />
          <button onClick={this.handleSendMessage}>Send Message</button>
          <button onClick={this.handleExecute}>Execute</button>
        </Test>
      </div>
    )
  }
}

const div = document.createElement('div');
document.body.appendChild(div);
ReactDOM.render(<App />, div);


const log = console.log;
window.onload = function() {
  const search = location.search.slice(1).split('=');
  // init
  const socket = io('http://127.0.0.1:7001/', {
    query: {
      room: search[1],
    }
  });

  socket.on('connect', () => {
    const id = socket.id;

    log('#connect,', id, socket);

    // 监听自身 id 以实现 p2p 通讯
    socket.on(id, msg => {
      log('#receive,', msg);
    });
  });

  // 接收在线用户信息
  socket.on('online', msg => {
    log('#online,', msg);
  });

  // 系统事件
  socket.on('disconnect', msg => {
    log('#disconnect', msg);
  });

  socket.on('disconnecting', () => {
    log('#disconnecting');
  });

  socket.on('error', () => {
    log('#error');
  });

  window.socket = socket;
};