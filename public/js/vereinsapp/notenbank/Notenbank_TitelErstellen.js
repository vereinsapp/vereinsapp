function Notenbank_TitelErstellen(formular_oeffnen, dom, data, title, titel_id) {
    if (typeof titel_id !== "undefined") titel_id = Number(titel_id);

    if (formular_oeffnen) {
        const $neues_modal = Schnittstelle_DomNeuesModalInitialisiertZurueck(title, "titel_basiseigenschaften");
        Schnittstelle_DomModalOeffnen($neues_modal);
        Liste_ElementFormularInitialisieren($neues_modal.find(".formular"), "erstellen", titel_id, "notenbank");
    } else {
        const ajax_dom = dom;
        const ajax_data = Schnittstelle_VariableWertBereinigtZurueck(data, new Object());
        if (!("komponist" in ajax_data) || isEmptyString(ajax_data.komponist)) ajax_data.komponist = null;
        if (!("bemerkung" in ajax_data) || isEmptyString(ajax_data.bemerkung)) ajax_data.bemerkung = null;

        Schnittstelle_AjaxInDieSchlange(
            "notenbank/ajax_titel_speichern",
            ajax_data,
            ajax_dom,
            function (AJAX) {
                if (typeof AJAX.antwort.titel_id !== "undefined") AJAX.data.id = Number(AJAX.antwort.titel_id);
                else AJAX.data.id = LISTEN["notenbank"].tabelle.length + 1;
                const titel_id = AJAX.data.id;

                $.each(AJAX.data, function (eigenschaft, wert) {
                    if (eigenschaft != "ajax_id" && eigenschaft != CSRF_NAME) Schnittstelle_VariableRein(wert, eigenschaft, titel_id, "notenbank");
                });

                Schnittstelle_EventVariableUpdLocalstorage("notenbank");
                Schnittstelle_EventLocalstorageUpdVariable("notenbank");
                // Schnittstelle_VariableElementZuordnen("notenbank");
                Schnittstelle_VariableElementErgaenzen("notenbank");
                Schnittstelle_EventVariableUpdDom("notenbank");

                if ("dom" in AJAX && "$modal" in AJAX.dom && AJAX.dom.$modal.exists()) Schnittstelle_DomModalSchliessen(AJAX.dom.$modal);
                Schnittstelle_DomToastFeuern(Liste_ElementBeschriftungZurueck(titel_id, "notenbank") + " wurde erfolgreich erstellt.");
            },
            function (AJAX) {
                if (isString(AJAX.antwort.validation)) Schnittstelle_DomToastFeuern(AJAX.antwort.validation, "danger");
                else if ("dom" in AJAX && "$formular" in AJAX.dom && AJAX.dom.$formular.exists())
                    Liste_ElementFormularValidationAktualisieren(AJAX.dom.$formular, AJAX.antwort.validation);
            }
        );
    }
}
