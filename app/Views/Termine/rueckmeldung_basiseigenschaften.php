<div data-liste="termine_rueckmeldungen" data-mitglied_id="<?= $mitglied_id ?>">
    <div class="rueckmeldung_moeglich invisible">
        <div class="btn-group btn-group-sm stretched-link-unwirksam d-flex" role="group">
            <button type="button" class="btn btn_termine_rueckmeldung_erstellen btn-outline-<?= TERMINE_RUECKMELDUNG_AUSWAHLMOEGLICHKEITEN[1]['farbe']; ?> w-25 flex-fill" data-status="1"><span class="beschriftung"><?= TERMINE_RUECKMELDUNG_AUSWAHLMOEGLICHKEITEN[1]['aktiv']; ?></span></button>
            <button type="button" class="btn btn_rueckmeldung_bemerkung_aendern formular_oeffnen btn-outline-success flex-fill" data-liste="termine_rueckmeldungen"><span class="beschriftung"><i class="bi bi-<?= SYMBOLE['bemerkung']['bootstrap']; ?>"></i></span></button>
            <button type="button" class="btn btn_termine_rueckmeldung_erstellen btn-outline-<?= TERMINE_RUECKMELDUNG_AUSWAHLMOEGLICHKEITEN[2]['farbe']; ?> w-25 flex-fill" data-status="2"><span class="beschriftung"><?= TERMINE_RUECKMELDUNG_AUSWAHLMOEGLICHKEITEN[2]['aktiv']; ?></span></button>
        </div>
    </div>
    <div class="keine_rueckmeldung_moeglich invisible text-secondary text-center small">Keine Rückmeldung möglich!</div>
    <div class="du_bist_nicht_eingeladen invisible text-secondary text-center small">Du bist nicht eingeladen und kannst deshalb keine Rückmeldung geben.</div>
    <div class="mitglied_ist_nicht_eingeladen invisible text-secondary text-center small">Das Mitglied ist nicht eingeladen und kann deshalb keine Rückmeldung geben.</div>
</div>
