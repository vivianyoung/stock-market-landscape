let screenWidth;
let screenHeight;

let bgCol1;
let bgCol2;

async function setup() {
  // initializing the screen's width and height
  screenWidth = innerWidth;
  screenHeight = innerHeight;

  createCanvas(screenWidth,screenHeight);

  // initialize background
  // choose a random base color
  let r = int(random(50,255));
  let g = int(random(50,255));
  let b = int(random(50,255));

  bgCol1 = color(r,g,b);

  // get analogic color
  await getAnalogicColor(`${r},${g},${b}`)
    .then(rgbColor => {
      bcCol2 = rgbColor;
      // set background gradient
      gradient(0,0, screenWidth, screenHeight, bgCol1, rgbColor);
    });
}

function draw() {

}
