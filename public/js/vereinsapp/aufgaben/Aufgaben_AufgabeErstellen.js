function Aufgaben_AufgabeErstellen(formular_oeffnen, dom, data, title, aufgabe_id) {
    if (typeof aufgabe_id !== "undefined") aufgabe_id = Number(aufgabe_id);
    // else aufgabe_id = undefined;

    if (formular_oeffnen) {
        const $neues_modal = Schnittstelle_DomNeuesModalInitialisiertZurueck(title, "aufgabe_basiseigenschaften");
        Schnittstelle_DomModalOeffnen($neues_modal);
        Liste_ElementFormularInitialisieren($neues_modal.find(".formular"), "erstellen", aufgabe_id, "aufgaben");
    } else {
        if (!dom.$btn_ausloesend.hasClass("element")) Schnittstelle_BtnWartenStart(dom.$btn_ausloesend);

        const ajax_dom = dom;

        if (typeof data.zugeordnete_liste === "undefined" || ("zugeordnete_liste" in data && data.zugeordnete_liste == ""))
            data.zugeordnete_liste = null;
        if (typeof data.zugeordnete_element_id === "undefined" || ("zugeordnete_element_id" in data && data.zugeordnete_element_id == ""))
            data.zugeordnete_element_id = null;
        const ajax_data = Schnittstelle_VariableWertBereinigtZurueck(data, new Object());
        ajax_data.id = aufgabe_id;
        if (isLuxonDateTime(ajax_data.erledigt)) ajax_data.erledigt = ajax_data.erledigt.toISO();
        if (!("bemerkung" in ajax_data) || isEmptyString(ajax_data.bemerkung)) ajax_data.bemerkung = null;

        Schnittstelle_AjaxInDieSchlange(
            "aufgaben/ajax_aufgabe_speichern",
            ajax_data,
            ajax_dom,
            function (AJAX) {
                if (typeof AJAX.antwort.aufgabe_id !== "undefined") AJAX.data.id = Number(AJAX.antwort.aufgabe_id);
                else AJAX.data.id = LISTEN["aufgaben"].tabelle.length + 1;
                const aufgabe_id = AJAX.data.id;

                $.each(AJAX.data, function (eigenschaft, wert) {
                    if (eigenschaft != "ajax_id" && eigenschaft != CSRF_NAME) Schnittstelle_VariableRein(wert, eigenschaft, aufgabe_id, "aufgaben");
                });
                Schnittstelle_VariableRein(null, "element_id", aufgabe_id, "aufgaben");
                Schnittstelle_VariableRein(null, "mitglied_id", aufgabe_id, "aufgaben");
                Schnittstelle_VariableRein(null, "erledigt", aufgabe_id, "aufgaben");
                Schnittstelle_VariableRein(DATETIME.now(), "erstellung", aufgabe_id, "aufgaben");

                Schnittstelle_EventVariableUpdLocalstorage("aufgaben");
                Schnittstelle_EventLocalstorageUpdVariable("aufgaben");
                // Schnittstelle_VariableElementZuordnen("aufgaben");
                Schnittstelle_VariableElementErgaenzen("aufgaben");
                Schnittstelle_EventVariableUpdDom("aufgaben");

                if ("dom" in AJAX && "$btn_ausloesend" in AJAX.dom && AJAX.dom.$btn_ausloesend.exists() && !dom.$btn_ausloesend.hasClass("element"))
                    Schnittstelle_BtnWartenEnde(AJAX.dom.$btn_ausloesend);
                if ("dom" in AJAX && "$modal" in AJAX.dom && AJAX.dom.$modal.exists()) Schnittstelle_DomModalSchliessen(AJAX.dom.$modal);
                Schnittstelle_DomToastFeuern(Liste_ElementBeschriftungZurueck(aufgabe_id, "aufgaben") + " wurde erfolgreich erstellt.");
            },
            function (AJAX) {
                if ("dom" in AJAX && "$btn_ausloesend" in AJAX.dom && AJAX.dom.$btn_ausloesend.exists() && !dom.$btn_ausloesend.hasClass("element"))
                    Schnittstelle_BtnWartenEnde(AJAX.dom.$btn_ausloesend);
                if (isString(AJAX.antwort.validation)) Schnittstelle_DomToastFeuern(AJAX.antwort.validation, "danger");
                else if ("dom" in AJAX && "$formular" in AJAX.dom && AJAX.dom.$formular.exists())
                    Liste_ElementFormularValidationAktualisieren(AJAX.dom.$formular, AJAX.antwort.validation);
            }
        );
    }
}
