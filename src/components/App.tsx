import { ChangeEvent, useState, FC, useCallback } from "react";
import styled from "styled-components";
import { MemoList } from "./MemoList";
import { SegmentTree } from "./SegmentTree";

export const App: FC = () => {
    const [text, setText] = useState<string>("");
    const [memos, setMemos] = useState<string[]>([]);

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

    return (
        <div>
            <h1>easy memo</h1>
            <input type="text" value={text} onChange={onChangeText} />
            <SButton onClick={onClickAdd}>add</SButton>
            <MemoList memos={memos} onClickDelete={onClickDelete} />
            <SegmentTree n={4}/>
        </div>
    )
};

const SButton = styled.button`
    margin-left: 16px;
`;

