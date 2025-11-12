/**
 * @param {boolean} formular_oeffnen
 * @param {Object} dom
 * @param {Object} data
 * @param {string} title
 * @param {number} termin_id
 */

function Termine_TerminErstellen(formular_oeffnen, dom, data, title, termin_id) {
    if (typeof termin_id !== "undefined") termin_id = Number(termin_id);

    if (formular_oeffnen) {
        const $neues_modal = Schnittstelle_DomNeuesModalInitialisiertZurueck(title, "termin_basiseigenschaften");
        Schnittstelle_DomModalOeffnen($neues_modal);
        Liste_ElementFormularInitialisieren($neues_modal.find(".formular"), "erstellen", termin_id, "termine");
    } else {
        if (!dom.$btn_ausloesend.hasClass("element")) Schnittstelle_BtnWartenStart(dom.$btn_ausloesend);

        const ajax_dom = dom;

        if (typeof data.filtern_mitglieder === "undefined" || ("filtern_mitglieder" in data && data.filtern_mitglieder == ""))
            data.filtern_mitglieder = new Object();
        const ajax_data = Schnittstelle_VariableWertBereinigtZurueck(data, new Object());
        if (isLuxonDateTime(ajax_data.start)) ajax_data.start = ajax_data.start.toISO();
        if (isLuxonDateTime(ajax_data.ende)) ajax_data.ende = ajax_data.ende.toISO();
        else ajax_data.ende = ajax_data.start;
        if ("filtern_mitglieder" in ajax_data) ajax_data.filtern_mitglieder = JsonStringifiedZurueck(ajax_data.filtern_mitglieder, new Object());
        if (!("bemerkung" in ajax_data) || isEmptyString(ajax_data.bemerkung)) ajax_data.bemerkung = null;

        Schnittstelle_AjaxInDieSchlange(
            "termine/ajax_termin_speichern",
            ajax_data,
            ajax_dom,
            function (AJAX) {
                if (typeof AJAX.antwort.termin_id !== "undefined") AJAX.data.id = Number(AJAX.antwort.termin_id);
                else AJAX.data.id = LISTEN["termine"].tabelle.length + 1;
                const termin_id = AJAX.data.id;

                $.each(AJAX.data, function (eigenschaft, wert) {
                    if (eigenschaft != "ajax_id" && eigenschaft != CSRF_NAME) Schnittstelle_VariableRein(wert, eigenschaft, termin_id, "termine");
                });

                Schnittstelle_EventVariableUpdLocalstorage("termine");
                Schnittstelle_EventLocalstorageUpdVariable("termine");
                // Schnittstelle_VariableElementZuordnen("termine");
                Schnittstelle_VariableElementErgaenzen("termine");
                Schnittstelle_EventVariableUpdDom("termine");
                Schnittstelle_EventVariableUpdDom("termine_rueckmeldungen");

                if ("dom" in AJAX && "$btn_ausloesend" in AJAX.dom && AJAX.dom.$btn_ausloesend.exists() && !dom.$btn_ausloesend.hasClass("element"))
                    Schnittstelle_BtnWartenEnde(AJAX.dom.$btn_ausloesend);
                if ("dom" in AJAX && "$modal" in AJAX.dom && AJAX.dom.$modal.exists()) Schnittstelle_DomModalSchliessen(AJAX.dom.$modal);
                Schnittstelle_DomToastFeuern(Liste_ElementBeschriftungZurueck(termin_id, "termine") + " wurde erfolgreich erstellt.");
            },
            function (AJAX) {
                if ("dom" in AJAX && "$btn_ausloesend" in AJAX.dom && AJAX.dom.$btn_ausloesend.exists() && !dom.$btn_ausloesend.hasClass("element"))
                    Schnittstelle_BtnWartenEnde(AJAX.dom.$btn_ausloesend);
                if (isString(AJAX.antwort.validation)) Schnittstelle_DomToastFeuern(AJAX.antwort.validation, "danger");
                else if ("dom" in AJAX && "$formular" in AJAX.dom && AJAX.dom.$formular.exists())
                    Liste_ElementFormularValidationAktualisieren(AJAX.dom.$formular, AJAX.antwort.validation);
            }
        );
    }
}
