import React from "react";

export default function ComingSoon() {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center px-6 text-center">
      {/* Optional Logo Placeholder */}
      <div className="w-16 h-16 bg-white rounded-full mb-6" />

      {/* Main Heading */}
      <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">
        Coming Soon
      </h1>

      {/* Subheading */}
      <p className="text-lg md:text-xl text-gray-400 max-w-xl">
        We’re working hard behind the scenes to bring something exciting your
        way. Stay tuned.
      </p>

      {/* Optional Footer */}
      <p className="mt-12 text-sm text-gray-600">
        &copy; {new Date().getFullYear()} All rights reserved.
      </p>
    </div>
  );
}
  