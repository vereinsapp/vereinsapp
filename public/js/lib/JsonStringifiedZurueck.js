function JsonStringifiedZurueck(wert, wert_undefined) {
    let json_stringified;

    if (typeof wert === "undefined") json_stringified = JSON.stringify(wert_undefined);
    else if (typeof wert === "string") json_stringified = wert;
    else
        json_stringified = JSON.stringify(wert, (schluessel, wert) => {
            if (isNumber(wert)) return Number(wert);
            else return wert;
        });

    return json_stringified;
}
