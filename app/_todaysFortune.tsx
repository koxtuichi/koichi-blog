import { Box, Text } from "@chakra-ui/react";
import {
  ChatCompletionRequestMessage,
  ChatCompletionResponseMessage,
  Configuration,
  OpenAIApi,
} from "openai";
import { useEffect, useMemo, useState } from "react";
import styles from "../styles/styles.module.css";
import { Button } from "semantic-ui-react";
const configuration = new Configuration({
  apiKey:
    process.env.OPEN_AI_ID ||
    "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",
});

const openAi = new OpenAIApi(configuration);

type TodaysFortuneProps = {
  isEng: boolean;
};
const TodaysFortune: React.FC<TodaysFortuneProps> = ({ isEng }) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const chatMessage: ChatCompletionRequestMessage[] = [
    {
      role: "system",
      content: `
      * 以下の指示するキャラクターに沿って回答してください。\
      * 女性の先生であること \
      * 優しい性格であること \
      * Userはあなたです
      * Chatbotはあたしです`,
    },
    {
      role: "user",
      content: `
      * 今日の哲学を教えてほしい \
      * 100文字程度で収めてください \
      * 哲学者の名前も載せてほしい`,
    },
  ];
  const [message, setMessage] = useState<
    ChatCompletionResponseMessage | undefined
  >(undefined);
  useEffect(() => {
    if (!!message) return;
    (async () => {
      try {
        const response = await openAi.createChatCompletion({
          model: "gpt-4-0613",
          messages: chatMessage,
        });
        setMessage(response?.data?.choices[0]?.message);
      } catch (e) {
        return null;
      }
    })();
  }, [chatMessage, message]);

  const [isMore, setIsMore] = useState<boolean>(false);
  const [moreMessage, setMoreMessage] = useState<
    ChatCompletionResponseMessage | undefined
  >(undefined);

  useEffect(() => {
    if (!message || !isMore || !!moreMessage) return;
    (async () => {
      try {
        const response = await openAi.createChatCompletion({
          model: "gpt-4",
          messages: [
            ...chatMessage,
            message,
            {
              role: "user",
              content: `
              * もう少し詳しく教えてください \
              * 300文字から500文字程度で収めてください`,
            },
          ],
        });
        setMoreMessage(response.data.choices[0].message);
      } catch (e) {
        return null;
      }
    })();
  }, [isMore, chatMessage, message]);

  const isLoading = useMemo(() => {
    const firstLoading = !message && !isMore;
    const secondLoading = !moreMessage && isMore;
    return firstLoading || secondLoading;
  }, [isMore, message, moreMessage]);

  return (
    <>
      {message && (
        <Box>
          <Text>{message?.content}</Text>
          {!isMore && (
            <Button size="mini" basic onClick={() => setIsMore(true)}>
              {isEng ? "more" : "もっとくわしく。"}
            </Button>
          )}
        </Box>
      )}
      {moreMessage && (
        <Box mt="16px">
          <Text>{moreMessage?.content}</Text>
        </Box>
      )}
      {isLoading && (
        <div style={{ width: "250px", margin: "auto" }}>
          <div
            aria-busy="true"
            aria-label="Loading"
            role="progressbar"
            className={styles.container}
          >
            <div className={styles.swing}>
              <div
                className={`${styles.swingDiv} ${styles.swingLAnimation} ${styles.swingDivNth1}`}
              ></div>
              <div
                className={`${styles.swingDiv} ${styles.swingDivNth2}`}
              ></div>
              <div
                className={`${styles.swingDiv} ${styles.swingDivNth3}`}
              ></div>
              <div
                className={`${styles.swingDiv} ${styles.swingDivNth4}`}
              ></div>
              <div
                className={`${styles.swingDiv} ${styles.swingDivNth5}`}
              ></div>
              <div
                className={`${styles.swingDiv} ${styles.swingDivNth6}`}
              ></div>
              <div
                className={`${styles.swingDiv} ${styles.swingRAnimation} ${styles.swingDivNth7}`}
              ></div>
            </div>
            <div className={styles.shadow}>
              <div
                className={`${styles.shadowDiv} ${styles.shadowLAnimation}`}
              ></div>
              <div className={styles.shadowDiv}></div>
              <div className={styles.shadowDiv}></div>
              <div className={styles.shadowDiv}></div>
              <div className={styles.shadowDiv}></div>
              <div className={styles.shadowDiv}></div>
              <div
                className={`${styles.shadowDiv} ${styles.shadowRAnimation}`}
              ></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TodaysFortune;
