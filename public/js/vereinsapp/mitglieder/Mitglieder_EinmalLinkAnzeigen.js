/**
 * @param {boolean} data_vollstaendig
 * @param {Object} dom
 * @param {string} modal_title
 * @param {number} mitglied_id
 */

function Mitglieder_EinmalLinkAnzeigen(data_vollstaendig, dom, modal_title, mitglied_id) {
    if (!data_vollstaendig) {
        const $neues_modal = Schnittstelle_Dom$NeuesModalInitialisiertZurueck(modal_title, "mitglied_einmal_link_anzeigen_modal");
        Schnittstelle_Dom$ModalOeffnen($neues_modal);
        $neues_modal
            .find(".mitglied_einmal_link_anzeigen_beschriftung")
            .text(
                Liste_ElementTextMitBeschriftungErsetztZurueck(
                    "Willst du wirklich für {mitglieder} einen neuen Einmal-Link erstellen und anzeigen?",
                    { mitglied_id: mitglied_id },
                ),
            );
        $neues_modal.find('.werkzeug[data-werkzeug="einmal_link_anzeigen"]').attr("data-mitglied_id", mitglied_id);
    } else {
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

                if ("dom" in AJAX && "$modal" in AJAX.dom && AJAX.dom.$modal.find(".einmal_link").exists())
                    AJAX.dom.$modal.find(".einmal_link").val(AJAX.antwort.einmal_link);
                if ("dom" in AJAX && "$werkzeug" in AJAX.dom && AJAX.dom.$werkzeug.exists()) AJAX.dom.$werkzeug.addClass("invisible");
            },
            function (AJAX) {
                if (isString(AJAX.antwort.validation)) Schnittstelle_DomToastFeuern(AJAX.antwort.validation, "danger");
                Schnittstelle_DomToastFeuern(
                    Liste_ElementTextMitBeschriftungErsetztZurueck("Einmal-Link für {mitglieder} konnte nicht erstellt werden.", {
                        mitglied_id: AJAX.data.mitglied_id,
                    }),
                    "danger",
                );
            },
        );
    }
}
