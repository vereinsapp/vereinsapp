<div class="verknuepfungen_auswahlmoeglichkeiten" data-verknuepfungen="termine_rueckmeldungen" data-liste="mitglieder" data-element_id="<?= $element_id ?>" data-gegen_liste="termine" >
    <div class="verknuepfung_moeglich invisible">
        <div class="btn-group btn-group-sm stretched-link-unwirksam d-flex" role="group">
            <button type="button" class="btn btn_verknuepfung_erstellen btn-outline-<?= VERKNUEPFUNGEN['termine_rueckmeldungen']['auswahlmoeglichkeiten'][1]['farbe']; ?> w-25 flex-fill" data-status="1"><span class="beschriftung"><?= VERKNUEPFUNGEN['termine_rueckmeldungen']['auswahlmoeglichkeiten'][1]['aktiv']; ?></span></button>
            <button type="button" class="btn btn_verknuepfung_bemerkung_aendern formular_oeffnen btn-outline-primary flex-fill" data-liste="termine_rueckmeldungen"><span class="beschriftung"><i class="bi bi-<?= SYMBOLE['bemerkung']['bootstrap']; ?>"></i></span></button>
            <button type="button" class="btn btn_verknuepfung_erstellen btn-outline-<?= VERKNUEPFUNGEN['termine_rueckmeldungen']['auswahlmoeglichkeiten'][2]['farbe']; ?> w-25 flex-fill" data-status="2"><span class="beschriftung"><?= VERKNUEPFUNGEN['termine_rueckmeldungen']['auswahlmoeglichkeiten'][2]['aktiv']; ?></span></button>
        </div>
    </div>
    <div class="keine_verknuepfung_moeglich invisible text-secondary text-center small">Keine Rückmeldung möglich!</div>
    <div class="keine_verknuepfung_fuer_dich_moeglich invisible text-secondary text-center small">Du bist nicht eingeladen und kannst deshalb keine Rückmeldung geben.</div>
    <div class="keine_verknuepfung_fuer_mitglied_moeglich invisible text-secondary text-center small">Das Mitglied ist nicht eingeladen und kann deshalb keine Rückmeldung geben.</div>
</div>
