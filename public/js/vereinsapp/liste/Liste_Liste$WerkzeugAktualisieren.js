/**
 * @param {JQuery} $werkzeug
 * @param {JQuery} $liste
 */

function Liste_Liste$WerkzeugAktualisieren($werkzeug, $liste) {
    if (typeof WERKZEUGE[$werkzeug.attr("data-werkzeug")].aktualisieren_aktion === "function")
        WERKZEUGE[$werkzeug.attr("data-werkzeug")].aktualisieren_aktion($werkzeug);
}
