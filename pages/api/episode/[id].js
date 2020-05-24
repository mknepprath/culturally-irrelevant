import Airtable from "airtable";

Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: process.env.AIRTABLE_ACCESS_KEY,
});

export default ({ query: { id } }, res) => {
  const base = Airtable.base("app0uIxz4txpmmuCI");

  let episodes = [];

  base("Episodes")
    .select({
      filterByFormula: `{Episode} = ${id}`,
      view: "Grid view",
    })
    .eachPage(
      (records, fetchNextPage) => {
        // This function will get called for each page of records.
        records.forEach((record) => {
          const name = record.get("Name");
          const audioArray = record.get("Audio");
          const episode = record.get("Episode");
          const date = record.get("Release Date");
          episodes.unshift({
            id: record.id,
            audio: audioArray[0],
            episode,
            date,
            name,
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

        const filtered = episodes.filter((p) => {
          return p.episode === id;
        });

        // User with id exists
        if (filtered.length > 0) {
          res.status(200).json(filtered[0]);
        } else {
          res.status(404).json({ message: `Episode with id ${id} not found.` });
        }
      }
    );
};
