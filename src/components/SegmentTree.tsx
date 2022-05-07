import { FC } from "react";
import styled from "styled-components";

type Props = {
    n: number;
};

export const SegmentTree: FC<Props> = props => {
    const { n } = props;
    const all_node = 2 * n - 1;
    var depth = 0;
    let temp_n = n;
    while (temp_n > 1){
        depth += 1;
        temp_n /= 2;
    }

    return (
        <div>
            <p>セグメントツリーの可視化</p>
            <STable>
                <tr>
                    <STd colSpan={n}>
                        1
                    </STd>
                </tr>
                <tr>
                    <STd colSpan={n / 2}>2</STd>
                    <STd colSpan={n / 2}>3</STd>
                </tr>
                <tr>
                    <STd colSpan={n / 4}>4</STd>
                    <STd colSpan={n / 4}>5</STd>
                    <STd colSpan={n / 4}>6</STd>
                    <STd colSpan={n / 4}>7</STd>
                </tr>
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
