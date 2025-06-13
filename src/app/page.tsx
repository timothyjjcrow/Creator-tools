import Link from "next/link";
import { Metadata } from "next";
import tools from "../../data/tools.json";

export const metadata: Metadata = {
  title: "Indie Creator Hub: 100+ Free Tools for Content Creators",
  description:
    "Your ultimate directory of free tools for indie creators. Discover the best free software for writing, design, video, marketing, productivity, and more.",
  keywords: [
    "free tools for creators",
    "indie hacker tools",
    "content creator tools",
    "free software",
    "Canva alternative",
    "Figma free",
    "free video editor",
    "free SEO tools",
  ],
};

export default function Home() {
  const categories = [...new Set(tools.map((tool) => tool.category))];
  const popularTools = tools.slice(0, 8);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: "https://www.indiecreatorhub.com",
    name: "Indie Creator Hub",
    description: "The ultimate directory of free tools for indie creators.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.indiecreatorhub.com/tools?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Free Tools for
              <span className="text-blue-600"> Indie Creators</span>
            </h1>
            <p className="text-xl text-gray-900 mb-8 max-w-3xl mx-auto">
              Discover 100+ carefully curated free and freemium tools to power
              your creative journey. From writing to design, video editing to
              marketing - we&apos;ve got you covered.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/tools"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium text-lg transition-colors"
              >
                Browse All Tools
              </Link>
              <Link
                href="/tools/checklist"
                className="bg-white hover:bg-gray-50 text-blue-600 border border-blue-600 px-8 py-3 rounded-lg font-medium text-lg transition-colors"
              >
                Get Project Checklist
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Tools for Every Creator
            </h2>
            <p className="text-lg text-gray-900">
              Whether you&apos;re a writer, designer, podcaster, or YouTuber,
              find the perfect tools for your craft.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Writing Tools */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-lg">
              <div className="text-green-600 mb-4">
                <svg
                  className="w-12 h-12"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                Writing & Editing
              </h3>
              <p className="mb-4 text-gray-900">
                Grammar checkers, writing assistants, and distraction-free
                editors.
              </p>
              <Link
                href="/tools?category=Writing"
                className="text-green-600 font-medium hover:text-green-700"
              >
                Explore Writing Tools →
              </Link>
            </div>

            {/* Design Tools */}
            <div className="bg-gradient-to-br from-purple-50 to-violet-100 p-6 rounded-lg">
              <div className="text-purple-600 mb-4">
                <svg
                  className="w-12 h-12"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                Design & Graphics
              </h3>
              <p className="mb-4 text-gray-900">
                Create stunning visuals, logos, and social media graphics.
              </p>
              <Link
                href="/tools?category=Design"
                className="text-purple-600 font-medium hover:text-purple-700"
              >
                Explore Design Tools →
              </Link>
            </div>

            {/* Video & Audio */}
            <div className="bg-gradient-to-br from-red-50 to-rose-100 p-6 rounded-lg">
              <div className="text-red-600 mb-4">
                <svg
                  className="w-12 h-12"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm3 2h6v4H7V5zm8 8v2h1v-2h-1zm-2-2H4v4h9v-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                Video & Audio
              </h3>
              <p className="mb-4 text-gray-900">
                Edit videos, record podcasts, and create amazing content.
              </p>
              <Link
                href="/tools?category=Media"
                className="text-red-600 font-medium hover:text-red-700"
              >
                Explore Media Tools →
              </Link>
            </div>

            {/* Marketing */}
            <div className="bg-gradient-to-br from-yellow-50 to-amber-100 p-6 rounded-lg">
              <div className="text-yellow-600 mb-4">
                <svg
                  className="w-12 h-12"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                Marketing & Growth
              </h3>
              <p className="mb-4 text-gray-900">
                Social media schedulers, email tools, and analytics platforms.
              </p>
              <Link
                href="/tools?category=Marketing"
                className="text-yellow-600 font-medium hover:text-yellow-700"
              >
                Explore Marketing Tools →
              </Link>
            </div>
          </div>

          {/* Additional Categories Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {/* AI Tools */}
            <div className="bg-gradient-to-br from-indigo-50 to-blue-100 p-6 rounded-lg">
              <div className="text-indigo-600 mb-4">
                <svg
                  className="w-12 h-12"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                AI Assistants
              </h3>
              <p className="mb-4 text-gray-900">
                AI-powered tools for writing, research, and creative assistance.
              </p>
              <Link
                href="/tools?category=AI"
                className="text-indigo-600 font-medium hover:text-indigo-700"
              >
                Explore AI Tools →
              </Link>
            </div>

            {/* Forms & Data Collection */}
            <div className="bg-gradient-to-br from-teal-50 to-cyan-100 p-6 rounded-lg">
              <div className="text-teal-600 mb-4">
                <svg
                  className="w-12 h-12"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                Forms & Surveys
              </h3>
              <p className="mb-4 text-gray-900">
                Collect feedback, create surveys, and gather data from your
                audience.
              </p>
              <Link
                href="/tools?category=Forms"
                className="text-teal-600 font-medium hover:text-teal-700"
              >
                Explore Form Tools →
              </Link>
            </div>

            {/* Website Building */}
            <div className="bg-gradient-to-br from-orange-50 to-red-100 p-6 rounded-lg">
              <div className="text-orange-600 mb-4">
                <svg
                  className="w-12 h-12"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
                    clipRule="evenodd"
                  />
                  <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                Website Building
              </h3>
              <p className="mb-4 text-gray-900">
                Create landing pages, portfolios, and simple websites for free.
              </p>
              <Link
                href="/tools?category=Website"
                className="text-orange-600 font-medium hover:text-orange-700"
              >
                Explore Website Tools →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* All Tools Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Explore Our Full Toolkit
            </h2>
            <p className="text-lg text-gray-900">
              Browse by category or check out some of our most popular tools.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                All Categories
              </h3>
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <Link
                    key={category}
                    href={`/tools?category=${category}`}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium hover:bg-blue-100 hover:text-blue-700 transition-colors"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                Popular Tools
              </h3>
              <div className="space-y-4">
                {popularTools.map((tool) => (
                  <Link
                    key={tool.id}
                    href={`/tools/${tool.id}`}
                    className="block p-4 bg-gray-50 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <p className="font-semibold text-gray-900">{tool.name}</p>
                    <p className="text-sm text-gray-600">{tool.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="bg-yellow-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Support Indie Creator Hub
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            This project is a labor of love, built to help fellow creators like
            you. If you find these tools useful, please consider supporting the
            project. Your contribution helps cover server costs and allows me to
            dedicate more time to adding new tools and features.
          </p>
          <a
            href="https://coff.ee/timothycrowley"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-lg font-medium text-lg transition-colors"
          >
            Buy Me a Coffee ☕
          </a>
        </div>
      </section>

      {/* Why Indie Creator Hub */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Indie Creator Hub?
            </h2>
            <p className="text-lg text-gray-900">
              Discover the benefits of using our curated tools and why we're
              passionate about helping indie creators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Why Indie Creator Hub Feature 1 */}
            <div className="bg-gradient-to-br from-pink-50 to-rose-100 p-6 rounded-lg">
              <div className="text-pink-600 mb-4">
                <svg
                  className="w-12 h-12"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L10 7.586 8.707 6.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                Access to a Wide Range of Tools
              </h3>
              <p className="mb-4 text-gray-900">
                Discover a vast collection of tools across various categories.
              </p>
            </div>

            {/* Why Indie Creator Hub Feature 2 */}
            <div className="bg-gradient-to-br from-teal-50 to-cyan-100 p-6 rounded-lg">
              <div className="text-teal-600 mb-4">
                <svg
                  className="w-12 h-12"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L10 7.586 8.707 6.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                User-Friendly Interface
              </h3>
              <p className="mb-4 text-gray-900">
                Enjoy a seamless and intuitive experience with our tools.
              </p>
            </div>

            {/* Why Indie Creator Hub Feature 3 */}
            <div className="bg-gradient-to-br from-purple-50 to-violet-100 p-6 rounded-lg">
              <div className="text-purple-600 mb-4">
                <svg
                  className="w-12 h-12"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L10 7.586 8.707 6.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                Regular Updates and Improvements
              </h3>
              <p className="mb-4 text-gray-900">
                Stay updated with the latest features and improvements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Tools Preview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Useful Micro-Tools
            </h2>
            <p className="text-lg text-gray-900">
              Quick utilities to help with your daily creative tasks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
            <Link
              href="/tools/word-counter"
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-semibold mb-2 text-gray-900">
                Word Counter
              </h3>
              <p className="text-gray-900">
                Count words, characters, and get reading time estimates.
              </p>
            </Link>

            <Link
              href="/tools/checklist"
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-semibold mb-2 text-gray-900">
                Project Checklist
              </h3>
              <p className="text-gray-900">
                Generate step-by-step checklists for your creative projects.
              </p>
            </Link>

            <Link
              href="/tools/image-editor"
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-semibold mb-2 text-gray-900">
                Image Editor
              </h3>
              <p className="text-gray-900">
                Professional image editing with filters, cropping, text
                overlays, and more.
              </p>
            </Link>

            <Link
              href="/tools/video-converter"
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-semibold mb-2 text-gray-900">
                Video Converter
              </h3>
              <p className="text-gray-900">
                Convert videos between any format - MP4, WebM, AVI, MOV, and
                more.
              </p>
            </Link>

            <Link
              href="/tools/audio-converter"
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-semibold mb-2 text-gray-900">
                Audio Converter
              </h3>
              <p className="text-gray-900">
                Convert audio files between any format - MP3, WAV, FLAC, AAC,
                and more.
              </p>
            </Link>

            <Link
              href="/tools/youtube-downloader"
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-semibold mb-2 text-gray-900">
                YouTube Download Guide
              </h3>
              <p className="text-gray-900">
                Comprehensive guide to the best YouTube download tools and
                methods.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Supercharge Your Creative Workflow?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of creators who use our curated tools to build
            amazing content.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/tools"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-medium text-lg transition-colors"
            >
              Start Exploring Tools
            </Link>
            <Link
              href="/support"
              className="border border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg font-medium text-lg transition-colors"
            >
              Support This Project
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
