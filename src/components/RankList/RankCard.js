import React from "react";
import "./RankCard.css";

const RankCard = ({ name, entries, rank }) => {
  return (
    <div className="tc bg-light-green dib br3 pa3 ma2 grow bw2 shadow-5 mb2 card-design ">
      {/* <img alt='robots' src={`https://robohash.org/${id}?200x200`} /> */}
      <div className="" style={{ margin: "auto" }}>
        <h6>Rank: {rank}</h6>
        <h6>{name}</h6>
        <h7>Contribute: {entries}</h7>
      </div>
    </div>
  );
};

export default RankCard;
