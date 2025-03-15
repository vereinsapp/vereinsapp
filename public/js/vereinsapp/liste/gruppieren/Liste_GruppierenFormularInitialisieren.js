function Liste_GruppierenFormularInitialisieren($formular, instanz, liste) {
    const $gruppieren_eigenschaft = $formular.find(".gruppieren_eigenschaft");

    $formular.attr("data-liste", liste).attr("data-instanz", instanz);

    $.each(GRUPPIERBARE_EIGENSCHAFTEN[liste], function (index, eigenschaft) {
        $('<option value="' + eigenschaft + '">' + EIGENSCHAFTEN[liste][eigenschaft].beschriftung + "</option>").appendTo($gruppieren_eigenschaft);
    });

    let gruppieren = LISTEN[liste].instanz[instanz].gruppieren;
    if (typeof gruppieren === "undefined") gruppieren = $("#" + instanz + ".liste").attr("data-gruppieren");

    if (typeof gruppieren !== "undefined") $gruppieren_eigenschaft.val(gruppieren);
}
