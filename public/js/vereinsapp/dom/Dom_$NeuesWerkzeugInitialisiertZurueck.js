function Dom_$NeuesWerkzeugInitialisiertZurueck(werkzeug, data) {
    const $neues_werkzeug = WERKZEUGE.$blanko_werkzeug.clone().removeClass("blanko invisible").addClass("werkzeug");

    $neues_werkzeug
        .attr("werkzeug", werkzeug)
        .addClass("bi-" + SYMBOLE[WERKZEUGE[werkzeug].symbol].bootstrap)
        .attr("modal_title", WERKZEUGE[werkzeug].beschriftung);
    if ("farbe" in WERKZEUGE[werkzeug]) $neues_werkzeug.addClass("text-" + WERKZEUGE[werkzeug].farbe);
    else $neues_werkzeug.addClass("text-primary");

    if (typeof data !== "undefined" && isObject(data))
        $.each(data, function (eigenschaft, wert) {
            $neues_werkzeug.attr(eigenschaft, wert);
        });

    return $neues_werkzeug;
}
