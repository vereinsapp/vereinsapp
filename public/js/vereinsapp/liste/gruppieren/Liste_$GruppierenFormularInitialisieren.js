/**
 * @param {JQuery} $gruppieren_formular
 */

function Liste_$GruppierenFormularInitialisieren($gruppieren_formular) {
    const liste = Schnittstelle_VariableWertBereinigtZurueck($gruppieren_formular.attr("data-liste"), undefined);
    const $gruppieren_prio = Schnittstelle_Dom$ZielZu$QuelleZurueck($gruppieren_formular);
    Schnittstelle_Dom$Quelle$ZielEntknuepfen($gruppieren_formular, $gruppieren_prio);

    // Initialiserung von $gruppieren_vorgegeben
    // entfällt, weil
    // $gruppieren_vorgegeben nicht implementiert

    // Initialiserung von $gruppieren_eigenschaft
    const $gruppieren_eigenschaft = $gruppieren_formular.find(".gruppieren_eigenschaft");
    const $gruppieren_wert = $gruppieren_formular.find(".gruppieren_wert");

    $gruppieren_eigenschaft.attr("data-liste", liste);

    $gruppieren_wert.empty();
    $.each(GRUPPIERBARE_EIGENSCHAFTEN[liste], function (index, eigenschaft) {
        $('<option value="' + eigenschaft + '">' + EIGENSCHAFTEN[liste][eigenschaft].beschriftung + "</option>").appendTo($gruppieren_wert);
    });

    // Definition von bisherigem gruppieren_prio_niedrig und gruppieren_prio_hoch
    const gruppieren_prio_niedrig = Schnittstelle_VariableWertBereinigtZurueck($gruppieren_prio.attr("data-gruppieren_prio_niedrig"), undefined);
    const gruppieren_prio_hoch = Schnittstelle_VariableWertBereinigtZurueck($gruppieren_prio.val(), undefined);

    // Überschreiben des bisherigen gruppieren_prio_hoch mit geändertem gruppieren_prio_hoch
    // entfällt, da gruppieren_prio_hoch nicht geändert wurde

    // Aktualisieren des $gruppieren_wert
    const gruppieren_kombiniert = Liste_GruppierenMitPrioKombiniertZurueck(gruppieren_prio_niedrig, gruppieren_prio_hoch, liste);
    if (typeof gruppieren_kombiniert !== "undefined") $gruppieren_wert.val(gruppieren_kombiniert);

    Schnittstelle_Dom$Quelle$ZielVerknuepfen($gruppieren_eigenschaft, $gruppieren_prio);
}
