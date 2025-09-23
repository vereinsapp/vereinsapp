function Schnittstelle_VariableWertBereinigtZurueck(wert) {
    let wert_bereinigt;

    if (typeof wert === "undefined") wert_bereinigt = wert;
    else if (isNumber(wert)) wert_bereinigt = Number(wert);
    else if (isString(wert)) {
        if (DATETIME.fromSQL(wert).isValid) wert_bereinigt = DATETIME.fromSQL(wert);
        else if (DATETIME.fromISO(wert).isValid) wert_bereinigt = DATETIME.fromISO(wert);
        else if (isJson(wert)) wert_bereinigt = Schnittstelle_VariableWertBereinigtZurueck(JSON.parse(wert));
        else if (isJquery(wert)) wert_bereinigt = wert;
        else wert_bereinigt = wert;
    } else if (isLuxonDateTime(wert)) wert_bereinigt = wert;
    else if (isObject(wert)) {
        const objekt = wert;
        wert_bereinigt = new Object();
        $.each(objekt, function (eigenschaft, wert) {
            wert_bereinigt[eigenschaft] = Schnittstelle_VariableWertBereinigtZurueck(wert);
        });
    } else if (isArray(wert)) {
        const array = wert;
        wert_bereinigt = new Array();
        $.each(array, function (index, element) {
            wert_bereinigt[index] = Schnittstelle_VariableWertBereinigtZurueck(element);
        });
    } else wert_bereinigt = wert;

    return wert_bereinigt;
}
