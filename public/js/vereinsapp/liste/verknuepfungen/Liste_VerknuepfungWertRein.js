function Liste_VerknuepfungWertRein(wert, eigenschaft, verknuepfung_id, verknuepfungen) {
    if (verknuepfungen in VERKNUEPFUNGEN && "tabelle" in VERKNUEPFUNGEN[verknuepfungen]) {
        if (typeof VERKNUEPFUNGEN[verknuepfungen].tabelle[verknuepfung_id] === "undefined")
            VERKNUEPFUNGEN[verknuepfungen].tabelle[verknuepfung_id] = new Object();
        VERKNUEPFUNGEN[verknuepfungen].tabelle[verknuepfung_id][eigenschaft] = Util_WertBereinigtZurueck(wert, undefined);
    }
}
