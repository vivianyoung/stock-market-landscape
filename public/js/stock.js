// stock class
function Stock(data, dataJSON, color, padding) {
  this.padding = padding;

  this.display = function() {
    // startup display
    if (data != undefined) {
      this.shape();
    }
  }

  this.shape = function() {
    let count = 21;

    // begin shape
    fill(color);
    noStroke();
    beginShape();
    vertex(0, innerHeight);

    for (let i = 0; i <= 1.1; i += 0.05) {
      let high = dataJSON[data.timeSeries][data.dateKeys[count]]["2. high"];
      let x_coor = innerWidth * i;

      // mapping price to pixels
      high = map(high, data.priceRange[0], data.priceRange[1], 0, innerHeight * this.padding);
      vertex(floor(x_coor), high);

      count--;
    }

    vertex(innerWidth, innerHeight);
    vertex(0, innerHeight);
    endShape();
  }

}
