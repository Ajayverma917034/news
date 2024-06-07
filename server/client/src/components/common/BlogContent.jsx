const Img = ({ url, caption }) => {
  return (
    <div>
      <img src={url} alt="Img" />{" "}
      {caption.length ? (
        <p className="w-full text-center my-1 md:mb-12 text-base text-dark-grey font-anekdevanagari">
          {caption}
        </p>
      ) : (
        ""
      )}
    </div>
  );
};
const Quote = ({ quote, caption }) => {
  return (
    <div className="bg-purple/10 p-3 pl-5 border-l-4 border-purple font-anekdevanagari">
      <p className="text-xl leading-10 md:text-2xl font-anekdevanagari">
        {quote}
      </p>
      {caption.length ? (
        <p className="w-full text-purple text-base font-anekdevanagari">
          {caption}
        </p>
      ) : (
        ""
      )}
    </div>
  );
};
const List = ({ style, items }) => {
  return (
    <ol
      className={`pl-5 ${style === "ordered" ? " list-decimal" : " list-disc"}`}
    >
      {items.map((item, i) => {
        return (
          <li
            key={i}
            className="my-1 font-anekdevanagari"
            dangerouslySetInnerHTML={{ __html: item }}
          ></li>
        );
      })}
    </ol>
  );
};
const BlogContent = ({ block }) => {
  let { type, data } = block;
  if (type === "paragraph") {
    return (
      <p
        dangerouslySetInnerHTML={{ __html: data.text }}
        className="md:text-[18px] font-anekdevanagari opacity-[0.9]"
      ></p>
    );
  }
  if (type === "header") {
    if (data.level === 3) {
      return (
        <h3
          className="text-2xl font-bold font-anekdevanagari"
          dangerouslySetInnerHTML={{ __html: data.text }}
        ></h3>
      );
    }
    return (
      <h2
        className="text-3xl font-bold font-anekdevanagari"
        dangerouslySetInnerHTML={{ __html: data.text }}
      ></h2>
    );
  }
  if (type === "image") {
    return <Img url={data.file.url} caption={data.caption} />;
  }
  if (type === "quote") {
    return <Quote quote={data.quote} caption={data.caption} />;
  }
  if (type === "list") {
    return <List style={data.style} items={data.items} />;
  } else {
    return <h1></h1>;
  }
};

export default BlogContent;
