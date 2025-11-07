import React from 'react';

const SchemaMarkup = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'AI Form Builder',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Any',
    description: 'Build powerful, custom forms for your business with our AI-powered form builder. Create job applications, surveys, and more with natural language.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
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