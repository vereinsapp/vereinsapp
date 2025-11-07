// https://stackoverflow.com/questions/8511281/check-if-a-value-is-an-object-in-javascript // & https://www.w3docs.com/snippets/javascript/how-to-check-if-a-value-is-an-object-in-javascript.html
function isObject(object) {
    return object !== null && !Array.isArray(object) && typeof object === "object" /*&& object.constructor === Object*/;
}
