import RObjectForm from "@/components/RemoveObjectComponents/RObjectForm";
import RObjectView from "@/components/RemoveObjectComponents/RObjectView";


export default function RObject() {
  return (
    <div className="flex flex-col md:flex-row justify-between gap-10 min-h-screen px-5 py-10">
       <RObjectForm />

       <RObjectView />
    </div>
  )
}