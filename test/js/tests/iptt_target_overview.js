import IpttPage from '../pages/iptt.page'
import LoginPage from '../pages/login.page'
import Util from '../lib/testutil'
import { expect } from 'chai'

/**
 * IPTT report: Program target overview quickstart
 * Tests from mc/issues/119
 */
describe('IPTT: Program target overview quickstart', function() {
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

  it('should exist', function () {
    IpttPage.open()
    expect('Indicator Performance Tracking Table' === IpttPage.title)
    expect('Program target overview' === IpttPage.quickstart('target'))
  })

  it('should have a Target Periods dropdown', function() {
    IpttPage.TargetOverviewTargetPeriods.click()
    IpttPage.TargetOverviewTargetPeriods.click()
  })

  it('should have a Program dropdown', function() {
    IpttPage.TargetOverviewProgram.click()
    IpttPage.TargetOverviewProgram.click()
  })

  it('should allow to select time frame', function() {
    let elem = IpttPage.TargetOverviewTimeFrame
    expect(undefined !== elem)
    expect(null !== elem)
  })

  it('should default time frame to Show all', function() {
    // 1 = Show all periods
    // 2 = Show N most recent periods
    let val = IpttPage.TargetOverviewTimeFrame
    expect(1 === val)
  })

  it('should have a View Report button', function() {
    IpttPage.open()
    let elem = IpttPage.TargetOverviewViewReport
    expect(undefined !== elem)
    expect(null !== elem)

  })

  it('should allow to specify N recent time periods', function() {
    IpttPage.open()
    //FIXME: magic number
    IpttPage.TargetOverviewProgram = 2
    IpttPage.TargetOverviewTargetPeriods = 'Annual'
    IpttPage.TargetOverviewTimeFrame = 'Most recent'
    let val = IpttPage.TargetOverviewTimeFrame
    //FIXME: magic number
    expect(2 === val)
  })

  it('should require choosing a program to create report', function() {
    IpttPage.open()
    // Select a target period but not a program
    IpttPage.TargetOverviewTimePeriods = 'Annual'
    let val = IpttPage.TargetOverviewViewReport.disabled
    expect('disabled' === val)
  })

  it('should require choosing a target period to create report', function() {
    IpttPage.open()
    // Select a program but not a target period
    //FIXME: magic number
    IpttPage.TargetOverviewProgram = 2
    let val = IpttPage.TargetOverviewViewReport.disabled
    //expect('disabled' === IpttPage.TargetOverviewViewReport.disabled)
    expect('disabled' === val)
  })

  //FIXME: get webdriver code out of test
  it('should create report if all params correctly specified', function() {
    IpttPage.open()
    //FIXME: magic number
    IpttPage.TargetOverviewProgram = 2
    IpttPage.TargetOverviewTimePeriods = 'Years'
    IpttPage.TargetOverviewViewReport.click()
    // If the table isn't there, we didn't make a report
    expect(true === browser.isVisible('table#iptt_table'))
  })

  //FIXME: get webdriver code out of test
  it('should open report with filter panel open', function() {
    expect(true === browser.isVisible('form#id_form_target_filter'))
  })
})
