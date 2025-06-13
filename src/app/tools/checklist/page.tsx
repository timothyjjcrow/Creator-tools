"use client";

import { useState } from "react";
import Link from "next/link";

interface ChecklistItem {
  id: string;
  text: string;
  description: string;
  timeEstimate: string;
  difficulty: "easy" | "medium" | "hard";
  tools: Array<{
    name: string;
    url: string;
    description: string;
    free: boolean;
  }>;
  resources: Array<{
    title: string;
    url: string;
    type: "guide" | "template" | "tool" | "course";
  }>;
  completed: boolean;
  dependencies?: string[];
}

interface ProjectTemplate {
  name: string;
  description: string;
  duration: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  category: string;
  roi: string;
  tasks: Omit<ChecklistItem, "completed">[];
}

const projectTemplates: Record<string, ProjectTemplate> = {
  "viral-content": {
    name: "Viral Content Creation",
    description:
      "Create content with viral potential using proven frameworks and strategies",
    duration: "3-5 days",
    difficulty: "intermediate",
    category: "Content Creation",
    roi: "High engagement & reach",
    tasks: [
      {
        id: "research-trends",
        text: "Research current trends and viral patterns",
        description:
          "Analyze trending content in your niche to identify patterns, formats, and topics that resonate with audiences",
        timeEstimate: "2-3 hours",
        difficulty: "easy",
        tools: [
          {
            name: "BuzzSumo",
            url: "https://buzzsumo.com",
            description: "Find trending content and analyze performance",
            free: false,
          },
          {
            name: "Google Trends",
            url: "https://trends.google.com",
            description: "Track search trends and interests",
            free: true,
          },
          {
            name: "TikTok Creative Center",
            url: "https://ads.tiktok.com/business/creativecenter",
            description: "Discover trending hashtags and sounds",
            free: true,
          },
        ],
        resources: [
          {
            title: "Viral Marketing Case Studies",
            url: "https://www.itsfundoingmarketing.com/blog/viral-marketing-campaign-examples-case-studies",
            type: "guide",
          },
          {
            title: "Content Strategy & Analysis Template",
            url: "https://explodingtopics.com/blog/content-strategy-template",
            type: "template",
          },
        ],
      },
      {
        id: "hook-creation",
        text: "Create compelling hooks and opening lines",
        description:
          "Develop attention-grabbing openings that make people stop scrolling within the first 3 seconds",
        timeEstimate: "1-2 hours",
        difficulty: "medium",
        tools: [
          {
            name: "CoSchedule Headline Analyzer",
            url: "https://coschedule.com/headline-analyzer",
            description: "Optimize your headlines for engagement",
            free: true,
          },
          {
            name: "Portent's Content Idea Generator",
            url: "https://www.portent.com/tools/title-maker",
            description: "Generate creative title ideas",
            free: true,
          },
        ],
        resources: [
          {
            title: "14 Proven Hook Formulas & Examples",
            url: "https://sendshort.ai/guides/tiktok-hooks/",
            type: "guide",
          },
          {
            title: "150+ Social Media Hook Templates",
            url: "https://blog.hootsuite.com/social-media-hooks/",
            type: "guide",
          },
        ],
        dependencies: ["research-trends"],
      },
      {
        id: "content-framework",
        text: "Apply proven viral content frameworks",
        description:
          "Use frameworks like AIDA, Problem-Agitation-Solution, or Storytelling to structure your content",
        timeEstimate: "30-60 minutes",
        difficulty: "medium",
        tools: [
          {
            name: "Content Framework Templates",
            url: "https://www.notion.com/templates/marketing",
            description: "Ready-to-use content structures",
            free: true,
          },
        ],
        resources: [
          {
            title: "AIDA Framework Guide",
            url: "https://blog.hubspot.com/marketing/aida-model",
            type: "guide",
          },
          {
            title: "Storytelling for Content Creators",
            url: "https://blog.hubspot.com/marketing/storytelling",
            type: "course",
          },
        ],
        dependencies: ["hook-creation"],
      },
      {
        id: "visual-optimization",
        text: "Create scroll-stopping visuals",
        description:
          "Design eye-catching thumbnails, graphics, or video elements that stand out in feeds",
        timeEstimate: "2-4 hours",
        difficulty: "medium",
        tools: [
          {
            name: "Canva",
            url: "https://www.canva.com",
            description: "Design graphics and thumbnails",
            free: true,
          },
          {
            name: "Figma",
            url: "https://www.figma.com",
            description: "Professional design tool",
            free: true,
          },
          {
            name: "Unsplash",
            url: "https://unsplash.com",
            description: "High-quality stock photos",
            free: true,
          },
        ],
        resources: [
          {
            title: "Ultimate Guide to YouTube Thumbnails",
            url: "https://podcastle.ai/blog/how-to-make-youtube-thumbnails/",
            type: "guide",
          },
          {
            title: "Color Psychology in Design",
            url: "https://blog.hubspot.com/the-hustle/psychology-of-color",
            type: "guide",
          },
        ],
      },
      {
        id: "engagement-optimization",
        text: "Optimize for platform-specific engagement",
        description:
          "Tailor content format, length, and style for maximum engagement on your chosen platform",
        timeEstimate: "1-2 hours",
        difficulty: "medium",
        tools: [
          {
            name: "Later",
            url: "https://later.com",
            description: "Schedule and optimize posts",
            free: true,
          },
          {
            name: "Loom",
            url: "https://www.loom.com",
            description: "Create quick video content",
            free: true,
          },
        ],
        resources: [
          {
            title: "Platform-Specific Best Practices",
            url: "https://sproutsocial.com/insights/social-media-best-practices/",
            type: "guide",
          },
          {
            title: "Engagement Rate Calculator",
            url: "https://www.omnicalculator.com/other/engagement-rate",
            type: "tool",
          },
        ],
        dependencies: ["visual-optimization"],
      },
    ],
  },
  "youtube-growth": {
    name: "YouTube Growth Strategy",
    description:
      "A step-by-step plan to grow your YouTube channel, from auditing your current state to optimizing for the algorithm.",
    duration: "2-3 weeks",
    difficulty: "intermediate",
    category: "Video Content",
    roi: "Long-term passive income",
    tasks: [
      {
        id: "channel-audit",
        text: "Conduct a Channel Audit",
        description:
          "Analyze your current channel performance, identify strengths, weaknesses, and optimization opportunities",
        timeEstimate: "3-4 hours",
        difficulty: "easy",
        tools: [
          {
            name: "YouTube Analytics",
            url: "https://studio.youtube.com",
            description: "Built-in analytics dashboard",
            free: true,
          },
          {
            name: "TubeBuddy",
            url: "https://www.tubebuddy.com",
            description: "Browser extension for YouTube optimization",
            free: true,
          },
        ],
        resources: [
          {
            title: "How to Conduct a YouTube Channel Audit",
            url: "https://backlinko.com/youtube-channel-audit",
            type: "guide",
          },
          {
            title: "YouTube Channel Audit Template",
            url: "https://docs.google.com/document/d/1vB-2zi_nQE3-jGud2yv_2v4yW3z5B5B3/edit",
            type: "template",
          },
        ],
      },
      {
        id: "keyword-research",
        text: "Perform Keyword Research",
        description:
          "Find relevant keywords to target in your titles, descriptions, and tags",
        timeEstimate: "2-3 hours",
        difficulty: "medium",
        tools: [
          {
            name: "VidIQ",
            url: "https://vidiq.com",
            description: "YouTube keyword research tool",
            free: true,
          },
          {
            name: "Google Keyword Planner",
            url: "https://ads.google.com/home/tools/keyword-planner/",
            description: "General keyword research tool",
            free: true,
          },
        ],
        resources: [
          {
            title: "Complete Guide to YouTube Keyword Research",
            url: "https://ahrefs.com/blog/youtube-keyword-research/",
            type: "guide",
          },
        ],
        dependencies: ["channel-audit"],
      },
      {
        id: "content-strategy",
        text: "Develop a Content Strategy",
        description:
          "Plan your content pillars, formats, and publishing schedule based on your audit and keyword research",
        timeEstimate: "4-6 hours",
        difficulty: "medium",
        tools: [
          {
            name: "Notion",
            url: "https://notion.so",
            description: "All-in-one workspace for planning",
            free: true,
          },
          {
            name: "Trello",
            url: "https://trello.com",
            description: "Visual project management",
            free: true,
          },
        ],
        resources: [
          {
            title: "How to Create a YouTube Content Strategy",
            url: "https://blog.hootsuite.com/youtube-content-strategy/",
            type: "guide",
          },
        ],
        dependencies: ["keyword-research"],
      },
      {
        id: "thumbnail-design",
        text: "Design High-CTR Thumbnails",
        description:
          "Create compelling, high-contrast thumbnails that entice viewers to click",
        timeEstimate: "1-2 hours per video",
        difficulty: "medium",
        tools: [
          {
            name: "Canva",
            url: "https://www.canva.com",
            description: "Easy-to-use design tool",
            free: true,
          },
          {
            name: "Adobe Photoshop",
            url: "https://www.adobe.com/products/photoshop.html",
            description: "Professional design software",
            free: false,
          },
        ],
        resources: [
          {
            title: "The Science of High-CTR YouTube Thumbnails",
            url: "https://www.socialmediaexaminer.com/how-to-create-youtube-thumbnails-that-drive-views/",
            type: "guide",
          },
        ],
      },
      {
        id: "seo-optimization",
        text: "Optimize Video SEO",
        description:
          "Craft keyword-rich titles, descriptions, and tags to improve discoverability",
        timeEstimate: "30-60 minutes per video",
        difficulty: "medium",
        tools: [
          {
            name: "TubeBuddy",
            url: "https://www.tubebuddy.com",
            description: "SEO optimization toolkit",
            free: true,
          },
        ],
        resources: [
          {
            title: "YouTube SEO: The Complete Guide",
            url: "https://backlinko.com/youtube-seo",
            type: "guide",
          },
        ],
        dependencies: ["keyword-research"],
      },
    ],
  },
  "saas-launch": {
    name: "SaaS Product Launch",
    description: "A comprehensive checklist for launching a new SaaS product",
    duration: "4-6 weeks",
    difficulty: "advanced",
    category: "Business & Marketing",
    roi: "Direct sales & leads",
    tasks: [
      {
        id: "market-research",
        text: "Conduct Market Research",
        description:
          "Identify your target audience, analyze competitors, and define your unique value proposition.",
        timeEstimate: "1-2 weeks",
        difficulty: "hard",
        tools: [
          {
            name: "SurveyMonkey",
            url: "https://www.surveymonkey.com",
            description: "Create and send surveys",
            free: true,
          },
          {
            name: "G2",
            url: "https://www.g2.com",
            description: "Software reviews and competitor analysis",
            free: true,
          },
        ],
        resources: [
          {
            title: "How to Conduct Market Research for a New Product",
            url: "https://www.shopify.com/blog/market-research",
            type: "guide",
          },
        ],
      },
      {
        id: "build-landing-page",
        text: "Build a High-Converting Landing Page",
        description:
          "Design a landing page that clearly communicates your value proposition and encourages sign-ups.",
        timeEstimate: "3-5 days",
        difficulty: "medium",
        tools: [
          {
            name: "Webflow",
            url: "https://webflow.com",
            description: "Build responsive websites without code",
            free: true,
          },
          {
            name: "Unbounce",
            url: "https://unbounce.com",
            description: "Landing page builder and platform",
            free: false,
          },
        ],
        resources: [
          {
            title: "The Ultimate Guide to Landing Page Optimization",
            url: "https://unbounce.com/landing-page-articles/the-ultimate-guide-to-landing-page-optimization/",
            type: "guide",
          },
        ],
        dependencies: ["market-research"],
      },
      {
        id: "setup-analytics",
        text: "Set Up Analytics and Tracking",
        description:
          "Install analytics tools to track website traffic, user behavior, and conversions.",
        timeEstimate: "1 day",
        difficulty: "easy",
        tools: [
          {
            name: "Google Analytics",
            url: "https://analytics.google.com",
            description: "Web analytics service",
            free: true,
          },
          {
            name: "Hotjar",
            url: "https://www.hotjar.com",
            description: "Behavior analytics and feedback data",
            free: true,
          },
        ],
        resources: [
          {
            title: "A Beginner's Guide to Google Analytics",
            url: "https://blog.hubspot.com/marketing/google-analytics",
            type: "guide",
          },
        ],
      },
      {
        id: "email-marketing",
        text: "Set Up Email Marketing & Automation",
        description:
          "Create an email list and set up automated email sequences for onboarding and engagement.",
        timeEstimate: "2-3 days",
        difficulty: "medium",
        tools: [
          {
            name: "Mailchimp",
            url: "https://mailchimp.com",
            description: "Email marketing platform",
            free: true,
          },
          {
            name: "ConvertKit",
            url: "https://convertkit.com",
            description: "Email marketing for creators",
            free: true,
          },
        ],
        resources: [
          {
            title: "The Ultimate Guide to Email Marketing",
            url: "https://www.optinmonster.com/email-marketing-guide/",
            type: "guide",
          },
        ],
      },
      {
        id: "product-hunt-launch",
        text: "Prepare for Product Hunt Launch",
        description:
          "Create your Product Hunt listing, prepare marketing materials, and engage with the community.",
        timeEstimate: "1 week",
        difficulty: "hard",
        tools: [
          {
            name: "Product Hunt",
            url: "https://www.producthunt.com",
            description: "The place to launch your product",
            free: true,
          },
        ],
        resources: [
          {
            title: "The Ultimate Guide to Launching on Product Hunt",
            url: "https://blog.producthunt.com/how-to-launch-on-product-hunt-7c1843e06399",
            type: "guide",
          },
          {
            title: "Product Hunt Launch Checklist",
            url: "https://previewhunt.com",
            type: "tool",
          },
        ],
        dependencies: ["build-landing-page"],
      },
    ],
  },
};

