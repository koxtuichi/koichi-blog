import React from "react";

type profileProps = {
  viewEng: boolean;
};
const Profile: React.FC<profileProps> = ({ viewEng }) => {
  return (
    <>
      {!viewEng && (
        <>
          <p>1992/9/14生まれ。</p>
          <p>
            SIGMA fpとレンズはSteinheil MunchenのCassaron 40mm
            f3.5を使っている。
          </p>
          <p>ここに上げてる写真すべて。</p>
        </>
      )}
      {viewEng && (
        <>
          <p>Born on 9/14/1992.</p>
          <p>I use SIGMA fp and a Steinheil Munchen Cassaron 40mm f3.5 lens.</p>
          <p>All the photos I&apos;m posting here.</p>
        </>
      )}
    </>
  );
};

export default Profile;
