import { Helmet } from "react-helmet";
import React from "react";

const Meta = ({ title, description, keywords, canonical }) => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}
      {canonical && <link rel="canonical" href={canonical} />}
    </Helmet>
  );
};

export default Meta;
