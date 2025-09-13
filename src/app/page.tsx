import { SearchBox } from "@/components/search-box";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <SearchBox />
      </div>
    </div>
  );
}
