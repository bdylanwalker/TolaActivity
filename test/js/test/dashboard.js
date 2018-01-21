var webdriver = require('selenium-webdriver');
var until = require('selenium-webdriver').until;
var test = require('selenium-webdriver/testing');
var assert = require('chai').assert;
var expect = require('chai').should;
var fs = require('fs');
let el;

function readConfig() {
  let data = fs.readFileSync('config.json');
    return JSON.parse(data);
};
    
async function newTolaSession(parms) {
  driver = new webdriver.Builder()
  .forBrowser(parms.browser)
  .build();
  await driver.get(parms.baseurl);
  el = await driver.getTitle();
  assert.equal(el, 'Mercy Corps Sign-On', el);
}

async function newTolaLogin(parms) {
  el = await driver.findElement({name: 'login'});
  await el.sendKeys(parms.username);

  el = await driver.findElement({name: 'password'});
  await el.sendKeys(parms.password);

  el = await driver.findElement({className: 'inputsub'})
  await el.click();
}

test.describe('TolaActivity Dashboard', function() {
  var parms = readConfig();

  test.before(async function() {
    await newTolaSession(parms);
  });

  test.after(function() {
    driver.quit();
  });

  test.it('should require login authentication', async function() {
    await newTolaLogin(parms);
  });

  test.it('should have home page link', function() {
		let sel = 'body > nav > div > div.navbar-header > a > img';
    el = driver.wait(until.elementLocated({css: sel}));
    assert(el.click());
  });

  test.it('should have page header', function() {
    el = driver.wait(until.elementLocated({css: 'h4'}));
    assert(el.getText(), 'Tola-Activity Dashboard');
  });

  test.it('should have a TolaActivity link', function() {
    let xp = '/html/body/nav/div/div[1]/a/img';
    el = driver.wait(until.elementLocated({xpath: xp}));
    assert(el.click());
  });

  test.it('should have a Country Dashboard dropdown', function() {
    el = driver.wait(until.elementLocated({id: 'dropdownMenu1'}));
    assert(el.click());
  });

  test.it('should have a Filter by Program link', function() {
    el = driver.wait(until.elementLocated({id: 'dropdownMenu3'}));
    assert(el.click());
  });

  test.it('should have a Workflow dropdown', function() {
    let xp = '/html/body/nav/div/div[2]/ul[1]/li[1]/a';
    el =  driver.wait(until.elementLocated({xpath: xp}));
    assert(el.click());
  });

  test.it('should have a Form Library dropdown', async function() {
    el = await driver.findElement({linkText: 'Form Library'})
      .then(function(el) {
        assert(el.click());
      });
  });
  
  test.it('should have a Reports link', async function() {
    el = await driver.findElement({linkText: 'Reports'})
      .then(function(el) {
        assert(el.click());
      });
  });

  test.it('should have a Profile link', async function() {
    let xp = '/html/body/nav/div/div[2]/ul[2]/li[1]/a';
    el = await driver.findElement({xpath: xp})
      .then(function(el) {
        assert(el.click());
      });
  });

  test.it('should have a Bookmarks link', async function() {
    let xp = '/html/body/nav/div/div[2]/ul[2]/li[2]/a';
    el = await driver.findElement({xpath: xp})
      .then(function(el) {
        assert(el.click());
      });
  });

  // TODO: Unable to reliably select this element
  test.describe('Indicator Evidence panel', function() {
    test.it.skip('should be present on dashboard');
  }); // end indicator evidence panel tests

  // TODO: Unable to reliably select this element
  test.describe('Strategic Objectives panel', function() {
    test.it.skip('should be present on dashboard');
  }); // end strategic objectives panel tests

  test.describe('Sites panel', async function() {
    test.it.skip('should be present on dashboard');
    test.it.skip('should show map of country selected in Country Dashboard dropdown');
    test.it.skip('should be able to zoom in on the map');
    test.it.skip('should be able to zoom out on the map');
    test.it.skip('should display data points on the Sites map');
  }); // end sites panel tests

  test.describe('Program Projects by Status panel', async function() {
    test.it.skip('should be present on dashboard');
    test.it.skip('should have a project status chart');
  }); // end program projects by status tests

  test.describe('Indicators performance panel', async function() {
    test.it.skip('should be present on dashboard');
    test.it.skip('should have a KPI status chart');
  }); // end indicators performance panel tests
});