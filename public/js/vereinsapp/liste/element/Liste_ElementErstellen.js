/**
 * @param {boolean} data_vollstaendig
 * @param {Object} dom
 * @param {Object} data
 * @param {string} modal_title
 * @param {number} element_id
 * @param {string} liste
 */

function Liste_ElementErstellen(data_vollstaendig, dom, data, modal_title, element_id, liste) {
    if (!data_vollstaendig) {
        const $neues_modal = Dom_$NeuesModalInitialisiertZurueck(
            Liste_ElementTextMitBeschriftungErsetztZurueck(modal_title, {
                element1: { liste: liste },
            }),
            LISTEN[liste].element + "_basiseigenschaften",
        );
        Dom_$ModalOeffnen($neues_modal);

        const $neues_formular = $neues_modal.find(".formular");
        $neues_formular.attr("liste", liste);
        if (typeof element_id !== "undefined")
            $neues_formular.attr("werkzeug", "element_duplizieren").attr(LISTEN[liste].element + "_id", element_id);
        else $neues_formular.attr("werkzeug", "element_erstellen");
        Liste_Element$FormularInitialisieren($neues_formular);
    } else {
        const ajax_dom = dom;

        data.liste = liste;
        const ajax_data = LISTEN[liste].element_erstellen_data_vervollstaendigen_aktion(data);

        Ajax_InDieSchlange(
            liste + "/ajax_" + LISTEN[liste].element + "_speichern",
            ajax_data,
            ajax_dom,
            function (AJAX) {
                const liste = AJAX.data.liste;

                if (typeof AJAX.antwort[LISTEN[liste].element + "_id"] !== "undefined")
                    AJAX.data[LISTEN[liste].element + "_id"] = Number(AJAX.antwort[LISTEN[liste].element + "_id"]);
                else AJAX.data[LISTEN[liste].element + "_id"] = LISTEN[liste].tabelle.length + 1;
                const element_id = AJAX.data[LISTEN[liste].element + "_id"];
                delete AJAX.data[LISTEN[liste].element + "_id"];

                Liste_VariableRein(element_id, "id", element_id, liste);
                $.each(AJAX.data, function (eigenschaft, wert) {
                    Liste_VariableRein(wert, eigenschaft, element_id, liste);
                });

                Liste_EventVariableUpdLocalstorage(liste);
                Liste_EventLocalstorageUpdVariable(liste);
                Liste_VerknuepfungenZuordnen(liste);
                Liste_ElementErgaenzen(liste);
                Liste_EventVariableUpdDom(liste);

                if ("dom" in AJAX && "$modal" in AJAX.dom && AJAX.dom.$modal.exists()) Dom_$ModalSchliessen(AJAX.dom.$modal);
                Dom_ToastFeuern(
                    Liste_ElementTextMitBeschriftungErsetztZurueck(TEXTE.element1_erstellen.erfolg, {
                        element1: { liste: liste, [LISTEN[liste].element + "_id"]: element_id },
                    }),
                );
            },
            function (AJAX) {
                if (isString(AJAX.antwort.validation)) Dom_ToastFeuern(AJAX.antwort.validation, "danger");
                else if (isObject(AJAX.antwort.validation) && "dom" in AJAX && "$formular" in AJAX.dom && AJAX.dom.$formular.exists())
                    Liste_Element$FormularValidationAktualisieren(AJAX.dom.$formular, AJAX.antwort.validation);
                Dom_ToastFeuern(
                    Liste_ElementTextMitBeschriftungErsetztZurueck(TEXTE.element1_erstellen.fehler, {
                        element1: {
                            liste: AJAX.data.liste,
                            [LISTEN[AJAX.data.liste].element + "_id"]: AJAX.data[LISTEN[AJAX.data.liste].element + "_id"],
                        },
                    }),
                    "danger",
                );
            },
        );
    }
}
