/**
 * @param {boolean} data_vollstaendig
 * @param {Object} dom
 * @param {Object} data
 * @param {string} modal_title
 * @param {number} aufgabe_id
 */

function Aufgaben_AufgabeAendern(data_vollstaendig, dom, data, modal_title, aufgabe_id) {
    if (!data_vollstaendig) {
        const $neues_modal = Schnittstelle_Dom$NeuesModalInitialisiertZurueck(modal_title, "aufgabe_basiseigenschaften");
        Schnittstelle_Dom$ModalOeffnen($neues_modal);
        const $neues_formular = $neues_modal.find(".formular");
        $neues_formular.attr("data-liste", "aufgaben").attr("data-werkzeug", "aufgabe_aendern").attr("data-aufgabe_id", aufgabe_id);
        Liste_Element$FormularInitialisieren($neues_formular);
    } else {
        const ajax_dom = dom;

        if (!("titel" in data)) data.titel = Schnittstelle_VariableRausZurueck("titel", aufgabe_id, "aufgaben", undefined);
        if (!("max_anzahl_mitglieder" in data))
            data.max_anzahl_mitglieder = Schnittstelle_VariableRausZurueck("max_anzahl_mitglieder", aufgabe_id, "aufgaben", null);
        if (!("bemerkung" in data)) data.bemerkung = Schnittstelle_VariableRausZurueck("bemerkung", aufgabe_id, "aufgaben", null);
        const ajax_data = Schnittstelle_VariableWertBereinigtZurueck(data, new Object());
        ajax_data.aufgabe_id = aufgabe_id;
        if (isEmptyString(ajax_data.max_anzahl_mitglieder)) ajax_data.max_anzahl_mitglieder = null;
        if (isEmptyString(ajax_data.bemerkung)) ajax_data.bemerkung = null;

        Schnittstelle_AjaxInDieSchlange(
            "aufgaben/ajax_aufgabe_speichern",
            ajax_data,
            ajax_dom,
            function (AJAX) {
                const aufgabe_id = AJAX.data.aufgabe_id;
                delete AJAX.data.aufgabe_id;

                $.each(AJAX.data, function (eigenschaft, wert) {
                    Schnittstelle_VariableRein(wert, eigenschaft, aufgabe_id, "aufgaben");
                });

                Schnittstelle_EventVariableUpdLocalstorage("aufgaben");
                Schnittstelle_EventLocalstorageUpdVariable("aufgaben");
                Liste_VerknuepfungenZuordnen("aufgaben");
                Schnittstelle_VariableElementErgaenzen("aufgaben");
                Schnittstelle_EventVariableUpdDom("aufgaben");

                if ("dom" in AJAX && "$modal" in AJAX.dom && AJAX.dom.$modal.exists()) Schnittstelle_Dom$ModalSchliessen(AJAX.dom.$modal);
                Schnittstelle_DomToastFeuern(
                    Liste_ElementTextMitBeschriftungErsetztZurueck(TEXTE.element1_aendern.erfolg, {
                        element1: { liste: "aufgaben", aufgabe_id: aufgabe_id },
                    }),
                );
            },
            function (AJAX) {
                if (isString(AJAX.antwort.validation)) Schnittstelle_DomToastFeuern(AJAX.antwort.validation, "danger");
                else if (isObject(AJAX.antwort.validation) && "dom" in AJAX && "$formular" in AJAX.dom && AJAX.dom.$formular.exists())
                    Liste_Element$FormularValidationAktualisieren(AJAX.dom.$formular, AJAX.antwort.validation);
                Schnittstelle_DomToastFeuern(
                    Liste_ElementTextMitBeschriftungErsetztZurueck(TEXTE.element1_aendern.fehler, {
                        element1: { liste: "aufgaben", aufgabe_id: AJAX.data.aufgabe_id },
                    }),
                    "danger",
                );
            },
        );
    }
}
