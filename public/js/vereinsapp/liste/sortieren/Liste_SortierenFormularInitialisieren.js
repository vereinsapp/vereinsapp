function Liste_SortierenFormularInitialisieren($formular, ziel_id, liste) {
    const $sortieren_eigenschaft = $formular.find(".sortieren_eigenschaft");
    const $sortieren_wert = $formular.find(".sortieren_wert");

    $sortieren_eigenschaft.attr("data-liste", liste).attr("data-ziel_id", ziel_id);

    $sortieren_wert.empty();
    $.each(SORTIERBARE_EIGENSCHAFTEN[liste], function (index, eigenschaft) {
        $('<option value="' + eigenschaft + '">' + EIGENSCHAFTEN[liste][eigenschaft].beschriftung + "</option>").appendTo($sortieren_wert);
    });

    let sortieren_prio_niedrig, sortieren_prio_hoch;
    if (typeof ziel_id !== "undefined") {
        sortieren_prio_niedrig = $("#" + ziel_id).attr("data-sortieren_prio_niedrig");
        if (typeof sortieren_prio_niedrig !== "undefined")
            sortieren_prio_niedrig = Schnittstelle_VariableWertBereinigtZurueck(sortieren_prio_niedrig);
        else sortieren_prio_niedrig = undefined;

        sortieren_prio_hoch = $("#" + ziel_id).val();
        if (sortieren_prio_hoch != "") sortieren_prio_hoch = Schnittstelle_VariableWertBereinigtZurueck(sortieren_prio_hoch);
        else sortieren_prio_hoch = undefined;
    } else {
        sortieren_prio_niedrig = undefined;
        sortieren_prio_hoch = undefined;
    }

    let sortieren_kombiniert;
    if (typeof sortieren_prio_hoch !== "undefined") sortieren_kombiniert = sortieren_prio_hoch;
    else if (typeof sortieren_prio_niedrig !== "undefined") sortieren_kombiniert = sortieren_prio_niedrig;
    else sortieren_kombiniert = undefined;

    if (typeof ziel_id !== "undefined")
        $("#" + ziel_id)
            .val(JsonStringifiedZurueck(sortieren_kombiniert))
            .trigger("change");

    if (typeof sortieren_kombiniert !== "undefined") {
        $sortieren_wert.val(sortieren_kombiniert.eigenschaft);
        $formular.find(".sortieren_richtung").attr("checked", false);
        $formular.find('.sortieren_richtung[value="' + sortieren_kombiniert.richtung + '"]').attr("checked", true);
    }
}
