import { assert } from "console";
import { FC } from "react";
import styled from "styled-components";
import { SegmentTree } from "./SegmentTree";

type Props = {
    counter: number;
    segm: SegmentTree;
}

export const SegmentTreeViewer: FC<Props> = props => {
    const { segm } = props;
    type Layer = {
        dist: number;
        elems: number[];
    };

    console.assert(segm != null, "セグ木が空");

    const adjustedN = segm.getAdjustedN();
    const depth = segm.getDepth();

    // 描画用に各レイヤーの深さごとにindex配列を用意
    var layers: Array<Layer> = new Array(depth);
    var elem_num = 1;
    var index = 0;
    for (var dist = 0; dist <= depth; dist++) {
        const elems: number[] = new Array(elem_num);
        for (var i = 0; i < elem_num; i++){
            elems[i] = index;
            index++;
        }
        layers[dist] = { dist, elems };
        elem_num *= 2;
    }

    return (
        <div>
            <STable>
                {
                    layers.map((layer) => (
                        <tr key={layer.dist}>
                            {
                                layer.elems.map((elem) => (
                                    <STd key={elem} colSpan={Number(adjustedN / layer.elems.length)}>
                                        {segm.getNodeValue(elem)}
                                    </STd>
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
