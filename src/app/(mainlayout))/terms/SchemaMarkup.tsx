
import React from 'react';

const SchemaMarkup = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Terms of Service',
    description: 'Our terms and conditions for using our AI Form Builder services.',
    url: 'https://aiformbuilder.com/terms',
    hasPart: [
      {
        '@type': 'WebPageElement',
        name: 'Acceptance of Terms',
        text: 'By accessing and using our form building platform, you accept and agree to be bound by the terms and provision of this agreement.',
      },
      {
        '@type': 'WebPageElement',
        name: 'Service Description',
        text: 'Our platform provides form building tools and services that allow users to create, customize, and deploy forms for data collection.',
      },
      {
        '@type': 'WebPageElement',
        name: 'User Accounts',
        text: 'You are responsible for maintaining the confidentiality of your account and password.',
      },
      {
        '@type': 'WebPageElement',
        name: 'Acceptable Use',
        text: 'You agree not to use the service for any unlawful purpose.',
      },
      {
        '@type': 'WebPageElement',
        name: 'Privacy Policy',
        text: 'Our Privacy Policy explains how we collect, use, and protect your information.',
      },
      {
        '@type': 'WebPageElement',
        name: 'Intellectual Property',
        text: 'The service and its original content, features, and functionality are and will remain the exclusive property of our company.',
      },
      {
        '@type': 'WebPageElement',
        name: 'Termination',
        text: 'We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability.',
      },
      {
        '@type': 'WebPageElement',
        name: 'Limitation of Liability',
        text: 'In no event shall our company, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages.',
      },
      {
        '@type': 'WebPageElement',
        name: 'Governing Law',
        text: 'These Terms shall be interpreted and governed by the laws of the jurisdiction in which our company is incorporated.',
      },
      {
        '@type': 'WebPageElement',
        name: 'Changes to Terms',
        text: 'We reserve the right, at our sole discretion, to modify or replace these Terms at any time.',
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default SchemaMarkup;
