const stateDistricts = {
    "uttar pradesh": [
        { hindi: 'सोनभद्र', english: 'sonbhadra' },
        { hindi: 'चंदौली', english: 'chandauli' },
        { hindi: 'मिर्जापुर', english: 'mirzapur' },
        { hindi: 'वाराणसी', english: 'varanasi' },
        { hindi: 'गाजीपुर', english: 'gajipur' },
        { hindi: 'शाहजहांपुर', english: 'shahjhapur' },
        { hindi: 'प्रयागराज', english: 'prayagraj' }
    ],
    "maharashtra": [
        { hindi: 'मुंबई', english: 'mumbai' },
        { hindi: 'पुणे', english: 'pune' },
        { hindi: 'नागपुर', english: 'nagpur' },
        { hindi: 'नाशिक', english: 'nashik' },
        { hindi: 'ठाणे', english: 'thane' },
        { hindi: 'औरंगाबाद', english: 'aurangabad' },
        { hindi: 'सोलापुर', english: 'solapur' }
    ],
    "gujarat": [
        { hindi: 'अहमदाबाद', english: 'ahmedabad' },
        { hindi: 'सूरत', english: 'surat' },
        { hindi: 'वडोदरा', english: 'vadodara' },
        { hindi: 'राजकोट', english: 'rajkot' },
        { hindi: 'भावनगर', english: 'bhavnagar' },
        { hindi: 'जामनगर', english: 'jamnagar' },
        { hindi: 'गांधीनगर', english: 'gandhinagar' }
    ],
    "rajasthan": [
        { hindi: 'जयपुर', english: 'jaipur' },
        { hindi: 'जोधपुर', english: 'jodhpur' },
        { hindi: 'कोटा', english: 'kota' },
        { hindi: 'उदयपुर', english: 'udaipur' },
        { hindi: 'बीकानेर', english: 'bikaner' },
        { hindi: 'अजमेर', english: 'ajmer' },
        { hindi: 'अलवर', english: 'alwar' }
    ],
    "karnataka": [
        { hindi: 'बेंगलुरु', english: 'bengaluru' },
        { hindi: 'मैसूर', english: 'mysuru' },
        { hindi: 'हुबली-धारवाड़', english: 'hubli-dharwad' },
        { hindi: 'मंगलुरु', english: 'mangaluru' },
        { hindi: 'बेलगावी', english: 'belagavi' },
        { hindi: 'कलबुर्गी', english: 'kalaburagi' },
        { hindi: 'शिवमोग्गा', english: 'shivamogga' }
    ],
    "delhi": [
        { hindi: 'नई दिल्ली', english: 'new delhi' },
        { hindi: 'उत्तर पूर्वी दिल्ली', english: 'north east delhi' },
        { hindi: 'उत्तर पश्चिमी दिल्ली', english: 'north west delhi' },
        { hindi: 'पूर्वी दिल्ली', english: 'east delhi' },
        { hindi: 'दक्षिण पूर्वी दिल्ली', english: 'south east delhi' },
        { hindi: 'दक्षिण पश्चिमी दिल्ली', english: 'south west delhi' },
        { hindi: 'पश्चिमी दिल्ली', english: 'west delhi' }
    ],
    "bihar": [
        { hindi: 'पटना', english: 'patna' },
        { hindi: 'गया', english: 'gaya' },
        { hindi: 'मुजफ्फरपुर', english: 'muzaffarpur' },
        { hindi: 'भागलपुर', english: 'bhagalpur' },
        { hindi: 'दरभंगा', english: 'darbhanga' },
        { hindi: 'आरा', english: 'ara' },
        { hindi: 'बक्सर', english: 'buxar' }
    ],
    "goa": [
        { hindi: 'उत्तर गोवा', english: 'north goa' },
        { hindi: 'दक्षिण गोवा', english: 'south goa' }
    ]
};



