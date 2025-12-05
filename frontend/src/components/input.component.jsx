import React, { useState } from 'react'

const InputBox = ({ name, type, id, value, placeholder, icon }) => {

  const [passwordVisible , setpasswordVisible ] = useState(false)
  return (
    <div className='relative w-[100%] mb-4'>
      <input
        type={type ==="password" ? passwordVisible ? "text": "password" : type}
        name={name}
        placeholder={placeholder}
        defaultValue={value}
        id={id}
        className='input-box '
      />
      <i className={icon + " input-icon text-2xl pb-1"}></i>

      {
        type == "password" ?
          <i className={passwordVisible?"ri-eye-off-line input-icon text-2xl pb-1 left-auto right-4 cursor-pointer":"ri-eye-line input-icon text-2xl pb-1 left-auto right-4 cursor-pointer"}
          onClick={()=>{setpasswordVisible(currentVal => !currentVal)}}
          ></i>
          : ""
      }
    </div>
  )
}

export default InputBox
