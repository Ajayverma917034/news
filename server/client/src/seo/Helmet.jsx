import React from "react";
import { Helmet } from "react-helmet";

export const MetaData = ({
  title,
  keywords,
  banner,
  description,
  link,
  meta = [],
}) => {
  const defaultMeta = [
    {
      name: "description",
      content: description,
    },
    {
      property: "og:url",
      content: link, // replace with actual URL
    },
    {
      property: "og:type",
      content: "news", // replace with actual type
    },
    {
      property: "og:title",
      content: title,
    },
    {
      property: "og:description",
      content: description,
    },
    {
      property: "og:image",
      content: banner, // replace with actual image URL
    },
    {
      property: "fb:app_id",
      content: "your_fb_app_id", // replace with actual Facebook app ID
    },
    {
      property: "twitter:card",
      content: description, // replace with actual card type
    },
    {
      property: "twitter:creator",
      content: "@your_twitter_handle", // replace with actual Twitter handle
    },
    {
      property: "twitter:title",
      content: title,
    },
    {
      property: "twitter:description",
      content: description,
    },
    {
      property: "twitter:image",
      content: banner, // replace with actual image URL
    },
  ];
  1;
  const mergedMeta = [...defaultMeta, ...meta];

  return (
    <Helmet
      title={title}
      htmlAttributes={{ lang: "en" }}
      meta={mergedMeta}
      key={keywords}
    />
  );
};

export const MetaDataForSection = ({
  title,
  description,
  keywords,
  link,
  meta = [],
}) => {
  const defaultMeta = [
    {
      name: "description",
      content: description,
    },
    {
      property: "og:url",
      content: link, // replace with actual URL
    },
    {
      property: "og:type",
      content: "news", // replace with actual type
    },
    {
      property: "og:title",
      content: title,
    },
    {
      property: "og:description",
      content: description,
    },
    {
      property: "og:image",
      content: banner, // replace with actual image URL
    },
    {
      property: "fb:app_id",
      content: "your_fb_app_id", // replace with actual Facebook app ID
    },
    {
      property: "twitter:card",
      content: description, // replace with actual card type
    },
    {
      property: "twitter:creator",
      content: "@your_twitter_handle", // replace with actual Twitter handle
    },
    {
      property: "twitter:title",
      content: title,
    },
    {
      property: "twitter:description",
      content: description,
    },
    {
      property: "twitter:image",
      content: banner, // replace with actual image URL
    },
  ];
  1;
  const mergedMeta = [...defaultMeta, ...meta];

  return (
    <Helmet
      title={title}
      htmlAttributes={{ lang: "en" }}
      meta={mergedMeta}
      key={keywords}
    />
  );
};
