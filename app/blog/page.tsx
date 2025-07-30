import type { Metadata } from "next";
import { Suspense } from "react";

import BlogIndex from "@/components/blog/blog-index";
import Header from "@/components/header";
import {
  generateStructuredData,
  posts as fallbackPosts,
} from "@/lib/blog-utils";
import { getAllMDXPosts } from "@/lib/mdx-blog-utils";

export const metadata: Metadata = {
  title: "Garrio Growth Library | CX Playbooks for Shopify Merchants",
  description:
    "Actionable CX playbooks for Shopify merchants. Learn how to improve customer experience and boost sales.",
  openGraph: {
    title: "Garrio Growth Library | CX Playbooks for Shopify Merchants",
    description:
      "Actionable CX playbooks for Shopify merchants. Learn how to improve customer experience and boost sales.",
    url: "https://garrio.ai/blog",
    siteName: "Garrio",
    images: [
      {
        url: "/og/blog-index.png",
        width: 1200,
        height: 630,
        alt: "Garrio Growth Library",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // Await searchParams before using it
  const params = await searchParams;
  
  // Extract filter parameters from URL
  const verticalParam = params.vertical;
  const funnelParam = params.funnel as string | undefined;
  const minReadingTimeParam = params.minReadingTime as string | undefined;
  const maxReadingTimeParam = params.maxReadingTime as string | undefined;
  const pageParam = params.page as string | undefined;

  // Parse parameters
  const vertical = verticalParam
    ? Array.isArray(verticalParam)
      ? verticalParam
      : [verticalParam]
    : [];

  const minReadingTime = minReadingTimeParam
    ? Number.parseInt(minReadingTimeParam)
    : 0;
  const maxReadingTime = maxReadingTimeParam
    ? Number.parseInt(maxReadingTimeParam)
    : 100;
  const page = pageParam ? Number.parseInt(pageParam) : 1;

  // Get posts from MDX files, fallback to JSON posts
  let posts;
  try {
    posts = await getAllMDXPosts();
    // If no MDX posts found, fallback to JSON posts
    if (posts.length === 0) {
      posts = fallbackPosts;
    }
  } catch (error) {
    console.error('Error loading MDX posts, using fallback:', error);
    posts = fallbackPosts;
  }

  // Get all available verticals for filters from the loaded posts
  const allVerticals = Array.from(new Set(posts.flatMap(post => post.vertical)));

  // Generate structured data for SEO
  const structuredData = generateStructuredData(posts);

  return (
    <div className="flex min-h-screen flex-col">
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Preload hero images for first 6 posts */}
      {posts.slice(0, 6).map((post) => (
        <link
          key={post.slug}
          rel="preload"
          href={post.hero}
          as="image"
          type="image/jpeg"
        />
      ))}

      <Header variant="transparent" />
      <main className="flex-1">
        <Suspense
          fallback={
            <div className="container mx-auto px-4 py-16">Loading...</div>
          }
        >
          <BlogIndex
            initialVertical={vertical}
            initialFunnel={funnelParam}
            initialMinReadingTime={minReadingTime}
            initialMaxReadingTime={maxReadingTime}
            initialPage={page}
            allVerticals={allVerticals}
            posts={posts}
          />
        </Suspense>
      </main>
    </div>
  );
}
