const axios = require("axios");
const fs = require("fs");

(async () => {
  try {
    const reposResponse = await axios.get(
      "https://api.github.com/users/Coeeter/repos"
    );
    const recentProjects = reposResponse.data
      .sort((a, b) => {
        if (a["created_at"] > b["created_at"]) return -1;
        return 1;
      })
      .filter(item => item.name !== "Coeeter")
      .slice(0, 8)
      .map(item => {
        return `<a href="https://github.com/Coeeter/${item.name}"><img align="center" src="https://github-readme-stats.vercel.app/api/pin/?username=Coeeter&theme=github_dark&hide_border=true&repo=${item.name}"/></a>`;
      })
      .join("");
    const text = `![Header](assets/header.png)

## About Me
I am <a href="https://nasportfolio.com">Noorullah Nasrullah</a> and I am from Singapore. I am currently pursuing a diploma in Information Technology at Temasek Polytechnic and currently in my second year.

## My Github Stats
<img src="https://github-readme-stats.vercel.app/api?username=Coeeter&show_icons=true&theme=github_dark&hide_border=true" />
<img src="https://github-readme-stats.vercel.app/api/top-langs/?username=Coeeter&layout=compact&theme=github_dark&hide_border=true" />

## My recent projects
${recentProjects}`;
    fs.writeFile("README.md", text, err => {
      if (err) console.log(err);
    });
  } catch (e) {
    console.log(e);
  }
})();
