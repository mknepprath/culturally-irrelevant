import { PLACEHOLDER_EXAMPLES } from "../libs/constants";
import useInterval from "../libs/interval";
import shuffle from "../libs/shuffle";

import styles from "./search-bar.module.css";

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function SearchBar({
  className,
  filter,
  filteredRecommendations,
  recommendations,
  setFilter,
  ...props
}) {
  const [placeholder, setPlaceholder] = React.useState({
    index: 6,
    text: "Search...",
  });
  const [delay, setDelay] = React.useState(6000);

  useInterval(
    () => {
      if (placeholder.index < placeholder.text.length) {
        setDelay(randomInteger(24, 200));
        setPlaceholder((placeholder) => ({
          ...placeholder,
          index: placeholder.index + 1,
        }));
      } else if (placeholder.index === placeholder.text.length) {
        setDelay(2000);
        setPlaceholder((placeholder) => ({
          ...placeholder,
          index: placeholder.index + 1,
        }));
      } else {
        setDelay(100);
        setPlaceholder(() => ({
          index: 0,
          text: shuffle(PLACEHOLDER_EXAMPLES)[0],
        }));
      }
    },
    recommendations && filter === "" ? delay : null
  );

  return (
    <div className={className} {...props}>
      <input
        className={styles.input}
        onChange={(event) => setFilter(event.currentTarget.value)}
        placeholder={placeholder.text.slice(0, placeholder.index)}
      />

      {recommendations.length !== filteredRecommendations.length && (
        <p className={styles.count}>{`${filteredRecommendations.length} result${
          filteredRecommendations.length !== 1 ? "s" : ""
        }`}</p>
      )}
    </div>
  );
}