export type Lang='ja'|'en';
export const labels={ja:{request:'支援を依頼する',services:'サービスを見る',home:'ホーム',about:'概要',pricing:'料金',faq:'FAQ',admin:'管理',lang:'English'},en:{request:'Request Support',services:'View Services',home:'Home',about:'About',pricing:'Pricing',faq:'FAQ',admin:'Admin',lang:'日本語'}};
export const nav=['about','services','before-arrival','arrival','living','family','kvh','coe-speedvisa','affiliated-school','pricing','faq'] as const;
export const navNames={ja:{'about':'概要','services':'サービス','before-arrival':'来日前','arrival':'到着時','living':'生活支援','family':'家族支援','kvh':'KVH','coe-speedvisa':'COE / SpeedVisa','affiliated-school':'附属校相談','pricing':'料金','faq':'FAQ'},en:{'about':'About','services':'Services','before-arrival':'Before arrival','arrival':'Arrival','living':'Living','family':'Family','kvh':'KVH','coe-speedvisa':'COE / SpeedVisa','affiliated-school':'Affiliated school','pricing':'Pricing','faq':'FAQ'}};
export const home={ja:{headline:'海外から来日する教員・研究者・ご家族のためのワンストップ支援',sub:'Creotechが、来日前準備、到着時の案内、生活立ち上げ、家族支援、KVH対面サポート、COE/SpeedVisaへの橋渡しを分かりやすく受け付けます。',trust:'大学関係者・受入部局・事務担当者が安心して案内できる、シンプルで信頼性の高い入口です。'},en:{headline:'Support for International Faculty, Researchers, and Families Coming to Ritsumeikan',sub:'Creotech provides a clear front door for pre-arrival preparation, arrival guidance, daily-life setup, family support, KVH in-person assistance, and COE / SpeedVisa guidance.',trust:'A calm, reliable intake point for university managers, host departments, administrative staff, and incoming guests.'}};
export const banner={ja:[['来日前サポート','COE/ビザ案内、住居、航空券、通信、保険の準備','before-arrival'],['到着時サポート','空港・京都駅での待ち合わせ、通訳、地域案内','arrival'],['最初の7日間','市役所、銀行、携帯、公共料金、キャンパス案内','services'],['日本での生活','病院同行、日常相談、買い物、トラブル相談','living'],['KVH Personal Assistance','英語対応の有料対面サポート','kvh'],['COE / SpeedVisa','機微書類は本サイトで収集せず、指定手続きへ案内','coe-speedvisa']],en:[['Before You Come to Japan','COE/visa guidance, housing, flights, mobile, insurance preparation','before-arrival'],['Arrival Support','Airport or Kyoto Station meet-up, interpretation, local guidance','arrival'],['First 7 Days in Japan','City office, bank, mobile, utilities, campus orientation','services'],['Living in Japan','Clinic visits, daily consultation, shopping, family life','living'],['KVH Personal Assistance','Paid English-speaking in-person support','kvh'],['COE / SpeedVisa','Sensitive documents are not collected on this MVP site','coe-speedvisa']]};
const commonNotes={en:['No passport uploads or sensitive immigration documents are accepted on this MVP website.','Services do not guarantee COE approval or visa issuance.','Legal, medical, and financial advice are outside scope. Some work may be handled by partners.'],ja:['本MVPサイトではパスポート画像や機微な入管書類を受け付けません。','COE承認や査証発給を保証するものではありません。','法律・医療・金融上の助言は範囲外です。一部は提携会社が対応する場合があります。']};
export const pages:any={
ja:{about:['サービス概要','海外から来日する教員・研究者・客員研究員・ご家族と、受入部局をつなぐ支援窓口です。'],services:['サービス一覧','来日前、到着時、最初の7日間、生活、出国前までを時系列で整理しています。'], 'before-arrival':['来日前サポート','SpeedVisaを通じたCOE/ビザ案内、航空券、住居、通信、保険、家族準備を支援します。'],arrival:['到着時サポート','関西国際空港、伊丹空港、京都駅等での待ち合わせ、通訳、地域案内、チェックイン支援を行います。'],living:['日本での生活支援','市役所、銀行、携帯、病院・クリニック同行、日常相談、KVH対面支援につなげます。'],family:['家族支援','同伴家族の来日準備、学校・保育情報、生活立ち上げ、病院同行などを案内します。'],kvh:['KVH Personal Assistance','訪問教員・研究者・ご家族のための英語対応・対面型有料サポートです。'], 'coe-speedvisa':['COE / SpeedVisa サポート','COE準備はSpeedVisaおよび関連大学部署の適切な手続きへ橋渡しします。'], 'affiliated-school':['附属校生徒の受入支援 — 個別相談対応','本MVPは主に教員・研究者・ご家族向けです。高校生・附属校案件は年齢、保護者、受入校、滞在体制により個別相談で対応します。'],pricing:['料金','KVHは4時間40,000円+税から。その他は内容・日時・場所により見積です。'],faq:['FAQ','よくある質問を短く実務的にまとめました。']},
en:{about:['About the Service','A support front door connecting incoming international faculty, researchers, visiting scholars, families, and host departments.'],services:['Service Overview','Support is organized by timeline: before arrival, arrival, first seven days, daily life, and departure preparation.'],'before-arrival':['Before Arrival Support','We guide COE/visa preparation through SpeedVisa where applicable, plus flights, housing, mobile, insurance, and family preparation.'],arrival:['Arrival Support','Meet-up, interpretation, and local guidance at Kansai International Airport, Itami Airport, Kyoto Station, hotel or housing check-in.'],living:['Living in Japan Support','City office, bank, mobile, hospital or clinic visit support, daily consultation, shopping, and KVH assistance.'],family:['Family Support','Preparation and daily-life setup for accompanying family members, including school/childcare information and local accompaniment.'],kvh:['KVH Personal Assistance','Paid English-speaking, in-person support for visiting faculty, researchers, and families.'],'coe-speedvisa':['COE / SpeedVisa Support','COE preparation is bridged to SpeedVisa and the relevant university workflow; this MVP is not a document upload system.'],'affiliated-school':['Affiliated School Student Support — Case-by-case Consultation','This MVP mainly supports faculty, researchers, visiting scholars, and accompanying families. High school and affiliated school cases are handled by individual consultation.'],pricing:['Pricing','KVH starts from JPY 40,000 + tax for a 4-hour minimum. Other services require quotation depending on details.'],faq:['FAQ','Short, practical answers to common questions.']}};
export const notes=commonNotes;
export const faqs={en:['Who can use this service? Faculty, researchers, visiting scholars, families, host departments, and administrative staff.','Is this only for Ritsumeikan University? It is designed for Ritsumeikan-related institutions and related cases.','Can family members use this service? Yes, accompanying family support is included.','Is COE handled on this website? No. Initial requests are collected, then appropriate university and SpeedVisa workflows are used.','What is SpeedVisa? A partner workflow for COE/visa preparation when applicable.','Can I upload my passport here? No. Do not upload or send sensitive documents through this MVP.','Can I request airport support? Yes, as meet-up, interpretation, and local guidance, not private vehicle transport.','Can I ask for help at the city office? Yes, through KVH or quotation.','Can KVH support sightseeing? Local guidance such as a Kyoto mini tour may be requested.','How much does KVH cost? Minimum 4 hours JPY 40,000 + tax; additional hours JPY 10,000 + tax.','Can high school students use this service? Case-by-case consultation only in this MVP.','How do I pay? Creotech staff will explain after confirming the request.','What services are not provided? Legal, medical, financial advice, visa guarantees, and private vehicle transport.','Does this service guarantee visa approval? No.','Are actual expenses included? No, transport, meals, admission and other actual costs are separate.'],ja:['誰が利用できますか？ 教員、研究者、客員研究員、ご家族、受入部局、事務担当者が対象です。','立命館大学だけですか？ 立命館関連機関と関連案件を想定しています。','家族も利用できますか？ はい、同伴家族支援を含みます。','COEはこのサイトで処理しますか？ いいえ。初期依頼のみ受け付け、大学部署とSpeedVisa等の適切な手続きへ案内します。','SpeedVisaとは何ですか？ 必要に応じてCOE/ビザ準備に利用する提携ワークフローです。','パスポートをアップロードできますか？ いいえ。本MVPで機微書類は収集しません。','空港サポートを依頼できますか？ はい。待ち合わせ、通訳、地域案内であり、専用車送迎ではありません。','市役所での手続き支援はありますか？ はい。KVHまたは見積対応です。','KVHで観光支援はできますか？ 京都ミニツアー等の地域案内は相談可能です。','KVHはいくらですか？ 4時間40,000円+税、追加1時間10,000円+税です。','高校生は利用できますか？ 本MVPでは個別相談対応です。','支払い方法は？ 依頼内容確認後にCreotech担当者が案内します。','提供しないサービスは？ 法律・医療・金融助言、査証保証、専用車送迎等です。','ビザ承認は保証されますか？ いいえ。','実費は含まれますか？ 交通費、食費、入場料等の実費は別途です。']};
export const statusOptions=['New','Checking','Waiting for applicant','Waiting for host department','SpeedVisa guidance needed','Quotation needed','Confirmed','In progress','Completed','Cancelled'];

