function Aufgaben_AufgabeErstellen(formular_oeffnen, dom, data, title, aufgabe_id) {
    if (typeof aufgabe_id !== "undefined") aufgabe_id = Number(aufgabe_id);

    if (formular_oeffnen) {
        const $neues_modal = Schnittstelle_DomNeuesModalInitialisiertZurueck(title, "aufgabe_basiseigenschaften");
        Schnittstelle_DomModalOeffnen($neues_modal);
        Liste_ElementFormularInitialisieren($neues_modal.find(".formular"), "erstellen", aufgabe_id, "aufgaben");
    } else {
        if (!dom.$btn_ausloesend.hasClass("element")) Schnittstelle_BtnWartenStart(dom.$btn_ausloesend);

        const ajax_dom = dom;
        const ajax_data = data;
        if ("zugeordnete_liste" in data && (typeof data.zugeordnete_liste === "undefined" || data.zugeordnete_liste == ""))
            data.zugeordnete_liste = null;
        if (("zugeordnete_element_id" in data && typeof data.zugeordnete_element_id === "undefined") || data.zugeordnete_element_id == "")
            data.zugeordnete_element_id = null;

        Schnittstelle_AjaxInDieSchlange(
            "aufgaben/ajax_aufgabe_speichern",
            ajax_data,
            ajax_dom,
            function (AJAX) {
                if ("aufgabe_id" in AJAX.antwort && typeof AJAX.antwort.aufgabe_id !== "undefined") AJAX.data.id = Number(AJAX.antwort.aufgabe_id);
                else AJAX.data.id = Number(LISTEN["aufgaben"].tabelle.length + 1);
                const aufgabe_id = AJAX.data.id;

                LISTEN["aufgaben"].tabelle[aufgabe_id] = new Object();
                $.each(AJAX.data, function (eigenschaft, wert) {
                    if (eigenschaft != "ajax_id" && eigenschaft != CSRF_NAME) Schnittstelle_VariableRein(wert, eigenschaft, aufgabe_id, "aufgaben");
                });
                Schnittstelle_VariableRein(null, "element_id", aufgabe_id, "aufgaben");
                Schnittstelle_VariableRein(null, "mitglied_id", aufgabe_id, "aufgaben");
                Schnittstelle_VariableRein(null, "erledigt", aufgabe_id, "aufgaben");
                Schnittstelle_VariableRein(DateTime.now(), "erstellung", aufgabe_id, "aufgaben");
                Schnittstelle_EventAusfuehren(
                    [Schnittstelle_EventVariableUpdLocalstorage, Schnittstelle_EventLocalstorageUpdVariable, Schnittstelle_EventVariableUpdDom],
                    { liste: "aufgaben" }
                );

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
