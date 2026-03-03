/**
 * @param {boolean} data_vollstaendig
 * @param {Object} dom
 * @param {Object} data
 * @param {string} modal_title
 * @param {number} element_id
 * @param {string} liste
 */

function Liste_ElementAendern(data_vollstaendig, dom, data, modal_title, element_id, liste) {
    if (!data_vollstaendig) {
        const $neues_modal = Schnittstelle_Dom$NeuesModalInitialisiertZurueck(modal_title, LISTEN[liste].element + "_basiseigenschaften");
        Schnittstelle_Dom$ModalOeffnen($neues_modal);

        const $neues_formular = $neues_modal.find(".formular");
        $neues_formular
            .attr("liste", liste)
            .attr("werkzeug", LISTEN[liste].element + "_aendern")
            .attr(LISTEN[liste].element + "_id", element_id);
        Liste_Element$FormularInitialisieren($neues_formular);
    } else {
        const ajax_dom = dom;

        data.liste = liste;
        data[LISTEN[liste].element + "_id"] = element_id;
        const ajax_data = LISTEN[liste].element_aendern_data_vervollstaendigen_aktion(data, element_id);

        Schnittstelle_AjaxInDieSchlange(
            liste + "/ajax_" + LISTEN[liste].element + "_speichern",
            ajax_data,
            ajax_dom,
            function (AJAX) {
                const element_id = AJAX.data[LISTEN[liste].element + "_id"];
                delete AJAX.data[LISTEN[liste].element + "_id"];

                $.each(AJAX.data, function (eigenschaft, wert) {
                    Schnittstelle_VariableRein(wert, eigenschaft, element_id, liste);
                });

                Schnittstelle_EventVariableUpdLocalstorage(liste);
                Schnittstelle_EventLocalstorageUpdVariable(liste);
                Liste_VerknuepfungenZuordnen(liste);
                Schnittstelle_VariableElementErgaenzen(liste);
                Schnittstelle_EventVariableUpdDom(liste);

                if ("dom" in AJAX && "$modal" in AJAX.dom && AJAX.dom.$modal.exists()) Schnittstelle_Dom$ModalSchliessen(AJAX.dom.$modal);
                Schnittstelle_DomToastFeuern(
                    Liste_ElementTextMitBeschriftungErsetztZurueck(TEXTE.element1_aendern.erfolg, {
                        element1: { liste: liste, [LISTEN[liste].element + "_id"]: element_id },
                    }),
                );
            },
            function (AJAX) {
                if (isString(AJAX.antwort.validation)) Schnittstelle_DomToastFeuern(AJAX.antwort.validation, "danger");
                else if (isObject(AJAX.antwort.validation) && "dom" in AJAX && "$formular" in AJAX.dom && AJAX.dom.$formular.exists())
                    Liste_Element$FormularValidationAktualisieren(AJAX.dom.$formular, AJAX.antwort.validation);
                Schnittstelle_DomToastFeuern(
                    Liste_ElementTextMitBeschriftungErsetztZurueck(TEXTE.element1_aendern.fehler, {
                        element1: { liste: liste, [LISTEN[liste].element + "_id"]: AJAX.data[LISTEN[liste].element + "_id"] },
                    }),
                    "danger",
                );
            },
        );
    }
}
