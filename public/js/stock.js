function Stock(data, dataJSON, colorArray) {
  this.fillColor = color(colorArray[0], colorArray[1], colorArray[2]);

  this.display = function() {
    // startup display
    if (data != undefined) {
      this.shape();
    }
  }

  this.shape = function() {
    let bottomPadding = 0.1;
    let count = 21;
    
    // begin shape
    fill(this.fillColor);
    noStroke();
    beginShape();
    vertex(0, innerHeight);

    for (let i = 0; i <= 1.1; i += 0.05) {
      let high = dataJSON[data.timeSeries][data.dateKeys[count]]["2. high"];
      let x_coor = innerWidth * i;

      // mapping price to pixels
      high = map(high, data.priceRange[0], data.priceRange[1], innerHeight, innerHeight * bottomPadding);
      vertex(floor(x_coor), high);

      count--;
    }

    vertex(innerWidth, innerHeight);
    vertex(0, innerHeight);
    endShape();
  }

}
