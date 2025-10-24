function Termine_RueckmeldungAendern(formular_oeffnen, dom, data, title, rueckmeldung_id) {
    if (typeof rueckmeldung_id !== "undefined") rueckmeldung_id = Number(rueckmeldung_id);

    if (formular_oeffnen) {
        const $neues_modal = Schnittstelle_DomNeuesModalInitialisiertZurueck(title, "rueckmeldung_basiseigenschaften");
        Schnittstelle_DomModalOeffnen($neues_modal);
        Liste_ElementFormularInitialisieren($neues_modal.find(".formular"), "aendern", rueckmeldung_id, "rueckmeldungen");
    } else {
        if (!dom.$btn_ausloesend.hasClass("element")) Schnittstelle_BtnWartenStart(dom.$btn_ausloesend);

        const ajax_dom = dom;

        if (!("termin_id" in data)) data.termin_id = Schnittstelle_VariableRausZurueck("termin_id", rueckmeldung_id, "rueckmeldungen", undefined);
        if (!("mitglied_id" in data))
            data.mitglied_id = Schnittstelle_VariableRausZurueck("mitglied_id", rueckmeldung_id, "rueckmeldungen", undefined);
        if (!("status" in data)) data.status = Schnittstelle_VariableRausZurueck("status", rueckmeldung_id, "rueckmeldungen", undefined);
        if (!("bemerkung" in data)) data.bemerkung = Schnittstelle_VariableRausZurueck("bemerkung", rueckmeldung_id, "rueckmeldungen", null);
        const ajax_data = Schnittstelle_VariableWertBereinigtZurueck(data, new Object());
        ajax_data.id = rueckmeldung_id;

        Schnittstelle_AjaxInDieSchlange(
            "termine/ajax_rueckmeldung_speichern",
            ajax_data,
            ajax_dom,
            function (AJAX) {
                const rueckmeldung_id = AJAX.data.id;
                $.each(AJAX.data, function (eigenschaft, wert) {
                    if (eigenschaft != "ajax_id" && eigenschaft != CSRF_NAME)
                        Schnittstelle_VariableRein(wert, eigenschaft, rueckmeldung_id, "rueckmeldungen");
                });

                Schnittstelle_EventVariableUpdLocalstorage("rueckmeldungen");
                Schnittstelle_EventLocalstorageUpdVariable("rueckmeldungen");
                Schnittstelle_VariableElementZuordnen("rueckmeldungen");
                // Schnittstelle_VariableElementErgaenzen("rueckmeldungen");
                Schnittstelle_EventVariableUpdDom("rueckmeldungen");

                if ("dom" in AJAX && "$btn_ausloesend" in AJAX.dom && AJAX.dom.$btn_ausloesend.exists() && !dom.$btn_ausloesend.hasClass("element"))
                    Schnittstelle_BtnWartenEnde(AJAX.dom.$btn_ausloesend);
                if ("dom" in AJAX && "$modal" in AJAX.dom && AJAX.dom.$modal.exists()) {
                    Schnittstelle_DomModalSchliessen(AJAX.dom.$modal);
                    Schnittstelle_DomToastFeuern(
                        Liste_ElementBeschriftungZurueck(rueckmeldung_id, "rueckmeldungen") + " wurde erfolgreich geändert."
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
                    Liste_ElementBeschriftungZurueck(AJAX.data.id, "rueckmeldungen") + " konnte nicht gespeichert werden.",
                    "danger"
                );
            }
        );
    }
}
