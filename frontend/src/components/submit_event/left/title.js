import React from 'react'

export default function Title(props){
  const { handleTitle, title, error } = props
  return(
    <div className="container-fluid mb-3 p-0">
      <input type="text" className="event-title-input pl-1 pr-1 pt-1" placeholder="Enter event title here..." value={title} onChange={handleTitle}/>
      {error.includes('title') && (!title || title.length > 122) ? <p className="text-danger mb-0 mt-2">* Enter title or cut it *</p> : ''}
    </div>
  )
}
