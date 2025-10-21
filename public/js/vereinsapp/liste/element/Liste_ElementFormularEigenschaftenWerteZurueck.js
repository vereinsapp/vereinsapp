function Liste_ElementFormularEigenschaftenWerteZurueck($formular) {
    const eigenschaftenWerte = new Object();

    $formular.find(".eingabe").each(function () {
        const $eingabe = $(this);
        eigenschaftenWerte[$eingabe.attr("data-eingabe")] = Schnittstelle_VariableWertBereinigtZurueck($eingabe.val(), undefined);
    });

    return eigenschaftenWerte;
}
