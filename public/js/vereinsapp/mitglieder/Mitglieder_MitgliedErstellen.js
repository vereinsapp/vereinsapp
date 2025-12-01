function Mitglieder_MitgliedErstellen(formular_oeffnen, dom, data, title, mitglied_id) {
    if (typeof mitglied_id !== "undefined") mitglied_id = Number(mitglied_id);

    if (formular_oeffnen) {
        const $neues_modal = Schnittstelle_DomNeuesModalInitialisiertZurueck(title, "mitglied_basiseigenschaften");
        Schnittstelle_DomModalOeffnen($neues_modal);
        Liste_ElementFormularInitialisieren($neues_modal.find(".formular"), "erstellen", mitglied_id, "mitglieder");
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
                if (typeof AJAX.antwort.mitglied_id !== "undefined") AJAX.data.id = Number(AJAX.antwort.mitglied_id);
                else AJAX.data.id = LISTEN["mitglieder"].tabelle.length + 1;
                const mitglied_id = AJAX.data.id;

                $.each(AJAX.data, function (eigenschaft, wert) {
                    if (eigenschaft != "ajax_id" && eigenschaft != CSRF_NAME)
                        Schnittstelle_VariableRein(wert, eigenschaft, mitglied_id, "mitglieder");
                });

                Schnittstelle_EventVariableUpdLocalstorage("mitglieder");
                Schnittstelle_EventLocalstorageUpdVariable("mitglieder");
                // Schnittstelle_VariableElementZuordnen("mitglieder");
                Schnittstelle_VariableElementErgaenzen("mitglieder");
                Schnittstelle_EventVariableUpdDom("mitglieder");

                if ("dom" in AJAX && "$modal" in AJAX.dom && AJAX.dom.$modal.exists()) Schnittstelle_DomModalSchliessen(AJAX.dom.$modal);
                Schnittstelle_DomToastFeuern(Liste_ElementBeschriftungZurueck(mitglied_id, "mitglieder") + " wurde erfolgreich erstellt.");
            },
            function (AJAX) {
                if (isString(AJAX.antwort.validation)) Schnittstelle_DomToastFeuern(AJAX.antwort.validation, "danger");
                else if ("dom" in AJAX && "$formular" in AJAX.dom && AJAX.dom.$formular.exists())
                    Liste_ElementFormularValidationAktualisieren(AJAX.dom.$formular, AJAX.antwort.validation);
            }
        );
    }
}
