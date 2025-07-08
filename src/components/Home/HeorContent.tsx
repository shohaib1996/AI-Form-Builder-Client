import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Globe } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/auth/authContext";
import { useRouter } from "next/navigation";

interface HeroContentProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  animatedPlaceholder: string;
  setIsTitleDialogOpen: (open: boolean) => void;
}

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } },
};

const scaleOnHover = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
};

export function HeroContent({
  prompt,
  setPrompt,
  animatedPlaceholder,
  setIsTitleDialogOpen,
}: HeroContentProps) {
  const router = useRouter();
  const { user } = useAuth();
  const handleGenerateForm = () => {
    if (!user) {
      router.push("/signin");
      return;
    }
    setIsTitleDialogOpen(true);
  };
  return (
    <motion.div
      className="text-center space-y-8 py-24"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      <motion.div variants={fadeInUp}>
        <Badge variant="secondary" className="mb-4">
          <Sparkles className="w-4 h-4 mr-2" />
          AI-Powered Form Generation
        </Badge>
      </motion.div>

      <motion.h1
        className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent"
        variants={fadeInUp}
      >
        Build Any Form in
        <br />
        <span className="relative text-black">
          Seconds with AI
          <motion.div
            className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          />
        </span>
      </motion.h1>

      <motion.p
        className="text-xl text-muted-foreground max-w-3xl mx-auto"
        variants={fadeInUp}
      >
        Create professional forms, surveys, and quizzes instantly with our
        AI-powered form builder. Just describe what you need, and watch the
        magic happen.
      </motion.p>

      <motion.div className="max-w-2xl mx-auto" variants={fadeInUp}>
        <div className="flex flex-col items-stretch sm:flex-row gap-4 p-2 bg-muted rounded-lg">
          <div className="flex-1 relative min-w-0 sm:min-w-[200px]">
            <Globe className="absolute left-3 top-3 text-muted-foreground w-5 h-5 z-10" />
            <Textarea
              placeholder={animatedPlaceholder}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="pl-10 border-0 bg-background resize-none h-12 overflow-y-auto"
              rows={1}
              style={{
                width: "100%",
                minWidth: "0",
                maxWidth: "100%",
                flexShrink: 1,
                flexGrow: 1,
                boxSizing: "border-box",
              }}
            />
          </div>
          <motion.div {...scaleOnHover}>
            <Button
              size="lg"
              className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 cursor-pointer whitespace-nowrap"
              onClick={handleGenerateForm}
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Generate Form
            </Button>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="flex items-center justify-center space-x-2 text-sm text-muted-foreground"
        variants={fadeInUp}
      >
        <div className="flex -space-x-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 border-2 border-background"
            />
          ))}
        </div>
        <span>Join 1,000+ businesses building better forms</span>
      </motion.div>
    </motion.div>
  );
}
