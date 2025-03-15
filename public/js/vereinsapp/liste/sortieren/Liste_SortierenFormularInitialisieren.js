function Liste_SortierenFormularInitialisieren($formular, instanz, liste) {
    const $sortieren_eigenschaft = $formular.find(".sortieren_eigenschaft");

    $formular.attr("data-liste", liste).attr("data-instanz", instanz);

    $.each(SORTIERBARE_EIGENSCHAFTEN[liste], function (index, eigenschaft) {
        $('<option value="' + eigenschaft + '">' + EIGENSCHAFTEN[liste][eigenschaft].beschriftung + "</option>").appendTo($sortieren_eigenschaft);
    });

    let sortieren = LISTEN[liste].instanz[instanz].sortieren;
    if (typeof sortieren === "undefined") {
        sortieren = $("#" + instanz + ".liste").attr("data-sortieren");
        if (typeof sortieren !== "undefined") sortieren = Schnittstelle_VariableWertBereinigtZurueck(sortieren);
    }

    if (typeof sortieren !== "undefined") {
        $sortieren_eigenschaft.val(sortieren.eigenschaft);
        $formular.find(".sortieren_richtung").attr("checked", false);
        $formular.find(".sortieren_richtung[value=" + sortieren.richtung + "]").attr("checked", true);
    }
}
