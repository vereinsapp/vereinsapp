function Liste_FilternFormularInitialisieren($formular, instanz, liste) {
    const $filtern_definitionen = $formular.find(".filtern_definitionen");
    $.each(FILTERBARE_EIGENSCHAFTEN[liste], function (index, eigenschaft) {
        const typ = EIGENSCHAFTEN[liste][eigenschaft].typ;
        const beschriftung = EIGENSCHAFTEN[liste][eigenschaft].beschriftung;

        const $neue_filtern_definition = FILTERN.$blanko_filtern_definition[typ].clone().removeClass("blanko invisible");

        $neue_filtern_definition.attr("data-eigenschaft", eigenschaft);
        $neue_filtern_definition.find(".beschriftung").text(beschriftung);
        $neue_filtern_definition.find(".btn_filtern_erstellen").attr("data-liste", liste).attr("data-instanz", instanz);

        if (typ == "vorgegebene_werte") {
            $neue_filtern_definition.find(".filtern_wert").empty();
            $.each(VORGEGEBENE_WERTE[liste][eigenschaft], function (wert, eigenschaften) {
                $('<option value="' + wert + '">' + eigenschaften.beschriftung + "</option>").appendTo(
                    $neue_filtern_definition.find(".filtern_wert")
                );
            });
        }

        $neue_filtern_definition.appendTo($filtern_definitionen);
    });

    let filtern_value = Schnittstelle_DomLetztesModalZurueck()
        .find(".btn_filtern_modal_oeffnen[data-liste='" + liste + "']")
        .val();

    if (isJson(filtern_value))
        $formular
            .find(".filtern")
            .append(Liste_Filtern2$FilternZurueck(Schnittstelle_VariableArrayBereinigtZurueck(JSON.parse(filtern_value)), undefined, liste));
    else $formular.find(".filtern").append(Liste_Filtern2$FilternZurueck(LISTEN[liste].instanz[instanz].filtern, instanz, liste));
}
