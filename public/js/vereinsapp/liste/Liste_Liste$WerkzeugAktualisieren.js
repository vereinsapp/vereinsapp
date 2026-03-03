/**
 * @param {JQuery} $werkzeug
 * @param {JQuery} $liste
 */

function Liste_Liste$WerkzeugAktualisieren($werkzeug, $liste) {
    const werkzeug = $werkzeug.attr("werkzeug");
    if (typeof WERKZEUGE[werkzeug].aktualisieren_aktion === "function") WERKZEUGE[werkzeug].aktualisieren_aktion($werkzeug);
}
