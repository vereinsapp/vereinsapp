function Liste_ElementNavigationAktualisieren($element_navigation, $element, liste) {
    const $vorheriges_element = $element_navigation.find(".vorheriges_element");
    const $naechstes_element = $element_navigation.find(".naechstes_element");
    const instanz = $element_navigation.attr("data-instanz");

    // TABELLE FILTERN
    const filtern_data = Schnittstelle_VariableWertBereinigtZurueck($element_navigation.attr("data-filtern"), new Object());
    const filtern_LocalStorage = Schnittstelle_LocalstorageRausZurueck(liste + "_" + instanz + "_filtern", new Object()); // Problem: LISTEN[liste].instanz[instanz].filtern existiert nicht, weil keine .liste mit dieser instanz existiert
    const tabelle_gefiltert = Liste_TabelleGefiltertZurueck(
        LISTEN[liste].tabelle,
        Liste_FilternMitPrioKombiniertZurueck(filtern_data, filtern_LocalStorage, liste),
        liste
    );

    // TABELLE SORTIEREN
    const sortieren_data = Schnittstelle_VariableWertBereinigtZurueck($element_navigation.attr("data-sortieren"), undefined);
    const sortieren_LocalStorage = Schnittstelle_LocalstorageRausZurueck(liste + "_" + instanz + "_sortieren", undefined); // Problem: LISTEN[liste].instanz[instanz].sortieren existiert nicht, weil keine .liste mit dieser instanz existiert
    const tabelle_gefiltert_sortiert = Liste_ArraySortiertZurueck(
        tabelle_gefiltert,
        Liste_SortierenMitPrioKombiniertZurueck(sortieren_data, sortieren_LocalStorage, liste)
    );

    let vorherige_element_id = undefined;
    let naechste_element_id = undefined;
    $.each(tabelle_gefiltert_sortiert, function (position, element) {
        if (element["id"] == Number($element.attr("data-element_id"))) {
            if (position > 0) vorherige_element_id = tabelle_gefiltert_sortiert[position - 1]["id"];
            if (position < tabelle_gefiltert_sortiert.length - 1) naechste_element_id = tabelle_gefiltert_sortiert[position + 1]["id"];
        }
    });

    if (typeof vorherige_element_id !== "undefined")
        $vorheriges_element.removeClass("invisible").attr("href", SITE_URL + AKTIVER_CONTROLLER + "/" + vorherige_element_id);
    else $vorheriges_element.addClass("invisible").removeAttr("href");

    if (typeof naechste_element_id !== "undefined")
        $naechstes_element.removeClass("invisible").attr("href", SITE_URL + AKTIVER_CONTROLLER + "/" + naechste_element_id);
    else $naechstes_element.addClass("invisible").removeAttr("href");
}
