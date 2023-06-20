import axios from "axios";
import { useState } from "react";
import { Configuration, OpenAIApi, ChatCompletionRequestMessage } from "openai";
import { searchRecommendedPhotoSpots } from "./searchRecommendedPhotoSpots";

// const API_KEY = "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";
const API_KEY = "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";


const useAi = () => {
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
                  description: "数字を取得する。0始まりでも良い。",
                },
              },
              required: ["number"],
            },
          },
        ],
      });

      const message1 = response1.data.choices[0].message;
      console.dir(message1);
      const functionCall = message1?.function_call;
      if (!!functionCall) {
        const args = JSON.parse(functionCall.arguments || "{}");
        const funcResponse = searchRecommendedPhotoSpots(args["number"]);
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
        setResponse(response2.data.choices[0].message?.content || '');
      } else {
        setResponse('AIが疲れて検索さぼったみたい。\n何回かボタンを押すとAIがやる気だしてくれるかも');
      }
      } catch (e) {
      console.dir(e);
      setResponse('少しAIを休ませてあげよう。\n働き過ぎたみたい。');
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
