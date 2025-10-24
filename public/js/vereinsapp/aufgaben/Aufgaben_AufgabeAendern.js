function Aufgaben_AufgabeAendern(formular_oeffnen, dom, data, title, aufgabe_id) {
    if (typeof aufgabe_id !== "undefined") aufgabe_id = Number(aufgabe_id);
    // else aufgabe_id = undefined;

    if (formular_oeffnen) {
        const $neues_modal = Schnittstelle_DomNeuesModalInitialisiertZurueck(title, "aufgabe_basiseigenschaften");
        Schnittstelle_DomModalOeffnen($neues_modal);
        Liste_ElementFormularInitialisieren($neues_modal.find(".formular"), "aendern", aufgabe_id, "aufgaben");
    } else {
        if (!dom.$btn_ausloesend.hasClass("element")) Schnittstelle_BtnWartenStart(dom.$btn_ausloesend);

        const ajax_dom = dom;

        if (typeof data.zugeordnete_liste === "undefined" || ("zugeordnete_liste" in data && data.zugeordnete_liste == ""))
            data.zugeordnete_liste = null;
        if (typeof data.zugeordnete_element_id === "undefined" || ("zugeordnete_element_id" in data && data.zugeordnete_element_id == ""))
            data.zugeordnete_element_id = null;
        if (!("titel" in data)) data.titel = Schnittstelle_VariableRausZurueck("titel", aufgabe_id, "aufgaben", undefined);
        if (typeof data.mitglied_id === "undefined") data.mitglied_id = null;
        if (typeof data.erledigt === "undefined") data.erledigt = null;
        if (!("bemerkung" in data)) data.bemerkung = Schnittstelle_VariableRausZurueck("bemerkung", aufgabe_id, "aufgaben", null);
        const ajax_data = Schnittstelle_VariableWertBereinigtZurueck(data, new Object());
        ajax_data.id = aufgabe_id;
        if (isLuxonDateTime(ajax_data.erledigt)) ajax_data.erledigt = ajax_data.erledigt.toISO();

        Schnittstelle_AjaxInDieSchlange(
            "aufgaben/ajax_aufgabe_speichern",
            ajax_data,
            ajax_dom,
            function (AJAX) {
                const aufgabe_id = AJAX.data.id;
                $.each(AJAX.data, function (eigenschaft, wert) {
                    if (eigenschaft != "ajax_id" && eigenschaft != CSRF_NAME) Schnittstelle_VariableRein(wert, eigenschaft, aufgabe_id, "aufgaben");
                });

                Schnittstelle_EventVariableUpdLocalstorage("aufgaben");
                Schnittstelle_EventLocalstorageUpdVariable("aufgaben");
                // Schnittstelle_VariableElementZuordnen("aufgaben");
                Schnittstelle_VariableElementErgaenzen("aufgaben");
                Schnittstelle_EventVariableUpdDom("aufgaben");

                if ("dom" in AJAX && "$btn_ausloesend" in AJAX.dom && AJAX.dom.$btn_ausloesend.exists() && !dom.$btn_ausloesend.hasClass("element"))
                    Schnittstelle_BtnWartenEnde(AJAX.dom.$btn_ausloesend);
                if ("dom" in AJAX && "$modal" in AJAX.dom && AJAX.dom.$modal.exists()) {
                    Schnittstelle_DomModalSchliessen(AJAX.dom.$modal);
                    Schnittstelle_DomToastFeuern(Liste_ElementBeschriftungZurueck(aufgabe_id, "aufgaben") + " wurde erfolgreich geändert.");
                }
            },
            function (AJAX) {
                if ("dom" in AJAX && "$btn_ausloesend" in AJAX.dom && AJAX.dom.$btn_ausloesend.exists() && !dom.$btn_ausloesend.hasClass("element"))
                    Schnittstelle_BtnWartenEnde(AJAX.dom.$btn_ausloesend);
                if (isString(AJAX.antwort.validation)) Schnittstelle_DomToastFeuern(AJAX.antwort.validation, "danger");
                else if ("dom" in AJAX && "$formular" in AJAX.dom && AJAX.dom.$formular.exists())
                    Liste_ElementFormularValidationAktualisieren(AJAX.dom.$formular, AJAX.antwort.validation);
                Schnittstelle_DomToastFeuern(
                    Liste_ElementBeschriftungZurueck(AJAX.data.id, "aufgaben") + " konnte nicht gespeichert werden.",
                    "danger"
                );
            }
        );
    }
}
