const cheerio = require("cheerio");
const axios = require("axios");

const URL = "https://dolarhoy.com/cotizaciondolarblue";

async function scrapDolarBlue() {
  try {
    const response = await axios.get(URL);
    const $ = cheerio.load(response.data);
    const values = $(".tile.is-child")
      .map((index, element) => {
        const topic = $(element).find(".topic").text().toLowerCase();
        const value = $(element).find(".value").text().replace("$", "");
        return { [topic]: parseFloat(value) };
      })
      .get();
    const result = values.reduce((acc, value) => Object.assign(acc, value), {});
    return result;
  } catch (err) {
    return { error: err };
  }
}

module.exports = {
  scrapDolarBlue,
};
