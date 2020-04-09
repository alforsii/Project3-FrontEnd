import React, { Component } from 'react'
import MyTable from './MyTable'

export default class Success extends Component {
    toFirstPage = () => {
        const { setState } =this.props
        setState(prevState => ({
            step: prevState.step - 3
        }))
        setState({
            createForm: {
                    name: '',
                    grade: '',
                    image: '',
                    description: ''
             }
        })
    }


    render() {
        const {  classes } = this.props
        return (
            <div>
                <React.Fragment>
                    <h2>All classes list</h2>
                    <MyTable classes={classes}/>
                    {/* <button className='form-btn' onClick = {() => this.toFirstPage()}>Go to first page</button> */}
                </React.Fragment>
            </div>
        )
    }
       
}