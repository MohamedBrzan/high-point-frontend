import React from 'react';
import { Helmet } from 'react-helmet-async';

const PageTitle = ({ children }) => {
  return (
    <Helmet>
      <title>High Point | {children}</title>
    </Helmet>
  );
};

export default PageTitle;
