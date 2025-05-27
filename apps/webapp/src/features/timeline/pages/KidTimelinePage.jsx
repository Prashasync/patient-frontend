import React from "react";
import TimelineItem from "../components/TimeLineItem";

const items = [
  {
    date: "Feb 10 2025",
    title: "First steps!",
    description:
      "The biggest milestone yet—baby takes their first steps toward independence.",
    image: "https://link-to-image.jpg",
    emoji: "🧍‍♀️",
  },
  {
    date: "Nov 16 2025",
    title: "Says First Words",
    description:
      "Words like “mama” or “dada” start to take shape as they learn to express themselves.",
    emoji: "🗣️",
  },
  {
    date: "Sep 30 2024",
    title: "First Tooth Appears",
    description:
      "A tiny tooth starts to peek through, signaling the beginning of teething.",
    emoji: "🦷",
  },
  {
    date: "Jul 20 2024",
    title: "Recognizes Familiar Faces",
    description: "Smiles and reacts differently when seeing familiar people.",
  },
];

const KidTimelinePage = () => {
  return (
    <div className="timeline-container">
      <div className="timeline-header">
        <h2>Kid Timeline</h2>
        <button className="add-btn">+</button>
      </div>
      <div className="timeline-line" />
      {items.map((item, index) => (
        <TimelineItem key={index} {...item} />
      ))}
    </div>
  );
};

export default KidTimelinePage;
