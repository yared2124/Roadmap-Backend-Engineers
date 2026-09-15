export interface SeniorInsight {
  quote: string;
  productionLesson: string;
  commonMistake: string;
}

export interface CoreDeepDive {
  what: string;
  why: string;
  howItWorks: string[];
  blueprintTitle: string;
  blueprintCode: string;
  blueprintLanguage: string;
}

export interface RecommendedBook {
  title: string;
  author: string;
  keyChapters: string;
  whyReadThis: string;
  readingUrl?: string;
}

export interface HandsOnChallenge {
  ticketNumber: string;
  title: string;
  scenario: string;
  acceptanceCriteria: string[];
  terminalLab?: string;
  hints: string[];
  solutionCode?: string;
  solutionExplanation?: string;
}

export interface VideoTimestamp {
  timeFormatted: string;
  seconds: number;
  label: string;
}

export interface AdditionalReference {
  title: string;
  url: string;
  description: string;
}

export interface SelfCheckQuestion {
  category?: "WHAT" | "WHY" | "HOW";
  question: string;
  answerExplanation: string;
}

export interface TimeEstimates {
  video: string;
  reading: string;
  lab: string;
  total: string;
}

export interface ArchitectureFlowNode {
  id: string;
  label: string;
  role: string;
  type: "client" | "gateway" | "service" | "cache" | "database" | "queue" | "auth" | "storage";
}

export interface ArchitectureFlowStep {
  stepNumber: number;
  from: string;
  to: string;
  action: string;
  detail: string;
  latency?: string;
  isFallback?: boolean;
}

export interface ArchitectureDiagramFlow {
  title: string;
  summary: string;
  nodes: ArchitectureFlowNode[];
  steps: ArchitectureFlowStep[];
}

export interface RoadmapTopic {
  id: string;
  number: number;
  title: string;
  phaseId: number;
  phaseName: string;
  duration: string;
  timeEstimates?: TimeEstimates;
  youtubeId: string;
  youtubeChannelUrl?: string;
  shortSummary: string;
  seniorInsight: SeniorInsight;
  coreDeepDive: CoreDeepDive;
  recommendedBook: RecommendedBook;
  handsOnChallenge?: HandsOnChallenge;
  selfCheckQuestions: (string | SelfCheckQuestion)[];
  timestamps?: VideoTimestamp[];
  additionalReferences?: AdditionalReference[];
  secondaryVideo?: {
    youtubeId: string;
    title: string;
    duration: string;
    description: string;
  };
  architectureFlow?: ArchitectureDiagramFlow;
}

export interface CapstoneProject {
  id: string;
  phaseId: number;
  phaseName: string;
  title: string;
  shortName?: string;
  subtitle?: string;
  pitch?: string;
  highlights?: string[];
  difficulty: "Intermediate" | "Advanced" | "Senior" | "Staff";
  estimatedHours: string;
  scenario: string;
  keyDeliverables: string[];
  techStack: string[];
  architectureDiagram?: string;
  acceptanceCriteria: string[];
  githubSubmissionGuide: {
    recommendedRepoName: string;
    folderStructure: string;
    readmeChecklist: string[];
  };
}

export interface RoadmapPhase {
  id: number;
  name: string;
  description: string;
  topics: RoadmapTopic[];
  capstoneProject?: CapstoneProject;
}

