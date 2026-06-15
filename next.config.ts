import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // Allow .mdx files to be used as route segments (e.g. handbook/page.mdx).
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    // String form so Turbopack can serialize the plugin. Adds id attributes
    // to headings so the on-page TOC can link to them.
    rehypePlugins: [["rehype-slug"]],
  },
});

export default withMDX(nextConfig);
