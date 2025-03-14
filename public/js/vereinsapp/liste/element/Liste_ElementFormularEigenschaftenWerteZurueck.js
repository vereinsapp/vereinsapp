function Liste_ElementFormularEigenschaftenWerteZurueck($formular) {
    const eigenschaftenWerte = new Object();

    $formular.find(".eingabe").each(function () {
        const $eingabe = $(this);

        eigenschaftenWerte[$eingabe.attr("data-eingabe")] = Schnittstelle_VariableWertBereinigtZurueck($eingabe.val());

        $eingabe.removeClass("is-valid").removeClass("is-invalid");
        $eingabe.find(".valid-tooltip").remove();
        $eingabe.find(".invalid-tooltip").remove();
    });

    return eigenschaftenWerte;
}
