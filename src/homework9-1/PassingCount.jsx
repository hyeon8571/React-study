import React,{useState} from 'react';
import './PassingCount.css';

const FirstChild=(props)=>{ // 가장 왼쪽 컴포넌트
    console.log(`자식1 ${props.data}`) 
    return(
        <div className='first'>
            <p>자식1 컴포넌트</p>
            <p> (카운터: {props.data})</p>
        </div>
    )
}
const SecondChild=(props)=>{ // 중간 컴포넌트
    const onLeftClick=()=>props.setLeft((prevData)=>parseInt(prevData)+1) // 왼쪽 컴포넌트의 data를 1 증가시킨다
    const onRightClick=()=>props.setRight((prevData)=>parseInt(prevData)+1) // 오른쪽 컴포넌트의 data를 1 증가시킨다

    console.log('자식2 (버튼)')
    return(
        <div className='second'>
            <p>자식2 컴포넌트</p>
            <button onClick={onLeftClick}>◀ 카운터++</button>
            <button onClick={props.resetData}>카운터 0</button>
            <button onClick={onRightClick}>카운터++ ▶</button>
        </div>
    )
}

const ThirdChild = (props)=>{ // 가장 오른쪽 컴포넌트
    console.log(`자식3 ${props.data}`)
    return(
        <div className='third'>
            <p>자식3 컴포넌트</p>
            <p>(카운터: {props.data})</p>
        </div>
    )
}

function PassingCount(){
    const [leftCount,setLeftCount] = useState(0) // 왼쪽 카운터 값을 useState이용
    const [rightCount,setRightCount] = useState(0) // 오른쪽 카운터 값을 useState이용
    const resetData = ()=>{setLeftCount(0);setRightCount(0)} // 왼쪽, 오른쪽 카운터를 0으로 만든다

    return(
        <div className='parent'>
            부모컴포넌트
            <br/>
            (왼쪽카운트:{leftCount}, 오른쪽:{rightCount})
            <div className='layout'>
                <FirstChild data={leftCount}/>
                <SecondChild setLeft={setLeftCount}
                setRight={setRightCount}
                resetData={resetData}/>
                <ThirdChild data={rightCount}/>
            </div>
        </div>
    )
}
export default PassingCount;