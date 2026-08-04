import { AppTabs } from "@/components/app-tabs";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 p-4 transition-colors dark:bg-gray-950 sm:p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-4 flex justify-end">
          <ThemeToggle />
        </div>
        <AppTabs />
      </div>
    </main>
  );
}
