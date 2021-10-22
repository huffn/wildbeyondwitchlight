import { useLoaderData, json } from "remix";

export function meta() {
  return {
    title: "Campaign Introduction",
    description: "To prep for session zero, here is some information about the campaign."
  };
}

export async function asyncloader({ params }) {
  return fetchNotionData(params.page);
}

export async function fetchNotionData(id) {
  const headers = {
    "Authorization": `Bearer ${process.env.NOTION_SECRET}`,
    "Notion-Version": `${process.env.NOTION_VERSION}`
  };
  let pageRes = await fetch(`https://api.notion.com/v1/pages/${id}`, {
    headers
  });
  let childrenRes = await fetch(`https://api.notion.com/v1/blocks/${id}/children`, {
    headers
  });
  let page = await pageRes.json();
  let children = await childrenRes.json();
  return json([page, children]);
}

export function NotionPage({page, results}) {
  const renderChildren = (type, value, id) => {
    const renderValue = value.text?.[0]?.plain_text || value.file?.url;
    switch (type) {
      case 'heading_2':
        return <h2 className="text-2xl pt-5" key={id}>{renderValue}</h2>
      case 'bulleted_list_item':
        return <p key={id}>* {renderValue}</p>
      case 'image':
        return <img className="max-h-96" src={renderValue}  key={id} />
      case 'callout':
        return <p className="text-sm text-gray-500" key={id}>{renderValue}</p>  
      default:
        // console.log(type, value);
        return <p className="text-base" key={id}>{renderValue}</p>
    }
  }
  const { cover } = page
  return (
    <div className="px-10 pt-10">
      {cover && cover.file && cover.file.url &&
        <img className="m-auto max-w-full md:max-w-prose" src={cover.file.url} alt="Cover Image" />
      }
      <h2 className="text-xl md:text-4xl">{page.properties.title.title[0].plain_text}</h2>
      {results.map((result) => {
        const { type, id } = result;
        const value = result[type];
        return (renderChildren(type, value, id))
      })}
    </div>
  );
}

export default function Page() {
  let [page, {results}] = useLoaderData();
  return <NotionPage page={page} results={results} />
}
