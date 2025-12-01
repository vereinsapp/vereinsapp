/**
 * @param {Object} dom
 * @param {Object} data
 */

function Liste_VerknuepfungErstellen(dom, data) {
    data[LISTEN[data.liste].element + "_id"] = data.element_id;
    data[LISTEN[data.gegen_liste].element + "_id"] = data.gegen_element_id;
    delete data.element_id;
    delete data.gegen_element_id;

    const ajax_dom = dom;
    const ajax_data = Schnittstelle_VariableWertBereinigtZurueck(data, new Object());
    if (!("bemerkung" in ajax_data) || isEmptyString(ajax_data.bemerkung)) ajax_data.bemerkung = null;

    Schnittstelle_AjaxInDieSchlange(
        LISTEN[data.verknuepfungen].controller + "/ajax_" + LISTEN[data.verknuepfungen].element + "_speichern",
        ajax_data,
        ajax_dom,
        function (AJAX) {
            // bereits vorhandene identische Verknüpfungen werden gelöscht
            $.each(
                Schnittstelle_VariableRausZurueck(
                    "zugeordnete_" + LISTEN[data.verknuepfungen].element + "_ids",
                    AJAX.data[LISTEN[AJAX.data.gegen_liste].element + "_id"],
                    AJAX.data.gegen_liste,
                    new Array()
                ),
                function (position, zugeordnete_element_id) {
                    if (
                        Schnittstelle_VariableRausZurueck(
                            LISTEN[AJAX.data.liste].element + "_id",
                            zugeordnete_element_id,
                            AJAX.data.verknuepfungen,
                            undefined
                        ) === AJAX.data[LISTEN[AJAX.data.liste].element + "_id"]
                    )
                        Schnittstelle_VariableLoeschen(zugeordnete_element_id, AJAX.data.verknuepfungen);
                }
            );

            // eine neue Verknüpfung wird hinzugefügt
            if (AJAX.data.status > 0) {
                if (typeof AJAX.antwort[LISTEN[AJAX.data.verknuepfungen].element + "_id"] !== "undefined")
                    AJAX.data.id = Number(AJAX.antwort[LISTEN[AJAX.data.verknuepfungen].element + "_id"]);
                else AJAX.data.id = LISTEN[AJAX.data.verknuepfungen].tabelle.length + 1;

                $.each(AJAX.data, function (eigenschaft, wert) {
                    if (
                        eigenschaft != "ajax_id" &&
                        eigenschaft != CSRF_NAME &&
                        eigenschaft != "liste" &&
                        eigenschaft != "gegen_liste" &&
                        eigenschaft != "verknuepfungen"
                    )
                        Schnittstelle_VariableRein(wert, eigenschaft, AJAX.data.id, AJAX.data.verknuepfungen);
                });
            }

            Schnittstelle_EventVariableUpdLocalstorage(AJAX.data.verknuepfungen);
            Schnittstelle_EventLocalstorageUpdVariable(AJAX.data.verknuepfungen);
            Schnittstelle_VariableElementZuordnen(AJAX.data.verknuepfungen);
            Schnittstelle_VariableElementErgaenzen(AJAX.data.verknuepfungen);
            Schnittstelle_EventVariableUpdDom(AJAX.data.verknuepfungen);

            if ("dom" in AJAX && "$ausloesend" in AJAX.dom && AJAX.dom.$ausloesend.exists())
                Liste_VerknuepfungAktualisieren(AJAX.dom.$ausloesend.closest("[data-liste='" + AJAX.data.verknuepfungen + "']"));
        },
        function (AJAX) {
            if (isString(AJAX.antwort.validation)) Schnittstelle_DomToastFeuern(AJAX.antwort.validation, "danger");
            Schnittstelle_DomToastFeuern(
                Liste_ElementBeschriftungZurueck(AJAX.data.id, AJAX.data.verknuepfungen) + " konnte nicht gespeichert werden.",
                "danger"
            );
        }
    );
}
