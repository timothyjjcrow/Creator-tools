"use client";

import { useState, useEffect } from "react";
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
            description: "YouTube optimization tools",
            free: false,
          },
          {
            name: "VidIQ",
            url: "https://vidiq.com",
            description: "YouTube keyword research and analytics",
            free: true,
          },
        ],
        resources: [
          {
            title: "YouTube Analytics Guide",
            url: "https://support.google.com/youtube/answer/1714323",
            type: "guide",
          },
          {
            title: "YouTube Channel Audit Guide & Checklist",
            url: "https://www.webfx.com/blog/social-media/youtube-audit/",
            type: "guide",
          },
        ],
      },
      {
        id: "keyword-research",
        text: "Perform Keyword Research",
        description:
          "Research high-opportunity keywords and optimize your content for YouTube search and discovery",
        timeEstimate: "2-4 hours",
        difficulty: "medium",
        tools: [
          {
            name: "VidIQ",
            url: "https://vidiq.com",
            description: "YouTube keyword research and analytics",
            free: true,
          },
          {
            name: "TubeBuddy",
            url: "https://www.tubebuddy.com",
            description: "YouTube optimization toolkit",
            free: true,
          },
        ],
        resources: [
          {
            title: "Best YouTube Keyword Research Tools",
            url: "https://www.semrush.com/blog/youtube-keyword-tools/",
            type: "guide",
          },
        ],
        dependencies: ["channel-audit"],
      },
      {
        id: "video-optimization",
        text: "Optimize and Publish Video",
        description:
          "Apply SEO best practices to your video title, description, tags, and thumbnail before publishing",
        timeEstimate: "1-2 hours",
        difficulty: "medium",
        tools: [],
        resources: [
          {
            title: "YouTube SEO: The Complete Guide",
            url: "https://backlinko.com/how-to-rank-youtube-videos",
            type: "guide",
          },
        ],
        dependencies: ["keyword-research"],
      },
      {
        id: "content-calendar-setup",
        text: "Set Up a Content Calendar",
        description:
          "Plan 30 days of content that balances evergreen topics, trending subjects, and audience requests",
        timeEstimate: "2-3 hours",
        difficulty: "medium",
        tools: [
          {
            name: "Notion",
            url: "https://www.notion.so",
            description: "All-in-one planning workspace",
            free: true,
          },
          {
            name: "Trello",
            url: "https://trello.com",
            description: "Visual project management",
            free: true,
          },
          {
            name: "Google Calendar",
            url: "https://calendar.google.com",
            description: "Schedule publishing dates",
            free: true,
          },
        ],
        resources: [
          {
            title: "Content Calendar Template Gallery",
            url: "https://www.notion.so/templates/category/content-calendar",
            type: "template",
          },
          {
            title: "Content Pillar Strategy",
            url: "https://blog.hubspot.com/marketing/content-pillars-for-social-media",
            type: "guide",
          },
        ],
        dependencies: ["keyword-research"],
      },
      {
        id: "thumbnail-system",
        text: "Design consistent thumbnail system",
        description:
          "Create a branded thumbnail template and style guide for consistent, click-worthy visuals",
        timeEstimate: "3-5 hours",
        difficulty: "medium",
        tools: [
          {
            name: "Canva Pro",
            url: "https://www.canva.com/pro",
            description: "Advanced design features",
            free: false,
          },
          {
            name: "Photoshop",
            url: "https://www.adobe.com/products/photoshop.html",
            description: "Professional image editing",
            free: false,
          },
          {
            name: "Thumbnail Test",
            url: "https://thumbnailtest.com",
            description: "A/B test your thumbnails",
            free: false,
          },
        ],
        resources: [
          {
            title: "Thumbnail Psychology Guide",
            url: "https://vidiq.com/blog/post/youtube-custom-thumbnails-ctr/",
            type: "guide",
          },
          {
            title: "Thumbnail Templates Pack",
            url: "https://www.canva.com/templates/youtube-thumbnails/",
            type: "template",
          },
        ],
      },
      {
        id: "engagement-strategy",
        text: "Implement community engagement strategy",
        description:
          "Develop systems for responding to comments, building community, and increasing viewer retention",
        timeEstimate: "2-3 hours setup + ongoing",
        difficulty: "easy",
        tools: [
          {
            name: "YouTube Studio",
            url: "https://studio.youtube.com",
            description: "Manage comments and community",
            free: true,
          },
          {
            name: "Discord",
            url: "https://discord.com",
            description: "Build community outside YouTube",
            free: true,
          },
        ],
        resources: [
          {
            title: "Community Building Guide",
            url: "https://education.hootsuite.com/pages/growing-your-audience",
            type: "guide",
          },
          {
            title: "Comment Response Templates",
            url: "https://vidiq.com/blog/post/responding-youtube-comments/",
            type: "template",
          },
        ],
        dependencies: ["content-calendar-setup"],
      },
    ],
  },
  "newsletter-launch": {
    name: "Newsletter Launch & Growth",
    description:
      "A complete roadmap to launch a successful newsletter and build a loyal subscriber base with valuable content.",
    duration: "2-4 weeks",
    difficulty: "beginner",
    category: "Email Marketing",
    roi: "Direct audience connection",
    tasks: [
      {
        id: "newsletter-strategy",
        text: "Define newsletter strategy and positioning",
        description:
          "Clearly define your newsletter's unique value proposition, target audience, and content themes",
        timeEstimate: "2-3 hours",
        difficulty: "easy",
        tools: [
          {
            name: "Notion",
            url: "https://www.notion.so",
            description: "Document your strategy",
            free: true,
          },
        ],
        resources: [
          {
            title: "Newsletter Strategy Template",
            url: "https://www.notion.com/templates/newsletter",
            type: "template",
          },
          {
            title: "Value Proposition Canvas",
            url: "https://www.strategyzer.com/canvas/value-proposition-canvas",
            type: "template",
          },
        ],
      },
      {
        id: "platform-setup",
        text: "Choose and set up email platform",
        description:
          "Select the right email service provider and configure your account with proper branding and settings",
        timeEstimate: "1-2 hours",
        difficulty: "easy",
        tools: [
          {
            name: "Substack",
            url: "https://substack.com",
            description: "Simple, popular platform for writers",
            free: true,
          },
          {
            name: "beehiiv",
            url: "https://www.beehiiv.com",
            description: "Creator-focused with monetization tools",
            free: true,
          },
          {
            name: "MailerLite",
            url: "https://www.mailerlite.com",
            description: "Easy to use with a good free plan",
            free: true,
          },
        ],
        resources: [
          {
            title: "The 8 Best Email Newsletter Platforms (2025)",
            url: "https://zapier.com/blog/best-email-newsletter-software/",
            type: "guide",
          },
        ],
        dependencies: ["newsletter-strategy"],
      },
      {
        id: "lead-magnet-creation",
        text: "Create a compelling lead magnet",
        description:
          "Design and create a valuable free resource that encourages email signups",
        timeEstimate: "4-8 hours",
        difficulty: "medium",
        tools: [
          {
            name: "Canva",
            url: "https://www.canva.com",
            description: "Design lead magnets",
            free: true,
          },
          {
            name: "Gumroad",
            url: "https://gumroad.com",
            description: "Distribute digital products",
            free: true,
          },
        ],
        resources: [
          {
            title: "20 Effective Lead Magnet Ideas for Creators",
            url: "https://www.theleap.co/blog/lead-magnet-ideas/",
            type: "guide",
          },
          {
            title: "10 High-Quality Lead Magnet Templates",
            url: "https://www.emailaudience.com/lead-magnet-templates/",
            type: "template",
          },
        ],
        dependencies: ["platform-setup"],
      },
      {
        id: "landing-page-creation",
        text: "Create a high-converting landing page",
        description:
          "Create a dedicated signup page that clearly communicates your newsletter's value",
        timeEstimate: "3-5 hours",
        difficulty: "medium",
        tools: [
          {
            name: "Carrd",
            url: "https://carrd.co",
            description: "Simple landing page builder",
            free: true,
          },
          {
            name: "ConvertKit Landing Pages",
            url: "https://convertkit.com/features/landing-pages",
            description: "Built-in landing pages",
            free: true,
          },
        ],
        resources: [
          {
            title: "7 Best Landing Page Builders (2025)",
            url: "https://www.mailerlite.com/blog/best-landing-page-builders",
            type: "guide",
          },
          {
            title: "8-Step Landing Page Copywriting Guide",
            url: "https://getwpfunnels.com/landing-page-copy/",
            type: "guide",
          },
        ],
        dependencies: ["lead-magnet-creation"],
      },
      {
        id: "email-sequence-setup",
        text: "Set up an automated welcome sequence",
        description:
          "Create a series of emails to welcome new subscribers and nurture them with your best content.",
        timeEstimate: "2-3 hours",
        difficulty: "medium",
        tools: [],
        resources: [
          {
            title: "How to Create a Successful Welcome Email Series",
            url: "https://www.engagebay.com/blog/welcome-email-series/",
            type: "guide",
          },
        ],
        dependencies: ["landing-page-creation"],
      },
      {
        id: "content-planning",
        text: "Plan first month of content",
        description:
          "Create a content calendar and write your first 4-6 newsletter issues to establish consistency",
        timeEstimate: "6-10 hours",
        difficulty: "medium",
        tools: [
          {
            name: "Notion",
            url: "https://www.notion.so",
            description: "Content planning and writing",
            free: true,
          },
          {
            name: "Grammarly",
            url: "https://grammarly.com",
            description: "Writing assistance",
            free: true,
          },
        ],
        resources: [
          {
            title: "Newsletter Content Ideas",
            url: "https://www.campaignmonitor.com/blog/email-marketing/must-have-newsletter-ideas/",
            type: "guide",
          },
          {
            title: "Downloadable Content Calendar Templates",
            url: "https://www.smartsheet.com/content/content-calendar-template-examples",
            type: "template",
          },
        ],
        dependencies: ["email-sequence-setup"],
      },
      {
        id: "growth-tactics",
        text: "Implement growth and promotion strategies",
        description:
          "Set up systems for growing your subscriber base through cross-promotion, social media, and partnerships",
        timeEstimate: "3-4 hours",
        difficulty: "medium",
        tools: [
          {
            name: "SparkLoop",
            url: "https://sparkloop.app",
            description: "Newsletter cross-promotion",
            free: false,
          },
        ],
        resources: [
          {
            title: "Newsletter Growth Tactics Guide",
            url: "https://www.getflack.com/p/growyournewsletter",
            type: "guide",
          },
          {
            title: "Beginner's Guide to Beehiiv Recommendations",
            url: "https://academy.beehiiv.com/p/recommendations",
            type: "guide",
          },
        ],
        dependencies: ["content-planning"],
      },
    ],
  },
  "course-creation": {
    name: "Online Course Creation & Launch",
    description:
      "Create, market, and launch a profitable online course from start to finish",
    duration: "6-12 weeks",
    difficulty: "advanced",
    category: "Product Creation",
    roi: "High-value product income",
    tasks: [
      {
        id: "market-validation",
        text: "Validate course idea and market demand",
        description:
          "Research your target audience, analyze competitors, and validate demand before investing time in creation",
        timeEstimate: "8-12 hours",
        difficulty: "medium",
        tools: [
          {
            name: "Google Forms",
            url: "https://forms.google.com",
            description: "Create validation surveys",
            free: true,
          },
          {
            name: "Typeform",
            url: "https://typeform.com",
            description: "Advanced survey builder",
            free: true,
          },
          {
            name: "SimilarWeb",
            url: "https://similarweb.com",
            description: "Competitor analysis",
            free: true,
          },
        ],
        resources: [
          {
            title: "Course Validation Guide",
            url: "https://www.thinkific.com/blog/validate-online-course-concept/",
            type: "guide",
          },
          {
            title: "Market Research Template",
            url: "https://blog.hubspot.com/marketing/buyer-persona-research",
            type: "template",
          },
        ],
      },
      {
        id: "curriculum-design",
        text: "Design comprehensive course curriculum",
        description:
          "Structure your course content into logical modules with clear learning outcomes and progression",
        timeEstimate: "10-15 hours",
        difficulty: "hard",
        tools: [
          {
            name: "Notion",
            url: "https://www.notion.so",
            description: "Organize course structure",
            free: true,
          },
          {
            name: "Mindmeister",
            url: "https://mindmeister.com",
            description: "Mind mapping for course flow",
            free: true,
          },
        ],
        resources: [
          {
            title: "Course Design Framework",
            url: "https://teachable.com/blog/how-to-create-an-online-course",
            type: "guide",
          },
          {
            title: "Curriculum Template",
            url: "https://www.notion.com/templates/course-planner-schedule-and-learning-progress",
            type: "template",
          },
        ],
        dependencies: ["market-validation"],
      },
      {
        id: "content-production",
        text: "Create all course content and materials",
        description:
          "Record videos, write materials, create worksheets, and develop supplementary resources",
        timeEstimate: "40-80 hours",
        difficulty: "hard",
        tools: [
          {
            name: "Loom",
            url: "https://loom.com",
            description: "Screen recording for tutorials",
            free: true,
          },
          {
            name: "OBS Studio",
            url: "https://obsproject.com",
            description: "Advanced recording software",
            free: true,
          },
          {
            name: "Canva",
            url: "https://www.canva.com",
            description: "Create course materials",
            free: true,
          },
          {
            name: "Notion",
            url: "https://www.notion.so",
            description: "Write course content",
            free: true,
          },
        ],
        resources: [
          {
            title: "Video Production Guide",
            url: "https://www.thinkific.com/blog/create-training-videos/",
            type: "guide",
          },
          {
            title: "Course Materials Templates",
            url: "https://www.canva.com/templates/education/",
            type: "template",
          },
        ],
        dependencies: ["curriculum-design"],
      },
      {
        id: "platform-setup",
        text: "Set up course platform and payment processing",
        description:
          "Choose and configure your course hosting platform with proper pricing and payment options",
        timeEstimate: "4-6 hours",
        difficulty: "medium",
        tools: [
          {
            name: "Thinkific",
            url: "https://thinkific.com",
            description: "Comprehensive course platform",
            free: true,
          },
          {
            name: "Teachable",
            url: "https://teachable.com",
            description: "User-friendly course builder",
            free: true,
          },
          {
            name: "Gumroad",
            url: "https://gumroad.com",
            description: "Simple digital product sales",
            free: true,
          },
          {
            name: "Stripe",
            url: "https://stripe.com",
            description: "Payment processing",
            free: true,
          },
        ],
        resources: [
          {
            title: "Platform Comparison Guide",
            url: "https://zapier.com/blog/online-course-platforms/",
            type: "guide",
          },
          {
            title: "Pricing Strategy Guide",
            url: "https://www.thinkific.com/blog/pricing-online-courses/",
            type: "guide",
          },
        ],
        dependencies: ["content-production"],
      },
      {
        id: "launch-strategy",
        text: "Plan and execute course launch campaign",
        description:
          "Create a comprehensive launch strategy including pre-launch marketing, launch sequence, and post-launch follow-up",
        timeEstimate: "15-20 hours",
        difficulty: "hard",
        tools: [
          {
            name: "ConvertKit",
            url: "https://convertkit.com",
            description: "Email launch sequences",
            free: true,
          },
          {
            name: "Later",
            url: "https://later.com",
            description: "Social media scheduling",
            free: true,
          },
          {
            name: "Calendly",
            url: "https://calendly.com",
            description: "Schedule launch calls",
            free: true,
          },
        ],
        resources: [
          {
            title: "Course Launch Blueprint",
            url: "https://teachable.com/blog/the-ultimate-guide-to-launching-your-online-course",
            type: "guide",
          },
          {
            title: "Launch Email Templates",
            url: "https://convertkit.com/product-launch-email",
            type: "template",
          },
        ],
        dependencies: ["platform-setup"],
      },
      {
        id: "community-building",
        text: "Build and engage a community",
        description:
          "Create a space for your students to connect, ask questions, and support each other.",
        timeEstimate: "Ongoing",
        difficulty: "medium",
        tools: [
          {
            name: "Circle.so",
            url: "https://circle.so",
            description: "Modern community platform for creators",
            free: false,
          },
          {
            name: "Discord",
            url: "https://discord.com",
            description: "Popular chat and community platform",
            free: true,
          },
          {
            name: "Facebook Groups",
            url: "https://www.facebook.com/groups",
            description: "Easy-to-start community option",
            free: true,
          },
        ],
        resources: [
          {
            title: "Community Platform Guide",
            url: "https://www.storyprompt.com/blog/community-platforms",
            type: "guide",
          },
          {
            title: "Community Engagement Playbook",
            url: "https://www.educate-me.co/blog/how-to-launch-online-course",
            type: "guide",
          },
        ],
        dependencies: ["launch-strategy"],
      },
    ],
  },
};

