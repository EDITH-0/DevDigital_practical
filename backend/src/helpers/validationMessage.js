export const customMessage = (label, patternMessage) => ({
  'string.min': `${label} is not valid`,
  'string.max': `${label} is not valid`,
  'any.required': `${label} is required`,
  'string.empty': `${label} is required`,
  'string.pattern.base': patternMessage
    ? patternMessage
    : `${label} is not valid`,
})
