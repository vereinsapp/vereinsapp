/**
 * @param {JQuery} $modal
 */

function Dom_$ModalOeffnen($modal) {
    const $umgebung = $("#modals");

    $umgebung.find(".modal.show").each(function () {
        $(this).addClass("warten");
        bootstrap.Modal.getInstance($(this)).hide();
    });

    if (!$umgebung.find($modal).exists()) $modal.appendTo($umgebung);

    bootstrap.Modal.getOrCreateInstance($modal).show();
}
