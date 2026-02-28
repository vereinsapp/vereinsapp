/**
 * @param {boolean} bestaetigt
 * @param {Object} dom
 * @param {string} modal_title
 * @param {number} mitglied_id
 */

function Mitglieder_EinmalLinkEmail(bestaetigt, dom, modal_title, mitglied_id) {
    if (!bestaetigt)
        Schnittstelle_DomBestaetigungEinfordern(
            Liste_ElementTextMitBeschriftungErsetztZurueck(
                "Willst du wirklich für {mitglieder} einen neuen Einmal-Link erstellen und per Email verschicken?",
                { mitglied_id: mitglied_id },
            ),
            modal_title,
            "einmal_link_email",
            { mitglied_id: mitglied_id },
        );
    else {
        const ajax_dom = dom;
        const ajax_data = Schnittstelle_VariableWertBereinigtZurueck(new Object(), new Object());
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

                if ("dom" in AJAX && "$modal" in AJAX.dom && AJAX.dom.$modal.exists()) {
                    Schnittstelle_Dom$ModalSchliessen(AJAX.dom.$modal);
                    Schnittstelle_DomToastFeuern(
                        Liste_ElementTextMitBeschriftungErsetztZurueck("Einmal-Link für {mitglieder} wurde erfolgreich per Email vergeschickt.", {
                            mitglied_id: AJAX.data.mitglied_id,
                        }),
                    );
                }
            },
            function (AJAX) {
                if (isString(AJAX.antwort.validation)) Schnittstelle_DomToastFeuern(AJAX.antwort.validation, "danger");
                Schnittstelle_DomToastFeuern(
                    Liste_ElementTextMitBeschriftungErsetztZurueck("Einmal-Link für {mitglieder} konnte nicht per Email vergeschickt werden.", {
                        mitglied_id: AJAX.data.mitglied_id,
                    }),
                    "danger",
                );
            },
        );
    }
}
