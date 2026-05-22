/**
 * @param {Object} dom
 * @param {number} status
 * @param {number} verknuepfung_id
 * @param {string} verknuepfungen
 */

function Liste_VerknuepfungStatusAendern(dom, status, verknuepfung_id, verknuepfungen) {
    const ajax_dom = dom;
    const ajax_data = new Object();
    ajax_data.verknuepfungen = verknuepfungen;
    ajax_data[VERKNUEPFUNGEN[verknuepfungen].verknuepfung + "_id"] = verknuepfung_id;
    ajax_data.status = status;

    Ajax_InDieSchlange(
        VERKNUEPFUNGEN[verknuepfungen].controller + "/ajax_" + VERKNUEPFUNGEN[verknuepfungen].verknuepfung + "_status_aendern",
        ajax_data,
        ajax_dom,
        function (AJAX) {
            const verknuepfungen = AJAX.data.verknuepfungen;
            delete AJAX.data.verknuepfungen;
            const verknuepfung_id = AJAX.data[VERKNUEPFUNGEN[verknuepfungen].verknuepfung + "_id"];
            delete AJAX.data[VERKNUEPFUNGEN[verknuepfungen].verknuepfung + "_id"];

            VERKNUEPFUNGEN[verknuepfungen].tabelle[verknuepfung_id].status = Util_WertBereinigtZurueck(AJAX.data.status, undefined);

            if ("dbdata" in AJAX.antwort && isArray(AJAX.antwort.dbdata))
                $.each(AJAX.antwort.dbdata, function (position, element) {
                    if ("id" in element) {
                        if (typeof VERKNUEPFUNGEN[verknuepfungen].tabelle[Number(element.id)] === "undefined")
                            VERKNUEPFUNGEN[verknuepfungen].tabelle[Number(element.id)] = new Object();

                        $.each(element, function (eigenschaft, wert) {
                            VERKNUEPFUNGEN[verknuepfungen].tabelle[Number(element.id)][eigenschaft] = Util_WertBereinigtZurueck(wert, undefined);
                        });
                    }
                });

            Liste_EventLocalstorageVerknuepfungenAktualisieren(verknuepfungen);
            Liste_EventVariableVerknuepfungenAktualisieren(verknuepfungen);
            $.each(VERKNUEPFUNGEN[verknuepfungen].verknuepfte_listen, function (position, liste) {
                Liste_EventDomAktualisieren(liste);
            });

            if ("dom" in AJAX && "$element" in AJAX.dom && AJAX.dom.$element.exists()) Liste_$ElementAktualisieren(AJAX.dom.$element);

            if ("dom" in AJAX && "$modal" in AJAX.dom && AJAX.dom.$modal.exists()) {
                Dom_$ModalSchliessen(AJAX.dom.$modal);
            }
        },
        function (AJAX) {
            if (isString(AJAX.antwort.validation)) Dom_ToastFeuern(AJAX.antwort.validation, "danger");
        },
    );
}
