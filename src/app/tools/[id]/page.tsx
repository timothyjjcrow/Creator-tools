import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import tools from "../../../../data/tools.json";
import { ArrowLeft } from "lucide-react";
import ToolCard from "@/components/ToolCard";

interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  url: string;
  freePlanFeatures?: string[];
  freePlanLimitations?: string[];
  idealUseCase?: string;
}

interface Props {
  params: Promise<{ id: string }>;
}

// Generate static paths for all tools
export async function generateStaticParams() {
  return (tools as Tool[]).map((tool) => ({
    id: tool.id,
  }));
}

// Generate metadata for each tool page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const tool = (tools as Tool[]).find((t) => t.id === id);

  if (!tool) {
    return {
      title: "Tool Not Found | Indie Creator Hub",
      description: "The tool you are looking for could not be found.",
    };
  }

  const title = `${tool.name}: Free Tool for ${tool.category} | Indie Creator Hub`;
  const description = `Discover the features, limitations, and ideal use case for ${tool.name}. A free ${tool.category} tool for indie creators. ${tool.description}`;
  const keywords = [
    tool.name,
    `${tool.name} free`,
    `${tool.name} alternative`,
    tool.category,
    ...tool.tags,
    "free creator tools",
    "indie creator",
  ];

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://www.indiecreatorhub.com/tools/${tool.id}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tool: Tool | undefined = (tools as Tool[]).find((t) => t.id === id);

  if (!tool) {
    notFound();
  }

  const toolUrl = tool.url;
  const relatedTools = (tools as Tool[])
    .filter((t) => t.category === tool.category && t.id !== tool.id)
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    applicationCategory: tool.category,
    description: tool.description,
    url: tool.url.startsWith("http")
      ? tool.url
      : `https://www.indiecreatorhub.com${tool.url}`,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <div className="bg-white min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <header className="mb-8">
          <Link
            href="/tools"
            className="inline-flex items-center text-blue-600 hover:underline mb-4"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Tools
          </Link>
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full mb-2">
                {tool.category}
              </span>
              <h1 className="text-4xl font-extrabold text-gray-900">
                {tool.name}
              </h1>
              <p className="mt-2 text-lg text-gray-600">{tool.description}</p>
            </div>
            <a
              href={toolUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 whitespace-nowrap"
            >
              Try Tool
            </a>
          </div>
          <div className="flex flex-wrap gap-2">
            {tool.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-sm font-medium text-gray-700 bg-gray-200 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        </header>

        <main>
          {tool.freePlanFeatures && tool.freePlanLimitations && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Free Plan Features
                </h2>
                <ul className="space-y-2">
                  {tool.freePlanFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2">✔</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-red-50 p-6 rounded-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Free Plan Limitations
                </h2>
                <ul className="space-y-2">
                  {tool.freePlanLimitations.map((limit, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-red-500 mr-2">✖</span>
                      <span className="text-gray-700">{limit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {tool.idealUseCase && (
            <div className="mt-8 bg-blue-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Ideal Use Case
              </h2>
              <p className="text-gray-700">{tool.idealUseCase}</p>
            </div>
          )}

          {relatedTools.length > 0 && (
            <div className="mt-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Related Tools in {tool.category}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedTools.map((relatedTool) => (
                  <ToolCard key={relatedTool.id} tool={relatedTool} />
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
