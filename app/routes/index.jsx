import { useLoaderData } from "remix";
import { Link } from "react-router-dom";
import { NotionPage, fetchNotionData } from "./page/$page"

export function meta() {
  return {
    title: "The Wild Beyond the Witchlight",
    description: "Welcome to the campaign website!"
  };
}

export function loader() {
  return fetchNotionData('5dfb64f15876448f9f1f843f7566783f');
}

export default function Index() {
  let [page, {results}] = useLoaderData();
  return (
    <>
      <NotionPage page={page} results={results} />
      <p className="pl-10 pt-5">
        Click <Link to="/getting-started" className="text-purple-900">Getting Started</Link> if you dare to start your adventure!
      </p>
    </>
  );
}
