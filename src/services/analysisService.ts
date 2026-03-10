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

  return data;
}
