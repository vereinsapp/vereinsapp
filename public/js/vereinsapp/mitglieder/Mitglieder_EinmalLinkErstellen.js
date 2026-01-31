function Mitglieder_EinmalLinkErstellen(formular_oeffnen, bestaetigung_einfordern, dom, data, title, mitglied_id) {
    if (typeof mitglied_id !== "undefined") mitglied_id = Number(mitglied_id);

    if (bestaetigung_einfordern)
        Schnittstelle_DomBestaetigungEinfordern(
            "Willst du wirklich für " +
                Liste_ElementBeschriftungZurueck(mitglied_id, "mitglieder") +
                " einen neuen Einmal-Link erstellen und per Email verschicken?",
            title,
            "btn_mitglied_einmal_link_erstellen",
            { liste: "mitglieder", mitglied_id: mitglied_id, email: true },
        );
    else if (formular_oeffnen) {
        const $neues_modal = Schnittstelle_DomNeuesModalInitialisiertZurueck(title, "mitglieder_einmal_link_anzeigen");
        Schnittstelle_DomModalOeffnen($neues_modal);
        $neues_modal
            .find(".beschriftung_mitglied_einmal_link_anzeigen")
            .text(
                "Willst du wirklich für " +
                    Liste_ElementBeschriftungZurueck(mitglied_id, "mitglieder") +
                    " einen neuen Einmal-Link erstellen und anzeigen?",
            );
        $neues_modal.find(".btn_mitglied_einmal_link_erstellen").attr("data-mitglied_id", mitglied_id);
    } else {
        const ajax_dom = dom;
        const ajax_data = Schnittstelle_VariableWertBereinigtZurueck(data, new Object());
        ajax_data.mitglied_id = mitglied_id;

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

                if (AJAX.data.email) {
                    if ("dom" in AJAX && "$modal" in AJAX.dom && AJAX.dom.$modal.exists()) {
                        Schnittstelle_DomModalSchliessen(AJAX.dom.$modal);
                        Schnittstelle_DomToastFeuern(
                            "Einmal-Link für " +
                                Liste_ElementBeschriftungZurueck(AJAX.data.mitglied_id, "mitglieder") +
                                " wurde erfolgreich per Email zugeschickt.",
                        );
                    }
                } else {
                    if ("dom" in AJAX && "$modal" in AJAX.dom && AJAX.dom.$modal.find(".einmal_link").exists())
                        AJAX.dom.$modal.find(".einmal_link").val(AJAX.antwort.einmal_link);
                    if ("dom" in AJAX && "$ausloesend" in AJAX.dom && AJAX.dom.$ausloesend.exists()) AJAX.dom.$ausloesend.addClass("invisible");
                }
            },
            function (AJAX) {
                if (isString(AJAX.antwort.validation)) Schnittstelle_DomToastFeuern(AJAX.antwort.validation, "danger");
                if (AJAX.data.email)
                    Schnittstelle_DomToastFeuern(
                        "Einmal-Link für " +
                            Liste_ElementBeschriftungZurueck(AJAX.data.mitglied_id, "mitglieder") +
                            " konnte nicht per Email zugeschickt werden.",
                        "danger",
                    );
                else
                    Schnittstelle_DomToastFeuern(
                        "Einmal-Link für " + Liste_ElementBeschriftungZurueck(AJAX.data.mitglied_id, "mitglieder") + " konnte nicht erstellt werden.",
                        "danger",
                    );
            },
        );
    }
}
