import React from 'react'
import { Block, BlockBody, BlockHeader, BlockFooter } from '../../_help/_index.js'

export default function PreviewButton(props){
  const { changePreview, is_preview } = props
  return(
    <div onClick={changePreview}>
      {is_preview ? (
        <Block className="red-block mb-3 preview-button">
          <BlockBody className="text-center text-white">
            <h5 className="m-0">Off preview</h5>
          </BlockBody>
        </Block>
      ) : (
        <Block className="blue-block mb-3 preview-button">
          <BlockBody className="text-center text-white">
            <h5 className="m-0">Preview</h5>
          </BlockBody>
        </Block>
      )}
    </div>
  )
}
