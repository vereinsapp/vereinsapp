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
        const $modal = Dom_$ModalInitialisiertZurueck(
            Liste_ElementBeschriftungErsetztZurueck(modal_title, {
                element1: { liste: liste },
            }),
            LISTEN[liste].element + "_basiseigenschaften",
        );
        Dom_$ModalOeffnen($modal);

        const $formular = $modal.find(".formular");
        $formular.attr("liste", liste).attr("werkzeug", "element_erstellen");
        if (typeof element_id !== "undefined") $formular.attr(LISTEN[liste].element + "_id", element_id);
        Liste_Element$FormularInitialisieren($formular);
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
                delete AJAX.data.liste;

                if (typeof AJAX.antwort[LISTEN[liste].element + "_id"] !== "undefined")
                    AJAX.data[LISTEN[liste].element + "_id"] = Number(AJAX.antwort[LISTEN[liste].element + "_id"]);
                else AJAX.data[LISTEN[liste].element + "_id"] = LISTEN[liste].tabelle.length + 1;
                const element_id = AJAX.data[LISTEN[liste].element + "_id"];
                delete AJAX.data[LISTEN[liste].element + "_id"];

                Liste_ElementWertRein(element_id, "id", element_id, liste);
                $.each(AJAX.data, function (eigenschaft, wert) {
                    Liste_ElementWertRein(wert, eigenschaft, element_id, liste);
                });

                Liste_EventLocalstorageListenAktualisieren(liste);
                Liste_EventVariableListenAktualisieren(liste);
                Liste_ElementWertErgaenzen(liste);
                Liste_EventDomAktualisieren(liste);

                if ("dom" in AJAX && "$modal" in AJAX.dom && AJAX.dom.$modal.exists()) Dom_$ModalSchliessen(AJAX.dom.$modal);
                Dom_ToastFeuern(
                    Liste_ElementBeschriftungErsetztZurueck(WERKZEUGE.element_erstellen.beschriftung.erfolg, {
                        element1: { liste: liste, [LISTEN[liste].element + "_id"]: element_id },
                    }),
                );
            },
            function (AJAX) {
                if (isString(AJAX.antwort.validation)) Dom_ToastFeuern(AJAX.antwort.validation, "danger");
                else if (isObject(AJAX.antwort.validation) && "dom" in AJAX && "$formular" in AJAX.dom && AJAX.dom.$formular.exists())
                    Liste_Element$FormularValidationAktualisieren(AJAX.dom.$formular, AJAX.antwort.validation);
                Dom_ToastFeuern(
                    Liste_ElementBeschriftungErsetztZurueck(WERKZEUGE.element_erstellen.beschriftung.fehler, {
                        element1: { liste: AJAX.data.liste },
                    }),
                    "danger",
                );
            },
        );
    }
}
