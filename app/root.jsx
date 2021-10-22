import {
  Meta,
  Links,
  Scripts,
  LiveReload,
  useCatch
} from "remix";
import { Outlet, Link } from "react-router-dom";

import stylesUrl from "./styles/app.css";

export function links() {
  return [{ rel: "stylesheet", href: stylesUrl }];
}

function Document({ children, title }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Document>
      <header className="bg-purple-900 text-white flex items-center px-10 py-1 sticky top-0 z-50">
        <Link to="/">
          <img src="/logo.png" alt="Website Logo" className="max-h-16" />
        </Link>
        <Link to="/">
          <h1 className="text-2xl ml-5">The Wild Beyond the Witchlight</h1>
        </Link>
      </header>
      <div className="relative pb-10">
        <Outlet />
        {/* <footer>
          <p>This page was rendered at {data.date.toLocaleString()}</p>
        </footer> */}
      </div>
    </Document>
  );
}

export function CatchBoundary() {
  let caught = useCatch();

  switch (caught.status) {
    case 401:
    case 404:
      return (
        <Document title={`${caught.status} ${caught.statusText}`}>
          <h1>
            {caught.status} {caught.statusText}
          </h1>
        </Document>
      );

    default:
      throw new Error(
        `Unexpected caught response with status: ${caught.status}`
      );
  }
}

export function ErrorBoundary({ error }) {
  console.error(error);

  return (
    <Document title="Uh-oh!">
      <h1>App Error</h1>
      <pre>{error.message}</pre>
      <p>
        Replace this UI with what you want users to see when your app throws
        uncaught errors.
      </p>
    </Document>
  );
}
