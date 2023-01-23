import Joi from 'joi'
import { customMessage } from '../helpers/validationMessage.js'

export const verifyUpdateUser = Joi.object()
  .options({ abortEarly: false })
  .keys({
    // email: Joi.string()
    //   .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'biz'] } })
    //   .required()
    //   .messages(customMessage('Email')),
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
    address: Joi.string()
      .optional()
      .messages(customMessage('Address'))
      .allow(null, ''),
    profile_image: Joi.string()
      .optional()
      .messages(customMessage('Profile Image'))
      .allow(null, ''),
  })
