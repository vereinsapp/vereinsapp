function Schnittstelle_DomBestaetigungEinfordern(nachricht, title, werkzeug, data) {
    const $neues_bestaetigung_modal = Schnittstelle_Dom$NeuesModalInitialisiertZurueck(title, "bestaetigung_modal");
    const $bestaetigung = $neues_bestaetigung_modal.find(".bestaetigung");

    $bestaetigung.find(".bestaetigung_nachricht").text(nachricht);

    const $bestaetigung_werkzeug = $bestaetigung.find(".bestaetigung_werkzeug");
    if (typeof werkzeug !== "undefined" && werkzeug in WERKZEUGE) {
        $bestaetigung_werkzeug
            .removeClass("bestaetigung_werkzeug")
            .addClass("werkzeug")
            .attr("data-werkzeug", werkzeug)
            .addClass(WERKZEUGE[werkzeug].btn);
        if ("farbe" in WERKZEUGE[werkzeug])
            $bestaetigung_werkzeug.removeClass("btn-outline-success").addClass("btn-outline-" + WERKZEUGE[werkzeug].farbe);
        // $bestaetigung_werkzeug.find(".beschriftung").text(WERKZEUGE[werkzeug].title);
    }
    if (typeof data !== "undefined" && isObject(data))
        $.each(data, function (eigenschaft, wert) {
            $bestaetigung_werkzeug.attr("data-" + eigenschaft, wert);
        });

    Schnittstelle_Dom$ModalOeffnen($neues_bestaetigung_modal);
}
