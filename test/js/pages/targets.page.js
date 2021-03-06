/**
 * Page model for testing the Program Indicators screen.
 * @module Targets
 */
import Util from '../lib/testutil'
const msec = 1000

let parms = Util.readConfig()
parms.baseurl += '/indicators/home/0/0/0'

/**
 * Add num target periods to the targets list, or 1 target period if num
 * not specified
 * @param {integer} num The number of target periods to add
 * @returns {integer} The total number of target periods added
 */
function addTarget (num = 1) {
  let link = browser.$('a#addNewPeriodicTarget')
  let cnt = 0

  while (cnt < num) {
    link.click()
    cnt++
  }
  return cnt
}

/**
 * Click the Direction of change dropdown
 * @returns {Nothing}
 */
function clickDirectionOfChange () {
  browser.$('select#id_direction_of_change').click()
}

/**
 * Click the percent radio button to set an indicator as a percentage indicator
 */
function clickNumberType () {
  let control = browser.$('div#div_id_unit_of_measure_type_0')
  control.click()
}

/**
 * Click the number radio button to set an indicator as a number indicator
 */
function clickPercentType () {
  let control = browser.$('div#div_id_unit_of_measure_type_1')
  control.click()
}

/***
 * Click the Reset button on the current form to clear any changes
 * @returns Nothing
 */
function clickResetButton () {
  browser.$('input[value="Reset"]').click()
}

/**
 * Click the Targets tab of the indicator detail modal or page
 * @returns Nothing
 */
function clickTargetsTab () {
  let targetsTab = browser.$('=Targets')
  targetsTab.click()
}

/**
 * Set the value of the Direction of change dropdown
 */
function setDirectionOfChange (dir = 'none') {
  let val
  if (dir === 'none') { val = 1 }
  if (dir === 'pos') { val = 2 }
  if (dir === 'neg') { val = 3 }
  browser.$('select#id_direction_of_change').selectByValue(val)
}

/**
 * Get the current value of the target baseline from the indicators detail screen
 * @returns {integer} The current value of the Baseline text field
 */
function getBaseline () {
  clickTargetsTab()
  let val = browser.$('input#id_baseline').getValue()
  return val
}

/**
 * Get the contents of the error hint for Baseline value conformance
 * errors
 * @returns {string} The contents of the hint as a string
 */
function getBaselineErrorHint () {
  let errorBox = browser.$('span#validation_id_baseline_na')
  let errorHint = errorBox.getText()
  return errorHint
}

/**
 * Get the direction of change fom the direction of change dropdown
 * @returns String representation of value of the dropdown
 */
function getDirectionOfChange () {
  let dropdown = browser.$('select#id_direction_of_change')
  let changeDir = dropdown.getValue()
  if (changeDir === 1) { return 'none' }
  if (changeDir === 2) { return 'pos' }
  if (changeDir === 3) { return 'neg' }
}

/**
 * Get the target date ranges created for given indicator
 * @returns {Array<string>} an array of hyphen-separated start and end dates
 */
function getTargetDateRanges () {
  browser.pause(msec)
  browser.scroll('h3')
  let placeholder = browser.$('div#id_div_periodic_tables_placeholder')
  let targetsDiv = placeholder.$('div#periodic-targets-tablediv')
  if (!browser.isVisible('table#periodic_targets_table')) {
    browser.waitForVisible('table#periodic_targets_table')
  }
	let targetsTable = targetsDiv.$('table#periodic_targets_table')
  let rows = targetsTable.$$('tbody>tr.periodic-target')

  let dateRanges = []
  for (let row of rows) {
    let dateRange = row.$('div').getText()
    dateRanges.push(dateRange.trim())
  }
  return dateRanges
}

/**
 * Get the current indicator name (from the Performance tab)
 * @returns {string} The current value of the indicator name from the Performance
 * tab of the indicator detail screen
 */
function getIndicatorName () {
  clickTargetsTab()
  browser.scroll('input#id_name')
  let val = browser.$('input#id_name').getValue()
  return val
}

/**
 * Get the contents of the error hint for LoP tarbet conformance errors
 * @returns {string} The contents of the hint as a string
 */
function getLoPErrorHint () {
  let errorBox = browser.$('span#validation_id_lop_target')
  let errorHint = errorBox.getText()
  return errorHint
}

