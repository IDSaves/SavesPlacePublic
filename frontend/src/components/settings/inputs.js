import React from 'react'
import Textarea from 'react-textarea-autosize'
import { Link } from 'react-router-dom'

export default function Inputs(props){
  const { handleInputs, u_data, error } = props
  return(
    <div className="container text-left">

        <div className="set mb-3">
          {error ? error.nickname ? (<p className="text-danger mb-0">{error.nickname}</p>) : '' : ''}
          <b><span>NICKNAME</span></b>
          <input type="text" className="set-input mb-2 p-2" placeholder="Nickname" defaultValue={u_data.nickname} name="nickname" onChange={handleInputs}/>
        </div>

        <div className="set mb-3">
          {error ? error.status ? (<p className="text-danger mb-0">{error.status}</p>) : '' : ''}
          <b><span>STATUS</span></b>
          <Textarea
            className="set-input p-2"
            placeholder="Text here..."
            defaultValue={u_data.status}
            onChange={handleInputs}
            name="status"
            minRows={1}/>
        </div>

        <div className="set mb-3">
          {error ? error.email ? (<p className="text-danger mb-0">{error.email}</p>) : '' : ''}
          <b><span>EMAIL</span></b>
          <input type="text" className="set-input mb-2 p-2" placeholder="Email" defaultValue={u_data.email} name="email" onChange={handleInputs}/>
        </div>

        <div className="set mb-3">
          <b><span>PASSWORD</span></b>
          <Link to="/settings/password"><button className="btn btn-sm btn-info ml-3">Change</button></Link>
        </div>

    </div>
  )
}
