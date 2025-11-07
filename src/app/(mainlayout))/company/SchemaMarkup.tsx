import React from 'react';

const SchemaMarkup = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AI Form Builder',
    url: 'https://aiformbuilder.com/company',
    logo: 'https://aiformbuilder.com/favicon.png',
    description: 'Learn about the mission, values, and story of AI Form Builder. We are dedicated to making form building accessible, intuitive, and powerful for creators everywhere.',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      url: 'https://aiformbuilder.com/support'
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default SchemaMarkup;