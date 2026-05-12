import Head from 'next/head';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Qratedkart — Merch by India's Most Original Creators</title>
        <meta name="description" content="Discover and buy unique merch from independent Indian creators. From anime artists to fitness coaches — support creators, wear their art." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🛒</text></svg>" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
