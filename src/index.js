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
      .slice(0, 6)
      .map(item => {
        return `<a href="https://github.com/Coeeter/${item.name}"><img align="center" src="https://github-readme-stats.vercel.app/api/pin/?username=Coeeter&theme=github_dark&hide_border=true&repo=${item.name}"/></a>`;
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
