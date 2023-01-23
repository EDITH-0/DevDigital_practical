import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import InputText from '../../components/InputText'
import { APIURLS } from '../../constants'
import {
  ValidateCommonFields,
  ValidateMobileNumber,
} from '../../helpers/validators'
import APICall from '../../networking'
import { alertService, AlertType } from '../../utils/alert.service'
import './dashboard.css'
import UploadComponent from './UploadComponent'

function Dashboard() {
  const [data, setData] = useState<any>({
    email: '',
    first_name: '',
    last_name: '',
    phone: '',
  })
  const [errors, setErrors] = useState<any>({
    email: '',
    first_name: '',
    last_name: '',
    phone: '',
  })
  const navigate = useNavigate()

  useEffect(() => {
    getProfile()
  }, [])

  const validator = (formData = data) => {
    let newErrors: any = {}
    let isValid = true
    const statusPhone = ValidateMobileNumber(formData.phone)
    const statusFName = ValidateCommonFields(formData.first_name)
    const statusLName = ValidateCommonFields(formData.last_name)
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
    setErrors(newErrors)
    return isValid
  }

  const getProfile = async () => {
    const response = await APICall({
      endPoint: APIURLS.UserProfile,
      method: 'GET',
      hasAuth: true,
    })
    if (response.status === 200) {
      setData({
        first_name: response.data.data.user_first_name,
        last_name: response.data.data.user_last_name,
        email: response.data.data.user_email,
        phone: response.data.data.user_phone,
        address: response.data.data.user_address,
        profile_image: response.data.data.user_profile_image
          ? APIURLS.Assets + response.data.data.user_profile_image
          : null,
      })
      console.log(
        '🚀 => getProfile => APIURLS.Assets + response.data.data.user_profile_image',
        APIURLS.Assets + response.data.data.user_profile_image,
      )
    }
    console.log('🚀 => getProfile => response', response.data)
  }
  const updateProfile = async () => {
    const formData = new FormData()
    formData.append('first_name', data.first_name)
    formData.append('last_name', data.last_name)
    formData.append('phone', data.phone)
    formData.append('address', data.address)
    typeof data.profile_image !== 'string' &&
      formData.append('profile_image', data.profile_image)

    const response = await APICall({
      endPoint: APIURLS.UserProfile,
      method: 'POST',
      hasAuth: true,
      reqData: formData,
    })
    if (response.status === 200) {
      alertService.alert({
        type: AlertType.Success,
        message: response.data.message,
      })
    }
    console.log('🚀 => getProfile => response', response.data)
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (validator()) {
      updateProfile()
    }
  }

  return (
    <section className="login-main-container">
      <div className="card">
        <h2 className="title">Profile Update</h2>
        <UploadComponent
          regex={/\.(jpg|jpeg|png|svg|webp)$/}
          onChange={(value) => {
            setData((prevValue: any) => ({
              ...prevValue,
              profile_image: value,
            }))
            console.log('🚀 => setData => value', value)
          }}
          value={data?.profile_image}
          label="Upload your resume"
          acceptableTitle="Image"
        />
        <form onSubmit={handleSubmit}>
          <InputText
            label="Email"
            type="text"
            disabled={true}
            value={data?.email}
            error={errors?.email}
          />
          <InputText
            label="First name"
            type="text"
            value={data?.first_name}
            onChange={(e: any) =>
              setData((prevValue: any) => ({
                ...prevValue,
                first_name: e.target.value,
              }))
            }
            error={errors?.first_name}
          />
          <InputText
            label="Last name"
            type="text"
            value={data?.last_name}
            onChange={(e: any) =>
              setData((prevValue: any) => ({
                ...prevValue,
                last_name: e.target.value,
              }))
            }
            error={errors?.last_name}
          />
          <InputText
            label="Phone number"
            type="number"
            value={data?.phone}
            onChange={(e: any) =>
              setData((prevValue: any) => ({
                ...prevValue,
                phone: e.target.value,
              }))
            }
            error={errors?.phone}
          />
          <InputText
            label="Address"
            type="text"
            value={data?.address}
            onChange={(e: any) =>
              setData((prevValue: any) => ({
                ...prevValue,
                address: e.target.value,
              }))
            }
            error={errors?.address}
          />
          <div className="button-container">
            <button className="button">Submit</button>
            <Link
              onClick={(e) => {
                e.preventDefault()
                localStorage.clear()
                navigate('/')
              }}
              to={'/'}
              target="_blank"
              rel="noopener"
            >
              Logout
            </Link>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Dashboard
