import { DayPlan } from '../types';

export const TRIP_DATA: DayPlan[] = [
  {
    day: 1,
    date: '6/5 (五)',
    city: '長崎',
    summary: { travelTime: '3.5hr', spotCount: 4 },
    spots: [
      {
        id: 'd1-1',
        name: '熊本機場取車',
        time: '12:00',
        description: '開始五天四夜的北九州自駕之旅！導遊叮嚀：取車時記得檢查油表是否全滿。',
        category: 'transport',
        tips: ['檢查車況', '確認GPS'],
        googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Kumamoto+Airport',
      },
      {
        id: 'd1-2',
        name: '熊本港 ↔ 島原港',
        time: '12:20-13:10',
        description: '連人帶車搭船到長崎 島原港。可搭13:35九商フェリー或14:50熊本フェリー。船上販賣部的「海鷗麵包」很有趣，可以餵海鷗喔！',
        category: 'transport',
        tips: ['連人帶車搭船', '可以買麵包餵海鷗'],
        googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Kumamoto+Port',
      },
      {
        id: 'd1-3',
        name: '哥拉巴園 / 大浦天主堂',
        time: '下午',
        description: '充滿異國風情的洋房與歷史建築。導遊推薦：晚餐必吃「長崎強棒麵(Champon)」或「皿烏龍(Sara Udon)」，口感層次豐富！',
        category: 'scenery',
        tips: ['歷史建築巡禮', '必吃長崎強棒麵'],
        googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Glover+Garden',
      },
      {
        id: 'd1-4',
        name: '稻佐山展望台夜景',
        time: '晚上',
        description: '世界新三大夜景，閃閃發光的珍珠。導遊推薦：若時間充裕，可以先去吃長崎特色的「土耳其飯(Turkish Rice)」。',
        category: 'scenery',
        tips: ['世界新三大夜景'],
        googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Inasayama+Observatory',
      },
    ],
    outfitAdvice: '山區與海邊稍涼，建議攜帶防風外套。',
    weather: { 
      condition: '晴', 
      temp: { max: 24, min: 18 }, 
      rainProb: '10%',
      hourly: [
        { hour: '09:00', temp: 19, condition: '晴' },
        { hour: '12:00', temp: 24, condition: '晴' },
        { hour: '15:00', temp: 23, condition: '晴' },
        { hour: '18:00', temp: 21, condition: '陰' },
        { hour: '21:00', temp: 19, condition: '陰' }
      ]
    },
    souvenirs: [
      { name: '長崎蛋糕 (福砂屋)', image: 'https://images.unsplash.com/photo-1544022613-e87ad039d7b4?w=400', location: '長崎駅前', googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Fukusaya+Nagasaki' },
      { name: '長崎玻璃手工藝 (Bidro)', image: 'https://api.dicebear.com/7.x/initials/svg?seed=Glass', location: '哥拉巴園周邊', googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Nagasaki+Glass' },
    ]
  },
  {
    day: 2,
    date: '6/6 (六)',
    city: '佐賀 / 福岡',
    summary: { travelTime: '5hr', spotCount: 6 },
    spots: [
      {
        id: 'd2-1',
        name: '長崎原爆資料館 / 和平公園',
        time: '08:30-09:30',
        description: '歷史的回顧與對和平的祈願。導遊碎碎念：這裡一定要保持安靜以示尊重喔。',
        category: 'scenery',
        googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Nagasaki+Atomic+Bomb+Museum',
      },
      {
        id: 'd2-2',
        name: '大魚神社海中鳥居 (太良町)',
        time: '11:00-11:30',
        description: '大魚神社海中鳥居，導遊私心：太良町的「竹崎蟹」非常肥美，如果看到餐廳可以試試！',
        category: 'scenery',
        googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Ooyu+Shrine+Torii',
      },
      {
        id: 'd2-3',
        name: '祐德稻荷神社',
        time: '11:50-12:30',
        description: '日本三大稻荷之一，宏偉的建築。導遊推薦：一定要走上奧之院，雖然累但視野很好！',
        category: 'scenery',
        googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Yutoku+Inari+Shrine',
      },
      {
        id: 'd2-4',
        name: '佐賀美食午餐',
        time: '12:30-15:00',
        description: '佐賀牛、湯豆腐、唐津漢堡。導遊推薦：佐賀牛的油脂分布均勻，入口即化，是極品！',
        category: 'food',
        googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Saga+Beef+Restaurant',
      },
      {
        id: 'd2-5',
        name: '濱野浦梯田',
        time: '15:00-15:30',
        description: '壯觀的梯田景觀。這裡是「戀人之聖地」，非常適合拍照。',
        category: 'scenery',
        googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Hamanoura+Terraced+Rice+Fields',
      },
      {
        id: 'd2-6',
        name: '福岡櫻井神社 / 櫻井二見浦 夫婦岩',
        time: '15:30-17:00',
        description: '白色海上鳥居，絕美夕陽推薦。住宿福岡旅路。',
        category: 'scenery',
        googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Sakurai+二見浦',
      },
    ],
    outfitAdvice: '今日移動較多且有海邊行程，層次穿搭為佳。',
    weather: { 
      condition: '雨', 
      temp: { max: 21, min: 18 }, 
      rainProb: '80%',
      hourly: [
        { hour: '09:00', temp: 18, condition: '陰' },
        { hour: '12:00', temp: 20, condition: '雨' },
        { hour: '15:00', temp: 21, condition: '雨' },
        { hour: '18:00', temp: 19, condition: '雨' },
        { hour: '21:00', temp: 18, condition: '陰' }
      ]
    },
    souvenirs: [
      { name: '佐賀海苔', image: 'https://images.unsplash.com/photo-1627485750541-575108ef7365?w=400', location: '佐賀物產館', googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Saga+Nori' },
      { name: 'Menbei 明太子仙貝', image: 'https://api.dicebear.com/7.x/initials/svg?seed=Menbei', location: '福岡超市/機場', googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Menbei+Fukuoka' },
    ]
  },
  {
    day: 3,
    date: '6/7 (日)',
    city: '福岡市',
    summary: { travelTime: '3.5hr', spotCount: 5 },
    spots: [
      {
        id: 'd3-1',
        name: '柳川觀光船',
        time: '10:00-11:00',
        description: '水都巡禮，體驗特色的川下り。導遊提醒：戴上斗笠更有氛圍喔！',
        category: 'activity',
        googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Yanagawa+River+Cruise',
      },
      {
        id: 'd3-2',
        name: '柳川散策 / 蒸籠鰻魚飯午餐',
        time: '11:00-13:30',
        description: '享用名物鰻魚飯。導遊推薦：鰻魚沾滿秘製醬汁蒸過後，連飯都非常有味道！',
        category: 'food',
        googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Yanagawa+Unagi',
      },
      {
        id: 'd3-3',
        name: '太宰府天滿宮',
        time: '15:10-16:00',
        description: '祭祀學問之神菅原道真公的總本宮。導遊推薦：參道上的「梅枝餅」一定要買現烤熱呼呼的吃。',
        category: 'scenery',
        googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Dazaifu+Tenmangu',
      },
      {
        id: 'd3-4',
        name: '櫛田神社',
        time: '17:00-17:50',
        description: '博多的守護神。導遊推薦：這裡的大山笠非常壯觀，別忘了跟它合照。',
        category: 'scenery',
        googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Kushida+Shrine',
      },
      {
        id: 'd3-5',
        name: '中洲-天神屋台 / 逛街採購',
        time: '晚上',
        description: '博多美食大集合！導遊推薦：除了拉麵，一定要試試「牛雜鍋(Motsunabe)」或「水炊雞(Mizutaki)」。',
        category: 'food',
        googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Nakasu+Yatai',
      },
    ],
    outfitAdvice: '市區活動為主，適合輕便服飾與走路鞋。',
    weather: { 
      condition: '晴', 
      temp: { max: 27, min: 20 }, 
      rainProb: '0%',
      hourly: [
        { hour: '09:00', temp: 21, condition: '晴' },
        { hour: '12:00', temp: 26, condition: '晴' },
        { hour: '15:00', temp: 27, condition: '晴' },
        { hour: '18:00', temp: 24, condition: '晴' },
        { hour: '21:00', temp: 22, condition: '晴' }
      ]
    },
    souvenirs: [
      { name: '博多通りもん (通饅頭)', image: 'https://api.dicebear.com/7.x/initials/svg?seed=Snack', location: '博多駅', googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Hakata+Torimon' },
      { name: '八女抹茶', image: 'https://api.dicebear.com/7.x/initials/svg?seed=Matcha', location: '柳川 / 太宰府', googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Matcha+Dazaifu' },
      { name: '奴奴雞 (夢夢雞)', image: 'https://api.dicebear.com/7.x/initials/svg?seed=Chicken', location: '博多駅', googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Yumeyume-dori+Hakata' },
      { name: '如水庵草莓大福', image: 'https://api.dicebear.com/7.x/initials/svg?seed=Daifuku', location: '博多駅 / 天神', googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Josuian+Hakata' },
      { name: '太宰府布丁', image: 'https://api.dicebear.com/7.x/initials/svg?seed=Pudding', location: '太宰府參道', googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Dazaifu+Pudding' },
    ]
  },
  {
    day: 4,
    date: '6/8 (一)',
    city: '大分 / 由布院',
    summary: { travelTime: '3.5hr', spotCount: 3 },
    spots: [
      {
        id: 'd4-1',
        name: '別府地獄 (海地獄/血池)',
        time: '10:30-12:00',
        description: '別府溫泉奇觀。導遊推薦：除了看地獄，也一定要體驗「地獄蒸工法」料理，利用地熱蒸熟的食物非常清甜。',
        category: 'scenery',
        googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Umi+Jigoku+Beppu',
      },
      {
        id: 'd4-2',
        name: '由布院散策',
        time: '14:20-17:00',
        description: '導遊推薦：由布院真的很美，「湯之坪街道」有很多文青小店。晚餐推薦試試大分名物「雞肉天婦羅(Toriten)」。',
        category: 'activity',
        tips: ['金鱗湖神鳥居', '湯之坪街道逛街'],
        googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Yufuin+Station',
      },
      {
        id: 'd4-3',
        name: '由布釜飯 / 甜點名店',
        time: '晚上',
        description: '由布釜飯（豐後牛與地雞）。導遊推薦：B-speak蛋糕捲通常很快就賣完，如果要買最好早一點去領取號碼牌。',
        category: 'food',
        googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Yufuin+Kamameshi',
      },
    ],
    outfitAdvice: '山區早晚溫差大，建議帶一件擋風外套。',
    weather: { 
      condition: '晴', 
      temp: { max: 22, min: 15 }, 
      rainProb: '10%',
      hourly: [
        { hour: '09:00', temp: 16, condition: '晴' },
        { hour: '12:00', temp: 21, condition: '晴' },
        { hour: '15:00', temp: 22, condition: '晴' },
        { hour: '18:00', temp: 19, condition: '陰' },
        { hour: '21:00', temp: 17, condition: '陰' }
      ]
    },
    souvenirs: [
      { name: '大分柚子胡椒', image: 'https://api.dicebear.com/7.x/initials/svg?seed=Pepper', location: '別府 / 由布院', googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Yuzu+Kosho+Oita' },
      { name: '治一郎：布丁/年輪蛋糕', image: 'https://api.dicebear.com/7.x/initials/svg?seed=Cake', location: '各百貨公司', googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Jiichiro+Fukuoka' },
      { name: 'まち吉豆皮麻糬', image: 'https://api.dicebear.com/7.x/initials/svg?seed=Mochi', location: '由布院街道', googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Machikichi+Yufuin' },
      { name: '明太子薯條餅乾', image: 'https://api.dicebear.com/7.x/initials/svg?seed=Fries', location: '博多/由布院', googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Calbee+Plus+Fukuoka' },
    ]
  },
  {
    day: 5,
    date: '6/9 (二)',
    city: '熊本市',
    summary: { travelTime: '3.5hr', spotCount: 4 },
    spots: [
      {
        id: 'd5-1',
        name: '阿蘇中岳火山口 + 草千里',
        time: '10:20-11:30',
        description: '親臨火山口震撼景觀。導遊推薦：阿蘇地區一定要吃「赤牛(Akaushi)」蓋飯，牛肉軟嫩多汁！',
        category: 'scenery',
        googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Mount+Aso+Crater',
      },
      {
        id: 'd5-2',
        name: '櫻之馬場 城彩苑 / 熊本城',
        time: '下午',
        description: '導遊推薦：必吃「辛子蓮藕(Karashi Renkon)」，蓮藕孔塞滿味噌和黃芥末，非常刺激味蕾。還有高田蒲鉾的炸竹輪唷！',
        category: 'scenery',
        googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Kumamoto+Castle',
      },
      {
        id: 'd5-3',
        name: '熊本熊廣場 / 上下通商店街',
        time: '下午-晚上',
        description: '最後衝刺！導遊推薦：晚餐可以嘗試「生馬肉刺身(Basashi)」，這是熊本最有名的名產。',
        category: 'shopping',
        googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Kumamon+Square',
      },
    ],
    outfitAdvice: '阿蘇地區溫度較低且風大，穿著需保暖與防風。',
    weather: { 
      condition: '晴', 
      temp: { max: 26, min: 18 }, 
      rainProb: '10%',
      hourly: [
        { hour: '09:00', temp: 19, condition: '晴' },
        { hour: '12:00', temp: 25, condition: '晴' },
        { hour: '15:00', temp: 26, condition: '晴' },
        { hour: '18:00', temp: 23, condition: '晴' },
        { hour: '21:00', temp: 20, condition: '晴' }
      ]
    },
    souvenirs: [
      { name: '熊本即食糰子 (Ikinari Dango)', image: 'https://api.dicebear.com/7.x/initials/svg?seed=Dango', location: '城彩苑', googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Ikinari+Dango' },
      { name: 'AMANBERRY 草莓餅乾', image: 'https://api.dicebear.com/7.x/initials/svg?seed=Strawberry', location: '博多駅', googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=AMANBERRY+Hakata' },
      { name: 'YOLU 夜間修護洗護系列', image: 'https://api.dicebear.com/7.x/initials/svg?seed=YOLU', location: '各藥妝店', googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Matsumoto+Kiyoshi+Hakata' },
      { name: '明太子麵包 (Full full / pain stock)', image: 'https://api.dicebear.com/7.x/initials/svg?seed=Bread', location: '天神/博多', googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Full+Full+Tenjin' },
    ]
  },
  {
    day: 6,
    date: '6/10 (三)',
    city: '熊本機場',
    summary: { travelTime: '1hr', spotCount: 2 },
    spots: [
      {
        id: 'd6-1',
        name: '熊本巴士站 (利木津巴士)',
        time: '08:00',
        description: '搭乘利木津巴士前往機場。',
        category: 'transport',
        googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Kumamoto+Sakuramachi+Bus+Terminal',
      },
      {
        id: 'd6-2',
        name: '熊本空港',
        time: '08:30-09:30',
        description: '辦理登機手續並進行最後採購。',
        category: 'shopping',
        googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Kumamoto+Airport',
      }
    ],
    outfitAdvice: '搭機日穿著舒適寬鬆。',
    weather: { 
      condition: '晴', 
      temp: { max: 26, min: 19 }, 
      rainProb: '10%',
      hourly: [
         { hour: '06:00', temp: 19, condition: '晴' },
         { hour: '09:00', temp: 22, condition: '晴' },
         { hour: '12:00', temp: 26, condition: '晴' },
         { hour: '15:00', temp: 27, condition: '晴' },
         { hour: '18:00', temp: 24, condition: '晴' }
      ]
    },
    souvenirs: [
      { name: '陣太鼓', image: 'https://api.dicebear.com/7.x/initials/svg?seed=Jindaiko', location: '熊本機場' },
      { name: '武者返', image: 'https://api.dicebear.com/7.x/initials/svg?seed=Mushagaeshi', location: '熊本機場' }
    ]
  },
];
