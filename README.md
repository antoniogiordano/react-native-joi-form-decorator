[![Build Status](https://travis-ci.org/antoniogiordano/react-attire.svg?branch=master)](https://travis-ci.org/antoniogiordano/react-attire)
[![npm version](https://badge.fury.io/js/react-attire-joi.svg)](https://badge.fury.io/js/react-attire-joi)

# Attire Joi

A dress code for your React forms. 

This package is a fork of [React Attire](https://github.com/gianmarcotoso/react-attire), offering more an automatic joi validation.
 
Please refer to that repo for Attire, transform, and reset functionalities.

## Installation

```
npm install --save react-attire-joi
```

## How does it work?

The `AttireJoi` component now includes a `joiObject` extra prop which represents the Joi validation object.  
The render method adds at the end of data, onChange and reset parameters list, a `validations` object decorated with a `isValid` flag and detailed data object, where each key of this object is a form input name, and the value is a `state` and `error` parameters. 

### Basic Usage


Here's a simple example:

```
import React from 'react'
import { AttireJoi, validationStates } from 'react-attire-joi'
import Joi from 'joi-browser'

class MyForm extends React.Component {
    render() {
        return (
            <AttireJoi initial={{name: 'Frankie Frankson'}} joiObject={Joi.object().keys({name: Joi.string().min(5).required()})}>
                {(data, onChange, reset, validations) => (
                    <div>
                        <label>Your name:</label>
                        <input type="text" name="name" value={data.name} onChange={onChange} />
                        {
                            validations.data.name.state === validationStates.WRONG && <label>{validations.data.name.error}</label>
                        }
                        <button type="submit" disabled={!validations.isValid}>Submit</button<
                    </div>
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
