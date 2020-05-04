import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Container from '@material-ui/core/Container';

import { AUTH_SERVICE } from '../../services/auth/AuthServices'
import  ProgressBar from '../auth/progressBar/ProgressBar'
import Avatar from '../auth/avatar/Avatar';
import './SettingsSidebar.css'

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }));
  

export default function SettingsSidebar({ user, isUserLoggedIn }) {
    const classes = useStyles()
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
    console.log("Output for: SettingsSidebar -> profileStrength", profileStrength)
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
              <h2>
                {user?.firstName} {user?.lastName}{' '}
              </h2>
              <p>{user.city? `${user.city},`: ''} {user.state} {user?.country}</p>
              <p><i>Since {user?.createdAt.split('T')[0]}</i> </p>
            </div>

          <form onSubmit={handleUploadSubmit} encType="multipart/form-data">
            <div className="progress">
                Profile Strength {profileStrength}% 
                    <ProgressBar isLoading={isLoading} strengthValue={profileStrength}/>
            </div>
            <hr/>
            <div className='form-submit-container'>
                    <label id='image-label' htmlFor="image">Upload here
                        <CloudUploadIcon />
                        <input id='image' type="file" name="image" onChange={handleUploadInput}/>
                    </label>
                    <span id='file-name'> <i>{imageInput.name}</i> </span>
                    

                    <Button
                        variant="contained"
                        color="default"
                        type='submit'
                        className={classes.button}
                    >
                        Update image
                    </Button>
            </div>
          </form>
      </div>

    )
}
