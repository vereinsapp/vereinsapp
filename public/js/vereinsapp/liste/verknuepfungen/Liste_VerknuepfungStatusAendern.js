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
    ajax_data.id = verknuepfung_id;
    ajax_data.status = status;

    Schnittstelle_AjaxInDieSchlange(
        LISTEN[verknuepfungen].controller + "/ajax_" + LISTEN[verknuepfungen].element + "_status_aendern",
        ajax_data,
        ajax_dom,
        function (AJAX) {
            const verknuepfungen = AJAX.data.verknuepfungen;
            const verknuepfung_id = AJAX.data.id;
            $.each(AJAX.data, function (eigenschaft, wert) {
                if (eigenschaft != "ajax_id" && eigenschaft != CSRF_NAME && eigenschaft != "verknuepfungen")
                    Schnittstelle_VariableRein(wert, eigenschaft, verknuepfung_id, verknuepfungen);
            });

            if ("dbdata" in AJAX.antwort && isArray(AJAX.antwort.dbdata))
                $.each(AJAX.antwort.dbdata, function (position, element) {
                    if ("id" in element)
                        $.each(element, function (eigenschaft, wert) {
                            Schnittstelle_VariableRein(wert, eigenschaft, Number(element.id), verknuepfungen);
                        });
                });

            Schnittstelle_EventVariableUpdLocalstorage(verknuepfungen);
            Schnittstelle_EventLocalstorageUpdVariable(verknuepfungen);
            Schnittstelle_VariableElementZuordnen(verknuepfungen);
            Schnittstelle_VariableElementErgaenzen(verknuepfungen);
            Schnittstelle_EventVariableUpdDom(verknuepfungen);

            if ("dom" in AJAX && "$modal" in AJAX.dom && AJAX.dom.$modal.exists()) {
                Schnittstelle_DomModalSchliessen(AJAX.dom.$modal);
                Schnittstelle_DomToastFeuern(Liste_ElementBeschriftungZurueck(verknuepfung_id, verknuepfungen) + " wurde erfolgreich geändert.");
            }
        },
        function (AJAX) {
            if (isString(AJAX.antwort.validation)) Schnittstelle_DomToastFeuern(AJAX.antwort.validation, "danger");
            Schnittstelle_DomToastFeuern(
                Liste_ElementBeschriftungZurueck(AJAX.data.id, AJAX.data.verknuepfungen) + " konnte nicht gespeichert werden.",
                "danger"
            );
        }
    );
}
