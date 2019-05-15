import React from 'react'
import { Block, BlockBody, BlockHeader, BlockFooter } from '../../_help/_index.js'

export default function Social(props){
  const { available_years } = props
  return(
    <Block className="mb-3">
      <BlockHeader className="text-center">
        <h5 className="m-0">Media Accounts</h5>
      </BlockHeader>
      <BlockBody className="text-center">
        <h5 className="mb-0 media-accs">
          <a href="https://twitter.com/SavesPlaceCom" target="_blank" className="mr-2 twitter-social"><i class="fab fa-twitter-square" /></a>
          <a href="https://discord.gg/KQSNnfw" target="_blank" className="mr-2 discord-social"><i class="fab fa-discord" /></a>
        </h5>
      </BlockBody>
    </Block>
  )
}
