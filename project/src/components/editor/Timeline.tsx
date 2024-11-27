import React from 'react';
import { useProjectStore  } from '../../lib/store';

export default function Timeline() {
  const timelineRef = React.useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);

  const handleTimelineClick = (e: React.MouseEvent) => {
    if (!timelineRef.current) return;
    const rect = timelineRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = x / rect.width;
    setCurrentTime(percent * 100); // 100 represents total duration
  };

  return (
    <div className="h-48 bg-gray-800 p-4">
      <div className="flex items-center mb-4">
        <span className="text-sm text-gray-400">00:00:00</span>
        <div className="flex-1 mx-4">
          <div
            ref={timelineRef}
            className="h-1 bg-gray-700 rounded-full cursor-pointer"
            onClick={handleTimelineClick}
          >
            <div
              className="h-full bg-indigo-600 rounded-full relative"
              style={{ width: `${currentTime}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg" />
            </div>
          </div>
        </div>
        <span className="text-sm text-gray-400">00:00:00</span>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-700/50 rounded-lg p-2">
          <h3 className="text-sm font-medium mb-2">Video Track</h3>
          <div className="h-12 bg-gray-600 rounded"></div>
        </div>
        <div className="bg-gray-700/50 rounded-lg p-2">
          <h3 className="text-sm font-medium mb-2">Audio Track</h3>
          <div className="h-12 bg-gray-600 rounded"></div>
        </div>
        <div className="bg-gray-700/50 rounded-lg p-2">
          <h3 className="text-sm font-medium mb-2">Captions</h3>
          <div className="h-12 bg-gray-600 rounded"></div>
        </div>
      </div>
    </div>
  );
}