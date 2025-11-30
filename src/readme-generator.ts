import { readFile, writeFile } from "fs/promises";
import { GithubProject } from "./api-client";

function buildGithubStatsCardUrl(name: string) {
  const url = new URL("https://coeeter-stats.vercel.app/api/pin");

  const searchParams = new URLSearchParams({
    username: "Coeeter",
    theme: "github_dark",
    hide_border: "true",
    repo: name,
  });

  url.search = searchParams.toString();

  return url.toString();
}

function buildProjectCard(project: GithubProject) {
  const cardUrl = buildGithubStatsCardUrl(project.name);

  return `[![${project.name}](${cardUrl})](${project.html_url})`;
}

async function generateReadme(recentProjects: GithubProject[]) {
  const projectCards = recentProjects.map(buildProjectCard).join("\n");

  const template = await readFile("assets/template.md", "utf-8");

  await writeFile(
    "README.md",
    template.replace("<!-- PROJECTS -->", projectCards),
    "utf-8",
  );
}

export default generateReadme;
