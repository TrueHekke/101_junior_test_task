import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import App from "./components/App.jsx";

const app = express();
const port = 3000;

app.get("/", async (req, res) => {
  const content = renderToString(<App />);

  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>React junior test task</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
      </head>
      <body>
        <div id="root">${content}</div>
        <script src="bundle.js"></script>
      </body>
    </html>
  `);
});

app.listen(port, () => {
  console.info(`App listening on port ${port}`);
});
