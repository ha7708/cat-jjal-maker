//import logo from './logo.svg';
import React from "react";
//import './App.css';
import 'App.css';
import Title from "./components/Title"
import Form from "./components/Form"
import MainCard from "./components/MainCard"

const jsonLocalStorage = {
  setItem: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  getItem: (key) => {
    return JSON.parse(localStorage.getItem(key));
  },
};


const fetchCat = async (text) => {
  const OPEN_API_DOMAIN = "https://cataas.com";
  const response = await fetch(
      `${OPEN_API_DOMAIN}/cat/says/${text}?json=true`
  );
  const responseJson = await response.json();
  return `${OPEN_API_DOMAIN}/${responseJson.url}`;
};


function CatItem(props){ // 컴포넌트 만들기. favorites에서 인자를 받아옴.
  return (
    < li >
      <img src={props.img} style={{width: "150px"}} />
    </li> 
  );
}

function Favorites({favorites}){
  if (favorites.length === 0){ // 조건부 렌더링
      return <div> 사진 위 하트를 눌러 고양이 사진을 저장해봐요! </div>
  }

  return(
      <ul className="favorites">
      {favorites.map((cat) => (
          <CatItem img={cat} key={cat}/> // 실무에서는 id값이 따로 있는 데이터가 주인데, 이때는 id를 씀. 여긴 링크만 있으므로 링크를 id로
      ))}
      </ul>
  );
}





// 최상위 태그는 하나여야 하므로, 태그로 묶어줌
const App = () => {
  const CAT1 = "https://cataas.com/cat/60b73094e04e18001194a309/says/react";
  const CAT2 = "https://cataas.com//cat/5e9970351b7a400011744233/says/inflearn";
  const CAT3 = "https://cataas.com/cat/595f280b557291a9750ebf65/says/JavaScript";
  

  const [counter, setCounter] = React.useState(() =>{
    return jsonLocalStorage.getItem("counter");
  })

  const [mainCat, setMainCat] = React.useState(CAT1);

  const [favorites, setFavorites] = React.useState(() => {
    return jsonLocalStorage.getItem("favorites")||[];
  })

  // includes API: favorites배열에서 mainCat이 있을 경우 true
  const alreadyFavorite = favorites.includes(mainCat);



  async function setInitialCat(){
    const newCat = await fetchCat('First cat');
    console.log(newCat);
    setMainCat(newCat);
  }

  React.useEffect(() => {
    setInitialCat();
  }, []);


  async function updateMainCat(value){  // async : await 상위 함수가 async 여야.
    const newCat = await fetchCat(value); 

    setMainCat(newCat); //[0]인 mainCat을 조작하기 위해 [1]인 setMainCat에 넘겨줌
    
    setCounter((prev) => { // prev: 기존 값
      const nextCounter = prev + 1;
      //Number(localStorage.setItem('counter', nextCounter));
      jsonLocalStorage.setItem("counter", nextCounter);
      return nextCounter;
    });
  }

  function handleHeartClick(){
    const nextFavorites = [...favorites, mainCat];
    setFavorites(nextFavorites);
    jsonLocalStorage.setItem("favorites", nextFavorites);
  }

  const counterTitle = 
    counter === null ? "" : counter + "번째 ";

  return(

    <div> 

      <Title>{counterTitle} 고양이 가라사대</Title>
      <Form updateMainCat={updateMainCat} />
      <MainCard img={mainCat} 
        onHeartClick={handleHeartClick} 
        alreadyFavorite={alreadyFavorite}
      />
      <Favorites favorites={favorites}/>

    </div>

  );
};


export default App;
