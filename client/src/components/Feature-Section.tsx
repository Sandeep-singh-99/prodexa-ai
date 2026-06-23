import { features } from "@/data/features";
import { Card, CardContent } from "./ui/card";
import { motion, type Variants } from "motion/react";

export default function FeatureSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const headerVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
      },
    },
  };

  const iconWrapperVariants: Variants = {
    rest: { scale: 1, y: 0, rotate: 0 },
    hover: {
      scale: 1.12,
      y: -6,
      rotate: [0, -5, 5, 0],
      transition: {
        duration: 0.4,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="py-24 min-h-screen px-5 relative overflow-hidden">
      {/* Decorative side gradients */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={headerVariants}
        className="text-center space-y-4 flex flex-col mb-16"
      >
        <h2 className="md:text-6xl text-5xl font-black tracking-tight text-transparent bg-gradient-to-r from-foreground via-foreground/90 to-foreground/75 bg-clip-text">
          Powerful Features
        </h2>
        <p className="md:text-lg text-sm max-w-2xl mx-auto text-muted-foreground leading-relaxed">
          Everything you need to create, enhance, and optimize your content with cutting-edge AI technology.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto"
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover="hover"
            initial="rest"
            animate="rest"
            className="h-full"
          >
            <motion.div
              variants={{
                rest: { y: 0 },
                hover: { y: -8 }
              }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="h-full"
            >
              <Card className="h-full border border-border/40 bg-card/30 backdrop-blur-md shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 overflow-hidden group">
                <CardContent className="p-8 h-full flex flex-col justify-between items-center text-center">
                  <div className="flex flex-col items-center justify-center">
                    <motion.div
                      variants={iconWrapperVariants}
                      className="p-4 rounded-2xl bg-primary/5 text-primary mb-6 transition-colors group-hover:bg-primary/10"
                    >
                      {feature.icon}
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-3 tracking-tight group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-base leading-relaxed max-w-sm">
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
