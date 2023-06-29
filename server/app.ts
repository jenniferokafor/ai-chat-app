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
  organization: process.env.OPENAI_ORGANIZATION_ID,
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

//post question to openai
// @ts-ignore
app.post("/ask", async (req, res) => {
  console.log(req.body.messages);
  const assistant = { role: "system", content: "You are a helpful assistant." };
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [assistant, ...req.body.messages],
      max_tokens: 64,
    });
    return res
      .status(200)
      .json({ success: true, data: response.data.choices[0].message });
  } catch (error) {
    const message =
      // @ts-ignore

      error.response?.data ??
      // @ts-ignore

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
