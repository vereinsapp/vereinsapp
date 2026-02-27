/**
 * @param {JQuery} $formular
 */

function Liste_Element$FormularInitialisieren($formular) {
    const liste = Schnittstelle_VariableWertBereinigtZurueck($formular.attr("data-liste"), undefined);
    const element_id = Schnittstelle_VariableWertBereinigtZurueck($formular.attr("data-" + LISTEN[liste].element + "_id"), undefined);
    const werkzeug = Schnittstelle_VariableWertBereinigtZurueck($formular.attr("data-werkzeug"), undefined);

    $formular.find(".eingabe").each(function () {
        const $eingabe = $(this);
        const eingabe = $eingabe.attr("data-eingabe");

        let wert = Schnittstelle_VariableRausZurueck(eingabe, element_id, liste, undefined);
        // Wenn aber nichts definiert ist, dann nimm den Standard-Wert (je nach Typ)
        if (typeof wert === "undefined") {
            if ($eingabe.prop("tagName") == "SELECT") wert = $eingabe.find("option:first").val();
            else if ($eingabe.attr("type") == "date") wert = DATETIME.now().plus({ days: 1 });
            else if ($eingabe.attr("type") == "time") wert = DATETIME.now().plus({ minutes: 1 });
            else if ($eingabe.attr("type") == "datetime-local") wert = DATETIME.now().plus({ minutes: 1 });
            else wert = "";
        }

        let wert_formatiert = wert;
        // Wenn aber die Eigenschaft ein Datum ist
        if ($eingabe.attr("type") == "date") wert_formatiert = wert.toISODate();
        // Oder wenn aber die Eigenschaft eine Uhrzeit ist
        else if ($eingabe.attr("type") == "time")
            wert_formatiert = wert.set({ seconds: 0, milliseconds: 0 }).toISOTime({
                includeOffset: false,
                suppressSeconds: true,
                suppressMilliseconds: true,
            });
        // Oder wenn aber die Eigenschaft ein Datum und eine Uhrzeit ist
        else if ($eingabe.attr("type") == "datetime-local")
            wert_formatiert = wert.set({ seconds: 0, milliseconds: 0 }).toISO({
                includeOffset: false,
                suppressSeconds: true,
                suppressMilliseconds: true,
            });
        // Oder wenn aber die Eigenschaft ein janein ist
        else if (EIGENSCHAFTEN[liste][eingabe].typ == "janein") wert_formatiert = Number(wert);
        // Oder wenn aber die Eigenschaft ein Objekt ist
        else if (isObject(wert)) wert_formatiert = JsonStringifiedZurueck(wert, new Object());
        // Oder wenn aber die Eigenschaft ein Array ist
        else if (isArray(wert)) wert_formatiert = JsonStringifiedZurueck(wert, new Array());

        $eingabe.val(wert_formatiert).trigger("change");
    });

    const $formular_werkzeug = $formular.find(".formular_werkzeug");
    if (typeof werkzeug !== "undefined" && werkzeug in WERKZEUGE) {
        $formular_werkzeug.removeClass("formular_werkzeug").addClass("werkzeug").attr("data-werkzeug", werkzeug);
        if ("farbe" in WERKZEUGE[werkzeug])
            $formular_werkzeug.removeClass("btn-outline-success").addClass("btn-outline-" + WERKZEUGE[werkzeug].farbe);
        $formular_werkzeug.find(".beschriftung").text(WERKZEUGE[werkzeug].beschriftung);
    }
    $formular_werkzeug.attr("data-liste", liste).attr("data-" + LISTEN[liste].element + "_id", element_id);
}
