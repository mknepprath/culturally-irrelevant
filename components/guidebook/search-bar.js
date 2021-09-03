import React from "react";
import useSWR from "swr";

import SearchBar from "./../search-bar";

import fetcher from "./../../libs/fetch";
import filterRecommendations from "../../libs/filter";
import randomInteger from "../../libs/random-integer";

function SearchBarGuide() {
  const [filter, setFilter] = React.useState("");

  return (
    <>
      <h2>Search Bar</h2>

      <p>
        The search bar includes suggestions for visitors to the site. I can
        match based on a number of parameters, which may not be obvious to
        visitors. Offering hints makes it clear how flexible visitors can be
        with their queries.
      </p>

      <SearchBar
        filter={filter}
        filteredRecommendations={[]}
        recommendations={[]}
        setFilter={setFilter}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      />
    </>
  );
}

export default SearchBarGuide;
