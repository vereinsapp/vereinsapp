function Mitglieder_MitgliedErstellen(formular_oeffnen, dom, data, modal_title, mitglied_id) {
    if (formular_oeffnen) {
        const $neues_modal = Schnittstelle_Dom$NeuesModalInitialisiertZurueck(modal_title, "mitglied_basiseigenschaften");
        Schnittstelle_Dom$ModalOeffnen($neues_modal);
        const $neues_formular = $neues_modal.find(".formular");
        $neues_formular.attr("data-werkzeug", "mitglied_erstellen").attr("data-liste", "mitglieder").attr("data-mitglied_id", mitglied_id);
        if ("$ausloesend" in dom && dom.$ausloesend.exists() && dom.$ausloesend.attr("data-werkzeug") in WERKZEUGE)
            $neues_formular.attr("data-werkzeug", dom.$ausloesend.attr("data-werkzeug"));
        Liste_Element$FormularInitialisieren($neues_formular);
    } else {
        const ajax_dom = dom;
        const ajax_data = Schnittstelle_VariableWertBereinigtZurueck(data, new Object());
        if (isLuxonDateTime(ajax_data.geburt)) ajax_data.geburt = ajax_data.geburt.toISO();
        if (!("bemerkung" in ajax_data) || isEmptyString(ajax_data.bemerkung)) ajax_data.bemerkung = null;

        Schnittstelle_AjaxInDieSchlange(
            "mitglieder/ajax_mitglied_speichern",
            ajax_data,
            ajax_dom,
            function (AJAX) {
                if (typeof AJAX.antwort.mitglied_id !== "undefined") AJAX.data.mitglied_id = Number(AJAX.antwort.mitglied_id);
                else AJAX.data.mitglied_id = LISTEN.mitglieder.tabelle.length + 1;
                const mitglied_id = AJAX.data.mitglied_id;
                delete AJAX.data.mitglied_id;

                Schnittstelle_VariableRein(mitglied_id, "id", mitglied_id, "mitglieder");
                $.each(AJAX.data, function (eigenschaft, wert) {
                    Schnittstelle_VariableRein(wert, eigenschaft, mitglied_id, "mitglieder");
                });

                Schnittstelle_EventVariableUpdLocalstorage("mitglieder");
                Schnittstelle_EventLocalstorageUpdVariable("mitglieder");
                // Schnittstelle_VariableElementZuordnen("mitglieder");
                Schnittstelle_VariableElementErgaenzen("mitglieder");
                Schnittstelle_EventVariableUpdDom("mitglieder");

                if ("dom" in AJAX && "$modal" in AJAX.dom && AJAX.dom.$modal.exists()) Schnittstelle_Dom$ModalSchliessen(AJAX.dom.$modal);
                Schnittstelle_DomToastFeuern(
                    Liste_ElementTextMitBeschriftungErsetztZurueck("{mitglieder} wurde erfolgreich erstellt.", { mitglied_id: mitglied_id }),
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
