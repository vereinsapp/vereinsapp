function Liste_SortierenSpeichern($sortieren, instanz, liste) {
    const $btn_sortieren_modal_oeffnen = Schnittstelle_DomLetztesWartendesModalZurueck().find(
        ".btn_sortieren_modal_oeffnen[data-liste='" + liste + "']"
    );

    if (typeof instanz !== "undefined") {
        LISTEN[liste].instanz[instanz].sortieren = Liste_$Sortieren2SortierenZurueck($sortieren, liste);
        Schnittstelle_EventVariableUpdLocalstorage(liste, [Schnittstelle_EventLocalstorageUpdVariable, Schnittstelle_EventVariableUpdDom]);
    } else if ($btn_sortieren_modal_oeffnen.exists())
        $btn_sortieren_modal_oeffnen.val(JSON.stringify(Liste_$Sortieren2SortierenZurueck($sortieren, liste)));
}
