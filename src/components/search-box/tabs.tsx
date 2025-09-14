import { ContentFilters, TabsType } from ".";
import { SetStateAction, useEffect } from "react";
import { SearchResult } from "./mock-data";
import { DROPDOWN_DATA } from "./dropdown";
import { motion } from "motion/react";

export const Tabs = ({
  contentFilters,
  activeTab,
  setActiveTab,
  results,
}: {
  contentFilters: ContentFilters;
  activeTab: TabsType | "all";
  setActiveTab: (value: SetStateAction<TabsType | "all">) => void;
  results: SearchResult[];
}) => {
  const allCount = results.length;

  useEffect(() => {
    if (activeTab === "all") return;

    if (!contentFilters[activeTab]) {
      setActiveTab("all");
    }
  }, [activeTab, contentFilters, setActiveTab]);

  return (
    <div className="flex items-center gap-6 ">
      <button
        onClick={() => setActiveTab("all")}
        className={`relative box-border flex items-center gap-2 px-2 pb-2 transition-colors cursor-pointer ${
          activeTab === "all"
            ? "border-black text-black font-medium"
            : "border-transparent text-gray-500 hover:text-gray-700"
        }`}
      >
        All
        <span className="text-sm text-gray-400">{allCount}</span>
        {activeTab === "all" && (
          <motion.div
            layoutId="highlight"
            className="w-full h-0.5 bg-black absolute bottom-0 left-0 translate-y-1/2"
          />
        )}
      </button>
      {Object.entries(DROPDOWN_DATA).map(([key, value]) => {
        const dropdownOptionName = key as TabsType;
        if (!contentFilters[dropdownOptionName]) return null;

        return (
          <button
            key={dropdownOptionName}
            onClick={() => setActiveTab(dropdownOptionName)}
            className={`relative box-border flex items-center gap-2 px-2 pb-2 transition-colors cursor-pointer ${
              activeTab === dropdownOptionName
                ? "border-black text-black font-medium"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            <value.Icon className="w-4 h-4" />
            {dropdownOptionName.charAt(0).toUpperCase() +
              dropdownOptionName.slice(1)}
            <span className="text-sm text-gray-400">
              {results.filter((r) => r.type === dropdownOptionName).length}
            </span>
            {activeTab === dropdownOptionName && (
              <motion.div
                layoutId="highlight"
                className="w-full h-0.5 bg-black absolute bottom-0 left-0 translate-y-1/2"
              />
            )}
          </button>
        );
      })}
    </div>
  );
};
