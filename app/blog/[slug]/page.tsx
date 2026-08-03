import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

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
      <blockquote>"The best way to find these hidden gems is to talk to the locals. They know where the real magic is."</blockquote>
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
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=600&fit=crop",
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
      <blockquote>"The secret to packing light is to realize that nobody cares if you wear the same shirt twice."</blockquote>
      <h2>What to put in your personal item</h2>
      <p>Your personal item (the bag under the seat) is where you put everything you might need during the flight. This includes your laptop, chargers, medications, a change of clothes (in case your luggage gets delayed), and snacks.</p>
      <p>I also keep a small pouch with all my toiletries in the personal item, so I don't have to rummage through my carry-on in the airport bathroom.</p>
    `,
    author: "Arjun Sinha",
    date: "June 8, 2026",
    readTime: "5 min read",
    coverImage:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&h=600&fit=crop",
  },
  {
    slug: "festival-travel-india",
    title: "Travelling India During Festival Season: What No One Prepares You For",
    excerpt:
      "Holi, Diwali, Pongal — festivals transform cities in ways that guidebooks cannot capture. What to expect, and how to experience them respectfully as an outsider.",
    content: `
      <p>India during festival season is a sensory overload in the best possible way. The streets are alive with music, the air smells like incense and sweets, and everywhere you look, there are celebrations happening. But it's also chaotic, crowded, and overwhelming for the unprepared traveler.</p>
      <p>I've traveled through India during Holi, Diwali, and Pongal, and each one was a completely different experience. Here's what I wish I had known before I went.</p>
      <h2>Holi: the festival of colors</h2>
      <p>Holi is the most famous Indian festival abroad, and for good reason. It's a day of pure joy, where everyone — locals and tourists alike — throws colored powder and water at each other. But it's also intense. The colors get everywhere, and I mean everywhere. They'll stain your clothes, your skin, and anything else they touch.</p>
      <p>My advice: wear old clothes, keep your phone in a waterproof bag, and embrace the chaos. The locals will welcome you with open arms, and you'll make friends you'll never forget.</p>
      <blockquote>"During Holi, everyone is equal. Rich or poor, young or old — we're all just people covered in color."</blockquote>
      <h2>Diwali: the festival of lights</h2>
      <p>Diwali is quieter than Holi, but no less spectacular. The streets are lit with millions of diyas (clay lamps), and the air is filled with the sound of firecrackers. Families open their homes to visitors, and there's sweets and snacks at every turn.</p>
      <p>What surprised me most was the warmth of the hospitality. Strangers invited me into their homes for dinner. Children showed me how to light firecrackers safely. It was a side of India that guidebooks simply cannot capture.</p>
    `,
    author: "Neha Rao",
    date: "May 30, 2026",
    readTime: "6 min read",
    coverImage:
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1200&h=600&fit=crop",
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
      <blockquote>"The mountains don't care about your plans. They're going to do what they want, and you have to be ready for it."</blockquote>
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
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&h=600&fit=crop",
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
      <blockquote>"The key to budget rail travel in Europe is not the pass — it's planning ahead and being flexible."</blockquote>
      <h2>Accommodation strategy</h2>
      <p>I mixed hostels with budget hotels and Airbnb rooms. In more expensive cities like Paris and Amsterdam, I stayed in hostels. In Prague and Budapest, I found private rooms on Airbnb for the same price as a hostel bed in Paris.</p>
      <p>I also used night trains for two of the long journeys, which saved me a night of accommodation and gave me more time in each city.</p>
    `,
    author: "Arjun Sinha",
    date: "May 15, 2026",
    readTime: "7 min read",
    coverImage:
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1200&h=600&fit=crop",
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
      <blockquote>"In Kyoto, the best things are often the ones you have to look for."</blockquote>
      <h2>A tofu restaurant that seats eight</h2>
      <p>On a side street in Nishiki Market, there's a tofu restaurant that seats exactly eight people. The menu is fixed, the portions are small, and the flavors are extraordinary. The chef has been making tofu for 40 years, and you can taste the dedication in every bite.</p>
      <p>It's not cheap, and it's not fast, but it's one of the best meals I've ever had.</p>
    `,
    author: "Priya Mehta",
    date: "May 5, 2026",
    readTime: "9 min read",
    coverImage:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200&h=600&fit=crop",
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
      <blockquote>"Bali isn't just a destination — it's a state of mind."</blockquote>
      <h2>When to go</h2>
      <p>The best thing about Bali is that it's good for the entire year. The dry season (April to October) is ideal for beach activities, while the rainy season (November to March) offers lush green landscapes and fewer crowds.</p>
      <p>Whichever you choose, you're in for a treat. Bali is one of those places that just works, no matter when you visit.</p>
    `,
    author: "Priya Mehta",
    date: "June 15, 2026",
    readTime: "12 min read",
    coverImage:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&h=600&fit=crop",
  },
];

