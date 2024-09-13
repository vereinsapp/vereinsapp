function Liste_ElementFormularInitialisiertZurueck(formular_id, liste, aktion, data) {
    if (typeof data === "undefined") data = new Object();

    if (!("title" in data)) data.title = undefined;
    const title = data.title;

    if (!("element_id" in data)) data.element_id = undefined;
    const element_id = data.element_id;

    // Formular als Modal generieren
    const $neues_formular = LISTEN[liste].modals[formular_id].clone().removeClass("blanko invisible").addClass("modal").addClass("formular");

    Liste_ElementFormularEigenschaftenWerteAktualisieren($neues_formular, element_id, liste);

    if (typeof title !== "undefined") $neues_formular.find(".modal-title").text(title);

    if (typeof element_id !== "undefined") $neues_formular.find(".beschriftung").text(Liste_ElementBeschriftungZurueck(element_id, liste));

    $neues_formular
        .find(".btn_" + LISTEN[liste].element + "_aktion")
        .addClass("btn_" + LISTEN[liste].element + "_" + aktion)
        .removeClass(".btn_" + LISTEN[liste].element + "_aktion");
    if (typeof element_id !== "undefined") $neues_formular.find(".btn_" + LISTEN[liste].element + "_" + aktion).attr("data-element_id", element_id);

    return $neues_formular;
}
