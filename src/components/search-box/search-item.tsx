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
    return <span>{text}</span>;
  }

  const regex = new RegExp(`(${highlight})`, "gi");

  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, index) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <span key={index} className="bg-orange-200">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </span>
  );
};

export default HighlightText;

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
          className="cursor-pointer text-gray-400"
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
    className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer flex items-center justify-between"
  >
    <div className="flex items-center gap-3  ">
      {result.type === "people" ? (
        <div className="relative">
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
            className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
              result.status === "active" ? "bg-yellow-400" : "bg-red-400"
            }`}
          />
        </div>
      ) : (
        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
          {result.type === "files" && result.fileType === "video" ? (
            <Play className="w-5 h-5 text-gray-600" />
          ) : result.type === "files" ? (
            <Paperclip className="w-5 h-5 text-gray-600" />
          ) : result.type === "chats" ? (
            <MessageCircle className="w-5 h-5 text-gray-600" />
          ) : (
            <List className="w-5 h-5 text-gray-600" />
          )}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="font-medium text-gray-900 truncate">
          <HighlightText text={result.name} highlight={query} />
        </div>
        <div className="text-sm text-gray-500 truncate">{result.subtitle}</div>
      </div>
    </div>
    <div>
      <CopyLinkButton />
      <Button variant={"ghost"} className="cursor-pointer text-gray-400">
        <SquareArrowOutUpRight />
        New Tab
      </Button>
    </div>
  </div>
);
