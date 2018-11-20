import React, { Component } from 'react';
import Rooms from "./Rooms";
import MessageRoom from "./MessageRoom";
import Login from "./Login";

class App extends Component {

  state = {
    authenticated: false,
    room: 1,
    selected: false
  };

  login = () => {
    this.setState({
        authenticated: true,
    })
  };

  chooseRoom = (id) => {
    console.log(id);
      this.setState({
        room: id,
        selected: true,
    })
  };

  render() {
    const {authenticated, room, selected} = this.state;
    return (
      <div className={"container"}>
          <div className={"login"}>{!authenticated && <Login onLogin={this.login}/>}</div>

          {authenticated && <div className={"roomsContainer"}>
              <Rooms selected={room} chooseRoom={this.chooseRoom}/>
          </div>}

          {authenticated && <div className={"messageContainer"}>
              <div className={"messageCanvas"}>
                  <MessageRoom id={room} enabled={selected}/>
              </div>
          </div>}

      </div>
    );
  }
}

export default App;
