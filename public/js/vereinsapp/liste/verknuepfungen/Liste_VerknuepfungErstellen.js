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
            const verknuepfungen = AJAX.data.verknuepfungen;
            const liste = AJAX.data.liste;
            const gegen_liste = AJAX.data.gegen_liste;
            const element_id = AJAX.data[LISTEN[liste].element + "_id"];
            const gegen_element_id = AJAX.data[LISTEN[gegen_liste].element + "_id"];

            // bereits vorhandene identische Verknüpfungen werden gelöscht
            $.each(
                Schnittstelle_VariableRausZurueck(
                    "zugeordnete_" + LISTEN[verknuepfungen].element + "_ids",
                    gegen_element_id,
                    gegen_liste,
                    new Array()
                ),
                function (position, zugeordnete_verknuepfung_id) {
                    if (
                        Schnittstelle_VariableRausZurueck(LISTEN[liste].element + "_id", zugeordnete_verknuepfung_id, verknuepfungen, undefined) ===
                        element_id
                    )
                        Schnittstelle_VariableLoeschen(zugeordnete_verknuepfung_id, verknuepfungen);
                }
            );

            // eine neue Verknüpfung wird hinzugefügt
            if (AJAX.data.status > 0) {
                if (typeof AJAX.antwort[LISTEN[verknuepfungen].element + "_id"] !== "undefined")
                    AJAX.data.id = Number(AJAX.antwort[LISTEN[verknuepfungen].element + "_id"]);
                else AJAX.data.id = LISTEN[verknuepfungen].tabelle.length + 1;

                $.each(AJAX.data, function (eigenschaft, wert) {
                    if (
                        eigenschaft != "ajax_id" &&
                        eigenschaft != CSRF_NAME &&
                        eigenschaft != "liste" &&
                        eigenschaft != "gegen_liste" &&
                        eigenschaft != "verknuepfungen"
                    )
                        Schnittstelle_VariableRein(wert, eigenschaft, AJAX.data.id, verknuepfungen);
                });
            }

            Schnittstelle_EventVariableUpdLocalstorage(verknuepfungen);
            Schnittstelle_EventLocalstorageUpdVariable(verknuepfungen);
            Schnittstelle_VariableElementZuordnen(verknuepfungen);
            Schnittstelle_VariableElementErgaenzen(verknuepfungen);
            Schnittstelle_EventVariableUpdDom(verknuepfungen);
        },
        function (AJAX) {
            if (isString(AJAX.antwort.validation)) Schnittstelle_DomToastFeuern(AJAX.antwort.validation, "danger");
            Schnittstelle_DomToastFeuern(
                Liste_ElementBeschriftungZurueck(AJAX.data.id, verknuepfungen) + " konnte nicht gespeichert werden.",
                "danger"
            );
        }
    );
}
