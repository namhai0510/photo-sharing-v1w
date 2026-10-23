const express = require("express");
const models = require("./src/modelData/models");

const app = express();
const port = 3001;

// Test: /test/info
app.get("/test/info", (req, res) => {
  res.json(models.schemaInfo());
});

// GET /user/list - danh sách users
app.get("/user/list", (req, res) => {
  res.json(models.userListModel());
});

// GET /user/:id - thông tin 1 user
app.get("/user/:id", (req, res) => {
  const user = models.userModel(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

// GET /photosOfUser/:id - ảnh của 1 user
app.get("/photosOfUser/:id", (req, res) => {
  res.json(models.photoOfUserModel(req.params.id));
});

app.listen(port, () => {
  console.log(`PhotoApp server listening on http://localhost:${port}`);
});