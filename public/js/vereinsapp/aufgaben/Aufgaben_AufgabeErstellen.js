/**
 * @param {boolean} formular_oeffnen
 * @param {Object} dom
 * @param {Object} data
 * @param {string} title
 * @param {number} aufgabe_id
 */

function Aufgaben_AufgabeErstellen(formular_oeffnen, dom, data, title, aufgabe_id) {
    if (formular_oeffnen) {
        const $neues_modal = Schnittstelle_Dom$NeuesModalInitialisiertZurueck(title, "aufgabe_basiseigenschaften");
        Schnittstelle_Dom$ModalOeffnen($neues_modal);
        const $neues_formular = $neues_modal.find(".formular");
        $neues_formular.attr("data-werkzeug", "aufgabe_erstellen").attr("data-liste", "aufgaben").attr("data-aufgabe_id", aufgabe_id);
        Liste_Element$FormularInitialisieren($neues_formular);
    } else {
        const ajax_dom = dom;

        const ajax_data = Schnittstelle_VariableWertBereinigtZurueck(data, new Object());
        if (!("max_anzahl_mitglieder" in ajax_data) || isEmptyString(ajax_data.max_anzahl_mitglieder)) ajax_data.max_anzahl_mitglieder = null;
        if (!("bemerkung" in ajax_data) || isEmptyString(ajax_data.bemerkung)) ajax_data.bemerkung = null;

        Schnittstelle_AjaxInDieSchlange(
            "aufgaben/ajax_aufgabe_speichern",
            ajax_data,
            ajax_dom,
            function (AJAX) {
                if (typeof AJAX.antwort.aufgabe_id !== "undefined") AJAX.data.aufgabe_id = Number(AJAX.antwort.aufgabe_id);
                else AJAX.data.aufgabe_id = LISTEN.aufgaben.tabelle.length + 1;
                const aufgabe_id = AJAX.data.aufgabe_id;
                delete AJAX.data.aufgabe_id;

                Schnittstelle_VariableRein(aufgabe_id, "id", aufgabe_id, "aufgaben");
                $.each(AJAX.data, function (eigenschaft, wert) {
                    Schnittstelle_VariableRein(wert, eigenschaft, aufgabe_id, "aufgaben");
                });

                Schnittstelle_EventVariableUpdLocalstorage("aufgaben");
                Schnittstelle_EventLocalstorageUpdVariable("aufgaben");
                // Schnittstelle_VariableElementZuordnen("aufgaben");
                Schnittstelle_VariableElementErgaenzen("aufgaben");
                Schnittstelle_EventVariableUpdDom("aufgaben");

                if ("dom" in AJAX && "$modal" in AJAX.dom && AJAX.dom.$modal.exists()) Schnittstelle_Dom$ModalSchliessen(AJAX.dom.$modal);
                Schnittstelle_DomToastFeuern(
                    Liste_ElementTextMitBeschriftungErsetztZurueck("{aufgaben} wurde erfolgreich erstellt.", { aufgabe_id: aufgabe_id }),
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
