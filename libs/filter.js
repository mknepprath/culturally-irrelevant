export default function filterRecommendations(filter, recommendations) {
  if (!recommendations) return [];
  // Split the user-inputted search and filtering based on that. For example:
  // Searching `ben 2016 film` will result in all recommendations that include `ben`,
  // `2016`, and `film`.
  return recommendations.filter((
    rec // {name: "Ben", medium: "Film", recommendation: "The Wailing", year: 2016}
  ) =>
    filter // "Ben 2016 film"
      .toLowerCase() // => "ben 2016 film"
      .split(" ") // => ["ben", "2016", "film"]
      .every(
        (filterSegment) =>
          [rec.name, rec.medium, rec.recommendation, rec.year] // => ["Ben", "Film", "The Wailing", 2016]
            .join(" ") // => "Ben Film The Wailing 2016"
            .toLowerCase() // => "ben film the wailing 2016"
            .includes(filterSegment) // Does the above string include every value in ["ben", "2016", "film"]?
      )
  );
}
