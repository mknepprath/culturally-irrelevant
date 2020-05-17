export default function Player(props) {
  const [clipIndex, setClipIndex] = React.useState(0);
  const [playBlip, setPlayBlip] = React.useState(true);

  function handleUpdateClipIndexOnEnded() {
    if (playBlip) {
      setPlayBlip(false);
    } else {
      setPlayBlip(true);
      setClipIndex(() => Math.floor(Math.random() * props.clips.length));
    }
  }

  const audioPlayerEl = React.useRef(null);
  React.useEffect(() => {
    if (audioPlayerEl.current) audioPlayerEl.current.play();
  }, [clipIndex, playBlip]);

  return (
    <>
      <p className="clip-name">
        {props.clips[clipIndex].name} (Ep. {props.clips[clipIndex].episode})
      </p>
      <audio
        controls
        onEnded={handleUpdateClipIndexOnEnded}
        ref={audioPlayerEl}
        src={playBlip ? "/blip-theme.mp3" : props.clips[clipIndex].clip.url}
      >
        Your browser does not support the
        <code>audio</code> element.
      </audio>
      <style jsx>{`
        .clip-name {
          text-align: center;
        }
      `}</style>
    </>
  );
}
