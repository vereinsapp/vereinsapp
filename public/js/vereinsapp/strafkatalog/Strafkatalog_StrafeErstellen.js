/**
 * @param {boolean} data_vollstaendig
 * @param {Object} dom
 * @param {Object} data
 * @param {string} modal_title
 * @param {number} strafe_id
 */

function Strafkatalog_StrafeErstellen(data_vollstaendig, dom, data, modal_title, strafe_id) {
    if (!data_vollstaendig) {
        const $neues_modal = Schnittstelle_Dom$NeuesModalInitialisiertZurueck(modal_title, "strafe_basiseigenschaften");
        Schnittstelle_Dom$ModalOeffnen($neues_modal);
        const $neues_formular = $neues_modal.find(".formular");
        $neues_formular.attr("data-liste", "strafkatalog");
        if (typeof strafe_id !== "undefined") $neues_formular.attr("data-werkzeug", "strafe_duplizieren").attr("data-strafe_id", strafe_id);
        else $neues_formular.attr("data-werkzeug", "strafe_erstellen");
        Liste_Element$FormularInitialisieren($neues_formular);
    } else {
        const ajax_dom = dom;
        const ajax_data = Schnittstelle_VariableWertBereinigtZurueck(data, new Object());
        if (!("bemerkung" in ajax_data) || isEmptyString(ajax_data.bemerkung)) ajax_data.bemerkung = null;

        Schnittstelle_AjaxInDieSchlange(
            "strafkatalog/ajax_strafe_speichern",
            ajax_data,
            ajax_dom,
            function (AJAX) {
                if (typeof AJAX.antwort.strafe_id !== "undefined") AJAX.data.strafe_id = Number(AJAX.antwort.strafe_id);
                else AJAX.data.strafe_id = LISTEN.strafkatalog.tabelle.length + 1;
                const strafe_id = AJAX.data.strafe_id;
                delete AJAX.data.strafe_id;

                Schnittstelle_VariableRein(strafe_id, "id", strafe_id, "strafkatalog");
                $.each(AJAX.data, function (eigenschaft, wert) {
                    Schnittstelle_VariableRein(wert, eigenschaft, strafe_id, "strafkatalog");
                });

                Schnittstelle_EventVariableUpdLocalstorage("strafkatalog");
                Schnittstelle_EventLocalstorageUpdVariable("strafkatalog");
                Liste_VerknuepfungenZuordnen("strafkatalog");
                Schnittstelle_VariableElementErgaenzen("strafkatalog");
                Schnittstelle_EventVariableUpdDom("strafkatalog");

                if ("dom" in AJAX && "$modal" in AJAX.dom && AJAX.dom.$modal.exists()) Schnittstelle_Dom$ModalSchliessen(AJAX.dom.$modal);
                Schnittstelle_DomToastFeuern(
                    Liste_ElementTextMitBeschriftungErsetztZurueck("{strafkatalog} wurde erfolgreich erstellt.", { strafe_id: strafe_id }),
                );
            },
            function (AJAX) {
                if (isString(AJAX.antwort.validation)) Schnittstelle_DomToastFeuern(AJAX.antwort.validation, "danger");
                else if ("dom" in AJAX && "$formular" in AJAX.dom && AJAX.dom.$formular.exists())
                    Liste_Element$FormularValidationAktualisieren(AJAX.dom.$formular, AJAX.antwort.validation);
            },
        );
    }
}
