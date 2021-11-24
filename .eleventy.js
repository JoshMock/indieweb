const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSass = require('eleventy-plugin-sass');
const { DateTime } = require('luxon');

module.exports = (eleventyConfig) => {
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSass);

  eleventyConfig.addFilter('simpleDate', dateObj => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('yyyy-LL-dd');
  });

  eleventyConfig.addPairedShortcode("quoteback", (text, author, title, url) => `<blockquote class="quoteback" darkmode="" data-title="${title}" data-author="${author}" cite="${url}"><div class="css-1dbjc4n"><div class="css-1dbjc4n r-1s2bzr4"><div dir="auto" class="css-901oao r-1fmj7o5 r-37j5jr r-1blvdjr r-16dba41 r-vrz42v r-bcqeeo r-bnwqim r-qvutc0" id="id__o67yoo50f0g" lang="en"><span class="css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0">${text}</span></div></div></div><footer>${author}</footer></blockquote>`);
};
