module.exports = function(eleventyConfig) {
  // Output to docs/ for GitHub Pages

  // Copy static assets
  eleventyConfig.addPassthroughCopy("src/assets/css");
  eleventyConfig.addPassthroughCopy("src/assets/images");
  eleventyConfig.addPassthroughCopy("src/CNAME");

  // Add collection for posts sorted by updated date (most recent first)
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/posts/*.md")
      .sort((a, b) => {
        const dateA = a.data.updated || a.data.date;
        const dateB = b.data.updated || b.data.date;
        return dateB - dateA; // Descending order
      });
  });

  // Date filter for formatting
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    if (!dateObj) return "";
    return new Date(dateObj).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  });

  // Short date filter (YYYY-MM-DD)
  eleventyConfig.addFilter("shortDate", (dateObj) => {
    if (!dateObj) return "";
    return new Date(dateObj).toISOString().split('T')[0];
  });

  return {
    dir: {
      input: "src",
      output: "docs",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",

    // Dev server configuration
    serverOptions: {
      port: 8080,
      host: "0.0.0.0"  // Listen on all network interfaces
    }
  };
};
