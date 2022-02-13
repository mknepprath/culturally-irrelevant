import { EPISODES } from "../../../libs/constants";

export default ({ query: { id } }, res) => {
  res.status(200).json({
    audio: {
      url: `${process.env.NEXT_PUBLIC_S3_BUCKET}/${id}.mp3`,
    },
    episode: `${EPISODES[id - 1].episode}`,
    name: `${EPISODES[id - 1].title}`,
  });
};
