/**
 * @param {string} text
 * @param {Object} data
 */

function Liste_ElementTextMitBeschriftungErsetztZurueck(text, data) {
    return text.replace(/\{(liste|element)(\d+)\}/g, (match, platzhalter, zaehler) => {
        try {
            if (platzhalter === "liste") {
                // Platzhalter bezieht sich auf eine Liste
                const liste = data[platzhalter + zaehler];
                if (typeof liste !== "undefined" && liste in LISTEN) return LISTEN[liste].liste_beschriftung || match;
                else return "Liste" || match;
            } else if (platzhalter === "element") {
                // Platzhalter bezieht sich auf ein Element
                const element = data[platzhalter + zaehler];
                if (typeof element !== "undefined" && "liste" in element && LISTEN[element.liste].element + "_id" in element)
                    return Liste_ElementBeschriftungErweitertZurueck(element[LISTEN[element.liste].element + "_id"], element.liste) || match;
                else return "Element" || match;
            } else return match;
        } catch (error) {
            Log_InDieKonsole("Liste_ElementTextMitBeschriftungErsetztZurueck: Fehler beim Ersetzen von " + match);
            return match; // Original bei Exception beibehalten
        }
    });
}
