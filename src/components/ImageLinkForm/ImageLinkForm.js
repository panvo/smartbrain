import React from 'react'
import './ImageLinkForm.css';


const ImageLinkForm = ({ onInputChange, onImageSubmit, handleKeypress }) => {

    return (
        <div>

            <p className='f3'>{'System will detect face(s) in your image. Give it a try!'}</p>
            <div className='center'>
                <div className='center form pa4 br3 shadow-5'>
                    <input
                        style={{ fontSize: '16px' }}
                        className='f4 pa2 w-100 center'
                        type='text'
                        placeholder='Enter image link'

                        onChange={onInputChange}
                        onKeyPress={handleKeypress} />


                    {/* DETECT BUTTON */}
                    <button
                        id='detectBtn'
                        className='f4 w-30 grow link ph3 pv2 dib white bg-blue'
                        onClick={onImageSubmit}

                    >Detect</button>
                </div>
            </div>

        </div>
    );
}


export default ImageLinkForm;
