/**
 * @param {JQuery} $sortieren_formular
 */

function Liste_$SortierenFormularInitialisieren($sortieren_formular) {
    const liste = Schnittstelle_VariableWertBereinigtZurueck($sortieren_formular.attr("data-liste"), undefined);
    const $sortieren_prio = Schnittstelle_Dom$ZielZu$QuelleZurueck($sortieren_formular);
    Schnittstelle_Dom$Quelle$ZielEntknuepfen($sortieren_formular, $sortieren_prio);

    // Initialiserung von $sortieren_vorgegeben
    // entfällt, weil
    // $sortieren_vorgegeben nicht implementiert

    // Initialiserung von $sortieren_eigenschaft
    const $sortieren_eigenschaft = $sortieren_formular.find(".sortieren_eigenschaft");
    const $sortieren_wert = $sortieren_formular.find(".sortieren_wert");

    $sortieren_eigenschaft.attr("data-liste", liste);

    $sortieren_wert.empty();
    $.each(SORTIERBARE_EIGENSCHAFTEN[liste], function (index, eigenschaft) {
        $('<option value="' + eigenschaft + '">' + EIGENSCHAFTEN[liste][eigenschaft].beschriftung + "</option>").appendTo($sortieren_wert);
    });

    // Definition von bisherigem sortieren_prio_niedrig und sortieren_prio_hoch
    const sortieren_prio_niedrig = Schnittstelle_VariableWertBereinigtZurueck($sortieren_prio.attr("data-sortieren_prio_niedrig"), undefined);
    const sortieren_prio_hoch = Schnittstelle_VariableWertBereinigtZurueck($sortieren_prio.val(), undefined);

    // Überschreiben des bisherigen sortieren_prio_hoch mit geändertem sortieren_prio_hoch
    // entfällt, da sortieren_prio_hoch nicht geändert wurde

    // Aktualisieren des $sortieren_wert
    const sortieren_kombiniert = Liste_SortierenMitPrioKombiniertZurueck(sortieren_prio_niedrig, sortieren_prio_hoch, liste);
    if (typeof sortieren_kombiniert !== "undefined") {
        $sortieren_wert.val(sortieren_kombiniert.eigenschaft);
        $sortieren_formular.find(".sortieren_richtung").prop("checked", false);
        $sortieren_formular.find('.sortieren_richtung[value="' + sortieren_kombiniert.richtung + '"]').prop("checked", true);
    }

    Schnittstelle_Dom$Quelle$ZielVerknuepfen($sortieren_eigenschaft, $sortieren_prio);
}
