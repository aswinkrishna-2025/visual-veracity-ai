import { AnalysisResult } from "@/types/chat";

export async function analyzeImage(file: File): Promise<AnalysisResult> {

  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(
    "https://visual-veracity-ai.onrender.com/analyze",
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Analysis failed");
  }

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error);
  }

  return {
    prediction: data.prediction || "REAL",
    confidence: (data.confidence || 0) / 100, // Normalize to 0-1 if backend returns 0-100
    cnn_score: data.ai_score || 0,
    sightengine_score: data.ai_score || 0,
    explanation: [
      `AI Score: ${Number(data.ai_score || 0).toFixed(2)}`,
      `Human Score: ${Number(data.human_score || 0).toFixed(2)}`
    ]
  };
}
