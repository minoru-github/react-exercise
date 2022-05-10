import { ChangeEvent, useState, FC, useCallback } from "react";
import styled from "styled-components";
//import { MemoList } from "./MemoList";
import { SegmentTreeViewer } from "./SegmentTreeViewer";

export const App: FC = () => {
    // const [text, setText] = useState<string>("");
    // const [memos, setMemos] = useState<string[]>([]);
    const [updateIndex, setUpdateIndex] = useState<string>("0");
    const [updateValue, setUpdateValue] = useState<string>("0");
    const [segmArray, setSegmArray] = useState<string>("1 6 2 4");
    var [data, setData] = useState<number[]>([]);

    //const onChangeText = (e: ChangeEvent<HTMLInputElement>) => setText(e.target.value);

    // const onClickAdd = () => {
    //     const newMemos = [...memos];
    //     newMemos.push(text);
    //     setMemos(newMemos);
    //     setText("");
    // };

    // const onClickDelete = useCallback(
    //     (index: number) => {
    //         const newMemos = [...memos];
    //         newMemos.splice(index, 1);
    //         setMemos(newMemos);
    //     },[memos]
    // );

    const onChangeSegmArray = (e: ChangeEvent<HTMLInputElement>) => setSegmArray(e.target.value);
    const onChangeUpdateIndex = (e: ChangeEvent<HTMLInputElement>) => setUpdateIndex(e.target.value);
    const onChangeUpdateValue = (e: ChangeEvent<HTMLInputElement>) => setUpdateValue(e.target.value);
    const update = () => {
        data = segmArray.split(" ").map(Number);
        data[Number(updateIndex)] = Number(updateValue);
        setData(data);
    }
    const initialize = () => {
        data = segmArray.split(" ").map(Number);
        setData(data);
    }

    return (
        <div>
            <SH1>React練習</SH1>
            <SSegmViewer>
                <SH4>セグメントツリーの可視化</SH4>
                <SP>配列の要素を" "区切りで入力</SP>
                <SInputArray type="text" value={segmArray} onChange={onChangeSegmArray} />
                <br />
                <SButton onClick={initialize}>Initilize</SButton>
                <SDivSet>
                    <SDivIndex>
                        <label>index</label>
                        <br />
                        <SInputIndex type="text" value={updateIndex} onChange={onChangeUpdateIndex} />
                    </SDivIndex>

                    <SDivValue>
                        <label>value</label>
                        <br />
                        <SInputIndex type="text" value={updateValue} onChange={onChangeUpdateValue} />

                    </SDivValue>
                    <br />
                    <SButton onClick={update}>Update</SButton>
                </SDivSet>

                <SP>モード：加算</SP>
                <SegmentTreeViewer data={data} />
            </SSegmViewer>
            
            {/* <SP>easy memo</SP>
            <SInput type="text" value={text} onChange={onChangeText} />
            <SButton onClick={onClickAdd}>add</SButton>
            <MemoList memos={memos} onClickDelete={onClickDelete} /> */}
        </div>
    )
};

const SButton = styled.button`
    margin-left: 4px;
`;

const SH1 = styled.h1`
    margin-left: 16px;
    background: aliceblue;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.23);
    text-align:center;
`

const SSegmViewer = styled.div`
    margin-left: 32px;
`

const SH4 = styled.h4`
    color: #364e96;/*文字色*/
    border: solid 3px #364e96;/*線色*/
    padding: 0.5em;/*文字周りの余白*/
    border-radius: 0.5em;/*角丸*/
    text-align:center;

    width: 488px;
    margin-bottom:0px;
`

const SP = styled.p`
    margin-bottom:0px;
    width: 500px;
    text-align:center;
`

const SInputArray = styled.input`
    width: 500px;
    text-align:center;
    margin-bottom:4px;
`

const SDivSet = styled.div`
    overflow:hidden;
    width: 500px;
    background: rgb(0,0,0,0.1);
    padding: 4px;
`

const SDivIndex = styled.div`
    float:left;
`
const SDivValue = styled.div`
    float:left;
`

const SInputIndex = styled.input`
    margin-right: 4px;
    width: 100px;
    text-align:center;
`

