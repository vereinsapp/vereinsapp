/**
 * @param {boolean} data_vollstaendig
 * @param {Object} dom
 * @param {Object} data
 * @param {string} modal_title
 * @param {number} termin_id
 */

function Termine_TerminAendern(data_vollstaendig, dom, data, modal_title, termin_id) {
    if (!data_vollstaendig) {
        const $neues_modal = Schnittstelle_Dom$NeuesModalInitialisiertZurueck(modal_title, "termin_basiseigenschaften");
        Schnittstelle_Dom$ModalOeffnen($neues_modal);
        const $neues_formular = $neues_modal.find(".formular");
        $neues_formular.attr("data-liste", "termine").attr("data-werkzeug", "termin_aendern").attr("data-termin_id", termin_id);
        Liste_Element$FormularInitialisieren($neues_formular);
    } else {
        const ajax_dom = dom;

        if (!("titel" in data)) data.titel = Schnittstelle_VariableRausZurueck("titel", termin_id, "termine", undefined);
        if (!("start" in data)) data.start = Schnittstelle_VariableRausZurueck("start", termin_id, "termine", undefined);
        if (!("ende" in data)) data.ende = Schnittstelle_VariableRausZurueck("ende", termin_id, "termine", undefined);
        if (!("ort" in data)) data.ort = Schnittstelle_VariableRausZurueck("ort", termin_id, "termine", undefined);
        if (!("kategorie" in data)) data.kategorie = Schnittstelle_VariableRausZurueck("kategorie", termin_id, "termine", undefined);
        if (!("filtern_mitglieder" in data))
            data.filtern_mitglieder = Schnittstelle_VariableRausZurueck("filtern_mitglieder", termin_id, "termine", undefined);
        if (!("oeffentlich_janein" in data))
            data.oeffentlich_janein = Number(Schnittstelle_VariableRausZurueck("oeffentlich_janein", termin_id, "termine", undefined));
        if (!("bemerkung" in data)) data.bemerkung = Schnittstelle_VariableRausZurueck("bemerkung", termin_id, "termine", null);
        const ajax_data = Schnittstelle_VariableWertBereinigtZurueck(data, new Object());
        ajax_data.termin_id = termin_id;
        if (isLuxonDateTime(ajax_data.start)) ajax_data.start = ajax_data.start.toISO();
        if (isLuxonDateTime(ajax_data.ende)) ajax_data.ende = ajax_data.ende.toISO();
        else ajax_data.ende = ajax_data.start;
        if ("filtern_mitglieder" in ajax_data) ajax_data.filtern_mitglieder = JsonStringifiedZurueck(ajax_data.filtern_mitglieder, new Object());
        if (isEmptyString(ajax_data.bemerkung)) ajax_data.bemerkung = null;

        Schnittstelle_AjaxInDieSchlange(
            "termine/ajax_termin_speichern",
            ajax_data,
            ajax_dom,
            function (AJAX) {
                const termin_id = AJAX.data.termin_id;
                delete AJAX.data.termin_id;

                $.each(AJAX.data, function (eigenschaft, wert) {
                    Schnittstelle_VariableRein(wert, eigenschaft, termin_id, "termine");
                });

                Schnittstelle_EventVariableUpdLocalstorage("termine");
                Schnittstelle_EventLocalstorageUpdVariable("termine");
                Liste_VerknuepfungenZuordnen("termine");
                Schnittstelle_VariableElementErgaenzen("termine");
                Schnittstelle_EventVariableUpdDom("termine");

                if ("dom" in AJAX && "$modal" in AJAX.dom && AJAX.dom.$modal.exists()) Schnittstelle_Dom$ModalSchliessen(AJAX.dom.$modal);
                Schnittstelle_DomToastFeuern(
                    Liste_ElementTextMitBeschriftungErsetztZurueck(TEXTE.element1_aendern.erfolg, {
                        element1: { liste: "termine", termin_id: termin_id },
                    }),
                );
            },
            function (AJAX) {
                if (isString(AJAX.antwort.validation)) Schnittstelle_DomToastFeuern(AJAX.antwort.validation, "danger");
                else if (isObject(AJAX.antwort.validation) && "dom" in AJAX && "$formular" in AJAX.dom && AJAX.dom.$formular.exists())
                    Liste_Element$FormularValidationAktualisieren(AJAX.dom.$formular, AJAX.antwort.validation);
                Schnittstelle_DomToastFeuern(
                    Liste_ElementTextMitBeschriftungErsetztZurueck(TEXTE.element1_aendern.fehler, {
                        element1: { liste: "termine", termin_id: AJAX.data.termin_id },
                    }),
                    "danger",
                );
            },
        );
    }
}
