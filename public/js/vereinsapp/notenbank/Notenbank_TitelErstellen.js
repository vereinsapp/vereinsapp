function Notenbank_TitelErstellen(formular_oeffnen, dom, data, modal_title, titel_id) {
    if (formular_oeffnen) {
        const $neues_modal = Schnittstelle_Dom$NeuesModalInitialisiertZurueck(modal_title, "titel_basiseigenschaften");
        Schnittstelle_Dom$ModalOeffnen($neues_modal);
        const $neues_formular = $neues_modal.find(".formular");
        $neues_formular.attr("data-werkzeug", "titel_erstellen").attr("data-liste", "notenbank").attr("data-titel_id", titel_id);
        if ("$ausloesend" in dom && dom.$ausloesend.exists() && dom.$ausloesend.attr("data-werkzeug") in WERKZEUGE)
            $neues_formular.attr("data-werkzeug", dom.$ausloesend.attr("data-werkzeug"));
        Liste_Element$FormularInitialisieren($neues_formular);
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
                if (typeof AJAX.antwort.titel_id !== "undefined") AJAX.data.titel_id = Number(AJAX.antwort.titel_id);
                else AJAX.data.titel_id = LISTEN.notenbank.tabelle.length + 1;
                const titel_id = AJAX.data.titel_id;
                delete AJAX.data.titel_id;

                Schnittstelle_VariableRein(titel_id, "id", titel_id, "notenbank");
                $.each(AJAX.data, function (eigenschaft, wert) {
                    Schnittstelle_VariableRein(wert, eigenschaft, titel_id, "notenbank");
                });

                Schnittstelle_EventVariableUpdLocalstorage("notenbank");
                Schnittstelle_EventLocalstorageUpdVariable("notenbank");
                // Schnittstelle_VariableElementZuordnen("notenbank");
                Schnittstelle_VariableElementErgaenzen("notenbank");
                Schnittstelle_EventVariableUpdDom("notenbank");

                if ("dom" in AJAX && "$modal" in AJAX.dom && AJAX.dom.$modal.exists()) Schnittstelle_Dom$ModalSchliessen(AJAX.dom.$modal);
                Schnittstelle_DomToastFeuern(
                    Liste_ElementTextMitBeschriftungErsetztZurueck("{notenbank} wurde erfolgreich erstellt.", { titel_id: titel_id }),
                );
            },
            function (AJAX) {
                if (isString(AJAX.antwort.validation)) Schnittstelle_DomToastFeuern(AJAX.antwort.validation, "danger");
                else if ("dom" in AJAX && "$formular" in AJAX.dom && AJAX.dom.$formular.exists())
                    Liste_Element$FormularValidationAktualisieren(AJAX.dom.$formular, AJAX.antwort.validation);
            },
        );
    }
}
