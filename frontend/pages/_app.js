import "../styles/globals.css";
import Link from "next/link";

export default function App({ Component, pageProps }) {
  return (
    <>
      <nav className="nav">
        <strong>MorpheCMS</strong>
        <div>
          <Link href="/">Home</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/services">Services</Link>
          <Link href="/careers">Careers</Link>
        </div>
      </nav>
      <Component {...pageProps} />
    </>
  );
}
