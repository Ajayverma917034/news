import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Fetch data from your backend (e.g., Express API) or database
    const response = await fetch(
      `https://api.janpadnewslive.com/api/v1/sitemap-news`
    );
    const news = await response.json();

    function convertToIST(dateStr) {
      // Parse the date from the given UTC string
      const date = new Date(dateStr);

      // Offset IST time zone by adding 5 hours and 30 minutes
      date.setHours(date.getUTCHours() + 5);
      date.setMinutes(date.getUTCMinutes() + 30);

      return date.toISOString().replace("Z", "+05:30");
    }
    const baseUrl = process.env.NEXT_PUBLIC_CURRENT_URL;

    // Generate the sitemap XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
      ${news
        .map(
          (article) => `
        <url>
          <loc>${baseUrl}/news/${article.title}</loc>
          <lastmod>${convertToIST(article.updatedAt)}</lastmod>
          <news:news>
            <news:publication>
              <news:name>Janpad News Live</news:name>
              <news:language>hi</news:language>
            </news:publication>
            <news:publication_date>${convertToIST(
            article.createdAt
          )}</news:publication_date>
            <news:title>${article.title}</news:title>
          </news:news>
        </url>
      `
        )
        .join("")}
    </urlset>`;

    // Return the sitemap as XML response
    const responseHeaders = new Headers();
    responseHeaders.set("Content-Type", "text/xml");
    return new NextResponse(sitemap, { status: 200, headers: responseHeaders });
  } catch (error) {
    // Handle errors (e.g., failed to fetch data from the API)
    return new NextResponse("Error generating sitemap", { status: 500 });
  }
}
