/**
 * @param {string} farbe
 */

function Dom_$HinweispunktInitialisiertZurueck(farbe = "primary") {
    const $hinweispunkt = HINWEISPUNKTE.$blanko_hinweispunkt.clone().removeClass("blanko invisible").addClass("hinweispunkt");

    $hinweispunkt.addClass("bg-" + farbe).addClass("border-" + farbe);

    return $hinweispunkt;
}
