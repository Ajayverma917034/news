import React from "react";
import { Helmet } from "react-helmet";

export const MetaData = ({
  title,
  keywords,
  banner,
  description,
  link,
  createdAt,
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Janpad Mirror" />
      <meta
        name="robots"
        content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
      />
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {/* <meta property="og:url" content={link} /> */}
      {/* <meta property="og:type" content="article" /> */}
      <meta property="og:site_name" content="Janpad Mirror" />
      <meta property="article:published_time" content={createdAt} />
      {/* <meta property="og:title" content={title} /> */}
      {/* <meta property="og:description" content={description} /> */}
      {/* <meta property="og:image" content={banner} /> */}

      {/* for facebook  */}
      <meta property="og:title" content={title} />
      <meta property="og:type" content="article" />
      <meta property="og:image" content={banner} />
      <meta property="og:url" content={link} />
      <meta property="og:description" content={description} />

      {/* <meta property="fb:app_id" content="your_fb_app_id" /> */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:creator" content="@your_twitter_handle" />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={banner} />
      <link rel="canonical" href={link} />
      <meta property="og:locale" content="en_US" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:label1" content="Written by" />
      <meta name="twitter:data1" content="JanpadMirror" />
    </Helmet>
  );
};

export const MetaDataSection = ({ title }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content="This is a news website" />
      <meta name="keywords" content="news, latest news, breaking news" />
      <meta name="author" content="Janpad News" />
      <meta name="robots" content="index, follow" />
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Helmet>
  );
};
