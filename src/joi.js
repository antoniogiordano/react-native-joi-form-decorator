import Joi from 'joi-browser'

const getChild = (object, field) => {
  let path = field.split('.')
  let item
  if (path.length > 1) {
    item = object[path[0]]
    for (var i = 1; i < path.length - 1; i++) {
      item = item[path[i]]
    }
    return {
      object: item,
      field: path.pop()
    }
  } else {
    return {
      object: object,
      field: path[0]
    }
  }
}

export const validationStates = {
  CORRECT: 'correct',
  WRONG: 'wrong',
  EMPTY: 'empty'
}

export function joiValidate(joiObject, fields, data) {
  const closure = data => {
    return new Promise((resolve, reject) => {
      let validations = {}
      fields.forEach((field) => {
        validations[field] = {
          state: validationStates.CORRECT,
          error: null
        }
      })
      Joi.validate(data, joiObject, {abortEarly: false}, (err) => {
        if (err) {
          err.details.map((item) => {
            const { object, field } = getChild(data, item.path)
            if (typeof object[field] === 'undefined') return reject(`Error: field not found. ${field}`)
            if (object[field].toString().length === 0) {
              validations[item.path] = {
                state: validationStates.EMPTY,
                error: null
              }
            } else {
              validations[item.path] = {
                state: validationStates.WRONG,
                error: item.message
              }
            }
          })
        }
        return resolve({
          isValid: !err,
          data: validations
        })
      })
    })
  }

  return data ? closure(data) : closure
}

export const initialValidations = (fields) => {
  let validations = { }
  fields.forEach((field) => {
    validations[field] = {
      state: validationStates.EMPTY,
      error: null
    }
  })
  return validations
}
