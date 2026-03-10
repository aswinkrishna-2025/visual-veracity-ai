import { AnalysisResult } from "@/types/chat";

// Simulated backend analysis - replace with actual FastAPI call
export async function analyzeImage(file: File): Promise<AnalysisResult> {
  // Simulate network delay and processing
  await new Promise((r) => setTimeout(r, 3500));

  // Generate mock result based on file characteristics
  const isAI = Math.random() > 0.4;
  const cnn = isAI ? 0.75 + Math.random() * 0.2 : 0.1 + Math.random() * 0.25;
  const sightengine = isAI ? 0.7 + Math.random() * 0.25 : 0.05 + Math.random() * 0.2;
  const confidence = (cnn * 0.5 + sightengine * 0.5);

  const aiExplanations = [
    "Diffusion artifacts detected in high-frequency regions",
    "Texture inconsistencies across facial features",
    "Background anomalies suggest synthetic generation",
    "GAN fingerprint patterns identified in spectral analysis",
    "Metadata lacks camera EXIF signature",
  ];

  const realExplanations = [
    "Natural noise distribution consistent with camera sensor",
    "EXIF metadata present and internally consistent",
    "No synthetic generation artifacts detected",
    "Texture patterns match natural photographic capture",
    "Color channel distributions within expected parameters",
  ];

  const explanations = isAI ? aiExplanations : realExplanations;
  const selected = explanations.sort(() => Math.random() - 0.5).slice(0, 3);

  return {
    prediction: isAI ? "AI_GENERATED" : "REAL",
    confidence: Math.round(confidence * 100) / 100,
    cnn_score: Math.round(cnn * 100) / 100,
    sightengine_score: Math.round(sightengine * 100) / 100,
    explanation: selected,
  };
}
