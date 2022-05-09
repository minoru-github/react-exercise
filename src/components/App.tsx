import { ChangeEvent, useState, FC, useCallback } from "react";
import styled from "styled-components";
import { MemoList } from "./MemoList";
import { SegmentTreeViewer } from "./SegmentTree";

export const App: FC = () => {
    const [text, setText] = useState<string>("");
    const [memos, setMemos] = useState<string[]>([]);
    const [segmNum, setSegmNum] = useState<string>("4");

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

    const onChangeSegmNum = (e: ChangeEvent<HTMLInputElement>) => setSegmNum(e.target.value); 

    return (
        <div>
            <h1>React練習</h1>
            <SP>セグメントツリーの可視化</SP>
            <SInput type="text" value={segmNum} onChange={onChangeSegmNum} />
            <SegmentTreeViewer n={Number(segmNum)} />
            
            <SP>easy memo</SP>
            <SInput type="text" value={text} onChange={onChangeText} />
            <SButton onClick={onClickAdd}>add</SButton>
            <MemoList memos={memos} onClickDelete={onClickDelete} />
        </div>
    )
};

const SButton = styled.button`
    margin-left: 16px;
`;

const SP = styled.p`
    margin-top: 48px;
    margin-left: 16px;
`

const SInput = styled.input`
    margin-left: 16px;
`
