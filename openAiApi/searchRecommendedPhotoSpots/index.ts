import dayjs from "dayjs";

const colors = [
  {
    no: 0,
    color: "黒",
    word: "すべて",
    wordEng: "All",
  },
  {
    no: 1,
    color: "赤",
    word: "始まり",
    wordEng: "Beginning",
  },
  {
    no: 2,
    color: "白",
    word: "バランス",
    wordEng: "Balance",
  },
  {
    no: 3,
    color: "黄",
    word: "変化",
    wordEng: "Change",
  },
  {
    no: 4,
    color: "青",
    word: "安定",
    wordEng: "Stability",
  },
  {
    no: 5,
    color: "緑",
    word: "不安定",
    wordEng: "Instability",
  },
  {
    no: 6,
    color: "ピンク",
    word: "美しさ",
    wordEng: "Beauty",
  },
  {
    no: 7,
    color: "紺",
    word: "祝福",
    wordEng: "Blessing",
  },
  {
    no: 8,
    color: "オレンジ",
    word: "豊かさ",
    wordEng: "Richness",
  },
  {
    no: 9,
    color: "紫",
    word: "神秘",
    wordEng: "Mystery",
  },
  {
    no: 11,
    color: "赤または白",
    word: "神聖または始まりまたはバランス",
    wordEng: "Sacred or Beginning or Balance",
  },
  {
    no: 22,
    color: "白または青",
    word: "二面性またはバランスまたは安定",
    wordEng: "Duality or balance or stability",
  },
  {
    no: 33,
    color: "黄またはピンク",
    word: "ユニークまたは変化または美しさ",
    wordEng: "Uniqueness or variety or beauty",
  },
];

export const searchRecommendedPhotoSpots = (number: string | undefined) => {
  if (!number) return "";
  let luckyNumber: number = 0;
  if (number !== "11" && number !== "22" && number !== "33") {
    const todayNumList = dayjs(new Date())
      .format("YYYYMMDD")
      .replace(/[^0-9]/g, "")
      .split("");
    const numberList = number.replace(/[^0-9]/g, "").split("");
    const digits = [...numberList, ...todayNumList];
    for (let digit of digits) {
      luckyNumber += parseInt(digit);
    }

    while (luckyNumber > 9) {
      const digitsluckyNumber = luckyNumber
        .toString()
        .split("")
        .reduce((acc, curr) => acc + parseInt(curr), 0);
      luckyNumber = digitsluckyNumber;
    }
  } else {
    luckyNumber = parseInt(number) || 0;
  }

  if (luckyNumber === undefined) return;
  const color = colors?.find((item) => item.no === luckyNumber);
  if (!color) return;

  return `今日のラッキーナンバーは${luckyNumber}です。ラッキーナンバーに関連する象徴的な言葉は${
    color.word
  }です。この言葉に関連する被写体を１つ提案してください。1つしか提案してはダメです。300文字以内でまとめてください。今の日時は${dayjs(
    new Date()
  ).format(
    "YYYY年MM月DD日hh時mm分"
  )}です。今から撮影できるものをおすすめしてください。今の季節に撮影できるものを提案してください。ラッキーナンバー:${luckyNumber}と言葉:${
    color.word
  }を最初に提示してください。`;
};

export const searchRecommendedPhotoSpotsForEng = (
  number: string | undefined
) => {
  if (!number) return "";
  let luckyNumber: number = 0;
  if (number !== "11" && number !== "22" && number !== "33") {
    const todayNumList = dayjs(new Date())
      .format("YYYYMMDD")
      .replace(/[^0-9]/g, "")
      .split("");
    const numberList = number.replace(/[^0-9]/g, "").split("");
    const digits = [...numberList, ...todayNumList];
    for (let digit of digits) {
      luckyNumber += parseInt(digit);
    }

    while (luckyNumber > 9) {
      const digitsluckyNumber = luckyNumber
        .toString()
        .split("")
        .reduce((acc, curr) => acc + parseInt(curr), 0);
      luckyNumber = digitsluckyNumber;
    }
  } else {
    luckyNumber = parseInt(number) || 0;
  }

  if (luckyNumber === undefined) return;
  const color = colors?.find((item) => item.no === luckyNumber);
  if (!color) return;

  return `Today's lucky number is ${luckyNumber}. The symbolic word associated with the lucky number is ${
    color.wordEng
  }. Please suggest one subject related to this word, only one suggestion is allowed. 300 words or less. The current date and time is ${dayjs(
    new Date()
  ).format(
    "YYYYY MM/DD hh:mm"
  )}. Please suggest something that can be taken now. Please suggest something that can be taken in the current season. Lucky Number:${luckyNumber} and word:${
    color.wordEng
  } should be presented first.`;
};
