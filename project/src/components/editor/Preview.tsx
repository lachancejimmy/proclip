import React from 'react';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import { useProjectStore } from '../../lib/store';
import VideoUploader from './VideoUploader';

export default function Preview() {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const {
    currentProject,
    isPlaying,
    setIsPlaying,
    currentTime,
    setCurrentTime,
  } = useProjectStore();

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const skipBackward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime -= 5;
    }
  };

  const skipForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime += 5;
    }
  };

  const renderCaptions = () => {
    if (!currentProject?.captions) return null;

    const currentCaptions = currentProject.captions.filter(
      (caption) =>
        currentTime >= caption.startTime && currentTime <= caption.endTime
    );

    return (
      <div className="absolute bottom-20 left-0 right-0 flex justify-center">
        {currentCaptions.map((caption) => (
          <div
            key={caption.id}
            className="bg-black/75 text-white px-4 py-2 rounded-lg text-lg text-center"
          >
            {caption.text}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex-1 p-6">
      <div className="relative aspect-video bg-black rounded-lg overflow-hidden shadow-lg">
        {currentProject?.videoUrl ? (
          <>
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full"
              src={currentProject.videoUrl}
              onTimeUpdate={handleTimeUpdate}
              onEnded={() => setIsPlaying(false)}
              playsInline
            />
            {renderCaptions()}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50">
              <div className="flex items-center justify-center space-x-4">
                <button
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                  onClick={skipBackward}
                >
                  <SkipBack className="w-5 h-5" />
                </button>
                <button
                  className="p-3 bg-white text-black rounded-full hover:bg-white/90 transition-colors"
                  onClick={togglePlayPause}
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6" />
                  ) : (
                    <Play className="w-6 h-6" />
                  )}
                </button>
                <button
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                  onClick={skipForward}
                >
                  <SkipForward className="w-5 h-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <VideoUploader />
        )}
      </div>
    </div>
  );
}
