import { motion } from "framer-motion";
import { ChatMessage as ChatMessageType } from "@/types/chat";
import ResultCard from "./ResultCard";
import AnalysisLoader from "./AnalysisLoader";

interface ChatMessageProps {
  message: ChatMessageType;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.role === "user";

  return (
    <motion.div
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className={`max-w-[560px] ${isUser ? "items-end" : "items-start"}`}>
        {/* Text content */}
        {message.content && (
          <div className={`rounded-lg px-4 py-3 ${
            isUser
              ? "bg-secondary text-foreground"
              : "bg-transparent text-foreground"
          }`}>
            <p className="text-sm leading-relaxed">{message.content}</p>
          </div>
        )}

        {/* Image preview */}
        {message.image && (
          <div className="mt-2 rounded-lg overflow-hidden border border-border">
            <img
              src={message.image}
              alt="Uploaded for analysis"
              className="max-w-full max-h-64 object-contain bg-secondary"
            />
          </div>
        )}

        {/* Analysis loading state */}
        {message.isAnalyzing && <AnalysisLoader />}

        {/* Result card */}
        {message.result && (
          <div className="mt-3">
            <ResultCard result={message.result} />
          </div>
        )}

        {/* Timestamp */}
        <div className={`mt-1 ${isUser ? "text-right" : "text-left"}`}>
          <span className="text-[10px] font-mono text-muted-foreground/50">
            {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatMessage;
