
import React from 'react';

const SchemaMarkup = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Us',
    description: 'Get in touch with the AI Form Builder team. We are here to help you with any questions you have.',
    url: 'https://aiformbuilder.com/contact',
    mainEntity: {
      '@type': 'Organization',
      name: 'AI Form Builder',
      url: 'https://aiformbuilder.com',
      logo: 'https://aiformbuilder.com/logo.png',
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+1-555-123-4567',
          contactType: 'customer service',
          areaServed: 'US',
          availableLanguage: ['English'],
        },
        {
          '@type': 'ContactPoint',
          email: 'support@formbuilder.com',
          contactType: 'customer service',
        },
      ],
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
