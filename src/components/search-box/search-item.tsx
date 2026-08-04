import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Paperclip,
  Play,
  MessageCircle,
  List,
  Link,
  SquareArrowOutUpRight,
} from "lucide-react";

import { SearchResult } from "./mock-data";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { useRef, useState } from "react";

const HighlightText = ({ text = "", highlight = "" }) => {
  if (!highlight.trim()) {
    return <span className="truncate inline-block max-w-full">{text}</span>;
  }

  const regex = new RegExp(`(${highlight})`, "gi");
  const parts = text.split(regex);

  return (
    <span className="truncate inline-block max-w-full">
      {parts.map((part, index) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <span key={index} className="bg-orange-200 dark:bg-orange-900 dark:text-orange-100">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </span>
  );
};

const CopyLinkButton = () => {
  const [content, setContent] = useState("Copy Link");
  const [isOpen, setIsOpen] = useState(false);

  const timer = useRef<NodeJS.Timeout>(null);

  return (
    <Tooltip open={isOpen}>
      <TooltipContent>{content}</TooltipContent>
      <TooltipTrigger asChild>
        <Button
          variant={"ghost"}
          className="cursor-pointer text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
          onPointerEnter={() => setIsOpen(true)}
          onPointerLeave={() => setIsOpen(false)}
          onClick={(e) => {
            e.preventDefault();
            timer.current && clearTimeout(timer.current);
            setContent("Link copied!");
            timer.current = setTimeout(() => {
              setContent("Copy Link");
            }, 2000);
          }}
        >
          <Link />
        </Button>
      </TooltipTrigger>
    </Tooltip>
  );
};

export const SearchItem = ({
  result,
  query,
}: {
  result: SearchResult;
  query: string;
}) => (
  <div
    key={result.id}
    className="flex cursor-pointer items-center justify-between gap-3 rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-800"
  >
    <div className="flex items-center gap-3 min-w-0 flex-1">
      {result.type === "people" ? (
        <div className="relative flex-shrink-0">
          <Avatar className="w-10 h-10">
            <AvatarImage
              src={result.avatar || "/placeholder.svg"}
              alt={result.name}
            />
            <AvatarFallback className="rounded-lg">
              {result.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div
            className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white dark:border-gray-900 ${
              result.status === "active" ? "bg-yellow-400" : "bg-red-400"
            }`}
          />
        </div>
      ) : (
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
          {result.type === "files" && result.fileType === "video" ? (
            <Play className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          ) : result.type === "files" ? (
            <Paperclip className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          ) : result.type === "chats" ? (
            <MessageCircle className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          ) : (
            <List className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          )}
        </div>
      )}
      <div className="min-w-0 flex-1">
        <div className="truncate font-medium text-gray-900 dark:text-gray-100">
          <HighlightText text={result.name} highlight={query} />
        </div>
        <div className="truncate text-sm text-gray-500 dark:text-gray-400">{result.subtitle}</div>
      </div>
    </div>
    <div className="flex items-center justify-center flex-shrink-0">
      <CopyLinkButton />
      <Button
        variant={"ghost"}
        className="flex cursor-pointer items-center gap-2 text-gray-400 dark:text-gray-500 dark:hover:text-gray-300"
      >
        <SquareArrowOutUpRight />
        <span className="hidden sm:inline">New Tab</span>
      </Button>
    </div>
  </div>
);
