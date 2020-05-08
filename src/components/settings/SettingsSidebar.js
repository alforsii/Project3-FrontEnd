import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Typography from '@material-ui/core/Typography';
import moment from 'moment'

import { AUTH_SERVICE } from '../../services/auth/AuthServices'
import  ProgressBar from '../auth/progressBar/ProgressBar'
import Avatar from '../auth/avatar/Avatar';
import './SettingsSidebar.css'

export default function SettingsSidebar({ user, isUserLoggedIn }) {
    const [imageInput,setImageInput] = useState('')
    const [isLoading,setLoading] = useState(false)
    const [userDetails, setUserDetails] = useState({})

    let arrFromUser = []
    const userProps = [
        'username',
        'firstName' ,
        'lastName',
        'dashboardImg',
        'email',
        'city',
        'state',
        'country',
        'phone',
        'path',
    ]

    for(let key in userDetails){
        arrFromUser.push({ [key]: userDetails[key] })
    }
    const profileStrength = arrFromUser.filter(elem => 
        userProps.includes(Object.keys(elem).toString()) 
        && elem !=='').length*10
    const [progressBar,setProgressBar] = useState(profileStrength)
    useEffect(() => {
        setProgressBar(profileStrength)
        setUserDetails(user)
    }, [user])


    //=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=
//=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=
const handleUploadInput = e => {
    const {files} = e.target
      if(files.length > 0) setImageInput(files[0])
  }
//=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=
//=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=
 const handleUploadSubmit = async e => {
      e.preventDefault()
     if(imageInput){
        setLoading(true)
        const newFile = new FormData()
        newFile.append('image', imageInput,imageInput.name)
      await AUTH_SERVICE.updatePhoto(newFile)
      setImageInput('')
      isUserLoggedIn()
      setLoading(false)
     }
  }
    return (
        <div className="upload-form update-form">
            <div className="user-profile-details">
              <Avatar src={user?.path} alt={user?.firstName} size='xl' variant='circle'/>

              <Typography variant="h5" component="h5">
              {user?.firstName} {user?.lastName}{' '}
              </Typography>
              <Typography display="block" variant="caption" color="textSecondary">
               {user?.city && `${user?.city},`} {user?.state && user?.state} {user?.country && user?.country}
               </Typography>
              
              <Typography gutterBottom variant="body2">
                {user?.title}
              </Typography>
            </div>

          <form onSubmit={handleUploadSubmit} encType="multipart/form-data">
            <div className="progress">
            <Typography display="block" variant="caption" color="textSecondary">
               {profileStrength === 100 ? 'Thanks! Your profile 100% complete.': `Profile Strength ${profileStrength}%`}   
            </Typography>
                    <ProgressBar isLoading={isLoading} strengthValue={profileStrength}/>
            </div>
            <div className='form-submit-container'>
                    <label id='image-label' htmlFor="image">
                        <CloudUploadIcon style={{fontSize: '40px'}} />
                        <input id='image' type="file" name="image" onChange={handleUploadInput}/>
                    </label>
                    <span id='file-name'> <i>{imageInput.name}</i> </span>
                    

                    <Button
                        variant="contained"
                        color="default"
                        type='submit'
                    >
                        Update avatar image
                    </Button>
            </div>
          </form>
          <Typography variant="caption" color="textSecondary">
                 {`Since • ${moment(user?.createdAt).format('LL')}`}
               </Typography>
      </div>

    )
}
