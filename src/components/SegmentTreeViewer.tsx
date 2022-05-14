import { assert } from "console";
import { FC } from "react";
import styled from "styled-components";
import { SegmentTree } from "./SegmentTree";

type CellAttribute = {
    key: number;
    colSpan: number;
    value: number;
    isHighlighted:boolean;
}

const DrawCell: FC<CellAttribute> = props => {
    const { key, colSpan, value, isHighlighted } = props;

    if (isHighlighted) {
        return (
            <STdHasSet key={key} colSpan={colSpan}>
                {value}
            </STdHasSet>
        )
    } else {
        return (
            <STd key={key} colSpan={colSpan}>
                {value}
            </STd>
        )
    }
}

type Props = {
    counter: number;
    segm: SegmentTree;
}

export const SegmentTreeViewer: FC<Props> = props => {
    const { segm } = props;

    type NodeIndex = {
        nodeIndex: number;
        hasUpdated: boolean;
    }

    type Layer = {
        dist: number;
        nodeIndexes: NodeIndex[];
    }

    console.assert(segm != null, "セグ木が空");

    const adjustedN = segm.getAdjustedN();
    const depth = segm.getDepth();
    const updatedNodeIndexes = segm.getUpdatedNodeIndexes();

    // 描画用に各レイヤーの深さごとにindex配列を用意
    var layers: Array<Layer> = new Array(depth);
    var elem_num = 1;
    var nodeIndex = 0;
    for (var dist = 0; dist <= depth; dist++) {
        const nodeIndexes: NodeIndex[] = new Array(elem_num);
        for (var i = 0; i < elem_num; i++){
            const hasUpdated = updatedNodeIndexes.has(nodeIndex);
            nodeIndexes[i] = { nodeIndex, hasUpdated};

            nodeIndex++;
        }
        layers[dist] = { dist, nodeIndexes };
        elem_num *= 2;
    }

    return (
        <div>
            <STable>
                {
                    layers.map((layer) => (
                        <tr key={layer.dist}>
                            {
                                layer.nodeIndexes.map((elem) => (
                                    <DrawCell key={elem.nodeIndex} colSpan={Number(adjustedN / layer.nodeIndexes.length)} value={segm.getNodeValue(elem.nodeIndex)}  isHighlighted={elem.hasUpdated} />
                                )) 
                            }
                        </tr>
                    ))
                }
            </STable>
        </div>
    )
}

const STable = styled.table`
    margin-top: 4px;
    padding:2px;
    width:512px;
    border: solid 1px;
    background-color: #ff9723;
`

const STd = styled.td`
    border: solid 1px;
    text-align: center;
    background-color: #ffffff;
`
const STdHasSet = styled.td`
    border: solid 1px;
    text-align: center;
    background-color: #7fffd4;
`
