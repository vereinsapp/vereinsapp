// eigene Sammlung
function isNumber(number) {
    return (
        number !== null &&
        (typeof number !== "string" || number.trim() !== "") &&
        number !== "" &&
        typeof number !== "undefined" &&
        typeof number !== "boolean" &&
        !Number.isNaN(Number(number)) &&
        !isArray(number) &&
        !isObject(number)
    );
}
