function Dom_BestaetigungEinfordern(nachricht, modal_title, werkzeug, data) {
    const $modal = Dom_$ModalInitialisiertZurueck(modal_title, "bestaetigung_modal");
    const $bestaetigung = $modal.find(".bestaetigung");

    $bestaetigung.find(".bestaetigung_nachricht").text(nachricht);

    const $bestaetigt_werkzeug = $bestaetigung.find(".bestaetigt");
    if (typeof werkzeug !== "undefined" && werkzeug in WERKZEUGE) {
        $bestaetigt_werkzeug.addClass("werkzeug").attr("werkzeug", werkzeug);
        if ("farbe" in WERKZEUGE[werkzeug])
            $bestaetigt_werkzeug.removeClass("btn-outline-success").addClass("btn-outline-" + WERKZEUGE[werkzeug].farbe);
        // $bestaetigt_werkzeug.find(".beschriftung").html(
        //     '<i class="bi bi-' +
        //         SYMBOLE[WERKZEUGE[werkzeug].symbol] +
        //         '"></i> ' +
        //         Liste_ElementTextMitBeschriftungErsetztZurueck(WERKZEUGE[werkzeug].beschriftung.beschriftung, {
        //             element1: { liste: liste },
        //         }),
        // );
    }
    if (typeof data !== "undefined" && isObject(data))
        $.each(data, function (eigenschaft, wert) {
            $bestaetigt_werkzeug.attr(eigenschaft, wert);
        });

    Dom_$ModalOeffnen($modal);
}
