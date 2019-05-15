import React, { Component } from 'react'

import Editor from 'draft-js-plugins-editor'

import createAlignmentPlugin from 'draft-js-alignment-plugin'
import createFocusPlugin from 'draft-js-focus-plugin'

import { RichUtils } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'

import { InlineStyleControls } from './inline_controls'
import { BlockStyleControls } from './block_controls'
import './index.css'

const alignmentPlugin = createAlignmentPlugin()
const focusPlugin = createFocusPlugin()

const plugins = [
  alignmentPlugin,
  focusPlugin
]

export default class MainEditor extends Component{

  constructor(props) {
    super(props)

    this.focus = () => this.refs.editor.focus()

    this.handleKeyCommand = (command) => this._handleKeyCommand(command)
    this.toggleBlockType = (type) => this._toggleBlockType(type)
    this.toggleInlineStyle = (style) => this._toggleInlineStyle(style)
  }

  _handleKeyCommand(command) {
    const {editorState} = this.props
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
      this.props.onChange(newState)
      return true
    }
    return false
  }

  _toggleBlockType(blockType) {
    this.props.onChange(
      RichUtils.toggleBlockType(
        this.props.editorState,
        blockType
      )
    )
  }

  _toggleInlineStyle(inlineStyle) {
    this.props.onChange(
      RichUtils.toggleInlineStyle(
        this.props.editorState,
        inlineStyle
      )
    )
  }

  render() {
    const { editorState } = this.props

    let className = 'RichEditor-editor'
    var contentState = editorState.getCurrentContent()
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder'
      }
    }

    return (
      <div className="RichEditor-root">
        <BlockStyleControls
          editorState={editorState}
          onToggle={this.toggleBlockType}
        />
        <InlineStyleControls
          editorState={editorState}
          onToggle={this.toggleInlineStyle}
        />
        <hr/>
        <div className={className} onClick={this.focus}>
          <Editor
            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            editorState={editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.props.onChange}
            placeholder={(<div style={{color: '#999'}}>Text here...</div>)}
            ref="editor"
            spellCheck={true}
            plugins={plugins}
          />
        </div>
      </div>
    )
  }
}

const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
}

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote': return 'RichEditor-blockquote'
    default: return null
  }
}
