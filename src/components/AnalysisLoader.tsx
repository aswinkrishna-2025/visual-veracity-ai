import { motion } from "framer-motion";

const AnalysisLoader = () => {
  const bars = Array.from({ length: 24 });

  return (
    <div className="py-6 space-y-4">
      {/* EKG Line */}
      <div className="flex items-center justify-center gap-[2px] h-12">
        {bars.map((_, i) => (
          <motion.div
            key={i}
            className="w-[2px] bg-primary rounded-full"
            initial={{ height: 2 }}
            animate={{
              height: [2, Math.random() * 40 + 4, 2, Math.random() * 24 + 4, 2],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.05,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Process Labels */}
      <div className="flex justify-center gap-8">
        <ProcessLabel label="CNN Scan" delay={0.8} />
        <ProcessLabel label="API Cross-Ref" delay={2.2} />
      </div>
    </div>
  );
};

const ProcessLabel = ({ label, delay }: { label: string; delay: number }) => (
  <motion.div
    className="flex items-center gap-2"
    initial={{ opacity: 0.3 }}
    animate={{ opacity: 1 }}
    transition={{ delay, duration: 0.6 }}
  >
    <motion.div
      className="w-1.5 h-1.5 rounded-full bg-primary"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1] }}
      transition={{ delay, duration: 0.3 }}
    />
    <span className="text-xs font-mono text-muted-foreground">{label}</span>
  </motion.div>
);

export default AnalysisLoader;
