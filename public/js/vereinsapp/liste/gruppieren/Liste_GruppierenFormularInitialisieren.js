function Liste_GruppierenFormularInitialisieren($formular, ziel_id, liste) {
    const $gruppieren_eigenschaft = $formular.find(".gruppieren_eigenschaft");
    const $gruppieren_wert = $formular.find(".gruppieren_wert");

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

    // Überschreiben des value mit geänderten gruppieren_prio_hoch
    if (typeof ziel_id !== "undefined")
        $("#" + ziel_id)
            .val(JsonStringifiedZurueck(gruppieren_prio_hoch))
            .trigger("change");

    let gruppieren_kombiniert = undefined;
    if (typeof gruppieren_prio_hoch !== "undefined") gruppieren_kombiniert = gruppieren_prio_hoch;
    else if (typeof gruppieren_prio_niedrig !== "undefined") gruppieren_kombiniert = gruppieren_prio_niedrig;
    else gruppieren_kombiniert = undefined;
    // Aktualisieren des $gruppieren_wert
    if (typeof gruppieren_kombiniert !== "undefined") $gruppieren_wert.val(gruppieren_kombiniert);
}
