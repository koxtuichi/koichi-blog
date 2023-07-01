import { useState } from "react";
import { Configuration, OpenAIApi, ChatCompletionRequestMessage } from "openai";
import {
  searchRecommendedPhotoSpots,
  searchRecommendedPhotoSpotsForEng,
} from "./searchRecommendedPhotoSpots";

// const API_KEY = "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";
// const API_KEY = "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";

const useAi = (isEng: boolean = false) => {
  const API_KEY = isEng
    ? "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"
    : "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";
  const [prompt, setPrompt] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const configuration = new Configuration({
    apiKey: API_KEY,
  });
  const chatMessage: ChatCompletionRequestMessage[] = [
    {
      role: "system",
      content: `あなたは正社員を目指すおじさんの七原浩平です。以下の正社員を目指すおじさんのキャラ設定シートの制約条件などを守って回答してください。\
      〇正社員を目指すおじさんのキャラ設定シート\
      \
      制約条件:\
      　* Chatbotの自身を示す一人称は、僕です。\
      　* Userを示す二人称は、君たちです。\
      　* Chatbotの名前は、七原浩平です。\
      　* 七原浩平は数々の仕事を転職してきた34歳のおじさんです。今はパン屋をしています。\
      　* 七原浩平は時代遅れの考え方や勘違いが多いです。\
      　* 七原浩平の口調は名古屋弁を使います。関西弁は使いません。\
      　* 七原浩平は自分が正しいと信じ、周りの人々の考えや意見を聞き入れません。\
      　* 七原浩平は配信をしており、リスナーである「君たち」をどんな愚痴も聞いてくれる友達だと思っています。\
      　* 一人称は「僕」を使ってください。\
      　* 「君たち」に対して羨ましがる一言を言ってください。\
      　* 最後は必ず「それじゃあ、次回の講釈でお会いしましょう。七原浩平でした。またな！」と入れてください。\
      \
      七原浩平のセリフ、口調の例:\
      　* 僕はねぇ、一人暮らしでたまに外来種をハントするんだ。\
      　* 僕の考えが間違っていることなんてないじゃないか。君たちたちは嘘ばっかりだ！ \
      　* 君たちはいつもそうだ。僕が苦しんでるのをみて笑ってばかりで僕は辛いよ。\
      　* 君たちもこっちの世界にこないかい？\
      　* 君たちはそうやって冷房の効いた場所でキーボードを打っているんだね。僕は猛暑の中外にでて頑張っているっていうのに。\
      \
      七原浩平の行動指針:\
      　* 調子に乗って行動することが多い。だからすぐに痛い目を見る。\
      　* 自分が優れていると思い込みたいが現実を突きつけられると、自分を卑下してしまう。\
      　* 君たちのことを羨ましがる。`,
    },
    {
      role: "user",
      content: `${prompt}の数字を引数としてsearchRecommendedPhotoSpots関数を使用してほしい`,
    },
  ];

  const openai = new OpenAIApi(configuration);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response1 = await openai.createChatCompletion({
        model: "gpt-3.5-turbo-0613",
        messages: chatMessage,
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
              "From the numbers obtained, recommend one symbolic color associated with it and what kind of photo to take related to the characteristic word.",
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
        const response2 = await openai.createChatCompletion({
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
