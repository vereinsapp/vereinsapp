function isNumber(number) {
    return (
        number !== null &&
        (typeof number !== "string" || number.trim() !== "") &&
        number !== "" &&
        typeof number !== "undefined" &&
        typeof number !== "boolean" &&
        !Number.isNaN(Number(number)) &&
        !Array.isArray(number) &&
        typeof number !== "object"
    );
}
