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
        Schnittstelle_DomBestaetigungEinfordern(
            Liste_ElementTextMitBeschriftungErsetztZurueck("Willst du wirklich {mitglieder} die Strafe {strafkatalog} zuweisen?", data),
            modal_title,
            LISTEN[verknuepfungen].element + "_erstellen",
            data,
        );
    else {
        const ajax_dom = dom;
        const ajax_data = Schnittstelle_VariableWertBereinigtZurueck(data, new Object());
        if (!("bemerkung" in ajax_data) || isEmptyString(ajax_data.bemerkung)) ajax_data.bemerkung = null;

        Schnittstelle_AjaxInDieSchlange(
            LISTEN[verknuepfungen].controller + "/ajax_" + LISTEN[verknuepfungen].element + "_speichern",
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
                        Schnittstelle_VariableRausZurueck(
                            "zugeordnete_" + LISTEN[verknuepfungen].element + "_ids",
                            verknuepfte_element_ids[LISTEN[verknuepfte_listen[0]].element + "_id"],
                            verknuepfte_listen[0],
                            new Array(),
                        ),
                        function (position, zugeordnete_verknuepfung_id) {
                            if (
                                Schnittstelle_VariableRausZurueck(
                                    LISTEN[verknuepfte_listen[1]].element + "_id",
                                    zugeordnete_verknuepfung_id,
                                    verknuepfungen,
                                    undefined,
                                ) === verknuepfte_element_ids[LISTEN[verknuepfte_listen[1]].element + "_id"]
                            )
                                Schnittstelle_VariableLoeschen(zugeordnete_verknuepfung_id, verknuepfungen);
                        },
                    );

                // eine neue Verknüpfung wird hinzugefügt
                if (AJAX.data.status > 0) {
                    if (typeof AJAX.antwort[LISTEN[verknuepfungen].element + "_id"] !== "undefined")
                        AJAX.data[LISTEN[verknuepfungen].element + "_id"] = Number(AJAX.antwort[LISTEN[verknuepfungen].element + "_id"]);
                    else AJAX.data[LISTEN[verknuepfungen].element + "_id"] = LISTEN[verknuepfungen].tabelle.length + 1;
                    const verknuepfung_id = AJAX.data[LISTEN[verknuepfungen].element + "_id"];
                    delete AJAX.data[LISTEN[verknuepfungen].element + "_id"];

                    Schnittstelle_VariableRein(verknuepfung_id, "id", verknuepfung_id, verknuepfungen);
                    $.each(AJAX.data, function (eigenschaft, wert) {
                        Schnittstelle_VariableRein(wert, eigenschaft, verknuepfung_id, verknuepfungen);
                    });
                }

                if ("dbdata" in AJAX.antwort && isArray(AJAX.antwort.dbdata))
                    $.each(AJAX.antwort.dbdata, function (position, element) {
                        if ("id" in element)
                            $.each(element, function (eigenschaft, wert) {
                                Schnittstelle_VariableRein(wert, eigenschaft, Number(element.id), verknuepfungen);
                            });
                    });

                Schnittstelle_EventVariableUpdLocalstorage(verknuepfungen);
                Schnittstelle_EventLocalstorageUpdVariable(verknuepfungen);
                Liste_VerknuepfungenZuordnen(verknuepfungen);
                Schnittstelle_VariableElementErgaenzen(verknuepfungen);
                Schnittstelle_VariableElementErgaenzen(verknuepfte_listen[0]);
                Schnittstelle_VariableElementErgaenzen(verknuepfte_listen[1]);
                Schnittstelle_EventVariableUpdDom(verknuepfungen);
                Schnittstelle_EventVariableUpdDom(verknuepfte_listen[0]);
                Schnittstelle_EventVariableUpdDom(verknuepfte_listen[1]);

                if ("dom" in AJAX && "$modal" in AJAX.dom && AJAX.dom.$modal.exists() && AJAX.dom.$modal.find(".bestaetigung").exists())
                    Schnittstelle_Dom$ModalSchliessen(AJAX.dom.$modal);
            },
            function (AJAX) {
                if (isString(AJAX.antwort.validation)) Schnittstelle_DomToastFeuern(AJAX.antwort.validation, "danger");
                Schnittstelle_DomToastFeuern(
                    Liste_ElementTextMitBeschriftungErsetztZurueck("{" + AJAX.data.verknuepfungen + "} konnte nicht gespeichert werden.", {
                        [LISTEN[AJAX.data.verknuepfungen].element + "_id"]: AJAX.data[LISTEN[AJAX.data.verknuepfungen].element + "_id"],
                    }),
                    "danger",
                );
            },
        );
    }
}
