import { PresentPhotoPost } from "@/notionApi/presentPhoto";
import { Box, Flex, Link, Text } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { Button, Input } from "semantic-ui-react";

type SellPhotoProps = {
  viewEng: boolean;
  presentPhotoPost: PresentPhotoPost;
};
type SubmitObjType = {
  name: string;
  zipCode: string;
  address: string;
  email: string;
};

const ZERO = 0;
const FIRST = 1;
const SECOND = 2;
const THIRD = 3;

const FlexComponent: React.FC = ({ children }) => {
  return (
    <Flex
      flexDirection="column"
      w="350px"
      m="0 auto"
      textAlign="center"
      gap="20px"
    >
      {children}
    </Flex>
  );
};
const TextComponent: React.FC = ({ children }) => {
  return (
    <Text whiteSpace="break-spaces" w="350px" textAlign="center" m="0 auto">
      {children}
    </Text>
  );
};
const SellPhoto: React.FC<SellPhotoProps> = ({ viewEng, presentPhotoPost }) => {
  const [step, setStep] = useState<number>(ZERO);

  const zeroDescription = useMemo(() => {
    return viewEng
      ? `Through photo exhibitions and photo collections, I felt the appeal of "photographs in hand" and wanted others to feel its quality that cannot be conveyed through social networking alone.

      Therefore, we have launched a project to provide you with a free L-size photo. The photos will change each time, so if you find one you like, please submit it to us.
      `
      : `写真展や写真集を通して「手に取る写真」の魅力を感じ、SNSだけでは伝えられないその良さを他の人にも感じてもらいたいという欲がでてきました。

      そこで、L判サイズの写真を無料でお届けする企画を立ち上げました。写真は都度変わりますので、気に入ったものがあればぜひご応募ください。`;
  }, [viewEng]);

  const imageConfirmText = useMemo(() => {
    return viewEng ? "Check the photo" : "写真を確認する";
  }, [viewEng]);

  const applyButtonText = useMemo(() => {
    return viewEng ? "Apply this photo" : "この写真を応募する";
  }, [viewEng]);

  const openedDescription = useMemo(() => {
    return viewEng
      ? `Please enter the following information so that we can send it by non-standard mail.(Applicable in Japan)`
      : `定形外郵便でお送りいたしますので、以下の送付先情報をご入力ください。`;
  }, [viewEng]);

  const applyExecuteButtonText = useMemo(() => {
    return viewEng ? "Apply" : "応募する";
  }, [viewEng]);

  const pleaseWaitText = useMemo(() => {
    return viewEng
      ? `Thank you for your application!
      Please wait for a while for the photos to arrive.`
      : `ご応募いただきましてありがとうございます！
      写真到着までしばらくお待ち下さい。`;
  }, [viewEng]);

  const forRepeatCustomer = useMemo(() => {
    return viewEng
      ? `Please enter the following information so that we can send it by non-standard mail.`
      : `”リピートいただいた方向け”
      価値があると思っていただけましたらお気持ちいただけますと励みになります。`;
  }, [viewEng]);

  const privacyPolicy = useMemo(() => {
    return viewEng ? "Privacy Policy" : "プライバシーポリシー";
  }, [viewEng]);

  const [name, setName] = useState<string>("");
  const [zipCode, setZipCode] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setStep(THIRD);
    try {
      const submitObj: SubmitObjType = {
        name: name,
        zipCode: zipCode,
        address: address,
        email: email,
      };
      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ submitObj }),
      });

      if (response.ok) {
        const data = await response.json();
      } else {
        console.error("Failed to add row.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box mt="40px" m="0 auto" w="fit-content">
      {step === ZERO && (
        <FlexComponent>
          <TextComponent>{zeroDescription}</TextComponent>
          <Image
            src="/ポストカードサンプル.jpg"
            w="100%"
            m="20px auto"
            borderRadius="4px"
          />
          <Box w="300px" m="0 auto">
            <Button
              basic
              color="grey"
              content="grey"
              onClick={() => setStep(FIRST)}
            >
              {imageConfirmText}
            </Button>
          </Box>
        </FlexComponent>
      )}
      {step === FIRST && (
        <FlexComponent>
          <Image
            src={presentPhotoPost.photo}
            w="100%"
            m="20px auto"
            borderRadius="4px"
          />
          <Box w="300px" m="0 auto">
            <Button
              basic
              color="pink"
              content="Pink"
              onClick={() => setStep(SECOND)}
            >
              {applyButtonText}
            </Button>
          </Box>
        </FlexComponent>
      )}
      {step === SECOND && (
        <form onSubmit={handleSubmit}>
          <FlexComponent>
            <Flex flexDirection="column" gap="4px">
              <Text whiteSpace="break-spaces">{openedDescription}</Text>
              <Link href="/privacyPolicy" target="_blank">
                {privacyPolicy}
              </Link>
            </Flex>
            <Flex mb="10px" w="300px" flexDirection="column" m="0 auto">
              <Input
                icon="male"
                iconPosition="left"
                label={{ tag: false, content: viewEng ? "Name" : "お名前" }}
                labelPosition="right corner"
                size="mini"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <Input
                icon="zip"
                iconPosition="left"
                label={{
                  tag: false,
                  content: viewEng ? "Zip code" : "郵便番号",
                }}
                labelPosition="right corner"
                size="mini"
                onChange={(e) => {
                  setZipCode(e.target.value);
                }}
              />
              <Input
                icon="address book"
                iconPosition="left"
                label={{
                  tag: false,
                  content: viewEng ? "Address" : "住所",
                }}
                labelPosition="right corner"
                size="mini"
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
              <Input
                icon="mail"
                iconPosition="left"
                label={{
                  tag: false,
                  content: viewEng ? "Email" : "連絡先",
                }}
                labelPosition="right corner"
                size="mini"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Flex>
            <Box textAlign="center">
              <Button
                basic
                type="submit"
                disabled={!name || !zipCode || !address || !email}
              >
                {applyExecuteButtonText}
              </Button>
            </Box>
          </FlexComponent>
        </form>
      )}
      {step === THIRD && (
        <FlexComponent>
          <Text whiteSpace="break-spaces" textAlign="center">
            {pleaseWaitText}
          </Text>
          {/* <Text whiteSpace="break-spaces" textAlign="center">
            {forRepeatCustomer}
          </Text>
          <a href='https://qr.paypay.ne.jp/p2p01_1TdCyu27bBwFsmDW'>PayPay送金</a> */}
        </FlexComponent>
      )}
    </Box>
  );
};

export default SellPhoto;
