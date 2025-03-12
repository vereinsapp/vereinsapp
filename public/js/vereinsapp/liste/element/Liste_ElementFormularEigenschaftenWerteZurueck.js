function Liste_ElementFormularEigenschaftenWerteZurueck($formular) {
    const eigenschaftenWerte = new Object();

    $formular.find(".eingabe").each(function () {
        const $eingabe = $(this);
        const eingabe = $eingabe.attr("data-eingabe");

        let wert = $eingabe.val();
        // Wenn aber die Eigenschaft ein Datum, ein Uhrzeit oder ein Datum und eine Uhrzeit ist
        if (["date", "time", "datetime-local"].includes($eingabe.attr("type"))) {
            wert = DateTime.fromISO(wert);
            if (eingabe == "ende") wert = wert.plus({ days: 1 }).minus({ seconds: 1 });
            wert = wert.toSQL(); // todo: JsonStringifiedZurueck verwenden
        }
        // Wenn aber die Eigenschaft eine Zahl ist
        else if (isNumber(wert)) wert = Number(wert);

        eigenschaftenWerte[eingabe] = wert;

        $eingabe.removeClass("is-valid").removeClass("is-invalid");
        $eingabe.find(".valid-tooltip").remove();
        $eingabe.find(".invalid-tooltip").remove();
    });

    return eigenschaftenWerte;
}
