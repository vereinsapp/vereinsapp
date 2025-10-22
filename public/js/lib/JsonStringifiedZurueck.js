function JsonStringifiedZurueck(wert) {
    let JsonStringified;
    if (isString(wert)) JsonStringified = wert;
    else
        JsonStringified = JSON.stringify(wert, (schluessel, wert) => {
            if (isNumber(wert)) return Number(wert);
            // else if (isLuxonDateTime(wert)) return wert.toFormat("yyyy-MM-dd HH:mm:ss");
            else return wert;
        });

    return JsonStringified;
}
