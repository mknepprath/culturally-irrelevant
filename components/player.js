import Head from "next/head";

import styles from "./player.module.css";

const randomIndex = (length) => Math.floor(Math.random() * length);

export default function Player({ clips }) {
  const [clipIndex, setClipIndex] = React.useState(randomIndex(clips.length));
  const [blip, setBlip] = React.useState(false);

  function handleUpdateClipIndexOnEnded() {
    // When the audio element stops playing, check if the blip was played.
    if (blip) {
      // The blip has played, toggle off.
      setBlip(false);
    } else {
      // The clip has played, play blip and choose next clip.
      setBlip(true);
      setClipIndex(() => randomIndex(clips.length));
    }
  }

  const audioElement = React.useRef(null);
  React.useEffect(() => {
    if (audioElement.current) audioElement.current.play();
  }, [clipIndex, blip]);

  const { clip, episode, name } = clips[clipIndex];
  const audioSrc = blip ? "/blip-theme.mp3" : clip.url;

  return (
    <>
      <Head>
        <title>
          The Irrelevant Mixtape - {name} (Ep. {episode})
        </title>
        <meta
          property="og:title"
          content={`The Irrelevant Mixtape - ${name} (Ep. ${episode})`}
        />
      </Head>
      <audio
        controls
        data-clip-count={`${clips.length}`}
        onEnded={handleUpdateClipIndexOnEnded}
        ref={audioElement}
        src={audioSrc}
      >
        Your browser does not support the <code>audio</code> element.
      </audio>
      <p className={styles.clipName}>
        {name} (Ep. {episode})
      </p>
    </>
  );
}
