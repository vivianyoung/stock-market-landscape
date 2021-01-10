let screenWidth;
let screenHeight;

let ticker = '';

let data = {};
let dataJSON = {};

let bgCol;
let r,g,b;

let sunColor = null;

let errorMsg = 'error';
let loadingMsg = 'loading ...';
let messageElement;

let stocks = [];
let currStockColor;
let stockPadding;

let searchInput;
let searchButton;
let menuDiv;
let searchDiv;

async function setup() {
  // initializing the screen's width and height
  screenWidth = innerWidth;
  screenHeight = innerHeight;

  createCanvas(screenWidth,screenHeight);

  // if there is no data
  if (Object.keys(data).length == 0) {
    r = int(random(150,255));
    g = int(random(0,150));
    b = int(random(80,255));

    bgCol = color(r,g,b);
    currStockColor = bgCol;

    stockPadding = 0.7;
  } else {
    stockPadding *= 1.25;
    stockPadding = constrain(stockPadding, 0, 1.0);
  }

  // set up background
  await getColor(`${r},${g},${b}`, 'analogic')
    .then(rgbColor => {
      // set background gradient
      gradient(0,0, screenWidth, screenHeight, bgCol, rgbColor);

      if (sunColor == null) {
        sunColor = rgbColor;
      }
    });

  // initialize message box
  deleteAllMessages();

  messageElement = createElement('p').class('message');
  messageElement.position(screenWidth/2, screenHeight/2);
  messageElement.addClass('hidden');

  // display top left stocks menu
  displayStocksMenu();

  // display stock shapes
  for (let stockName in data){
    let stockObj = data[stockName];
    stockObj.display();
  }

  // draw sun if there are stock shapes
  if (Object.keys(data).length > 0) {
    drawSun();
  }

  // setNoise(r,g,b, screenWidth, screenHeight);

  // when the user searches for a new stock
  searchButton.mousePressed(getData)
  searchInput.changed(getData);
}

function keyPressed() {
  // clear data and restart when user presses the spacebar
  if (keyCode == 32) {
    reset();
  }
}
