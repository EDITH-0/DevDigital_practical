import React, { useState } from 'react'
import './InputText.css'

export default function InputText({
  type,
  placeholder,
  value,
  onChange,
  className,
  label,
  disabled,
  error,
}: any) {
  const [showPassword, setShowPassword] = useState(false)

  const togglePassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className={`inputText-input-wrapper ${className ? className : ''}`}>
      <div className="inputText-input-container">
        <label className="inputText-label" htmlFor={label}>
          {label}
        </label>
        <input
          className="inputText-input"
          type={type === 'password' ? (showPassword ? 'text' : type) : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
        {type === 'password' && (
          <i
            className={`fa  password-eye ${
              showPassword ? 'fa-eye' : 'fa-eye-slash'
            }`}
            onClick={togglePassword}
          />
        )}
      </div>
      {error ? (
        <div className="inputText-error-container">
          <img
            className="inputText-img"
            style={{ verticalAlign: 'middle' }}
            src={require('../../assets/images/remove.png')}
            alt=""
          />
          <span>{error}</span>
        </div>
      ) : null}
    </div>
  )
}
