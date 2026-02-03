/**
 * @param {JQuery} $gruppieren_formular
 */

function Liste_$GruppierenFormularInitialisieren($gruppieren_formular) {
    const liste = Schnittstelle_VariableWertBereinigtZurueck($gruppieren_formular.attr("data-liste"), undefined);
    const ziel_id = Schnittstelle_VariableWertBereinigtZurueck($gruppieren_formular.attr("data-ziel_id"), undefined);

    // Initialiserung von $gruppieren_vorgegeben entfällt

    // Initialiserung von $gruppieren_eigenschaft
    const $gruppieren_eigenschaft = $gruppieren_formular.find(".gruppieren_eigenschaft");
    const $gruppieren_wert = $gruppieren_formular.find(".gruppieren_wert");

    $gruppieren_eigenschaft.attr("data-liste", liste).attr("data-ziel_id", ziel_id);

    $gruppieren_wert.empty();
    $.each(GRUPPIERBARE_EIGENSCHAFTEN[liste], function (index, eigenschaft) {
        $('<option value="' + eigenschaft + '">' + EIGENSCHAFTEN[liste][eigenschaft].beschriftung + "</option>").appendTo($gruppieren_wert);
    });

    // Definition von gruppieren_prio_niedrig und gruppieren_prio_hoch
    let gruppieren_prio_niedrig, gruppieren_prio_hoch;
    if (typeof ziel_id !== "undefined") {
        gruppieren_prio_niedrig = Schnittstelle_VariableWertBereinigtZurueck($("#" + ziel_id).attr("data-gruppieren_prio_niedrig"), undefined);
        gruppieren_prio_hoch = Schnittstelle_VariableWertBereinigtZurueck($("#" + ziel_id).val(), undefined);
    } else {
        gruppieren_prio_niedrig = undefined;
        gruppieren_prio_hoch = undefined;
    }

    // Überschreiben des bisherigen gruppieren_prio_hoch mit geändertem gruppieren_prio_hoch
    if (typeof ziel_id !== "undefined")
        $("#" + ziel_id)
            .val(JsonStringifiedZurueck(gruppieren_prio_hoch, undefined))
            .trigger("change");

    // Aktualisieren des $gruppieren_wert
    const gruppieren_kombiniert = Liste_GruppierenMitPrioKombiniertZurueck(gruppieren_prio_niedrig, gruppieren_prio_hoch, liste);
    if (typeof gruppieren_kombiniert !== "undefined") $gruppieren_wert.val(gruppieren_kombiniert);
}
