import RBackgroundForm from "@/components/RemoveBackgroundComponents/RBackgroundForm";
import RBackgroundView from "@/components/RemoveBackgroundComponents/RBackgroundView";


export default function RBackground() {
  return (
    <div className="flex flex-col md:flex-row justify-between gap-10 min-h-screen px-5 py-10">
       <RBackgroundForm />

       <RBackgroundView />
    </div>
  )
}