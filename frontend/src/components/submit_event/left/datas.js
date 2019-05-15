import React, { Component, Fragment  } from 'react'
import Textarea from 'react-textarea-autosize'
import { Block, BlockBody, BlockHeader, BlockFooter, Row } from '../../_help/_index.js'
import Editor from '../../text_editor/_index'
export default class Datas extends Component{

  state = {
    text: ''
  }

  render(){
    const { datas,
            editData,
            deleteData,
            clickChangeDataType,
            clicked_change_data_type,
            changeDataType,
            handleEditor,
            focusEditor,
            error
          } = this.props
    return(
      <div className="container-fluid p-0">
        {datas ? datas.map((data, i) => {
          if (data){
            if (data.type == 'TXT'){
              return(
                <div className="container-fluid event-create-data event-create-data-text p-0 mb-2" key={i}>
                  <div className="data-input p-2 text-left">
                    <Editor editorState={data.editor_data} onChange={(editorState) => handleEditor(editorState, i)} />
                  </div>
                  {clicked_change_data_type === i ? (
                    <div className="event-data-change">
                      <div className="data-input-class-change change-event-data-type text p-1" onClick={() => changeDataType('TXT')}>Text</div>
                      <div className="data-input-class-change change-event-data-type gimg p-1" onClick={() => changeDataType('GIMG')}>Gif/Image</div>
                      <div className="data-input-class-change change-event-data-type video p-1" onClick={() => changeDataType('VID')}>Video</div>
                    </div>
                  ) : (
                    <div className="data-input-class data-input-class-text p-1" onClick={() => clickChangeDataType(i)}></div>
                  )}
                  <button className="data-input-rmv-btn p-1" onClick={(e) => deleteData(e, i)}><i className="fas fa-times"></i></button>
                </div>
              )
            }
            else if (data.type == 'GIMG'){
              return(
                <div className="container-fluid event-create-data event-create-data-gimg p-0 mb-3" key={i}>
                  <input type="text" className="data-input-link p-2" value={data.data} placeholder="Gif/Image link" onChange={(e) => editData(e, i)}/>
                  {clicked_change_data_type === i ? (
                    <div className="event-data-change">
                      <div className="data-input-class-change change-event-data-type text p-1" onClick={() => changeDataType('TXT')}>Text</div>
                      <div className="data-input-class-change change-event-data-type gimg p-1" onClick={() => changeDataType('GIMG')}>Gif/Image</div>
                      <div className="data-input-class-change change-event-data-type video p-1" onClick={() => changeDataType('VID')}>Video</div>
                    </div>
                  ) : (
                    <div className="data-input-class data-input-class-gimg p-1" onClick={() => clickChangeDataType(i)}></div>
                  )}
                  <button className="data-input-rmv-btn p-1" onClick={(e) => deleteData(e, i)}><i className="fas fa-times"></i></button>
                </div>
              )
            }
            else if (data.type == 'VID'){
              return(
                <div className="container-fluid event-create-data event-create-data-video p-0 mb-3" key={i}>
                  <input type="text" className="data-input-link p-2" value={data.data} placeholder="Video link" onChange={(e) => editData(e, i)}/>
                  {clicked_change_data_type === i ? (
                    <div className="event-data-change">
                      <div className="data-input-class-change change-event-data-type text p-1" onClick={() => changeDataType('TXT')}>Text</div>
                      <div className="data-input-class-change change-event-data-type gimg p-1" onClick={() => changeDataType('GIMG')}>Gif/Image</div>
                      <div className="data-input-class-change change-event-data-type video p-1" onClick={() => changeDataType('VID')}>Video</div>
                    </div>
                  ) : (
                    <div className="data-input-class data-input-class-video p-1" onClick={() => clickChangeDataType(i)}></div>
                  )}
                  <button className="data-input-rmv-btn p-1" onClick={(e) => deleteData(e, i)}><i className="fas fa-times"></i></button>
                </div>
              )
            }
          }
        }) : ''}
        {error.includes('data') ? <p className="text-danger">* Event post can not be empty *</p> : ''}
      </div>
    )
  }
}
