/**
 * @param {JQuery} $link
 * @param {JQuery} $element
 */

function Liste_Element$LinkAktualisieren($link, $element) {
    const liste = Util_WertBereinigtZurueck($element.attr("liste"), undefined);
    const element_id = Util_WertBereinigtZurueck($element.attr(LISTEN[liste].element + "_id"), undefined);
    const link_data = Util_WertBereinigtZurueck($link.attr("link"), new Object());

    let href = SITE_URL;
    if ("liste" in link_data) href += link_data.liste;
    else href += liste;
    if ("eigenschaften" in link_data && isArray(link_data.eigenschaften))
        $.each(link_data.eigenschaften, function (position, eigenschaft) {
            href += "/" + Liste_ElementWertRausZurueck(eigenschaft, element_id, liste, undefined);
        });

    $link.attr("href", href);
}
