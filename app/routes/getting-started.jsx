import { useLoaderData } from "remix";
import { NotionPage, fetchNotionData } from "./page/$page"

export function meta() {
  return {
    title: "Campaign Introduction",
    description: "To prep for session zero, here is some information about the campaign."
  };
}

export function loader() {
  return fetchNotionData('a405c7c76f52441eb98856aefa7513f7');
}

export default function Index() {
  let [page, {results}] = useLoaderData();
  return <NotionPage page={page} results={results} />
}
