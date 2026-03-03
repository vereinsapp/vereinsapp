/**
 * @param {boolean} data_vollstaendig
 * @param {Object} dom
 * @param {Object} data
 * @param {number} element_id
 * @param {string} liste
 */

function Liste_ElementBemerkungAendern(data_vollstaendig, dom, data, element_id, liste) {
    if (!data_vollstaendig) {
        const $neues_modal = Dom_$NeuesModalInitialisiertZurueck(undefined, "bemerkung_aendern_modal");
        Dom_$ModalOeffnen($neues_modal);
        const $neues_formular = $neues_modal.find(".formular");
        $neues_formular
            .attr("liste", liste)
            .attr("werkzeug", "bemerkung_aendern")
            .attr(LISTEN[liste].element + "_id", element_id);
        Dom_$Quelle$ZielVerknuepfen($neues_formular.find(".data_vollstaendig"), dom.$werkzeug.closest(".element"));
        Liste_Element$FormularInitialisieren($neues_modal.find(".formular"));
    } else {
        dom.$element = Dom_$ZielZu$QuelleZurueck(dom.$werkzeug);
        Dom_$Quelle$ZielEntknuepfen(dom.$werkzeug, dom.$element);
        const ajax_dom = dom;

        if (!("bemerkung" in data)) data.bemerkung = Liste_VariableRausZurueck("bemerkung", element_id, liste, null);
        const ajax_data = Util_WertBereinigtZurueck(data, new Object());
        ajax_data[LISTEN[liste].element + "_id"] = element_id;
        ajax_data.liste = liste;
        if (isEmptyString(ajax_data.bemerkung)) ajax_data.bemerkung = null;

        Ajax_InDieSchlange(
            LISTEN[liste].controller + "/ajax_" + LISTEN[liste].element + "_bemerkung_aendern",
            ajax_data,
            ajax_dom,
            function (AJAX) {
                const liste = AJAX.data.liste;
                const element_id = AJAX.data[LISTEN[liste].element + "_id"];

                Liste_VariableRein(AJAX.data.bemerkung, "bemerkung", element_id, liste);

                Liste_EventVariableUpdLocalstorage(liste);
                Liste_EventLocalstorageUpdVariable(liste);
                Liste_VerknuepfungenZuordnen(liste);
                Liste_ElementErgaenzen(liste);
                Liste_EventVariableUpdDom(liste);

                if ("dom" in AJAX && "$element" in AJAX.dom && AJAX.dom.$element.exists() && liste !== AJAX.dom.$element.attr("liste"))
                    Liste_$ElementAktualisieren(AJAX.dom.$element);

                if ("dom" in AJAX && "$modal" in AJAX.dom && AJAX.dom.$modal.exists()) {
                    Dom_$ModalSchliessen(AJAX.dom.$modal);
                    Dom_ToastFeuern("Bemerkung wurde erfolgreich geändert.");
                }
            },
            function (AJAX) {
                if (isString(AJAX.antwort.validation)) Dom_ToastFeuern(AJAX.antwort.validation, "danger");
                else if ("dom" in AJAX && "$formular" in AJAX.dom && AJAX.dom.$formular.exists())
                    Liste_Element$FormularValidationAktualisieren(AJAX.dom.$formular, AJAX.antwort.validation);
                Dom_ToastFeuern("Bemerkung konnte nicht geändert werden.", "danger");
            },
        );
    }
}
