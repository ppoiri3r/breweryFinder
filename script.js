const kegshoeApp = {};

kegshoeApp.url = 'https://api.openbrewerydb.org/breweries';

kegshoeApp.init = function() {
  kegshoeApp.getUserSelection();
  kegshoeApp.getBreweries();
}

kegshoeApp.getUserSelection = function() {
  dropDown = document.querySelector('select')
  dropDown.addEventListener('change', function(e) {
    e.preventDefault();
    let selectedState = dropDown.options[dropDown.selectedIndex].value;
    kegshoeApp.getBreweries(selectedState)

    kegshoeApp.ulEl.innerHTML = "";
  })
}

kegshoeApp.getBreweries = function(state) {
  const breweryApiUrl = new URL(kegshoeApp.url)
  breweryApiUrl.search = new URLSearchParams({
    by_state: state,
    per_page: 50
  })
  fetch(breweryApiUrl)
  .then(function (breweryData) {
    if (!breweryData.ok) {
      throw new error("there was an error in your request");
    }
    return breweryData.json()
  })
  .then(function (breweryDataJson) {
    kegshoeApp.breweries = breweryDataJson;
    kegshoeApp.displayBreweries(kegshoeApp.breweries)
  })
}

kegshoeApp.displayBreweries = function() {

  kegshoeApp.breweries.forEach(function(item) {
    const liEl = document.createElement('li');
    
    const h3El = document.createElement('h3');
    h3El.textContent = `${item.name}`
    
    const h4El = document.createElement('h4');
    if (item.street === null) {
      h4El.textContent = `Street address not available`;
    } else {
      h4El.textContent = `${item.street}`
    };

    const pEl = document.createElement('p')
    pEl.innerText = `${item.city}, ${item.state}`
    
    liEl.appendChild(h3El)
    liEl.appendChild(h4El)
    liEl.appendChild(pEl)

    kegshoeApp.ulEl = document.querySelector('ul');
    kegshoeApp.ulEl.appendChild(liEl);
  });
}

kegshoeApp.init();