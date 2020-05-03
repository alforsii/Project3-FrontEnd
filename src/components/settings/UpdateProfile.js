import React, { Component } from 'react';
import { AUTH_SERVICE } from '../../services/auth/AuthServices'
// import moment from 'moment'
import './UpdateProfile.css';

export class UpdateProfile extends Component {
    state = {
        image: '',
        progress: '',
        userForm: {
            username: '',
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            city: '',
            state: '',
            country: '',
        }
    }
//=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=
//=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=
    handleUploadInput = e => {
      const {name, files} = e.target
        this.setState({[name]: files[0] })
    }
//=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=
//=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=
    handleUploadSubmit = async e => {
        e.preventDefault()
        const newFile = new FormData()
        newFile.append('image', this.state.image,this.state.image.name)

        await AUTH_SERVICE.updatePhoto(newFile)
        this.setState({image: ''})
        this.props.context.isUserLoggedIn()
    }
//=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=
//=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=
    handleFormInput = e => {
      const {name, value} = e.target
        this.setState(prevState => ({
          userForm: {
            ...prevState.userForm,
            [name]: value,
          },
        }))
    }
//=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=
//=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=
    handleFormSubmit = async e => {
        e.preventDefault()
        await AUTH_SERVICE.updateProfile(this.state.userForm)

        this.setState(prevState => ({
          ...prevState,
          userForm: {
            username: '',
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            city: '',
            state: '',
            country: '',
          }
        }));

        this.props.context.isUserLoggedIn()
    }
//=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=
//=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=
  render() {
    const { user } = this.props.context.state;
    const { username,firstName, lastName,email,phone,city,state,country } = this.props.context.state.user;
    return (
      <>
      <div className="main-settings">
      <div className="upload-form update-form">
          <div className="">
            <div className="prev-profile">
              <div className="user-profile-details">
                <h2>
                  {' '}
                  {user.firstName} {user.lastName}{' '}
                </h2>
                <hr/>
                <p>Location: {city} {state}, {country}</p>
                <p>Since {user.createdAt.split('T')[0]} </p>
              </div>
              <div>
                <img
                  className="profile-pic"
                  src={user.path}
                  alt={user.username}
                />
              </div>
            </div>
            <form onSubmit={this.handleUploadSubmit} encType="multipart/form-data">
              <div className="progress">
                <div className="progress-bar progress-bar-success">
                  <span>40%</span>
                </div>
              </div>
              <hr/>
              <label id='image-label' htmlFor="image">Upload photo</label>
              <span id='file-name'> <i>{this.state.image.name}</i> </span>
              <input id='image' type="file" name="image" onChange={this.handleUploadInput}/>
              <hr/>
              <button>Update</button>
            </form>
          </div>
        </div>

        <div className="profile-info update-form">
            <h2><i>Profile info</i></h2>
            <hr/>
          <form onSubmit={this.handleFormSubmit} className="user-update-form" autoComplete="off">
              
           <div>
           <div>
              <div className='inputWithIcon'>
                <label htmlFor="firstName">First name*</label>
                <input
                  onChange={this.handleFormInput}
                  id="firstName"
                  type='text'
                  name="firstName"
                  defaultValue={firstName}
                  placeholder="First name*"
                />
                <span className='form-input-icon'><i className='fas fa-user'></i></span>
              </div>
              <div className='inputWithIcon'>
                <label htmlFor="email">Email address*</label>
                <input
                  onChange={this.handleFormInput}
                  id="email"
                  type='email'
                  name="email"
                  defaultValue={email}
                  placeholder="Email Address*"
                />
                <span className='form-input-icon'><i className='fas fa-envelope'></i></span>
              </div>
              <div className='inputWithIcon'>
                <label htmlFor="username">Username</label>
                <input
                  onChange={this.handleFormInput}
                  id="username"
                  type='text'
                  name="username"
                  defaultValue={username}
                  placeholder="Enter username*"
                />
                <span className='form-input-icon'><i className='fas fa-user'></i></span>
              </div>
              <div className='inputWithIcon'>
                <label htmlFor="state">State</label>
                <input
                  onChange={this.handleFormInput}
                  id="state"
                  type='text'
                  name="state"
                  defaultValue={state}
                  placeholder="Enter state"
                />
                <span className='form-input-icon'><i className='fas fa-map-marker-alt'></i></span>
              </div>
            </div>
            <div>
              <div className='inputWithIcon'>
                <label htmlFor="lastName">Last name*</label>
                <input
                  onChange={this.handleFormInput}
                  id="lastName"
                  type='text'
                  name="lastName"
                  defaultValue={lastName}
                  placeholder="Last name*"
                />
                <span className='form-input-icon'><i className='fas fa-user'></i></span>
              </div>
              <div className='inputWithIcon'>
                <label htmlFor="phoneNumber">Phone number</label>
                <input
                  onChange={this.handleFormInput}
                  id="phone"
                  type='text'
                  name="phone"
                  defaultValue={phone}
                  placeholder="Phone number"
                />
                <span className='form-input-icon'><i className='fas fa-phone'></i></span>
              </div>
              <div className='inputWithIcon'>
                <label htmlFor="city">City</label>
                <input
                  onChange={this.handleFormInput}
                  id="city"
                  type='text'
                  name="city"
                  defaultValue={city}
                  placeholder="Enter city"
                />
                <span className='form-input-icon'><i className='fas fa-city'></i></span>
              </div>
              <div className='inputWithIcon'>
                <label htmlFor="country">Country</label>
                <input
                  onChange={this.handleFormInput}
                  id="country"
                  type='text'
                  name="country"
                  defaultValue={country}
                  placeholder="Enter country"
                />
                <span className='form-input-icon'><i className='fas fa-flag'></i></span>
              </div>
            </div>
           </div>
           <hr/>
            <button>Save</button>
          </form>
        </div>

      </div>
        <p className='footer-mark'>&copy; IronSchool App 2020 - final project at Ironhack by A.Kurbonaliev [web-dev oct 2019]!</p>
      </>
    );
  }
}
export default UpdateProfile;
