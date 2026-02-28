/**
 * @param {boolean} data_vollstaendig
 * @param {Object} dom
 * @param {Object} data
 * @param {string} modal_title
 * @param {number} strafe_id
 */

function Strafkatalog_StrafeAendern(data_vollstaendig, dom, data, modal_title, strafe_id) {
    if (!data_vollstaendig) {
        const $neues_modal = Schnittstelle_Dom$NeuesModalInitialisiertZurueck(modal_title, "strafe_basiseigenschaften");
        Schnittstelle_Dom$ModalOeffnen($neues_modal);
        const $neues_formular = $neues_modal.find(".formular");
        $neues_formular.attr("data-liste", "strafkatalog").attr("data-werkzeug", "strafe_aendern").attr("data-strafe_id", strafe_id);
        Liste_Element$FormularInitialisieren($neues_formular);
    } else {
        const ajax_dom = dom;

        if (!("titel" in data)) data.titel = Schnittstelle_VariableRausZurueck("titel", strafe_id, "strafkatalog", undefined);
        if (!("wert" in data)) data.wert = Schnittstelle_VariableRausZurueck("wert", strafe_id, "strafkatalog", undefined);
        if (!("kategorie" in data)) data.kategorie = Schnittstelle_VariableRausZurueck("kategorie", strafe_id, "strafkatalog", undefined);
        if (!("bemerkung" in data)) data.bemerkung = Schnittstelle_VariableRausZurueck("bemerkung", strafe_id, "strafkatalog", null);
        const ajax_data = Schnittstelle_VariableWertBereinigtZurueck(data, new Object());
        ajax_data.strafe_id = strafe_id;
        if (isEmptyString(ajax_data.bemerkung)) ajax_data.bemerkung = null;

        Schnittstelle_AjaxInDieSchlange(
            "strafkatalog/ajax_strafe_speichern",
            ajax_data,
            ajax_dom,
            function (AJAX) {
                const strafe_id = AJAX.data.strafe_id;
                delete AJAX.data.strafe_id;

                $.each(AJAX.data, function (eigenschaft, wert) {
                    Schnittstelle_VariableRein(wert, eigenschaft, strafe_id, "strafkatalog");
                });

                Schnittstelle_EventVariableUpdLocalstorage("strafkatalog");
                Schnittstelle_EventLocalstorageUpdVariable("strafkatalog");
                // Schnittstelle_VariableElementZuordnen("strafkatalog");
                // Schnittstelle_VariableElementErgaenzen("strafkatalog");
                Schnittstelle_EventVariableUpdDom("strafkatalog");

                if ("dom" in AJAX && "$modal" in AJAX.dom && AJAX.dom.$modal.exists()) {
                    Schnittstelle_Dom$ModalSchliessen(AJAX.dom.$modal);
                    Schnittstelle_DomToastFeuern(
                        Liste_ElementTextMitBeschriftungErsetztZurueck("{strafkatalog} wurde erfolgreich geändert.", { strafe_id: strafe_id }),
                    );
                }
            },
            function (AJAX) {
                if (isString(AJAX.antwort.validation)) Schnittstelle_DomToastFeuern(AJAX.antwort.validation, "danger");
                else if ("dom" in AJAX && "$formular" in AJAX.dom && AJAX.dom.$formular.exists())
                    Liste_Element$FormularValidationAktualisieren(AJAX.dom.$formular, AJAX.antwort.validation);
                Schnittstelle_DomToastFeuern(
                    Liste_ElementTextMitBeschriftungErsetztZurueck("{strafkatalog} konnte nicht gespeichert werden.", {
                        strafe_id: AJAX.data.strafe_id,
                    }),
                    "danger",
                );
            },
        );
    }
}
