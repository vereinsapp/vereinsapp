function Mitglieder_MitgliedAendern(formular_oeffnen, dom, data, title, mitglied_id) {
    if (formular_oeffnen) {
        const $neues_modal = Schnittstelle_Dom$NeuesModalInitialisiertZurueck(title, "mitglied_basiseigenschaften");
        Schnittstelle_Dom$ModalOeffnen($neues_modal);
        const $neues_formular = $neues_modal.find(".formular");
        $neues_formular.attr("data-werkzeug", "mitglied_aendern").attr("data-liste", "mitglieder").attr("data-mitglied_id", mitglied_id);
        Liste_Element$FormularInitialisieren($neues_formular);
    } else {
        const ajax_dom = dom;

        if (!("email" in data)) data.email = Schnittstelle_VariableRausZurueck("email", mitglied_id, "mitglieder", undefined);
        if (!("vorname" in data)) data.vorname = Schnittstelle_VariableRausZurueck("vorname", mitglied_id, "mitglieder", undefined);
        if (!("nachname" in data)) data.nachname = Schnittstelle_VariableRausZurueck("nachname", mitglied_id, "mitglieder", undefined);
        if (!("geburt" in data)) data.geburt = Schnittstelle_VariableRausZurueck("geburt", mitglied_id, "mitglieder", undefined);
        if (!("postleitzahl" in data)) data.postleitzahl = Schnittstelle_VariableRausZurueck("postleitzahl", mitglied_id, "mitglieder", undefined);
        if (!("wohnort" in data)) data.wohnort = Schnittstelle_VariableRausZurueck("wohnort", mitglied_id, "mitglieder", undefined);
        if (!("geschlecht" in data)) data.geschlecht = Schnittstelle_VariableRausZurueck("geschlecht", mitglied_id, "mitglieder", undefined);
        if (!("register" in data)) data.register = Schnittstelle_VariableRausZurueck("register", mitglied_id, "mitglieder", undefined);
        if (!("auto" in data)) data.auto = Schnittstelle_VariableRausZurueck("auto", mitglied_id, "mitglieder", undefined);
        if (!("funktion" in data)) data.funktion = Schnittstelle_VariableRausZurueck("funktion", mitglied_id, "mitglieder", undefined);
        if (!("vorstandschaft_janein" in data))
            data.vorstandschaft_janein = Schnittstelle_VariableRausZurueck("vorstandschaft_janein", mitglied_id, "mitglieder", undefined);
        if (!("aktiv_janein" in data))
            data.aktiv_janein = Number(Schnittstelle_VariableRausZurueck("aktiv_janein", mitglied_id, "mitglieder", undefined));
        if (!("real_janein" in data))
            data.real_janein = Number(Schnittstelle_VariableRausZurueck("real_janein", mitglied_id, "mitglieder", undefined));
        if (!("bemerkung" in data)) data.bemerkung = Schnittstelle_VariableRausZurueck("bemerkung", mitglied_id, "mitglieder", null);
        const ajax_data = Schnittstelle_VariableWertBereinigtZurueck(data, new Object());
        ajax_data.mitglied_id = mitglied_id;
        if (isLuxonDateTime(ajax_data.geburt)) ajax_data.geburt = ajax_data.geburt.toISO();
        if (isEmptyString(ajax_data.bemerkung)) ajax_data.bemerkung = null;

        Schnittstelle_AjaxInDieSchlange(
            "mitglieder/ajax_mitglied_speichern",
            ajax_data,
            ajax_dom,
            function (AJAX) {
                const mitglied_id = AJAX.data.mitglied_id;
                delete AJAX.data.mitglied_id;

                $.each(AJAX.data, function (eigenschaft, wert) {
                    Schnittstelle_VariableRein(wert, eigenschaft, mitglied_id, "mitglieder");
                });

                Schnittstelle_EventVariableUpdLocalstorage("mitglieder");
                Schnittstelle_EventLocalstorageUpdVariable("mitglieder");
                // Schnittstelle_VariableElementZuordnen("mitglieder");
                Schnittstelle_VariableElementErgaenzen("mitglieder");
                Schnittstelle_EventVariableUpdDom("mitglieder");

                if ("dom" in AJAX && "$modal" in AJAX.dom && AJAX.dom.$modal.exists()) {
                    Schnittstelle_Dom$ModalSchliessen(AJAX.dom.$modal);
                    Schnittstelle_DomToastFeuern(
                        Liste_ElementTextMitBeschriftungErsetztZurueck("{mitglieder} wurde erfolgreich geändert.", { mitglied_id: mitglied_id }),
                    );
                }
            },
            function (AJAX) {
                if (isString(AJAX.antwort.validation)) Schnittstelle_DomToastFeuern(AJAX.antwort.validation, "danger");
                else if ("dom" in AJAX && "$formular" in AJAX.dom && AJAX.dom.$formular.exists())
                    Liste_Element$FormularValidationAktualisieren(AJAX.dom.$formular, AJAX.antwort.validation);
                Schnittstelle_DomToastFeuern(
                    Liste_ElementTextMitBeschriftungErsetztZurueck("{mitglieder} konnte nicht gespeichert werden.", {
                        mitglied_id: AJAX.data.mitglied_id,
                    }),
                    "danger",
                );
            },
        );
    }
}
