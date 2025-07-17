"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

interface TeamMember {
  id: string
  name: string
  role: string
  favoriteShopifyBrand: string
  imageSrc: string
}

const teamMembers: TeamMember[] = [
  {
    id: "alex",
    name: "Alex Chen",
    role: "CEO & Co-founder",
    favoriteShopifyBrand: "Allbirds",
    imageSrc: "/team/alex-chen.png",
  },
  {
    id: "sarah",
    name: "Sarah Johnson",
    role: "Head of ML",
    favoriteShopifyBrand: "Gymshark",
    imageSrc: "/team/sarah-johnson.jpg",
  },
  {
    id: "michael",
    name: "Michael Rodriguez",
    role: "CTO & Co-founder",
    favoriteShopifyBrand: "Peak Design",
    imageSrc: "/team/michael-rodriguez.jpg",
  },
  {
    id: "jessica",
    name: "Jessica Kim",
    role: "Head of Customer Success",
    favoriteShopifyBrand: "Brooklinen",
    imageSrc: "/team/jessica-kim.jpg",
  },
  {
    id: "david",
    name: "David Patel",
    role: "Lead Engineer",
    favoriteShopifyBrand: "MVMT",
    imageSrc: "/team/david-patel.jpg",
  },
  {
    id: "emma",
    name: "Emma Wilson",
    role: "Product Manager",
    favoriteShopifyBrand: "Bombas",
    imageSrc: "/team/emma-wilson.jpg",
  },
  {
    id: "james",
    name: "James Taylor",
    role: "Data Scientist",
    favoriteShopifyBrand: "Beardbrand",
    imageSrc: "/team/james-taylor.jpg",
  },
  {
    id: "olivia",
    name: "Olivia Martinez",
    role: "UX Designer",
    favoriteShopifyBrand: "Glossier",
    imageSrc: "/team/olivia-martinez.jpg",
  },
  {
    id: "ryan",
    name: "Ryan Thompson",
    role: "Growth Marketing",
    favoriteShopifyBrand: "Chubbies",
    imageSrc: "/team/ryan-thompson.jpg",
  },
  {
    id: "sophia",
    name: "Sophia Lee",
    role: "Support Engineer",
    favoriteShopifyBrand: "Outdoor Voices",
    imageSrc: "/team/sophia-lee.jpg",
  },
  {
    id: "daniel",
    name: "Daniel Brown",
    role: "Backend Engineer",
    favoriteShopifyBrand: "Ridge Wallet",
    imageSrc: "/team/daniel-brown.jpg",
  },
  {
    id: "natalie",
    name: "Natalie Garcia",
    role: "Content Strategist",
    favoriteShopifyBrand: "Mejuri",
    imageSrc: "/team/natalie-garcia.jpg",
  },
]

export default function TeamGallery() {
  const [shuffledTeam, setShuffledTeam] = useState<TeamMember[]>([])
  const [hoveredMember, setHoveredMember] = useState<string | null>(null)

  // Shuffle team members on each visit
  useEffect(() => {
    const shuffled = [...teamMembers].sort(() => Math.random() - 0.5)
    setShuffledTeam(shuffled)
  }, [])

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Faces Behind the Bot</h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
          Meet the team building the future of Shopify support and sales.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
          {shuffledTeam.map((member) => (
            <div
              key={member.id}
              className="flex flex-col items-center"
              onMouseEnter={() => setHoveredMember(member.id)}
              onMouseLeave={() => setHoveredMember(null)}
              onFocus={() => setHoveredMember(member.id)}
              onBlur={() => setHoveredMember(null)}
              tabIndex={0}
            >
              <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden mb-4">
                <Image
                  src={member.imageSrc ? member.imageSrc : "/placeholder.svg?height=128&width=128&query=person"}
                  alt={`Photo of ${member.name}, ${member.role}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 96px, 128px"
                />
              </div>
              <div
                className={`text-center transition-opacity duration-300 ${
                  hoveredMember === member.id ? "opacity-100" : "opacity-0"
                }`}
              >
                <h3 className="font-bold">{member.name}</h3>
                <p className="text-sm text-gray-600">{member.role}</p>
                <p className="text-xs text-purple-600 mt-1">❤️ {member.favoriteShopifyBrand}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
