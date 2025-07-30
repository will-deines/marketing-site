const fs = require('fs');
const path = require('path');

const blogPosts = [
  'from-side-hustle-to-1m-how-dtc-founders-scale-customer-support',
  'bootstrap-friendly-support-building-customer-love-on-a-tight-budget',
  'black-friday-survival-how-dtc-brands-handle-10x-support-volume',
  'why-fashion-brands-need-industry-specific-ai-not-generic-chatbots',
  'turning-customer-support-into-your-secret-revenue-driver',
  'the-real-cost-of-poor-customer-support-for-dtc-brands',
  'the-female-founders-guide-to-scaling-customer-support-without-burning-out',
  'the-complete-shopify-seo-guide-2025-optimize-your-store-for-rankings'
];

for (const blogPost of blogPosts) {
  const filePath = path.join(__dirname, 'app', 'blog', blogPost, 'page.tsx');
  
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Add import for MDX utils
    if (!content.includes('convertMDXToPostContent')) {
      content = content.replace(
        /import.*from.*['"]@\/lib\/blog-utils['"];?\n/,
        `$&import { convertMDXToPostContent } from "@/lib/mdx-blog-utils";\n`
      );
    }
    
    // Convert inline content to function
    content = content.replace(
      /const postData[^=]*= {/,
      `async function getPostContent() {
  // Try to get content from MDX first, fallback to inline content
  const mdxContent = await convertMDXToPostContent("${blogPost}");
  
  if (mdxContent) {
    return mdxContent;
  }
  
  // Fallback to inline content
  return {`
    );
    
    // Convert export function to async
    content = content.replace(
      /export default function.*\(\) {/,
      'export default async function BlogPage() {'
    );
    
    // Update function content to use getPostContent
    content = content.replace(
      /const formattedDate = formatDate\(postData\.publishDate\)/,
      'const postData = await getPostContent();\n  const formattedDate = formatDate(postData.publishDate)'
    );
    
    content = content.replace(
      /const formattedDate = new Date\(postData\.publishDate\)/,
      'const postData = await getPostContent();\n  const formattedDate = new Date(postData.publishDate)'
    );
    
    // Close the function
    content = content.replace(
      /}\s*export default/,
      '  };\n}\n\nexport default'
    );
    
    fs.writeFileSync(filePath, content);
    console.log(`Updated: ${blogPost}`);
  } else {
    console.log(`File not found: ${filePath}`);
  }
}

console.log('Blog post routing updates completed!');