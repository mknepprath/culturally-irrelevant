import Airtable from "airtable";

Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: process.env.AIRTABLE_ACCESS_KEY,
});

export default async (req, res) => {
  const base = Airtable.base("app0uIxz4txpmmuCI");

  let posts = [];

  // Airtable filter formula example:
  // filterByFormula: `
  //   AND(
  //     NOT({Publish} = ''),
  //     OR(
  //       {Medium} = 'Book'
  //     )
  //   )
  // `,

  base("Recommendations")
    .select({
      filterByFormula: "NOT({Publish} = '')",
      view: "Grid view",
    })
    .eachPage(
      (records, fetchNextPage) => {
        // This function will get called for each page of records.
        records.forEach((record) => {
          const clipArray = record.get("Clip");
          const episode = record.get("Episode");
          const medium = record.get("Medium");
          const message = record.get("Message");
          const name = record.get("Name");
          const official = record.get("Official");
          const recommendation = record.get("Recommendation");
          const url = record.get("URL");
          const year = record.get("Year");
          posts.unshift({
            id: record.id,
            clip: clipArray && clipArray[0],
            episode,
            medium,
            message,
            name,
            official,
            recommendation,
            url,
            year,
          });
        });

        // If there are more records, this will get called again.
        // If there are no more records, the next function will get called.
        fetchNextPage();
      },
      (error) => {
        if (error) {
          console.error(error);
        }

        res.status(200).json(posts);
      }
    );
};
