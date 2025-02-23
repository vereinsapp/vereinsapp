function Mitglieder_MitgliedAendern(formular_oeffnen, dom, data, title, mitglied_id) {
    if (typeof mitglied_id !== "undefined") mitglied_id = Number(mitglied_id);

    if (formular_oeffnen) {
        const $neues_modal = Schnittstelle_DomNeuesModalInitialisiertZurueck(title, "mitglied_basiseigenschaften");
        Schnittstelle_DomModalOeffnen($neues_modal);
        Liste_ElementFormularInitialisieren($neues_modal.find(".formular"), "aendern", mitglied_id, "mitglieder");
    } else {
        if (!dom.$btn_ausloesend.hasClass("element")) Schnittstelle_BtnWartenStart(dom.$btn_ausloesend);

        const ajax_dom = dom;
        const ajax_data = data;
        ajax_data.id = mitglied_id;
        if (!("email" in data)) data.email = Schnittstelle_VariableRausZurueck("email", mitglied_id, "mitglieder");
        if (!("vorname" in data)) data.vorname = Schnittstelle_VariableRausZurueck("vorname", mitglied_id, "mitglieder");
        if (!("nachname" in data)) data.nachname = Schnittstelle_VariableRausZurueck("nachname", mitglied_id, "mitglieder");
        if (!("geburt" in data)) data.geburt = Schnittstelle_VariableRausZurueck("geburt", mitglied_id, "mitglieder");
        if (!("postleitzahl" in data)) data.postleitzahl = Schnittstelle_VariableRausZurueck("postleitzahl", mitglied_id, "mitglieder");
        if (!("wohnort" in data)) data.wohnort = Schnittstelle_VariableRausZurueck("wohnort", mitglied_id, "mitglieder");
        if (!("geschlecht" in data)) data.geschlecht = Schnittstelle_VariableRausZurueck("geschlecht", mitglied_id, "mitglieder");
        if (!("register" in data)) data.register = Schnittstelle_VariableRausZurueck("register", mitglied_id, "mitglieder");
        if (!("auto" in data)) data.auto = Schnittstelle_VariableRausZurueck("auto", mitglied_id, "mitglieder");
        if (!("funktion" in data)) data.funktion = Schnittstelle_VariableRausZurueck("funktion", mitglied_id, "mitglieder");
        if (!("vorstandschaft" in data)) data.vorstandschaft = Schnittstelle_VariableRausZurueck("vorstandschaft", mitglied_id, "mitglieder");
        if (!("aktiv" in data)) data.aktiv = Schnittstelle_VariableRausZurueck("aktiv", mitglied_id, "mitglieder");

        Schnittstelle_AjaxInDieSchlange(
            "mitglieder/ajax_mitglied_speichern",
            ajax_data,
            ajax_dom,
            function (AJAX) {
                const mitglied_id = AJAX.data.id;
                $.each(AJAX.data, function (eigenschaft, wert) {
                    if (eigenschaft != "ajax_id" && eigenschaft != CSRF_NAME)
                        Schnittstelle_VariableRein(wert, eigenschaft, mitglied_id, "mitglieder");
                });
                Schnittstelle_EventAusfuehren(
                    [Schnittstelle_EventVariableUpdLocalstorage, Schnittstelle_EventLocalstorageUpdVariable, Schnittstelle_EventVariableUpdDom],
                    { liste: "mitglieder" }
                );

                if ("dom" in AJAX && "$btn_ausloesend" in AJAX.dom && AJAX.dom.$btn_ausloesend.exists() && !dom.$btn_ausloesend.hasClass("element"))
                    Schnittstelle_BtnWartenEnde(AJAX.dom.$btn_ausloesend);
                if ("dom" in AJAX && "$modal" in AJAX.dom && AJAX.dom.$modal.exists()) {
                    Schnittstelle_DomModalSchliessen(AJAX.dom.$modal);
                    Schnittstelle_DomToastFeuern(Liste_ElementBeschriftungZurueck(mitglied_id, "mitglieder") + " wurde erfolgreich geändert.");
                }
            },
            function (AJAX) {
                if ("dom" in AJAX && "$btn_ausloesend" in AJAX.dom && AJAX.dom.$btn_ausloesend.exists() && !dom.$btn_ausloesend.hasClass("element"))
                    Schnittstelle_BtnWartenEnde(AJAX.dom.$btn_ausloesend);
                if (isString(AJAX.antwort.validation)) Schnittstelle_DomToastFeuern(AJAX.antwort.validation, "danger");
                else if ("dom" in AJAX && "$formular" in AJAX.dom && AJAX.dom.$formular.exists())
                    Liste_ElementFormularValidationAktualisieren(AJAX.dom.$formular, AJAX.antwort.validation);
                Schnittstelle_DomToastFeuern(
                    Liste_ElementBeschriftungZurueck(AJAX.data.id, "mitglieder") + " konnte nicht gespeichert werden.",
                    "danger"
                );
            }
        );
    }
}
