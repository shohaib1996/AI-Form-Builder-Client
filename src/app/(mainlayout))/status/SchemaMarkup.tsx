
import React from 'react';

const SchemaMarkup = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'System Status',
    description: 'Real-time status of our AI Form Builder services.',
    url: 'https://aiformbuilder.com/status',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          item: {
            '@type': 'Service',
            name: 'API Gateway',
            description: 'Handles all incoming API requests.',
          },
        },
        {
          '@type': 'ListItem',
          position: 2,
          item: {
            '@type': 'Service',
            name: 'Database',
            description: 'Stores all user and form data.',
          },
        },
        {
          '@type': 'ListItem',
          position: 3,
          item: {
            '@type': 'Service',
            name: 'CDN',
            description: 'Content Delivery Network for fast asset loading.',
          },
        },
        {
          '@type': 'ListItem',
          position: 4,
          item: {
            '@type': 'Service',
            name: 'Authentication',
            description: 'User authentication and authorization services.',
          },
        },
        {
            '@type': 'ListItem',
            position: 5,
            item: {
              '@type': 'Service',
              name: 'Form Builder',
              description: 'The core form building application.',
            },
          },
          {
            '@type': 'ListItem',
            position: 6,
            item: {
              '@type': 'Service',
              name: 'Email Service',
              description: 'Handles sending of email notifications.',
            },
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