export default function ChecklistPage() {
  const [selectedProject, setSelectedProject] = useState("");
  const [customProjectName, setCustomProjectName] = useState("");
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);
  const [showChecklist, setShowChecklist] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [timeSpent, setTimeSpent] = useState(0);

  const categories = [
    "all",
    "Content Creation",
    "Video Content",
    "Email Marketing",
    "Product Creation",
  ];

  const generateChecklist = () => {
    if (!selectedProject) return;

    const template = projectTemplates[selectedProject];
    if (!template) return;

    const items: ChecklistItem[] = template.tasks.map((task) => ({
      ...task,
      completed: false,
    }));

    setChecklist(items);
    setShowChecklist(true);
  };

  const toggleTask = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const resetChecklist = () => {
    setChecklist([]);
    setShowChecklist(false);
    setSelectedProject("");
    setCustomProjectName("");
    setTimeSpent(0);
  };

  const completedTasks = checklist.filter((item) => item.completed).length;
  const totalTasks = checklist.length;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const filteredTemplates =
    selectedCategory === "all"
      ? Object.entries(projectTemplates)
      : Object.entries(projectTemplates).filter(
          ([_, template]) => template.category === selectedCategory
        );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "text-green-600 bg-green-100";
      case "medium":
        return "text-yellow-600 bg-yellow-100";
      case "hard":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getROIEstimate = () => {
    if (!selectedProject) return "";
    return projectTemplates[selectedProject]?.roi || "";
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Smart Project Checklist Generator
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Get actionable, step-by-step guidance with tool recommendations, time
          estimates, and proven strategies to complete your creative projects
          successfully.
        </p>
      </div>

      {!showChecklist ? (
        <div className="space-y-8">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category === "all" ? "All Projects" : category}
              </button>
            ))}
          </div>

          {/* Project Selection */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Choose Your Project Type
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {filteredTemplates.map(([key, template]) => (
                <div
                  key={key}
                  className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${
                    selectedProject === key
                      ? "border-blue-500 bg-blue-50 shadow-md"
                      : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                  }`}
                  onClick={() => setSelectedProject(key)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-gray-900 text-lg">
                      {template.name}
                    </h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        template.difficulty === "beginner"
                          ? "bg-green-100 text-green-800"
                          : template.difficulty === "intermediate"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {template.difficulty}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{template.description}</p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>📅 {template.duration}</span>
                    <span>📈 {template.roi}</span>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <span className="text-xs text-gray-500">
                      {template.tasks.length} actionable steps
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-6">
              <label
                htmlFor="custom-project"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Custom Project Name (Optional)
              </label>
              <input
                type="text"
                id="custom-project"
                value={customProjectName}
                onChange={(e) => setCustomProjectName(e.target.value)}
                placeholder="e.g., My YouTube Channel Growth Sprint, Newsletter Launch Q1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {selectedProject && (
              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">
                  Project Overview:
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-blue-700">Duration:</span>
                    <span className="ml-2 text-blue-900">
                      {projectTemplates[selectedProject].duration}
                    </span>
                  </div>
                  <div>
                    <span className="text-blue-700">Difficulty:</span>
                    <span className="ml-2 text-blue-900 capitalize">
                      {projectTemplates[selectedProject].difficulty}
                    </span>
                  </div>
                  <div>
                    <span className="text-blue-700">Expected ROI:</span>
                    <span className="ml-2 text-blue-900">
                      {projectTemplates[selectedProject].roi}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={generateChecklist}
              disabled={!selectedProject}
              className={`w-full py-3 px-6 rounded-lg font-medium text-lg transition-colors ${
                selectedProject
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Generate Smart Checklist ✨
            </button>
          </div>
        </div>
      ) : (
        /* Generated Checklist */
        <div>
          {/* Progress Header */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">
                {customProjectName || projectTemplates[selectedProject]?.name}{" "}
                Checklist
              </h2>
              <button
                onClick={resetChecklist}
                className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
              >
                New Project
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {completedTasks}/{totalTasks}
                </div>
                <div className="text-sm text-gray-600">Tasks Complete</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {Math.round(progress)}%
                </div>
                <div className="text-sm text-gray-600">Progress</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {getROIEstimate()}
                </div>
                <div className="text-sm text-gray-600">Expected ROI</div>
              </div>
            </div>

            <div className="mb-4">
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {progress === 100 && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">🎉</span>
                  <div>
                    <h4 className="text-green-800 font-bold">
                      Project Completed!
                    </h4>
                    <p className="text-green-700">
                      Congratulations! You've successfully completed all steps.
                      Consider sharing your results or starting your next
                      project!
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Checklist Items */}
          <div className="space-y-4">
            {checklist.map((item, index) => (
              <div
                key={item.id}
                className={`bg-white rounded-lg shadow-sm border border-gray-200 transition-all ${
                  item.completed ? "bg-green-50 border-green-200" : ""
                }`}
              >
                <div className="p-6">
                  <div className="flex items-start">
                    <div className="flex items-center mr-4">
                      <span className="text-sm text-gray-500 w-8 mr-2">
                        {index + 1}.
                      </span>
                      <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={() => toggleTask(item.id)}
                        className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3
                          className={`text-lg font-semibold ${
                            item.completed
                              ? "text-gray-500 line-through"
                              : "text-gray-900"
                          }`}
                        >
                          {item.text}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
                              item.difficulty
                            )}`}
                          >
                            {item.difficulty}
                          </span>
                          <span className="text-sm text-gray-500">
                            ⏱️ {item.timeEstimate}
                          </span>
                          {item.completed && (
                            <span className="text-green-500 text-xl">✅</span>
                          )}
                        </div>
                      </div>

                      <p className="text-gray-600 mb-4">{item.description}</p>

                      {/* Tools Section */}
                      {item.tools.length > 0 && (
                        <div className="mb-4">
                          <h4 className="font-medium text-gray-900 mb-2">
                            🛠️ Recommended Tools:
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {item.tools.map((tool, toolIndex) => (
                              <a
                                key={toolIndex}
                                href={tool.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                              >
                                <div>
                                  <div className="flex items-center">
                                    <span className="font-medium text-gray-900">
                                      {tool.name}
                                    </span>
                                    {tool.free && (
                                      <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                        Free
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-sm text-gray-600">
                                    {tool.description}
                                  </p>
                                </div>
                                <span className="text-blue-600">→</span>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Resources Section */}
                      {item.resources.length > 0 && (
                        <div className="mb-4">
                          <h4 className="font-medium text-gray-900 mb-2">
                            📚 Helpful Resources:
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {item.resources.map((resource, resourceIndex) => (
                              <a
                                key={resourceIndex}
                                href={resource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                              >
                                <div>
                                  <div className="flex items-center">
                                    <span className="font-medium text-blue-900">
                                      {resource.title}
                                    </span>
                                    <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                      {resource.type}
                                    </span>
                                  </div>
                                </div>
                                <span className="text-blue-600">→</span>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Dependencies */}
                      {item.dependencies && item.dependencies.length > 0 && (
                        <div className="text-sm text-amber-700 bg-amber-50 p-2 rounded-lg">
                          ⚠️ Complete these tasks first:{" "}
                          {item.dependencies.join(", ")}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Resources */}
          <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              🚀 Take Your Project Further
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Need More Help?
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Join creator communities for feedback and support</li>
                  <li>• Consider hiring specialists for complex tasks</li>
                  <li>• Document your process for future projects</li>
                  <li>• Track your results and optimize for next time</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Level Up Your Skills:
                </h3>
                <div className="space-y-2">
                  <Link
                    href="/tools"
                    className="block text-blue-600 hover:text-blue-700"
                  >
                    → Explore more creator tools
                  </Link>
                  <a
                    href="https://skillshare.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-blue-600 hover:text-blue-700"
                  >
                    → Take online courses (Skillshare)
                  </a>
                  <a
                    href="https://youtube.com/creators"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-blue-600 hover:text-blue-700"
                  >
                    → YouTube Creator Academy
                  </a>
                  <a
                    href="https://creatoreconomy.so"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-blue-600 hover:text-blue-700"
                  >
                    → Creator Economy Report
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
