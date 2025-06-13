"use client";
import { useState, useMemo } from "react";
import tools from "../../../data/tools.json";
import ToolCard from "@/components/ToolCard";
import { Tool } from "../../types";

export default function ToolsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = useMemo(() => {
    const allCategories = tools.map((tool) => tool.category);
    return ["All", ...Array.from(new Set(allCategories))].sort();
  }, []);

  const filteredTools = useMemo(() => {
    return (tools as Tool[]).filter((tool) => {
      const categoryMatch =
        selectedCategory === "All" || tool.category === selectedCategory;
      const searchMatch =
        tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.tags.some((tag: string) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );
      return categoryMatch && searchMatch;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          The Ultimate Creator&apos;s Toolbox
        </h1>
        <p className="mt-3 max-w-md mx-auto text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
          Discover 100+ free and freemium tools to help you create, market, and
          grow your indie business.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-1/4 lg:w-1/5">
          <div className="sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Categories</h2>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                    selectedCategory === category
                      ? "bg-blue-600 text-white font-semibold"
                      : "text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <main className="w-full md:w-3/4 lg:w-4/5">
          <div className="mb-8">
            <input
              type="text"
              placeholder="Search for tools in this category..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
          {filteredTools.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-2xl font-bold text-gray-900">
                No tools found
              </h3>
              <p className="mt-2 text-lg text-gray-500">
                Try adjusting your search or category filters.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
