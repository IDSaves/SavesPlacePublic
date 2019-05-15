import React from 'react'
import { Block, BlockBody, BlockHeader, BlockFooter } from '../../_help/_index.js'
import { ColorExtractor } from 'react-color-extractor'


export default function EventThumbnail(props){
  const { thumbnail, imagePreviewUrl, handleChangeThumb, color, colors, setColors, setColor, error } = props
  return(
    <Block className="mb-3">
      <BlockBody className="text-center">
        <h5 className="m-0 mb-3">Event thumbnail</h5>

        <div className="custom-file">
          <input type="file" className="custom-file-input" id="customFile" onChange={ (e) => handleChangeThumb(e.target.files[0]) } />
          <label className="custom-file-label text-left" htmlFor="customFile">{thumbnail.name}</label>
        </div>
        {thumbnail ? (
          <div className="mt-2">
            <div className="event-thumb-block" style={{'backgroundColor': color}}>
              <ColorExtractor getColors={colors => setColors(colors)} maxColors={8}>
                <img className="event-thumb img-fluid" src={imagePreviewUrl}/>
              </ColorExtractor>
            </div>
            <p className="muted mt-2 mb-0">Select the color that will be painted up and down of the thumbnail if the image will not fit.</p>
            {colors ? colors.map((clr, i) => (
              <div className="color-to-choose mt-2" style={{'backgroundColor': clr}} onClick={() => setColor(clr)} key={i}>
                {color === clr ? <i className="fas fa-check-circle"/> : ''}
              </div>
            )) : ''}
          </div>
        ) : ''}
        {error.includes('thumbnail') && !thumbnail ? <p className="text-danger mb-0">* Choose a thumbnail *</p> : ''}
      </BlockBody>
    </Block>
  )
}
