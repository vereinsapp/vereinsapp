/**
 * @param {JQuery} $formular
 */

function Liste_Element$FormularWerteNachEigenschaftZurueck($formular) {
    const werte_nach_eigenschaft = new Object();
    $formular.find(".eingabe").each(function () {
        werte_nach_eigenschaft[$(this).attr("eingabe")] = Liste_WertBereinigtZurueck($(this).val(), undefined);
    });

    return werte_nach_eigenschaft;
}
