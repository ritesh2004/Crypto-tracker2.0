import React from 'react'
import { resolve } from 'styled-jsx/css'

const Wait = async (ms) => {
    return new Promise(resolve => setTimeout(resolve,ms))
}

export default Wait