import { ChangeEvent, useState, FC, useCallback } from "react";
import styled from "styled-components";
import { MemoList } from "./MemoList";
import { SegmentTree } from "./SegmentTree";

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
            <h1>easy memo</h1>
            <input type="text" value={text} onChange={onChangeText} />
            <SButton onClick={onClickAdd}>add</SButton>
            <MemoList memos={memos} onClickDelete={onClickDelete} />
            <input type="text" value={segmNum} onChange={onChangeSegmNum} />
            <SegmentTree n={Number(segmNum)}/>
        </div>
    )
};

const SButton = styled.button`
    margin-left: 16px;
`;

