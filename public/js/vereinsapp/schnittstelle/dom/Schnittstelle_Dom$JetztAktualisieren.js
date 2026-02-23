/**
 * @param {JQuery} $jetzt
 */

function Schnittstelle_Dom$JetztAktualisieren($jetzt) {
    $jetzt.text(DATETIME.now().toFormat("dd.MM.yyyy HH:mm:ss"));
}
