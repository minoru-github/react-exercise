import { FC } from "react";
import styled from "styled-components";

type Props = {
    n: number;
};

class SegmentTree {
    private adjustedN: number;
    private depth: number;
    private queryEnd: number;
    private data: number[];
    
    constructor(n: number) {
        var adjustedN = 1;
        var depth = 0;
        // 最下層を2のべき乗にする
        while (n > adjustedN) {
            adjustedN *= 2;
            depth += 1;
        }
        this.adjustedN = adjustedN;
        this.depth = depth;
        this.queryEnd = n;
        this.data = new Array(2 * adjustedN);
        
        for (var i = 0; i < this.data.length; i++) {
            this.data[i] = this.e();
        }
    }

    // TODO interface化？ストラテジーパターン？
    private op(child1:number, child2:number) : number {
        return child1 + child2;
    }

    // TODO interface化？ストラテジーパターン？
    private e(): number {
        return 0;
    }

    public set(idx: number, a: number) {
        var nodeIdx = idx + this.adjustedN - 1;
        this.data[nodeIdx] = a;

        while (nodeIdx > 0) {
            nodeIdx = (nodeIdx - 1) / 2;
            const child1 = this.data[2 * nodeIdx + 1];
            const child2 = this.data[2 * nodeIdx + 2];
            
            this.data[nodeIdx] = this.op(child1, child2);
        }
    }

    public get(idx: number): number {
        console.assert(0 <= idx && idx < this.queryEnd, "out of range");
        const node_idx = idx + this.adjustedN - 1;
        return this.data[node_idx];
    }

    public query(left: number, right: number): number {
        console.assert(left < this.queryEnd);
        console.assert(right < this.queryEnd);
        console.assert(left < right);
        return this.subQuery(left,right,0,0,this.adjustedN);
    }

    private subQuery(
        left: number,
        right: number,
        nodeIdx: number,
        segBegin: number,
        segEnd: number,
    ) : number {
        if (segEnd <= left || right <= segBegin) {
            return this.e();
        } else if (left <= segBegin && segEnd <= right) {
            return this.data[nodeIdx];
        } else {
            const childIdx1 = 2 * nodeIdx + 1;
            const childIdx2 = 2 * nodeIdx + 2;
            const mid = (segBegin + segEnd) / 2;
            const child1 = this.subQuery(left, right, childIdx1, segBegin, mid);
            const child2 = this.subQuery(left, right, childIdx2, mid, segEnd);
            return this.op(child1, child2);
        }
    }

    public getAdjustedN() : number {
        return this.adjustedN;
    }

    public getDepth(): number {
        return this.depth;
    }
}

export const SegmentTreeViewer: FC<Props> = props => {
    type Layer = {
        dist: number;
        elems: number[];
    };

    const { n } = props;
    var segm = new SegmentTree(n);
    const adjustedN = segm.getAdjustedN();
    const depth = segm.getDepth();

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
            <STable>
                {
                    layers.map((layer) => (
                        <tr key={layer.dist}>
                            {
                                layer.elems.map((elem) => (
                                    <STd key={elem} colSpan={adjustedN / layer.elems.length}>
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
