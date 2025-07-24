import type { Metadata } from "next";
import { Suspense } from "react";

import BlogIndex from "@/components/blog/blog-index";
import Header from "@/components/header";
import {
  getAllVerticals,
  generateStructuredData,
  posts,
} from "@/lib/blog-utils";

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

  // Get all available verticals for filters
  const allVerticals = getAllVerticals();

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
          />
        </Suspense>
      </main>
    </div>
  );
}
