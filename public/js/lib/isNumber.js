// eigene Sammlung
function isNumber(number) {
    return (
        number !== null &&
        number !== "" &&
        typeof number !== "undefined" &&
        typeof number !== "boolean" &&
        !Number.isNaN(Number(number)) &&
        !isArray(number) &&
        !isObject(number)
    );
}
