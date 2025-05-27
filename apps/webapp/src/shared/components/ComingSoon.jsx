import React from 'react';
import HeaderIcons from '../../assets/HeaderIcons';

export default function ComingSoon() {
  return (
    <div className="min-h-screen bg-#f3f4f6 text-black flex flex-col items-center justify-center px-2 text-center">
      {/* <HeaderIcons /> */}
      {/* Emoji Row */}
      <div className="flex gap-4 text-6xl md:text-7xl mb-8 drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]">
        <span role="img" aria-label="smile">
          😊
        </span>
        <span role="img" aria-label="heart eyes">
          😍
        </span>
        <span role="img" aria-label="star eyes">
          🤩
        </span>
      </div>

      {/* Heading */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 tracking-tight">
        Coming Soon
      </h1>

      {/* Subheading 1 */}
      <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-xl mb-4">
        Track your emotions, see trends, and understand your mind—all in one
        place.
      </p>

      {/* Subheading 2 */}
      <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-xl">
        We’re working hard behind the scenes to bring something exciting your
        way. Stay tuned.
      </p>

      {/* Footer */}
      <p className="mt-16 text-xs text-gray-600">
        &copy; {new Date().getFullYear()} All rights reserved.
      </p>
    </div>
  );
}
