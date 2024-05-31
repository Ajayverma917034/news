// src/LatestNews.js
import React from 'react';
import NewsItem from './NewsItems';

const newsData = [
  {
    title: 'सलमान खान केस: CID करेगी आरोपी के सुसाइड की जांच, दरी से फंदा बनाकर लॉकअप के बाथरूम में लगाई थी फांसी',
    views: '15000'
  },
  {
    title: 'सलमान खान केस: CID करेगी आरोपी के सुसाइड की जांच, दरी से फंदा बनाकर लॉकअप के बाथरूम में लगाई थी फांसी',
    views: '1500'
  },
  {
    title: 'सलमान खान केस: CID करेगी आरोपी के सुसाइड की जांच, दरी से फंदा बनाकर लॉकअप के बाथरूम में लगाई थी फांसी',
    views: '45000'
  },
  // Add more news items here as needed
];

const LatestNews = () => {
  return (
    <div className="max-w-2xl mx-auto py-4 bg-white shadow-dark-shadow rounded-lg gap-2">
      <div className="flex justify-between items-center px-4 py-2 border-b border-gray">
        <h2 className="text-4xl font-semibold">Latest News</h2>
        <span className="text-lg text-gray-500">Top 10</span>
      </div>
      {newsData.map((news, index) => (
        <NewsItem key={index} title={news.title} views={news.views} />
      ))}
    </div>
  );
};

export default LatestNews;
