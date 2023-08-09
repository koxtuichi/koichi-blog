import { Box, Text } from "@chakra-ui/react";
import { Configuration, OpenAIApi } from "openai";
import { useEffect, useState } from "react";
import styles from "../styles/styles.module.css";

const TodaysFortune: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  useEffect(() => {
    if (!!message) return;
    (async () => {
      const configuration = new Configuration({
        apiKey:
          process.env.OPEN_AI_ID ||
          "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",
      });
      const openAi = new OpenAIApi(configuration);
      try {
        const response = await openAi.createChatCompletion({
          model: "gpt-4-0613",
          messages: [
            {
              role: "user",
              content: `
              * 今日の哲学を教えてほしい \
              * 100文字程度で収めてください \
              * 哲学者の名前も載せてほしい`,
            },
          ],
        });
        setMessage(response.data.choices[0].message?.content || "");
      } catch (e) {
        return null;
      }
    })();
  }, []);

  return (
    <>
      {message && <Text>{message}</Text>}
      {!message && (
        <div
          aria-busy="true"
          aria-label="Loading"
          role="progressbar"
          className={styles.container}
        >
          <div className={styles.swing}>
            <div className={`${styles.swingDiv} ${styles.swingLAnimation} ${styles.swingDivNth1}`}></div>
            <div className={`${styles.swingDiv} ${styles.swingDivNth2}`}></div>
            <div className={`${styles.swingDiv} ${styles.swingDivNth3}`}></div>
            <div className={`${styles.swingDiv} ${styles.swingDivNth4}`}></div>
            <div className={`${styles.swingDiv} ${styles.swingDivNth5}`}></div>
            <div className={`${styles.swingDiv} ${styles.swingDivNth6}`}></div>
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
      )}
    </>
  );
};

export default TodaysFortune;
