function Liste_VariableRein(wert, eigenschaft, element_id, liste) {
    if (typeof eigenschaft !== "undefined" && typeof element_id !== "undefined" && typeof liste !== "undefined") {
        if (typeof LISTEN[liste].tabelle[element_id] === "undefined") LISTEN[liste].tabelle[element_id] = new Object();
        LISTEN[liste].tabelle[element_id][eigenschaft] = Liste_WertBereinigtZurueck(wert, undefined);
    }
}
