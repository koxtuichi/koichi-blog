import React from "react";

type profileProps = {
  viewEng: boolean;
};
const Profile: React.FC<profileProps> = ({ viewEng }) => {
  return (
    <>
      {!viewEng && (
        <>
          <p>
            1992/9/14生まれ。数年前からカメラは買ってきたが、すぐに飽きてしまい売却してしまうことを数回繰り返す。そのときに手放したカメラはdp2,
            dp2x, dp2s, dp2quattro,
            dp0quattroのSIGMAたち。またfoveon使いたいなとも思うけど、とりあえず今は使いやすいSIGMA
            fpを使用中。
          </p>
          <p>
            レンズはSteinheil MunchenのCassaron 40mm
            f3.5。flickrでそのときメインで使っていた GXR
            を検索していたところ、このレンズを使用していた写真があって気に入り、
            #cassaron
            でflickrを検索して画像を見漁った結果、即購入。つい最近、二代目を購入した。
          </p>
          <p>
            そのため、カメラはSIGMA
            fpとcassaron40mmのみ使用してる。ここに上げてる写真すべて。
          </p>
        </>
      )}
      {viewEng && (
        <>
          <p>
            Born on 9/14/1992. I have been buying cameras for a few years, but I
            have repeated several times that I get bored quickly and sell them.
            The cameras I gave away at that time were dp2, dp2x, dp2s,
            dp2quattro, dp0quattro SIGMAs. I would like to use foveon again, but
            for now I am using SIGMA fp which is easy to use.
          </p>
          <p>
            I was searching on flickr for the GXR I was using as my main lens at
            the time, and I saw a picture of me using this lens, which I liked,
            so I searched #cassaron on flickr and looked through the images and
            bought it immediately. Just recently, I bought a second generation.
          </p>
          <p>
            That&apos;s why I use only SIGMA fp and cassaron 40mm camera. All
            the photos I put up here.
          </p>
        </>
      )}
    </>
  );
};

export default Profile;
