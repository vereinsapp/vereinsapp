function Liste_ElementWertRein(wert, eigenschaft, element_id, liste) {
    if (liste in LISTEN && "tabelle" in LISTEN[liste]) {
        if (typeof LISTEN[liste].tabelle[element_id] === "undefined") LISTEN[liste].tabelle[element_id] = new Object();
        LISTEN[liste].tabelle[element_id][eigenschaft] = Util_WertBereinigtZurueck(wert, undefined);
    }
}
