import React, { Component } from 'react';
import ReactJson from 'react-json-view';
import TimeAgo from 'react-timeago';
import socket, { subscribe } from './socket'

export default class Loglist extends Component {
    state = {
        logs: []
    }

    componentWillMount() {
        // TODO: Get previously stored logs.
        subscribe('amit-patel', 'my-collection', (message) => {
            
        })

    }

    componentWillMount() {
        fetch('https://rawgit.com/AmitP88/a60ab38cb30c150376b548e3e167e2fd/raw/0ba1947a64eb7c6cad2c0dc77b3ff9e52ade1a62/mockData.json')
            .then(response => response.json())
            .then(data => {
                let list = [];
                for(let i = 0; i < data.mockData.length; i++){
                    list.push(
                        <div className="log" key={i}>
                            <TimeAgo date={Date()} />
                            <ReactJson theme={"greenscreen"} key={i} src={data.mockData[i]} />                        
                        </div>
                    );
                }
                this.setState({Logs: list});
            });
    }

    render() {
        return (
            <div className="Loglist">
                {this.state.Logs}
            </div> 
        )
    }
}