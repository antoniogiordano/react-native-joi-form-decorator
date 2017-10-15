import { configure } from 'enzyme'
import { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'
import Joi from 'joi-browser'

import { Attire } from './Attire'
import { validationStates } from './joi'

configure({ adapter: new Adapter() })

const joiObject = Joi.object().keys({
  yolo: Joi.string().min(5).required()
})

describe('Joi', () => {
  it('should show no errors', () => {
		const form = (
			<Attire initial={{ yolo: 'swag swag' }} joiObject={joiObject}>
				{(data, onChange, reset, validations) => {
          return <div>
            <input name="yolo" value={data.yolo} onChange={onChange}/>
            {
              validations.data.yolo.state === validationStates.WRONG && <label>{validations.data.yolo.error}</label>
            }
          </div>
        }}
			</Attire>
		)

		const mounted = mount(form)
    setTimeout(() => {
      expect(mounted.find('div').find('label').length).toBe(0)
    }, 10)
	})

  it('should show an error label', () => {
    const form = (
      <Attire initial={{ yolo: 'swag' }} joiObject={joiObject}>
        {(data, onChange, reset, validations) => {
          return <div>
            <input name="yolo" value={data.yolo} onChange={onChange}/>
            {
              validations.data.yolo.state === validationStates.WRONG && <label>{validations.data.yolo.error}</label>
            }
          </div>
        }}
      </Attire>
    )

    const mounted = mount(form)
    mounted.find('input').simulate('change', { target: { name: 'yolo', value: 'yeo' } })
    setTimeout(() => {
      expect(mounted.find('div').find('label').length).toBe(1)
    }, 10)
  })
})
