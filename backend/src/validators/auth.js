import Joi from 'joi'
import { customMessage } from '../helpers/validationMessage.js'

export const verifyLogin = Joi.object()
  .options({ abortEarly: false })
  .keys({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'biz'] } })
      .required()
      .messages(customMessage('Email')),
    password: Joi.string()
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)
      .required()
      .messages(
        customMessage(
          'Password',
          'Password should be atleast of 8 alphanumeric and 1 symbol with 1 uppercase',
        ),
      ),
  })

export const verifyRegister = Joi.object()
  .options({ abortEarly: false })
  .keys({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'biz'] } })
      .required()
      .messages(customMessage('Email')),
    first_name: Joi.string()
      .min(3)
      .max(50)
      .required()
      .messages(customMessage('First name')),
    last_name: Joi.string()
      .min(3)
      .max(50)
      .required()
      .messages(customMessage('Last name')),
    phone: Joi.string()
      .pattern(/^(\+\d{1,3}[- ]?)?\d{10}$/)
      .required()
      .messages(customMessage('Phone Number')),
    password: Joi.string()
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)
      .required()
      .messages(
        customMessage(
          'Password',
          'Password should be atleast of 8 alphanumeric and 1 symbol with 1 uppercase',
        ),
      ),
  })
