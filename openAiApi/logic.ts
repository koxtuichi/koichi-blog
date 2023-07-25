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

const API_KEY = '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';
const useAi = (isEng: boolean = false) => {
  const [prompt, setPrompt] = useState<string>("");
  const [problem, setProblem] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const configuration = new Configuration({
    apiKey: API_KEY,
  });
  const chatMessage: ChatCompletionRequestMessage[] = isEng
    ? [userMessage(prompt, problem, isEng)]
    : [...systemMessages, userMessage(prompt, problem, isEng)];

  const openAi = new OpenAIApi(configuration);
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response1 = await openAi.createChatCompletion({
        model: "gpt-3.5-turbo-0613",
        messages: chatMessage,
        function_call: "auto",
        functions: [
          {
            name: "searchRecommendedPhotoSpots",
            description:
              "取得した数字から、それにラッキーナンバーを計算し、それに関連する特徴的な言葉から、私の悩みに対して励ましの言葉をください。",
            parameters: {
              type: "object",
              properties: {
                number: {
                  type: "string",
                  description:
                    "数字を取得する。何桁でも問題ない。0始まりでも良い。",
                },
                problem: {
                  type: "string",
                  description: '悩み',
                }
              },
              required: ["number", "problem"],
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
        console.dir(args)
        const funcResponse = isEng
          ? searchRecommendedPhotoSpotsForEng(args["number"])
          : searchRecommendedPhotoSpots(args["number"], args["problem"]);
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
    setProblem,
    problem,
    setPrompt,
    prompt,
    response,
    handleSubmit,
    loading,
    setResponse,
  };
};

export default useAi;
