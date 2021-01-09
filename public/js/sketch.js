let screenWidth;
let screenHeight;

let ticker = '';

let data = {};
let dataJSON = {};

let bgCol;
let r,g,b;

let errorMsg = 'error';
let loadingMsg = 'loading ...';
let messageElement;

let stocks = [];

let searchInput;
let searchButton;

async function setup() {
  // initializing the screen's width and height
  screenWidth = innerWidth;
  screenHeight = innerHeight;

  createCanvas(screenWidth,screenHeight);

  // if there is no data, get random background base color
  if (Object.keys(data).length == 0) {
    r = int(random(150,255));
    g = int(random(0,150));
    b = int(random(80,255));

    bgCol = color(r,g,b);
  }

  // set up background
  // get analogic color
  await getAnalogicColor(`${r},${g},${b}`)
    .then(rgbColor => {
      // set background gradient
      gradient(0,0, screenWidth, screenHeight, bgCol, rgbColor);
      // setNoise(r,g,b, screenWidth, screenHeight);
    });

  // initialize message box
  messageElement = createElement('p').id('message');
  messageElement.position(screenWidth/2, screenHeight/2);
  messageElement.addClass('hidden');

  // display top left stocks menu
  displayStocksMenu();

  // display stock shapes
  for (let stockName in data){
    let stockObj = data[stockName];
    stockObj.display();
  }

  // when the user searches for a new stock
  searchButton.mousePressed(getData)
  searchInput.changed(getData);
}

function draw() {

}

function keyPressed() {
  // clear all stocks and stockData when user presses 'c'
  if (keyCode == 67) {
    stocks = [];
    ticker = '';

    data = {};
    dataJSON = {};

    bgCol = null;
    r,g,b = null;

    messageElement = null;

    setup();
  }
}

function getData() {
  let newTicker = searchInput.value().toUpperCase();
  if (newTicker == ticker) {
    return;
  }

  // save ticker
  ticker = newTicker;
  stocks.push(ticker);

  let stockData = new Data(ticker);
  let stockDataJSON = loadJSON(stockData.url, gotData);
  let stockObj = new Stock(stockData, stockDataJSON, [random(0,255),random(0,255),random(0,255)]);

  dataJSON[ticker] = stockDataJSON;
  data[ticker] = stockObj;

  // add loading message
  messageElement.removeClass('hidden');
  messageElement.html(loadingMsg);

  // add graph on API call
  function gotData() {
    try {
      messageElement.addClass('hidden');
      stockData.parseData(stockDataJSON);

      searchButton.remove();
      searchInput.remove();

      setup();
    } catch {
      messageElement.html(errorMsg);
    }
  }

}

function displayStocksMenu() {
  // add top left menu
  let menuDiv = createElement('div').id('menu-div');
  menuDiv.position(50, 30);

  // add search div with search bar and search button
  let searchDiv = createElement('div').id('search-div');
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
