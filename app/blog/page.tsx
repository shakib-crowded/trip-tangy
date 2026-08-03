"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  featured?: boolean;
  coverImage?: string;
}

const posts: Post[] = [
  {
    slug: "hidden-islands-southeast-asia",
    title: "Hidden Islands of Southeast Asia That Most Tourists Never Find",
    excerpt:
      "Beyond Bali and Phuket lies a quiet archipelago of islands untouched by resort culture. We spent three weeks finding them, and here is everything you need to know.",
    content: `
      <p>There is a version of Southeast Asia that exists beyond the Instagram geotags and the bucket-list itineraries. It is found in the islands that don't have jet ski rentals, where the only sound at sunrise is the gentle lapping of water against wooden fishing boats.</p>
      
      <p>We spent three weeks hopping between these lesser-known islands — places like Pulau Tiga in Malaysia, the Mentawai Islands in Indonesia, and the remote islets of the Mergui Archipelago in Myanmar. Each one offered something entirely different: one had a volcano you could hike before breakfast, another was home to a single village where they still build boats by hand.</p>
      
      <p>What we discovered was not just beautiful beaches, but a different pace of life. On these islands, time moves slower. People smile more. The stars at night are so bright you can see the Milky Way with your naked eye.</p>
      
      <h2>How to get there without losing your mind</h2>
      
      <p>Getting to these islands is not easy — and that's precisely the point. You'll need to take a combination of flights, buses, ferries, and often small motorboats that feel like they're held together by prayer and duct tape. But here's the thing: the journey is part of the adventure.</p>
      
      <p>Our route started in Singapore, where we flew to Kuala Lumpur, then took a bus to the coast, and finally a ferry to Pulau Tiga. From there, we island-hopped using local boats and a lot of goodwill. The locals are incredibly helpful, and a smile goes a long way when you're trying to negotiate a boat ride.</p>
      
      <blockquote>
        "The best way to find these hidden gems is to talk to the locals. They know where the real magic is."
      </blockquote>
      
      <h2>What to pack (and what to leave behind)</h2>
      
      <p>Packing for an island-hopping adventure requires strategy. You need to be prepared for hot days, sudden rain showers, and evenings that can get surprisingly cool. But you also need to pack light, because you'll be carrying everything on and off boats.</p>
      
      <ul>
        <li><strong>Quick-dry clothing</strong> — you'll be grateful for it after a sudden downpour</li>
        <li><strong>Reef-safe sunscreen</strong> — to protect the marine life you came to see</li>
        <li><strong>Insect repellent</strong> — the mosquitoes are ambitious in these parts</li>
        <li><strong>A good book</strong> — because you'll have plenty of downtime</li>
        <li><strong>Cash</strong> — many islands don't have ATMs or card machines</li>
      </ul>
      
      <h2>The unexpected joy of disconnecting</h2>
      
      <p>Perhaps the most surprising thing about visiting these islands was the lack of internet. On Pulau Tiga, there was no Wi-Fi, no 4G, no signal at all. At first, it was panic-inducing. By the second day, it was liberating.</p>
      
      <p>We spent evenings watching the sunset, talking to locals, and learning about their way of life. We ate freshly caught fish grilled over charcoal. We swam in water so clear you could see the coral reefs from the surface. And we slept better than we had in months.</p>
      
      <p>These islands remind you that the world is still full of places that haven't been completely discovered. And that is a beautiful thing.</p>
    `,
    author: "Priya Mehta",
    date: "June 14, 2026",
    readTime: "8 min read",
    featured: true,
    coverImage:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
  },
  {
    slug: "packing-carry-on-only",
    title: "How to Pack for Two Weeks in a Single Carry-On",
    excerpt:
      "The carry-on challenge is less about minimalism and more about thinking in outfits. A practical, real-world guide from someone who checked bags one too many times.",
    content: `
      <p>I used to be a chronic over-packer. My luggage was always overweight, I always had to check a bag, and I always ended up wearing only half of what I brought. Then I discovered the art of the carry-on, and it changed everything.</p>
      
      <p>Packing for two weeks in a single carry-on is not about deprivation. It's about strategy. It's about thinking in outfits rather than individual pieces of clothing. And it's about accepting that you don't need a different outfit for every single day.</p>
      
      <h2>The 5-4-3-2-1 method</h2>
      
      <p>Here's the formula that works for me: 5 tops, 4 bottoms, 3 pairs of shoes, 2 accessories, and 1 dress or formal outfit. With this combination, you can create at least 20 different outfits that look different enough for a two-week trip.</p>
      
      <ul>
        <li>Choose neutral colors that mix and match easily</li>
        <li>Invest in wrinkle-resistant fabrics</li>
        <li>Pack a small laundry kit for quick washes</li>
        <li>Roll your clothes instead of folding them</li>
      </ul>
      
      <blockquote>
        "The secret to packing light is to realize that nobody cares if you wear the same shirt twice."
      </blockquote>
      
      <h2>What to put in your personal item</h2>
      
      <p>Your personal item (the bag under the seat) is where you put everything you might need during the flight. This includes your laptop, chargers, medications, a change of clothes (in case your luggage gets delayed), and snacks.</p>
      
      <p>I also keep a small pouch with all my toiletries in the personal item, so I don't have to rummage through my carry-on in the airport bathroom.</p>
    `,
    author: "Arjun Sinha",
    date: "June 8, 2026",
    readTime: "5 min read",
    coverImage:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&h=600&fit=crop",
  },
  {
    slug: "festival-travel-india",
    title:
      "Travelling India During Festival Season: What No One Prepares You For",
    excerpt:
      "Holi, Diwali, Pongal — festivals transform cities in ways that guidebooks cannot capture. What to expect, and how to experience them respectfully as an outsider.",
    content: `
      <p>India during festival season is a sensory overload in the best possible way. The streets are alive with music, the air smells like incense and sweets, and everywhere you look, there are celebrations happening. But it's also chaotic, crowded, and overwhelming for the unprepared traveler.</p>
      
      <p>I've traveled through India during Holi, Diwali, and Pongal, and each one was a completely different experience. Here's what I wish I had known before I went.</p>
      
      <h2>Holi: the festival of colors</h2>
      
      <p>Holi is the most famous Indian festival abroad, and for good reason. It's a day of pure joy, where everyone — locals and tourists alike — throws colored powder and water at each other. But it's also intense. The colors get everywhere, and I mean everywhere. They'll stain your clothes, your skin, and anything else they touch.</p>
      
      <p>My advice: wear old clothes, keep your phone in a waterproof bag, and embrace the chaos. The locals will welcome you with open arms, and you'll make friends you'll never forget.</p>
      
      <blockquote>
        "During Holi, everyone is equal. Rich or poor, young or old — we're all just people covered in color."
      </blockquote>
      
      <h2>Diwali: the festival of lights</h2>
      
      <p>Diwali is quieter than Holi, but no less spectacular. The streets are lit with millions of diyas (clay lamps), and the air is filled with the sound of firecrackers. Families open their homes to visitors, and there's sweets and snacks at every turn.</p>
      
      <p>What surprised me most was the warmth of the hospitality. Strangers invited me into their homes for dinner. Children showed me how to light firecrackers safely. It was a side of India that guidebooks simply cannot capture.</p>
    `,
    author: "Neha Rao",
    date: "May 30, 2026",
    readTime: "6 min read",
    coverImage:
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&h=600&fit=crop",
  },
  {
    slug: "himalayan-trek-solo",
    title: "Going Solo on the Hampta Pass Trek at 31",
    excerpt:
      "I had never trekked above 3,000 metres. This is an honest account of altitude sickness, bad weather, and the most beautiful silence I have ever heard.",
    content: `
      <p>At 31, I decided to do something I'd never done before: trek solo in the Himalayas. The Hampta Pass trek in Himachal Pradesh seemed like the perfect challenge — not too difficult for a beginner, but challenging enough to feel like an achievement.</p>
      
      <p>What I didn't anticipate was the altitude sickness that would hit me on the second day, the sudden hailstorm that appeared out of nowhere, or the profound silence that would change the way I think about solitude.</p>
      
      <h2>Day 1: excitement and naivety</h2>
      
      <p>The first day was easy. The trail was well-marked, the weather was perfect, and I was feeling confident. I walked through pine forests, crossed small streams, and made it to the campsite by 3 PM. I set up my tent, cooked dinner, and fell asleep under a sky full of stars.</p>
      
      <p>I thought I had this in the bag.</p>
      
      <blockquote>
        "The mountains don't care about your plans. They're going to do what they want, and you have to be ready for it."
      </blockquote>
      
      <h2>Day 3: the altitude hits</h2>
      
      <p>On the third day, I started feeling lightheaded and nauseous. My head was pounding, and I could barely walk 100 metres without stopping to catch my breath. That's when I realized I had altitude sickness, and it was only going to get worse if I kept pushing.</p>
      
      <p>I made the decision to descend, which was humbling but necessary. The trekking guide I met told me that many first-timers make the same mistake of pushing too hard. He was right.</p>
      
      <h2>The silence that changed me</h2>
      
      <p>On the fourth day, after I had recovered, I found a quiet spot away from the trail. I sat there for an hour, just watching the clouds move across the valley. There was no sound except the wind and the distant call of birds.</p>
      
      <p>It was the most beautiful silence I have ever heard.</p>
    `,
    author: "Rohan Verma",
    date: "May 22, 2026",
    readTime: "10 min read",
    coverImage:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=600&fit=crop",
  },
  {
    slug: "budget-europe-rail",
    title: "A Budget Rail Route Across Europe for Under ₹80,000",
    excerpt:
      "Eurail passes are rarely the cheapest option. Here is the exact route, booking strategy, and accommodation mix that kept two weeks in Europe affordable.",
    content: `
      <p>When I tell people I spent two weeks in Europe for under ₹80,000 (about €900), they usually don't believe me. But it's true. The secret? Ditching the Eurail pass and booking individual train tickets in advance.</p>
      
      <p>Eurail passes might look like a good deal, but unless you're traveling every single day, they're rarely the cheapest option. Individual tickets, booked 2-3 months in advance, are almost always cheaper.</p>
      
      <h2>My 14-day route</h2>
      
      <ul>
        <li><strong>Paris → Amsterdam:</strong> €35 (Thalys, booked 2 months ahead)</li>
        <li><strong>Amsterdam → Berlin:</strong> €45 (ICE train, booked 2 months ahead)</li>
        <li><strong>Berlin → Prague:</strong> €29 (Czech Railways, booked 1 month ahead)</li>
        <li><strong>Prague → Vienna:</strong> €28 (ÖBB, booked 1 month ahead)</li>
        <li><strong>Vienna → Budapest:</strong> €19 (Hungarian Railways, booked 2 months ahead)</li>
        <li><strong>Budapest → Zagreb:</strong> €22 (Croatian Railways, booked 1 month ahead)</li>
      </ul>
      
      <blockquote>
        "The key to budget rail travel in Europe is not the pass — it's planning ahead and being flexible."
      </blockquote>
      
      <h2>Accommodation strategy</h2>
      
      <p>I mixed hostels with budget hotels and Airbnb rooms. In more expensive cities like Paris and Amsterdam, I stayed in hostels. In Prague and Budapest, I found private rooms on Airbnb for the same price as a hostel bed in Paris.</p>
      
      <p>I also used night trains for two of the long journeys, which saved me a night of accommodation and gave me more time in each city.</p>
    `,
    author: "Arjun Sinha",
    date: "May 15, 2026",
    readTime: "7 min read",
    coverImage:
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&h=600&fit=crop",
  },
  {
    slug: "kyoto-side-streets",
    title: "Kyoto's Side Streets: A Neighbourhood-by-Neighbourhood Guide",
    excerpt:
      "Fushimi Inari before 6 AM. A tofu restaurant that seats eight. A moss garden in a ward no one mentions. The Kyoto you will not find on a travel reel.",
    content: `
      <p>Kyoto is one of those cities that rewards the curious traveler. The main tourist attractions are beautiful, but the real magic is in the side streets, the quiet neighborhoods, and the places that aren't on any Instagram feed.</p>
      
      <p>I spent a month in Kyoto, and here are my favorite discoveries.</p>
      
      <h2>Fushimi Inari at dawn</h2>
      
      <p>Everyone goes to Fushimi Inari, but almost no one goes at 6 AM. The torii gates are empty, the light is golden, and you can hear the birds instead of the crowds. It's a completely different experience from the tourist-filled afternoon.</p>
      
      <h2>The moss garden of Gion</h2>
      
      <p>There's a moss garden in Gion that almost no one knows about. It's hidden behind a small temple, and the entrance is easy to miss. Inside, there's a carpet of moss so perfect it looks like velvet, and the sun filters through the trees in a way that feels almost sacred.</p>
      
      <blockquote>
        "In Kyoto, the best things are often the ones you have to look for."
      </blockquote>
      
      <h2>A tofu restaurant that seats eight</h2>
      
      <p>On a side street in Nishiki Market, there's a tofu restaurant that seats exactly eight people. The menu is fixed, the portions are small, and the flavors are extraordinary. The chef has been making tofu for 40 years, and you can taste the dedication in every bite.</p>
      
      <p>It's not cheap, and it's not fast, but it's one of the best meals I've ever had.</p>
    `,
    author: "Priya Mehta",
    date: "May 5, 2026",
    readTime: "9 min read",
    coverImage:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop",
  },
  {
    slug: "is-bali-worth-to-visit",
    title: "Is Bali Worth To Visit",
    excerpt:
      "Yes, bali is one the best destination for couple and friend groups, it has vibrant vibes and beach escape. The best thing about bali is it is good for entire year..",
    content: `
            <p>Bali has been called paradise, and for good reason. It's an island of beautiful beaches, lush jungles, and a culture that will welcome you with open arms. But is it worth visiting in 2026? Absolutely.</p>
            
            <p>Bali is one of those rare places that has something for everyone. Whether you're a couple looking for a romantic getaway, a group of friends seeking adventure, or a solo traveler hoping to find yourself, Bali delivers.</p>
            
            <h2>What makes Bali special</h2>
            
            <ul>
              <li><strong>The beaches:</strong> From Kuta's surf breaks to Nusa Dua's calm waters, there's a beach for every mood</li>
              <li><strong>The food:</strong> Balinese cuisine is some of the most flavorful in the world</li>
              <li><strong>The culture:</strong> The temples, the ceremonies, and the warm hospitality will stay with you forever</li>
              <li><strong>The vibe:</strong> Bali has a laid-back energy that's hard to find anywhere else</li>
            </ul>
            
            <blockquote>
              "Bali isn't just a destination — it's a state of mind."
            </blockquote>
            
            <h2>When to go</h2>
            
            <p>The best thing about Bali is that it's good for the entire year. The dry season (April to October) is ideal for beach activities, while the rainy season (November to March) offers lush green landscapes and fewer crowds.</p>
            
            <p>Whichever you choose, you're in for a treat. Bali is one of those places that just works, no matter when you visit.</p>
          `,
    author: "Priya Mehta",
    date: "June 15, 2026",
    readTime: "12 min read",
    coverImage:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=600&fit=crop",
  },
];

