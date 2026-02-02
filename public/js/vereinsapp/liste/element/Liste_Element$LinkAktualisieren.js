/**
 * @param {JQuery} $link
 * @param {JQuery} $element
 */

function Liste_Element$LinkAktualisieren($link, $element) {
    const liste = Schnittstelle_VariableWertBereinigtZurueck($element.attr("data-liste"), undefined);
    const element_id = Schnittstelle_VariableWertBereinigtZurueck($element.attr("data-" + LISTEN[liste].element + "_id"), undefined);
    const link_data = Schnittstelle_VariableWertBereinigtZurueck($link.attr("data-link"), new Object());

    let href = SITE_URL;
    if ("liste" in link_data) href += LISTEN[link_data.liste].controller;
    else href += LISTEN[liste].controller;
    if ("eigenschaften" in link_data && isArray(link_data.eigenschaften))
        $.each(link_data.eigenschaften, function (position, eigenschaft) {
            href += "/" + Schnittstelle_VariableRausZurueck(eigenschaft, element_id, liste, undefined);
        });

    $link.attr("href", href);
}
