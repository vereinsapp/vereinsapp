/**
 * @param {JQuery} $jetzt
 */

function Dom_$JetztAktualisieren($jetzt) {
    $jetzt.text(DATETIME.now().toFormat("dd.MM.yyyy HH:mm:ss"));
}
