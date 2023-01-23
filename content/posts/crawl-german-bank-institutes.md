---
title: Crawler for German Bank Insitutes
excerpt: I wrote a crawler to extract core data from two popular German bank instituts, namely Sparkasse and Volksbank to support the bank.green initiative.
keywords:
  - web-crawler
  - data-extraction
  - data-pipeline
authors:
  - dotcs
published_at: "2023-01-23T20:33:00+01:00"
updated_at: "2023-01-23T20:33:00+01:00"
---

Recently I stumbled across the [bank.green][bank-green] project, which aims to add some transparency on how banks invest the money of their investors.
I really like the project idea since following the money typically seems to have a high chance of success.
I do not think I fully understood how they want to generate those insights for most bank institutes world-wide, but still it is worth trying in my opinion.

A quick search showed that a lot German banks are missing in their list.
While I was able to find the [GLS bank][gls], the bank of my trust, I missed a lot other institues - especially the [Sparkasse] and [Volksbank] institutes which are very popular in Germany.

To help the project, I wanted to contribute the necessary core data for German bank institutes.
So I started writing a web-crawler based on [scrapy], which crawls all the institutes and generates a rather large JSON file, with the extracted data.

My crawling tests have shown that the structure of the Sparkasse is much easier to crawl than the Volksbank institutions.
It seems that Sparkasse institutes use a common website engine, while Volksbank take a freer approach and give their institutes more freedom in structuring their imprint pages.

Nevertheless I found a way to cover the most relevant data and provide it to the [bank.green][bank-green] project.

The result looks like this for Sparkasse institutes

