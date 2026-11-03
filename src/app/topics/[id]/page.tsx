import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ROADMAP_TOPICS } from "../../../data/roadmap";
import { TopicDetailClient } from "./TopicDetailClient";

interface PageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  return ROADMAP_TOPICS.map((topic) => ({
    id: topic.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const topic = ROADMAP_TOPICS.find((t) => t.id === params.id);
  if (!topic) {
    return {
      title: "Topic Not Found | Backend Engineering Roadmap",
    };
  }

  const title = `${topic.title} (#${topic.number}) | Backend Engineering Roadmap`;
  const description = `${topic.shortSummary} Master ${topic.title} in Phase ${topic.phaseId} (${topic.phaseName}) with production architecture, multi-language code (Go, TypeScript, Python), hands-on challenge ticket, and oral defense questions.`;
  const url = `https://backend-roadmap.vercel.app/topics/${topic.id}`;
  const imageUrl = `https://img.youtube.com/vi/${topic.youtubeId}/maxresdefault.jpg`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Production Backend Engineering Roadmap",
      images: [
        {
          url: imageUrl,
          width: 1280,
          height: 720,
          alt: `${topic.title} preview image`,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default function TopicPage({ params }: PageProps) {
  const topic = ROADMAP_TOPICS.find((t) => t.id === params.id);

  if (!topic) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: topic.title,
    description: topic.shortSummary,
    image: `https://img.youtube.com/vi/${topic.youtubeId}/maxresdefault.jpg`,
    isPartOf: {
      "@type": "Course",
      name: "Production Backend Engineering Roadmap",
      description: "Comprehensive 7-phase production engineering roadmap from networking foundations to distributed consensus.",
      provider: {
        "@type": "Organization",
        name: "Backend Engineering Roadmap",
        sameAs: "https://backend-roadmap.vercel.app",
      },
    },
    learningResourceType: "Roadmap Topic",
    educationalLevel: "Advanced / Production",
    timeRequired: topic.duration,
    keywords: [
      topic.title,
      topic.phaseName,
      "Backend Architecture",
      "Go",
      "TypeScript",
      "Python",
      "System Design",
    ].join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TopicDetailClient topic={topic} />
    </>
  );
}
