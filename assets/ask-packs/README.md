# Huda optional offline source packs

English source text and precomputed retrieval vectors for Huda's on-device
question search. These files contain no user questions, recordings, app
credentials, or private application code.

Sources:

- Abridged English Tafsir Ibn Kathir, via https://github.com/spa5k/tafsir_api.
  The text matches Huda's existing bundled edition and canonical passage ranges.
- English Sahih al-Bukhari, Sahih Muslim and Jamiʿ at-Tirmidhi, via
  https://github.com/fawazahmed0/hadith-api at revision
  `df57907be35291c91ad6a6691180e22ca9920784`.
  Edition metadata credits Muhsin Khan (Bukhari) and Abdul Hamid Siddiqui
  (Muslim); it does not identify Tirmidhi's translator. Missing English entries
  are omitted, never synthesized. See LICENSE-hadith-source.txt for the
  upstream repository's Unlicense; this is not a publisher-by-publisher
  translation rights audit or a claim of scholarly certification.
- Vectors: Xenova/all-MiniLM-L6-v2, converted from
  sentence-transformers/all-MiniLM-L6-v2, model revision
  `751bff37182d3f1213fa05d7196b954e230abad9`, Apache 2.0.
  See LICENSE-model.txt. The model itself is downloaded separately from
  https://huggingface.co/Xenova/all-MiniLM-L6-v2.

The Quran database is excluded. Quran quotations already in commentary remain.
Source prose is preserved; vectors are retrieval data, not a confidence score
or religious interpretation. Content should be read in context and checked with
a qualified sheikh.

The four packs contain 20,768 source passages and 41,774 vector chunks, totaling
45,676,920 bytes. Each pack is split into UTF-8 text parts. Concatenate the parts
in manifest order to reconstruct its JSON. The app checks each part's SHA-256
and the complete pack's SHA-256 before a transactional SQLite import.
`manifest.json` records exact bytes, hashes, source counts and chunk counts.
Consumers must pin URLs to the immutable asset commit, never a moving branch.
