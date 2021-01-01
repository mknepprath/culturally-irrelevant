import Document, { Html, Head, Main, NextScript } from "next/document";

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "localhost:3000"
    : "https://culturallyirrelevant.net";

export default class MyDocument extends Document {
  /* I'm suspicious that this is doing nothing. */
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      // This is the reason this file was added - to set the `lang` attribute.
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:image" content={`${BASE_URL}/og-image.jpg`} />
          <meta property="og:image" content={`${BASE_URL}/og-image.jpg`} />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="627" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
