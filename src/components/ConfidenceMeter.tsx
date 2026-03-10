import { motion } from "framer-motion";

interface ConfidenceMeterProps {
  score: number;
  isReal: boolean;
}

const ConfidenceMeter = ({ score, isReal }: ConfidenceMeterProps) => {
  const percentage = Math.round(score * 100);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center font-mono text-xs">
        <span className="text-muted-foreground">CONFIDENCE</span>
        <motion.span
          className={isReal ? "text-verdict-real" : "text-verdict-fake"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {percentage}%
        </motion.span>
      </div>
      <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${isReal ? "bg-verdict-real" : "bg-verdict-fake"}`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
        />
      </div>
    </div>
  );
};

export default ConfidenceMeter;
