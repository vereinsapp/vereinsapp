function Liste_Element$FormularValidationAktualisieren($formular, validation) {
    $formular.find(".eingabe").each(function () {
        const $eingabe = $(this);
        const eingabe = $eingabe.attr("data-eingabe");

        $eingabe.parent().find(".valid-tooltip").remove();
        $eingabe.parent().find(".invalid-tooltip").remove();

        if (eingabe in validation) {
            $eingabe.addClass("is-invalid").removeClass("is-valid");
            $eingabe.after('<div class="invalid-tooltip">' + validation[eingabe] + "</div>");
        } else {
            $eingabe.addClass("is-valid").removeClass("is-invalid");
        }
    });
}