const engToHindi = {
    'state': 'राज्य',
    'uttar pradesh': 'उत्तर प्रदेश',
    'sonbhadra': 'सोनभद्र',
    'chandauli': 'चंदौली',
    'mirzapur': 'मिर्जापुर',
    'varanasi': 'वाराणसी',
    'gajipur': 'गाजीपुर',
    'shahjhapur': 'शाहजहांपुर',
    'prayagraj': 'प्रयागराज',

    'maharashtra': 'महाराष्ट्र',
    'mumbai': 'मुंबई',
    'pune': 'पुणे',
    'nagpur': 'नागपुर',
    'nashik': 'नाशिक',
    'thane': 'ठाणे',
    'aurangabad': 'औरंगाबाद',
    'solapur': 'सोलापुर',

    'gujarat': 'गुजरात',
    'ahmedabad': 'अहमदाबाद',
    'surat': 'सूरत',
    'vadodara': 'वडोदरा',
    'rajkot': 'राजकोट',
    'bhavnagar': 'भावनगर',
    'jamnagar': 'जामनगर',
    'gandhinagar': 'गांधीनगर',

    'rajasthan': 'राजस्थान',
    'jaipur': 'जयपुर',
    'jodhpur': 'जोधपुर',
    'kota': 'कोटा',
    'udaipur': 'उदयपुर',
    'bikaner': 'बीकानेर',
    'ajmer': 'अजमेर',
    'alwar': 'अलवर',

    'karnataka': 'कर्नाटक',
    'bengaluru': 'बेंगलुरु',
    'mysuru': 'मैसूर',
    'hubli-dharwad': 'हुबली-धारवाड़',
    'mangaluru': 'मंगलुरु',
    'belagavi': 'बेलगावी',
    'kalaburagi': 'कलबुर्गी',
    'shivamogga': 'शिवमोग्गा',

    'delhi': 'दिल्ली',
    'new delhi': 'नई दिल्ली',
    'north east delhi': 'उत्तर पूर्वी दिल्ली',
    'north west delhi': 'उत्तर पश्चिमी दिल्ली',
    'east delhi': 'पूर्वी दिल्ली',
    'south east delhi': 'दक्षिण पूर्वी दिल्ली',
    'south west delhi': 'दक्षिण पश्चिमी दिल्ली',
    'west delhi': 'पश्चिमी दिल्ली',

    'bihar': 'बिहार',
    'patna': 'पटना',
    'gaya': 'गया',
    'muzaffarpur': 'मुजफ्फरपुर',
    'bhagalpur': 'भागलपुर',
    'darbhanga': 'दरभंगा',
    'ara': 'आरा',
    'buxar': 'बक्सर',

    'goa': 'गोवा',
    'north goa': 'उत्तर गोवा',
    'south goa': 'दक्षिण गोवा'
};


export const states = [
    { hindi: 'आंध्र प्रदेश', english: 'andhra pradesh' },
    { hindi: 'अरुणाचल प्रदेश', english: 'arunachal pradesh' },
    { hindi: 'असम', english: 'assam' },
    { hindi: 'बिहार', english: 'bihar' },
    { hindi: 'छत्तीसगढ़', english: 'chhattisgarh' },
    { hindi: 'गोवा', english: 'goa' },
    { hindi: 'गुजरात', english: 'gujarat' },
    { hindi: 'हरियाणा', english: 'haryana' },
    { hindi: 'हिमाचल प्रदेश', english: 'himachal pradesh' },
    { hindi: 'झारखंड', english: 'jharkhand' },
    { hindi: 'कर्नाटक', english: 'karnataka' },
    { hindi: 'केरल', english: 'kerala' },
    { hindi: 'मध्य प्रदेश', english: 'madhya pradesh' },
    { hindi: 'महाराष्ट्र', english: 'maharashtra' },
    { hindi: 'मणिपुर', english: 'manipur' },
    { hindi: 'मेघालय', english: 'meghalaya' },
    { hindi: 'मिजोरम', english: 'mizoram' },
    { hindi: 'नगालैंड', english: 'nagaland' },
    { hindi: 'ओडिशा', english: 'odisha' },
    { hindi: 'पंजाब', english: 'punjab' },
    { hindi: 'राजस्थान', english: 'rajasthan' },
    { hindi: 'सिक्किम', english: 'sikkim' },
    { hindi: 'तमिलनाडु', english: 'tamil nadu' },
    { hindi: 'तेलंगाना', english: 'telangana' },
    { hindi: 'त्रिपुरा', english: 'tripura' },
    { hindi: 'उत्तर प्रदेश', english: 'uttar pradesh' },
    { hindi: 'उत्तराखंड', english: 'uttarakhand' },
    { hindi: 'पश्चिम बंगाल', english: 'west bengal' },
    { hindi: 'अंडमान और निकोबार द्वीप समूह', english: 'andaman and nicobar islands' },
    { hindi: 'चंडीगढ़', english: 'chandigarh' },
    { hindi: 'दादरा और नगर हवेली और दमन और दीव', english: 'dadra and nagar haveli and daman and diu' },
    { hindi: 'दिल्ली', english: 'delhi' },
    { hindi: 'लक्षद्वीप', english: 'lakshadweep' },
    { hindi: 'पुडुचेरी', english: 'puducherry' }
];


export const findHindi = (eng) => {
    return engToHindi[eng] || eng;
}
export const findDistrict = (state) => {
    return stateDistricts[state] || stateDistricts['uttar pradesh'];
}