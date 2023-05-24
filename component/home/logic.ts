export const speakEnglish = (text: string) => {
  const speechText = new SpeechSynthesisUtterance(text);
  speechText.lang = "en-US";
  speechText.rate = 1.2;
  speechText.pitch = 0.6;
  speechText.volume = 0.9;
  speechSynthesis.speak(speechText);
};

export const speakJapanese = (text: string) => {
  const speechText = new SpeechSynthesisUtterance(text);
  speechText.lang = "ja-JP";
  speechText.rate = 1.2;
  speechText.pitch = 0.7;
  speechText.volume = 0.9;
  speechSynthesis.speak(speechText);
};
