function Schnittstelle_VariableRausZurueck(eigenschaft, element_id, liste, wert_nicht_gefunden) {
    if (typeof element_id !== "undefined") element_id = Number(element_id);

    if (
        liste in LISTEN &&
        "tabelle" in LISTEN[liste] &&
        typeof LISTEN[liste].tabelle[Number(element_id)] !== "undefined" &&
        eigenschaft in LISTEN[liste].tabelle[element_id]
    )
        VariableRaus = LISTEN[liste].tabelle[element_id][eigenschaft];
    else VariableRaus = wert_nicht_gefunden;

    return VariableRaus;
}
