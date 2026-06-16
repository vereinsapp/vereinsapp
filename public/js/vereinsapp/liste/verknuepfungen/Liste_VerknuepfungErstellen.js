/**
 * @param {boolean} bestaetigt
 * @param {Object} dom
 * @param {Object} data
 * @param {string} modal_title
 * @param {string} verknuepfungen
 */

function Liste_VerknuepfungErstellen(bestaetigt, dom, data, modal_title, verknuepfungen) {
    data.verknuepfungen = verknuepfungen;

    if (typeof data[LISTEN[VERKNUEPFUNGEN[verknuepfungen].verknuepfte_listen[0]].element + "_id"] === "undefined")
        data[LISTEN[VERKNUEPFUNGEN[verknuepfungen].verknuepfte_listen[0]].element + "_id"] = Util_WertBereinigtZurueck(
            dom.$element.attr(LISTEN[VERKNUEPFUNGEN[verknuepfungen].verknuepfte_listen[0]].element + "_id"),
            undefined,
        );
    if (typeof data[LISTEN[VERKNUEPFUNGEN[verknuepfungen].verknuepfte_listen[1]].element + "_id"] === "undefined")
        data[LISTEN[VERKNUEPFUNGEN[verknuepfungen].verknuepfte_listen[1]].element + "_id"] = Util_WertBereinigtZurueck(
            dom.$element.attr(LISTEN[VERKNUEPFUNGEN[verknuepfungen].verknuepfte_listen[1]].element + "_id"),
            undefined,
        );

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
                const verknuepfte_element_id = new Object();
                $.each(verknuepfte_listen, function (position, verknuepfte_liste) {
                    verknuepfte_element_id[LISTEN[verknuepfte_liste].element + "_id"] = Util_WertBereinigtZurueck(
                        AJAX.data[LISTEN[verknuepfte_liste].element + "_id"],
                        undefined,
                    );
                });

                if (VERKNUEPFUNGEN[verknuepfungen].nur_eins_erlaubt_janein) {
                    // bereits vorhandene identische Verknüpfungen werden identifiziert
                    const bereits_vorhandene_identische_verknuepfungen = new Array();
                    $.each(
                        Liste_VerknuepfungIdsNachListeZurueck(
                            verknuepfte_element_id[LISTEN[verknuepfte_listen[0]].element + "_id"],
                            verknuepfte_listen[0],
                            verknuepfungen,
                            new Array(),
                        ),
                        function (position, verknuepfung_id_nach_liste) {
                            if (
                                Liste_VerknuepfungWertRausZurueck(
                                    LISTEN[verknuepfte_listen[1]].element + "_id",
                                    verknuepfung_id_nach_liste,
                                    verknuepfungen,
                                    undefined,
                                ) === verknuepfte_element_id[LISTEN[verknuepfte_listen[1]].element + "_id"]
                            )
                                bereits_vorhandene_identische_verknuepfungen.push(verknuepfung_id_nach_liste);
                        },
                    );

                    // bereits vorhandene identische Verknüpfungen werden gelöscht
                    $.each(bereits_vorhandene_identische_verknuepfungen, function (position, bereits_vorhandene_identische_verknuepfung_id) {
                        VERKNUEPFUNGEN[verknuepfungen].tabelle[bereits_vorhandene_identische_verknuepfung_id] = undefined;

                        $.each(verknuepfte_listen, function (position, verknuepfte_liste) {
                            if (
                                typeof Liste_VerknuepfungIdsNachListeZurueck(
                                    verknuepfte_element_id[LISTEN[verknuepfte_liste].element + "_id"],
                                    verknuepfte_liste,
                                    verknuepfungen,
                                    undefined,
                                ) !== "undefined"
                            )
                                VERKNUEPFUNGEN[verknuepfungen].verknuepfung_ids_nach_liste[verknuepfte_liste][
                                    verknuepfte_element_id[LISTEN[verknuepfte_liste].element + "_id"]
                                ] = Liste_VerknuepfungIdsNachListeZurueck(
                                    verknuepfte_element_id[LISTEN[verknuepfte_liste].element + "_id"],
                                    verknuepfte_liste,
                                    verknuepfungen,
                                    undefined,
                                ).filter((verknuepfung_id_) => verknuepfung_id_ != bereits_vorhandene_identische_verknuepfung_id);
                        });
                    });
                }

                // eine neue Verknüpfung wird hinzugefügt
                if (AJAX.data.status > 0) {
                    if (typeof AJAX.antwort[VERKNUEPFUNGEN[verknuepfungen].verknuepfung + "_id"] !== "undefined")
                        AJAX.data[VERKNUEPFUNGEN[verknuepfungen].verknuepfung + "_id"] = Number(
                            AJAX.antwort[VERKNUEPFUNGEN[verknuepfungen].verknuepfung + "_id"],
                        );
                    else AJAX.data[VERKNUEPFUNGEN[verknuepfungen].verknuepfung + "_id"] = VERKNUEPFUNGEN[verknuepfungen].tabelle.length + 1;
                    const verknuepfung_id = AJAX.data[VERKNUEPFUNGEN[verknuepfungen].verknuepfung + "_id"];
                    delete AJAX.data[VERKNUEPFUNGEN[verknuepfungen].verknuepfung + "_id"];

                    if (typeof VERKNUEPFUNGEN[verknuepfungen].tabelle[verknuepfung_id] === "undefined")
                        VERKNUEPFUNGEN[verknuepfungen].tabelle[verknuepfung_id] = new Object();
                    VERKNUEPFUNGEN[verknuepfungen].tabelle[verknuepfung_id].id = Util_WertBereinigtZurueck(verknuepfung_id, undefined);
                    $.each(AJAX.data, function (eigenschaft, wert) {
                        VERKNUEPFUNGEN[verknuepfungen].tabelle[verknuepfung_id][eigenschaft] = Util_WertBereinigtZurueck(wert, undefined);
                    });

                    $.each(verknuepfte_listen, function (position, verknuepfte_liste) {
                        if (!(verknuepfte_liste in VERKNUEPFUNGEN[verknuepfungen].verknuepfung_ids_nach_liste))
                            VERKNUEPFUNGEN[verknuepfungen].verknuepfung_ids_nach_liste[verknuepfte_liste] = new Array();
                        if (
                            typeof VERKNUEPFUNGEN[verknuepfungen].verknuepfung_ids_nach_liste[verknuepfte_liste][
                                verknuepfte_element_id[LISTEN[verknuepfte_liste].element + "_id"]
                            ] === "undefined"
                        )
                            VERKNUEPFUNGEN[verknuepfungen].verknuepfung_ids_nach_liste[verknuepfte_liste][
                                verknuepfte_element_id[LISTEN[verknuepfte_liste].element + "_id"]
                            ] = new Array();
                        VERKNUEPFUNGEN[verknuepfungen].verknuepfung_ids_nach_liste[verknuepfte_liste][
                            verknuepfte_element_id[LISTEN[verknuepfte_liste].element + "_id"]
                        ].push(verknuepfung_id);
                    });
                }

                if ("dbdata" in AJAX.antwort && isArray(AJAX.antwort.dbdata))
                    $.each(AJAX.antwort.dbdata, function (position, verknuepfung) {
                        if ("id" in verknuepfung) {
                            if (typeof VERKNUEPFUNGEN[verknuepfungen].tabelle[Number(verknuepfung.id)] === "undefined")
                                VERKNUEPFUNGEN[verknuepfungen].tabelle[Number(verknuepfung.id)] = new Object();

                            $.each(verknuepfung, function (eigenschaft, wert) {
                                VERKNUEPFUNGEN[verknuepfungen].tabelle[Number(verknuepfung.id)][eigenschaft] = Util_WertBereinigtZurueck(
                                    wert,
                                    undefined,
                                );
                            });
                        }
                    });

                Liste_EventVerknuepfungenLocalstorageSpeichern(verknuepfungen);
                Liste_EventVerknuepfungenBereitstellen(verknuepfungen);
                $.each(VERKNUEPFUNGEN[verknuepfungen].verknuepfte_listen, function (position, liste) {
                    Liste_EventDomAktualisieren(liste);
                });

                if ("dom" in AJAX && "$element" in AJAX.dom && AJAX.dom.$element.exists()) Liste_$ElementAktualisieren(AJAX.dom.$element);

                if ("dom" in AJAX && "$modal" in AJAX.dom && AJAX.dom.$modal.exists() && AJAX.dom.$modal.find(".bestaetigung").exists())
                    Dom_$ModalSchliessen(AJAX.dom.$modal);
            },
            function (AJAX) {
                if (isString(AJAX.antwort.validation)) Dom_ToastFeuern(AJAX.antwort.validation, "danger");
                Dom_ToastFeuern(WERKZEUGE.verknuepfung_erstellen.beschriftung.fehler, "danger");
            },
        );
    }
}
