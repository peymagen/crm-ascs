import React from 'react';
import styles from './VideoPlayer.module.css';
import VideoPlayerLoader from './loader';

interface VideoPlayerProps {
  videoId: string;
  isLoading?: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoId, isLoading = false }) => {
  if (isLoading) {
    return <VideoPlayerLoader />;
  }

  return (
    <div className={styles.videoContainer}>
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoPlayer;