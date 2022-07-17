export const calcExpectedMinAmount = (
    output: number | string,
    slippage: number | string,
) => {
    if (typeof output === "string") {
        output = Number(output);
    }
    if (typeof slippage === "string") {
        slippage = Number(slippage);
    }

    const minExpected = output - (slippage / 100) * output;

    if (minExpected < 0) return 0;

    return minExpected;
};
