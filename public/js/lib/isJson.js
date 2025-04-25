// https://stackoverflow.com/questions/3710204/how-to-check-if-a-string-is-a-valid-json-string
/**
 * If you don't care about primitives and only objects then this function
 * is for you, otherwise look elsewhere.
 * This function will return `false` for any valid json primitive.
 * EG, 'true' -> false
 *     '123' -> false
 *     'null' -> false
 *     '"I'm a string"' -> false
 */
function isJson(json) {
    try {
        var o = JSON.parse(json);

        // Handle non-exception-throwing cases:
        // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
        // but... JSON.parse(null) returns null, and typeof null === "object",
        // so we must check for that, too. Thankfully, null is falsey, so this suffices:
        if (o && typeof o === "object") {
            // return o;    geändert am 23.03.2025
            return true; // geändert am 23.03.2025
        }
    } catch (e) {}

    return false;
}
