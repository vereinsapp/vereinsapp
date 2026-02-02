function Strafkatalog_StrafeAendern(formular_oeffnen, dom, data, title, strafe_id) {
    if (typeof strafe_id !== "undefined") strafe_id = Number(strafe_id);

    if (formular_oeffnen) {
        const $neues_modal = Schnittstelle_Dom$NeuesModalInitialisiertZurueck(title, "strafe_basiseigenschaften");
        Schnittstelle_Dom$ModalOeffnen($neues_modal);
        Liste_Element$FormularInitialisieren($neues_modal.find(".formular"), "aendern", strafe_id, "strafkatalog");
    } else {
        const ajax_dom = dom;

        if (!("titel" in data)) data.titel = Schnittstelle_VariableRausZurueck("titel", strafe_id, "strafkatalog", undefined);
        if (!("wert" in data)) data.wert = Schnittstelle_VariableRausZurueck("wert", strafe_id, "strafkatalog", undefined);
        if (!("kategorie" in data)) data.kategorie = Schnittstelle_VariableRausZurueck("kategorie", strafe_id, "strafkatalog", undefined);
        if (!("bemerkung" in data)) data.bemerkung = Schnittstelle_VariableRausZurueck("bemerkung", strafe_id, "strafkatalog", null);
        const ajax_data = Schnittstelle_VariableWertBereinigtZurueck(data, new Object());
        ajax_data.strafe_id = strafe_id;
        if (isEmptyString(ajax_data.bemerkung)) ajax_data.bemerkung = null;

        Schnittstelle_AjaxInDieSchlange(
            "strafkatalog/ajax_strafe_speichern",
            ajax_data,
            ajax_dom,
            function (AJAX) {
                const strafe_id = AJAX.data.strafe_id;
                delete AJAX.data.strafe_id;

                $.each(AJAX.data, function (eigenschaft, wert) {
                    Schnittstelle_VariableRein(wert, eigenschaft, strafe_id, "strafkatalog");
                });

                Schnittstelle_EventVariableUpdLocalstorage("strafkatalog");
                Schnittstelle_EventLocalstorageUpdVariable("strafkatalog");
                // Schnittstelle_VariableElementZuordnen("strafkatalog");
                // Schnittstelle_VariableElementErgaenzen("strafkatalog");
                Schnittstelle_EventVariableUpdDom("strafkatalog");

                if ("dom" in AJAX && "$modal" in AJAX.dom && AJAX.dom.$modal.exists()) {
                    Schnittstelle_Dom$ModalSchliessen(AJAX.dom.$modal);
                    Schnittstelle_DomToastFeuern(Liste_ElementBeschriftungZurueck(strafe_id, "strafkatalog") + " wurde erfolgreich geändert.");
                }
            },
            function (AJAX) {
                if (isString(AJAX.antwort.validation)) Schnittstelle_DomToastFeuern(AJAX.antwort.validation, "danger");
                else if ("dom" in AJAX && "$formular" in AJAX.dom && AJAX.dom.$formular.exists())
                    Liste_Element$FormularValidationAktualisieren(AJAX.dom.$formular, AJAX.antwort.validation);
                Schnittstelle_DomToastFeuern(
                    Liste_ElementBeschriftungZurueck(AJAX.data.strafe_id, "strafkatalog") + " konnte nicht gespeichert werden.",
                    "danger",
                );
            },
        );
    }
}
