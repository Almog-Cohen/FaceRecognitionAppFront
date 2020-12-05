import React, { useState, useEffect } from "react";
import { RANK_LAMBDA_URL } from "../Constans/Fetch";

const UserRank = ({ name, entries }) => {
  const [emojiRank, setEmojiRank] = useState("");

  // Fetching lambda function every time the user increass entries
  useEffect(() => {
    fetch(RANK_LAMBDA_URL + entries)
      .then((res) => res.json())
      .then((data) => setEmojiRank(data.input))
      .catch(console.log);
  }, [entries]);

  return (
    <div>
      <div className="white f3">
        {`${name}, your current entry count is...`}
      </div>
      <div className="white f1">{entries}</div>
      <div className="white f3">{`Rank Badge lambda: ${emojiRank}`}</div>
    </div>
  );
};

export default UserRank;
