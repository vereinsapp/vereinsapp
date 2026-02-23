/**
 * @param {boolean} formular_oeffnen
 * @param {Object} dom
 * @param {Object} data
 * @param {string} modal_title
 * @param {number} aufgabe_id
 */

function Aufgaben_AufgabeAendern(formular_oeffnen, dom, data, modal_title, aufgabe_id) {
    if (formular_oeffnen) {
        const $neues_modal = Schnittstelle_Dom$NeuesModalInitialisiertZurueck(modal_title, "aufgabe_basiseigenschaften");
        Schnittstelle_Dom$ModalOeffnen($neues_modal);
        const $neues_formular = $neues_modal.find(".formular");
        $neues_formular.attr("data-werkzeug", "aufgabe_aendern").attr("data-liste", "aufgaben").attr("data-aufgabe_id", aufgabe_id);
        if ("$ausloesend" in dom && dom.$ausloesend.exists() && dom.$ausloesend.attr("data-werkzeug") in WERKZEUGE)
            $neues_formular.attr("data-werkzeug", dom.$ausloesend.attr("data-werkzeug"));
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
                // Schnittstelle_VariableElementZuordnen("aufgaben");
                Schnittstelle_VariableElementErgaenzen("aufgaben");
                Schnittstelle_EventVariableUpdDom("aufgaben");

                if ("dom" in AJAX && "$modal" in AJAX.dom && AJAX.dom.$modal.exists()) {
                    Schnittstelle_Dom$ModalSchliessen(AJAX.dom.$modal);
                    Schnittstelle_DomToastFeuern(
                        Liste_ElementTextMitBeschriftungErsetztZurueck("{aufgaben} wurde erfolgreich geändert.", { aufgabe_id: aufgabe_id }),
                    );
                }
            },
            function (AJAX) {
                if (isString(AJAX.antwort.validation)) Schnittstelle_DomToastFeuern(AJAX.antwort.validation, "danger");
                else if ("dom" in AJAX && "$formular" in AJAX.dom && AJAX.dom.$formular.exists())
                    Liste_Element$FormularValidationAktualisieren(AJAX.dom.$formular, AJAX.antwort.validation);
                Schnittstelle_DomToastFeuern(
                    Liste_ElementTextMitBeschriftungErsetztZurueck("{aufgaben} konnte nicht gespeichert werden.", {
                        aufgabe_id: AJAX.data.aufgabe_id,
                    }),
                    "danger",
                );
            },
        );
    }
}
