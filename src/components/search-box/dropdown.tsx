import {
  ForwardRefExoticComponent,
  RefAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  List,
  LucideProps,
  MessageCircle,
  Paperclip,
  Settings,
  User,
} from "lucide-react";
import { Switch } from "../ui/switch";
import { ContentFilters, TabsType } from ".";
import { AnimatePresence, motion } from "motion/react";

export const DROPDOWN_DATA: Record<
  TabsType,
  {
    Icon: ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >;
  }
> = {
  files: {
    Icon: Paperclip,
  },
  people: {
    Icon: User,
  },
  chats: {
    Icon: MessageCircle,
  },
  lists: {
    Icon: List,
  },
};

export const Dropdown = ({
  contentFilters,
  handleToggleFilter,
}: {
  contentFilters: ContentFilters;
  handleToggleFilter: (tab: TabsType) => void;
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative z-10" ref={dropdownRef}>
      <div
        className="flex cursor-pointer items-stretch px-3 pb-2"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <Settings
          className={`h-6 w-6 text-gray-400 transition-transform dark:text-gray-500 ${
            showDropdown ? "rotate-90" : "rotate-0"
          } `}
        />
      </div>
      <AnimatePresence>
        {showDropdown && (
          <motion.div
            className="absolute right-0 -bottom-2 z-50 mt-2 w-48 translate-y-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-900"
            transition={{
              height: { duration: 0.3 },
              opacity: { duration: 0.2 },
            }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            initial={{
              height: 0,
              opacity: 0.25,
            }}
            exit={{
              height: 0,
              opacity: 0.25,
            }}
          >
            <div className="space-y-3 p-3">
              {Object.entries(DROPDOWN_DATA).map(([key, value]) => {
                const dropdownOptionName = key as TabsType;
                return (
                  <div
                    key={dropdownOptionName}
                    className="flex items-center justify-between"
                  >
                    <div
                      className={`flex items-center gap-2 ${
                        contentFilters[dropdownOptionName]
                          ? "text-gray-600 dark:text-gray-200"
                          : "text-gray-400 dark:text-gray-500"
                      }`}
                    >
                      <value.Icon className={"w-4 h-4"} />
                      <span className="text-sm font-medium">
                        {dropdownOptionName.charAt(0).toUpperCase() +
                          dropdownOptionName.slice(1)}
                      </span>
                    </div>
                    <Switch
                      checked={contentFilters[dropdownOptionName]}
                      onCheckedChange={() =>
                        handleToggleFilter(dropdownOptionName)
                      }
                    />
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
