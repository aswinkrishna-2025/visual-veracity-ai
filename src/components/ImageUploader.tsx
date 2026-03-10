import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Upload } from "lucide-react";

interface ImageUploaderProps {
  onUpload: (file: File) => void;
  disabled?: boolean;
}

const ImageUploader = ({ onUpload, disabled }: ImageUploaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = useCallback(
    (file: File) => {
      if (file.type.startsWith("image/")) {
        onUpload(file);
        setIsOpen(false);
      }
    },
    [onUpload]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <>
      {/* Upload trigger button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        disabled={disabled}
        className="w-14 h-14 rounded-full bg-primary flex items-center justify-center pulse-ring disabled:opacity-30 disabled:animate-none"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Plus className="w-6 h-6 text-primary-foreground" />
      </motion.button>

      {/* Full-screen drop zone */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 text-muted-foreground hover:text-foreground"
            >
              <X className="w-6 h-6" />
            </motion.button>

            <motion.div
              className={`w-full max-w-lg mx-6 rounded-xl border-2 border-dashed p-16 flex flex-col items-center gap-6 transition-colors ${
                isDragging
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-muted-foreground"
              }`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ delay: 0.1 }}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
            >
              <Upload className="w-10 h-10 text-muted-foreground" />
              <div className="text-center space-y-2">
                <p className="font-mono text-sm text-foreground">Drop image here</p>
                <p className="text-xs text-muted-foreground">or click to browse</p>
              </div>
              <label className="cursor-pointer px-6 py-2 rounded-md bg-secondary text-sm font-mono text-foreground hover:bg-accent transition-colors">
                Select File
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleInputChange}
                />
              </label>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ImageUploader;
