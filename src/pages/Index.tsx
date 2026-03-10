import ChatWindow from "@/components/ChatWindow";
import truelensLogo from "@/assets/truelens-logo.png";

const Index = () => {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="hidden md:flex w-20 border-r border-border flex-col items-center py-6 bg-sidebar gap-6">
        <img src={truelensLogo} alt="TrueLens AI" className="w-10 h-10" />
        <div
          className="font-mono text-[9px] tracking-[0.3em] text-muted-foreground uppercase"
          style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
        >
          TrueLens AI
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1">
        <ChatWindow />
      </main>
    </div>
  );
};

export default Index;
