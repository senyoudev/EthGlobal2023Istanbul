import { BigNumberish, Contract } from "ethers";

export function convertCallData(calldata : any) {
    console.log(calldata);
    console.log(calldata
        .replace(/["[\]\s]/g, "")
        .split(","))
    const argv = calldata
        .replace(/["[\]\s]/g, "")
        .split(",")
        .map((x:any) => BigInt(x).toString());
    console.log(argv)

    const a = [argv[0], argv[1]] as [any, any];
    const b = [
        [argv[2], argv[3]],
        [argv[4], argv[5]],
    ] as [
            [any, any],
            [any, any]
        ];
    const c = [argv[6], argv[7]] as [any, any];
    const input = [argv[8], argv[9]] as [any, any];

    return { a, b, c, input };
}
