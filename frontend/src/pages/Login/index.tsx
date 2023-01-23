import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import InputText from '../../components/InputText'
import { APIURLS } from '../../constants'
import { ValidateEmail, ValidatePassword } from '../../helpers/validators'
import APICall from '../../networking'
import { alertService, AlertType } from '../../utils/alert.service'
import './login.css'

function Login() {
  const [data, setData] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({ email: '', password: '' })
  const navigate = useNavigate()

  const validator = (formData = data) => {
    let newErrors: any = {}
    let isValid = true
    const statusEmail = ValidateEmail(formData.email)
    const statusPassword = ValidatePassword(formData.password)
    if (statusEmail) {
      newErrors.email =
        statusEmail === 1 ? 'Email is Required' : 'Email is Invalid'
      isValid = false
    }
    if (statusPassword) {
      newErrors.password =
        statusPassword === 1 ? 'Password is Required' : 'Password is Invalid'
      isValid = false
    }
    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (validator()) {
      const response: any = await APICall({
        endPoint: APIURLS.Login,
        method: 'POST',
        reqData: data,
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
        <h2 className="title">Sign in</h2>
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
          <div className="button-container">
            <button className="button">Sign in</button>
            <Link to="/register" rel="noopener">
              Create account
            </Link>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Login
