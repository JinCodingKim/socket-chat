import React, { Component } from "react";
import io from "socket.io-client";

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      message: "",
      messages: []
    };

    this.sendMessage = this.sendMessage.bind(this);
    this.addMessage = this.addMessage.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // This will mount the io.emit('RECEIVE_MESSAGE', data) and run this.addMessage(data) with the data that came back from the server
  componentDidMount() {
    this.socket = io("localhost:8080");
    this.socket.on("RECEIVE_MESSAGE", data => {
      this.addMessage(data);
    });
  }

  // This will emit('SEND_MESSAGE, with the object of {author, message}) to the server
  sendMessage(val) {
    val.preventDefault();
    this.socket.emit("SEND_MESSAGE", {
      author: this.state.username,
      message: this.state.message
    });
    this.setState({
      message: ""
    });
  }

  // This will set the state of messages with the response of data
  addMessage(data) {
    console.log(data);

    this.setState({
      messages: [...this.state.messages, data]
    });
    console.log(this.state.messages);
  }

  handleChange(name, val) {
    this.setState({
      [name]: val
    });
  }

  render() {
    // This will map over the messages array and render the author : message
    let messagesList = this.state.messages.map(message => {
      return (
        <div>
          {message.author}: {message.message}
        </div>
      );
    });
    return (
      <div className="container">
        <div classname="row">
          <div className="col-4">
            <div className="card">
              <div className="card-body">
                <div className="card-title">Global Chat</div>
                <hr />
                <div className="messages">{messagesList}</div>
              </div>
              <div className="card-footer">
                <input
                  type="text"
                  placeholder="Username"
                  value={this.state.username}
                  onChange={e => this.handleChange("username", e.target.value)}
                  className="form-control"
                />
                <br />
                <input
                  type="text"
                  placeholder="Message"
                  value={this.state.message}
                  onChange={e => this.handleChange("message", e.target.value)}
                  className="form-control"
                />
                <br />
                <button
                  onClick={this.sendMessage}
                  className="btn btn-primary form-control"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Chat;
