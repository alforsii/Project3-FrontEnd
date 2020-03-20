import React, { Component } from 'react'
import MyTable from './MyTable'

export default class Success extends Component {
    toFirstPage = () => {
        const { setState } =this.props
        setState(prevState => ({
            step: prevState.step - 3
        }))
        setState({
            user: [{ id:'', firstName: '', lastName: '', email: '', occupation: '', city: '', bio:''}]
        })
    }


    render() {
        const {  users } = this.props
        return (
            <div>
                <React.Fragment>
                    <h2>Successfully updated</h2>
                    <MyTable users={users}/>
                    <button className='form-btn' onClick = {() => this.toFirstPage()}>Go to first page</button>
                </React.Fragment>
            </div>
        )
    }
       
}