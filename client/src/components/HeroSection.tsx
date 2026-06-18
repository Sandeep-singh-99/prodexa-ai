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

export default function HeroSection() {
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

  return (
    <div className="w-full mx-auto min-h-screen px-4">
      <div className="max-w-5xl mx-auto text-center pt-24 md:pt-28 xl:pt-36 lg:pt-36  flex flex-col items-center justify-between min-h-screen">
        <div className="md:space-y-7 space-y-10">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight">
            Create amazing content with
            <span className="text-transparent gradient-title ml-3 bg-clip-text">
              AI tools
            </span>
          </h1>

          <p className="text-base sm:text-lg font-serif md:px-28">
            Transform your content creation with our suite of premium AI tools.
            Write articles, generate images, and enhance your workflow.
          </p>

          <div className="flex  justify-center gap-4">
            <Link to={"/home/dashboard"} onClick={handleClick}>
              <Button size={"lg"} variant={"default"} className="font-semibold">
                Start Creating Now
              </Button>
            </Link>
            <Button variant={"outline"} size={"lg"} className="font-semibold">
              Watch Demo
            </Button>
          </div>

          <div className="flex items-center justify-center gap-3">
            <AvatarComponents />
            <p className="text-sm sm:text-base">Trusted by 10k+ people</p>
          </div>
        </div>

        {/* Logo Marquee */}
        <div className="overflow-hidden w-full mt-28 md:mt-10">
          <div className="flex w-max animate-scroll-x gap-12 sm:gap-16">
            {[...logos, ...logos].map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Logo ${index}`}
                className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 object-contain"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
