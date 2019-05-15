import React from 'react'
import { Link } from 'react-router-dom'

export default function Nav(props){
  const { submitSettings } = props
  return(
    <div className="d-flex justify-content-between mb-3">
      <Link to="/"><h5 className="set-back">Home Page</h5></Link>
      <h5 className="set-save" onClick={submitSettings}>Save Settings</h5>
    </div>
  )
}
