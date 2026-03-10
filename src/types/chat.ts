export interface AnalysisResult {
  prediction: "REAL" | "AI_GENERATED";
  confidence: number;
  cnn_score: number;
  sightengine_score: number;
  explanation: string[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content?: string;
  image?: string;
  result?: AnalysisResult;
  isAnalyzing?: boolean;
  timestamp: Date;
}