```json
[
{"url": "https://www.sparkasse-nienburg.de", "imprint_url": "https://www.sparkasse-nienburg.de/de/home/toolbar/impressum.html", "name": "Sparkasse Nienburg", "address": "Sparkasse Nienburg\nAnstalt des \u00f6ffentlichen Rechts\nGoetheplatz 4\n31582\u00a0Nienburg", "routing_number": "25650106", "bic": "NOLADE21NIB", "company_register_number": "HR A 21724 beim Amtsgericht Walsrode", "vat_id": "DE116159984", "phone": "+4950219690", "telefax": "+4950219696969", "email": "info@sparkasse-nienburg.de"},
{"url": "https://www.sparkasse-vorderpfalz.de", "imprint_url": "https://www.sparkasse-vorderpfalz.de/de/home/toolbar/impressum.html", "name": "Sparkasse Vorderpfalz", "address": "Sparkasse Vorderpfalz\nAnstalt des \u00f6ffentlichen Rechts\nLudwigstra\u00dfe 52\n67059\u00a0Ludwigshafen", "routing_number": "54550010", "bic": "LUHSDE6AXXX", "company_register_number": "HRA 3647 beim Amtsgericht Ludwigshafen", "vat_id": "DE149138080", "phone": "+4962159920", "telefax": "+496215992865992", "email": "kontakt@sparkasse-vorderpfalz.de"},
{"url": "https://www.ksk-tuebingen.de", "imprint_url": "https://www.ksk-tuebingen.de/de/home/toolbar/impressum.html", "name": "Kreissparkasse T\u00fcbingen", "address": "Kreissparkasse T\u00fcbingen\nAnstalt des \u00f6ffentlichen Rechts\nM\u00fchlbach\u00e4ckerstra\u00dfe 2\n72072\u00a0T\u00fcbingen", "routing_number": "64150020", "bic": "SOLADES1TUB", "company_register_number": "HRA 381312 beim Registergericht Stuttgart", "vat_id": "DE146889408", "phone": "+4970712050", "telefax": "+497071205105", "email": "info@ksk-tuebingen.de"},
{"url": "https://www.kreissparkasse-schwalm-eder.de", "imprint_url": "https://www.kreissparkasse-schwalm-eder.de/de/home/toolbar/impressum.html", "name": "Kreissparkasse Schwalm-Eder", "address": "Kreissparkasse Schwalm-Eder\nAnstalt des \u00f6ffentlichen Rechts\nSparkassenplatz 1\n34212\u00a0Melsungen", "routing_number": "52052154", "bic": "HELADEF1MEG", "company_register_number": "HR A 14161 beim Amtsgericht Fritzlar", "vat_id": "DE113056386", "phone": "+4956617070", "telefax": "+4956617073100", "email": "info@kskse.de"},
{"url": "https://www.ssk-cuxhaven.de", "imprint_url": "https://www.ssk-cuxhaven.de/de/home/toolbar/impressum.html", "name": "Stadtsparkasse Cuxhaven", "address": "Stadtsparkasse Cuxhaven\nAnstalt des \u00f6ffentlichen Rechts\nRohdestra\u00dfe 6\n27472\u00a0Cuxhaven", "routing_number": "24150001", "bic": "BRLADE21CUX", "company_register_number": "HRA 110595 beim Amtsgericht Tostedt", "vat_id": "DE115168565", "phone": "+4947211090", "telefax": "+494721109276", "email": "rechnungseingang@ssk-cuxhaven.de"},
{"url": "https://www.spk-vorpommern.de", "imprint_url": "https://www.spk-vorpommern.de/de/home/toolbar/impressum.html", "name": "Sparkasse Vorpommern", "address": "Sparkasse Vorpommern\nAnstalt \u00d6ffentlichen Rechts\nAn der Sparkasse 1\n17489\u00a0Greifswald", "routing_number": "15050500", "bic": "NOLADE21GRW", "company_register_number": "Handelsregister Stralsund HRA 1291", "vat_id": "DE811671292", "phone": "+4938345577888", "telefax": "+4938345577239", "email": "info@spk-vorpommern.de"},
{"url": "https://www.ostsaechsische-sparkasse-dresden.de", "imprint_url": "https://www.ostsaechsische-sparkasse-dresden.de/de/home/toolbar/impressum.html", "name": "Osts\u00e4chsische Sparkasse Dresden", "address": "Osts\u00e4chsische Sparkasse Dresden\nAnstalt des \u00d6ffentlichen Rechts\nG\u00fcntzplatz 5\n01307\u00a0Dresden", "routing_number": "85050300", "bic": "OSDDDE81XXX", "company_register_number": "HRA 4000  beim Amtsgericht Dresden", "vat_id": "DE140135071", "phone": "+493514550", "telefax": null, "email": "e-mail@sparkasse-dresden.de"},
{"url": "https://www.mbs.de", "imprint_url": "https://www.mbs.de/de/home/toolbar/impressum.html", "name": "Mittelbrandenburgische Sparkasse in Potsdam", "address": "Mittelbrandenburgische Sparkasse in Potsdam\nAnstalt des \u00f6ffentlichen Rechts\nSaarmunder Str. 61\n14478\u00a0Potsdam", "routing_number": "16050000", "bic": "WELADED1PMB", "company_register_number": "HRA 2432 P beim Amtsgericht Potsdam", "vat_id": "DE138408302", "phone": "+49331898989", "telefax": "+49331898985", "email": "kontakt@mbs.de"},
{"url": "https://www.sparkasse-opr.de", "imprint_url": "https://www.sparkasse-opr.de/de/home/toolbar/impressum.html", "name": "Sparkasse Ostprignitz-Ruppin", "address": "Sparkasse Ostprignitz-Ruppin\nAnstalt des \u00f6ffentlichen Rechts\nFontaneplatz 1\n16816\u00a0Neuruppin", "routing_number": "16050202", "bic": "WELADED1OPR", "company_register_number": "A 1037 beim Amtsgericht Neuruppin", "vat_id": "DE138672917", "phone": "+493391810", "telefax": "+49339181292222", "email": "info@sparkasse-opr.de"},
...
]
```

and like this for Volskbank institutes


