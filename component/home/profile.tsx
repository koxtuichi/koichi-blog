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
            Steinheil MunchenのCassaron 40mm f3.5を使用。
          </p>
          <p>ここに上げてる写真すべて。</p>
          {/* <p>また一番気になる写真を選んでみてください。</p>
          <p>AIによる占いが見れます。</p> */}
        </>
      )}
      {viewEng && (
        <>
          <p>Born on 9/14/1992.</p>
          <p>A Steinheil Munchen Cassaron 40mm f3.5 lens.</p>
          <p>All the photos I&apos;m posting here.</p>
          {/* <p>And please choose the photo you are most interested in.</p>
          <p>You can see the fortune-telling by AI.</p> */}
        </>
      )}
    </>
  );
};

export default Profile;
