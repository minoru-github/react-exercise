import { ChangeEvent, useState, FC} from "react";
import styled from "styled-components";
import { SegmentTree } from "./SegmentTree";
//import { MemoList } from "./MemoList";
import { SegmentTreeViewer } from "./SegmentTreeViewer";

const initialDataString = "1 6 2 4 3 3 2 1";
var segm = SegmentTree.initilize(initialDataString);

export const App: FC = () => {
    const [segmArray, setSegmArray] = useState<string>(initialDataString);
    const [updateIndex, setUpdateIndex] = useState<number>(0);
    const [updateValue, setUpdateValue] = useState<number>(5);
    const [indexOfBegin, setIndexOfBegin] = useState<number>(1);
    const [indexOfEnd, setIndexOfEnd] = useState<number>(8);
    const [resultOfQuery, setResultOfQuery] = useState<number>();

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
    const onChangeUpdateIndex = (e: ChangeEvent<HTMLInputElement>) => setUpdateIndex(Number(e.target.value));
    const onChangeUpdateValue = (e: ChangeEvent<HTMLInputElement>) => setUpdateValue(Number(e.target.value));
    const onChangeIndexOfBegin = (e: ChangeEvent<HTMLInputElement>) => setIndexOfBegin(Number(e.target.value));
    const onChangeIndexOfEnd = (e: ChangeEvent<HTMLInputElement>) => setIndexOfEnd(Number(e.target.value));

    // セグ木の初期化
    const initialize = () => {
        segm = SegmentTree.initilize(segmArray);

        setCounter(counter + 1);
    }

    // セグ木の更新(set)
    const update = () => {
        if (updateIndex < 0 || segm.getAdjustedN() <= updateIndex) {
            alert("indexが範囲外");
            return;
        }

        segm.set(updateIndex, updateValue);

        setResultOfQuery(undefined);
        setCounter(counter + 1);
    }

    // セグ木のクエリ処理(query)
    const query = () => {
        if (indexOfBegin < 0 || segm.getAdjustedN() <= indexOfBegin) {
            alert("0 <= begin < end にしてください");
            return;
        }

        if (indexOfEnd < 0 || segm.getAdjustedN() < indexOfEnd) {
            alert("begin < end <= N にしてください");
            return;
        }

        if (indexOfEnd <= indexOfBegin) {
            alert("begin < end にしてください");
            return; 
        }

        const result = segm.query(indexOfBegin, indexOfEnd);
        setResultOfQuery(result);
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

                <SDivQuery>
                    <SDivUpdate>
                        <label>begin</label>
                        <br />
                        <SInputUpdate type="text" value={indexOfBegin} onChange={onChangeIndexOfBegin} />
                    </SDivUpdate>

                    <SDivUpdate>
                        <label>end</label>
                        <br />
                        <SInputUpdate type="text" value={indexOfEnd} onChange={onChangeIndexOfEnd} />
                    </SDivUpdate>
                    <br />
                    <SButton onClick={query}>Query</SButton>
                    <SLabelQueryResult>result = {resultOfQuery}</SLabelQueryResult>
                </SDivQuery>

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

const SDivQuery = styled.div`
    overflow:hidden;
    width: 500px;
    background: rgb(0,0,0,0.1);
    padding: 4px;
`

const SLabelQueryResult = styled.label`
    margin-left: 12px;
    padding-left: 12px;
    padding-right: 12px;

    text-align:center;
    background-color: #7fffd4;
`