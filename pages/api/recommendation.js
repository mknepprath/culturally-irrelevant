import Airtable from "airtable";

Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: process.env.AIRTABLE_ACCESS_KEY,
});

export default async (req, res) => {
  const base = Airtable.base("app0uIxz4txpmmuCI");

  const body = JSON.parse(req.body);

  base("Recommendations").create(
    [
      {
        fields: {
          Name: body.name,
          Recommendation: body.recommendation,
          Medium: body.medium,
          Official: false,
          Year: body.year,
          Message: body.message,
        },
      },
    ],
    (error, records) => {
      if (error) {
        console.error(error);
      }
      res.status(200).json(records);
    }
  );
};
