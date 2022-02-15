import classnames from "classnames";

import styles from "./card.module.css";

export default function Card({
  className,
  clip,
  isDarkMode,
  isOfficial,
  medium,
  message,
  name,
  recommendation,
  url,
  year,
  ...props
}) {
  return (
    <a
      href={url}
      rel="noopener noreferrer"
      target="_blank"
      className={classnames(
        styles.card,
        {
          [styles.official]: isOfficial,
          [styles.dark]: isDarkMode,
        },
        className
      )}
      {...props}
    >
      <h3>
        {recommendation}
        {year && ` (${year} ${medium})`}
      </h3>

      {clip ? (
        <audio
          className={styles.audio}
          controls
          controlsList="nodownload"
          // In Safari, clicking the play button also opens the containing link.
          // This prevents event bubbling so that doesn't happen.
          // - It also stops users from clicking the download button, which is...
          //   fine. I guess. I'm hiding it above with `nodownload`.
          onClick={(event) => event.preventDefault()}
          src={clip.url}
        >
          Your browser does not support the <code>audio</code> element.
        </audio>
      ) : null}

      <p>
        {message && `"${message}"`}
        {name && <em> - {name}</em>}
      </p>

      {url && <span className={styles.externalLink}>↗</span>}
    </a>
  );
}
