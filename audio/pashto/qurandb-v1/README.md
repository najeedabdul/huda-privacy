# Pashto verse audio

Original MP3 recordings published by [The QURAN database](https://qurandb.com/)
in its optional `Voice_Pashto.mdb` download. This directory preserves the
recording bytes and embedded publisher metadata, without re-encoding.
The source does not identify the audio narrator; no narrator attribution is
inferred from its separate written-translation credits.

The publisher describes its program as free to use and distribute as is; its
original README is retained as UPSTREAM-README.txt. Recordings remain the work
of their original producers. Huda claims no authorship or additional license.

`SSSAAA.mp3` names follow the canonical 6,236-verse order: three digits for
the Surah and three for the verse. The source's empty row6237 is omitted.
`manifest.json` records each clip's length and SHA-256, plus its global verse ID.

This dedicated data branch serves the Preview app's normal per-verse downloads.
The recordings are separate from the app bundle. App catalogs pin the data
commit so a later branch update cannot silently change a recording.
