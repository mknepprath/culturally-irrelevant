import fetch from "isomorphic-unfetch";

// Didn't know I needed this until https://github.com/zeit/swr/blob/master/examples/basic/libs/fetch.js
export default async function (...args) {
  const res = await fetch(...args);
  return res.json();
}
