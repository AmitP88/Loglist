import React, { Component } from 'react';

export default class Loglist extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        fetch('https://rawgit.com/AmitP88/a60ab38cb30c150376b548e3e167e2fd/raw/0ba1947a64eb7c6cad2c0dc77b3ff9e52ade1a62/mockData.json')
            .then(response => response.json())
            .then(data => console.log(data))
    }

    render() {
        return (
            <div>
                <p>This is the Loglist component</p>
            </div> 
        )
    }
}