function Mitglieder_EinmalLinkErstellen(formular_oeffnen, bestaetigung_einfordern, dom, data, title, mitglied_id) {
    if (typeof mitglied_id !== "undefined") mitglied_id = Number(mitglied_id);

    if (bestaetigung_einfordern)
        Schnittstelle_DomBestaetigungEinfordern(
            "Willst du wirklich " + Liste_ElementBeschriftungZurueck(mitglied_id, "mitglieder") + " einen Einmal-Link per Email zuschicken?",
            title,
            "btn_mitglied_einmal_link_email",
            { liste: "mitglieder", element_id: mitglied_id }
        );
    else if (formular_oeffnen) {
        const $neues_modal = Schnittstelle_DomNeuesModalInitialisiertZurueck(title, "mitglieder_einmal_link_anzeigen");
        Schnittstelle_DomModalOeffnen($neues_modal);
        Liste_ElementFormularInitialisieren($neues_modal.find(".formular"), undefined, mitglied_id, "mitglieder");
    } else {
        Schnittstelle_BtnWartenStart(dom.$btn_ausloesend);

        const ajax_dom = dom;
        const ajax_data = Schnittstelle_VariableWertBereinigtZurueck(data, new Object());
        ajax_data.id = mitglied_id;

        Schnittstelle_AjaxInDieSchlange(
            "mitglieder/ajax_mitglied_einmal_link_erstellen",
            ajax_data,
            ajax_dom,
            function (AJAX) {
                Schnittstelle_EventVariableUpdLocalstorage("mitglieder");
                Schnittstelle_EventLocalstorageUpdVariable("mitglieder");
                // Schnittstelle_VariableElementZuordnen("mitglieder");
                Schnittstelle_VariableElementErgaenzen("mitglieder");
                Schnittstelle_EventVariableUpdDom("mitglieder");

                if ("dom" in AJAX && "$btn_ausloesend" in AJAX.dom && AJAX.dom.$btn_ausloesend.exists())
                    Schnittstelle_BtnWartenEnde(AJAX.dom.$btn_ausloesend);
                if (AJAX.data.email) {
                    if ("dom" in AJAX && "$modal" in AJAX.dom && AJAX.dom.$modal.exists()) {
                        Schnittstelle_DomModalSchliessen(AJAX.dom.$modal);
                        Schnittstelle_DomToastFeuern(
                            "Einmal-Link für " +
                                Liste_ElementBeschriftungZurueck(AJAX.data.id, "mitglieder") +
                                " wurde erfolgreich per Email zugeschickt."
                        );
                    }
                } else {
                    if ("dom" in AJAX && "$formular" in AJAX.dom && AJAX.dom.$formular.find(".einmal_link").exists())
                        AJAX.dom.$formular.find(".einmal_link").val(AJAX.antwort.einmal_link);
                    if ("dom" in AJAX && "$btn_ausloesend" in AJAX.dom && AJAX.dom.$btn_ausloesend.exists())
                        AJAX.dom.$btn_ausloesend.addClass("invisible");
                }
            },
            function (AJAX) {
                if ("dom" in AJAX && "$btn_ausloesend" in AJAX.dom && AJAX.dom.$btn_ausloesend.exists())
                    Schnittstelle_BtnWartenEnde(AJAX.dom.$btn_ausloesend);
                if (isString(AJAX.antwort.validation)) Schnittstelle_DomToastFeuern(AJAX.antwort.validation, "danger");
                if (AJAX.data.email)
                    Schnittstelle_DomToastFeuern(
                        "Einmal-Link für " +
                            Liste_ElementBeschriftungZurueck(AJAX.data.id, "mitglieder") +
                            " konnte nicht per Email zugeschickt werden.",
                        "danger"
                    );
                else
                    Schnittstelle_DomToastFeuern(
                        "Einmal-Link für " + Liste_ElementBeschriftungZurueck(AJAX.data.id, "mitglieder") + " konnte nicht erstellt werden.",
                        "danger"
                    );
            }
        );
    }
}