export default function ChecklistPage() {
  const [selectedProject, setSelectedProject] = useState("");
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);
  const [completedCount, setCompletedCount] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", label: "All Templates" },
    { id: "Content Creation", label: "Content Creation" },
    { id: "Video Content", label: "Video Content" },
    { id: "Business & Marketing", label: "Business & Marketing" },
  ];

  const filteredTemplates = Object.entries(projectTemplates).filter(
    ([, template]) =>
      selectedCategory === "all" || template.category === selectedCategory
  );

  const generateChecklist = (projectId: string) => {
    if (!projectId) {
      setChecklist([]);
      setCompletedCount(0);
      setTotalTime(0);
      return;
    }
    const template = projectTemplates[projectId];
    const newChecklist = template.tasks.map((task) => ({
      ...task,
      completed: false,
    }));
    setChecklist(newChecklist);
    setCompletedCount(0);
    const totalMinutes = newChecklist.reduce((acc, task) => {
      const timeParts = task.timeEstimate.split(" ");
      const timeValue = parseInt(timeParts[0], 10);
      const timeUnit = timeParts[1];
      if (timeUnit.startsWith("hour")) {
        return acc + timeValue * 60;
      }
      return acc + timeValue;
    }, 0);
    setTotalTime(totalMinutes);
    setSelectedProject(projectId);
  };

  const toggleTask = (id: string) => {
    const newChecklist = checklist.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setChecklist(newChecklist);
    const newCompletedCount = newChecklist.filter(
      (task) => task.completed
    ).length;
    setCompletedCount(newCompletedCount);

    // Re-evaluate dependencies
    const completedIds = new Set(
      newChecklist.filter((t) => t.completed).map((t) => t.id)
    );
    const updatedChecklist = newChecklist.map((task) => {
      if (task.dependencies && task.dependencies.length > 0) {
        const allDependenciesMet = task.dependencies.every((depId) =>
          completedIds.has(depId)
        );
        if (!allDependenciesMet) {
          return { ...task, completed: false };
        }
      }
      return task;
    });

    setChecklist(updatedChecklist);
  };

  const resetChecklist = () => {
    generateChecklist(selectedProject);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "hard":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getROIEstimate = () => {
    if (!selectedProject) return "";
    return projectTemplates[selectedProject]?.roi || "";
  };

  const sortedTools = (
    tools: Array<{
      name: string;
      url: string;
      description: string;
      free: boolean;
    }>
  ) => {
    return [...tools].sort((a, b) => (a.free === b.free ? 0 : a.free ? -1 : 1));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl mb-4">
          The Ultimate Creator&apos;s Checklist
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Get actionable, step-by-step guidance with tool recommendations, time
          estimates, and proven strategies to complete your creative projects
          successfully.
        </p>
      </div>

      {!selectedProject ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Select a Project Template to Begin
          </h2>
          <p className="text-gray-600 mb-6">
            Generate a step-by-step checklist for your next creative project.
            Select a template to get started, and we&apos;ll provide a clear
            path to success.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full font-medium transition-colors ${
                  selectedCategory === category.id
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {filteredTemplates.map(([id, template]) => (
              <div
                key={id}
                className="bg-white rounded-lg shadow-lg p-6 flex flex-col cursor-pointer transform hover:-translate-y-1 transition-transform"
                onClick={() => generateChecklist(id)}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {template.name}
                </h3>
                <p className="text-gray-600 mb-4 flex-grow">
                  {template.description}
                </p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>
                    <strong>Duration:</strong> {template.duration}
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full capitalize ${getDifficultyColor(
                      template.difficulty
                    )}`}
                  >
                    {template.difficulty}
                  </span>
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  <strong>ROI:</strong> {template.roi}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <button
            onClick={() => setSelectedProject("")}
            className="mb-6 inline-flex items-center text-blue-600 hover:underline"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Back to Templates
          </button>

          <div className="bg-white shadow-xl rounded-lg overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-3xl font-bold text-gray-900">
                {projectTemplates[selectedProject].name}
              </h2>
              <p className="text-gray-600 mt-2">
                {projectTemplates[selectedProject].description}
              </p>
              <div className="mt-4 flex flex-wrap gap-4 text-sm">
                <span className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-1.5 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <strong>Total Time:</strong> {Math.floor(totalTime / 60)}h{" "}
                  {totalTime % 60}m
                </span>
                <span className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-1.5 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path
                      fillRule="evenodd"
                      d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <strong>Tasks:</strong> {completedCount} / {checklist.length}{" "}
                  Completed
                </span>
                <span className="flex items-center">
                  <strong>ROI:</strong> {getROIEstimate()}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{
                    width: `${(completedCount / checklist.length) * 100}%`,
                  }}
                ></div>
              </div>
            </div>

            <div>
              {checklist.map((task, index) => {
                const areDependenciesMet =
                  !task.dependencies ||
                  task.dependencies.every(
                    (depId) => checklist.find((t) => t.id === depId)?.completed
                  );

                return (
                  <div
                    key={task.id}
                    className={`border-b ${
                      !areDependenciesMet ? "bg-gray-100 opacity-70" : ""
                    }`}
                  >
                    <div className="p-6">
                      <div className="flex items-start">
                        <input
                          type="checkbox"
                          id={`task-${task.id}`}
                          checked={task.completed}
                          onChange={() => toggleTask(task.id)}
                          disabled={!areDependenciesMet}
                          className="mt-1 h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 disabled:opacity-50"
                        />
                        <div className="ml-4 flex-grow">
                          <label
                            htmlFor={`task-${task.id}`}
                            className={`font-medium ${
                              task.completed
                                ? "line-through text-gray-500"
                                : "text-gray-900"
                            } ${
                              !areDependenciesMet ? "cursor-not-allowed" : ""
                            }`}
                          >
                            {index + 1}. {task.text}
                          </label>
                          <p
                            className={`text-sm text-gray-600 mt-1 ${
                              !areDependenciesMet ? "italic" : ""
                            }`}
                          >
                            {!areDependenciesMet
                              ? "Complete previous tasks to unlock"
                              : task.description}
                          </p>
                          <div className="mt-3 flex items-center gap-4 text-sm text-gray-500">
                            <span
                              className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getDifficultyColor(
                                task.difficulty
                              )}`}
                            >
                              {task.difficulty}
                            </span>
                            <span>{task.timeEstimate}</span>
                          </div>

                          <div className="mt-4">
                            <h4 className="font-semibold text-sm text-gray-700 mb-2">
                              Recommended Tools
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {sortedTools(task.tools).map((tool) => (
                                <Link
                                  key={tool.name}
                                  href={tool.url}
                                  target="_blank"
                                  className="group"
                                >
                                  <span
                                    className={`px-3 py-1 text-sm rounded-full transition-colors ${
                                      tool.free
                                        ? "bg-green-100 text-green-800 hover:bg-green-200"
                                        : "bg-orange-100 text-orange-800 hover:bg-orange-200"
                                    }`}
                                  >
                                    {tool.name}
                                    <span className="ml-1.5 text-xs">
                                      {tool.free ? "Free" : "Paid"}
                                    </span>
                                  </span>
                                </Link>
                              ))}
                            </div>
                          </div>

                          <div className="mt-4">
                            <h4 className="font-semibold text-sm text-gray-700 mb-2">
                              Helpful Resources
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {task.resources.map((resource) => (
                                <Link
                                  key={resource.title}
                                  href={resource.url}
                                  target="_blank"
                                >
                                  <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors">
                                    {resource.title}
                                    <span className="ml-1.5 text-xs capitalize">
                                      {resource.type}
                                    </span>
                                  </span>
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="p-6 bg-gray-50 text-right">
              <button
                onClick={resetChecklist}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Reset Checklist
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
