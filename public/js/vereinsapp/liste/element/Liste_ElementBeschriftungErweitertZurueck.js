/**
 * @param {number} element_id
 * @param {string} liste
 */

function Liste_ElementBeschriftungErweitertZurueck(element_id, liste) {
    if (liste in LISTEN) {
        if ("element_beschriftung_erweitert" in LISTEN[liste] && typeof element_id !== "undefined") {
            let element_beschriftung_erweitert = "";

            $.each(LISTEN[liste].element_beschriftung_erweitert, function (position, freitext_eigenschaft) {
                if ("freitext" in freitext_eigenschaft) element_beschriftung_erweitert += freitext_eigenschaft.freitext;
                if ("eigenschaft" in freitext_eigenschaft)
                    element_beschriftung_erweitert += Liste_WertNachEigenschaftFormatiertZurueck(
                        Liste_ElementWertRausZurueck(freitext_eigenschaft.eigenschaft, element_id, liste, undefined),
                        freitext_eigenschaft.eigenschaft,
                        liste,
                    );
            });

            if (!isEmptyString(element_beschriftung_erweitert)) return element_beschriftung_erweitert;
            else return LISTEN[liste].element_beschriftung;
        } else return LISTEN[liste].element_beschriftung;
    } else return "Element";
}
