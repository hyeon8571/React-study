import React, {useState, useEffect} from "react";
import './User.css';

const serverURL = "http://localhost:65020/users"; // 웹서버 접속주소

function User() {
    const [userData, setUserData] = useState(null); // 서버에서 받아올 사용자정보(객체배열)를 저장하는 곳
    const [userCheck, setUserCheck] = useState(null);

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

    const onCheckHandler = (event) => { // 조회 버튼을 클릭했을 시 발동
        event.preventDefault();
        setUserCheck(0); // userCheck를 0(false)으로 설정
        const id = event.target.id.value;
        const passwd = event.target.passwd.value;

        userData.map((data, i) => {
            if ((id == data.id) && (passwd == data.passwd)) { // 아이디와 비밀번호가 일치하면 userCheck +1(true)
                 setUserCheck((userCheck) => userCheck + 1);
                
                
            } else { // 다르면 아무런 처리도 안함
                
            }
        }
        
        )
       
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
            <div>
                <h3>회원확인</h3>
                <form onSubmit={onCheckHandler}>
                    <input type="text" name="id" placeholder="아이디" />
                    <input type="text" name="passwd" placeholder="암호" />
                    <button type="submit">조회</button>
                </form>
                {
                (userCheck == null) ? (<p></p>) : // 조회 버튼을 안누르면 아무것도 보여주지 않는다.
                (userCheck == true) ? ( // 조회 버튼을 눌렀을 때 userCheck가 true(1)이면 회원으로 확인되었습니다 출력
                    <p id="check">회원으로 확인되었습니다</p>
                    ) : (
                        <p id="check">그런 회원은 없습니다</p> // false(0)이면 그런회원은 없습니다 출력
                    )
                }   
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

export default User;







