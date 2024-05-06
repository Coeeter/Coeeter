import client from './api-client';
import { readFile, writeFile } from 'fs/promises';
import { z } from 'zod';

const ResponseSchema = z
  .object({
    name: z.string(),
    html_url: z.string(),
  })
  .array();

function buildGithubStatsCardUrl(name: string) {
  const url = new URL('https://github-readme-stats.vercel.app/api/pin');

  const searchParams = new URLSearchParams({
    username: 'Coeeter',
    theme: 'github_dark',
    hide_border: 'true',
    repo: name,
  });

  url.search = searchParams.toString();

  return url.toString();
}

function buildProjectCard(project: z.infer<typeof ResponseSchema>[number]) {
  const cardUrl = buildGithubStatsCardUrl(project.name);

  return `[![${project.name}](${cardUrl})](${project.html_url})`;
}

async function main() {
  const recentProjects = await client
    .get('/users/Coeeter/repos?sort=created&per_page=6')
    .then(({ data }) => ResponseSchema.parse(data))
    .then(projects => projects.map(buildProjectCard))
    .then(cards => cards.join('\n'));

  const template = await readFile('assets/template.md', 'utf-8');

  await writeFile(
    'README.md',
    template.replace('<!-- PROJECTS -->', recentProjects),
    'utf-8'
  );
}

main()
  .then(() => console.log('README.md updated!'))
  .catch(error => {
    console.error('Failed to update README.md');
    console.error(error);
    process.exit(1);
  });
