function reset() {
  stocks = [];
  ticker = '';

  data = {};
  dataJSON = {};

  bgCol = null;
  r,g,b = null;
  sunColor = null;

  searchButton.remove();
  searchInput.remove();
  menuDiv.remove();
  searchDiv.remove();
  messageElement.remove();

  setup();
}

function displayStocksMenu() {
  deleteAllMenus();

  // add top left menu
  menuDiv = createElement('div').id('menu-div').class('menu');
  menuDiv.position(50, 30);

  // add search div with search bar and search button
  searchDiv = createElement('div').id('search-div');
  searchDiv.parent(menuDiv);

  searchInput = createInput().id('search-input')
  searchInput.parent(searchDiv);
  searchInput.value(ticker);

  searchButton = createElement('button').id('search-button');
  searchButton.parent(searchDiv);

  // display stock names
  let stocksDiv = createElement('div').id('stocks-div');
  stocksDiv.parent(menuDiv);

  for (let i = 0; i < stocks.length; i++){
    let stockName = stocks[i];
    let stockElement = createElement('p').class('stock-name').id(`stock-${stockName}`);
    stockElement.html(stockName);
    stockElement.parent(stocksDiv);
  }
}

async function getData() {
  let newTicker = searchInput.value().toUpperCase();

  if (stocks.includes(newTicker)) {
    return;
  }

  // save ticker
  ticker = newTicker;
  stocks.push(ticker);

  // decide on color
  let currStockColorString = parseColor(currStockColor)['string'];

  await getColor(currStockColorString, 'monochrome-dark')
  // await getColor(currStockColorString, 'analogic-complement')
    .then(rgbColor => {
      let stockData = new Data(ticker);
      let stockDataJSON = loadJSON(stockData.url, gotData);
      let stockObj = new Stock(stockData, stockDataJSON, rgbColor, stockPadding);

      dataJSON[ticker] = stockDataJSON;
      data[ticker] = stockObj;

      // add loading message
      messageElement.removeClass('hidden');
      messageElement.html(loadingMsg);

      currStockColor = rgbColor;

      // add shape on API call
      function gotData() {
        try {
          messageElement.addClass('hidden');
          stockData.parseData(stockDataJSON);

          menuDiv.remove();
          messageElement.remove();

          setup();
        } catch (err) {
          console.log(err);
          reset();
        }
      }
    });
}

function drawSun() {
  // let fillColor = color(212,235,110);
  let fillColor = sunColor;

  noStroke();
  fill(fillColor);
  ellipse(sunX,sunY,sunR,sunR);
}

function deleteAllMenus() {
  // delete duplicate menus
  let menus = document.getElementsByClassName('menu');
  if (menus.length > 0) {
    for (let i = 0; i < menus.length; i++) {
      menus.item(i).remove();
    }
  }
}

function deleteAllMessages() {
  // delete duplicate menus
  let messages = document.getElementsByClassName('message');
  if (messages.length > 0) {
    for (let i = 0; i < messages.length; i++) {
      messages.item(i).remove();
    }
  }
}
