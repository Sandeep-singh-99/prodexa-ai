import GImageForm from "@/components/GenerateImageComponents/GImageForm";
import GImageView from "@/components/GenerateImageComponents/GImageView";

export default function GImagePage() {
  return (
    <div className="flex flex-col md:flex-row justify-between gap-10 min-h-screen px-5 py-10">
       <GImageForm />

       <GImageView />
    </div>
  )
}