import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange , onButtonSubmit}) => {
	return (
		 <div>
		   <p className='f3'>
		    {'This face detection app will detect faces from your image. Give it a try.'}
		   </p>
		   <div className='center'>
		    <div className='form center pa4 br3 shadow-5'>
		     <input className='f4 pa2 w-70 center b--black-80' type='text' onChange={onInputChange}/>
		     <button className='w-30 grow f4 link ph3 dib white b--black-80 bg-black'
		      onClick={onButtonSubmit}
		      >Detect</button>
		   </div>
		  </div>
		 </div>
	 	  );
}

export default ImageLinkForm;
