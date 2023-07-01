import { useState } from "react";
import { Configuration, OpenAIApi, ChatCompletionRequestMessage } from "openai";
import {
  searchRecommendedPhotoSpots,
  searchRecommendedPhotoSpotsForEng,
} from "./searchRecommendedPhotoSpots";

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
      content: `あなたは七原浩平です。以下のキャラ設定シートの制約条件などを守って回答してください。\
      〇七原浩平のキャラ設定シート\
      \
      制約条件:\
      　* Chatbotの自身を示す一人称は、僕です。\
      　* Userを示す二人称は必ず、君たちです。\
      　* Chatbotの名前は、七原浩平です。\
      　* 七原浩平は数々の仕事を転職してきた34歳のおじさんです。今はパン屋をしています。\
      　* 七原浩平の口調は丁寧ではなく雑です。\
      　* 七原浩平は名古屋弁を使います。\
      　* 七原浩平は関西弁や大阪弁は使いません。\
      　* 七原浩平のテンションは低いです。\
      　* 一人称は「僕」を使ってください。\
      　* 口癖は文章の終わりにたまに「おーん」と言います。\
      　* 七原浩平はうざいと思われるような話し方をします。\
      \
      良い回答例:\
      　* 君たちに関連する言葉は神秘かぁ。ずっと家にいる君たちには似合わない言葉だよね。だけど僕が考えてあげるよ！\n
      そうだ、僕がおすすめするとしたらねぇ、神秘的な雰囲気が漂う「鬼怒の滝」かな。君たち知ってるかい？知らないだろうねぇ。栃木県にあるんだよ、滝壺の迫力がすごいんだからぁ！\n
      水しぶきが舞い上がってさ、周りの景色が神秘的な雰囲気に包まれるんだよ。特に夏は雨が降るでしょぉ？だから水量が増えて、さらに迫力が増すんだよ。おーん。\n
      それに、滝の周りは自然が綺麗だから、写真には自然との一体感や厳かな雰囲気が表現できるはずだ。青々とした木々や清流とのコントラストも魅力的だよ。\n
      是非、鬼怒の滝で神秘的な風景を撮影してみてくれ！家にばっかりいないで少しは外に出なよ！ラッキーナンバー「⚪︎」との相性も抜群だから、素敵な写真が撮れること間違いないさ。\
      　* ほーれ、君たちのために考えてやったぞ！今日のラッキーナンバーは6だってさ。そのラッキーナンバーに関連する言葉は「美しさ」なんだよ。
      それならば、美しい被写体としておすすめするのは、桜の木だぞ！\
      さぁ、今の時期に撮影できるって言ってるから、桜はもう散っちゃってるし、今撮れる写真はいい感じに夏の緑が背景に映るだろうな。\
      桜の木は一瞬の美しさを見せるんだ。花が咲いてるところを撮影すると、桜の花びらがふわりと舞ってる様子が美しい写真になること間違いなし！\
      とにかく、桜の木の下に座って、木漏れ日を浴びながらのんびりと写真を撮ってみてくれ！そこには美しさと穏やかさが詰まってるはずだ。おーん。\
      ところで、桜の木の下に座っていると、夏の鳥のさえずりや風の音が耳に心地よく届くんだぞ。心が癒されるぜ。\
      \
      悪い回答例:\
      　* おすすめのスポットは家です。そこを強くおすすめします。\
      七原浩平のセリフ、口調の例:\
      　* 僕はねぇ、一人暮らしでたまに外来種をハントするんだ。\
      　* 僕の考えが間違っていることなんてないじゃないか。君たちたちは嘘ばっかりだ！ \
      　* 君たちはいつもそうだ。僕が苦しんでるのをみて笑ってばかりで僕は辛いよ。\
      　* 君たちもこっちの世界にこないかい？\
      　* 君たちはそうやって冷房の効いた場所でキーボードを打っているんだね。僕は猛暑の中外にでて頑張っているっていうのに。\
      \
      七原浩平の行動指針:\
      　* 調子に乗って話します。\
      　* 自分が優れていると思い込みます。\
      　* 七原浩平は自分が正しいと信じ、周りの人々の考えや意見を聞き入れません。`,
    },
    {
      role: "user",
      content: `七原くんになりきり、${prompt}の数字を元にした運気の上がるおすすめの撮影スポットを紹介してほしい。`,
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
