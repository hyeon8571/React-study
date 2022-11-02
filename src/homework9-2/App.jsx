import React, {useState, useEffect} from "react";
import './App.css';

const serverURL = "http://localhost:65010/users"; // 웹서버 접속주소

function App() {
    const [userData, setUserData] = useState(null); // 서버에서 받아올 사용자정보(객체배열)를 저장하는 곳

    const getUserData = () => {
        fetch(serverURL) // fetch 함수를 이용해 REST API로 회원목록을 요청
        .then((res) => res.json()) // 회원목록을 json포맷으로 수신
        .then((data) => setUserData(data)) // 받은 데이터를 setState 함수로 업데이트 함
        .then(console.log(userData)) // 콘솔창에 출력해서 확인함
    }

    useEffect(getUserData, []); // mount시에만 서버데이터를 가져오도록 이팩트처리
    const onSubmitHandler = (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const id = event.target.id.value;
        const passwd = event.target.passwd.value;
        console.log("btn 클릭");
        fetch(serverURL, { // fetch함수로 데이터를 서버로 전송
            method: "POST", // POST method
            headers: {
                'Content-Type' : 'application/json',

            },
            body : JSON.stringify({name, id, passwd}), // 등록한 데이터를 다시 가져옴

        }).then(getUserData())
        
    }

    return(
        <>
            <div>
                <h2>회원등록</h2>
                <form onSubmit={onSubmitHandler}>
                    <input type="text" name="name" placeholder="이름" />
                    <input type="text" name="id" placeholder="아이디" />
                    <input type="text" name="passwd" placeholder="암호" />
                    <button type="submit">등록</button>
                </form>
            </div>
            <p></p>
            <div>
                <h2>회원 목록</h2>
                <ol>
                    {(userData === null) ? ( // 데이터가 수신되었는지를 확인
                    <p>서버에서 데이터를 가져오는중</p>
                    ) : (
                        userData.map((user, i) => ( // 수신되었다면 목록으로 처리
                        <li key={user.keyid}> {user.name} {user.id} {user.passwd}</li>
                    ))
                    )}
                </ol>
            </div>
        </>
    )
}

export default App;







