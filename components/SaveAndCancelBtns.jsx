import React from 'react'
import Button from './Button'

const SaveAndCancelBtns = ({handleSaveEditForm, handleCancleForm, classes}) => {

  const class_names = `flex gap-4 sticky bottom-0 p-4  
  shadow-md bg-white/100  w-full    
  -ml-3 mt-2 shadow-black ${classes}`
  return (
    <div className={class_names}>
  <Button
    title="Save"
    type="submit"
    className="max-w-[8rem] text-base"
    onClick={handleSaveEditForm}
  />
  <Button
    title="Cancel"
    className="max-w-[8rem] text-base
     bg-slate-300 !text-black hover:bg-slate-400
      hover:text-white"
    onClick={handleCancleForm}
  />
</div>
  )
}

export default SaveAndCancelBtns