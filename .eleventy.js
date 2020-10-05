const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSass = require('eleventy-plugin-sass');
const { DateTime } = require('luxon');

module.exports = (eleventyConfig) => {
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSass);

  eleventyConfig.addFilter('simpleDate', dateObj => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('yyyy-LL-dd');
  });
};
