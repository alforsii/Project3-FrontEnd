import React, { Component } from 'react'

export class TheClass extends Component {
    render() {
        const { currClass: {name, grade}} = this.props.location.state
        console.log("this.props", this.props)
        return (
            <div>
                <br/>
                <br/>
                <br/>
                <h2>Name: {name} </h2>
                <h2>Description: {grade} </h2>
            </div>
        )
    }
}

export default TheClass
