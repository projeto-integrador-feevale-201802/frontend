import React from 'react'

const TextInput = ({label, callback, type}) => {
  return (
    <label>
      {label}
      <input
        type={type || 'text'}
        onChange={e => callback(e.target.value)}
      ></input>
    </label>
  )
}

export default TextInput
