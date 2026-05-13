function Liste_VerknuepfungWertRausZurueck(eigenschaft, verknuepfung_id, verknuepfungen, wert_nicht_gefunden) {
    let wert_zurueck;

    if (
        verknuepfungen in VERKNUEPFUNGEN &&
        "tabelle" in VERKNUEPFUNGEN[verknuepfungen] &&
        typeof VERKNUEPFUNGEN[verknuepfungen].tabelle[verknuepfung_id] !== "undefined" &&
        eigenschaft in VERKNUEPFUNGEN[verknuepfungen].tabelle[verknuepfung_id]
    )
        wert_zurueck = VERKNUEPFUNGEN[verknuepfungen].tabelle[verknuepfung_id][eigenschaft];
    else wert_zurueck = wert_nicht_gefunden;

    return wert_zurueck;
}
