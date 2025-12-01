/**
 * @param {boolean} formular_oeffnen
 * @param {Object} dom
 * @param {Object} data
 * @param {string} title
 * @param {number} aufgabe_id
 */

function Aufgaben_AufgabeErstellen(formular_oeffnen, dom, data, title, aufgabe_id) {
    if (typeof aufgabe_id !== "undefined") aufgabe_id = Number(aufgabe_id);

    if (formular_oeffnen) {
        const $neues_modal = Schnittstelle_DomNeuesModalInitialisiertZurueck(title, "aufgabe_basiseigenschaften");
        Schnittstelle_DomModalOeffnen($neues_modal);
        Liste_ElementFormularInitialisieren($neues_modal.find(".formular"), "erstellen", aufgabe_id, "aufgaben");
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
                if (typeof AJAX.antwort.aufgabe_id !== "undefined") AJAX.data.id = Number(AJAX.antwort.aufgabe_id);
                else AJAX.data.id = LISTEN["aufgaben"].tabelle.length + 1;
                const aufgabe_id = AJAX.data.id;

                $.each(AJAX.data, function (eigenschaft, wert) {
                    if (eigenschaft != "ajax_id" && eigenschaft != CSRF_NAME) Schnittstelle_VariableRein(wert, eigenschaft, aufgabe_id, "aufgaben");
                });
                Schnittstelle_EventVariableUpdLocalstorage("aufgaben");
                Schnittstelle_EventLocalstorageUpdVariable("aufgaben");
                Schnittstelle_EventLocalstorageUpdVariable("aufgaben_rueckmeldungen");
                // Schnittstelle_VariableElementZuordnen("aufgaben");
                Schnittstelle_VariableElementZuordnen("aufgaben_rueckmeldungen");
                Schnittstelle_VariableElementErgaenzen("aufgaben");
                Schnittstelle_VariableElementErgaenzen("aufgaben_rueckmeldungen");
                Schnittstelle_EventVariableUpdDom("aufgaben");
                Schnittstelle_EventVariableUpdDom("aufgaben_rueckmeldungen");

                if ("dom" in AJAX && "$modal" in AJAX.dom && AJAX.dom.$modal.exists()) Schnittstelle_DomModalSchliessen(AJAX.dom.$modal);
                Schnittstelle_DomToastFeuern(Liste_ElementBeschriftungZurueck(aufgabe_id, "aufgaben") + " wurde erfolgreich erstellt.");
            },
            function (AJAX) {
                if (isString(AJAX.antwort.validation)) Schnittstelle_DomToastFeuern(AJAX.antwort.validation, "danger");
                else if ("dom" in AJAX && "$formular" in AJAX.dom && AJAX.dom.$formular.exists())
                    Liste_ElementFormularValidationAktualisieren(AJAX.dom.$formular, AJAX.antwort.validation);
            }
        );
    }
}
