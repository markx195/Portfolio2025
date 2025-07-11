export function generateSEOTags({
  title,
  description,
  keywords = '',
  ogType = 'website',
  ogImage = '/social-image.png',
  canonicalUrl = '',
  noIndex = false,
}) {
  const tags = [
    { name: 'description', content: description },
    { name: 'keywords', content: keywords },
    { name: 'author', content: 'Quang Anh Nguyen Phu' },
    { name: 'robots', content: noIndex ? 'noindex,nofollow' : 'index,follow' },
    
    // Open Graph
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:type', content: ogType },
    { property: 'og:image', content: ogImage },
    { property: 'og:site_name', content: 'Quang Anh Portfolio' },
    
    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: ogImage },
    
    // Additional meta tags
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'theme-color', content: '#000000' },
  ];

  if (canonicalUrl) {
    tags.push({ rel: 'canonical', href: canonicalUrl });
  }

  return tags;
}

export function generateStructuredData({
  type = 'Person',
  name,
  jobTitle,
  description,
  url,
  sameAs = [],
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': type,
    name,
    jobTitle,
    description,
    url,
    sameAs,
  };

  return JSON.stringify(structuredData);
} 