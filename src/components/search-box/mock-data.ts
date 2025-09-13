import { TabsType } from ".";

export interface SearchResult {
  id: string;
  type: TabsType;
  name: string;
  subtitle?: string;
  avatar?: string;
  status?: "active" | "inactive";
  lastActive?: string;
  folder?: string;
  fileType?: string;
}

export const mockResults: SearchResult[] = [
  {
    id: "1",
    type: "people",
    name: "Caroline Dribsson",
    subtitle: "Unactivated",
    avatar: "/professional-woman-headshot.png",
    status: "inactive",
  },
  {
    id: "2",
    type: "people",
    name: "Adam Cadribean",
    subtitle: "Active 1w ago",
    avatar: "/professional-man-headshot.png",
    status: "active",
    lastActive: "1w ago",
  },
  {
    id: "3",
    type: "files",
    name: "final_dribbble_presentation.jpg",
    subtitle: "in Presentations • Edited 1w ago",
    folder: "Presentations",
    fileType: "image",
  },
  {
    id: "4",
    type: "people",
    name: "Margareth Cendribgssen",
    subtitle: "Active 1w ago",
    avatar: "/professional-blonde-woman.png",
    status: "active",
    lastActive: "1w ago",
  },
  {
    id: "5",
    type: "files",
    name: "dribbble_animation.avi",
    subtitle: "in Videos • Added 1w ago",
    folder: "Videos",
    fileType: "video",
  },
  {
    id: "6",
    type: "chats",
    name: "Design Team Chat",
    subtitle: "Last message 2h ago",
  },
  {
    id: "7",
    type: "lists",
    name: "Project Tasks",
    subtitle: "Updated yesterday",
  },
  {
    id: "8",
    type: "people",
    name: "John Doe",
    subtitle: "Active 2d ago",
    avatar: "/professional-man-headshot-2.png",
    status: "active",
    lastActive: "2d ago",
  },
  {
    id: "9",
    type: "files",
    name: "project_brief.pdf",
    subtitle: "in Documents • Added 3d ago",
    folder: "Documents",
    fileType: "pdf",
  },
  {
    id: "10",
    type: "chats",
    name: "Marketing Sync",
    subtitle: "Last message 5h ago",
  },
  {
    id: "11",
    type: "lists",
    name: "Q3 Goals",
    subtitle: "Updated 2d ago",
  },
  {
    id: "12",
    type: "people",
    name: "Jane Smith",
    subtitle: "Active 1h ago",
    avatar: "/professional-woman-headshot-2.png",
    status: "active",
    lastActive: "1h ago",
  },
  {
    id: "13",
    type: "files",
    name: "logo_concept.svg",
    subtitle: "in Designs • Added 5d ago",
    folder: "Designs",
    fileType: "image",
  },
  {
    id: "14",
    type: "chats",
    name: "All Hands",
    subtitle: "Last message 1d ago",
  },
  {
    id: "15",
    type: "lists",
    name: "Frontend Roadmap",
    subtitle: "Updated 3h ago",
  },
  {
    id: "16",
    type: "people",
    name: "Peter Jones",
    subtitle: "Inactive",
    avatar: "/professional-man-headshot-3.png",
    status: "inactive",
  },
  {
    id: "17",
    type: "files",
    name: "onboarding_flow.fig",
    subtitle: "in Designs • Edited 2w ago",
    folder: "Designs",
    fileType: "figma",
  },
  {
    id: "18",
    type: "chats",
    name: "Watercooler",
    subtitle: "Last message 1h ago",
  },
  {
    id: "19",
    type: "lists",
    name: "Bug Tracker",
    subtitle: "Updated 10m ago",
  },
  {
    id: "20",
    type: "people",
    name: "Mary Johnson",
    subtitle: "Active 5m ago",
    avatar: "/professional-woman-headshot-3.png",
    status: "active",
    lastActive: "5m ago",
  },
  {
    id: "21",
    type: "files",
    name: "user_research_notes.docx",
    subtitle: "in Documents • Added 1w ago",
    folder: "Documents",
    fileType: "doc",
  },
  {
    id: "22",
    type: "chats",
    name: "Random",
    subtitle: "Last message 30m ago",
  }
];