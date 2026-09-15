import fetch from "isomorphic-unfetch";

function fetcher(...args: Parameters<typeof fetch>) {
  return fetch(...args).then((response) => response.json());
}

export default fetcher;
