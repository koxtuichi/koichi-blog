import { systemMessages, userMessage } from "./messages/index";
import { useState } from "react";
import {
  Configuration,
  OpenAIApi,
  ChatCompletionRequestMessage,
  CreateFineTuneRequest,
} from "openai";
import {
  searchRecommendedPhotoSpots,
  searchRecommendedPhotoSpotsForEng,
} from "./searchRecommendedPhotoSpots";

const useAi = (isEng: boolean = false) => {
  const API_KEY = process.env.OPEN_AI_ID;
  const [prompt, setPrompt] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const configuration = new Configuration({
    apiKey: API_KEY,
  });
  const chatMessage: ChatCompletionRequestMessage[] = isEng
    ? [...systemMessages, userMessage(prompt, isEng)]
    : [userMessage(prompt, isEng)];

  const openAi = new OpenAIApi(configuration);
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const createFineTuneReq: CreateFineTuneRequest = {
        training_file: "./fineTune.json",
        model: "davinci",
        n_epochs: 4,
        learning_rate_multiplier: 0.1,
        prompt_loss_weight: 0.01,
      };

      const response1 = await openAi.createChatCompletion({
        model: "gpt-3.5-turbo-0613",
        messages: chatMessage,
        function_call: "auto",
        functions: [
          {
            name: "searchRecommendedPhotoSpots",
            description:
              "取得した数字から、それにラッキーナンバーを計算し、それに関連する特徴的な言葉から、運気の上がる撮影スポットをおすすめしてください。",
            parameters: {
              type: "object",
              properties: {
                number: {
                  type: "string",
                  description:
                    "数字を取得する。何桁でも問題ない。0始まりでも良い。",
                },
              },
              required: ["number"],
            },
          },
          {
            name: "searchRecommendedPhotoSpotsForEng",
            description:
              "From the numbers obtained, calculate the lucky number for it and recommend a lucky shooting spot based on the characteristic words associated with it.",
            parameters: {
              type: "object",
              properties: {
                number: {
                  type: "string",
                  description:
                    "Get a number. It does not matter how many digits, even starting with 0.",
                },
              },
              required: ["number"],
            },
          },
        ],
      });
      // console.dir(response1.data.choices[0].message);

      const message1 = response1.data.choices[0].message;
      // console.dir(message1);
      const functionCall = message1?.function_call;
      if (!!functionCall) {
        const args = JSON.parse(functionCall.arguments || "{}");
        const funcResponse = isEng
          ? searchRecommendedPhotoSpotsForEng(args["number"])
          : searchRecommendedPhotoSpots(args["number"]);
        const response2 = await openAi.createChatCompletion({
          model: "gpt-3.5-turbo-0613",
          messages: [
            ...chatMessage,
            message1 as ChatCompletionRequestMessage,
            {
              role: "function",
              content: funcResponse,
              name: functionCall.name,
            },
          ],
        });
        // console.dir(response2.data.choices[0].message);
        setResponse(response2.data.choices[0].message?.content || "");
      } else {
        setResponse(
          isEng
            ? "AI seems to be tired and skipped the search. \nMaybe if I press the button a few times, the AI will get motivated."
            : "AIが疲れて検索さぼったみたい。\n何回かボタンを押すとAIがやる気だしてくれるかも"
        );
      }
    } catch (e) {
      // console.dir(e);
      setResponse(
        isEng
          ? "Let's give AI a little rest. It looks like it's been working too hard."
          : "少しAIを休ませてあげよう。\n働き過ぎたみたい。"
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    setPrompt,
    prompt,
    response,
    handleSubmit,
    loading,
    setResponse,
  };
};

export default useAi;
