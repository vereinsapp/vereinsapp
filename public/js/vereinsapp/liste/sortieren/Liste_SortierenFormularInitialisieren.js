function Liste_SortierenFormularInitialisieren($formular, ziel_id, liste) {
    const $sortieren_eigenschaft = $formular.find(".sortieren_eigenschaft");
    const $sortieren_wert = $formular.find(".sortieren_wert");

    $sortieren_eigenschaft.attr("data-liste", liste).attr("data-ziel_id", ziel_id);

    $sortieren_wert.empty();
    $.each(SORTIERBARE_EIGENSCHAFTEN[liste], function (index, eigenschaft) {
        $('<option value="' + eigenschaft + '">' + EIGENSCHAFTEN[liste][eigenschaft].beschriftung + "</option>").appendTo($sortieren_wert);
    });

    // Definition von sortieren_prio_niedrig und sortieren_prio_hoch
    let sortieren_prio_niedrig, sortieren_prio_hoch;
    if (typeof ziel_id !== "undefined") {
        sortieren_prio_niedrig = Schnittstelle_VariableWertBereinigtZurueck($("#" + ziel_id).attr("data-sortieren_prio_niedrig"), undefined);
        sortieren_prio_hoch = Schnittstelle_VariableWertBereinigtZurueck($("#" + ziel_id).val(), undefined);
    } else {
        sortieren_prio_niedrig = undefined;
        sortieren_prio_hoch = undefined;
    }

    // Überschreiben des value mit geänderten gruppieren_prio_hoch
    if (typeof ziel_id !== "undefined")
        $("#" + ziel_id)
            .val(JsonStringifiedZurueck(sortieren_prio_hoch, undefined))
            .trigger("change");

    // Aktualisieren des $sortieren_wert
    const sortieren_kombiniert = Liste_SortierenMitPrioKombiniertZurueck(sortieren_prio_niedrig, sortieren_prio_hoch, liste);
    if (typeof sortieren_kombiniert !== "undefined") {
        $sortieren_wert.val(sortieren_kombiniert.eigenschaft);
        $formular.find(".sortieren_richtung").attr("checked", false);
        $formular.find('.sortieren_richtung[value="' + sortieren_kombiniert.richtung + '"]').attr("checked", true);
    }
}