```json
[
{"url": "https://www.vb-isun.de", "imprint_url": "https://www.vb-isun.de/service/rechtliche-hinweise/impressum_OSOGS.html", "name": "Volksbank in Schaumburg und Nienburg eG", "address": "Klosterstr. 30\n31737 Rinteln", "routing_number": "25591413", "bic": "GENODEF1BCK", "company_register_number": null, "vat_id": "DE116160038", "phone": "+49572495145300", "telefax": "+49575140589", "email": "info@vb-isun.de"},
{"url": "https://www.volksbank-kleverland.de", "imprint_url": "https://www.volksbank-kleverland.de/service/rechtliche-hinweise/impressum.html", "name": "Volksbank Kleverland eG", "address": "Minoritenstr. 2\n47533 Kleve", "routing_number": "32460422", "bic": "GENODED1KLL", "company_register_number": null, "vat_id": "DE120050936", "phone": "+4928218080", "telefax": null, "email": "info@volksbank-kleverland.de"},
{"url": "https://www.leipziger-volksbank.de", "imprint_url": "https://www.leipziger-volksbank.de/service/impressum.html", "name": "Leipziger Volksbank eG", "address": "Schillerstr. 3\n04109 Leipzig", "routing_number": "86095604", "bic": "GENODEF1LVB", "company_register_number": null, "vat_id": "DE141508765", "phone": "+4934169790", "telefax": "+493416979106", "email": "Kontakt@leipziger-volksbank.de"},
{"url": "https://www.vr-genobank.de", "imprint_url": "https://www.vr-genobank.de/service/rechtliche-hinweise/impressum_OSOGS.nolayer.html", "name": "VR GenoBank DonauWald eG", "address": "Raiffeisenstrasse 1\n94234 Viechtach", "routing_number": "74190000", "bic": "GENODEF1DGV", "company_register_number": null, "vat_id": "DE131459282", "phone": "+49992284010", "telefax": "+499942944966", "email": "online@vr-genobank.de"},
{"url": "https://www.volksbank-plochingen.de", "imprint_url": "https://www.volksbank-plochingen.de/service/rechtliche-hinweise/impressum_OSOGS.nolayer.html", "name": "Volksbank Plochingen eG", "address": "Am Fischbrunnen 8 \n73207 Plochingen", "routing_number": "61191310", "bic": "GENODES1VBP", "company_register_number": null, "vat_id": "DE145341772", "phone": "+49715398250", "telefax": "+497153706146", "email": "ezv@volksbank-plochingen.de"},
{"url": "https://www.volksbank-eg.de", "imprint_url": "https://www.volksbank-eg.de/service/rechtliche-hinweise/impressum_OSOGS.nolayer.html", "name": "Volksbank eG", "address": "M\u00fcnsterstr. 34\n48231 Warendorf", "routing_number": "41262501", "bic": "GENODEM1AHL", "company_register_number": null, "vat_id": "DE126731251", "phone": "+492581570", "telefax": "+49258157122", "email": "kundenservicecenter@volksbank-eg.de"},
{"url": "https://www.vbidr.de", "imprint_url": "https://www.vbidr.de/service/rechtliche-hinweise/impressum.html", "name": "Volksbank in der Region eG", "address": "Herrenberger Str. 1-5\n72070 T\u00fcbingen", "routing_number": "60391310", "bic": "GENODES1VBH", "company_register_number": null, "vat_id": "DE145047512", "phone": "+4970329400", "telefax": "+4970329401193", "email": "info@vbidr.de"},
{"url": "https://www.volksbank-stuttgart.de", "imprint_url": "https://www.volksbank-stuttgart.de/service/rechtliche-hinweise/impressum.html", "name": "Volksbank Stuttgart eG", "address": "Daimlerstra\u00dfe 129\n70372 Stuttgart", "routing_number": "60090100", "bic": "VOBADESS", "company_register_number": null, "vat_id": "DE147325720", "phone": "+497111810", "telefax": "+497111812497", "email": "info@volksbank-stuttgart.de"},
{"url": "https://www.volksbank-syke.de", "imprint_url": "https://www.volksbank-syke.de/service/rechtliche-hinweise/impressum.html", "name": "Volksbank eG, Syke", "address": "Bremer Str. 28\n27211 Bassum", "routing_number": "29167624", "bic": "GENODEF1SHR", "company_register_number": null, "vat_id": "DE116638071", "phone": "+49424185858", "telefax": "+49424185859", "email": "kundenservice@volksbank-syke.de"},
...
]
```

At the moment the code is not yet published.
I am considering doing so later on but for the moment I only plan to release the full blown JSON files through some static file serving, e.g., a GitHub gist or so.
Stay tuned.
If you are interested in the data set or any questions related to it, please reach out to me.

Learnings along the way:

- Sometimes it helps to play with the User Agent string.
  Using `curl/7.72.0` opened some doors that otherwise would be closed.
- Sometimes it makes sense to slow down crawling in order to not DOS servers.
  Still pages might put measurements in place to prevent too many requests from one IP address.
  In my case this could be mitigated by writing a custom middleware that replaced the original `RetryMiddleware` and forced a 2min break if a `503 Service Unavailable` error was found.
- Writing web-crawlers to extract data based on the DOM nodes paths and CSS classes or xpaths is brittle.
  Maybe it would help to train a ML model to extract the data on its own.
  The model might be much more stable against changes on the website that might occur at any time.

[bank-green]: https://bank.green
[gls]: https://gls.de
[sparkasse]: https://sparkasse.de
[volksbank]: https://vr.de
[scrapy]: https://scrapy.org