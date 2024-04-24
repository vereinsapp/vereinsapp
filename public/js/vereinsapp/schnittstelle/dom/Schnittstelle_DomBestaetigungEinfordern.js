function Schnittstelle_DomBestaetigungEinfordern(nachricht, title, klasse_id, data, farbe) {
    const $neue_bestaetigung = BESTAETIGUNGEN.$blanko_bestaetigung.clone().removeClass("blanko invisible");
    $neue_bestaetigung.attr("id", klasse_id + "_bestaetigung");
    $neue_bestaetigung.find(".modal-title").first().text(title);
    $neue_bestaetigung.find(".nachricht").first().text(nachricht);

    const $btn_bestaetigen = $neue_bestaetigung.find(".btn_bestaetigen");
    if (typeof farbe !== "undefined") $btn_bestaetigen.removeClass("btn-outline-success").addClass("btn-outline-" + farbe);
    $.each(data, function (eigenschaft, wert) {
        $btn_bestaetigen.attr("data-" + eigenschaft, wert);
    });
    $btn_bestaetigen.addClass("btn_" + klasse_id).text(title);

    Schnittstelle_DomModalOeffnen($neue_bestaetigung);
}
