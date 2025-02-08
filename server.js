const express = require("express");
const path = require("path");

const app = express();

const distPath = path.join(__dirname, "dist/chat-app-ng-frontend");
app.use(express.static(distPath));

app.get("/*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
