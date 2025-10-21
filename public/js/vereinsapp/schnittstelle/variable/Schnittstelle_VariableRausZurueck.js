function Schnittstelle_VariableRausZurueck(eigenschaft, element_id, liste, wert_nicht_gefunden) {
    if (typeof element_id !== "undefined") element_id = Number(element_id);

    let wert_zurueck;

    if (
        liste in LISTEN &&
        "tabelle" in LISTEN[liste] &&
        typeof LISTEN[liste].tabelle[element_id] !== "undefined" &&
        eigenschaft in LISTEN[liste].tabelle[element_id]
    )
        wert_zurueck = LISTEN[liste].tabelle[element_id][eigenschaft];
    else wert_zurueck = wert_nicht_gefunden;

    return wert_zurueck;
}
