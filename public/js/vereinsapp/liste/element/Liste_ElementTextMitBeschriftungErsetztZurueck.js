/**
 * @param {string} text
 * @param {object} element_id
 */

function Liste_ElementTextMitBeschriftungErsetztZurueck(text, element_id) {
    return text.replace(/\{([a-zA-Z0-9_]+)\}/g, (match, liste) => {
        // Regex matched das Format {string}
        try {
            return element_beschriftung_zurueck(element_id[LISTEN[liste].element + "_id"], liste) || match; // Original bei Fehler beibehalten
        } catch (error) {
            Schnittstelle_LogInDieKonsole("Liste_ElementTextMitBeschriftungErsetztZurueck: Fehler beim Ersetzen von " + match);
            return match; // Original bei Exception beibehalten
        }
    });

    function element_beschriftung_zurueck(element_id, liste) {
        let beschriftung;

        if (typeof element_id !== "undefined" && "element_beschriftung_erweitert" in LISTEN[liste]) {
            beschriftung = "";
            $.each(LISTEN[liste].element_beschriftung_erweitert, function () {
                if ("prefix" in this) beschriftung += this.prefix;
                if ("eigenschaft" in this)
                    beschriftung += Schnittstelle_VariableWertFormatiertZurueck(
                        Schnittstelle_VariableRausZurueck(this.eigenschaft, element_id, liste, undefined),
                        this.eigenschaft,
                        liste,
                    );
                if ("suffix" in this) beschriftung += this.suffix;
            });
            if (beschriftung === "") beschriftung = LISTEN[liste].element_beschriftung;
        } else beschriftung = LISTEN[liste].element_beschriftung;

        return beschriftung;
    }
}