// Generate static params for all slugs
export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

// Generate metadata per post
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) notFound();

  // Related posts: up to 2 others, excluding current
  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <div className="min-h-screen bg-[#F8F9FB]">
      {/* Top nav bar */}
      <header className="bg-white border-b border-gray-100/80 sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center gap-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors duration-150"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="shrink-0"
            >
              <path
                d="M13 8H3M7 4L3 8l4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            All stories
          </Link>
          <span className="h-4 w-px bg-gray-200" />
          <span className="text-sm text-gray-400 truncate">{post.title}</span>
        </div>
      </header>

      {/* Hero cover image */}
      {post.coverImage && (
        <div className="relative w-full h-64 sm:h-80 md:h-105 overflow-hidden bg-linear-to-br from-[#E6F7FC] to-[#cceefa]">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          {/* subtle gradient overlay at bottom */}
          <div className="absolute inset-0 bg-linear-to-t from-[#F8F9FB]/60 to-transparent" />
        </div>
      )}

      {/* Article layout */}
      <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
        {/* Article header */}
        <div className="pt-10 pb-8 border-b border-gray-100">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 leading-tight mb-4">
            {post.title}
          </h1>
          <p className="text-gray-500 text-[17px] leading-relaxed mb-7">
            {post.excerpt}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-linear-to-br from-slate-700 to-slate-800 flex items-center justify-center text-white text-sm font-semibold shadow-sm shrink-0">
                {post.author
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-700">{post.author}</p>
                <p className="text-xs text-gray-400">{post.date}</p>
              </div>
            </div>
            <span className="text-xs text-gray-400 bg-gray-50 border border-gray-100 px-3 py-1 rounded-full ml-auto">
              {post.readTime}
            </span>
          </div>
        </div>

        {/* Article body — prose styles via Tailwind's prose plugin or inline typography */}
        <article
          className="
            py-10
            text-slate-700 leading-relaxed text-[17px]
            [&_p]:mb-6
            [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-slate-800 [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:leading-snug
            [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-slate-800 [&_h3]:mt-8 [&_h3]:mb-3
            [&_ul]:mb-6 [&_ul]:pl-5 [&_ul]:space-y-2 [&_ul]:list-disc [&_ul]:marker:text-slate-400
            [&_ol]:mb-6 [&_ol]:pl-5 [&_ol]:space-y-2 [&_ol]:list-decimal [&_ol]:marker:text-slate-400
            [&_li]:text-slate-700
            [&_strong]:font-semibold [&_strong]:text-slate-800
            [&_blockquote]:border-l-4 [&_blockquote]:border-slate-300 [&_blockquote]:pl-5 [&_blockquote]:my-8
            [&_blockquote]:text-slate-500 [&_blockquote]:italic [&_blockquote]:text-lg
            [&_a]:text-slate-700 [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-slate-900
          "
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Divider */}
        <div className="border-t border-gray-100 mb-12" />

        {/* Author card */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 flex items-start gap-4 mb-12 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-linear-to-br from-slate-700 to-slate-800 flex items-center justify-center text-white font-semibold text-base shrink-0">
            {post.author
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Written by</p>
            <p className="text-base font-semibold text-slate-800">{post.author}</p>
            <p className="text-sm text-gray-500 mt-1">
              Contributing writer at Stories from the Road, covering travel, culture, and the places in between.
            </p>
          </div>
        </div>
      </div>

      {/* Related posts */}
      {related.length > 0 && (
        <div className="border-t border-gray-100 bg-white">
          <div className="container mx-auto px-4 sm:px-6 py-12 max-w-3xl">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-6">
              More stories
            </h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/blog/${rel.slug}`}
                  className="group flex gap-4 items-start p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all duration-200 bg-white"
                >
                  {rel.coverImage && (
                    <div className="relative w-20 h-16 rounded-lg overflow-hidden shrink-0 bg-linear-to-br from-[#f0f9ff] to-[#e1f0fa]">
                      <Image
                        src={rel.coverImage}
                        alt={rel.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-800 group-hover:text-slate-900 leading-snug line-clamp-2 transition-colors">
                      {rel.title}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">{rel.readTime} · {rel.author}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}