import { ChangeEvent, useState, FC} from "react";
import styled from "styled-components";
import { SegmentTree } from "./SegmentTree";
//import { MemoList } from "./MemoList";
import { SegmentTreeViewer } from "./SegmentTreeViewer";

// TODO: この辺のグローバル変数を直で書いてるのが気持ち悪い・・・どっかに分離したい。
const initialDataString = "1 6 2 4";
const initialData = initialDataString.split(" ").map(Number);
var segm = new SegmentTree(initialData.length);
initialData.map((value, index) => segm.set(index, value));

export const App: FC = () => {
    const [updateIndex, setUpdateIndex] = useState<string>("0");
    const [updateValue, setUpdateValue] = useState<string>("5");
    const [segmArray, setSegmArray] = useState<string>("1 6 2 4");
    // SegmentTreeViewerの再レンダリング対象としてSegmentTreeクラスをuseStateの対象にしても
    // オブジェクトそのものの変更は検知するが、プライベート変数の変更は検知してくれないので
    // 暫定？でcounterで変更を検知させる
    const [counter, setCounter] = useState<number>(0);

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

    // セグ木の初期化
    const initialize = () => {
        const data = segmArray.split(" ").map(Number);
        segm = new SegmentTree(data.length);
        data.forEach((value, index) => segm.set(index, value));

        setCounter(counter + 1);
    }

    // セグ木の更新(set)
    const update = () => {
        // TODO: indexの範囲外アクセスの検知assert仕込み
        const index = Number(updateIndex);
        const value = Number(updateValue);
        segm.set(index, value);

        setCounter(counter + 1);
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
                    <SDivUpdate>
                        <label>index</label>
                        <br />
                        <SInputUpdate type="text" value={updateIndex} onChange={onChangeUpdateIndex} />
                    </SDivUpdate>

                    <SDivUpdate>
                        <label>value</label>
                        <br />
                        <SInputUpdate type="text" value={updateValue} onChange={onChangeUpdateValue} />
                    </SDivUpdate>
                    <br />
                    <SButton onClick={update}>Update</SButton>
                </SDivSet>
                <SP>モード：加算</SP>
                <SegmentTreeViewer counter={counter} segm={segm} />
            </SSegmViewer>
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

const SDivUpdate = styled.div`
    float:left;
`

const SInputUpdate = styled.input`
    margin-right: 4px;
    width: 100px;
    text-align:center;
`