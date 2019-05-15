import React, { Component } from 'react'
import emoji from 'react-easy-emoji'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import AvatarEditor from 'react-avatar-editor'
import { Block, BlockBody, BlockHeader, BlockFooter, EventView } from '../_help/_index.js'
import LeftPart from './left/_index'
import RightPart from './right/_index'
import { submitEvent } from '../../modules/event/_index'
import { EditorState, ContentState, convertFromHTML } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'
import { Helmet } from 'react-helmet'
import './index.css'

class SubmitEvent extends Component{

  state = {
    title: '',
    data: [
      {
        type: 'TXT',
        data: '',
        editor_data: EditorState.createEmpty()
      }
    ],
    focused_editor: null,
    thumbnail: '',
    colors: [],
    color: '',

    type: '',
    date: '',

    imagePreviewUrl: '',

    add_clicked: false,
    is_preview: false,

    clicked_change_data_type: null,

    error: []
  }

  componentDidMount(){
    document.title = 'Submit event'
  }

  focusEditor = (i) => {
    this.setState({
      focused_editor: i
    })
    console.log(i)
  }

  handleEditor = (editorState, i) => {
    // console.log({editorState})
    let ndata = this.state.data
    this.state.data[i].editor_data = editorState
    this.state.data[i].data = editorState.getCurrentContent().hasText() ? stateToHTML(editorState.getCurrentContent()) : ''
    this.setState({
      data: [...ndata]
    })
  }

  handleTitle = (e) => {
    this.setState({title: e.target.value})
  }

  handleType = (e) => {
    this.setState({
      type: e.target.value
    })
  }

  handleDate = (e) => {
    this.setState({
      date: e.target.value
    })
  }

  handleChangeThumb = (thumbnail) => {
    this.setState({
      thumbnail: thumbnail,
      imagePreviewUrl: URL.createObjectURL(thumbnail)
    })
  }

  setColors = (colors) => {
    this.setState({colors: colors, color: colors[0]})
  }

  setColor = (color) => {
    this.setState({color: color})
  }

  handleAddClicked = () => {
    this.setState({add_clicked: !this.state.add_clicked})
  }

  newData = (e) => {
    let new_data = {}
    if (e.target.value != 'TXT'){
      new_data = {
        type: e.target.value,
        data: ''
      }
    }
    else{
      new_data = {
        type: e.target.value,
        editor_data: EditorState.createEmpty(),
        data: ''
      }
    }

    this.setState({
      add_clicked: false,
      data: [...this.state.data, new_data]
    })
  }

  editData = (e, i) => {
    let ndata = this.state.data
    this.state.data[i].data = e.target.value
    this.setState({
      data: [...ndata]
    })
  }

  deleteData = (e, i) => {
    let ndata = this.state.data
    delete ndata[i]
    this.setState({
      data: ndata
    })
  }

  clickChangeDataType = (i) => {
    this.setState({clicked_change_data_type: i})
  }

  changeDataType = (type) => {
    let ndata = this.state.data
    this.state.data[this.state.clicked_change_data_type].type = type
    this.setState({
      data: [...ndata],
      clicked_change_data_type: null
    })
  }

  changePreview = () => {
    this.setState({is_preview: !this.state.is_preview})
  }

  submitEvent = () => {
    const { title, data, thumbnail, color, type, date, error } = this.state
    let submit_arr = []
    let error_arr = []

    for (var i in data){
      if (data[i]){
        if (data[i].data){
          submit_arr.push({type: data[i].type, data: data[i].data})
        }
      }
    }

    if (title === '' || title.length > 100) error_arr.push('title')
    if (submit_arr.length === 0) error_arr.push("data")
    if (!thumbnail) error_arr.push('thumbnail')
    if (!type || type === 'none') error_arr.push('type')
    if (!date) error_arr.push('date')

    if (error_arr.length === 0){
      this.setState({error: error_arr})
      this.props.submitEvent(
        {
          title: title,
          data: submit_arr,
          thumbnail: thumbnail,
          color: color,
          type: type,
          date: date
        },
        {
          token: localStorage.getItem('auth_token'),
          id: localStorage.getItem('auth_id')
        }
       )
    }
    else{
      this.setState({error: error_arr})
    }

  }

  render(){
    const { title, thumbnail, imagePreviewUrl, type, add_clicked, data, date, is_preview, error, color, colors, clicked_change_data_type } = this.state
    const { s_data } = this.props.EventReducer
    if (!localStorage.getItem('auth_id') && !localStorage.getItem('auth_token')){
      window.location.href = '/'
    }
    else{
      return(
        <div className="submit-event mb-5">
          <Helmet>
            <title>Submit An Event - SavesPlace</title>
          </Helmet>
          {s_data ?  s_data.error ? s_data.error.map((item, i) => (
            <p className="text-center text-danger" key={i}>{item}</p>
          )) : '' : ''}
          <div className="row">
            {is_preview ? (
              <EventView
                datas={data}
                title={title}/>
            ) : (
              <LeftPart
                title={title}
                handleTitle={this.handleTitle}
                handleAddClicked={this.handleAddClicked}
                add_clicked={add_clicked}
                newData={this.newData}
                datas={data}
                editData={this.editData}
                deleteData={this.deleteData}
                clickChangeDataType={this.clickChangeDataType}
                changeDataType={this.changeDataType}
                handleEditor={this.handleEditor}
                focusEditor={this.focusEditor}
                clicked_change_data_type={clicked_change_data_type}
                error={error}/>
            )}

            <RightPart
              handleChangeThumb={this.handleChangeThumb}
              handleType={this.handleType}
              handleDate={this.handleDate}
              changePreview={this.changePreview}
              is_preview={is_preview}
              submitEvent={this.submitEvent}
              thumbnail={thumbnail}
              imagePreviewUrl={imagePreviewUrl}
              type={type}
              date={date}
              error={error}
              color={color}
              colors={colors}
              setColors={this.setColors}
              setColor={this.setColor}/>

          </div>

        </div>
      )
    }
  }
}

const mapStateToProps=(state)=>{
  return state
}

export default withRouter(connect(mapStateToProps , { submitEvent })(SubmitEvent))
