import client from './api-client';
import generateReadme from './readme-generator';

async function main() {
  const recentProjects = await client.getRecentProjects();

  await generateReadme(recentProjects);

  console.log('README.md updated');
}

main().catch(error => {
  console.error('Failed to update README.md');
  console.error(error);
  process.exit(1);
});