/**
 * Get the current LoP target from the the target indicators detail page
 * @returns {integer} The current value of the LoP target field
 */
function getLoPTarget () {
  let val = browser.$('input#id_lop_target').getValue()
  return val
}

function getLoPTargetActual () {
  let val = browser.$('span#id_span_loptarget').getText()
  return val
}

function getNumberType () {
  let val = browser.$('div#div_id_unit_of_measure_type_0').getText()
  return val
}

function getPercentType () {
  let val = browser.$('div#div_id_unit_of_measure_type_1').getText()
  return val
}

/**
 * Get the number of events specified for event-based targets
 * @returns {integer} The number of events specified
 */
function getNumTargetEvents () {
  let val = browser.$('input#target_frequency_custom').getValue()
  return val
}

/**
 * Get the text, if any, from the error box beneath the number of
 * events text box
 * @returns {string} The error text as a string
 */
function getNumTargetEventsErrorHint () {
  let errorBox = browser.$('span#validation_id_target_frequency_num_periods')
  let errorHint = errorBox.getText()
  return errorHint
}

/**
 * Get the current value of the "Number of target periods" field on the
 * target indicators detail page
 * @returns {integer} The value of the field, if any
 */
function getNumTargetPeriods () {
  browser.waitForExist('input#id_target_frequency_num_periods')
  let val = browser.$('input#id_target_frequency_num_periods').getValue()
  return val
}

/**
 * Get the text, if any, from the error box beneath the number of
 * events text bo
 * @returns {string} The error text as a string
 */
function getNumTargetPeriodsErrorHint () {
  let errorBox = browser.$('span#validation_target_frequency_num_periods')
  let errorHint = errorBox.getText()
  return errorHint
}

/**
 * Get a list of the program indicator Delete buttons for the program
 * currently displayed in the program indicators table
 * @returns {Array<clickable>} An array of clickable program indicator
 * "Delete" button objects
 */
function getProgramIndicatorDeleteButtons () {
  let link = browser.$('div#div-id-indicator-list').$('div.card-body').$('a')
  let dataTarget = link.getAttribute('data-target')
  Util.waitForAjax()
  let table = browser.$('div' + dataTarget).$('table')
  let rows = table.$$('a[href*=indicator_delete]')
  return rows
}

/**
 * Get a list of the program indicators Edit buttons for the program
 * currently displayed in the program indicators table
 * @returns {Array<clickable>} An array of clickable program indicator
 * "Edit" button objects
 */
function getProgramIndicatorEditButtons () {
  let link = browser.$('div#div-id-indicator-list').$('div.card-body').$('a')
  let dataTarget = link.getAttribute('data-target')
  Util.waitForAjax()
  let table = browser.$('div' + dataTarget).$('table')
  let rows = table.$$('a[href*=indicator_update]')
  return rows
}

/**
 * Get a list of the program indicators for the program currently displayed in
 * the program indicators table
 * @returns {Array<clickable>} An array of clickable program indicators
 * to the on the "Delete" button
 */
// FIXME: should probably returns linkage to all the buttons and links?
function getProgramIndicatorsTable () {
  let link = browser.$('div#div-id-indicator-list').$('div.card-body').$('a')
  let dataTarget = link.getAttribute('data-target')
  Util.waitForAjax()
  let table = browser.$('div' + dataTarget).$('table')
  let rows = table.$$('=Delete')
  return rows
}

/**
 * Get the number of program indicators for the program currently
 * displayed in the progams indicats table
 * @returns {integer} The number of program indicators in the table
 * based on the "Delete" key
 */
// FIXME: should probably returns linkage to all the buttons and links?
function getProgramIndicatorsTableCount () {
  let link = browser.$('div#div-id-indicator-list').$('div.card-body').$('a')
  let dataTarget = link.getAttribute('data-target')
  Util.waitForAjax()
  let table = browser.$('div' + dataTarget).$('table')
  let rows = table.$$('=Delete')
  return rows.length
}

/**
 * Get a list of the indicator buttons in the main programs table
 * @returns {Array<buttons>} returns an array of clickable "buttons",
 * which are actually anchor (<a />) elements, from the programs table
 */
function getProgramIndicatorButtons () {
  let rows = browser.$('div#div-id-indicator-list').$$('.card-body')
  let buttons = []
  for (let row of rows) {
    buttons.push(row.$('*=program indicators'))
  }
  return buttons
}

