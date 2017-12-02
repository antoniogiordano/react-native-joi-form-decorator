import { func, object } from 'prop-types'
import React, {Component} from 'react'
import Joi from 'joi'

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

const joiValidate = (joiObject, data) => {
  return new Promise((resolve, reject) => {
    let validations = {}
    Object.keys(data).forEach(field => validations[field] = {state: validationStates.CORRECT, error: null})
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
        validations
      })
    })
  })
}

const initialValidations = (data) => {
  let validations = { }
  Object.keys(data).forEach(field => validations[field] = {state: validationStates.EMPTY, error: null})
  return validations
}

export const validationStates = {
  CORRECT: 'correct',
  WRONG: 'wrong',
  EMPTY: 'empty'
}

export class Validator extends Component {
	static propTypes = {
		data: object.isRequired,
    joiObject: object.isRequired
	}

	constructor(props) {
		super(props)

		this.state = {
			isValid: false,
			validations: initialValidations(props.data)
		}
	}

	componentDidMount () {
		this.handleFormValueChange(this.props)
	}

	componentWillReceiveProps (props) {
    this.handleFormValueChange(props)
	}

	handleFormValueChange = (props) => {
    joiValidate(props.joiObject, props.data)
			.then(({ isValid, validations }) => this.setState({ isValid, validations }))
			.catch(ex => {
			  console.log(ex)
    		throw ex
      })
	}

	render() {
		return this.props.children(this.state.isValid, this.state.validations)
	}
}
