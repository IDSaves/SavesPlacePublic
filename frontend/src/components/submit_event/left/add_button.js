import React from 'react'
import { Block, BlockBody, BlockHeader, BlockFooter } from '../../_help/_index.js'


export default function Btn(props){
  const { add_clicked, newData, handleAddClicked } = props
  return(
    <center>
      <div className={add_clicked ? "add-event-data clicked text-white mb-3 p-2" : "add-event-data text-white mb-3 p-2"}
           onClick={!add_clicked ? handleAddClicked : () => console.log('None')}>
           {add_clicked ? (
             <div>
               <select className="custom-select" onChange={newData} defaultValue="none">
                 <option value="none">Select Data Type</option>
                 <option value="TXT">Text</option>
                 <option value="GIMG">Gif/Image</option>
                 <option value="VID">Video</option>
               </select>
               <div onClick={handleAddClicked}><Block className="red-block text-white mt-2">Cancel</Block></div>
             </div>
           ) : (<i className="fas fa-plus" />)}
      </div>
    </center>
  )
}
