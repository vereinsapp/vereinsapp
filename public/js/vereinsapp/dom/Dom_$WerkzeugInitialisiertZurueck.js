function Dom_$WerkzeugInitialisiertZurueck(werkzeug, data) {
    const $werkzeug = WERKZEUGE.$blanko_werkzeug.clone().removeClass("blanko invisible").addClass("werkzeug");

    $werkzeug
        .attr("werkzeug", werkzeug)
        .addClass("bi-" + SYMBOLE[WERKZEUGE[werkzeug].symbol].bootstrap)
        .attr("modal_title", WERKZEUGE[werkzeug].beschriftung.beschriftung);
    if ("farbe" in WERKZEUGE[werkzeug]) $werkzeug.addClass("text-" + WERKZEUGE[werkzeug].farbe);
    else $werkzeug.addClass("text-primary");

    if (typeof data !== "undefined" && isObject(data))
        $.each(data, function (eigenschaft, wert) {
            $werkzeug.attr(eigenschaft, wert);
        });

    return $werkzeug;
}
