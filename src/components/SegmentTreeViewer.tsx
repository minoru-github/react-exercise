import { FC } from "react";
import styled from "styled-components";
import { SegmentTree } from "./SegmentTree";

type Props = {
    data: number[];
};

export const SegmentTreeViewer: FC<Props> = props => {
    type Layer = {
        dist: number;
        elems: number[];
    };

    const { data } = props;
    const n = data.length;

    // セグ木構築
    const segm = new SegmentTree(n);
    const adjustedN = segm.getAdjustedN();
    const depth = segm.getDepth();
    data.map((a, index) => { segm.set(index, a) });

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
        //console.log(layers[dist]);
    }

    return (
        <div>
            <STable>
                {
                    layers.map((layer) => (
                        <tr key={layer.dist}>
                            {
                                layer.elems.map((elem) => (
                                    <STd key={elem} colSpan={adjustedN / layer.elems.length}>
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
