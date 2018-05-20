
class StandardResponse {
  constructor ({ status, message, data }) {
    this.status = status || 1
    this.message = message || ''
    this.data = data || {}
  }

  toJSON () {
    return {
      status: this.status,
      message: this.message,
      data: this.data
    }
  }
}

export default StandardResponse
