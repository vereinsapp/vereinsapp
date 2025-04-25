function Liste_ElementFormularInitialisieren($formular, aktion, element_id, liste) {
    if (typeof element_id !== "undefined") $formular.find(".beschriftung").text(Liste_ElementBeschriftungZurueck(element_id, liste));

    $formular.find(".eingabe").each(function () {
        const $eingabe = $(this);
        const eingabe = $eingabe.attr("data-eingabe");

        // Wenn element_id definiert ist und es gerade um einen Button geht
        if ($eingabe.attr("type") == "button") $eingabe.attr("id", zufaelligeZeichenketteZurueck(8));

        let wert = Schnittstelle_VariableRausZurueck(eingabe, element_id, liste);
        // Wenn aber nichts definiert ist, dann nimm den Standard-Wert (je nach Typ)
        if (typeof wert === "undefined")
            if ($eingabe.prop("tagName") == "SELECT") wert = $eingabe.find("option:first").val();
            else if ($eingabe.attr("type") == "date") wert = DateTime.now().plus({ days: 1 });
            else if ($eingabe.attr("type") == "time") wert = DateTime.now().plus({ minutes: 1 });
            else if ($eingabe.attr("type") == "datetime-local") wert = DateTime.now().plus({ minutes: 1 });
            else wert = "";

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
        else if (isObject(wert)) {
            if (Object.keys(wert).length > 0) wert_formatiert = JsonStringifiedZurueck(wert);
            else wert_formatiert = "";
        }
        // Oder wenn aber die Eigenschaft ein Array ist
        else if (isArray(wert)) {
            if (wert.length > 0) wert_formatiert = JsonStringifiedZurueck(wert);
            else wert_formatiert = "";
        }

        $eingabe.val(wert_formatiert);
        if ("change_aktion" in EIGENSCHAFTEN[liste][eingabe] && typeof EIGENSCHAFTEN[liste][eingabe].change_aktion === "function")
            EIGENSCHAFTEN[liste][eingabe].change_aktion($eingabe);
    });

    $formular.find("[class*=btn_" + LISTEN[liste].element + "_").each(function () {
        const $btn_aktion = $(this);

        if ($btn_aktion.hasClass("btn_" + LISTEN[liste].element + "_aktion") && typeof aktion !== "undefined")
            $btn_aktion.addClass("btn_" + LISTEN[liste].element + "_" + aktion).removeClass("btn_" + LISTEN[liste].element + "_aktion");

        if (typeof element_id !== "undefined") $btn_aktion.attr("data-element_id", element_id);
    });
}
