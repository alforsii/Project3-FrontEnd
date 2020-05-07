import React from 'react';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import InfoIcon from '@material-ui/icons/Info';
import IconButton from '@material-ui/core/IconButton';

import './ImageForm.css'

export default function ImageForm({
    src,
    handleSubmit,
    handleChange,
    inputForm,
    displayForm
}) {
  return (
    <div>
      <form
        id="main-form"
        className="img-upload-form hide"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
          <button type='button' className="close-form-btn align-right" onClick={() => displayForm('#main-form')}>X</button>
          {/* <img className='cover-image' src={src} alt=''/> */}
          <GridList cellHeight={300} >

              <GridListTile   style={{width: '100%'}}>
                <img style={{ width: '100%'}} src={src} alt={src} />
                <GridListTileBar
                  title={'upload image'}
                  subtitle={<span>by: Ashraf</span>}
                  actionIcon={
                    <IconButton aria-label={`info about`} >
                      <InfoIcon />
                    </IconButton>
                  }
                />
              </GridListTile>
              </GridList> 
          <label>Update your cover image</label>

            <input
              id="image-file"
              className="input input-form"
              onChange={handleChange}
              type="file"
              name="dashboardImg"
              ref={ref => inputForm = ref}
            />
        <button type='submit' onClick={() => displayForm('#main-form')}>Update</button>
      </form>
    </div>
  );
}
