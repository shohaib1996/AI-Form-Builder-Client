
import React from 'react';

const SchemaMarkup = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: 'https://aiformbuilder.com/',
    name: 'AI Form Builder',
    description: 'Build powerful, custom forms for your business with our AI-powered form builder. Create job applications, surveys, and more with natural language.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://aiformbuilder.com/forms?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default SchemaMarkup;
