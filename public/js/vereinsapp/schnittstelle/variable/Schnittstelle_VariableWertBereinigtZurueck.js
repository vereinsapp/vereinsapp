function Schnittstelle_VariableWertBereinigtZurueck(wert) {
    let wert_bereinigt;

    if (typeof wert === "undefined") wert_bereinigt = wert;
    else if (isNumber(wert)) wert_bereinigt = Number(wert);
    else if (isString(wert)) {
        if (DateTime.fromSQL(wert).isValid) wert_bereinigt = DateTime.fromSQL(wert);
        else if (DateTime.fromISO(wert).isValid) wert_bereinigt = DateTime.fromISO(wert);
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
