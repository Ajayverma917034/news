export async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/sitemap-news`, {
        cache: "no-store", // Force fresh data
      });
      const news = await response.json();

      function convertToIST(dateStr) {
        const date = new Date(dateStr);
        date.setHours(date.getUTCHours() + 5);
        date.setMinutes(date.getUTCMinutes() + 30);
        return date.toISOString().replace("Z", "+05:30");
      }

      const baseUrl = "https://janpadnewslive.com";

      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
          ${news
          .map(
            (article) => `
          <url>
            <loc>${baseUrl}/news/${article.news_id}</loc>
            <lastmod>${convertToIST(article.updatedAt)}</lastmod>
            <news:news>
              <news:publication>
                <news:name>Janpad News Live</news:name>
                <news:language>hi</news:language>
              </news:publication>
              <news:publication_date>${convertToIST(article.createdAt)}</news:publication_date>
              <news:title>${article.title}</news:title>
            </news:news>
          </url>
        `
          )
          .join("")}
        </urlset>`;

      res.setHeader("Content-Type", "text/xml");
      res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
      res.setHeader("Pragma", "no-cache");
      res.setHeader("Expires", "0");

      res.status(200).send(sitemap);
    } catch (error) {
      res.status(500).send("Error generating sitemap");
    }
  } else {
    res.status(405).send("Method Not Allowed");
  }
}

export default handler;
