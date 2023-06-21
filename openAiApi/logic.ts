import { useState } from "react";
import { Configuration, OpenAIApi, ChatCompletionRequestMessage } from "openai";
import {
  searchRecommendedPhotoSpots,
  searchRecommendedPhotoSpotsForEng,
} from "./searchRecommendedPhotoSpots";

// const API_KEY = "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";
// const API_KEY = "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";

const useAi = (isEng: boolean = false) => {
  const API_KEY = isEng ? "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" : "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";
  const [prompt, setPrompt] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const configuration = new Configuration({
    apiKey: API_KEY,
  });
  const chatMessage: ChatCompletionRequestMessage = {
    role: "system",
    content: `${prompt}の数字を引数としてsearchRecommendedPhotoSpots関数を使用してほしい`,
  };

  const openai = new OpenAIApi(configuration);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response1 = await openai.createChatCompletion({
        model: "gpt-3.5-turbo-0613",
        messages: [chatMessage],
        function_call: "auto",
        functions: [
          {
            name: "searchRecommendedPhotoSpots",
            description:
              "取得した数字から、それに紐づく象徴的な色と、特徴的な言葉に関連する写真を撮るためにはどんなものがあるかを一つだけおすすめする",
            parameters: {
              type: "object",
              properties: {
                number: {
                  type: "string",
                  description: "数字を取得する。何桁でも問題ない。0始まりでも良い。",
                },
              },
              required: ["number"],
            },
          },
          {
            name: "searchRecommendedPhotoSpotsForEng",
            description:
              "From the numbers obtained, recommend one symbolic color associated with it and what kind of photo to take related to the characteristic word.",
            parameters: {
              type: "object",
              properties: {
                number: {
                  type: "string",
                  description: "Get a number. It does not matter how many digits, even starting with 0.",
                },
              },
              required: ["number"],
            },
          },
        ],
      });
      console.dir(response1.data.choices[0].message);

      const message1 = response1.data.choices[0].message;
      console.dir(message1);
      const functionCall = message1?.function_call;
      if (!!functionCall) {
        const args = JSON.parse(functionCall.arguments || "{}");
        const funcResponse = isEng
          ? searchRecommendedPhotoSpotsForEng(args["number"])
          : searchRecommendedPhotoSpots(args["number"]);
        const response2 = await openai.createChatCompletion({
          model: "gpt-3.5-turbo-0613",
          messages: [
            chatMessage,
            message1 as ChatCompletionRequestMessage,
            {
              role: "function",
              content: funcResponse,
              name: functionCall.name,
            },
          ],
        });
        console.dir(response2.data.choices[0].message);
        setResponse(response2.data.choices[0].message?.content || "");
      } else {
        setResponse(
          isEng
            ? "AI seems to be tired and skipped the search. \nMaybe if I press the button a few times, the AI will get motivated."
            : "AIが疲れて検索さぼったみたい。\n何回かボタンを押すとAIがやる気だしてくれるかも"
        );
      }
    } catch (e) {
      console.dir(e);
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
  };
};

export default useAi;
