"use client";

import { useState } from "react";
import Link from "next/link";

interface ToolRecommendation {
  name: string;
  description: string;
  features: string[];
  url: string;
  type: "online" | "desktop" | "browser-extension" | "mobile";
  pros: string[];
  cons: string[];
  free: boolean;
}

export default function YouTubeDownloadResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const recommendations: ToolRecommendation[] = [
    {
      name: "yt-dlp",
      description:
        "A powerful command-line tool and the most popular YouTube downloader among developers",
      features: [
        "Command-line interface",
        "Supports 1000+ sites",
        "High-quality downloads",
        "Regular updates",
      ],
      url: "https://github.com/yt-dlp/yt-dlp",
      type: "desktop",
      pros: [
        "Completely free",
        "Regularly updated",
        "Supports many formats",
        "No ads",
      ],
      cons: ["Command-line only", "Requires technical knowledge"],
      free: true,
    },
    {
      name: "4K Video Downloader",
      description:
        "User-friendly desktop application with a clean interface for downloading YouTube videos",
      features: [
        "Desktop app",
        "Batch downloads",
        "Subtitles support",
        "Playlist downloads",
      ],
      url: "https://www.4kdownload.com/products/product-videodownloader",
      type: "desktop",
      pros: [
        "Easy to use",
        "High quality",
        "Batch downloads",
        "Cross-platform",
      ],
      cons: ["Limited free version", "Premium features cost money"],
      free: false,
    },
    {
      name: "Y2Mate",
      description:
        "Popular online YouTube downloader that works directly in your browser",
      features: [
        "No software installation",
        "Multiple formats",
        "Audio extraction",
        "Quick conversion",
      ],
      url: "https://www.y2mate.com",
      type: "online",
      pros: [
        "No installation needed",
        "Works on any device",
        "Multiple formats",
      ],
      cons: [
        "Ads present",
        "Quality limitations",
        "Internet connection required",
      ],
      free: true,
    },
    {
      name: "ClipGrab",
      description:
        "Free desktop downloader with integrated search and simple interface",
      features: [
        "Built-in search",
        "Format conversion",
        "Quality selection",
        "Batch processing",
      ],
      url: "https://clipgrab.org",
      type: "desktop",
      pros: ["Completely free", "Built-in search", "Easy interface", "No ads"],
      cons: ["Limited advanced features", "Slower updates"],
      free: true,
    },
    {
      name: "NewPipe (Android)",
      description:
        "Open-source YouTube client for Android with download capabilities",
      features: [
        "Ad-free YouTube",
        "Background playback",
        "Download videos",
        "No Google services required",
      ],
      url: "https://newpipe.net",
      type: "mobile",
      pros: ["Open source", "Privacy-focused", "No ads", "Background play"],
      cons: ["Android only", "Not on Play Store", "Requires APK installation"],
      free: true,
    },
    {
      name: "ByClick Downloader",
      description:
        "One-click desktop downloader that automatically detects YouTube videos",
      features: [
        "One-click downloads",
        "Auto-detection",
        "Playlist support",
        "MP3 conversion",
      ],
      url: "https://www.byclickdownloader.com",
      type: "desktop",
      pros: [
        "Very easy to use",
        "Auto-detection",
        "Good quality",
        "Fast downloads",
      ],
      cons: [
        "Premium features",
        "Windows only",
        "Contains ads in free version",
      ],
      free: false,
    },
  ];

  const categories = [
    { id: "all", label: "All Tools", count: recommendations.length },
    {
      id: "online",
      label: "Online Tools",
      count: recommendations.filter((r) => r.type === "online").length,
    },
    {
      id: "desktop",
      label: "Desktop Apps",
      count: recommendations.filter((r) => r.type === "desktop").length,
    },
    {
      id: "mobile",
      label: "Mobile Apps",
      count: recommendations.filter((r) => r.type === "mobile").length,
    },
    {
      id: "free",
      label: "Free Only",
      count: recommendations.filter((r) => r.free).length,
    },
  ];

  const filteredRecommendations = recommendations.filter((tool) => {
    if (selectedCategory === "all") return true;
    if (selectedCategory === "free") return tool.free;
    return tool.type === selectedCategory;
  });

  const legalGuidelines = [
    {
      icon: "✅",
      title: "Your Own Content",
      description: "Download videos you've created and uploaded yourself",
    },
    {
      icon: "✅",
      title: "Creative Commons",
      description:
        "Videos with Creative Commons licenses allow downloads with proper attribution",
    },
    {
      icon: "✅",
      title: "Educational Use",
      description:
        "Fair use for educational purposes, research, and criticism (with proper citation)",
    },
    {
      icon: "⚠️",
      title: "Copyright Content",
      description:
        "Most YouTube videos are copyrighted - downloading may violate terms of service",
    },
    {
      icon: "❌",
      title: "Commercial Use",
      description:
        "Don't download and redistribute copyrighted content for commercial purposes",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          YouTube Download Resources
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover the best tools and methods for downloading YouTube videos
          responsibly. Find the right solution for your needs while respecting
          creators' rights.
        </p>
      </div>

      {/* Legal Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8">
        <div className="flex items-center mb-3">
          <div className="text-2xl mr-3">⚖️</div>
          <h2 className="text-xl font-semibold text-amber-800">
            Important Legal Notice
          </h2>
        </div>
        <p className="text-amber-700 mb-4">
          Always respect copyright laws and YouTube's Terms of Service. Only
          download content you have permission to use.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {legalGuidelines.map((guideline, index) => (
            <div key={index} className="flex items-start space-x-2">
              <span className="text-lg">{guideline.icon}</span>
              <div>
                <div className="font-medium text-amber-800">
                  {guideline.title}
                </div>
                <div className="text-sm text-amber-600">
                  {guideline.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                selectedCategory === category.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category.label} ({category.count})
            </button>
          ))}
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {filteredRecommendations.map((tool, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md border hover:shadow-lg transition-shadow duration-200"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-semibold text-gray-900">
                  {tool.name}
                </h3>
                <div className="flex items-center space-x-2">
                  {tool.free ? (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      FREE
                    </span>
                  ) : (
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      PAID
                    </span>
                  )}
                  <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full capitalize">
                    {tool.type.replace("-", " ")}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-4">{tool.description}</p>

              {/* Features */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">
                  Key Features:
                </h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {tool.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <span className="text-green-500 mr-2">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pros & Cons */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="text-sm font-medium text-green-700 mb-2">
                    Pros:
                  </h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {tool.pros.slice(0, 2).map((pro, idx) => (
                      <li key={idx} className="flex items-center">
                        <span className="text-green-500 mr-1">+</span>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-red-700 mb-2">
                    Cons:
                  </h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {tool.cons.slice(0, 2).map((con, idx) => (
                      <li key={idx} className="flex items-center">
                        <span className="text-red-500 mr-1">-</span>
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* CTA */}
              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
              >
                Visit {tool.name} →
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Resources */}
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          📚 Additional Resources
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">
              🔧 Technical Guides
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/yt-dlp/yt-dlp#installation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  How to install yt-dlp
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/yt-dlp/yt-dlp#usage-and-options"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  yt-dlp command line guide
                </a>
              </li>
              <li>
                <a
                  href="https://ffmpeg.org/download.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  FFmpeg (required for some tools)
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">
              ⚖️ Legal Information
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.youtube.com/t/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  YouTube Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="https://creativecommons.org/share-your-work/licensing-types-examples/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  Creative Commons License Guide
                </a>
              </li>
              <li>
                <a
                  href="https://www.copyright.gov/fair-use/more-info.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  Fair Use Guidelines
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <div className="bg-blue-50 rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          💡 Pro Tips
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white rounded p-4">
            <h3 className="font-medium text-gray-900 mb-2">
              🎯 Choose the Right Tool
            </h3>
            <p className="text-sm text-gray-600">
              Use online tools for occasional downloads, desktop apps for
              regular use, and command-line tools for automation.
            </p>
          </div>
          <div className="bg-white rounded p-4">
            <h3 className="font-medium text-gray-900 mb-2">🔒 Stay Safe</h3>
            <p className="text-sm text-gray-600">
              Always download from official sources. Avoid suspicious websites
              that might contain malware.
            </p>
          </div>
          <div className="bg-white rounded p-4">
            <h3 className="font-medium text-gray-900 mb-2">
              📱 Mobile Options
            </h3>
            <p className="text-sm text-gray-600">
              For mobile devices, consider apps like NewPipe (Android) or use
              online tools through your browser.
            </p>
          </div>
          <div className="bg-white rounded p-4">
            <h3 className="font-medium text-gray-900 mb-2">🎵 Audio Only</h3>
            <p className="text-sm text-gray-600">
              Most tools support extracting audio-only files if you just need
              the music or podcast content.
            </p>
          </div>
          <div className="bg-white rounded p-4">
            <h3 className="font-medium text-gray-900 mb-2">
              📦 Batch Downloads
            </h3>
            <p className="text-sm text-gray-600">
              For downloading entire playlists or channels, use desktop tools
              like 4K Video Downloader or yt-dlp.
            </p>
          </div>
          <div className="bg-white rounded p-4">
            <h3 className="font-medium text-gray-900 mb-2">
              🎬 Respect Creators
            </h3>
            <p className="text-sm text-gray-600">
              Consider supporting creators through official channels,
              subscriptions, or merchandise when possible.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-8">
        <p className="text-gray-600 mb-4">Looking for other creator tools?</p>
        <Link
          href="/tools"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Explore All Tools →
        </Link>
      </div>
    </div>
  );
}
