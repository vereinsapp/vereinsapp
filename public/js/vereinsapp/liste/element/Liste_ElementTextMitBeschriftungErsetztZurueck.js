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
                if (typeof liste !== "undefined") {
                    if (liste in LISTEN) return LISTEN[liste].beschriftung || match;
                    else return "Liste" || match;
                } else return match;
            } else if (platzhalter === "element") {
                // Platzhalter bezieht sich auf ein Element
                const element = data[platzhalter + zaehler];
                if (typeof element !== "undefined" && "liste" in element && element.liste in LISTEN) {
                    const liste = element.liste;
                    let element_id;
                    if (LISTEN[liste].element + "_id" in element) element_id = element[LISTEN[liste].element + "_id"];
                    return element_beschriftung_zurueck(element_id, liste) || match;
                } else return "Element" || match;
            } else return match;
        } catch (error) {
            Log_InDieKonsole("Liste_ElementTextMitBeschriftungErsetztZurueck: Fehler beim Ersetzen von " + match);
            return match; // Original bei Exception beibehalten
        }
    });
}

function element_beschriftung_zurueck(element_id, liste) {
    if (typeof liste !== "undefined" && liste in LISTEN) {
        if (typeof element_id !== "undefined" && "element_beschriftung_erweitert" in LISTEN[liste]) {
            let beschriftung = "";
            $.each(LISTEN[liste].element_beschriftung_erweitert, function () {
                if ("prefix" in this) beschriftung += this.prefix;
                if ("eigenschaft" in this)
                    beschriftung += Liste_WertNachEigenschaftFormatiertZurueck(
                        Liste_VariableRausZurueck(this.eigenschaft, element_id, liste, undefined),
                        this.eigenschaft,
                        liste,
                    );
                if ("suffix" in this) beschriftung += this.suffix;
            });
            if (!isEmptyString(beschriftung)) return beschriftung;
            else return LISTEN[liste].element_beschriftung;
        } else return LISTEN[liste].element_beschriftung;
    } else return "Element";
}
