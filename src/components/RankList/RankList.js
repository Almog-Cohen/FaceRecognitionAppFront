import React,{useState,useEffect} from "react";
import RankCard from "./RankCard";
import "../Profile/Profile.css";
import "./RankCard.css"


const robots = [{name: 'mog'}, {name: 'mogo'}, {name: 'mogiz'},{name: 'java'}]



 
const RankList = ({toggleModleRankList}) => {

    const [rankList,setRankList] = useState([])
    
   useEffect(() => {
    fetch(`http://localhost:3001/rank-list`, {
        method: "get",
        headers: {
             "Content-Type": "application/json",
             'Authorization': window.sessionStorage.getItem('token')
           }
      })
        .then((res) => res.json())
        .then(data => {
            console.log(data)
            setRankList(data)
           
        })
        .catch(console.log);
   },[])


//    useEffect(() => {
//     const fetchData = async () => {
//       try {
//        const result = await fetch(`http://localhost:3001/rank-list`,);
//        const body = await result.json();
//        setData(body);
//       } catch(err) {
//         // error handling code
//       } 
//     }
  
//     // call the async fetchData function
//     fetchData()
  
//   }, [])
console.log('RANK LIST DATA :  '+ rankList);;
    
  return (

    
    <div className="profile-modal">
      <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw7 shadow-5 center bg-white">
        <main className="pa4 black-80 w-80">
          <img
            src="http://tachyons.io/img/logo.jpg"
            className="h3 w3 dib"
            alt="avatar"
          />

          <hr />

         {/* I WANT CENTER THIS */}
        <div>

          {rankList.map((userRank,i) => {
            return (
              <div key={i}>
                <RankCard
                 rank={i+1}
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
            <button className="b pa2 grow pointer hover-white w-40 bg-light-red b--black-20"
            onClick={toggleModleRankList}>
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

{
  /* <div className="profile-modal"
style={{ display: "flex", justifyContent: "left" }}
>

{
    robots.map((user) => {
        return (
            <div key={user.name}>
            <RankCard 
                
                name={user.name}
                email={user.email}
            />
             </div>
        );
    })
} */
}
