import React from "react";

type profileProps = {
  viewEng: boolean;
};
const Profile: React.FC<profileProps> = ({ viewEng }) => {
  return (
    <>
      {!viewEng && <p>1992/9/14生まれ。</p>}
      {viewEng && <p>Born on 9/14/1992.</p>}
    </>
  );
};

export default Profile;
