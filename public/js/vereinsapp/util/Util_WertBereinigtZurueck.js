function Util_WertBereinigtZurueck(wert, wert_undefined) {
    let wert_bereinigt;

    if (typeof wert === "undefined") wert_bereinigt = wert_undefined;
    else if (isNumber(wert)) wert_bereinigt = Number(wert);
    else if (isString(wert)) {
        if (DATETIME.fromSQL(wert).isValid) wert_bereinigt = DATETIME.fromSQL(wert);
        else if (DATETIME.fromISO(wert).isValid) wert_bereinigt = DATETIME.fromISO(wert);
        else if (isJson(wert)) wert_bereinigt = Util_WertBereinigtZurueck(JSON.parse(wert), undefined);
        else if (isJquery(wert)) wert_bereinigt = wert;
        else wert_bereinigt = wert;
    } else if (isLuxonDateTime(wert)) wert_bereinigt = wert;
    else if (isObject(wert)) {
        const objekt = wert;
        wert_bereinigt = new Object();
        $.each(objekt, function (eigenschaft, wert) {
            wert_bereinigt[eigenschaft] = Util_WertBereinigtZurueck(wert, undefined);
        });
    } else if (isArray(wert)) {
        const array = wert;
        wert_bereinigt = new Array();
        $.each(array, function (index, wert) {
            wert_bereinigt[index] = Util_WertBereinigtZurueck(wert, undefined);
        });
    } else wert_bereinigt = wert;

    return wert_bereinigt;
}
