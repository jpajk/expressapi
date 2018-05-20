
import express from 'express'
import StandardResponse from './StandardResponse'

const responses = {
  success: function ({status, message, data}) {
    let response = new StandardResponse({status, message, data})

    this.status(200)
    this.json(response.toJSON())
  },

  clientError: function (message) {
    let response = new StandardResponse({
      status: 0,
      message,
      data: {}
    })

    this.status(400)
    this.json(response.toJSON())
  },

  error: function (message) {
    let response = new StandardResponse({
      status: 0,
      message,
      data: {}
    })

    this.json(response.toJSON())
  }
}

Object.keys(responses).forEach(responseName => {
  express.response[responseName] = responses[responseName]
})
