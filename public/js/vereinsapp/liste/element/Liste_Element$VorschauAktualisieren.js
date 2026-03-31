/**
 * @param {JQuery} $vorschau
 * @param {JQuery} $element
 */

function Liste_Element$VorschauAktualisieren($vorschau, $element) {
    const vorschau = Util_WertBereinigtZurueck($vorschau.attr("vorschau"), new Array());
    const liste = Util_WertBereinigtZurueck($element.attr("liste"), undefined);
    const element_id = Util_WertBereinigtZurueck($element.attr(LISTEN[liste].element + "_id"), undefined);

    // EIGENSCHAFTEN IM DOM LÖSCHEN
    $vorschau.find(".eigenschaft").each(function () {
        const $eigenschaft = $(this);
        const eigenschaft = Util_WertBereinigtZurueck($eigenschaft.attr("eigenschaft"), undefined);
        if (!vorschau.includes(eigenschaft)) {
            $eigenschaft.remove();
            $eigenschaft.prev(".spacer").remove();
        }
    });

    // EIGENSCHAFTEN IM DOM ERGÄNZEN UND SORTIEREN
    $.each(vorschau, function (position, eigenschaft) {
        let $eigenschaft = $vorschau.find('.eigenschaft[eigenschaft="' + eigenschaft + '"]');
        if (!$eigenschaft.exists()) $eigenschaft = VORSCHAU.$blanko_eigenschaft.clone().removeClass("blanko invisible").addClass("eigenschaft");

        $eigenschaft
            .attr("eigenschaft", eigenschaft)
            .html(
                Liste_WertNachEigenschaftFormatiertZurueck(Liste_VariableRausZurueck(eigenschaft, element_id, liste, undefined), eigenschaft, liste),
            );

        if (isEmptyString($eigenschaft.text())) $eigenschaft.addClass("invisible");
        else $eigenschaft.removeClass("invisible");

        if (position === 0) $eigenschaft.appendTo($vorschau);
        else $eigenschaft.insertAfter($vorschau.find('.eigenschaft[eigenschaft="' + vorschau[position - 1] + '"]'));
    });

    // SPACER IM DOM LÖSCHEN
    $vorschau.find(".spacer").remove();

    // SPACER IM DOM ERGÄNZEN
    $vorschau
        .find(".eigenschaft")
        .not(".invisible")
        .each(function () {
            if ($vorschau.find(".spacer").length < $vorschau.find(".eigenschaft").not(".invisible").length - 1)
                Dom_$SpacerInitialisiertZurueck().insertAfter($(this));
        });
}
