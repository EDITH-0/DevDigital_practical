import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import InputText from '../../components/InputText'
import { APIURLS } from '../../constants'
import {
  ValidateCommonFields,
  ValidateConfirmPassword,
  ValidateEmail,
  ValidateMobileNumber,
  ValidatePassword,
} from '../../helpers/validators'
import APICall from '../../networking'
import { alertService, AlertType } from '../../utils/alert.service'
import './register.css'

function Register() {
  const [data, setData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    phone: '',
    password: '',
    conf_password: '',
  })
  const [errors, setErrors] = useState({
    email: '',
    first_name: '',
    last_name: '',
    phone: '',
    password: '',
    conf_password: '',
  })
  const navigate = useNavigate()

  const validator = (formData = data) => {
    let newErrors: any = {}
    let isValid = true
    const statusEmail = ValidateEmail(formData.email)
    const statusPassword = ValidatePassword(formData.password)
    const statusPhone = ValidateMobileNumber(formData.phone)
    const statusFName = ValidateCommonFields(formData.first_name)
    const statusLName = ValidateCommonFields(formData.last_name)
    const statusConfPass = ValidateConfirmPassword(
      formData.password,
      formData.conf_password,
    )
    if (statusEmail) {
      newErrors.email =
        statusEmail === 1 ? 'Email is required' : 'Email is invalid'
      isValid = false
    }
    if (statusPhone) {
      newErrors.phone =
        statusPhone === 1
          ? 'Phone number is required'
          : 'Phone number is invalid'
      isValid = false
    }
    if (statusFName) {
      newErrors.first_name =
        statusFName === 1 ? 'First name is required' : 'First name is invalid'
      isValid = false
    }
    if (statusLName) {
      newErrors.last_name =
        statusLName === 1 ? 'Last name is required' : 'Last name is invalid'
      isValid = false
    }
    if (statusPassword) {
      newErrors.password =
        statusPassword === 1 ? 'Password is required' : 'Password is invalid'
      isValid = false
    }
    if (statusConfPass) {
      newErrors.conf_password =
        statusConfPass === 1
          ? 'Confirm Password is required'
          : statusConfPass === 2
          ? 'Confirm Password is invalid'
          : 'Confirm Password does not match'
      isValid = false
    }
    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (validator()) {
      const response: any = await APICall({
        endPoint: APIURLS.Register,
        method: 'POST',
        reqData: {
          email: data.email,
          first_name: data.first_name,
          last_name: data.last_name,
          phone: data.phone,
          password: data.password,
        },
        hasAuth: false,
      })
      if (response.status === 200) {
        alertService.alert({
          type: AlertType.Success,
          message: response.data.message,
        })
        localStorage.setItem('auth_token', response.data.auth_token)
        navigate('/dashboard')
      } else {
        alertService.alert({
          type: AlertType.Error,
          message: response.data.map((item: any) => item.message).join('\n'),
        })
      }
    }
  }

  return (
    <section className="login-main-container">
      <div className="card">
        <h2 className="title">Sign up</h2>
        <form onSubmit={handleSubmit}>
          <InputText
            label="Email"
            type="text"
            value={data.email}
            onChange={(e: any) =>
              setData((prevValue) => ({
                ...prevValue,
                email: e.target.value,
              }))
            }
            error={errors?.email}
          />
          <InputText
            label="First name"
            type="text"
            value={data.first_name}
            onChange={(e: any) =>
              setData((prevValue) => ({
                ...prevValue,
                first_name: e.target.value,
              }))
            }
            error={errors?.first_name}
          />
          <InputText
            label="Last name"
            type="text"
            value={data.last_name}
            onChange={(e: any) =>
              setData((prevValue) => ({
                ...prevValue,
                last_name: e.target.value,
              }))
            }
            error={errors?.last_name}
          />
          <InputText
            label="Phone number"
            type="number"
            value={data.phone}
            onChange={(e: any) =>
              setData((prevValue) => ({
                ...prevValue,
                phone: e.target.value,
              }))
            }
            error={errors?.phone}
          />
          <InputText
            label="Password"
            type="password"
            value={data.password}
            onChange={(e: any) =>
              setData((prevValue) => ({
                ...prevValue,
                password: e.target.value,
              }))
            }
            error={errors?.password}
          />
          <InputText
            label="Confirm password"
            type="password"
            value={data.conf_password}
            onChange={(e: any) =>
              setData((prevValue) => ({
                ...prevValue,
                conf_password: e.target.value,
              }))
            }
            error={errors?.conf_password}
          />
          <div className="button-container">
            <button className="button">Sign up</button>
            <Link to="/" rel="noopener">
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Register
