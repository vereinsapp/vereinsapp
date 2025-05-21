function Liste_GruppierenInit() {
    // GRUPPIEREN IM LOCALSTORAGE SPEICHERN
    $(document).on("change", ".gruppieren_localstorage_speichern", function () {
        Liste_GruppierenLocalStorageSpeichern($(this).val(), $(this).attr("data-instanz"), $(this).attr("data-liste"));
    });

    // GRUPPIEREN MODAL ÖFFNEN
    $(document).on("click", ".btn_gruppieren_modal_oeffnen", function () {
        Liste_GruppierenModalOeffnen($(this), $(this).attr("data-title"), $(this).attr("data-liste"));
    });

    // GRUPPIEREN ÄNDERN
    $(document).on("change", ".gruppieren_eigenschaft", function () {
        Liste_GruppierenAendern($(this), $(this).attr("data-ziel_id"), $(this).attr("data-liste"));
    });

    // GRUPPIEREN ZURUECKSETZEN
    $(document).on("click", ".btn_gruppieren_eigenschaft_loeschen", function () {
        Liste_GruppierenEigenschaftZuruecksetzen(
            $(this).closest(".gruppieren_eigenschaft"),
            $(this).closest(".gruppieren_eigenschaft").attr("data-ziel_id"),
            $(this).closest(".gruppieren_eigenschaft").attr("data-liste")
        );
    });
}
