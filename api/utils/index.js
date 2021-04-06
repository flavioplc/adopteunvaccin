const dispoableEmails = require('./disposable-emails.json')
const mailer = require('./mailer')
module.exports = {
  isValidEmail (email) {
    const pattern = '\\S+@\\S+\\.\\S+'
    const validationRegex = new RegExp(pattern)
    const isValid = validationRegex.test(email)
    const domain = (email.split('@') || [])[1]
    const isDisposable = dispoableEmails.some(dispDomain => dispDomain === domain)

    return (isValid && !isDisposable)
  },
  isValidPhone (phone) {
    const pattern = '(?:(?:\\+|00)33|0)\\s*[1-9](?:[\\s.-]*\\d{2}){4}'
    const flag = 'g'
    const phoneRegex = new RegExp(pattern, flag)
    const isValid = phoneRegex.test(phone)

    return isValid
  },
  mailer
}
