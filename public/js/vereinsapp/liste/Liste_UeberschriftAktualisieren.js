function Liste_UeberschriftAktualisieren($ueberschrift, liste) {
    const instanz = $ueberschrift.attr("data-instanz");
    if ($("#" + instanz + ".liste").children().length === 0) $ueberschrift.addClass("invisible");
    else $ueberschrift.removeClass("invisible");
}
