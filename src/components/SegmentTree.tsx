export class SegmentTree {
    private adjustedN: number;
    private depth: number;
    private queryEnd: number;
    private data: number[];
    private updatedNodeIndexes: Set<number>;  // Viewer用
    
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

        // Viewer用
        this.updatedNodeIndexes = new Set<number>();
        this.updatedNodeIndexes.clear();
    }

    // TODO interface化？ストラテジーパターン？
    private op(child1:number, child2:number) : number {
        return child1 + child2;
    }

    // TODO interface化？ストラテジーパターン？
    private e(): number {
        return 0;
    }

    public set(index: number, value: number) {
        
        console.assert(0 <= index && index < this.queryEnd, "out of range");
        var nodeIdx = index + this.adjustedN - 1;
        this.data[nodeIdx] = value;

        // Viewer用
        this.updatedNodeIndexes.clear();
        this.updatedNodeIndexes.add(nodeIdx);

        while (nodeIdx > 0) {
            nodeIdx = (nodeIdx - 1) / 2;
            nodeIdx = Math.floor(nodeIdx);
            const childIdx1 = 2 * nodeIdx + 1;
            const childIdx2 = 2 * nodeIdx + 2;

            const child1 = this.data[childIdx1];
            const child2 = this.data[childIdx2];
            
            this.data[nodeIdx] = this.op(child1, child2);

            // Viewer用
            this.updatedNodeIndexes.add(nodeIdx);
        }
    }

    // 元の配列(最下層レイヤー)の値を取得
    public get(index: number): number {
        console.assert(0 <= index && index < this.queryEnd, "out of range");
        const node_idx = index + this.adjustedN - 1;
        return this.data[node_idx];
    }

    // セグ木内のノードの値を取得
    public getNodeValue(nodeIdx: number): number{
        return this.data[nodeIdx];        
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
            const mid_float = (segBegin + segEnd) / 2;
            const mid = Math.floor(mid_float);
            const child1 = this.subQuery(left, right, childIdx1, segBegin, mid);
            const child2 = this.subQuery(left, right, childIdx2, mid, segEnd);
            return this.op(child1, child2);
        }
    }

    // Viewer用
    public getAdjustedN() : number {
        return this.adjustedN;
    }

    // Viewer用
    public getDepth(): number {
        return this.depth;
    }

    // Viewer用
    public getUpdatedNodeIndexes() {
        return this.updatedNodeIndexes;
    }

    // Viewer用
    public clearUpdatedNodeIndexes() {
        this.updatedNodeIndexes.clear();
    }
}
