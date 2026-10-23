const fs = require("fs");

const serverLines = [
'const express = require("express");',
'const path = require("path");',
'const models = require("./src/modelData/models");',
'',
'const app = express();',
'const port = 3000;',
'',
'app.get("/test/info", (req, res) => {',
'  res.json(models.schemaInfo());',
'});',
'',
'app.get("/user/list", (req, res) => {',
'  res.json(models.userListModel());',
'});',
'',
'app.get("/user/:id", (req, res) => {',
'  const user = models.userModel(req.params.id);',
'  if (user) {',
'    res.json(user);',
'  } else {',
'    res.status(404).json({ error: "User not found" });',
'  }',
'});',
'',
'app.get("/photosOfUser/:id", (req, res) => {',
'  res.json(models.photoOfUserModel(req.params.id));',
'});',
'',
'app.use(express.static(path.join(__dirname, "build")));',
'',
'app.use((req, res, next) => {',
'  if (req.method === "GET") {',
'    res.sendFile(path.join(__dirname, "build", "index.html"));',
'  } else {',
'    next();',
'  }',
'});',
'',
'app.listen(port, () => {',
'  console.log(`PhotoApp server listening on http://localhost:${port}`);',
'});',
''
];
fs.writeFileSync("server.js", serverLines.join("\n"));

const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
delete pkg.proxy;
pkg.scripts.start = "npm run build && node server.js";
pkg.scripts.server = "node server.js";
fs.writeFileSync("package.json", JSON.stringify(pkg, null, 2) + "\n");

let app = fs.readFileSync("src/App.js", "utf8");
app = app.replace(
  'import { Grid, Typography, Paper } from "@mui/material";',
  'import { Grid, Paper } from "@mui/material";'
);
fs.writeFileSync("src/App.js", app);

console.log("OK: da sua 3 file (server.js, package.json, src/App.js)");