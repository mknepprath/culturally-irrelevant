import Airtable from "airtable";
import type { NextApiRequest, NextApiResponse } from "next";

import type { Recommendation } from "../../libs/types";

Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: process.env.AIRTABLE_ACCESS_TOKEN,
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const base = Airtable.base("app0uIxz4txpmmuCI");

  let posts: Recommendation[] = [];

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
          const clipArray = record.get("Clip") as any;
          const episode = record.get("Episode") as any;
          const medium = record.get("Medium") as any;
          const message = record.get("Message") as any;
          const name = record.get("Name") as any;
          const isOfficial = record.get("Official") as any;
          const recommendation = record.get("Recommendation") as any;
          const url = record.get("URL") as any;
          const winner = record.get("Winner") as any;
          const year = record.get("Year") as any;
          posts.unshift({
            id: record.id,
            clip: clipArray && clipArray[0],
            episode,
            medium,
            message,
            name,
            isOfficial,
            recommendation,
            url,
            winner,
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
