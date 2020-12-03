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


{/* <div className='center ma'>
<div className='absolute mt2'>
    <img id='inputImage' alt='' src={'https://en.wikipedia.org/wiki/Avigdor_Lieberman#/media/File:Avigdor_Lieberman_-_2011.jpg'} width='500px' height='auto' />
    {boxes.map(box => {
  return <div key={box.topRow} className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }}></div>
    })
    }
</div>
</div> */}