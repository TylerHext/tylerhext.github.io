module.exports = function(eleventyConfig) {
  // Output to docs/ for GitHub Pages

  // Feature flag: the 4Runner build log is still being built out (backlog of
  // entries + appearance) and isn't ready to publish. When this is unset, its
  // source is excluded from the build entirely — nothing under /4runner/ is
  // written to docs/, and the nav link is hidden — so it can't leak into a
  // normal `npm run build` + commit of unrelated site changes.
  // Local preview (`npm run serve`) sets this automatically; flip it on for a
  // real build with `FOURRUNNER_ENABLED=true npm run build` (or `npm run
  // build:4runner`) once ready to publish.
  const FOURRUNNER_ENABLED = process.env.FOURRUNNER_ENABLED === "true";
  eleventyConfig.addGlobalData("fourrunnerEnabled", FOURRUNNER_ENABLED);
  if (!FOURRUNNER_ENABLED) {
    eleventyConfig.ignores.add("src/4runner/**");
  }

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

  // Add collection for 4Runner build log entries (most recent first)
  eleventyConfig.addCollection("fourrunner", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/4runner/*.md")
      .sort((a, b) => {
        const dateA = a.data.created || a.data.date;
        const dateB = b.data.created || b.data.date;
        return dateB - dateA; // Descending order
      });
  });

  // Date filter for formatting.
  // Front matter dates like `2026-02-06` parse as UTC midnight, so format in UTC
  // to avoid rolling back a day in negative-offset timezones.
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    if (!dateObj) return "";
    return new Date(dateObj).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC"
    });
  });

  // Short date filter (YYYY-MM-DD)
  eleventyConfig.addFilter("shortDate", (dateObj) => {
    if (!dateObj) return "";
    return new Date(dateObj).toISOString().split('T')[0];
  });

  // VHS-style date filter (YYYY.MM.DD). Formatted in UTC — see readableDate note.
  eleventyConfig.addFilter("vhsDate", (dateObj) => {
    if (!dateObj) return "";
    const date = new Date(dateObj);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  });

  // Number filter with thousands separators (e.g. odometer readings)
  eleventyConfig.addFilter("commaNumber", (n) => {
    if (n === undefined || n === null || n === "") return "";
    return Number(n).toLocaleString("en-US");
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
