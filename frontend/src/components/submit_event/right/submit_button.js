import React from 'react'
import { Block, BlockBody, BlockHeader, BlockFooter } from '../../_help/_index.js'

export default function SubmitButton(props){
  const { submitEvent } = props
  return(
    <div onClick={submitEvent}>
      <Block className="green-block mb-3 submit-button">
        <BlockBody className="text-center text-white">
          <h5 className="m-0">Submit</h5>
        </BlockBody>
      </Block>
    </div>
  )
}
