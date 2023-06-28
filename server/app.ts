const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { Configuration, OpenAIApi } = require("openai");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT;

//setup openai
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

//post question to openai
app.post("/ask", async (req, res) => {
  console.log(req.body);
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `how do i book a ticket for cheap if i'm flying tonight?`,
      max_tokens: 64,
    });
    return res
      .status(200)
      .json({ success: true, data: response.data.choices[0].text });
  } catch (error) {
    const message =
      error.response?.data ??
      error.message ??
      "Uh oh. I just encountered an error. Sorry I can't help you at the moment.";

    return res.status(400).json({
      success: false,
      error: message,
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
