import Airtable from "airtable";

Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: process.env.AIRTABLE_ACCESS_TOKEN,
});

export default async (req, res) => {
  const body = JSON.parse(req.body);

  const blocks = [
    {
      type: "section",
      text: {
        type: "plain_text",
        text: `${body.name} recommended ${body.recommendation}. Thanks, ${
          ["bub", "pal", "friend", "really"][Math.floor(Math.random() * 4)]
        }!`,
      },
    },
  ];

  if (body.message !== "") {
    blocks.push({
      type: "section",
      text: {
        type: "plain_text",
        text: `They said, \"${body.message}\"`,
      },
    });
  }

  await fetch(
    `https://hooks.slack.com/services/T0259ER7T/B01HV93RB5Z/${process.env.NEXT_PUBLIC_SLACK_TOKEN}`,
    {
      method: "POST",
      body: JSON.stringify({
        text: `${body.name} recommended ${body.recommendation}`,
        blocks,
      }),
    }
  );

  res.status(200);
  res.end();
};
