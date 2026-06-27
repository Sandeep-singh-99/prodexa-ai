import ArticleForm from "@/components/ArticleComponents/ArticleForm";
import ArticleView from "@/components/ArticleComponents/ArticleView";

export default function ArticlePage() {
  return (
    <div className="relative h-screen flex flex-col bg-background">
      <main className="flex-1 overflow-y-auto pb-40">
        <ArticleView />
      </main>

      <ArticleForm />
    </div>
  );
}
