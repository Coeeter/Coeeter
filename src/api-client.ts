import axios from "axios";
import { z } from "zod";
import "dotenv/config";

const headers = process.env.GITHUB_TOKEN
  ? {
      authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    }
  : undefined;

const client = axios.create({
  headers,
  baseURL: "https://api.github.com",
});

const GithubProjectSchema = z.object({
  name: z.string(),
  html_url: z.string(),
});

export type GithubProject = z.infer<typeof GithubProjectSchema>;

const ResponseSchema = GithubProjectSchema.array();

export default {
  getRecentProjects: async () => {
    const response = await client.get(
      "/users/Coeeter/repos?sort=pushed&per_page=7",
    );

    return ResponseSchema.parse(response.data)
      .filter((project) => project.name !== "Coeeter")
      .slice(0, 6);
  },
};
