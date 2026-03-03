function Schnittstelle_DomBestaetigungEinfordern(nachricht, modal_title, werkzeug, data) {
    const $neues_bestaetigung_modal = Schnittstelle_Dom$NeuesModalInitialisiertZurueck(modal_title, "bestaetigung_modal");
    const $bestaetigung = $neues_bestaetigung_modal.find(".bestaetigung");

    $bestaetigung.find(".bestaetigung_nachricht").text(nachricht);

    const $bestaetigt_werkzeug = $bestaetigung.find(".bestaetigt");
    if (typeof werkzeug !== "undefined" && werkzeug in WERKZEUGE) {
        $bestaetigt_werkzeug.addClass("werkzeug").attr("werkzeug", werkzeug);
        if ("farbe" in WERKZEUGE[werkzeug])
            $bestaetigt_werkzeug.removeClass("btn-outline-success").addClass("btn-outline-" + WERKZEUGE[werkzeug].farbe);
        // $bestaetigt_werkzeug.find(".beschriftung").text(WERKZEUGE[werkzeug].beschriftung);
    }
    if (typeof data !== "undefined" && isObject(data))
        $.each(data, function (eigenschaft, wert) {
            $bestaetigt_werkzeug.attr(eigenschaft, wert);
        });

    Schnittstelle_Dom$ModalOeffnen($neues_bestaetigung_modal);
}
