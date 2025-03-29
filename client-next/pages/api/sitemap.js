export async function handler(req, res) {
    if (req.method === "GET") {
        try {
            // Fetch data from your backend API (replace with your actual endpoint)
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/sitemap-news`);
            const news = await response.json();

            // Helper function to convert UTC to IST
            function convertToIST(dateStr) {
                const date = new Date(dateStr);
                date.setHours(date.getUTCHours() + 5); // Add 5 hours for IST
                date.setMinutes(date.getUTCMinutes() + 30); // Add 30 minutes for IST
                return date.toISOString().replace("Z", "+05:30");
            }

            const baseUrl = "https://janpadnewslive.com";

            // Generate the sitemap XML content
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

            // Return the sitemap as XML with proper Content-Type
            res.setHeader("Content-Type", "text/xml");
            res.status(200).send(sitemap);

        } catch (error) {
            res.status(500).send("Error generating sitemap");
        }
    } else {
        // If the method is not GET, send a 405 Method Not Allowed response
        res.status(405).send("Method Not Allowed");
    }
}

export default handler;