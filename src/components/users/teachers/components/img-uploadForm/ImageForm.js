import React from 'react';
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
        className="form-control hide"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
          <button type='button' className="close-form-btn align-right" onClick={displayForm}>X</button>
          <img className='cover-image' src={src} alt=''/>
          <label>Update your cover image</label>

            <input
              id="image-file"
              className="input input-form"
              onChange={handleChange}
              type="file"
              name="dashboardImg"
              ref={ref => inputForm = ref}
            />
        <button type='submit' onClick={displayForm}>Update</button>
      </form>
    </div>
  );
}
