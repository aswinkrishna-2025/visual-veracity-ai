import { motion } from "framer-motion";
import { AnalysisResult } from "@/types/chat";
import ConfidenceMeter from "./ConfidenceMeter";

interface ResultCardProps {
  result: AnalysisResult;
}

const ResultCard = ({ result }: ResultCardProps) => {
  const isReal = result.prediction === "REAL";

  return (
    <motion.div
      className="border border-border rounded-lg overflow-hidden bg-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Header */}
      <div className={`px-4 py-3 border-b border-border flex items-center justify-between ${
        isReal ? "bg-verdict-real/5" : "bg-verdict-fake/5"
      }`}>
        <span className="font-mono text-xs text-muted-foreground tracking-widest">RESULT</span>
        <motion.span
          className={`font-mono text-sm font-semibold tracking-wider ${
            isReal ? "text-verdict-real" : "text-verdict-fake"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {isReal ? "REAL" : "AI GENERATED"}
        </motion.span>
      </div>

      <div className="p-4 space-y-4">
        {/* Confidence Meter */}
        <ConfidenceMeter score={result.confidence} isReal={isReal} />

        {/* Score Breakdown */}
        <motion.div
          className="grid grid-cols-2 gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <ScoreBlock label="CNN Model" score={result.cnn_score} />
          <ScoreBlock label="Sightengine" score={result.sightengine_score} />
        </motion.div>

        {/* Explanation */}
        <motion.div
          className="space-y-2 pt-2 border-t border-border"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <span className="font-mono text-xs text-muted-foreground tracking-widest">ANALYSIS</span>
          <ul className="space-y-1.5">
            {result.explanation.map((item, i) => (
              <motion.li
                key={i}
                className="text-sm text-foreground flex items-start gap-2"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + i * 0.15 }}
              >
                <span className={`mt-1.5 w-1 h-1 rounded-full flex-shrink-0 ${
                  isReal ? "bg-verdict-real" : "bg-verdict-fake"
                }`} />
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
};

const ScoreBlock = ({ label, score }: { label: string; score: number }) => (
  <div className="bg-secondary rounded-md p-3">
    <div className="text-[10px] font-mono text-muted-foreground tracking-wider mb-1">{label}</div>
    <div className="font-mono text-lg font-semibold text-foreground">{Math.round(score * 100)}%</div>
  </div>
);

export default ResultCard;
