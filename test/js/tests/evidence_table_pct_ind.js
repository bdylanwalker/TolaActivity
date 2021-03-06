import IndPage from '../pages/indicators.page'
import LoginPage from '../pages/login.page'
import NavBar from '../pages/navbar.page'
import TargetsTab from '../pages/targets.page'
import Util from '../lib/testutil'

/**
 * Indicator evidence table: percentage indicator config and display
 * Tests from mc/issues/115
 */
describe('Indicator evidence percent indicators', function() {
  // Disable timeouts
  this.timeout(0)

  before(function() {
    browser.windowHandleMaximize()
    let parms = Util.readConfig()

    LoginPage.open(parms.baseurl)
    if (parms.baseurl.includes('mercycorps.org')) {
      LoginPage.username = parms.username
      LoginPage.password = parms.password
      LoginPage.login.click()
    } else if (parms.baseurl.includes('localhost')) {
      LoginPage.googleplus.click()
      if (LoginPage.title != 'TolaActivity') {
        LoginPage.gUsername = parms.username + '@mercycorps.org'
        LoginPage.gPassword = parms.password
      }
    }
  })
  it('should take the LoP target of a C percentage indicator from LoP target field')
  it('should take the LoP actual of a C percentage indicators from the latest target actual')
  it('should display a % Met value for the LoP row of C percentage indicators')
  it('should display “N/A” for % Met in intermediate target rows of C percentage indicators')
})


