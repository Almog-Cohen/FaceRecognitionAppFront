import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange ,onPictureSubmit}) => {
    return (
        <div className="mb4">
            <p className='f3'>
                {'Link an image and we will detect if it contains human faces'}
            </p>
            <div className='center '>
                <div className=' form center pa4 br3 shadow-5'>
                    <input className='f4 pa2 w-70 center' placeholder='Enter image url'  type='text' onChange={onInputChange} />
                    <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick={onPictureSubmit} >Detect</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;