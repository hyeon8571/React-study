const Universal = ({backgroundColor, title, content, btn, alertcontent})=>{  // 범용 다이얼로그 props 지정
    return(
        <div style={{width:200, height:100, border:'1px solid black', backgroundColor, margin:1, textAlign:'center'}}>
            <div>
                {title}
            </div>
            <div>
                {content}
                <br/>
                <button onClick={()=>{alert(JSON.stringify(alertcontent))}}>{btn}</button> {/*버튼 클릭시 alert로 메세지를 보여준다*/}
            </div>
        </div>
    )
}

const Specialization = ()=>{
    const color = ['yellow','green','red','blue'] // 다이얼로그에 사용할 색깔들 설정
    const titles = ['경고 다이얼로그','인사 다이얼로그','오류 다이얼로그','공지사항 다이얼로그'] // 다이얼로그 이름 지정
    const btn = ['경고','인사','오류','공지사항'] 
    const message = ['!!!','안녕하세요','오류 발견','과제 제출은 10월 30일까지 입니다.'] // 버튼 클릭시 나올 메세지 지정
    return(
        <div style={{background:'lightgray'}}> 
            <p style={{textAlign:'center'}}>범용 다이얼로그</p>
        <div style={{display:'flex', padding:20, justifyContent:'center'}}> {/*다이얼로그들을 화면 중간에 배치*/}
            
            {
                titles.map((title,index)=>{ // map을 이용하여 다이얼로그들을 배치
                    return <Universal key={index}
                    backgroundColor={color[index]}
                    title={title}
                    btn={btn[index]}
                    message={message[index]}
                    />
                })
            }

        </div>
        </div>
    )
}

export default Specialization