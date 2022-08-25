const axios = require("axios");
const fs = require("fs");
require("dotenv").config();

(async () => {
  try {
    const githubToken = process.env.GITHUB_TOKEN;
    const reposResponse = await axios.get(
      "https://api.github.com/users/Coeeter/repos",
      githubToken
        ? {
            headers: {
              authorization: "Bearer " + githubToken,
            },
          }
        : null
    );
    const recentProjects = reposResponse.data
      .sort((a, b) => {
        if (a["created_at"] > b["created_at"]) return -1;
        return 1;
      })
      .filter(item => item.name !== "Coeeter")
      .slice(0, 6)
      .map(item => {
        const statLink =
          `https://github-readme-stats.vercel.app/api/pin/` +
          `?username=Coeeter&theme=github_dark&hide_border=true&repo=${item.name}`;
        return (
          `<a href="https://github.com/Coeeter/${item.name}">\n` +
          `\t<img align="center" src="${statLink}"/>\n` +
          `</a>\n`
        );
      })
      .join("");
    fs.readFile("src/assets/template.txt", (err, data) => {
      if (err) return console.log(err);
      const text = data.toString() + "\n" + recentProjects;
      fs.writeFile("README.md", text, err => {
        if (err) console.log(err);
      });
    });
  } catch (e) {
    console.log(e);
  }
})();
