/**
 * @param {JQuery} $werkzeug
 * @param {JQuery} $element
 */

function Liste_Element$WerkzeugAktualisieren($werkzeug, $element) {
    const liste = Util_WertBereinigtZurueck($element.attr("liste"), undefined);
    const werkzeug = $werkzeug.attr("werkzeug");
    const element_id = Util_WertBereinigtZurueck($element.attr(LISTEN[liste].element + "_id"), undefined);

    $werkzeug.attr("liste", liste).attr(LISTEN[liste].element + "_id", element_id);

    if (typeof WERKZEUGE[werkzeug].aktualisieren_aktion === "function") WERKZEUGE[werkzeug].aktualisieren_aktion($werkzeug);
}
