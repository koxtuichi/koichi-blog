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
          <p>レンズはSteinheil MunchenのCassaron 40mm f3.5を使用。</p>
          <p>ここに上げてる写真すべて...</p>
          <p>と思ってたんだけどね、</p>
          <p>DP1 Merrillも買っちゃったからあげてく。</p>
        </>
      )}
      {viewEng && (
        <>
          <p>Born on 9/14/1992.</p>
          <p>The lens is a Steinheil Munchen Cassaron 40mm f/3.5.</p>
          <p>All the photos I&apos;m posting here.</p>
          <p>But then I changed course.</p>
          <p>I also bought a DP1 Merrill, so I'll give it to you.</p>
        </>
      )}
    </>
  );
};

export default Profile;
