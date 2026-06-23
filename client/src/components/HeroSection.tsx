import AvatarComponents from "./AvatarComponents";
import { Button } from "./ui/button";
import img1 from "../assets/facebook.svg";
import img2 from "../assets/framer.svg";
import img3 from "../assets/google.svg";
import img4 from "../assets/instagram.svg";
import img5 from "../assets/linkedin.svg";
import img6 from "../assets/netflix.svg";
import img7 from "../assets/react.svg";
import img8 from "../assets/slack.svg";
import { Link } from "react-router-dom";
import { useAppSelector } from "@/hooks/hooks";
import { toast } from "sonner";
import { motion, type Variants } from "motion/react";

export default function HeroSection() {
  // const logos = [img1, img5, img6];

  const logos = [img1, img2, img3, img4, img5, img6, img7, img8];

  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const handleClick = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (!isAuthenticated) {
      e.preventDefault();
      toast.error("Please log in to access this feature.");
      return;
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 14,
      },
    },
  };

  const floatingVariants: Variants = {
    animate: {
      y: [0, -15, 0],
      rotate: [0, 5, 0],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const floatingVariantsAlt: Variants = {
    animate: {
      y: [0, 15, 0],
      rotate: [0, -5, 0],
      transition: {
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="w-full mx-auto min-h-screen relative overflow-hidden">
      {/* Decorative ambient background glows */}
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute top-1/4 left-10 w-72 h-72 rounded-full bg-primary/10 blur-[100px] pointer-events-none -z-10"
      />
      <motion.div
        variants={floatingVariantsAlt}
        animate="animate"
        className="absolute bottom-1/3 right-10 w-96 h-96 rounded-full bg-purple-500/5 blur-[120px] pointer-events-none -z-10"
      />

      <div className="max-w-7xl mx-auto text-center pt-24 md:pt-28 xl:pt-36 lg:pt-36 flex flex-col justify-between min-h-screen items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="md:space-y-7 space-y-10 flex flex-col items-center"
        >
          {/* Main Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl md:text-8xl font-black leading-tight tracking-tight max-w-5xl"
          >
            Create amazing content with{" "}
            <span className="text-transparent bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text">
              AI Tools
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg md:text-xl font-medium text-muted-foreground max-w-3xl md:px-12 leading-relaxed"
          >
            Transform your content creation with our suite of premium AI tools.
            Write articles, generate images, and enhance your workflow.
          </motion.p>

          {/* Call to Actions */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
          >
            <Link to={"/home/dashboard"} onClick={handleClick} className="w-full sm:w-auto">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size={"lg"} variant={"default"} className="font-semibold w-full cursor-pointer shadow-lg shadow-primary/10 hover:shadow-primary/20 transition-shadow">
                  Start Creating Now
                </Button>
              </motion.div>
            </Link>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
              <Button variant={"outline"} size={"lg"} className="font-semibold w-full cursor-pointer bg-background/50 backdrop-blur-sm">
                Watch Demo
              </Button>
            </motion.div>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-3 bg-muted/30 px-5 py-2 rounded-full border border-border/40 backdrop-blur-sm"
          >
            <AvatarComponents />
            <p className="text-sm sm:text-base font-medium text-muted-foreground">
              Trusted by <span className="text-foreground font-bold">10k+</span> professionals
            </p>
          </motion.div>
        </motion.div>

        {/* Bounded Logo Showcase */}
          {/* Logo Marquee */}
        <div className="overflow-hidden flex items-center justify-center w-full mt-28 md:mt-10">
          <div className="flex w-max gap-12 sm:gap-16">
            {logos.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Logo ${index}`}
                className="w-20 h-20 sm:w-28 sm:h-28 md:w-42 md:h-42 object-contain"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
