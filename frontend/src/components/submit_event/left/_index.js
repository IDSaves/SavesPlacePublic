import React from 'react'
import AddBtn from './add_button'
import Datas from './datas'
import Title from './title'

export default function LeftPart(props){
  const { add_clicked,
          newData,
          handleAddClicked,
          datas,
          editData,
          deleteData,
          handleTitle,
          title,
          clickChangeDataType,
          clicked_change_data_type,
          error,
          changeDataType,
          handleEditor,
          focusEditor
        } = props
  return(
    <div className="col-lg-8 col-md-8 text-center">
      <Title
        handleTitle={handleTitle}
        title={title}
        error={error}/>
      <Datas
        datas={datas}
        editData={editData}
        deleteData={deleteData}
        clickChangeDataType={clickChangeDataType}
        clicked_change_data_type={clicked_change_data_type}
        changeDataType={changeDataType}
        handleEditor={handleEditor}
        focusEditor={focusEditor}
        error={error}/>
      <AddBtn
        handleAddClicked={handleAddClicked}
        add_clicked={add_clicked}
        newData={newData}/>
    </div>
  )
}
