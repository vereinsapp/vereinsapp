/**
 * @param {JQuery} $werkzeug
 * @param {JQuery} $liste
 */

function Liste_$WerkzeugAktualisieren($werkzeug, $liste) {
    const liste = Util_WertBereinigtZurueck($liste.attr("liste"), undefined);
    const werkzeug = $werkzeug.attr("werkzeug");

    $werkzeug.attr("liste", liste);

    if (typeof WERKZEUGE[werkzeug].aktualisieren_aktion === "function") WERKZEUGE[werkzeug].aktualisieren_aktion($werkzeug);
}
