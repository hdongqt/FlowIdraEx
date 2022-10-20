import highest from "../assets/images/icons/highest.png";
import high from "../assets/images/icons/high.png";
import medium from "../assets/images/icons/medium.png";
import low from "../assets/images/icons/low.png";
import lowest from "../assets/images/icons/lowest.png";
import task from "../assets/images/icons/task.png";
import bug from "../assets/images/icons/bug.png";
import epic from "../assets/images/icons/epic.png";
import story from "../assets/images/icons/story.png";

export const TYPE_STATUS = {
  BACKLOG: "BACKLOG",
  TODO: "TODO",
  INPROGRESS: "INPROGRESS",
  DONE: "DONE",
};

export const listTypeIssue = [
  {
    label: "Task",
    value: "TASK",
    icon: task,
  },
  {
    label: "Bug",
    value: "BUG",
    icon: bug,
  },
  {
    label: "Story",
    value: "STORY",
    icon: story,
  },
  {
    label: "Epic",
    value: "EPIC",
    icon: epic,
  },
];

export const listTypePriority = [
  {
    label: "Lowest",
    value: "LOWEST",
    icon: lowest,
  },
  {
    label: "Low",
    value: "LOW",
    icon: low,
  },
  {
    label: "Medium",
    value: "MEDIUM",
    icon: medium,
  },
  {
    label: "High",
    value: "HIGH",
    icon: high,
  },
  {
    label: "Highest",
    value: "HIGHEST",
    icon: highest,
  },
];
