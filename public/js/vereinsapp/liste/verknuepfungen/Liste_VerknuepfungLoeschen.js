/**
 * @param {Object} dom
 * @param {Number} verknuepfung_id
 * @param {string} verknuepfungen
 */

function Liste_VerknuepfungLoeschen(dom, verknuepfung_id, verknuepfungen) {
    const ajax_dom = dom;
    const ajax_data = new Object();
    ajax_data.verknuepfungen = verknuepfungen;
    ajax_data[VERKNUEPFUNGEN[verknuepfungen].verknuepfung + "_id"] = verknuepfung_id;

    Ajax_InDieSchlange(
        VERKNUEPFUNGEN[verknuepfungen].controller + "/ajax_" + VERKNUEPFUNGEN[verknuepfungen].verknuepfung + "_loeschen",
        ajax_data,
        ajax_dom,
        function (AJAX) {
            const verknuepfungen = AJAX.data.verknuepfungen;
            delete AJAX.data.verknuepfungen;
            const verknuepfung_id = AJAX.data[VERKNUEPFUNGEN[verknuepfungen].verknuepfung + "_id"];
            delete AJAX.data[VERKNUEPFUNGEN[verknuepfungen].verknuepfung + "_id"];

            VERKNUEPFUNGEN[verknuepfungen].tabelle[verknuepfung_id] = undefined;

            if ("dbdata" in AJAX.antwort && isArray(AJAX.antwort.dbdata))
                $.each(AJAX.antwort.dbdata, function (position, verknuepfung) {
                    if ("id" in verknuepfung) {
                        if (typeof VERKNUEPFUNGEN[verknuepfungen].tabelle[Number(verknuepfung.id)] === "undefined")
                            VERKNUEPFUNGEN[verknuepfungen].tabelle[Number(verknuepfung.id)] = new Object();

                        $.each(verknuepfung, function (eigenschaft, wert) {
                            VERKNUEPFUNGEN[verknuepfungen].tabelle[Number(verknuepfung.id)][eigenschaft] = Util_WertBereinigtZurueck(wert, undefined);
                        });
                    }
                });

            Liste_EventVerknuepfungenLocalstorageSpeichern(verknuepfungen);
            Liste_EventVerknuepfungenBereitstellen(verknuepfungen);
            $.each(VERKNUEPFUNGEN[verknuepfungen].verknuepfte_listen, function (position, liste) {
                Liste_EventDomAktualisieren(liste);
            });

            if ("dom" in AJAX && "$element" in AJAX.dom && AJAX.dom.$element.exists()) Liste_$ElementAktualisieren(AJAX.dom.$element);
        },
        function (AJAX) {
            if (isString(AJAX.antwort.validation)) Dom_ToastFeuern(AJAX.antwort.validation, "danger");
            Dom_ToastFeuern(WERKZEUGE.verknuepfung_loeschen.beschriftung.fehler, "danger");
        },
    );
}
