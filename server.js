let express = require('express');
const {join} = require("node:path");

let app = express();
app.use(express.static(join(__dirname + '/dist/chat-app-angular')));

app.get("/*", (req, res) => {
  res.sendFile(join(__dirname + '/dist/chat-app-angular/index.html'));
})

app.listen(process.env.PORT || 8080)
