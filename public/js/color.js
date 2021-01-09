// constants for color API
const COLOR_API_URL = 'https://www.thecolorapi.com/';

// gets analogic color rgb given a rgb color string
async function getAnalogicColor(rgbString) {
  let resultRGB;
  let url = COLOR_API_URL + `scheme?rgb=${rgbString}&mode=analogic&count=2&format=json`

  await axios.get(url)
    .then(response => {
      let colors = response['data']['colors'];
      let r = colors[1]['rgb']['r'];
      let g = colors[1]['rgb']['g'];
      let b = colors[1]['rgb']['b'];
      resultRGB = color(r,g,b);
    })
    .catch(error => {
      console.error(error);
    });

  return resultRGB;
}

// creates a gradient between two colors
function gradient(x,y,w,h,c1,c2) {
  noFill();

  for (var i = y; i<=y+h; i++) {
    var inter = map(i,y,y+h, 0,1);
    var c = lerpColor(c1, c2, inter);
    stroke(c);
    line(x,i,x+w,i)
  }
}

// adds noise/grain to background
function setNoise(r, g, b, screenWidth, screenHeight) {
  let colorOffset = 50;
  loadPixels();
  for (let x = 0; x < screenWidth; x++ ) {
    for (let y = 0; y < screenHeight; y++ ) {
      if (random(1) > 0.9) {
        const index = (x + y * screenWidth) * 20;
        pixels[index] = r + colorOffset;
        pixels[index + 1] = g + colorOffset;
        pixels[index + 2] = b + colorOffset;
        pixels[index + 3] = 255;
      }
    }
  }
  updatePixels();
}
