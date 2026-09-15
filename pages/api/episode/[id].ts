import type { NextApiRequest, NextApiResponse } from "next";

import { EPISODES } from "../../../libs/constants";

export default ({ query: { id } }: NextApiRequest, res: NextApiResponse) => {
  const index = Number(id) - 1;

  res.status(200).json({
    audio: {
      url: `https://culturallyirrelevant.s3.us-east-2.amazonaws.com/episodes/${id}.mp3`,
    },
    episode: `${EPISODES[index].episode}`,
    name: `${EPISODES[index].title}`,
  });
};
