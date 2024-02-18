import express  from "express";

const app = express();

const port = 8080;

app.get("/", (req, res) => {
    res.send("Express on Vercel");
  });
  
  // Initialize server
  app.listen(port, () => {
    console.log(`Running on port ${port}.`);
  });


  export default app;