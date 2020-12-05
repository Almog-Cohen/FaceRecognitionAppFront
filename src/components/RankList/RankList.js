import React, { useState, useEffect } from "react";
import RankCard from "./RankCard";
import "../Profile/Profile.css";
import "./RankCard.css";
import { RANK_LIST_URL } from "../Constans/Fetch";

const RankList = ({ toggleModleRankList }) => {

  const [rankList, setRankList] = useState([]);
  const [refresh, setRefresh] = useState(true)

  // Fetching RankList from the db
  useEffect(() => {
    fetch(RANK_LIST_URL, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: window.sessionStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setRankList(data);
      })
      .catch(console.log);
  }, [refresh]);




  return (
    <div className="profile-modal">
      <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw7 shadow-5 center bg-white">
        <main className="pa4 black-80 w-80">
          <img
            src="http://tachyons.io/img/logo.jpg"
            className="h3 w3 dib"
            alt="avatar"
          />
          <h3 className='pa4'>Ranking List</h3>
          <hr />
          {/* I WANT CENTER THIS */}
          <div>
            {rankList.map((userRank, i) => {
              return (
                <div key={i}>
                  <RankCard
                    rank={i + 1}
                    name={userRank.name}
                    entries={userRank.entries}
                  />
                </div>
              );
            })}
          </div>
          <div
            className="mt4"
            style={{ display: "flex", justifyContent: "space-evenly" }}
          >
            <button
              className="b pa2 grow pointer hover-white w-40 bg-light-red b--black-20"
              onClick={() => setRefresh(!refresh)}
            >
              Refresh
            </button>
          </div>
        </main>
        <div className="modal-close pa3 " onClick={toggleModleRankList}>
          &times;
        </div>
      </article>
    </div>
  );
};

export default RankList;
