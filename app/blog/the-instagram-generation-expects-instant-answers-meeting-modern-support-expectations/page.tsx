import type { Metadata } from "next";

import BlogPost from "@/components/blog/blog-post-enhanced";
import { formatDate } from "@/lib/blog-utils";
import { convertMDXToPostContent } from "@/lib/mdx-blog-utils";

async function getPostContent() {
  // Try to get content from MDX first, fallback to inline content
  const mdxContent = await convertMDXToPostContent("the-instagram-generation-expects-instant-answers-meeting-modern-support-expectations");
  
  if (mdxContent) {
    return mdxContent;
  }
  
  // Fallback to inline content (keeping the original for now)
  return {
    title: "The Instagram Generation Expects Instant Answers: Meeting Modern Support Expectations",
    slug: "the-instagram-generation-expects-instant-answers-meeting-modern-support-expectations",
    excerpt: "Learn how Gen Z and Millennial customers are transforming customer support expectations. Discover response time demands, social media preferences, and multi-channel strategies for 2024.",
    publishDate: "2025-01-22",
    vertical: ["ecommerce", "fashion", "beauty"],
    persona: ["founder", "cx-manager"],
    funnel: "awareness",
    readingTime: 10,
    author: "Garrio Team",
    hero: "/covers/instagram-generation-support.jpg",
    ogImage: "/og/instagram-generation-support.jpg",
    canonical: "https://garrio.ai/blog/the-instagram-generation-expects-instant-answers-meeting-modern-support-expectations",
    content: {
      intro: "When Zoe has a question about her skincare order, she doesn't pick up the phone. She doesn't even open her email. Instead, she slides into the brand's Instagram DMs, expecting a response within minutes—not hours.\n\nShe represents **1.8 billion Gen Z and Millennial consumers** (24% of the global population) who are fundamentally reshaping customer service expectations. They've grown up with instant gratification, social media communication, and on-demand everything. For DTC brands, understanding and meeting these expectations isn't just about customer satisfaction—it's about survival in a market where **52% of young customers will never buy from you again** if they can't resolve issues through their preferred channels.",
      sections: [],
      cta: {
        text: "Transform Your Customer Support Today",
        href: "https://apps.shopify.com/garrio?utm_source=blog&utm_campaign=instagram_generation_support",
      },
    },
  };
}

export const metadata: Metadata = {
  title:
    "The Instagram Generation Expects Instant Answers: Meeting Modern Support Expectations | Garrio",
  description:
    "Learn how Gen Z and Millennial customers are transforming customer support expectations. Discover response time demands, social media preferences, and multi-channel strategies for 2024.",
  openGraph: {
    title:
      "The Instagram Generation Expects Instant Answers: Meeting Modern Support Expectations",
    description:
      "How Gen Z and Millennial customers are transforming customer support expectations",
    type: "article",
  },
};

export default async function BlogPage() {
  const postContent = await getPostContent();
  const formattedDate = formatDate(postContent.publishDate);
  return <BlogPost post={postContent} formattedDate={formattedDate} />;
}

