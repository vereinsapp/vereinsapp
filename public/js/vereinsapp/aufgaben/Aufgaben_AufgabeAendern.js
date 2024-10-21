function Aufgaben_AufgabeAendern(formular_oeffnen, dom, data, title, aufgabe_id) {
    if (typeof aufgabe_id !== "undefined") aufgabe_id = Number(aufgabe_id);

    if (formular_oeffnen) {
        const $neues_modal = Schnittstelle_DomNeuesModalInitialisiertZurueck(title, "aufgaben_basiseigenschaften");
        Liste_ElementFormularInitialisieren($neues_modal.find(".formular"), "aendern", aufgabe_id, "aufgaben");
        Schnittstelle_DomModalOeffnen($neues_modal);
    } else {
        Schnittstelle_BtnWartenStart(dom.$btn_ausloesend);

        const ajax_dom = dom;
        const ajax_data = data;
        ajax_data.id = aufgabe_id;
        // if (!("liste" in data)) data.liste = Schnittstelle_VariableRausZurueck("liste", aufgabe_id, "aufgaben");
        // if (!("element_id" in data)) data.element_id = Schnittstelle_VariableRausZurueck("element_id", aufgabe_id, "aufgaben");
        if (!("titel" in data)) data.titel = Schnittstelle_VariableRausZurueck("titel", aufgabe_id, "aufgaben");
        // if (!("mitglied_id_geplant" in data))
        //     data.mitglied_id_geplant = Schnittstelle_VariableRausZurueck("mitglied_id_geplant", aufgabe_id, "aufgaben");
        // if (!("mitglied_id_erledigt" in data))
        //     data.mitglied_id_erledigt = Schnittstelle_VariableRausZurueck("mitglied_id_erledigt", aufgabe_id, "aufgaben");
        // if (!("zeitpunkt_erledigt" in data))
        //     data.zeitpunkt_erledigt = Schnittstelle_VariableRausZurueck("zeitpunkt_erledigt", aufgabe_id, "aufgaben").toISO();
        if (!("bemerkung" in data)) data.bemerkung = Schnittstelle_VariableRausZurueck("bemerkung", aufgabe_id, "aufgaben");

        const neue_ajax_id = AJAXSCHLANGE.length;
        AJAXSCHLANGE[neue_ajax_id] = {
            ajax_id: neue_ajax_id,
            url: "aufgaben/ajax_aufgabe_speichern",
            data: ajax_data,
            liste: "aufgaben",
            dom: ajax_dom,
            rein_validation_pos_aktion: function (AJAX) {
                const aufgabe_id = AJAX.data.id;
                $.each(AJAX.data, function (eigenschaft, wert) {
                    if (eigenschaft != "ajax_id" && eigenschaft != CSRF_NAME) Schnittstelle_VariableRein(wert, eigenschaft, aufgabe_id, "aufgaben");
                });
                Schnittstelle_EventVariableUpdLocalstorage("aufgaben", [
                    Schnittstelle_EventLocalstorageUpdVariable,
                    Schnittstelle_EventVariableUpdDom,
                ]);

                if ("dom" in AJAX && "$btn_ausloesend" in AJAX.dom && AJAX.dom.$btn_ausloesend.exists())
                    Schnittstelle_BtnWartenEnde(AJAX.dom.$btn_ausloesend);
                if ("dom" in AJAX && "$modal" in AJAX.dom && AJAX.dom.$modal.exists()) {
                    Schnittstelle_DomModalSchliessen(AJAX.dom.$modal);
                    Schnittstelle_DomToastFeuern(Liste_ElementBeschriftungZurueck(aufgabe_id, "aufgaben") + " wurde erfolgreich geändert.");
                }
            },
            rein_validation_neg_aktion: function (AJAX) {
                if ("dom" in AJAX && "$btn_ausloesend" in AJAX.dom && AJAX.dom.$btn_ausloesend.exists())
                    Schnittstelle_BtnWartenEnde(AJAX.dom.$btn_ausloesend);
                if ("dom" in AJAX && "$formular" in AJAX.dom && AJAX.dom.$formular.exists())
                    Liste_ElementFormularValidationAktualisieren(AJAX.dom.$formular, AJAX.antwort.validation);
                else Schnittstelle_DomToastFeuern(Liste_ElementBeschriftungZurueck(AJAX.data.id, "aufgaben") + " konnte nicht gespeichert werden.");
            },
        };

        Schnittstelle_AjaxInDieSchlange(AJAXSCHLANGE[neue_ajax_id]);
    }
}
