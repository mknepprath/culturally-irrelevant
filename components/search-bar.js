import React from "react";

import { PLACEHOLDER_EXAMPLES } from "../libs/constants";
import useInterval from "../libs/interval";
import randomInteger from "../libs/random-integer";
import shuffle from "../libs/shuffle";

import styles from "./search-bar.module.css";

export default function SearchBar({
  className,
  filter,
  filteredRecommendations,
  recommendations,
  setFilter,
  ...props
}) {
  const [placeholder, setPlaceholder] = React.useState({
    index: 0,
    text: "...",
  });
  const [delay, setDelay] = React.useState(2000);

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
      <label htmlFor="search">Search</label>
      <input
        className={styles.input}
        id="search"
        onChange={(event) => setFilter(event.currentTarget.value)}
        placeholder={placeholder.text.slice(0, placeholder.index)}
      />

      <p
        className={styles.count}
        style={{
          visibility:
            recommendations.length !== filteredRecommendations.length
              ? "visible"
              : "hidden",
        }}
      >{`${filteredRecommendations.length} result${
        filteredRecommendations.length !== 1 ? "s" : ""
      }`}</p>
    </div>
  );
}
