const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeTopAnime(page) {
  const url = `https://myanimelist.net/topanime.php?limit=${(page - 1) * 10}`;
  const response = await axios.get(url);
  const $ = cheerio.load(response.data);
  const topAnimeList = [];

  $('.ranking-list').each((index, element) => {
    if (index < 10) {
      const rank = $(element).find('.rank').text().trim();
      const title = $(element).find('.title').text().trim();
      const score = $(element).find('.score').text().trim();
      topAnimeList.push({ rank, title, score });
    }
  });

  return topAnimeList;
}

module.exports = {
  scrapeTopAnime,
};