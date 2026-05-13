/**
 * @param {boolean} bestaetigt
 * @param {Object} dom
 * @param {Object} data
 * @param {string} modal_title
 * @param {string} verknuepfungen
 */

function Liste_VerknuepfungErstellen(bestaetigt, dom, data, modal_title, verknuepfungen) {
    data.verknuepfungen = verknuepfungen;

    if (VERKNUEPFUNGEN[verknuepfungen].bestaetigung_einfordern && !bestaetigt)
        Dom_BestaetigungEinfordern(
            Liste_ElementBeschriftungErsetztZurueck(WERKZEUGE[VERKNUEPFUNGEN[verknuepfungen].verknuepfung + "_erstellen"].beschriftung.bestaetigung, {
                element1: {
                    liste: VERKNUEPFUNGEN[verknuepfungen].verknuepfte_listen[0],
                    [LISTEN[VERKNUEPFUNGEN[verknuepfungen].verknuepfte_listen[0]].element + "_id"]:
                        data[LISTEN[VERKNUEPFUNGEN[verknuepfungen].verknuepfte_listen[0]].element + "_id"],
                },
                element2: {
                    liste: VERKNUEPFUNGEN[verknuepfungen].verknuepfte_listen[1],
                    [LISTEN[VERKNUEPFUNGEN[verknuepfungen].verknuepfte_listen[1]].element + "_id"]:
                        data[LISTEN[VERKNUEPFUNGEN[verknuepfungen].verknuepfte_listen[1]].element + "_id"],
                },
            }),
            modal_title,
            VERKNUEPFUNGEN[verknuepfungen].verknuepfung + "_erstellen",
            data,
        );
    else {
        const ajax_dom = dom;
        const ajax_data = Util_WertBereinigtZurueck(data, new Object());
        if (!("bemerkung" in ajax_data) || isEmptyString(ajax_data.bemerkung)) ajax_data.bemerkung = null;

        Ajax_InDieSchlange(
            VERKNUEPFUNGEN[verknuepfungen].controller + "/ajax_" + VERKNUEPFUNGEN[verknuepfungen].verknuepfung + "_speichern",
            ajax_data,
            ajax_dom,
            function (AJAX) {
                const verknuepfungen = AJAX.data.verknuepfungen;
                delete AJAX.data.verknuepfungen;

                const verknuepfte_listen = VERKNUEPFUNGEN[verknuepfungen].verknuepfte_listen;
                const verknuepfte_element_ids = new Object();
                $.each(verknuepfte_listen, function (position, verknuepfte_liste) {
                    verknuepfte_element_ids[LISTEN[verknuepfte_liste].element + "_id"] = AJAX.data[LISTEN[verknuepfte_liste].element + "_id"];
                });

                // bereits vorhandene identische Verknüpfungen werden gelöscht
                if (VERKNUEPFUNGEN[verknuepfungen].nur_eins_erlaubt_janein)
                    $.each(
                        Liste_ElementWertRausZurueck(
                            "zugeordnete_" + VERKNUEPFUNGEN[verknuepfungen].verknuepfung + "_ids",
                            verknuepfte_element_ids[LISTEN[verknuepfte_listen[0]].element + "_id"],
                            verknuepfte_listen[0],
                            new Array(),
                        ),
                        function (position, zugeordnete_verknuepfung_id) {
                            if (
                                Liste_VerknuepfungWertRausZurueck(
                                    LISTEN[verknuepfte_listen[1]].element + "_id",
                                    zugeordnete_verknuepfung_id,
                                    verknuepfungen,
                                    undefined,
                                ) === verknuepfte_element_ids[LISTEN[verknuepfte_listen[1]].element + "_id"]
                            )
                                Liste_VariableLoeschen(zugeordnete_verknuepfung_id, verknuepfungen);
                        },
                    );

                // eine neue Verknüpfung wird hinzugefügt
                if (AJAX.data.status > 0) {
                    if (typeof AJAX.antwort[VERKNUEPFUNGEN[verknuepfungen].verknuepfung + "_id"] !== "undefined")
                        AJAX.data[VERKNUEPFUNGEN[verknuepfungen].verknuepfung + "_id"] = Number(
                            AJAX.antwort[VERKNUEPFUNGEN[verknuepfungen].verknuepfung + "_id"],
                        );
                    else AJAX.data[VERKNUEPFUNGEN[verknuepfungen].verknuepfung + "_id"] = VERKNUEPFUNGEN[verknuepfungen].tabelle.length + 1;
                    const verknuepfung_id = AJAX.data[VERKNUEPFUNGEN[verknuepfungen].verknuepfung + "_id"];
                    delete AJAX.data[VERKNUEPFUNGEN[verknuepfungen].verknuepfung + "_id"];

                    Liste_VerknuepfungWertRein(verknuepfung_id, "id", verknuepfung_id, verknuepfungen);
                    $.each(AJAX.data, function (eigenschaft, wert) {
                        Liste_VerknuepfungWertRein(wert, eigenschaft, verknuepfung_id, verknuepfungen);
                    });
                }

                if ("dbdata" in AJAX.antwort && isArray(AJAX.antwort.dbdata))
                    $.each(AJAX.antwort.dbdata, function (position, element) {
                        if ("id" in element)
                            $.each(element, function (eigenschaft, wert) {
                                Liste_VerknuepfungWertRein(wert, eigenschaft, Number(element.id), verknuepfungen);
                            });
                    });

                Liste_EventLocalstorageAktualisieren(verknuepfungen);
                Liste_EventVariableVerknuepfungenAktualisieren(verknuepfungen);
                $.each(VERKNUEPFUNGEN[verknuepfungen].verknuepfte_listen, function (position, liste) {
                    Liste_EventDomAktualisieren(liste);
                });

                if ("dom" in AJAX && "$modal" in AJAX.dom && AJAX.dom.$modal.exists() && AJAX.dom.$modal.find(".bestaetigung").exists())
                    Dom_$ModalSchliessen(AJAX.dom.$modal);
            },
            function (AJAX) {
                if (isString(AJAX.antwort.validation)) Dom_ToastFeuern(AJAX.antwort.validation, "danger");
                Dom_ToastFeuern(
                    Liste_ElementBeschriftungErsetztZurueck(WERKZEUGE.element_erstellen.beschriftung.fehler, {
                        element1: {
                            liste: AJAX.data.verknuepfungen,
                            [VERKNUEPFUNGEN[verknuepfungen].verknuepfung + "_id"]: AJAX.data[VERKNUEPFUNGEN[verknuepfungen].verknuepfung + "_id"],
                        },
                    }),
                    "danger",
                );
            },
        );
    }
}
