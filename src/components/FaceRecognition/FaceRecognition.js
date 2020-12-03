import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, boxes }) => {
    return (
        <div className='center ma '>
        <div className='absolute mb3 '>
          <img id='inputimage' alt='' src={imageUrl} width='500px' height='350px'/>
          {boxes.map(box =>
            <div key={`box${box.topRow}${box.rightCol}`}
                className='bounding-box'
                style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}>
            </div>
          )}
        </div>
      </div>
    );
}

export default FaceRecognition;

