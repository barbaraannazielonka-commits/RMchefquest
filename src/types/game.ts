export type DifficultyMode = 'rookie' | 'pro';

export interface PlayerProfile {
  name: string;
  avatar: string;
  difficulty: DifficultyMode;
  totalScore: number;
  unlockedLevel: number; // 1 to 7
  completedLevels: number[];
  levelStars: Record<number, number>; // levelId -> stars (1-3)
  badges: string[];
  reflections: Record<number, { answer1: string; answer2: string; answer3: string }>;
  soundEnabled: boolean;
  voiceEnabled: boolean;
  theme: 'dark' | 'light';
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'safety' | 'technique' | 'communication' | 'sustainability' | 'mastery';
}

export interface KitchenTool {
  id: string;
  name: string;
  norwegianName: string;
  function: string;
  category: 'cutting' | 'cooking' | 'straining' | 'measuring' | 'storage';
  exampleSentence: string;
}

export interface TaskChoice {
  id: string;
  text: string;
  isCorrect: boolean;
  feedback: string;
  professionalTip?: string;
  points: number;
}

export interface LevelReflectionPrompt {
  q1: string;
  q2: string;
  q3: string;
}

export type TaskType = 
  | 'matching' 
  | 'sequencing' 
  | 'hazard_spotter' 
  | 'dialogue' 
  | 'kitchen_math' 
  | 'menu_curation' 
  | 'sustainability_choice'
  | 'head_chef_grand_challenge';

export interface BaseTask {
  id: string;
  title: string;
  subtitle: string;
  instructions: string;
  type: TaskType;
  points: number;
  norwegianHint?: string;
  vocabularyList?: Array<{ term: string; norwegian: string; definition: string }>;
}

export interface MatchingTaskData extends BaseTask {
  type: 'matching';
  items: Array<{
    id: string;
    term: string;
    norwegian: string;
    definition: string;
    category: string;
  }>;
}

export interface SequencingTaskData extends BaseTask {
  type: 'sequencing';
  recipeName: string;
  servings: number;
  steps: Array<{
    id: string;
    order: number;
    text: string;
    verb: string;
    culinaryReason: string;
  }>;
}

export interface HazardItem {
  id: string;
  title: string;
  locationDescription: string;
  danger: string;
  correctAction: string;
  whyItMatters: string;
  mattilsynetRule: string;
}

export interface HazardSpotterTaskData extends BaseTask {
  type: 'hazard_spotter';
  hazards: HazardItem[];
}

export interface DialogueMessage {
  speaker: 'colleague' | 'customer' | 'chef' | 'manager';
  name: string;
  text: string;
  audioText?: string;
}

export interface DialogueTaskData extends BaseTask {
  type: 'dialogue';
  context: string;
  initialDialogue: DialogueMessage[];
  options: Array<{
    id: string;
    playerResponse: string;
    isOptimal: boolean;
    colleagueReaction: string;
    feedback: string;
    professionalEnglishNote: string;
    points: number;
  }>;
}

export interface MathProblem {
  id: string;
  scenario: string;
  question: string;
  baseAmount: string;
  baseYield: number;
  targetYield: number;
  correctAnswer: number;
  unit: string;
  tolerance?: number;
  hint: string;
  explanation: string;
}

export interface KitchenMathTaskData extends BaseTask {
  type: 'kitchen_math';
  recipeTitle: string;
  problems: MathProblem[];
}

export interface LevelData {
  id: number;
  title: string;
  norwegianTitle: string;
  location: string;
  country: string;
  flag: string;
  summary: string;
  storyContext: string;
  image: string;
  badgeAwarded: Badge;
  tasks: Array<
    | MatchingTaskData 
    | SequencingTaskData 
    | HazardSpotterTaskData 
    | DialogueTaskData 
    | KitchenMathTaskData 
    | BaseTask
  >;
  reflection: LevelReflectionPrompt;
}