/**
 * Get a list of the program names in the main Program table
 * @returns {Array<string>} An array of the text strings of the
 * program names in the programs table
 */
function getProgramsTable () {
  let rows = browser.$('div#div-id-indicator-list').$$('div.panel-heading')
  let programs = []
  for (let row of rows) {
    programs.push(row.$('h4').getText())
  }
  return programs
}

/**
 * Return the value of the Sum of targets field on the indicator
 * creation detail form
 * @returns {Integer} The value of the sum of targets field
 */
function getSumOfTargets () {
  let sum = browser.$('span#id_span_targets_sum').getText()
  return sum
}

/**
 * Get the current error string, if any, from the error box for
 * the target first event name field on the targets tab of the
 * indictor detail screen
 * @returns {string} The error text present, if any
 */
function getTargetFirstEventErrorHint () {
  let errorBox = browser.$('#validation_id_target_frequency_custom')
  let errorHint = errorBox.getText()
  return errorHint
}

/**
 * Get the current error string, if any, from the error box for
 * the target first period field on the targets tab of the
 * indictor detail screen
 * @returns {string} The error text present, if any
 */
function getTargetFirstPeriodErrorHint () {
  let errorBox = browser.$('#validation_id_target_frequency_start')
  let errorHint = errorBox.getText()
  return errorHint
}

/**
 * Get the currently selected target frequency from the Target Frequency
 * dropdown
 * @returns {string} The currently selected target frequency as a text string
 */
function getTargetFrequency () {
  clickTargetsTab()
  let val = browser.$('select#target_frequency').getValue()
  if (val === 0) {
    return '---------'
  } else {
    let list = browser.$('select#target_frequency').getText()
    let rows = list.split('\n')
    let result = rows[val]
    return result.trim()
  }
}

/**
 * Get a list of the target value input boxes on a target entry form
 * @returns {Array} A list of input target value input boxes on the
 * current target entry form
 */
function getTargetInputBoxes () {
  // Find the input boxes
  let inputBoxes = browser.$$('input#pt-.form-control.input-value')
  return inputBoxes
}

/**
 * Get the current error string, if any, from the target creation
 * screen on the Targets tab
 * @returns {string} The error text present, if any
 */
function getTargetValueErrorHint () {
  let errorBox = browser.$('span.target-value-error')
  let errorHint = errorBox.getText()
  return errorHint
}

/**
 * Get the current value of the Unit of measure text field
 * @returns {integer} The current value as an integer
 */
function getUnitOfMeasure () {
  let val = browser.$('input#id_unit_of_measure').getValue()
  return val
}

function getMeasureIsCumulative () {
  browser.pause(msec)
  browser.scroll('input#submit-id-submit')

  let val = browser.$('input#id_is_cumulative_1').getValue()
  if (val === 3) { return true }
  if (val === 4) { return false }
}

function getMeasureType () {
  let element = browser.$('input[name="unit_of_measure_type"]')
  let val = element.getValue()
  return val
}

/**
 * Open the specified page in the browser
 * @param {string} url The URL to display in the browser defaults
 * to the baseurl value from the config file
 * @returns Nothing
 */
function open (url = parms.baseurl) {
  browser.url(url)
}

// FIXME: This should be a property
/**
 * Return the page title
 * @returns {string} The title of the current page
 */
// function getPageName () {
//   // On this page, the "title" is actually the <h2> caption
//   return browser.$('h2').getText()
// }

/**
 * Click the "Save changes" button on the Indicator edit screen
 * @returns Nothing
 */
function saveIndicatorChanges () {
  if (browser.isVisible('div.alert')) {
    browser.waitForVisible('div.alert', true)
  }
  if (browser.isVisible('div#alerts')) {
    browser.waitForVisible('div#alerts', true)
  }
  if (browser.isVisible('.col-md-6.text-left')) {
    browser.execute('$(".col-md-6.text-left").hide()')
  }
  if (browser.isVisible('.col-md-6.text-right')) {
    browser.execute('$(".col-md-6.text-right").hide()')
  }
  browser.scroll('input#submit-id-submit')
  browser.$('input#submit-id-submit').click()
}

/**
 * Type a baseline value into the baseline text field on the Targets
 * tab unless the "Not applicable" check box has been checked
 * @param {integer|boolean} value The non-negative integer baseline
 * value. If set to false, ignore the baseline requirement and check
 * the "Not applicable" check box
 * @returns Nothing
 */
