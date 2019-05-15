import React from 'react'
import { Block, BlockBody, BlockHeader, BlockFooter } from '../../_help/_index.js'

export default function Date(props){
  const { handleDate, date, error } = props
  return(
    <Block className="mb-3">
      <BlockBody className="text-center">
        <h5 className="m-0 mb-3">Event date</h5>

        <div className="form-group">
          <input type="date" className="form-control" onChange={handleDate}/>
        </div>
        {error.includes('date') && !date ? <p className="text-danger mb-0 mt-2">* Choose date *</p> : ''}
      </BlockBody>
    </Block>
  )
}
