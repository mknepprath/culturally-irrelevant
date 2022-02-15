import Airtable from "airtable";

Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: process.env.NEXT_PUBLIC_AIRTABLE_ACCESS_KEY,
});

export default async (req, res) => {
  const base = Airtable.base("app0uIxz4txpmmuCI");

  const body = JSON.parse(req.body);

  base("Recommendations").create(
    [
      {
        fields: {
          // Alert: {
          //   id: "usrHPjzq5pfF12oRM",
          //   email: "mknepprath@gmail.com",
          //   name: "Michael Knepprath",
          // },
          Medium: body.medium,
          Message: body.message,
          Name: body.name,
          Official: false,
          Recommendation: body.recommendation,
          Year: body.year,
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
