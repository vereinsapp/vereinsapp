/**
 * @param {JQuery} $gruppieren_formular
 */

function Liste_$GruppierenFormularInitialisieren($gruppieren_formular) {
    const liste = Schnittstelle_VariableWertBereinigtZurueck($gruppieren_formular.attr("data-liste"), undefined);

    // Initialiserung von $gruppieren_vorgegeben
    // entfällt, weil (noch) keine vorgegebene Filter für gruppieren existieren

    // Initialiserung von $gruppieren_eigenschaft
    const $gruppieren_eigenschaft = $gruppieren_formular.find(".gruppieren_eigenschaft");
    $gruppieren_eigenschaft.attr("data-liste", liste);
    const $gruppieren_wert = $gruppieren_formular.find(".gruppieren_wert");
    $gruppieren_wert.empty();
    $.each(GRUPPIERBARE_EIGENSCHAFTEN[liste], function (position, eigenschaft) {
        if (liste in EIGENSCHAFTEN && eigenschaft in EIGENSCHAFTEN[liste]) {
            $('<option value="' + eigenschaft + '">' + EIGENSCHAFTEN[liste][eigenschaft].beschriftung + "</option>").appendTo($gruppieren_wert);
        } else
            Schnittstelle_LogInDieKonsole(
                "Liste_$GruppierenFormularInitialisieren: Eigenschaft " + eigenschaft + " existiert nicht in EIGENSCHAFTEN." + liste + "!",
            );
    });

    // Verknüpfung von $gruppieren_vorgegeben und $gruppieren_eigenschaft mit $gruppieren_prio
    const $gruppieren_prio = Schnittstelle_Dom$ZielZu$QuelleZurueck($gruppieren_formular);
    Schnittstelle_Dom$Quelle$ZielEntknuepfen($gruppieren_formular, $gruppieren_prio);
    Schnittstelle_Dom$Quelle$ZielVerknuepfen($gruppieren_formular.find(".gruppieren_vorgegeben, .gruppieren_eigenschaft"), $gruppieren_prio);

    $.each($gruppieren_formular.find(".gruppieren_eigenschaft"), function () {
        const $gruppieren_eigenschaft = $(this);
        // Aktualisieren der $gruppieren_eigenschaft
        Liste_$GruppierenEigenschaftAktualisieren($gruppieren_eigenschaft);
    });
}
