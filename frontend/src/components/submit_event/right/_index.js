import React, { Component } from 'react'
import { Block, BlockBody, BlockHeader, BlockFooter } from '../../_help/_index.js'
import { ColorExtractor } from 'react-color-extractor'

import SubmitButton from './submit_button'
import PreviewButton from './preview_button'
import Thumbnail from './thumbnail'
import Type from './type'
import Date from './date'


export default class RightPart extends Component{

  render(){
    const {
      handleChangeThumb,
      handleDate,
      handleType,
      changePreview,
      thumbnail,
      imagePreviewUrl,
      type,
      date,
      is_preview,
      submitEvent,
      error,
      colors,
      color,
      setColors,
      setColor } = this.props

    return(
      <div className="col-lg-4 col-md-4">

        <SubmitButton submitEvent={submitEvent}/>

        <PreviewButton changePreview={changePreview} is_preview={is_preview}/>

        <Thumbnail
          thumbnail={thumbnail}
          imagePreviewUrl={imagePreviewUrl}
          handleChangeThumb={handleChangeThumb}
          color={color}
          colors={colors}
          setColors={setColors}
          setColor={setColor}
          error={error}/>

        <Type
          handleType={handleType}
          error={error}
          type={type}/>

        <Date
          handleDate={handleDate}
          date={date}
          error={error}/>

      </div>
    )
  }
}
