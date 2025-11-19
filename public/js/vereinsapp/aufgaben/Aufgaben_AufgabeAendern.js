/**
 * @param {boolean} formular_oeffnen
 * @param {Object} dom
 * @param {Object} data
 * @param {string} title
 * @param {number} aufgabe_id
 */

function Aufgaben_AufgabeAendern(formular_oeffnen, dom, data, title, aufgabe_id) {
    if (typeof aufgabe_id !== "undefined") aufgabe_id = Number(aufgabe_id);

    if (formular_oeffnen) {
        const $neues_modal = Schnittstelle_DomNeuesModalInitialisiertZurueck(title, "aufgabe_basiseigenschaften");
        Schnittstelle_DomModalOeffnen($neues_modal);
        Liste_ElementFormularInitialisieren($neues_modal.find(".formular"), "aendern", aufgabe_id, "aufgaben");
    } else {
        Schnittstelle_BtnWartenStart(dom.$btn_ausloesend);

        const ajax_dom = dom;

        if (!("titel" in data)) data.titel = Schnittstelle_VariableRausZurueck("titel", aufgabe_id, "aufgaben", undefined);
        if (!("max_anzahl_mitglieder" in data))
            data.max_anzahl_mitglieder = Schnittstelle_VariableRausZurueck("max_anzahl_mitglieder", aufgabe_id, "aufgaben", null);
        if (!("bemerkung" in data)) data.bemerkung = Schnittstelle_VariableRausZurueck("bemerkung", aufgabe_id, "aufgaben", null);
        const ajax_data = Schnittstelle_VariableWertBereinigtZurueck(data, new Object());
        ajax_data.id = aufgabe_id;
        if (isEmptyString(ajax_data.max_anzahl_mitglieder)) ajax_data.max_anzahl_mitglieder = null;
        if (isEmptyString(ajax_data.bemerkung)) ajax_data.bemerkung = null;

        Schnittstelle_AjaxInDieSchlange(
            "aufgaben/ajax_aufgabe_speichern",
            ajax_data,
            ajax_dom,
            function (AJAX) {
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

                if ("dom" in AJAX && "$btn_ausloesend" in AJAX.dom && AJAX.dom.$btn_ausloesend.exists())
                    Schnittstelle_BtnWartenEnde(AJAX.dom.$btn_ausloesend);
                if ("dom" in AJAX && "$modal" in AJAX.dom && AJAX.dom.$modal.exists()) {
                    Schnittstelle_DomModalSchliessen(AJAX.dom.$modal);
                    Schnittstelle_DomToastFeuern(Liste_ElementBeschriftungZurueck(aufgabe_id, "aufgaben") + " wurde erfolgreich geändert.");
                }
            },
            function (AJAX) {
                if ("dom" in AJAX && "$btn_ausloesend" in AJAX.dom && AJAX.dom.$btn_ausloesend.exists())
                    Schnittstelle_BtnWartenEnde(AJAX.dom.$btn_ausloesend);
                if (isString(AJAX.antwort.validation)) Schnittstelle_DomToastFeuern(AJAX.antwort.validation, "danger");
                else if ("dom" in AJAX && "$formular" in AJAX.dom && AJAX.dom.$formular.exists())
                    Liste_ElementFormularValidationAktualisieren(AJAX.dom.$formular, AJAX.antwort.validation);
                Schnittstelle_DomToastFeuern(
                    Liste_ElementBeschriftungZurueck(AJAX.data.id, "aufgaben") + " konnte nicht gespeichert werden.",
                    "danger"
                );
            }
        );
    }
}