function FeaturedPost({ post }: { post: Post }) {
  return (
    <article className="group grid md:grid-cols-[1fr_auto] gap-8 md:gap-12 items-center bg-white rounded-3xl p-8 md:p-10 border border-gray-100/80 hover:border-gray-200/90 transition-all duration-300 shadow-sm hover:shadow-md">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl md:text-3xl font-semibold text-slate-800 leading-snug group-hover:text-slate-900 transition-colors duration-200">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h2>
        <p className="text-gray-500 leading-relaxed text-[15px] max-w-xl">
          {post.excerpt}
        </p>
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-linear-to-br from-slate-700 to-slate-800 flex items-center justify-center text-white text-xs font-semibold shadow-sm">
              {post.author
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div>
              <p className="text-sm font-medium text-slate-700">{post.author}</p>
              <p className="text-xs text-gray-400">{post.date}</p>
            </div>
          </div>
          <span className="text-xs text-gray-400 bg-gray-50 px-3 py-1 rounded-full">
            {post.readTime}
          </span>
        </div>
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-slate-900 group/link transition-all duration-150 mt-1"
        >
          Read article
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="shrink-0 transition-transform group-hover/link:translate-x-1"
          >
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>

      <div className="hidden md:block w-72 h-56 rounded-2xl overflow-hidden relative shrink-0 bg-linear-to-br from-[#E6F7FC] to-[#cceefa] shadow-sm">
        {post.coverImage ? (
          <Image src={post.coverImage} alt={post.title} fill className="object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300 text-sm">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
          </div>
        )}
      </div>
    </article>
  );
}

function PostCard({ post }: { post: Post }) {
  return (
    <article className="group flex flex-col bg-white rounded-2xl border border-gray-100/80 hover:border-gray-200/90 overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md">
      <div className="relative h-48 w-full overflow-hidden bg-linear-to-br from-[#f0f9ff] to-[#e1f0fa]">
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
          </div>
        )}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-600 shadow-sm border border-white/50">
          {post.readTime}
        </div>
      </div>

      <div className="flex flex-col gap-3 p-5 flex-1">
        <h3 className="text-[17px] font-semibold text-slate-800 leading-snug group-hover:text-slate-900 transition-colors duration-200 line-clamp-2">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed flex-1 line-clamp-2">
          {post.excerpt}
        </p>
        <div className="flex items-center gap-2.5 pt-3 border-t border-gray-50 mt-2">
          <div className="w-7 h-7 rounded-full bg-linear-to-br from-slate-700 to-slate-800 flex items-center justify-center text-white text-[10px] font-semibold shrink-0">
            {post.author
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium text-gray-700 truncate">{post.author}</p>
            <p className="text-xs text-gray-400">{post.date}</p>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function BlogPage() {
  const featuredPosts = posts.filter((p) => p.featured);
  const rest = posts.filter((p) => !p.featured);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % featuredPosts.length);
  }, [isTransitioning, featuredPosts.length]);

  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + featuredPosts.length) % featuredPosts.length);
  }, [isTransitioning, featuredPosts.length]);

  useEffect(() => {
    const timer = setTimeout(() => setIsTransitioning(false), 400);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  useEffect(() => {
    if (featuredPosts.length <= 1) return;
    const interval = setInterval(nextSlide, 8000);
    return () => clearInterval(interval);
  }, [featuredPosts.length, nextSlide]);

  return (
    <div className="min-h-screen bg-[#F8F9FB]">
      {/* Header */}
      <header className="bg-white border-b border-gray-100/80">
        <div className="container mx-auto px-4 sm:px-6 py-14 md:py-20">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 leading-tight mb-4">
              Stories from the road.
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed max-w-xl">
              Honest writing about travel — where to go, how to get there, and
              what it actually feels like when you do.
            </p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 py-10 md:py-14 max-w-6xl">
        {/* Featured section with carousel */}
        {featuredPosts.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                Featured stories
              </h2>
              {featuredPosts.length > 1 && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={prevSlide}
                    aria-label="Previous featured post"
                    className="w-9.5 h-9.5 rounded-full flex items-center justify-center bg-white border border-[#eef2f6] text-slate-800 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-200 hover:bg-slate-800 hover:text-white hover:border-slate-800 hover:shadow-[0_6px_14px_rgba(0,0,0,0.06)] cursor-pointer"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                  </button>
                  <button
                    onClick={nextSlide}
                    aria-label="Next featured post"
                    className="w-9.5 h-9.5 rounded-full flex items-center justify-center bg-white border border-[#eef2f6] text-slate-800 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-200 hover:bg-slate-800 hover:text-white hover:border-slate-800 hover:shadow-[0_6px_14px_rgba(0,0,0,0.06)] cursor-pointer"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                </div>
              )}
            </div>

            <div className="relative overflow-hidden">
              <div
                className="flex transition-transform duration-400 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {featuredPosts.map((post) => (
                  <div key={post.slug} className="min-w-full px-0.5">
                    <FeaturedPost post={post} />
                  </div>
                ))}
              </div>

              {/* Dots indicator */}
              {featuredPosts.length > 1 && (
                <div className="flex justify-center gap-1.5 mt-5">
                  {featuredPosts.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        if (isTransitioning) return;
                        setIsTransitioning(true);
                        setCurrentIndex(idx);
                      }}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        idx === currentIndex
                          ? "w-6 bg-slate-700"
                          : "w-1.5 bg-gray-300 hover:bg-gray-400"
                      }`}
                      aria-label={`Go to featured post ${idx + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Grid */}
        {rest.length > 0 && (
          <>
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                Latest articles
              </h2>
              <span className="h-px flex-1 bg-gray-200/60" />
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {rest.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}