// This is a simulated parser for demo purposes
// In a real implementation, this would make API calls to a proxy service

interface ShopifyPageData {
  title: string
  price: number
  images: string[]
  url: string
  description: string
  shopName: string
}

export async function parseShopifyUrl(url: string): Promise<ShopifyPageData> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1200))

  // Validate URL
  try {
    new URL(url)
  } catch (error) {
    throw new Error("Invalid URL format")
  }

  // Check if it's a Shopify URL
  const isShopify = url.includes("myshopify.com") || url.includes("shopify.com")
  if (!isShopify) {
    const error = new Error("That page doesn't look like a Shopify store.")
    // @ts-ignore
    error.code = "non_shopify_url"
    throw error
  }

  // Simulate different product data based on URL
  if (url.includes("allbirds")) {
    return {
      title: "Men's Wool Runners",
      price: 110.0,
      images: [
        "https://cdn.shopify.com/s/files/1/1104/4168/products/Allbirds_WL_RN_SF_PDP_Natural_Grey_BTY_10b4c383-ef0d-4e79-a340-a3700e1d8a4a.png",
        "https://cdn.shopify.com/s/files/1/1104/4168/products/Allbirds_WL_RN_SF_PDP_Natural_Grey_LAT_d8ede592-fbf5-4a62-8a20-c56bd3ce88e8.png",
      ],
      url: url,
      description:
        "Our classic everyday sneaker made with ZQ Merino wool. Lightweight, breathable, and ready for anything.",
      shopName: "Allbirds",
    }
  } else if (url.includes("glossier")) {
    return {
      title: "Boy Brow",
      price: 20.0,
      images: [
        "https://cdn.shopify.com/s/files/1/0609/1636/4787/products/Boy-Brow_800x800_1.jpg",
        "https://cdn.shopify.com/s/files/1/0609/1636/4787/products/BB_Swatch_800x800_1.jpg",
      ],
      url: url,
      description: "A brushable, creamy wax that visibly thickens, shapes, and grooms brows into place.",
      shopName: "Glossier",
    }
  } else if (url.includes("brooklinen")) {
    return {
      title: "Classic Core Sheet Set",
      price: 149.0,
      images: [
        "https://cdn.shopify.com/s/files/1/0204/2210/products/Classic-Core-Sheet-Set_Solid-White_FT.jpg",
        "https://cdn.shopify.com/s/files/1/0204/2210/products/Classic-Core-Sheet-Set_Solid-White_D1.jpg",
      ],
      url: url,
      description: "Our signature 270 thread count weave. Lightweight, crisp and cool, with a matte finish.",
      shopName: "Brooklinen",
    }
  } else {
    // Random error simulation (10% chance)
    if (Math.random() < 0.1) {
      const error = new Error("Couldn't read product details—try another URL.")
      // @ts-ignore
      error.code = "missing_product_data"
      throw error
    }

    // Generic product data for other URLs
    return {
      title: "Sample Product",
      price: 49.99,
      images: ["https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-product-1_large.png"],
      url: url,
      description:
        "This is a sample product description. In a real implementation, this would be extracted from the page.",
      shopName: url.split("//")[1].split(".")[0],
    }
  }
}
