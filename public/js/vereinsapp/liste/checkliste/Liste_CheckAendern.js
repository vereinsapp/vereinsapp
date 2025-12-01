/**
 * @param {Object} dom
 * @param {Object} data
 */

function Liste_CheckAendern(dom, data) {
    dom.$ausloesend = dom.$check.parents().first();
    delete dom.$check;

    data[LISTEN[data.liste].element + "_id"] = data.element_id;
    data[LISTEN[data.gegen_liste].element + "_id"] = data.gegen_element_id;
    delete data.element_id;
    delete data.gegen_element_id;
    data.status = Number(data.status);
    const ajax_dom = dom;
    const ajax_data = Schnittstelle_VariableWertBereinigtZurueck(data, new Object());
    if (!("bemerkung" in ajax_data) || isEmptyString(ajax_data.bemerkung)) ajax_data.bemerkung = null;

    Schnittstelle_AjaxInDieSchlange(
        LISTEN[data.checkliste].controller + "/ajax_" + LISTEN[data.checkliste].element + "_speichern",
        ajax_data,
        ajax_dom,
        function (AJAX) {
            // bereits vorhandene identische Einträge in der Checkliste werden gelöscht
            $.each(
                Schnittstelle_VariableRausZurueck(
                    "zugeordnete_" + LISTEN[data.checkliste].element + "_ids",
                    AJAX.data[LISTEN[AJAX.data.gegen_liste].element + "_id"],
                    AJAX.data.gegen_liste,
                    new Array()
                ),
                function (position, checkliste_element_id) {
                    if (
                        Schnittstelle_VariableRausZurueck(
                            LISTEN[AJAX.data.liste].element + "_id",
                            checkliste_element_id,
                            AJAX.data.checkliste,
                            undefined
                        ) === AJAX.data[LISTEN[AJAX.data.liste].element + "_id"]
                    )
                        Schnittstelle_VariableLoeschen(checkliste_element_id, AJAX.data.checkliste);
                }
            );

            // falls der Haken gesetzt wurde, wird ein neuer Eintrag hinzugefügt
            if (AJAX.data.status > 0) {
                if (typeof AJAX.antwort[LISTEN[AJAX.data.checkliste].element + "_id"] !== "undefined")
                    AJAX.data.id = Number(AJAX.antwort[LISTEN[AJAX.data.checkliste].element + "_id"]);
                else AJAX.data.id = LISTEN[AJAX.data.checkliste].tabelle.length + 1;
                const checkliste_element_id = AJAX.data.id;

                $.each(AJAX.data, function (eigenschaft, wert) {
                    if (
                        eigenschaft != "ajax_id" &&
                        eigenschaft != CSRF_NAME &&
                        eigenschaft != "liste" &&
                        eigenschaft != "gegen_liste" &&
                        eigenschaft != "checkliste"
                    )
                        Schnittstelle_VariableRein(wert, eigenschaft, checkliste_element_id, AJAX.data.checkliste);
                });
            }

            Schnittstelle_EventVariableUpdLocalstorage(AJAX.data.checkliste);
            Schnittstelle_EventLocalstorageUpdVariable(AJAX.data.checkliste);
            Schnittstelle_VariableElementZuordnen(AJAX.data.checkliste);
            Schnittstelle_VariableElementErgaenzen(AJAX.data.checkliste);
            Schnittstelle_EventVariableUpdDom(AJAX.data.checkliste);
        },
        function (AJAX) {
            if (isString(AJAX.antwort.validation)) Schnittstelle_DomToastFeuern(AJAX.antwort.validation, "danger");
            Schnittstelle_DomToastFeuern(
                Liste_ElementBeschriftungZurueck(AJAX.data.id, AJAX.data.checkliste) + " konnte nicht gespeichert werden.",
                "danger"
            );
        }
    );
}
