/**
 */

function Liste_GruppierenInit() {
    // GRUPPIEREN IM LOCALSTORAGE SPEICHERN
    $(document).on("change", ".gruppieren_localstorage", function () {
        Liste_$GruppierenLocalStorageSpeichern($(this));
    });

    // GRUPPIEREN MODAL ÖFFNEN
    $(document).on("click", ".btn_gruppieren_manip", function () {
        Liste_$GruppierenModalOeffnen($(this));
    });

    // GRUPPIEREN ÄNDERN
    $(document).on("change", ".gruppieren_eigenschaft", function () {
        Liste_$GruppierenEigenschaftAendern($(this));
    });

    // GRUPPIEREN EIGENSCHAFT ZURÜCKSETZEN
    $(document).on("click", ".btn_gruppieren_eigenschaft_zuruecksetzen", function () {
        Liste_$GruppierenEigenschaftZuruecksetzen($(this).closest(".gruppieren_eigenschaft"));
    });
}
