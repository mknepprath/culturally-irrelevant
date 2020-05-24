import Head from "next/head";
import { useRouter } from "next/router";
import useSWR from "swr";

import fetcher from "../../libs/fetch";

export default function Episode() {
  const { query } = useRouter();
  const { data, error } = useSWR(
    () => query.id && `/api/episode/${query.id}`,
    fetcher
  );

  if (error) return <div>{error.message}</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <>
      <Head>
        <title>
          #{data.episode} - {data.name}
        </title>
      </Head>
      <audio controls src={data.audio.url}>
        Your browser does not support the <code>audio</code> element.
      </audio>
    </>
  );
}
