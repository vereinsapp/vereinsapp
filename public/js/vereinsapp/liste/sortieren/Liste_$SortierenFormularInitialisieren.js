/**
 * @param {JQuery} $sortieren_formular
 */

function Liste_$SortierenFormularInitialisieren($sortieren_formular) {
    const liste = Schnittstelle_VariableWertBereinigtZurueck($sortieren_formular.attr("data-liste"), undefined);

    // Initialiserung von $sortieren_vorgegeben
    // entfällt, weil (noch) keine vorgegebene Filter für sortieren existieren

    // Initialiserung von $sortieren_eigenschaft
    const $sortieren_eigenschaft = $sortieren_formular.find(".sortieren_eigenschaft");
    $sortieren_eigenschaft.attr("data-liste", liste);
    const $sortieren_wert = $sortieren_formular.find(".sortieren_wert");
    $sortieren_wert.empty();
    $.each(SORTIERBARE_EIGENSCHAFTEN[liste], function (position, eigenschaft) {
        if (liste in EIGENSCHAFTEN && eigenschaft in EIGENSCHAFTEN[liste]) {
            $('<option value="' + eigenschaft + '">' + EIGENSCHAFTEN[liste][eigenschaft].beschriftung + "</option>").appendTo($sortieren_wert);
        } else
            Schnittstelle_LogInDieKonsole(
                "Liste_$SortierenFormularInitialisieren: Eigenschaft " + eigenschaft + " existiert nicht in EIGENSCHAFTEN." + liste + "!",
            );
    });

    // Verknüpfung von $sortieren_vorgegeben und $sortieren_eigenschaft mit $sortieren_manip
    const $sortieren_manip = Schnittstelle_Dom$ZielZu$QuelleZurueck($sortieren_formular);
    Schnittstelle_Dom$Quelle$ZielEntknuepfen($sortieren_formular, $sortieren_manip);
    Schnittstelle_Dom$Quelle$ZielVerknuepfen($sortieren_formular.find(".sortieren_vorgegeben, .sortieren_eigenschaft"), $sortieren_manip);

    $.each($sortieren_formular.find(".sortieren_eigenschaft"), function () {
        const $sortieren_eigenschaft = $(this);
        // Aktualisieren der $sortieren_eigenschaft
        Liste_$SortierenEigenschaftAktualisieren($sortieren_eigenschaft);
    });
}
