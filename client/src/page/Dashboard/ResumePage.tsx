import ResumeForm from "@/components/ResumeComponents/ResumeForm";
import ResumeView from "@/components/ResumeComponents/ResumeView";


export default function ResumePage() {
  return (
    <div className="flex flex-col md:flex-row justify-between gap-10 min-h-screen px-5 py-10">
       <ResumeForm />

       <ResumeView />
    </div>
  )
}