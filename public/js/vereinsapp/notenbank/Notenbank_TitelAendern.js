/**
 * @param {boolean} data_vollstaendig
 * @param {Object} dom
 * @param {Object} data
 * @param {string} modal_title
 * @param {number} titel_id
 */

function Notenbank_TitelAendern(data_vollstaendig, dom, data, modal_title, titel_id) {
    if (!data_vollstaendig) {
        const $neues_modal = Schnittstelle_Dom$NeuesModalInitialisiertZurueck(modal_title, "titel_basiseigenschaften");
        Schnittstelle_Dom$ModalOeffnen($neues_modal);
        const $neues_formular = $neues_modal.find(".formular");
        $neues_formular.attr("data-liste", "notenbank").attr("data-werkzeug", "titel_aendern").attr("data-titel_id", titel_id);
        Liste_Element$FormularInitialisieren($neues_formular);
    } else {
        const ajax_dom = dom;

        if (!("titel" in data)) data.titel = Schnittstelle_VariableRausZurueck("titel", titel_id, "notenbank", undefined);
        if (!("titel_nr" in data)) data.titel_nr = Schnittstelle_VariableRausZurueck("titel_nr", titel_id, "notenbank", undefined);
        if (!("kategorie" in data)) data.kategorie = Schnittstelle_VariableRausZurueck("kategorie", titel_id, "notenbank", undefined);
        if (!("komponist" in data)) data.komponist = Schnittstelle_VariableRausZurueck("komponist", titel_id, "notenbank", null);
        if (!("bemerkung" in data)) data.bemerkung = Schnittstelle_VariableRausZurueck("bemerkung", titel_id, "notenbank", null);
        const ajax_data = Schnittstelle_VariableWertBereinigtZurueck(data, new Object());
        ajax_data.titel_id = titel_id;
        if (isEmptyString(ajax_data.komponist)) ajax_data.komponist = null;
        if (isEmptyString(ajax_data.bemerkung)) ajax_data.bemerkung = null;

        Schnittstelle_AjaxInDieSchlange(
            "notenbank/ajax_titel_speichern",
            ajax_data,
            ajax_dom,
            function (AJAX) {
                const titel_id = AJAX.data.titel_id;
                delete AJAX.data.titel_id;

                $.each(AJAX.data, function (eigenschaft, wert) {
                    Schnittstelle_VariableRein(wert, eigenschaft, titel_id, "notenbank");
                });

                Schnittstelle_EventVariableUpdLocalstorage("notenbank");
                Schnittstelle_EventLocalstorageUpdVariable("notenbank");
                Liste_VerknuepfungenZuordnen("notenbank");
                Schnittstelle_VariableElementErgaenzen("notenbank");
                Schnittstelle_EventVariableUpdDom("notenbank");

                if ("dom" in AJAX && "$modal" in AJAX.dom && AJAX.dom.$modal.exists()) Schnittstelle_Dom$ModalSchliessen(AJAX.dom.$modal);
                Schnittstelle_DomToastFeuern(
                    Liste_ElementTextMitBeschriftungErsetztZurueck(TEXTE.element1_aendern.erfolg, {
                        element1: { liste: "notenbank", titel_id: titel_id },
                    }),
                );
            },
            function (AJAX) {
                if (isString(AJAX.antwort.validation)) Schnittstelle_DomToastFeuern(AJAX.antwort.validation, "danger");
                else if (isObject(AJAX.antwort.validation) && "dom" in AJAX && "$formular" in AJAX.dom && AJAX.dom.$formular.exists())
                    Liste_Element$FormularValidationAktualisieren(AJAX.dom.$formular, AJAX.antwort.validation);
                Schnittstelle_DomToastFeuern(
                    Liste_ElementTextMitBeschriftungErsetztZurueck(TEXTE.element1_aendern.fehler, {
                        element1: { liste: "notenbank", titel_id: AJAX.data.titel_id },
                    }),
                    "danger",
                );
            },
        );
    }
}
