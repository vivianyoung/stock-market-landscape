let screenWidth;
let screenHeight;

let ticker = '';

let data = {};
let dataJSON = {};

let bgCol;
let r,g,b;

let sunColor = null;
let sunX, sunY;
let sunR = 120;

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

let instructionsDiv;

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

  deleteAllMessages();
  // create new message box
  messageElement = createElement('p').class('message');
  messageElement.position(screenWidth/2, screenHeight/2);
  messageElement.addClass('hidden');

  displayStocksMenu();
  displayInstructions();

  // display stock shapes
  for (let stockName in data){
    let stockObj = data[stockName];
    stockObj.display();
  }

  // set sun variables
  sunX = screenWidth * 0.8;
  sunY = screenHeight * 0.2;

  // draw sun if there are stock shapes
  if (Object.keys(data).length > 0) {
    drawSun();
  }

  // setNoise(r,g,b, screenWidth, screenHeight);

  // when the user searches for a new stock
  searchButton.mousePressed(getData)
  searchInput.changed(getData);

  console.log(data);
  console.log(dataJSON);
}

function keyPressed() {
  switch (keyCode) {
    // clear data and restart when user presses the spacebar
    case 32:
      reset();
      break;
    // remove last stock when user presses the '-' key
    case 189:
      if (stocks.length > 0) {
        let removedStock = stocks.pop();
        delete data[removedStock];
        delete dataJSON[removedStock];
        ticker = '';
        setup();
      }
      break;
    // toggle instructions box on 'i' key
    case 73:
      console.log('toggle');
      instructionsDiv.toggleClass('hidden');
      break;
  }
}
