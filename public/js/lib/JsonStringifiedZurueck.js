function JsonStringifiedZurueck(wert, wert_undefined) {
    let json_stringified;

    if (typeof wert === "undefined") json_stringified = JSON.stringify(wert_undefined);
    else if (isString(wert)) json_stringified = wert;
    else
        json_stringified = JSON.stringify(wert, (schluessel, wert) => {
            if (isNumber(wert)) return Number(wert);
            // else if (isLuxonDateTime(wert)) return wert.toFormat("yyyy-MM-dd HH:mm:ss");
            else return wert;
        });

    return json_stringified;
}