function setBaseline (value) {
  clickTargetsTab()
  let baseline = browser.$('input#id_baseline')
  baseline.setValue(value)
}

/**
 * Click the "Not applicable" checkbox for baseline targets on the
 * indicator detail form
 * @returns Nothing
 */
function setBaselineNA () {
  clickTargetsTab()
  browser.$('#id_baseline_na').click()
}

/**
 * Set the endline target on the targets detail screen to the
 * specifed value
 * @param {integer} value The value to set
 * @returns Nothing
 */
function setEndlineTarget (value) {
  clickTargetsTab()
  if (!browser.isVisible('input[name="Endline"]')) {
    browser.waitForVisible('input[name="Endline"]')
  }
  let endline = browser.$('input[name="Endline"]')
  endline.setValue(value)
}

/**
 * Set the name of the first event to the specified value when
 * working with event-based periodic targets
 * @param {integer} value The value to set
 * @returns Nothing
 */
function setFirstEventName (value) {
  let textBox = browser.$('input#id_target_frequency_custom')
  if (0 === value) {
    textBox.clear()
  } else {
    textBox.setValue(value)
  }
}

/**
 * Sets the date of the first target period to the 1st day of the
 * current month
 * @returns {Null}
 */
function setFirstTargetPeriod () {
  // Defaults to the current month
  browser.scroll('input#id_target_frequency_start')
  browser.$('input#id_target_frequency_start').click()
  browser.pause(msec)
  if (browser.isVisible('button=Done')) {
    // Works on Chrome but not Firefox/Gecko
    browser.$('button=Done').click()
  } else if (browser.isVisible('button.ui-datepicker-close')) {
    // Works on Firefox/Gecko but not Chrome
    browser.$('button.ui-datepicker-close').click()
  } else {
    // If we get here, make one last blind, unconditional attempt to click
    // the buttons
    try {
      browser.$('button=Done').click()
    }
    catch(NoSuchElementError) {
      browser.$('button.ui-datepicker-close').click()
    }
    return null
  }
}

/**
 * Type the specified indicator name into the Name field on thei
 * Performance tab of the indicator detail screen
 * @param {string} name The new name for the indicator
 * @returns Nothing
 */
function setIndicatorName (name) {
  if (!browser.isVisible('=Summary')) {
    browser.waitForVisible('=Summary')
  }
  let tab = browser.$('=Summary')
  tab.click()
  browser.scroll('input#id_name')
  let indName = browser.$('input#id_name')
  indName.setValue(name)
}

/**
 * Type LoP target value name into "Life of Program (LoP) target" text
 * field on the Targets tab of the indicator edit screen
 * @param {string} name The new name for the indicator
 * @returns Nothing
 */
function setLoPTarget (value) {
  clickTargetsTab()
  let lopTarget = browser.$('input#id_lop_target')
  lopTarget.setValue(value)
}

function setMeasureIsCumulative () {
  browser.pause(msec)
  browser.scroll('input#submit-id-submit')
  // 2 == true == cumulative
  browser.$('input#id_is_cumulative_2').setValue(2)
}

function setMeasureIsNonCumulative () {
  browser.pause(msec)
  browser.scroll('input#submit-id-submit')
  // 3 == cumulative
  browser.$('input#id_is_cumulative_2').setValue(2)
}

/**
 * Set the type of the unit of measure (number or percent)
 * @returns {Nothing}
 */
function setMeasureType (type) {
  clickTargetsTab()
  let element
  browser.pause(msec)
  if (type === 'number') { element = browser.$('input#id_unit_of_measure_type_0') }
  if (type === 'percent') { element = browser.$('input#id_unit_of_measure_type_1') }
  element.click()
}

/**
 * Set the midline target on the targets detail screen to the
 * specifed value
 * @param {integer} value The value to set
 * @returns Nothing
 */
function setMidlineTarget (value) {
  clickTargetsTab()
  if (!browser.isVisible('input[name="Midline"]')) {
    browser.waitForVisible('input[name="Midline"]')
  }
  let midline = browser.$('input[name="Midline"]')
  midline.setValue(value)
}

/**
 * Set the number of events to the specified value when working with
 * event-based periodic targets.
 * @param {integer} value The value to set
 * @returns Nothing
 */
