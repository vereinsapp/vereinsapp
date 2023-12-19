function Liste_SortierenErstellen($btn) {
    const liste = $btn.attr("data-liste");
    const liste_id = $btn.attr("data-liste_id");
    const $formular = $btn.closest(".sortieren_definitionen");

    G.LISTEN[liste].instanz[liste_id].sortieren.push({
        richtung: Number($formular.find(".sortieren_richtung:checked").val()),
        eigenschaft: $formular.find(".sortieren_eigenschaft").val(),
    });

    Schnittstelle_EventVariableUpdLocalstorage(liste, [Schnittstelle_EventLocalstorageUpdVariable, Schnittstelle_EventVariableUpdDom]);
}
