function Strafkatalog_KassenbucheintragAendern(formular_oeffnen, dom, data, title, kassenbucheintrag_id) {
    if (typeof kassenbucheintrag_id !== "undefined") kassenbucheintrag_id = Number(kassenbucheintrag_id);

    if (formular_oeffnen) {
        const $neues_modal = Schnittstelle_DomNeuesModalInitialisiertZurueck(title, "kassenbucheintrag_basiseigenschaften");
        Schnittstelle_DomModalOeffnen($neues_modal);
        Liste_ElementFormularInitialisieren($neues_modal.find(".formular"), "aendern", kassenbucheintrag_id, "kassenbuch");
    } else {
        if (!dom.$btn_ausloesend.hasClass("element")) Schnittstelle_BtnWartenStart(dom.$btn_ausloesend);

        const ajax_dom = dom;

        if (!("titel" in data)) data.titel = Schnittstelle_VariableRausZurueck("titel", kassenbucheintrag_id, "kassenbuch", undefined);
        if (!("wert" in data)) data.wert = Schnittstelle_VariableRausZurueck("wert", kassenbucheintrag_id, "kassenbuch", undefined);
        if (!("mitglied_id" in data))
            data.mitglied_id = Schnittstelle_VariableRausZurueck("mitglied_id", kassenbucheintrag_id, "kassenbuch", undefined);
        if (!("erledigt" in data)) data.erledigt = Schnittstelle_VariableRausZurueck("erledigt", kassenbucheintrag_id, "aufgaben", null);
        if (!("bemerkung" in data)) data.bemerkung = Schnittstelle_VariableRausZurueck("bemerkung", kassenbucheintrag_id, "kassenbuch", null);
        const ajax_data = Schnittstelle_VariableWertBereinigtZurueck(data, new Object());
        ajax_data.id = kassenbucheintrag_id;
        if (!isLuxonDateTime(ajax_data.erledigt)) ajax_data.erledigt = null;
        else ajax_data.erledigt = ajax_data.erledigt.toISO();
        if (isEmptyString(ajax_data.bemerkung)) ajax_data.bemerkung = null;

        Schnittstelle_AjaxInDieSchlange(
            "strafkatalog/ajax_kassenbucheintrag_speichern",
            ajax_data,
            ajax_dom,
            function (AJAX) {
                const kassenbucheintrag_id = AJAX.data.id;
                $.each(AJAX.data, function (eigenschaft, wert) {
                    if (eigenschaft != "ajax_id" && eigenschaft != CSRF_NAME)
                        Schnittstelle_VariableRein(wert, eigenschaft, kassenbucheintrag_id, "kassenbuch");
                });

                Schnittstelle_EventVariableUpdLocalstorage("kassenbuch");
                Schnittstelle_EventLocalstorageUpdVariable("kassenbuch");
                // Schnittstelle_VariableElementZuordnen("kassenbuch");
                Schnittstelle_VariableElementErgaenzen("kassenbuch");
                Schnittstelle_EventVariableUpdDom("kassenbuch");

                if ("dom" in AJAX && "$btn_ausloesend" in AJAX.dom && AJAX.dom.$btn_ausloesend.exists() && !dom.$btn_ausloesend.hasClass("element"))
                    Schnittstelle_BtnWartenEnde(AJAX.dom.$btn_ausloesend);
                if ("dom" in AJAX && "$modal" in AJAX.dom && AJAX.dom.$modal.exists()) {
                    Schnittstelle_DomModalSchliessen(AJAX.dom.$modal);
                    Schnittstelle_DomToastFeuern(
                        Liste_ElementBeschriftungZurueck(kassenbucheintrag_id, "kassenbuch") + " wurde erfolgreich geändert."
                    );
                }
            },
            function (AJAX) {
                if ("dom" in AJAX && "$btn_ausloesend" in AJAX.dom && AJAX.dom.$btn_ausloesend.exists() && !dom.$btn_ausloesend.hasClass("element"))
                    Schnittstelle_BtnWartenEnde(AJAX.dom.$btn_ausloesend);
                if (isString(AJAX.antwort.validation)) Schnittstelle_DomToastFeuern(AJAX.antwort.validation, "danger");
                else if ("dom" in AJAX && "$formular" in AJAX.dom && AJAX.dom.$formular.exists())
                    Liste_ElementFormularValidationAktualisieren(AJAX.dom.$formular, AJAX.antwort.validation);
                Schnittstelle_DomToastFeuern(
                    Liste_ElementBeschriftungZurueck(AJAX.data.id, "kassenbuch") + " konnte nicht gespeichert werden.",
                    "danger"
                );
            }
        );
    }
}
