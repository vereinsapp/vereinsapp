function Aufgaben_AufgabeElementZuordnen(auswahl_einfordern, dom, title, liste) {
    if (auswahl_einfordern) Liste_ElementAuswahlEinfordern(dom.$quelle_ziel, title, liste, "btn_element_zuordnen");
    else {
        const element_id = dom.$quelle_ziel.attr("data-element_id");
        const $ziel = $("#" + dom.$quelle_ziel.attr("data-ziel_id"));
        const eingabe = $ziel.attr("data-eingabe");

        $ziel.val(element_id).removeAttr("id");
        if ("change_aktion" in EIGENSCHAFTEN.aufgaben[eingabe] && typeof EIGENSCHAFTEN.aufgaben[eingabe].change_aktion === "function")
            EIGENSCHAFTEN.aufgaben[eingabe].change_aktion($ziel);

        if ("$modal" in dom && dom.$modal.exists()) Schnittstelle_DomModalSchliessen(dom.$modal);
    }
}
