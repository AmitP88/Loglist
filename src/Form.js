import React, { Component } from 'react';

export default class Form extends Component {
    constructor (props) {
        super(props);
        this.state = {
            id: '',
            age: 1,
            dangerous: true,
            name: '',
            title: '',
            type: '',
            uid: '',
            submitted: {
                data: {}
            }
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        // insert state inside "submitted-log" div
        this.setState({
            submitted: {
                id: this.state.id,
                data: {
                    age: this.state.age,
                    dangerous: this.state.dangerous.toString(),
                    name: this.state.name
                },
                title: this.state.title,
                type: this.state.type,
                uid: this.state.uid
            }
        }, () => {
            console.log(this.state.submitted);


            const socket = new WebSocket('wss://rtjson-vysaahrznr.now.sh');

            const storage = {
                uid: '',
            };

            // Connection opened
            const sendMessage = (message) => {
                if (typeof message === 'string') {
                  return socket.send(message);
                }
              
                return socket.send(JSON.stringify(message));
              }

            // What to do when the socket connection is made.

            socket.onopen(() => {
                console.log('Opened connection. Sending "something".');
            });

            // What to do when your app receives a message from the socket server.

            socket.on('message', (data) => {
                console.log('Got a message from the socket server.');
                const message = JSON.parse(data);
            
                if (message.messageType === 'uid') {
                    console.log(`Connected with uid ${message.uid}`);
                    storage.uid = message.uid;
            
                    return sendMessage({
                        uid: storage.uid,
                        subscribeTo: {
                        user: 'amit-patel',
                        name: 'my-collection',
                        },
                    });
                }
            
                if (message.messageType === 'update') {
                    console.log(`Update for ${message.user} / ${message.name}`);
                    console.log(message);
                }
            })



        });

    }


    render() {
        return (
            <div className="form-container">
                <h1>Create a new log</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="question">
                        <label>ID</label>
                        <input type="text" name="id" value={this.state.id} onChange={this.handleChange} />
                    </div>

                    <div className="question">
                        <label> Age</label>
                        <input type="number" min="1" max="150" name="age" value={this.state.age} onChange={this.handleChange} />
                    </div>
                    
                    <div className="question">
                        <label>Dangerous</label>
                        <select name="dangerous" value={this.state.dangerous} onChange={this.handleChange} >
                            <option value="true">true</option>
                            <option value="false">false</option>
                        </select>                    
                    </div>

                    <div className="question">
                        <label>Name</label>
                        <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
                    </div>

                    <div className="question">
                        <label>Title</label>
                        <input type="text" name="title" value={this.state.title} onChange={this.handleChange} />
                    </div>

                    <div className="question">
                        <label>Type</label>
                        <input type="text" name="type" value={this.state.type} onChange={this.handleChange} />
                    </div>
                    
                    <div className="question">
                        <label>UID</label>
                        <input type="text" name="uid" value={this.state.uid} onChange={this.handleChange} />
                    </div>
                    
                    
                    <input className="submit-button" type="submit" value="Submit" />
                </form>

                <div className="submitted-log">
                    <div>ID: {JSON.stringify(this.state.submitted.id)}</div>
                    <div>Age: {this.state.submitted.data.age}</div>
                    <div>Dangerous: {this.state.submitted.data.dangerous}</div>
                    <div>Name: {this.state.submitted.data.name}</div>
                    <div>Title: {JSON.stringify(this.state.submitted.title)}</div>
                    <div>Type: {JSON.stringify(this.state.submitted.type)}</div>
                    <div>UID: {JSON.stringify(this.state.submitted.uid)}</div>
                </div>
            </div>
        );
    }
}