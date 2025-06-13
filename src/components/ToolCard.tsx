import Link from "next/link";
import { Tool } from "../types";

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  const toolUrl = tool.url;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full transform hover:-translate-y-1 transition-transform duration-300">
      <Link href={`/tools/${tool.id}`} className="block p-6 flex-grow" passHref>
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-700">
          {tool.name}
        </h3>
        <p className="text-gray-600 text-sm mb-4">{tool.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tool.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs font-semibold text-gray-700 bg-gray-200 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      </Link>
      <div className="p-6 pt-0 mt-auto">
        <a
          href={toolUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full text-center block px-4 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try Tool
        </a>
      </div>
    </div>
  );
}
