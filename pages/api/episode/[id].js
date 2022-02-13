import { EPISODES } from "../../../libs/constants";

export default ({ query: { id } }, res) => {
  res.status(200).json({
    audio: {
      url: `https://culturallyirrelevant.s3.us-east-2.amazonaws.com/episodes/${id}.mp3`,
    },
    episode: `${EPISODES[id - 1].episode}`,
    name: `${EPISODES[id - 1].title}`,
  });
};
