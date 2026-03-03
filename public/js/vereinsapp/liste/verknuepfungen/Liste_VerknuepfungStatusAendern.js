/**
 * @param {Object} dom
 * @param {number} status
 * @param {number} verknuepfung_id
 * @param {string} verknuepfungen
 */

function Liste_VerknuepfungStatusAendern(dom, status, verknuepfung_id, verknuepfungen) {
    const ajax_dom = dom;
    const ajax_data = new Object();
    ajax_data.verknuepfungen = verknuepfungen;
    ajax_data[LISTEN[verknuepfungen].element + "_id"] = verknuepfung_id;
    ajax_data.status = status;

    Ajax_InDieSchlange(
        LISTEN[verknuepfungen].controller + "/ajax_" + LISTEN[verknuepfungen].element + "_status_aendern",
        ajax_data,
        ajax_dom,
        function (AJAX) {
            const verknuepfungen = AJAX.data.verknuepfungen;
            delete AJAX.data.verknuepfungen;
            const verknuepfung_id = AJAX.data[LISTEN[verknuepfungen].element + "_id"];
            delete AJAX.data[LISTEN[verknuepfungen].element + "_id"];

            $.each(AJAX.data, function (eigenschaft, wert) {
                Liste_VariableRein(wert, eigenschaft, verknuepfung_id, verknuepfungen);
            });

            if ("dbdata" in AJAX.antwort && isArray(AJAX.antwort.dbdata))
                $.each(AJAX.antwort.dbdata, function (position, element) {
                    if ("id" in element)
                        $.each(element, function (eigenschaft, wert) {
                            Liste_VariableRein(wert, eigenschaft, Number(element.id), verknuepfungen);
                        });
                });

            Liste_EventVariableUpdLocalstorage(verknuepfungen);
            Liste_EventLocalstorageUpdVariable(verknuepfungen);
            Liste_VerknuepfungenZuordnen(verknuepfungen);
            Liste_ElementErgaenzen(verknuepfungen);
            Liste_EventVariableUpdDom(verknuepfungen);

            if ("dom" in AJAX && "$modal" in AJAX.dom && AJAX.dom.$modal.exists()) {
                Dom_$ModalSchliessen(AJAX.dom.$modal);
                Dom_ToastFeuern(
                    Liste_ElementTextMitBeschriftungErsetztZurueck(TEXTE.element1_aendern.erfolg, {
                        element1: {
                            liste: verknuepfungen,
                            [LISTEN[verknuepfungen].element + "_id"]: AJAX.data[LISTEN[verknuepfungen].element + "_id"],
                        },
                    }),
                );
            }
        },
        function (AJAX) {
            if (isString(AJAX.antwort.validation)) Dom_ToastFeuern(AJAX.antwort.validation, "danger");
            else if (isObject(AJAX.antwort.validation) && "dom" in AJAX && "$formular" in AJAX.dom && AJAX.dom.$formular.exists())
                Liste_Element$FormularValidationAktualisieren(AJAX.dom.$formular, AJAX.antwort.validation);
            Dom_ToastFeuern(
                Liste_ElementTextMitBeschriftungErsetztZurueck(TEXTE.element1_aendern.fehler, {
                    element1: {
                        liste: AJAX.data.verknuepfungen,
                        [LISTEN[AJAX.data.verknuepfungen].element + "_id"]: AJAX.data[LISTEN[AJAX.data.verknuepfungen].element + "_id"],
                    },
                }),
                "danger",
            );
        },
    );
}
