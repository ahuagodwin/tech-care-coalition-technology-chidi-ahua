
import YouTube, { YouTubeProps } from 'react-youtube';

export const VideoPlayer = ({ videoId }: {videoId: string}) => {
  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    event.target.pauseVideo();
  }

  const opts: YouTubeProps['opts'] = {
    height: '150',
    width: '250',
    playerVars: {
      autoplay: 1,
    },
  };

  return <YouTube videoId={videoId} opts={opts} onReady={onPlayerReady} />;
}