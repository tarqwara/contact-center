import {query} from './index';

export const fetchVoiceMessages = async () => {
  try {
    const {rows} = await query(`SELECT id, "from", "to", created, recording_url AS "recordingUrl", listened 
      FROM voice_message WHERE (deleted IS NULL OR deleted > CURRENT_TIMESTAMP) ORDER BY created`);
    return rows;
  } catch (err) {
    console.error(`Could not fetch voice messages:\n${err}`);
    return [];
  }
};

export const storeVoiceMessage = async (accountSid, callSid, from, to, recordingSid, recordingUrl) => {
  try {
    await query(`INSERT INTO voice_message (account_sid, call_sid, "from", "to", recording_sid, recording_url) 
    VALUES ($1, $2, $3, $4, $5, $6)`, [
      accountSid,
      callSid,
      from,
      to,
      recordingSid,
      recordingUrl
    ]);
  } catch (err) {
    console.error(`Could not store voice message [callSid: ${callSid}]:\n${err}`);
  }
};

export const updateVoiceMessageToListened = async id => {
  try {
    await query('UPDATE voice_message SET listened = TRUE WHERE id = $1', [id]);
  } catch (err) {
    console.error(`Could not update voice message to listened [id: ${id}]:\n${err}`);
  }
};

export const deleteVoiceMessage = async id => {
  try {
    await query('UPDATE voice_message SET deleted = CURRENT_TIMESTAMP WHERE id = $1', [id]);
    return true;
  } catch (err) {
    console.error(`Could not delete voice message [id: ${id}]:\n${err}`);
    return false;
  }
};