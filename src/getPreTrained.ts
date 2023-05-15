import { Network } from "./Network";

const data = [
  '{"layers":[{"weights":{"rows":5,"cols":6,"data":[-0.28274916170930653,-0.56544036867267,0.5967923454197888,1.8571203455338585,-0.37148986465133405,-0.18449476044877028,-1.6046992920064735,0.12358208101929372,0.12987234050227603,-1.0911589116334541,-1.0030753470770182,0.4163355444180922,0.4723024226689594,0.8961093595504184,-0.4912963252944011,-1.6361067527557864,1.091289328270493,0.26382246167398643,-0.37503370137308667,-0.45991000218120104,-0.3375176362754286,1.0629486586284853,0.3226351989531131,0.24295539520953732,0.4785387436330621,0.5380240256487246,-0.9498513714683932,0.16065014595399804,-0.1529134787084408,-0.8588087544547836]},"bias":{"rows":5,"cols":1,"data":[-0.7853056162282267,-0.6779746347701836,-0.41874511807923775,0.39371243599460637,1.2093863641883527]}},{"weights":{"rows":2,"cols":5,"data":[0.9375859677350938,-0.359707782412364,-3.229944348747849,1.0618515099867742,-1.0232443839796541,-0.3089378452900842,-1.0329802740498026,-1.1409741356624845,-0.3208647069357229,0.3972139753722519]},"bias":{"rows":2,"cols":1,"data":[-0.3792167618735107,-0.39565893097327587]}}]}',
  '{"layers":[{"weights":{"rows":5,"cols":6,"data":[-0.28274916170930653,-0.56544036867267,0.6762308659902547,1.8571203455338585,-0.3871502186713225,-0.1157813368483687,-1.5326956428621967,0.12358208101929372,0.12987234050227603,-1.0911589116334541,-1.0030753470770182,0.2887394793187458,0.4294438015056502,0.9579560241264659,-0.5744521857287515,-1.6361067527557864,1.091289328270493,0.3071332532973839,-0.4449669898954669,-0.45991000218120104,-0.3375176362754286,1.0629486586284853,0.3226351989531131,0.24295539520953732,0.429924211981492,0.47751039036303466,-1.083654114626317,0.16065014595399804,-0.1529134787084408,-0.7268065119798315]},"bias":{"rows":5,"cols":1,"data":[-0.7853056162282267,-0.6779746347701836,-0.41874511807923775,0.31833561294679563,1.2093863641883527]}},{"weights":{"rows":2,"cols":5,"data":[0.8231816130971147,-0.359707782412364,-3.2448861040227994,0.9697959723479651,-1.0585599713641844,-0.33840831389364606,-1.0329802740498026,-1.1409741356624845,-0.27523139207479275,0.44097279473207085]},"bias":{"rows":2,"cols":1,"data":[-0.3792167618735107,-0.5107333937775348]}}]}',
  '{"layers":[{"weights":{"rows":5,"cols":6,"data":[-0.37483465991230824,-0.56544036867267,0.6762308659902547,1.8614029476542289,-0.3871502186713225,-0.15989548195325723,-1.5326956428621967,0.12358208101929372,0.18178168292022437,-1.0911589116334541,-0.9884872968186,0.32261698569548236,0.4294438015056502,0.9194314516462939,-0.6198215725720667,-1.9336117977020533,1.0424846299542607,0.31496319235084363,-0.5895832271882002,-0.45991000218120104,-0.3375176362754286,1.0564435605722378,0.17287042320119142,0.29083352124334,0.429924211981492,0.47751039036303466,-1.0000189049362638,0.037477154094187455,-0.3011887260806981,-0.9388890506537785]},"bias":{"rows":5,"cols":1,"data":[-0.6894223776815477,-0.6779746347701836,-0.444726817153028,0.31833561294679563,1.2093863641883527]}},{"weights":{"rows":2,"cols":5,"data":[0.735312922201207,-0.5255077056470004,-3.196098352773233,0.958347910439066,-1.0585599713641844,-0.43006762607083515,-0.895431167448508,-1.2757774923344043,-0.45290619556822553,0.44097279473207085]},"bias":{"rows":2,"cols":1,"data":[-0.4522675739302275,-0.4452063252085571]}}]}',
  '{"layers":[{"weights":{"rows":5,"cols":6,"data":[-0.37483465991230824,-0.56544036867267,0.6762308659902547,1.8614029476542289,-0.2923580315035652,-0.15989548195325723,-1.5326956428621967,0.12358208101929372,0.18178168292022437,-1.0911589116334541,-0.9884872968186,0.32261698569548236,0.4294438015056502,0.9194314516462939,-0.6198215725720667,-1.9336117977020533,1.0424846299542607,0.31496319235084363,-0.6580165767065185,-0.45991000218120104,-0.3375176362754286,1.1446330762238124,0.17287042320119142,0.29083352124334,0.429924211981492,0.47751039036303466,-1.0000189049362638,0.037477154094187455,-0.3011887260806981,-0.9388890506537785]},"bias":{"rows":5,"cols":1,"data":[-0.6894223776815477,-0.760941842174979,-0.444726817153028,0.31833561294679563,1.0823351739775595]}},{"weights":{"rows":2,"cols":5,"data":[0.735312922201207,-0.5255077056470004,-3.196098352773233,0.958347910439066,-1.0585599713641844,-0.43006762607083515,-0.895431167448508,-1.2757774923344043,-0.45290619556822553,0.44097279473207085]},"bias":{"rows":2,"cols":1,"data":[-0.4522675739302275,-0.4452063252085571]}}]}',
  '{"layers":[{"weights":{"rows":5,"cols":6,"data":[-0.28274916170930653,-0.56544036867267,0.7243726958114703,1.8571203455338585,-0.3871502186713225,-0.1157813368483687,-1.5326956428621967,0.12358208101929372,0.12987234050227603,-1.0911589116334541,-1.0030753470770182,0.4163355444180922,0.4294438015056502,0.8961093595504184,-0.5744521857287515,-1.6361067527557864,1.091289328270493,0.3071332532973839,-0.4449669898954669,-0.45991000218120104,-0.3375176362754286,1.0629486586284853,0.3226351989531131,0.24295539520953732,0.429924211981492,0.47751039036303466,-1.083654114626317,0.16065014595399804,-0.1529134787084408,-0.7268065119798315]},"bias":{"rows":5,"cols":1,"data":[-0.7853056162282267,-0.6779746347701836,-0.41874511807923775,0.43503724570549596,1.2093863641883527]}},{"weights":{"rows":2,"cols":5,"data":[0.9375859677350938,-0.359707782412364,-3.2448861040227994,0.9697959723479651,-1.0585599713641844,-0.33840831389364606,-1.0329802740498026,-1.1409741356624845,-0.27523139207479275,0.44097279473207085]},"bias":{"rows":2,"cols":1,"data":[-0.3792167618735107,-0.5107333937775348]}}]}',
  '{"layers":[{"weights":{"rows":5,"cols":6,"data":[-0.28274916170930653,-0.4723255606940636,0.7146073627794522,1.8571203455338585,-0.45425723293391307,-0.1157813368483687,-1.5326956428621967,-0.01597843409644728,0.12987234050227603,-0.8365630274379443,-1.0030753470770182,0.22849342843066722,0.4294438015056502,0.8368211584452829,-0.7064278475618617,-1.7170113228405888,1.0896221227679317,0.24215813732571356,-0.4449669898954669,-0.45991000218120104,-0.42565900996353917,1.0564435605722378,0.4110928839193485,0.3636941548677712,0.429924211981492,0.44213878693656483,-1.1613625554082498,0.08884800793352536,-0.2866618189541623,-0.6237079745348761]},"bias":{"rows":5,"cols":1,"data":[-0.7428497666194728,-0.6779746347701836,-0.33262084820232585,0.16930164762956024,1.2093863641883527]}},{"weights":{"rows":2,"cols":5,"data":[0.8231816130971147,-0.467721692624488,-3.273170531684473,0.9697959723479651,-1.0585599713641844,-0.7731104269563048,-0.895431167448508,-1.1409741356624845,-0.2100752666384374,0.4907224092148563]},"bias":{"rows":2,"cols":1,"data":[-0.4522675739302275,-0.5714995169744362]}}]}',
  '{"layers":[{"weights":{"rows":5,"cols":6,"data":[-0.28274916170930653,-0.56544036867267,0.3559292807018503,1.8887109775473918,-0.3871502186713225,-0.1157813368483687,-1.5326956428621967,0.18796919057328954,0.053667674602958695,-1.0911589116334541,-1.0230919819388269,0.417381435454514,0.46352842445393705,0.9579560241264659,-0.5700643515343607,-1.6361067527557864,0.9711560055765281,0.2637209467138051,-0.32308247773739324,-0.7317183397521625,-0.3375176362754286,0.9829505218500278,0.3226351989531131,0.3918659770939401,0.429924211981492,0.47751039036303466,-0.9548650113633914,0.2825245262607566,-0.302878698019483,-0.8558667122984278]},"bias":{"rows":5,"cols":1,"data":[-0.7853056162282267,-0.6025470755386542,-0.41874511807923775,0.39121282857958944,1.2093863641883527]}},{"weights":{"rows":2,"cols":5,"data":[0.8231816130971147,-0.359707782412364,-3.0966439639109025,0.9914565268227571,-1.0585599713641844,-0.29078554400770446,-1.1745145282575158,-1.0004720787992594,-0.27504271202438557,0.44097279473207085]},"bias":{"rows":2,"cols":1,"data":[-0.3792167618735107,-0.619786413589673]}}]}',
  '{"layers":[{"weights":{"rows":5,"cols":6,"data":[-0.37483465991230824,-0.56544036867267,0.6762308659902547,1.8614029476542289,-0.3871502186713225,-0.15989548195325723,-1.5326956428621967,0.12358208101929372,0.18178168292022437,-1.0911589116334541,-0.9884872968186,0.32261698569548236,0.4294438015056502,0.9194314516462939,-0.6198215725720667,-1.9336117977020533,1.0424846299542607,0.31496319235084363,-0.5895832271882002,-0.45991000218120104,-0.3375176362754286,1.0564435605722378,0.17287042320119142,0.29083352124334,0.429924211981492,0.47751039036303466,-1.0000189049362638,0.037477154094187455,-0.3011887260806981,-0.8158512793154035]},"bias":{"rows":5,"cols":1,"data":[-0.6894223776815477,-0.6779746347701836,-0.444726817153028,0.31833561294679563,1.2093863641883527]}},{"weights":{"rows":2,"cols":5,"data":[0.735312922201207,-0.5255077056470004,-3.196098352773233,0.958347910439066,-1.0585599713641844,-0.43006762607083515,-0.895431167448508,-1.1409741356624845,-0.39416693871645064,0.44097279473207085]},"bias":{"rows":2,"cols":1,"data":[-0.4522675739302275,-0.4452063252085571]}}]}',
  '{"layers":[{"weights":{"rows":5,"cols":6,"data":[-0.28274916170930653,-0.56544036867267,0.7243726958114703,1.8571203455338585,-0.3871502186713225,-0.1157813368483687,-1.5326956428621967,0.12358208101929372,0.12987234050227603,-1.0911589116334541,-1.0030753470770182,0.4163355444180922,0.4294438015056502,0.8961093595504184,-0.5744521857287515,-1.6361067527557864,1.091289328270493,0.3071332532973839,-0.4449669898954669,-0.45991000218120104,-0.3375176362754286,1.0629486586284853,0.3226351989531131,0.24295539520953732,0.429924211981492,0.47751039036303466,-1.083654114626317,0.16065014595399804,-0.1529134787084408,-0.7268065119798315]},"bias":{"rows":5,"cols":1,"data":[-0.7853056162282267,-0.6779746347701836,-0.41874511807923775,0.43503724570549596,1.2093863641883527]}},{"weights":{"rows":2,"cols":5,"data":[0.9375859677350938,-0.359707782412364,-3.229944348747849,0.9697959723479651,-1.0585599713641844,-0.33840831389364606,-1.0329802740498026,-1.1409741356624845,-0.27523139207479275,0.3972139753722519]},"bias":{"rows":2,"cols":1,"data":[-0.3792167618735107,-0.5107333937775348]}}]}',
  '{"layers":[{"weights":{"rows":5,"cols":6,"data":[-0.28274916170930653,-0.56544036867267,0.3559292807018503,1.8887109775473918,-0.3871502186713225,-0.25078673918547606,-1.5326956428621967,0.18796919057328954,0.053667674602958695,-1.0911589116334541,-1.0230919819388269,0.417381435454514,0.46352842445393705,0.9579560241264659,-0.5700643515343607,-1.6361067527557864,0.9711560055765281,0.2637209467138051,-0.18478432458398067,-0.7317183397521625,-0.3375176362754286,0.9829505218500278,0.3226351989531131,0.3918659770939401,0.429924211981492,0.47751039036303466,-1.0899918171396565,0.2825245262607566,-0.302878698019483,-0.8558667122984278]},"bias":{"rows":5,"cols":1,"data":[-0.7853056162282267,-0.6025470755386542,-0.41874511807923775,0.39121282857958944,1.2093863641883527]}},{"weights":{"rows":2,"cols":5,"data":[0.8231816130971147,-0.359707782412364,-2.9484816936354514,1.001810191512326,-1.0585599713641844,-0.29078554400770446,-1.1745145282575158,-1.0004720787992594,-0.34578773952055486,0.5320739001522954]},"bias":{"rows":2,"cols":1,"data":[-0.3792167618735107,-0.619786413589673]}}]}',
];

const deserialized = data.map((serialized) => Network.deserialize(serialized));

export function getPreTrainedNetworks(): Network[] {
  return deserialized;
}
