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

export interface RoadmapTopic {
  id: string;
  number: number;
  title: string;
  phaseId: number;
  phaseName: string;
  duration: string;
  youtubeId: string;
  youtubeChannelUrl?: string;
  shortSummary: string;
  seniorInsight: SeniorInsight;
  coreDeepDive: CoreDeepDive;
  recommendedBook: RecommendedBook;
  handsOnChallenge: HandsOnChallenge;
  selfCheckQuestions: string[];
  timestamps?: VideoTimestamp[];
  additionalReferences?: AdditionalReference[];
}

export interface RoadmapPhase {
  id: number;
  name: string;
  description: string;
  topics: RoadmapTopic[];
}
