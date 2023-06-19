import dayjs from "dayjs";

export const searchRecommendedPhotoSpots = (number: string | undefined) => {
  console.dir(number)
  if (!number) return '';
  const digits = number.replace(/[^0-9]/g, '').split('');
  let sum = 0;

  for (let digit of digits) {
    sum += parseInt(digit);
  }

  while (sum > 9) {
    const digitsSum = sum.toString().split('').reduce((acc, curr) => acc + parseInt(curr), 0);
    sum = digitsSum;
  }

  const colors = [
    {
      color: "黒",
      word: "すべて",
    },
    {
      color: "赤",
      word: "始まり",
    },
    {
      color: "白",
      word: "バランス",
    },
    {
      color: "黄",
      word: "変化",
    },
    {
      color: "青",
      word: "安定",
    },
    {
      color: "緑",
      word: "安定",
    },
    {
      color: "ピンク",
      word: "美しさ",
    },
    {
      color: "紺",
      word: "祝福",
    },
    {
      color: "オレンジ",
      word: "豊かさ",
    },
    {
      color: "紫",
      word: "神秘",
    },
  ];

  console.dir(sum)

  return `ライフナンバーは${sum}です。ライフナンバーに関連する特徴的な色は${colors[sum].color}です。ライフナンバーに関連する象徴的な言葉は${colors[sum].word}です。これらの色と言葉に関連するもののなかから、１つだけ写真を撮るのに適したものを教えてください。1つしか提案してはダメです。300文字以内でまとめてください。今日の日付は${dayjs(new Date()).format('YYYY年MM月DD日')}です。ライフナンバーと色と言葉を最初に提示してください。`;
};