import Airtable from "airtable";

Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: process.env.AIRTABLE_ACCESS_TOKEN,
});

export default async (req, res) => {
  const base = Airtable.base("app0uIxz4txpmmuCI");

  let posts = [];

  base("Clips")
    .select({
      filterByFormula: "NOT({Clip} = '')",
      view: "Grid view",
    })
    .eachPage(
      (records, fetchNextPage) => {
        // This function will get called for each page of records.
        records.forEach((record) => {
          const name = record.get("Name");
          const clipArray = record.get("Clip");
          const episode = record.get("Episode");
          posts.unshift({ id: record.id, clip: clipArray[0], episode, name });
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
