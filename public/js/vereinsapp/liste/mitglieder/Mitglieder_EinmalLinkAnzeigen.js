/**
 * @param {boolean} bestaetigt
 * @param {Object} dom
 * @param {string} modal_title
 * @param {number} mitglied_id
 */

function Mitglieder_EinmalLinkAnzeigen(bestaetigt, dom, modal_title, mitglied_id) {
    if (!bestaetigt) {
        const $modal = Dom_$ModalInitialisiertZurueck(modal_title, "mitglied_einmal_link_anzeigen_modal");
        Dom_$ModalOeffnen($modal);
        $modal.find(".mitglied_einmal_link_anzeigen_nachricht").text(
            Liste_ElementTextMitBeschriftungErsetztZurueck(TEXTE.element1_einmal_link_anzeigen.bestaetigung, {
                element1: { liste: "mitglieder", mitglied_id: mitglied_id },
            }),
        );
        $modal.find('.werkzeug[werkzeug="einmal_link_anzeigen"]').attr("mitglied_id", mitglied_id).addClass("bestaetigt");
    } else {
        const ajax_dom = dom;
        const ajax_data = Util_WertBereinigtZurueck(new Object(), new Object());
        ajax_data.mitglied_id = mitglied_id;

        Ajax_InDieSchlange(
            "mitglieder/ajax_mitglied_einmal_link_erstellen",
            ajax_data,
            ajax_dom,
            function (AJAX) {
                Liste_EventVariableUpdLocalstorage("mitglieder");
                Liste_EventLocalstorageUpdVariable("mitglieder");
                Liste_VerknuepfungenZuordnen("mitglieder");
                Liste_ElementErgaenzen("mitglieder");
                Liste_EventVariableUpdDom("mitglieder");

                if ("dom" in AJAX && "$modal" in AJAX.dom && AJAX.dom.$modal.find(".einmal_link").exists())
                    AJAX.dom.$modal.find(".einmal_link").val(AJAX.antwort.einmal_link);
                if ("dom" in AJAX && "$werkzeug" in AJAX.dom && AJAX.dom.$werkzeug.exists()) {
                    AJAX.dom.$werkzeug.addClass("invisible");
                    if ("dom" in AJAX && "$modal" in AJAX.dom && AJAX.dom.$modal.find(".einmal_link").closest(".mb-2").exists())
                        AJAX.dom.$modal.find(".einmal_link").closest(".mb-2").removeClass("mb-2");
                }
                Dom_ToastFeuern(
                    Liste_ElementTextMitBeschriftungErsetztZurueck(TEXTE.element1_einmal_link_anzeigen.erfolg, {
                        element1: { liste: "mitglieder", mitglied_id: AJAX.data.mitglied_id },
                    }),
                );
            },
            function (AJAX) {
                if (isString(AJAX.antwort.validation)) Dom_ToastFeuern(AJAX.antwort.validation, "danger");
                Dom_ToastFeuern(
                    Liste_ElementTextMitBeschriftungErsetztZurueck(TEXTE.element1_einmal_link_anzeigen.fehler, {
                        element1: { liste: "mitglieder", mitglied_id: AJAX.data.mitglied_id },
                    }),
                    "danger",
                );
            },
        );
    }
}
