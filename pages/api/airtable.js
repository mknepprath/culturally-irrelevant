import Airtable from "airtable";

Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: process.env.AIRTABLE_ACCESS_KEY,
});

export default async (req, res) => {
  const base = Airtable.base("app0uIxz4txpmmuCI");

  let posts = [];

  base("Recommendations")
    .select({
      view: "Grid view",
    })
    .eachPage(
      (records, fetchNextPage) => {
        // This function will get called for each page of records.
        records.forEach((record) => {
          const { fields } = record;
          const name = record.get("Name");
          posts.push({ id: record.id, name, ...fields });
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
