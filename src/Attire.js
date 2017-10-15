import { func, object } from 'prop-types'
import React from 'react'
import { joiValidate, initialValidations } from './joi'

class Attire extends React.Component {
	static propTypes = {
		initial: object.isRequired,
    joiObject: object.isRequired,
		onChange: func,
		render: func
	}

	static defaultProps = {
		initial: {}
	}

	constructor(props) {
		super(props)

    this.validator = joiValidate(props.joiObject, Object.keys(props.initial))

		this.state = {
			data: { ...props.initial },
			validations: {
				isValid: false,
				data: initialValidations(['yolo'])
      }
		}
	}

	handleFormValueChange = (...args) => {
		const { onChange } = this.props

		let delta = {}
		if (args.length === 1) {
			const [event] = args
			const { name, type, checked, value } = event.target

			delta = {
				[name]: type === 'checkbox' ? checked : value
			}
		}

		if (args.length === 2) {
			const [name, value] = args

			delta = {
				[name]: value
			}
		}

    const data = { ...this.state.data, ...delta }
    console.log(data)
    this.validator(data)
			.then((validations) => {
        if (onChange) onChange(data)
        this.setState({ data, validations })
			})
			.catch(console.log)
	}

	handleFormReset = () => {
		const { initial, onChange } = this.props

		this.setState(state => {
			if (onChange) {
				onChange({ ...initial })
			}

			return { data: { ...initial } }
		})
	}

	render() {
		return this.props.children(this.state.data, this.handleFormValueChange, this.handleFormReset, this.state.validations)
	}
}

export { Attire }