function setNumTargetEvents (value) {
  let textBox = browser.$('input#id_target_frequency_num_periods')
  if (value === 0) {
    textBox.clearElement()
  } else {
    textBox.setValue(value)
  }
}

/**
 * Set the number of periods to the specified value when working with
 * interval-based periodic targets
 * @param {integer} value The value to set
 * @returns Nothing
 */
function setNumTargetPeriods (value) {
  browser.$('input#id_target_frequency_num_periods').setValue(value)
}

/**
 * Select the target frequency from the Target Frequency dropdown on the
 * the Targets tab of the indicator edit screen
 * @param {string} value The target frequency to select from the dropdown
 * @returns Nothing
 */
function setTargetFrequency (freqName) {
  let frequencies = ['', 'Life of Program (LoP) only',
    'Midline and endline', 'Annual', 'Semi-annual',
    'Tri-annual', 'Quarterly', 'Monthly', 'Event']
  let freqValue = frequencies.indexOf(freqName)
  let targetFreq = browser.$('select#id_target_frequency')
  browser.scroll('select#id_target_frequency')
  targetFreq.selectByValue(freqValue)
}

/**
 * Type the unit of measure into the Unit of measure text field on
 * the Targets tab of the indicator edit screen
 * @param {string} unit The new name for the indicator
 * @returns Nothing
 */
function setUnitOfMeasure (unit) {
  clickTargetsTab()
  let bucket = browser.$('input#id_unit_of_measure')
  bucket.setValue(unit)
}

exports.addTarget = addTarget
exports.clickNumberType = clickNumberType
exports.clickPercentType = clickPercentType
exports.clickResetButton = clickResetButton
exports.clickTargetsTab = clickTargetsTab
exports.clickDirectionOfChange = clickDirectionOfChange
exports.getBaseline = getBaseline
exports.getBaselineErrorHint = getBaselineErrorHint
exports.getDirectionOfChange = getDirectionOfChange
exports.getIndicatorName = getIndicatorName
exports.getLoPErrorHint = getLoPErrorHint
exports.getLoPTarget = getLoPTarget
exports.getLoPTargetActual = getLoPTargetActual
exports.getMeasureIsCumulative = getMeasureIsCumulative
exports.getMeasureType = getMeasureType
exports.getNumTargetEvents = getNumTargetEvents
exports.getNumTargetEventsErrorHint = getNumTargetEventsErrorHint
exports.getNumTargetPeriods = getNumTargetPeriods
exports.getProgramIndicatorsTable = getProgramIndicatorsTable
exports.getProgramIndicatorsTableCount = getProgramIndicatorsTableCount
exports.getProgramIndicatorDeleteButtons = getProgramIndicatorDeleteButtons
exports.getProgramIndicatorEditButtons = getProgramIndicatorEditButtons
exports.getProgramIndicatorButtons = getProgramIndicatorButtons
exports.getProgramsTable = getProgramsTable
exports.getSumOfTargets = getSumOfTargets
exports.getTargetDateRanges = getTargetDateRanges
exports.getTargetFirstEventErrorHint = getTargetFirstEventErrorHint
exports.getTargetFirstPeriodErrorHint = getTargetFirstPeriodErrorHint
exports.getTargetFrequency = getTargetFrequency
exports.getTargetInputBoxes = getTargetInputBoxes
exports.getTargetValueErrorHint = getTargetValueErrorHint
exports.getUnitOfMeasure = getUnitOfMeasure
exports.open = open
exports.saveIndicatorChanges = saveIndicatorChanges
exports.setBaseline = setBaseline
exports.setBaselineNA = setBaselineNA
exports.setDirectionOfChange = setDirectionOfChange
exports.setEndlineTarget = setEndlineTarget
exports.setFirstEventName = setFirstEventName
exports.setFirstTargetPeriod = setFirstTargetPeriod
exports.setIndicatorName = setIndicatorName
exports.setLoPTarget = setLoPTarget
exports.setMeasureIsCumulative = setMeasureIsCumulative
exports.setMeasureIsNonCumulative = setMeasureIsNonCumulative
exports.setMeasureType = setMeasureType
exports.setMidlineTarget = setMidlineTarget
exports.setNumTargetEvents = setNumTargetEvents
exports.setNumTargetPeriods = setNumTargetPeriods
exports.setTargetFrequency = setTargetFrequency
exports.setUnitOfMeasure = setUnitOfMeasure
