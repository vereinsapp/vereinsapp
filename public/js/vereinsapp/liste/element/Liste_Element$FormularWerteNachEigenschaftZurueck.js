function Liste_Element$FormularWerteNachEigenschaftZurueck($formular) {
    const werte_nach_eigenschaft = new Object();
    $formular.find(".eingabe").each(function () {
        werte_nach_eigenschaft[$(this).attr("data-eingabe")] = Schnittstelle_VariableWertBereinigtZurueck($(this).val(), undefined);
    });

    return werte_nach_eigenschaft;
}
