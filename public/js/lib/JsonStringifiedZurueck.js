function JsonStringifiedZurueck(wert) {
    let JsonStringified;
    if (isString(wert)) JsonStringified = wert;
    else if (typeof wert === "undefined") JsonStringified = JSON.stringify(new Object());
    else
        JsonStringified = JSON.stringify(wert, (schluessel, wert) => {
            if (isNumber(wert)) return Number(wert);
            // else if (isLuxonDateTime(wert)) return wert.toFormat("yyyy-MM-dd HH:mm:ss");
            else return wert;
        });

    return JsonStringified;
}
