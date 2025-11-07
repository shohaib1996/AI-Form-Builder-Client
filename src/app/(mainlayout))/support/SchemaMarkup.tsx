
import React from 'react';

const SchemaMarkup = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Support Center',
    description: 'Get help and support for AI Form Builder. Find answers to your questions in our FAQ, documentation, and community forums.',
    url: 'https://aiformbuilder.com/support',
    mainEntity: {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How do I create my first form?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Getting started is easy! Simply click 'Create Form' in your dashboard and choose from our templates or start from scratch.",
          },
        },
        {
          '@type': 'Question',
          name: 'Can I customize the design of my forms?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Our form builder offers extensive customization options including themes, colors, fonts, and layout options.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is there a limit to form responses?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Free accounts can collect up to 100 responses per month. Premium plans offer higher limits and unlimited responses.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I integrate forms with other tools?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'We support integrations with popular tools like Zapier, Google Sheets, Mailchimp, and many more through our API.',
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
