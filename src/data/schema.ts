import { z } from "zod";

export const SeniorInsightSchema = z.object({
  quote: z.string().min(10),
  productionLesson: z.string().min(20),
  commonMistake: z.string().min(10),
});

export const CoreDeepDiveSchema = z.object({
  what: z.string().min(20),
  why: z.string().min(20),
  howItWorks: z.array(z.string().min(5)).min(2),
  blueprintTitle: z.string().optional().default(""),
  blueprintCode: z.string().optional().default(""),
  blueprintLanguage: z.string().optional().default(""),
});

export const RecommendedBookSchema = z.object({
  title: z.string().min(3),
  author: z.string().min(2),
  keyChapters: z.string().min(3),
  whyReadThis: z.string().min(10),
  readingUrl: z.string().url(),
});

export const HandsOnChallengeSchema = z.object({
  ticketNumber: z.string().min(2),
  title: z.string().min(5),
  scenario: z.string().min(20),
  acceptanceCriteria: z.array(z.string().min(5)).min(2),
  terminalLab: z.string().optional(),
  hints: z.array(z.string().min(5)).min(1),
  solutionCode: z.string().optional(),
  solutionExplanation: z.string().optional(),
});

export const VideoTimestampSchema = z.object({
  timeFormatted: z.string(),
  seconds: z.number().nonnegative(),
  label: z.string().min(2),
});

export const AdditionalReferenceSchema = z.object({
  title: z.string().min(2),
  url: z.string().url(),
  description: z.string().min(5),
});

export const SelfCheckQuestionSchema = z.object({
  category: z.enum(["WHAT", "WHY", "HOW"]).optional(),
  question: z.string().min(5),
  answerExplanation: z.string().min(10),
});

export const ArchitectureFlowNodeSchema = z.object({
  id: z.string(),
  label: z.string(),
  role: z.string(),
  type: z.enum(["client", "gateway", "service", "cache", "database", "queue", "auth", "storage"]),
});

export const ArchitectureFlowStepSchema = z.object({
  stepNumber: z.number().int().positive(),
  from: z.string(),
  to: z.string(),
  action: z.string(),
  detail: z.string(),
  latency: z.string().optional(),
  isFallback: z.boolean().optional(),
});

export const ArchitectureDiagramFlowSchema = z.object({
  title: z.string(),
  summary: z.string(),
  nodes: z.array(ArchitectureFlowNodeSchema),
  steps: z.array(ArchitectureFlowStepSchema),
});

export const RoadmapTopicSchema = z.object({
  id: z.string().min(3),
  number: z.number().int().positive(),
  title: z.string().min(5),
  phaseId: z.number().int().min(1).max(7),
  phaseName: z.string().min(3),
  duration: z.string().min(3),
  timeEstimates: z
    .object({
      video: z.string(),
      reading: z.string(),
      lab: z.string(),
      total: z.string(),
    })
    .optional(),
  youtubeId: z.string().length(11),
  youtubeChannelUrl: z.string().url().optional(),
  shortSummary: z.string().min(15),
  seniorInsight: SeniorInsightSchema,
  coreDeepDive: CoreDeepDiveSchema,
  recommendedBook: RecommendedBookSchema,
  handsOnChallenge: HandsOnChallengeSchema.optional(),
  selfCheckQuestions: z.array(z.union([z.string(), SelfCheckQuestionSchema])).min(1),
  timestamps: z.array(VideoTimestampSchema).optional(),
  additionalReferences: z.array(AdditionalReferenceSchema).optional(),
  secondaryVideo: z
    .object({
      youtubeId: z.string().length(11),
      title: z.string(),
      duration: z.string(),
      description: z.string(),
    })
    .optional(),
  architectureFlow: ArchitectureDiagramFlowSchema.optional(),
});

export type RoadmapTopicValidated = z.infer<typeof RoadmapTopicSchema>;
