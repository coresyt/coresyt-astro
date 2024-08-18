import type { GithubAPi } from "$/types";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request }) => {
  const res = await fetch("https://api.github.com/users/coresyt/repos", {
    headers: {
      Authorization: import.meta.env.GITHUB_TOKEN,
    },
  });

  const json: Promise<Array<GithubAPi>> = await res.json();
  const data = (await json)
    .map((obj: GithubAPi) => {
      const { name, html_url, language, homepage, stargazers_count } = obj;

      if (homepage)
        return {
          name,
          html_url,
          language,
          page: homepage,
          stars: stargazers_count,
        };

      return { name, html_url, language, stars: stargazers_count };
    })
    .filter((obj) => obj.name !== "coresyt");

  return new Response(JSON.stringify(data));
};
