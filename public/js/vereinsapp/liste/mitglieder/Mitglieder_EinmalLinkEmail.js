/**
 * @param {boolean} bestaetigt
 * @param {Object} dom
 * @param {string} modal_title
 * @param {number} mitglied_id
 */

function Mitglieder_EinmalLinkEmail(bestaetigt, dom, modal_title, mitglied_id) {
    if (!bestaetigt)
        Dom_BestaetigungEinfordern(
            Liste_ElementBeschriftungErsetztZurueck(WERKZEUGE.einmal_link_email.beschriftung.bestaetigung, {
                element1: { liste: "mitglieder", mitglied_id: mitglied_id },
            }),
            modal_title,
            "einmal_link_email",
            { mitglied_id: mitglied_id },
        );
    else {
        const ajax_dom = dom;
        const ajax_data = Util_WertBereinigtZurueck(new Object(), new Object());
        ajax_data.mitglied_id = mitglied_id;

        Ajax_InDieSchlange(
            "mitglieder/ajax_mitglied_einmal_link_erstellen",
            ajax_data,
            ajax_dom,
            function (AJAX) {
                Liste_EventLocalstorageListenAktualisieren("mitglieder");
                Liste_EventVariableListenAktualisieren("mitglieder");
                Liste_ElementWertErgaenzen("mitglieder");
                Liste_EventDomAktualisieren("mitglieder");

                if ("dom" in AJAX && "$modal" in AJAX.dom && AJAX.dom.$modal.exists()) Dom_$ModalSchliessen(AJAX.dom.$modal);
                Dom_ToastFeuern(
                    Liste_ElementBeschriftungErsetztZurueck(WERKZEUGE.einmal_link_email.beschriftung.erfolg, {
                        element1: { liste: "mitglieder", mitglied_id: AJAX.data.mitglied_id },
                    }),
                );
            },
            function (AJAX) {
                if (isString(AJAX.antwort.validation)) Dom_ToastFeuern(AJAX.antwort.validation, "danger");
                Dom_ToastFeuern(
                    Liste_ElementBeschriftungErsetztZurueck(WERKZEUGE.einmal_link_email.beschriftung.fehler, {
                        element1: { liste: "mitglieder", mitglied_id: AJAX.data.mitglied_id },
                    }),
                    "danger",
                );
            },
        );
    }
}
