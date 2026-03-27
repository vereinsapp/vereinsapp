/**
 * @param {string} werkzeug
 * @param {Object} data
 */

function Dom_$WerkzeugInitialisiertZurueck(werkzeug, data) {
    const $werkzeug = WERKZEUGE.$blanko_werkzeug.clone().removeClass("blanko invisible").addClass("werkzeug");

    $werkzeug
        .attr("werkzeug", werkzeug)
        .addClass("bi-" + ICONS[WERKZEUGE[werkzeug].symbol])
        .attr("modal_title", WERKZEUGE[werkzeug].beschriftung.beschriftung);
    if ("farbe" in WERKZEUGE[werkzeug]) $werkzeug.addClass("text-" + WERKZEUGE[werkzeug].farbe);
    else $werkzeug.addClass("text-primary");

    if (typeof data !== "undefined" && isObject(data))
        $.each(data, function (eigenschaft, wert) {
            $werkzeug.attr(eigenschaft, wert);
        });

    if (typeof WERKZEUGE[werkzeug].aktualisieren_aktion === "function") WERKZEUGE[werkzeug].aktualisieren_aktion($werkzeug);

    return $werkzeug;
}
