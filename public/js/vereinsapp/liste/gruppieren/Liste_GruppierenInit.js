function Liste_GruppierenInit() {
    // GRUPPIEREN MODAL ÖFFNEN
    $(document).on("click", ".btn_gruppieren_modal_oeffnen", function () {
        Liste_GruppierenAendern(
            true,
            { $modal: undefined, $formular: undefined },
            $(this).attr("data-title"),
            $(this).attr("data-instanz"),
            $(this).attr("data-liste")
        );
    });

    // GRUPPIEREN ÄNDERN
    $(document).on("change", ".gruppieren_eigenschaft", function () {
        Liste_GruppierenAendern(
            false,
            { $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular") },
            undefined,
            $(this).closest(".formular").attr("data-instanz"),
            $(this).closest(".formular").attr("data-liste")
        );
    });
}
