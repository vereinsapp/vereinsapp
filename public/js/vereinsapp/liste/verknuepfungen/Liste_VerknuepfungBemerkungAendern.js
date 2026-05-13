/**
 * @param {boolean} data_vollstaendig
 * @param {Object} dom
 * @param {Object} data
 * @param {number} verknuepfung_id
 * @param {string} verknuepfungen
 */

function Liste_VerknuepfungBemerkungAendern(data_vollstaendig, dom, data, verknuepfung_id, verknuepfungen) {
    if (!data_vollstaendig) {
        const $modal = Dom_$ModalInitialisiertZurueck(undefined, "verknuepfung_bemerkung_aendern_modal");
        Dom_$ModalOeffnen($modal);

        $modal
            .find(".verknuepfung_bemerkung_eingabe")
            .val(Liste_VerknuepfungWertRausZurueck("bemerkung", verknuepfung_id, verknuepfungen, ""))
            .trigger("change");

        const $verknuepfung_bemerkung_aendern = $modal.find('.werkzeug[werkzeug="verknuepfung_bemerkung_aendern"]');
        $verknuepfung_bemerkung_aendern
            .attr("verknuepfungen", verknuepfungen)
            .attr(VERKNUEPFUNGEN[verknuepfungen].verknuepfung + "_id", verknuepfung_id);
        Dom_$Quelle$ZielVerknuepfen($verknuepfung_bemerkung_aendern, dom.$werkzeug.closest(".element"));
    } else {
        dom.$element = Dom_$ZielZu$QuelleZurueck(dom.$werkzeug);
        Dom_$Quelle$ZielEntknuepfen(dom.$werkzeug, dom.$element);
        const ajax_dom = dom;

        if (!("bemerkung" in data)) data.bemerkung = Liste_VerknuepfungWertRausZurueck("bemerkung", verknuepfung_id, verknuepfungen, null);
        const ajax_data = Util_WertBereinigtZurueck(data, new Object());
        ajax_data[VERKNUEPFUNGEN[verknuepfungen].verknuepfung + "_id"] = verknuepfung_id;
        ajax_data.verknuepfungen = verknuepfungen;
        if (isEmptyString(ajax_data.bemerkung)) ajax_data.bemerkung = null;

        Ajax_InDieSchlange(
            VERKNUEPFUNGEN[verknuepfungen].controller + "/ajax_" + VERKNUEPFUNGEN[verknuepfungen].verknuepfung + "_bemerkung_aendern",
            ajax_data,
            ajax_dom,
            function (AJAX) {
                const verknuepfungen = AJAX.data.verknuepfungen;
                const verknuepfung_id = AJAX.data[VERKNUEPFUNGEN[verknuepfungen].verknuepfung + "_id"];

                Liste_VerknuepfungWertRausZurueck(AJAX.data.bemerkung, "bemerkung", verknuepfung_id, verknuepfungen);

                Liste_EventLocalstorageAktualisieren(verknuepfungen);
                Liste_EventVariableVerknuepfungenAktualisieren(verknuepfungen);
                $.each(VERKNUEPFUNGEN[verknuepfungen].verknuepfte_listen, function (position, liste) {
                    Liste_EventDomAktualisieren(liste);
                });

                if ("dom" in AJAX && "$element" in AJAX.dom && AJAX.dom.$element.exists()) Liste_$ElementAktualisieren(AJAX.dom.$element);

                if ("dom" in AJAX && "$modal" in AJAX.dom && AJAX.dom.$modal.exists()) {
                    Dom_$ModalSchliessen(AJAX.dom.$modal);
                    Dom_ToastFeuern(
                        Liste_ElementBeschriftungErsetztZurueck(WERKZEUGE.verknuepfung_bemerkung_aendern.beschriftung.erfolg, new Object()),
                    );
                }
            },
            function (AJAX) {
                if (isString(AJAX.antwort.validation)) Dom_ToastFeuern(AJAX.antwort.validation, "danger");
                Dom_ToastFeuern(
                    Liste_ElementBeschriftungErsetztZurueck(WERKZEUGE.verknuepfung_bemerkung_aendern.beschriftung.fehler, new Object()),
                    "danger",
                );
            },
        );
    }
}
