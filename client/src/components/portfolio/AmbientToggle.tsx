import { motion } from "framer-motion";
import { useAmbient } from "./AmbientContext";
import { Switch } from "@/components/ui/switch";

export function AmbientToggle() {
  const { isAmbient, toggleAmbient } = useAmbient();

  return (
    <motion.div 
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-secondary/80 backdrop-blur-md px-4 py-2 rounded-full border border-border/50 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
    >
      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        Ambient Mode
      </span>
      <Switch 
        checked={isAmbient} 
        onCheckedChange={toggleAmbient}
        data-testid="switch-ambient-toggle"
        className="data-[state=checked]:bg-primary"
      />
    </motion.div>
  );
}