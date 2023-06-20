import dayjs from "dayjs";

const colors = [
  {
    no: 0,
    color: "黒",
    word: "すべて",
  },
  {
    no: 1,
    color: "赤",
    word: "始まり",
  },
  {
    no: 2,
    color: "白",
    word: "バランス",
  },
  {
    no: 3,
    color: "黄",
    word: "変化",
  },
  {
    no: 4,
    color: "青",
    word: "安定",
  },
  {
    no: 5,
    color: "緑",
    word: "安定",
  },
  {
    no: 6,
    color: "ピンク",
    word: "美しさ",
  },
  {
    no: 7,
    color: "紺",
    word: "祝福",
  },
  {
    no: 8,
    color: "オレンジ",
    word: "豊かさ",
  },
  {
    no: 9,
    color: "紫",
    word: "神秘",
  },
  {
    no: 11,
    color: "赤または白",
    word: "神聖または始まりまたはバランス",
  },
  {
    no: 22,
    color: "白または青",
    word: "二面性またはバランスまたは安定",
  },
  {
    no: 33,
    color: "黄またはピンク",
    word: "ユニークまたは変化または美しさ",
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

  return `今日のラッキーナンバーは${luckyNumber}です。ラッキーナンバーに関連する特徴的な色は${
    color.color
  }です。ラッキーナンバーに関連する象徴的な言葉は${
    color.word
  }です。これらの色と言葉に関連するもののなかから、１つだけ写真を撮るのに適したものを教えてください。1つしか提案してはダメです。300文字以内でまとめてください。今の日時は${dayjs(
    new Date()
  ).format("YYYY年MM月DD日hh時mm分")}です。今から撮影できるものをおすすめしてください。ラッキーナンバー${luckyNumber}と色${
    color.word
  }と言葉を最初に提示してください。`;
};
