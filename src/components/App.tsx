import { ChangeEvent, useState, FC, useCallback } from "react";
import styled from "styled-components";
//import { MemoList } from "./MemoList";
import { SegmentTreeViewer } from "./SegmentTree";

export const App: FC = () => {
    const [text, setText] = useState<string>("");
    const [memos, setMemos] = useState<string[]>([]);
    const [segmArray, setSegmArray] = useState<string>("1 6 2 4");

    const onChangeText = (e: ChangeEvent<HTMLInputElement>) => setText(e.target.value);

    const onClickAdd = () => {
        const newMemos = [...memos];
        newMemos.push(text);
        setMemos(newMemos);
        setText("");
    };

    const onClickDelete = useCallback(
        (index: number) => {
            const newMemos = [...memos];
            newMemos.splice(index, 1);
            setMemos(newMemos);
        },[memos]
    );


    const onChangeSegmArray = (e: ChangeEvent<HTMLInputElement>) => setSegmArray(e.target.value);

    return (
        <div>
            <SH1>React練習</SH1>
            <SH4>セグメントツリーの可視化</SH4>
            <SP>配列の要素を" "区切りで入力</SP>
            <SInput type="text" value={segmArray} onChange={onChangeSegmArray} />
            <SP>モード：加算</SP>
            <SegmentTreeViewer  data={segmArray.split(" ").map(Number)} />
            
            {/* <SP>easy memo</SP>
            <SInput type="text" value={text} onChange={onChangeText} />
            <SButton onClick={onClickAdd}>add</SButton>
            <MemoList memos={memos} onClickDelete={onClickDelete} /> */}
        </div>
    )
};

const SButton = styled.button`
    margin-left: 16px;
`;

const SH1 = styled.h1`
    margin-left: 16px;
    background: aliceblue;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.23);
    text-align:center;
`

const SH4 = styled.h4`
    margin-left: 32px;
    color: #364e96;/*文字色*/
    border: solid 3px #364e96;/*線色*/
    padding: 0.5em;/*文字周りの余白*/
    border-radius: 0.5em;/*角丸*/
    text-align:center;

    width: 500px;
    margin-bottom:0px;
`

const SP = styled.p`
    margin-left: 32px;
    margin-bottom:0px;
    width: 500px;
    text-align:center;
`

const SInput = styled.input`
    margin-left: 32px;
    width: 500px;
    text-align:center;
`
