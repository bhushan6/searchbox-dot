"use client";

import { useState, useEffect, useRef } from "react";
import { Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { mockResults, SearchResult } from "./mock-data";
import { Skeleton } from "./skeleton";
import { SearchItem } from "./search-item";
import { Dropdown } from "./dropdown";
import { Tabs } from "./tabs";
import { motion } from "motion/react";
import useMeasure from "react-use-measure";

export type TabsType = "files" | "people" | "chats" | "lists";

export type ContentFilters = Record<TabsType, boolean>;

export function SearchBox() {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | TabsType>("all");
  const [contentFilters, setContentFilters] = useState<ContentFilters>({
    files: true,
    people: true,
    chats: false,
    lists: false,
  });

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (inputRef.current && document.activeElement === inputRef.current)
        return;
      if (event.key === "s") {
        event.preventDefault();
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Simulate search with loading state
  useEffect(() => {
    if (query.length > 0) {
      setIsLoading(true);

      const timer = setTimeout(() => {
        const filteredResults = mockResults.filter((result) => {
          const matchesQuery = result.name
            .toLowerCase()
            .includes(query.toLowerCase());
          const matchesFilter =
            (result.type === "files" && contentFilters.files) ||
            (result.type === "people" && contentFilters.people) ||
            (result.type === "chats" && contentFilters.chats) ||
            (result.type === "lists" && contentFilters.lists);
          return matchesQuery && matchesFilter;
        });
        setResults(filteredResults);
        setIsLoading(false);
      }, 800);

      return () => clearTimeout(timer);
    } else {
      setResults([]);
      setIsLoading(false);
    }
  }, [query, contentFilters]);

  const handleClear = () => {
    setQuery("");
    setResults([]);
    setIsLoading(false);
    inputRef.current?.focus();
  };

  const filteredResults = results.filter((result) => {
    if (activeTab === "all") return true;
    if (activeTab === "files") return result.type === "files";
    if (activeTab === "people") return result.type === "people";
    if (activeTab === "chats") return result.type === "chats";
    if (activeTab === "lists") return result.type === "lists";
    return true;
  });

  const handleToggleFilter = (filterType: keyof ContentFilters) => {
    setContentFilters((prev) => ({
      ...prev,
      [filterType]: !prev[filterType],
    }));
  };

  const [ref, bounds] = useMeasure();

  const containerRef = useRef<HTMLDivElement>(null);
  const timer = useRef<NodeJS.Timeout>(null);

  if (containerRef.current) {
    timer.current && clearTimeout(timer.current);
    containerRef.current.style.overflow = "hidden";
    timer.current = setTimeout(() => {
      containerRef.current!.style.overflow = "visible";
    }, 300);
  }

  return (
    <motion.div
      className={`w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-lg`}
      ref={containerRef}
      initial={false}
      transition={{
        duration: 0.3,
      }}
      animate={{ height: bounds.height }}
    >
      <div ref={ref}>
        <div className="relative p-4 h-full">
          {isLoading ? (
            <Loader2 className="absolute left-7 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 animate-spin" />
          ) : (
            <Search className="absolute left-7 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 " />
          )}
          <Input
            name="search-box"
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-12 pr-20 shadow-none focus-visible:shadow-none outline-0 border-0 focus:ring-0 focus-visible:ring-0 focus:border-transparent bg-transparent"
            ref={inputRef}
          />
          <div className="absolute right-6 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
            {query ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClear}
                className="text-gray-500 hover:text-gray-700 underline"
              >
                Clear
              </Button>
            ) : (
              <>
                <Badge variant="outline" className="text-xs px-2 py-1">
                  S
                </Badge>
                <span className="text-sm text-gray-500">quick access</span>
              </>
            )}
          </div>
        </div>

        {(query.length > 0 || results.length > 0) && (
          <div className="flex items-center justify-between px-4 border-b">
            <Tabs
              contentFilters={contentFilters}
              results={results}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            <Dropdown
              contentFilters={contentFilters}
              handleToggleFilter={handleToggleFilter}
            />
          </div>
        )}
        <motion.div
          key={filteredResults.length}
          transition={{
            duration: 0.3,
          }}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          className="max-h-96 overflow-y-auto"
        >
          {isLoading ? (
            <div className="p-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} />
              ))}
            </div>
          ) : filteredResults.length > 0 ? (
            <div className="p-2">
              {filteredResults.map((result) => (
                <SearchItem result={result} key={result.id} query={query} />
              ))}
            </div>
          ) : query.length > 0 ? (
            <div className="p-8 text-center text-gray-500">
              No results found for &#39;{query}&#39;
            </div>
          ) : null}
        </motion.div>
      </div>
    </motion.div>
  );
}
