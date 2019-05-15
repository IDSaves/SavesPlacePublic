import React from 'react'
import { Block, BlockBody, BlockHeader, BlockFooter } from '../../_help/_index.js'


export default function EventType(props){
  const { handleType, error, type } = props
  return(
    <Block className="mb-3">
      <BlockBody className="text-center">
        <h5 className="m-0 mb-3">Event type</h5>

        <select className="custom-select" onChange={handleType} defaultValue="none">
          <option value="none">Select Event Type</option>
          <option value="ART">Art</option>
          <option value="SPT">Sport</option>
          <option value="SCI">Science</option>
          <option value="MUS">Music</option>
          <option value="MEM">Meme</option>
          <option value="WOR">World</option>
          <option value="GAM">Games</option>
          <option value="MDA">Media</option>
        </select>
        {error.includes('type') && (!type || type === 'none') ? <p className="text-danger mt-2 mb-0">* Choose a type *</p> : ''}
      </BlockBody>
    </Block>
  )
}
