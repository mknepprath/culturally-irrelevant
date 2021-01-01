import Airtable from "airtable";

Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: process.env.AIRTABLE_ACCESS_KEY,
});

export default async (req, res) => {
  const body = JSON.parse(req.body);
  
  await fetch(`https://hooks.slack.com/services/T0259ER7T/B01HV93RB5Z/${process.env.SLACK_TOKEN}`, {
    method: "POST",
    body: JSON.stringify({
      text: `${body.name} recommended ${body.recommendation}`,
      blocks: [{
        type: "section",
        text: {
          type: "plain_text",
          text: `${body.name} recommended ${body.recommendation}. Thanks, ${["bub", "pal", "friend", "really"][Math.floor(Math.random() * 4)]}!`
        }
      },
      {
        type: "section",
        text: {
          type: "plain_text",
          text: `They said, \"${body.message}\"`
        }
      }
    ]
    })
  })

  res.status(200)
  res.end()
};
