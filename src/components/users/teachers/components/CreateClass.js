import React, { Component } from 'react'
import { AUTH_CLASSES } from '../../../../services/classesAuth/ClassesAuth'

export class CreateClass extends Component {
    state = {
        createForm: {
          name: '',
          grade: ''
        }
      }
      //handle change
      handleChange = e => {
        const { name, value} = e.target
        this.setState(prevState => ({
          createForm: {
            ...prevState.createForm,
            [name]: value
          }
        }))
      }
      //handle submit/create new class
      handleSubmit = async e => {
        e.preventDefault()
        const res = await AUTH_CLASSES.createClass(this.state.createForm)
        console.log("Teacher -> res", res)
        this.setState({
          createForm: {
            name: '',
            grade: ''
          }
        })
      }
    render() {
        const { createForm: { name, grade} } = this.state
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor='name'>Name of your class</label>
                    <input onChange={this.handleChange} 
                    id='name' name='name' placeholder='Enter name'
                    value={name}/>
                    <label htmlFor='grade'>Grade</label>
                    <input onChange={this.handleChange} 
                    id='grade' name='grade' placeholder='Enter grade'
                    value={grade}/>
                    <button type='submit'>Create</button>
                  </form>
            </div>
        )
    }
}

export default CreateClass
