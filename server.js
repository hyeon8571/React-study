const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

// express 환경설정
app.use(express.json());
app.use(express.static(path.join(__dirname, '/build')));
app.use(bodyParser.urlencoded({ extended: false }));

var keyid = 3; // 다음에 추가될 회원에게 부여할 key값
var userList = [ // 객체배열(회원명단) 초기값 설정
    {keyid: 1, name: "홍길동", id: "kdhong", passwd: "1111"},
    {keyid: 2, name: "박길동", id: "kdpark", passwd: "1111"},
];

const mainPage = (req, res) => {
    res.sendFile(path.join(__dirname, '/build/index.html'));
}

const listUsers = (req, res) => {
    console.log("회원명단 조회요청을 받았으며, 리액트에게 명단을 보냅니다")
    res.json(userList);
}

const addUser = (req, res) => {
    const {name, id, passwd} = req.body;
    userList.push({keyid: keyid++, name, id, passwd});
    console.log("회원등록요청을 완료하였으며, 이를 반영한 전체목록입니다.");
    userList.map((user, i) => {
        console.log(user.keyid + "." + user.name + "." + user.id + "." + user.passwd);
    })
    return res.send('sucess');
}

app.get("/", mainPage); // 기본페이지 get요청
app.get("/users", listUsers); // /users get 요청
app.post("/users", addUser); // /users post 요청

app.listen(65010, () => {
    console.log("---------------------");
    console.log("(리액트 연동용) 웹서버 실행중 ... ");
    console.log("접속주소: http://localhost:65010/");
    console.log("---------------------");
})