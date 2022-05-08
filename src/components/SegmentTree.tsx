import { FC } from "react";
import styled from "styled-components";

type Props = {
    n: number;
};



export const SegmentTree: FC<Props> = props => {
    type Layer = {
        dist: number;
        elems: number[];
    };

    const { n } = props;
    const all_node = 2 * n - 1;
    var depth = 0;
    let temp_n = n;
    while (temp_n > 1){
        depth += 1;
        temp_n /= 2;
    }

    console.log(depth);
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
        console.log(layers[dist]);
    }

    return (
        <div>
            <p>セグメントツリーの可視化</p>
            <STable>
                {
                    layers.map((layer) => (
                        <tr>
                            {
                                layer.elems.map((elem) => (
                                    <STd colSpan={n / layer.elems.length}>
                                        {elem}
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
    margin: 8px;
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
