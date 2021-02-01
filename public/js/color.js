// constants for color API
const COLOR_API_URL = 'https://www.thecolorapi.com/';

// given a color object, return a dictionary with string and int array values
function parseColor(color) {
  let data = {};

  let colorString = color.toString();
  let regex = /rgba\((\d+),(\d+),(\d+),(\d+)\)$/gm;
  let match = regex.exec(colorString);

  let red = match[1];
  let green = match[2];
  let blue = match[3];

  data['string'] = `${red}, ${green}, ${blue}`;
  data['int array'] = [int(red), int(green), int(blue)]

  return data;
}

// gets analogic color rgb given a rgb color string
async function getColor(rgbString, colorMode) {
  let count = 5;
  let resultRGB;
  let chosenColor;

  let url = COLOR_API_URL + `scheme?rgb=${rgbString}&mode=${colorMode}&count=${count}&format=json`

  await axios.get(url)
    .then(response => {
      let colors = response['data']['colors'];

      switch (colorMode) {
        case 'monochrome-dark':
          chosenColor = colors[1];
          break;
        default:
          chosenColor = random(colors);
      }

      let r = chosenColor['rgb']['r'];
      let g = chosenColor['rgb']['g'];
      let b = chosenColor['rgb']['b'];
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
