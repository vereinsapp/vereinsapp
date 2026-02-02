function Liste_ElementAuswahlEinfordern($ziel, title, liste, klasse_id, data = new Object()) {
    const instanz = liste + "_auswahl";

    // const $ziel = $ziel;
    const ziel_id = zufaelligeZeichenketteZurueck(8);
    if ($ziel.exists()) $ziel.attr("id", ziel_id);
    data.ziel_id = ziel_id;

    const $neues_auswahl_modal = Schnittstelle_Dom$NeuesModalInitialisiertZurueck(title, "AUSWAHL");

    const $liste = $neues_auswahl_modal.find("#AUSWAHLLISTE.liste");
    $liste.attr("id", instanz).attr("data-liste", liste);
    if (liste in HAUPTINSTANZEN && "filtern" in HAUPTINSTANZEN[liste])
        $liste.attr("data-filtern", JsonStringifiedZurueck(HAUPTINSTANZEN[liste].filtern), new Object());
    if (liste in HAUPTINSTANZEN && "sortieren" in HAUPTINSTANZEN[liste])
        $liste.attr("data-sortieren", JsonStringifiedZurueck(HAUPTINSTANZEN[liste].sortieren), undefined);

    $neues_auswahl_modal.find('.werkzeug[data-instanz="AUSWAHLLISTE"]').each(function () {
        const $werkzeug = $(this);
        const title = LISTEN[liste].beschriftung + " " + $werkzeug.attr("data-title");
        $werkzeug.attr("data-liste", liste).attr("data-instanz", instanz).attr("data-title", title);
    });

    $neues_auswahl_modal.find('.listenstatistik[data-instanz="AUSWAHLLISTE"]').attr("data-instanz", instanz).attr("data-liste", liste);

    const $blanko_element = LISTEN[liste].instanz.HAUPTINSTANZ.$blanko_element.clone();
    if (typeof klasse_id !== "undefined") $blanko_element.addClass(klasse_id);
    if (typeof data !== "undefined" && isObject(data))
        $.each(data, function (eigenschaft, wert) {
            $blanko_element.attr("data-" + eigenschaft, wert);
        });

    LISTEN[liste].instanz[instanz] = { filtern: new Object(), sortieren: undefined, $blanko_element: $blanko_element };

    Schnittstelle_Dom$ModalOeffnen($neues_auswahl_modal);
    Schnittstelle_EventVariableUpdDom(liste);
}
