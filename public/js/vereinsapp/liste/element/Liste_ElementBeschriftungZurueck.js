/**
 * @param {number} element_id
 * @param {string} liste
 */

function Liste_ElementBeschriftungZurueck(element_id, liste) {
    let beschriftung;

    if (
        typeof element_id !== "undefined" &&
        "element_beschriftung" in ELEMENTE[LISTEN[liste].element] &&
        ELEMENTE[LISTEN[liste].element].element_beschriftung.length > 0
    ) {
        beschriftung = "";
        $.each(ELEMENTE[LISTEN[liste].element].element_beschriftung, function () {
            if ("prefix" in this) beschriftung += this.prefix;
            if ("eigenschaft" in this)
                beschriftung += Schnittstelle_VariableWertFormatiertZurueck(
                    Schnittstelle_VariableRausZurueck(this.eigenschaft, element_id, liste, undefined),
                    this.eigenschaft,
                    liste,
                );
            if ("suffix" in this) beschriftung += this.suffix;
        });
    } else beschriftung = ELEMENTE[LISTEN[liste].element].beschriftung;

    return beschriftung;
}
