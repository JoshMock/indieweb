const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSass = require('eleventy-plugin-sass');
const { DateTime } = require('luxon');
const fetch = require('node-fetch');
const cheerio = require('cheerio');

module.exports = (eleventyConfig) => {
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSass);

  eleventyConfig.addFilter('simpleDate', dateObj => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('yyyy-LL-dd');
  });

  eleventyConfig.addPairedShortcode("quoteback", (text, author, title, url) => `<blockquote class="quoteback" darkmode="" data-title="${title}" data-author="${author}" cite="${url}"><div class="css-1dbjc4n"><div class="css-1dbjc4n r-1s2bzr4"><div dir="auto" class="css-901oao r-1fmj7o5 r-37j5jr r-1blvdjr r-16dba41 r-vrz42v r-bcqeeo r-bnwqim r-qvutc0" id="id__o67yoo50f0g" lang="en"><span class="css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0">${text}</span></div></div></div><footer>${author}</footer></blockquote>`);

  eleventyConfig.addLiquidShortcode("bandcamp", async (url) => {
    const resp = await fetch(url);
    const $ = cheerio.load(await resp.text());
    const embed = $('meta[property="og:video"]').attr('content');
    const title = $('meta[property="og:title"]').attr('content');
    // https://bandcamp.com/EmbeddedPlayer/album=1429273597/size=large/bgcol=ffffff/linkcol=333333/tracklist=false/artwork=small/track=1346034936/transparent=true/
    // https://bandcamp.com/EmbeddedPlayer/v=2/track=1346034936/size=large/tracklist=false/artwork=small/
    return `<iframe style="border: 0; width: 100%; height: 120px;" src="${embed}/bgcol=ffffff/linkcol=000000/transparent=true/" seamless><a href="${url}">${title}</a></iframe>`
  });
};
