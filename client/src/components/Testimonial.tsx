import { testimonial } from '@/data/testmonial'
import { Card, CardContent } from './ui/card'
import { motion, type Variants } from 'motion/react'
import { Quote } from 'lucide-react'

export default function Testimonial() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    hidden: { opacity: 0, y: 40 },
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

  return (
    <section className="w-full py-24 bg-muted/20 border-t border-border/40 relative overflow-hidden">
      {/* Decorative ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={headerVariants}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl text-transparent bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
            What Our Users Say
          </h2>
          <p className="text-muted-foreground md:text-lg max-w-xl mx-auto">
            Discover how professionals are transforming their content creation and workflow using Prodexa AI.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {testimonial.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="h-full"
            >
              <Card className="h-full bg-card/40 backdrop-blur-md border border-border/40 shadow-sm hover:shadow-xl hover:shadow-primary/5 hover:border-primary/30 transition-all duration-300 relative overflow-hidden">
                <Quote className="absolute right-6 top-6 text-primary/10 w-10 h-10 pointer-events-none" />
                <CardContent className="p-8 h-full flex flex-col justify-between">
                  <div className="flex flex-col space-y-6">
                    <blockquote>
                      <p className="text-muted-foreground text-base leading-relaxed italic">
                        &quot;{item.quote}&quot;
                      </p>
                    </blockquote>

                    <div className="flex items-center space-x-4 pt-4 border-t border-border/30">
                      <div className="relative h-12 w-12 flex-shrink-0">
                        <img
                          width={48}
                          height={48}
                          src={item.image}
                          alt={item.author}
                          className="rounded-full object-cover border border-primary/20 shadow-inner"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{item.author}</p>
                        <p className="text-xs text-muted-foreground font-medium">
                          {item.role}
                        </p>
                        <p className="text-xs text-primary font-semibold">
                          {item.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
