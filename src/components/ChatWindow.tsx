import { useRef, useEffect, useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChatMessage as ChatMessageType } from "@/types/chat";
import { analyzeImage } from "@/services/analysisService";
import ChatMessage from "./ChatMessage";
import ImageUploader from "./ImageUploader";
import truelensLogo from "@/assets/truelens-logo.png";

const AI_QUOTES = [
  "In a world shaped by AI, seeing clearly is a superpower.",
  "Not everything generated is genuine. Question what you see.",
  "AI creates beauty — and deception. Know the difference.",
  "The future belongs to those who can tell real from rendered.",
  "Every pixel tells a story. Some stories are fabricated.",
  "Trust, but verify. Especially in the age of generative AI.",
  "AI doesn't lie — but it can be used to deceive.",
  "Seeing is no longer believing. Analysis is.",
  "The best defense against AI deception is AI detection.",
  "In 2026, digital literacy means knowing what's real.",
  "Deepfakes are getting better. So are we.",
  "Your eyes can be fooled. Our algorithms can't.",
];

const GREETING = "Upload an image and I will analyze whether it is AI-generated or real.";

const ChatWindow = () => {
  const [messages, setMessages] = useState<ChatMessageType[]>([
    {
      id: "greeting",
      role: "assistant",
      content: GREETING,
      timestamp: new Date(),
    },
  ]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(() =>
    Math.floor(Math.random() * AI_QUOTES.length)
  );
  const scrollRef = useRef<HTMLDivElement>(null);

  const hasUploaded = messages.length > 1;

  // Rotate quote every 8 seconds
  useEffect(() => {
    if (hasUploaded) return;
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % AI_QUOTES.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [hasUploaded]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const handleUpload = useCallback(async (file: File) => {
    const imageUrl = URL.createObjectURL(file);

    const userMsg: ChatMessageType = {
      id: crypto.randomUUID(),
      role: "user",
      image: imageUrl,
      timestamp: new Date(),
    };

    const analyzeMsg: ChatMessageType = {
      id: crypto.randomUUID(),
      role: "assistant",
      isAnalyzing: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg, analyzeMsg]);
    setIsAnalyzing(true);

    try {
      const result = await analyzeImage(file);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === analyzeMsg.id
            ? { ...m, isAnalyzing: false, result, content: undefined }
            : m
        )
      );
    } catch {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === analyzeMsg.id
            ? { ...m, isAnalyzing: false, content: "Analysis failed. Please try again." }
            : m
        )
      );
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        <div className="max-w-[800px] mx-auto px-4 py-8 space-y-6">
          {/* Hero section with logo & quote (before first upload) */}
          {!hasUploaded && (
            <motion.div
              className="flex flex-col items-center text-center pt-16 pb-8 space-y-6"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.img
                src={truelensLogo}
                alt="TrueLens AI"
                className="w-20 h-20 md:w-24 md:h-24"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
              <h1 className="font-mono text-2xl md:text-3xl font-bold text-foreground tracking-tight">
                TrueLens AI
              </h1>

              {/* Rotating quote */}
              <div className="h-12 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={quoteIndex}
                    className="text-sm md:text-base text-muted-foreground italic max-w-md"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                  >
                    "{AI_QUOTES[quoteIndex]}"
                  </motion.p>
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
        </div>
      </div>

      {/* Upload area */}
      <div className="border-t border-border bg-background">
        <div className="max-w-[800px] mx-auto px-4 py-4 flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, type: "spring" }}
          >
            <ImageUploader onUpload={handleUpload} disabled={isAnalyzing} />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
