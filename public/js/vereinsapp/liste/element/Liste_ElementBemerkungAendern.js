/**
 * @param {boolean} formular_oeffnen
 * @param {Object} dom
 * @param {Object} data
 * @param {number} element_id
 * @param {string} liste
 */

function Liste_ElementBemerkungAendern(formular_oeffnen, dom, data, element_id, liste) {
    if (formular_oeffnen) {
        const $neues_modal = Schnittstelle_Dom$NeuesModalInitialisiertZurueck(undefined, "bemerkung_aendern_modal");
        Schnittstelle_Dom$ModalOeffnen($neues_modal);
        const $neues_formular = $neues_modal.find(".formular");
        $neues_formular
            .attr("data-werkzeug", "bemerkung_aendern")
            .attr("data-liste", liste)
            .attr("data-" + LISTEN[liste].element + "_id", element_id);
        Schnittstelle_Dom$Quelle$ZielVerknuepfen($neues_formular.find(".formular_werkzeug"), dom.$ausloesend.closest(".element"));
        Liste_Element$FormularInitialisieren($neues_modal.find(".formular"));
    } else {
        dom.$element = Schnittstelle_Dom$ZielZu$QuelleZurueck(dom.$ausloesend);
        Schnittstelle_Dom$Quelle$ZielEntknuepfen(dom.$ausloesend, dom.$element);
        const ajax_dom = dom;

        if (!("bemerkung" in data)) data.bemerkung = Schnittstelle_VariableRausZurueck("bemerkung", element_id, liste, null);
        const ajax_data = Schnittstelle_VariableWertBereinigtZurueck(data, new Object());
        ajax_data[LISTEN[liste].element + "_id"] = element_id;
        ajax_data.liste = liste;
        if (isEmptyString(ajax_data.bemerkung)) ajax_data.bemerkung = null;

        Schnittstelle_AjaxInDieSchlange(
            LISTEN[liste].controller + "/ajax_" + LISTEN[liste].element + "_bemerkung_aendern",
            ajax_data,
            ajax_dom,
            function (AJAX) {
                const liste = AJAX.data.liste;
                const element_id = AJAX.data[LISTEN[liste].element + "_id"];

                Schnittstelle_VariableRein(AJAX.data.bemerkung, "bemerkung", element_id, liste);

                Schnittstelle_EventVariableUpdLocalstorage(liste);
                Schnittstelle_EventLocalstorageUpdVariable(liste);
                Schnittstelle_VariableElementZuordnen(liste);
                Schnittstelle_VariableElementErgaenzen(liste);
                Schnittstelle_EventVariableUpdDom(liste);

                if ("dom" in AJAX && "$element" in AJAX.dom && AJAX.dom.$element.exists() && liste !== AJAX.dom.$element.attr("data-liste"))
                    Liste_$ElementAktualisieren(AJAX.dom.$element);

                if ("dom" in AJAX && "$modal" in AJAX.dom && AJAX.dom.$modal.exists()) {
                    Schnittstelle_Dom$ModalSchliessen(AJAX.dom.$modal);
                    Schnittstelle_DomToastFeuern("Bemerkung wurde erfolgreich geändert.");
                }
            },
            function (AJAX) {
                if (isString(AJAX.antwort.validation)) Schnittstelle_DomToastFeuern(AJAX.antwort.validation, "danger");
                else if ("dom" in AJAX && "$formular" in AJAX.dom && AJAX.dom.$formular.exists())
                    Liste_Element$FormularValidationAktualisieren(AJAX.dom.$formular, AJAX.antwort.validation);
                Schnittstelle_DomToastFeuern("Bemerkung konnte nicht geändert werden.", "danger");
            },
        );
    }
}
