[![Build Status](https://travis-ci.org/antoniogiordano/react-joi-form-decorator.svg?branch=master)](https://travis-ci.org/antoniogiordano/react-joi-form-decorator)
[![npm version](https://badge.fury.io/js/react-joi-form-decorator.svg)](https://badge.fury.io/js/react-joi-form-decorator)

# React Joi Form Decorator

A decorator for your forms validated through Joi from Hapi.js.
Build you form, decorate it with React Joi Form Decorator providing a valid Joi object prop.  

## Installation

```
npm install --save react-joi-form-decorator
```

## How does it work?

Import component and `validationsStates` enum first

`import Validator, { validationStates } from 'react-joi-form-decorator'`

The `Validator` component takes 2 props, a `data` object and a `joiObject` which represents the Joi validation object.  
The render method provides 2 outputs, an `isValid` flag and a `validations` data object, where each key of this object is a key from the provided `data` object, and the value is anobject with a `state` and `error` parameters.
 
`state` could be one of `validationStates.CORRECT`, `validationStates.WRONG`, `validationStates.EMPTY`
 
`error` is a string explaining why data is wrong (**in English! Localization is not supported yet**)
 
### Browser Webpack configuration

`react-joi-form-decorator` looks for a joi generic module. 
Since joi original module is for server side purpose, you have to create an alias for browser and React Native environments.

Add to your webpack.config file this:
`resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: ['node_modules'],
 alias: {
    joi: 'joi-browser'
 }`

### React Native configuration

`// @TODO`

### Basic Usage


Here's a simple example:

```
import React from 'react'
import { Validator, validationStates } from 'react-joi-form-decorator'
import Joi from 'joi'

class MyForm extends React.Component {
    constructor (props) {
        super (props)
            
        this.state = {
            data: {
                name: 'Frankie Frankson'
            }
        }
    }
    
    render() {
        const { data } = this.state
        
        return (
            <Validator data={data} joiObject={Joi.object().keys({name: Joi.string().min(5).required()})}>
                {(isValid, validations) => (
                    <div>
                        <label>Your name:</label>
                        <input type="text" name="name" value={data.name} onChange={() => {
                            // an update state function
                        }} />
                        {
                            validations.name.state === validationStates.WRONG && <label>{validations.name.error}</label>
                        }
                        <button type="submit" disabled={!isValid}>Submit</button>
                    </div>
                )}
            </Validator>
        )
    }
}
```

## More power!

`react-joi-form-decorator` works great with [`react-attire`](https://github.com/gianmarcotoso/react-attire)! 

Here's an other example:

```
import React from 'react'
import { Attire } from 'react-attire'
import { Validator, validationStates } from 'react-joi-form-decorator'

class MyForm extends React.Component {
    render() {
        return (
            <Attire initial={{name: 'Frankie Frankson'}}>
                {(data, onChange, reset) => (
                    <Validator data={data} joiObject={Joi.object().keys({name: Joi.string().min(5).required()})}>
                        {(isValid, validations) => (
                            <div>
                                <label>Your name:</label>
                                <input type="text" name="name" value={data.name} onChange={() => {
                                    // an update state function
                                }} />
                                {
                                    validations.name.state === validationStates.WRONG && <label>{validations.name.error}</label>
                                }
                                <button onClick={reset}>Reset my name!</button>
                                <button type="submit" disabled={!isValid}>Submit</button>
                            </div>
                        )}
                    </Validator>
                )}
            </Attire>
        )
    }
}
```

## Contributing

If you see something you don't like or think that something is broken, please open an issue or better yet, make a PR!

## License

MIT
