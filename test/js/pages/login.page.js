/**
 * Page model and methods for dealing with the MercyCorps
 * SSO login page
 * @module LoginPage
 */
import Page from './page'

// Milliseconds
const delay = 1000

class LoginPage extends Page {
  // Independent of auth source
  get title () { return browser.getTitle() }

  // These are for authentication using MC's SSO
  get username () { return browser.$('#login') }
  get password () { return browser.$('#password') }
  get login () { return browser.$('.inputsub') }
  get error () { return browser.getText('#error') }

  set username (val) { return browser.$('#login').setValue(val) }
  set password (val) { return browser.$('#password').setValue(val) }

  // These are for authenticating using GoogleAuth on a local instance
  get gUsername () { return browser.$('form').$('input#identifierId') }
  get gPassword () { return browser.$('form').$('input.whsOnd.zHQkBf') }
  get googleplus () { return browser.$('=Google+') }
  get gError () { return browser.$('div.dEOOab.RxsGPe').getText() }

  set gUsername (val) {
    browser.waitForVisible('input#identifierId')
    // Works on chrome and firefox
    browser.$('form').$('input#identifierId').setValue(val)
    browser.waitForVisible('div#identifierNext')
    browser.$('div#identifierNext').click()
    browser.pause(delay)
  }
  set gPassword (val) {
    browser.waitForVisible('input[name="password"]')
    // Works on chrome and firefox
    browser.$('input[name="password"]').setValue(val)
    browser.pause(delay)
    browser.waitForVisible('div#passwordNext')
    browser.$('div#passwordNext').click()
    browser.pause(delay)
    browser.waitUntil(function () {
      let url = browser.getUrl()
      if (url.includes('mercycorps') || url.includes('localhost')) {
        return url
      }
    })
  }

  open (url) { super.open(url) }
}
export default new LoginPage()
