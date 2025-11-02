function Liste_CheckAendern(dom, data) {
    if ("element_id" in data && data.element_id !== "undefined") data.element_id = Number(data.element_id);
    if ("gegen_element_id" in data && data.gegen_element_id !== "undefined") data.gegen_element_id = Number(data.gegen_element_id);
    if ("status" in data && data.status !== "undefined") data.status = Number(data.status);

    Schnittstelle_CheckWartenStart(dom.$check);

    const ajax_dom = dom;
    const ajax_data = Schnittstelle_VariableWertBereinigtZurueck(data, new Object());
    ajax_data[LISTEN[data.liste].element + "_id"] = data.element_id;
    ajax_data[LISTEN[data.gegen_liste].element + "_id"] = data.gegen_element_id;

    Schnittstelle_AjaxInDieSchlange(
        LISTEN[data.checkliste].controller + "/ajax_" + LISTEN[data.checkliste].element + "_speichern",
        ajax_data,
        ajax_dom,
        function (AJAX) {
            // bereits vorhandene identische Einträge in der Checkliste werden gelöscht
            $.each(
                Schnittstelle_VariableRausZurueck("zugeordnete_element_ids_nach_liste", AJAX.data.gegen_element_id, AJAX.data.gegen_liste, {
                    [AJAX.data.checkliste]: new Array(),
                })[AJAX.data.checkliste],
                function (position, checkliste_element_id) {
                    if (
                        Schnittstelle_VariableRausZurueck(
                            LISTEN[AJAX.data.liste].element + "_id",
                            checkliste_element_id,
                            AJAX.data.checkliste,
                            undefined
                        ) === AJAX.data.element_id
                    )
                        Schnittstelle_VariableLoeschen(checkliste_element_id, AJAX.data.checkliste);
                }
            );

            // falls der Haken gesetzt wurde, wird ein neuer Eintrag hinzugefügt
            if (AJAX.data.status > 0) {
                if (typeof AJAX.antwort[LISTEN[AJAX.data.checkliste].element + "_id"] !== "undefined")
                    AJAX.data.id = Number(AJAX.antwort[LISTEN[AJAX.data.checkliste].element + "_id"]);
                else AJAX.data.id = LISTEN[AJAX.data.checkliste].tabelle.length + 1;

                $.each(AJAX.data, function (eigenschaft, wert) {
                    if (
                        eigenschaft != "ajax_id" &&
                        eigenschaft != CSRF_NAME &&
                        eigenschaft != "liste" &&
                        eigenschaft != "element_id" &&
                        eigenschaft != "gegen_liste" &&
                        eigenschaft != "gegen_element_id" &&
                        eigenschaft != "checkliste"
                    )
                        Schnittstelle_VariableRein(wert, eigenschaft, AJAX.data.id, AJAX.data.checkliste);
                });
            }

            Schnittstelle_EventVariableUpdLocalstorage(AJAX.data.checkliste);
            Schnittstelle_EventLocalstorageUpdVariable(AJAX.data.checkliste);
            Schnittstelle_VariableElementZuordnen(AJAX.data.checkliste);
            Schnittstelle_VariableElementErgaenzen(AJAX.data.checkliste);
            Schnittstelle_EventVariableUpdDom(AJAX.data.checkliste);

            if ("dom" in AJAX && "$check" in AJAX.dom && AJAX.dom.$check.exists()) Schnittstelle_CheckWartenEnde(AJAX.dom.$check);
        },
        function (AJAX) {
            if ("dom" in AJAX && "$check" in AJAX.dom && AJAX.dom.$check.exists()) Schnittstelle_CheckWartenEnde(AJAX.dom.$check);
            if (isString(AJAX.antwort.validation)) Schnittstelle_DomToastFeuern(AJAX.antwort.validation, "danger");
            Schnittstelle_DomToastFeuern(
                Liste_ElementBeschriftungZurueck(AJAX.data.id, AJAX.data.checkliste) + " konnte nicht gespeichert werden.",
                "danger"
            );
        }
    );
}