export const serviceDetails = {
  en: {
    about: {
      audience: ['Incoming international faculty', 'Researchers and visiting scholars', 'Accompanying family members', 'Host departments and administrative staff'],
      support: ['One clear intake point', 'Scope confirmation before paid support', 'Partner handoff where appropriate', 'No sensitive-document upload on this MVP'],
      process: ['Submit an initial request', 'Creotech reviews the case', 'Host department or university workflow is confirmed', 'Support scope and quotation are shared'],
      pricing: 'Initial review is handled through the request workflow. Paid services and partner services are quoted before confirmation.',
      notes: ['This site is an intake and explanation MVP, not a full case-management system.', 'Official institutional branding can be added only if approved assets are provided.'],
    },
    services: {
      audience: ['Faculty', 'Researchers', 'Families', 'Host departments'],
      support: ['Before-arrival preparation', 'Arrival meet-up and local guidance', 'First seven days in Japan', 'Living support', 'Departure preparation'],
      process: ['Choose relevant services', 'Share timing and host details', 'Receive next-step guidance', 'Confirm support scope'],
      pricing: 'Some services are quotation-based. KVH Personal Assistance has published minimum pricing.',
      notes: ['Airport support is meet-up, interpretation, and local guidance; it is not private vehicle transportation.'],
    },
    'before-arrival': {
      audience: ['Faculty or researchers preparing to relocate', 'Host departments coordinating arrival', 'Families planning a move to Japan'],
      support: ['COE / visa guidance through SpeedVisa when applicable', 'Flight preparation support', 'Housing search coordination', 'Mobile / SIM / internet preparation', 'Insurance guidance', 'Family preparation'],
      process: ['Confirm host institution and planned arrival', 'Identify COE / visa workflow', 'Coordinate housing and daily-life preparation', 'Confirm arrival support needs'],
      pricing: 'Quotation may be required depending on support scope and partner involvement.',
      notes: ['Sensitive COE or passport documents should be submitted only through the designated secure process, not this website.'],
    },
    arrival: {
      audience: ['New arrivals at Kansai International Airport', 'New arrivals at Itami Airport', 'Guests meeting at Kyoto Station', 'Families arriving together'],
      support: ['Airport meet and assist', 'Kyoto Station meet-up', 'Interpretation and local guidance', 'Hotel or housing check-in support', 'First-day orientation'],
      process: ['Confirm arrival date, airport/station, and flight details later', 'Assign support staff or partner', 'Meet at agreed location', 'Guide to next destination and first-day essentials'],
      pricing: 'Airport meet and assist is quotation-based unless handled as KVH time.',
      notes: ['This is not a private vehicle transportation service. Public transport, taxi arrangement guidance, interpretation, and local assistance can be supported.'],
    },
    living: {
      audience: ['Faculty and researchers settling in Japan', 'Accompanying family members', 'Host staff supporting daily-life questions'],
      support: ['City office procedures', 'Bank account support', 'Mobile phone setup', 'Utilities setup', 'Hospital or clinic visit support', 'Daily trouble consultation', 'Shopping and daily-life setup'],
      process: ['Confirm issue and location', 'Decide whether KVH or quotation support is appropriate', 'Schedule accompaniment if needed', 'Record follow-up items'],
      pricing: 'Many in-person support cases can be handled through KVH Personal Assistance or custom quotation.',
      notes: ['Creotech and KVH can provide interpretation and local guidance, but not medical, legal, or financial advice.'],
    },
    family: {
      audience: ['Spouses and partners', 'Children accompanying faculty or researchers', 'Host departments preparing family arrival'],
      support: ['Family arrival preparation', 'School and childcare information', 'Daily-life setup', 'Clinic visit accompaniment', 'Shopping and local orientation'],
      process: ['Share family composition at a high level', 'Confirm timing and priority needs', 'Coordinate information or accompaniment', 'Follow up after arrival'],
      pricing: 'Family support may be handled through KVH or quoted separately depending on content.',
      notes: ['The MVP does not collect unnecessary sensitive family details. Additional information is requested only when needed later.'],
    },
    kvh: {
      audience: ['Visiting faculty', 'Researchers', 'Accompanying family members', 'Departments needing reliable in-person English support'],
      support: ['Airport meet and assist', 'City office accompaniment', 'Bank or phone shop accompaniment', 'Housing move-in support', 'Shopping setup', 'Hospital or clinic visit support', 'Kyoto mini tour', 'Other local support'],
      process: ['Submit request and preferred timing', 'Creotech confirms feasibility and scope', 'Quotation and actual-cost notes are shared', 'KVH support is scheduled after confirmation'],
      pricing: 'Minimum 4 hours: JPY 40,000 + consumption tax. Additional time: JPY 10,000 + consumption tax per hour. Transportation, admissions, meals, and other actual costs are separate.',
      notes: ['KVH provides interpretation, local guidance, and in-person assistance only.', 'KVH does not provide legal advice, medical advice, financial advice, immigration approval guarantees, or private vehicle transportation.'],
    },
    'coe-speedvisa': {
      audience: ['Applicants who may need COE guidance', 'Host departments preparing invitations', 'Administrative staff coordinating university workflows'],
      support: ['Initial intake through this website', 'Residence-status workflow confirmation by relevant offices', 'Guidance to SpeedVisa when applicable', 'Post-COE support for housing, arrival, mobile, insurance, family, and KVH'],
      process: ['Applicant or host department contacts Creotech', 'Creotech receives the initial request', 'Relevant university office confirms the residence status and process', 'Applicant is guided to SpeedVisa when applicable', 'Applicant enters required information in SpeedVisa', 'COE process proceeds through the proper university workflow'],
      pricing: 'COE and visa-related costs depend on the designated process. Related arrival and life-support services may be quoted separately.',
      notes: ['This service does not guarantee COE approval or visa issuance.', 'COE and visa procedures depend on the relevant authorities.', 'Sensitive documents should be submitted through the designated secure process, not this MVP website.'],
    },
    'affiliated-school': {
      audience: ['Affiliated school cases', 'High school student cases', 'Host schools seeking initial consultation'],
      support: ['Case-by-case initial consultation', 'Clarification of required guardian and host-school structure', 'Future support package planning'],
      process: ['Submit an initial inquiry', 'Creotech confirms whether the case fits this MVP workflow', 'Additional guardian or school information may be requested later', 'A custom path is proposed if feasible'],
      pricing: 'Quotation required after scope confirmation.',
      notes: ['Do not over-assume eligibility. Required procedures differ depending on age, guardian status, host school, accommodation, and support structure.'],
    },
  },
  ja: {
    about: {
      audience: ['海外から来日する教員', '研究者・客員研究員', '同伴家族', '受入部局・事務担当者'],
      support: ['分かりやすい初期相談窓口', '有料支援前の範囲確認', '必要に応じた提携会社への橋渡し', '本MVPでは機微書類を収集しない運用'],
      process: ['初期依頼を送信', 'Creotechが内容を確認', '受入部局・大学手続きを確認', '支援範囲と見積を案内'],
      pricing: '初期確認後、有料支援や提携会社対応が必要な場合は事前に見積を案内します。',
      notes: ['本サイトは説明と初期受付のMVPであり、完全な案件管理システムではありません。', '公式ロゴ等は承認済み素材が提供された場合のみ追加します。'],
    },
    services: {
      audience: ['教員', '研究者', '同伴家族', '受入部局'],
      support: ['来日前準備', '到着時の待ち合わせ・地域案内', '最初の7日間の生活立ち上げ', '日本での生活支援', '出国前準備'],
      process: ['必要な支援を選択', '時期と受入情報を共有', '次の手順を確認', '支援範囲を確定'],
      pricing: '内容により見積です。KVH Personal Assistanceは最低料金を掲載しています。',
      notes: ['空港支援は待ち合わせ、通訳、地域案内であり、専用車送迎ではありません。'],
    },
    'before-arrival': {
      audience: ['来日準備中の教員・研究者', '到着調整を行う受入部局', '日本への転居を予定する家族'],
      support: ['必要に応じたSpeedVisa経由のCOE/ビザ案内', '航空券準備支援', '住居探しの調整', '携帯・SIM・インターネット準備', '保険案内', '家族準備'],
      process: ['受入機関と到着予定を確認', 'COE/ビザ手続きを整理', '住居と生活準備を調整', '到着時支援の要否を確認'],
      pricing: '支援範囲や提携会社対応により見積が必要です。',
      notes: ['COE書類やパスポート等の機微書類は、本サイトではなく指定の安全な手続きで提出してください。'],
    },
    arrival: {
      audience: ['関西国際空港到着者', '伊丹空港到着者', '京都駅で合流する方', '家族で到着する方'],
      support: ['空港ミートアシスト', '京都駅待ち合わせ', '通訳と地域案内', 'ホテル・住居チェックイン支援', '初日オリエンテーション'],
      process: ['到着日、空港・駅、便情報を後日確認', '担当者または提携先を調整', '合意した場所で合流', '目的地と初日の要点を案内'],
      pricing: '空港ミートアシストは見積、またはKVH時間として対応します。',
      notes: ['専用車送迎ではありません。公共交通機関、タクシー手配の案内、通訳、地域案内を支援します。'],
    },
    living: {
      audience: ['日本で生活を始める教員・研究者', '同伴家族', '生活相談を受ける受入部局'],
      support: ['市役所手続き', '銀行口座開設支援', '携帯電話設定', '公共料金設定', '病院・クリニック同行', '日常トラブル相談', '買い物・生活立ち上げ'],
      process: ['内容と場所を確認', 'KVHまたは見積対応を判断', '必要に応じて同行日程を調整', 'フォロー事項を整理'],
      pricing: '対面支援はKVH Personal Assistanceまたは個別見積で対応します。',
      notes: ['CreotechおよびKVHは通訳・地域案内を提供しますが、医療・法律・金融上の助言は提供しません。'],
    },
    family: {
      audience: ['配偶者・パートナー', '同伴する子ども', '家族受入を準備する部局'],
      support: ['家族の来日準備', '学校・保育情報', '生活立ち上げ', 'クリニック同行', '買い物・地域案内'],
      process: ['家族構成を概要レベルで共有', '時期と優先ニーズを確認', '情報提供または同行を調整', '到着後にフォロー'],
      pricing: '家族支援は内容によりKVHまたは個別見積で対応します。',
      notes: ['本MVPでは不要な家族の機微情報を収集しません。必要な情報は後日確認します。'],
    },
    kvh: {
      audience: ['訪問教員', '研究者', '同伴家族', '英語対応の対面支援を必要とする部局'],
      support: ['空港ミートアシスト', '市役所同行', '銀行・携帯ショップ同行', '住居入居支援', '買い物・生活立ち上げ', '病院・クリニック同行', '京都ミニツアー', 'その他地域支援'],
      process: ['希望日時と内容を送信', 'Creotechが可否と範囲を確認', '見積と実費の考え方を案内', '確認後にKVH支援を手配'],
      pricing: '最低4時間：40,000円＋消費税。追加1時間：10,000円＋消費税。交通費、入場料、食事、その他実費は別途です。',
      notes: ['KVHは通訳、地域案内、対面支援を提供します。', '法律・医療・金融助言、入管承認保証、専用車送迎は提供しません。'],
    },
    'coe-speedvisa': {
      audience: ['COE案内が必要な申請者', '招聘準備を行う受入部局', '大学手続きを調整する事務担当者'],
      support: ['本サイトでの初期受付', '関連部署による在留資格・手続き確認', '必要に応じたSpeedVisaへの案内', 'COE案内後の住居・到着・通信・保険・家族・KVH支援'],
      process: ['申請者または受入部局がCreotechへ連絡', 'Creotechが初期依頼を受領', '関連大学部署が在留資格と手続きを確認', '必要に応じてSpeedVisaへ案内', '申請者がSpeedVisaに必要情報を入力', '適切な大学ワークフローでCOE手続きが進行'],
      pricing: 'COE/ビザ関連費用は指定手続きにより異なります。関連する到着・生活支援は別途見積の場合があります。',
      notes: ['COE承認や査証発給を保証しません。', 'COE/査証手続きは関係当局の判断に依存します。', '機微書類は本MVPではなく指定の安全な手続きで提出してください。'],
    },
    'affiliated-school': {
      audience: ['附属校案件', '高校生案件', '初期相談を希望する受入校'],
      support: ['個別相談による初期確認', '保護者・受入校体制の確認', '将来の支援パッケージ検討'],
      process: ['初期相談を送信', '本MVPの範囲に合うか確認', '保護者・学校情報を後日確認する場合あり', '可能な場合は個別の進め方を提案'],
      pricing: '範囲確認後に見積が必要です。',
      notes: ['年齢、保護者、受入校、滞在先、支援体制により必要手続きが異なるため、過度な約束はしません。'],
    },
  },
} as const;
