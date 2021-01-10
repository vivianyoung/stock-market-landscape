function Data(ticker) {
  let numDays = 30;
  let apiKey = "9YX3DJ3VFRPJ05J4";
  this.url = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol="+ticker+"&apikey="+apiKey;
  this.dateKeys = [];
  this.priceRange = [];
  this.timeSeries = "Time Series (Daily)";

  // returns data for graphing
  this.parseData = function(json) {
    try {
      // temporary array for date data
      let dateTemp = [];
      for (let i in json) {
        for (let j in json[i]) {
          dateTemp.push(j);
        }
      }

      // remove metadeta
      for (let i = 5; i < dateTemp.length; i++) {
        this.dateKeys.push(dateTemp[i]);
      }

      // gets lowest and highest price in past number of days
      this.lowest = Number.MAX_VALUE;
      this.highest = Number.MIN_VALUE;
      for (let i = 0; i < numDays; i++) {
        if (parseFloat(json[this.timeSeries][this.dateKeys[i]]["2. high"]) > this.highest) {
          this.highest = parseFloat(json[this.timeSeries][this.dateKeys[i]]["2. high"]);
        }

        if (parseFloat(json[this.timeSeries][this.dateKeys[i]]["3. low"]) < this.lowest) {
          this.lowest = parseFloat(json[this.timeSeries][this.dateKeys[i]]["3. low"]);
        }
      }

      // If the range between the high and low is less than 5, the labels
      // increase by 1.
      if (this.highest - this.lowest < 5) {
        this.priceLabels = [Math.floor(this.lowest + 5)+".00",
        Math.floor(this.lowest + 4)+".00",
        Math.floor(this.lowest + 3)+".00",
        Math.floor(this.lowest + 2)+".00",
        Math.floor(this.lowest + 1)+".00",
        Math.floor(this.lowest)+".00"];

        this.priceRange = [Math.floor(this.lowest - 1),
          Math.floor(this.lowest + 6)];
      }

      // If the range between the high and low is more than 5, the labels
      // increase by a percentage of its range.
      else {
        let rangeDiv = Math.ceil((this.highest - this.lowest)/6);
        this.priceLabels = [Math.floor(this.lowest + (rangeDiv * 5))+".00",
        Math.floor(this.lowest + (rangeDiv * 4))+".00",
        Math.floor(this.lowest + (rangeDiv * 3))+".00",
        Math.floor(this.lowest + (rangeDiv * 2))+".00",
        Math.floor(this.lowest + (rangeDiv))+".00",
        Math.floor(this.lowest)+".00"];

        this.priceRange = [Math.floor(this.lowest - (rangeDiv)),
          Math.floor(this.lowest + (rangeDiv * 6))];
      }
    } catch (err) {
      console.log(err);
      menuDiv.remove();
      reset();
    }
  }
}
