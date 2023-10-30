import React from 'react'
import Button from './Button'

const SaveAndCancelBtns = ({handleSaveEditForm, handleCancleForm}) => {
  return (
    <div className='flex sticky bottom-0 p-4  
    shadow-md bg-white/100  w-full  xl:w-[120.1%] sm:w-[101.7%] md:w-[101.26%] 
    -ml-3 mt-2 shadow-black'>
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