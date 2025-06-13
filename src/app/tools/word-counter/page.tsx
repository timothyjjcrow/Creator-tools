"use client";

import { useState, useMemo } from "react";

export default function WordCounterPage() {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, "").length;
    const paragraphs = text.trim()
      ? text.split(/\n\s*\n/).filter((p) => p.trim()).length
      : 0;
    const sentences = text.trim()
      ? text.split(/[.!?]+/).filter((s) => s.trim()).length
      : 0;

    // Average reading speed is 200-250 words per minute, we'll use 225
    const readingTimeMinutes = Math.ceil(words / 225);

    return {
      words,
      characters,
      charactersNoSpaces,
      paragraphs,
      sentences,
      readingTimeMinutes,
    };
  }, [text]);

  const clearText = () => {
    setText("");
  };

  const handleSampleText = () => {
    setText(`Creating content as an indie creator requires dedication, creativity, and the right tools. Whether you're writing a blog post, crafting social media content, or working on your next big project, having reliable tools at your disposal can make all the difference.

The modern creator landscape is more accessible than ever, thanks to the abundance of free and freemium tools available. From writing assistants that help polish your prose to design platforms that make professional graphics achievable for everyone, the barriers to creating high-quality content continue to lower.

Success in content creation isn't just about having great ideas—it's about executing them efficiently and consistently. The right combination of productivity tools, creative software, and analytical platforms can help transform your creative vision into reality.

Remember, the best tool is the one you'll actually use. Start with free options, learn what works for your workflow, and gradually build your toolkit as your needs evolve.`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Word Counter Tool
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Count words, characters, paragraphs, and get reading time estimates
          for your content. Perfect for blog posts, social media, and any
          writing project.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Text Input */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-4">
              <label
                htmlFor="text-input"
                className="text-lg font-medium text-gray-900"
              >
                Enter your text
              </label>
              <div className="flex gap-2">
                <button
                  onClick={handleSampleText}
                  className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
                >
                  Load Sample
                </button>
                <button
                  onClick={clearText}
                  className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                >
                  Clear
                </button>
              </div>
            </div>
            <textarea
              id="text-input"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Start typing or paste your content here..."
              className="w-full h-96 p-4 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 resize-none"
              style={{ fontFamily: "inherit" }}
            />
          </div>
        </div>

        {/* Statistics Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Statistics
            </h2>

            <div className="space-y-4">
              {/* Words */}
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="font-medium text-blue-900">Words</span>
                <span className="text-2xl font-bold text-blue-600">
                  {stats.words.toLocaleString()}
                </span>
              </div>

              {/* Characters */}
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="font-medium text-green-900">Characters</span>
                <span className="text-2xl font-bold text-green-600">
                  {stats.characters.toLocaleString()}
                </span>
              </div>

              {/* Characters (no spaces) */}
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                <span className="font-medium text-purple-900">
                  Characters (no spaces)
                </span>
                <span className="text-2xl font-bold text-purple-600">
                  {stats.charactersNoSpaces.toLocaleString()}
                </span>
              </div>

              {/* Paragraphs */}
              <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                <span className="font-medium text-yellow-900">Paragraphs</span>
                <span className="text-2xl font-bold text-yellow-600">
                  {stats.paragraphs.toLocaleString()}
                </span>
              </div>

              {/* Sentences */}
              <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                <span className="font-medium text-red-900">Sentences</span>
                <span className="text-2xl font-bold text-red-600">
                  {stats.sentences.toLocaleString()}
                </span>
              </div>

              {/* Reading Time */}
              <div className="flex justify-between items-center p-3 bg-indigo-50 rounded-lg">
                <span className="font-medium text-indigo-900">
                  Reading Time
                </span>
                <span className="text-2xl font-bold text-indigo-600">
                  {stats.readingTimeMinutes === 1
                    ? "1 min"
                    : `${stats.readingTimeMinutes} mins`}
                </span>
              </div>
            </div>

            {/* Quick Info */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                Quick Info
              </h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div>• Average reading speed: 225 WPM</div>
                <div>• Updates in real-time as you type</div>
                <div>• Perfect for content planning</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Usage Tips */}
      <div className="mt-12 bg-gray-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          How to Use This Tool
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Perfect For:
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Blog post planning and optimization</li>
              <li>• Social media content creation</li>
              <li>• Academic writing and essays</li>
              <li>• Email newsletter content</li>
              <li>• Script writing and copywriting</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Pro Tips:
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Aim for 300-600 words for blog posts</li>
              <li>• Twitter posts: max 280 characters</li>
              <li>• LinkedIn posts: 150-300 words work best</li>
              <li>• Email subject lines: 50 characters or less</li>
              <li>• Reading time helps with content planning</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
