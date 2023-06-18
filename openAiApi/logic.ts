import axios from "axios";
import { useState } from "react";

const useAi = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const API_KEY = "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";
    const URL = "https://api.openai.com/v1/chat/completions";
    try {
      const response = await axios.post(
        URL,
        {
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            {
              role: "user",
              content: `関東で${prompt}を撮りに行きたいです。おすすめのお店または写真スポットを3つ教えてください。理由を一言添えてください。説明書きは不要です。また次のようなテンプレートで答えてください。1.回答1つ目 2.回答2つ目 3.回答3つ目`,
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );
      setResponse(response.data.choices[0].message.content);
    } catch (error) {
      console.log(error);
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
