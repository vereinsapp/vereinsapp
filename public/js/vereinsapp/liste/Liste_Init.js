function Liste_Init() {
    $.each(LISTEN, function (liste) {
        LISTEN[liste].instanz = new Object();
        $('.liste[data-liste="' + liste + '"]').each(function () {
            const instanz = $(this).attr("id");
            LISTEN[liste].instanz[instanz] = { filtern: new Object(), sortieren: undefined };
        });
    });

    Liste_ChecklisteInit();

    Liste_AuswertungenInit();

    Liste_VerzeichnisInit();

    Liste_FilternInit();

    Liste_SortierenInit();

    Liste_GruppierenInit();

    $(document).on("change", ".eingabe", function () {
        if (
            "change_aktion" in EIGENSCHAFTEN[$(this).parents("[data-liste]").first().attr("data-liste")][$(this).attr("data-eingabe")] &&
            typeof EIGENSCHAFTEN[$(this).closest("[data-liste]").attr("data-liste")][$(this).attr("data-eingabe")].change_aktion === "function"
        )
            EIGENSCHAFTEN[$(this).closest("[data-liste]").attr("data-liste")][$(this).attr("data-eingabe")].change_aktion($(this));
    });

    // SORTABLE
    $(".sortable").sortable({
        handle: ".sortable_handle",
        start: function (event, ui) {
            ui.item.addClass("border-top border-primary shadow");
        },
        stop: function (event, ui) {
            ui.item.removeClass("border-top border-primary shadow");
        },
        update: function () {
            $("#sortable_speichern").attr("disabled", false);
        },
    });
}
