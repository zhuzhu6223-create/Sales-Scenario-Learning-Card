/**
 * Sales Scenario Learning Cards - Data
 * 6 scenarios with placeholder content — replace with real content from PPTs
 */

const SCENARIOS = [
  {
    id: 1,
    name: "智慧城市安防",
    shortName: "城市安防",
    icon: "🏙️",
    color: "#2563eb",
    colorLight: "#dbeafe",
    theme: "blue",
    summary: "为城市公安构建全域感知、智能研判的立体化安防体系",
    modules: {
      tagline: "卖的是让城市管理者「看得见、管得住、查得到」的智慧安防大脑，帮公安提升破案率、降低安保人力成本。",
      targetCustomers: {
        unitTypes: ["市/区公安局", "综治办", "政法委", "城管局", "轨道交通公司"],
        roles: ["信息化处长", "治安支队长", "指挥中心主任", "科技信通处长"],
        decisionMakers: ["分管副局长", "局长", "分管副市长"],
        users: ["派出所民警", "指挥中心坐席", "网格员", "安保人员"],
        influencers: ["省厅科技信通部门", "市政府数字化办公室", "系统集成商/代理商", "咨询规划院"]
      },
      businessConcerns: [
        "社会治安形势压力大，案件侦破效率低，资源不够用",
        "存量摄像头底数不清，图像质量差、联网率低、不能用",
        "数据烟囱多，多个平台不联通，人工比对效率极低",
        "人脸/车辆布控预警能力弱，高危人员发现不及时",
        "重大活动、节假日安保压力大，临时调兵成本高",
        "等保合规要求高，网络安全、数据安全压力不断增大",
        "省厅/部级系统对接要求，须满足上级平台接入标准"
      ],
      recommendedSolutions: {
        platform: ["视频云平台（统一接入管理）", "公安大数据研判平台", "智能安防指挥系统"],
        equipment: ["高清卡口摄像机", "人脸抓拍一体机", "全景鹰眼球机", "夜视补光设备"],
        communication: ["专网/政务外网接入", "4G/5G无线图传", "光纤传输组网"],
        perception: ["人脸识别算法", "车辆特征识别", "人群密度分析", "异常行为检测"],
        services: ["平台集成服务", "运维保障服务（7×24）", "人员培训服务", "数据治理服务"]
      },
      firstVisitScript: "王局，我们最近在隔壁XX区做了一个项目，他们原来有3000多路摄像头，但真正能用于破案的不到30%。我们帮他们做了一次全域体检和智能化改造，现在破案率提升了40%，重大节点布控时间从8小时压缩到2小时。\n\n今天来，主要是想先请教一下您这边目前在社会面管控上，最大的挑战是什么？我们不急着介绍产品，先听听您的情况，看看有没有可以参考的思路。",
      keyQuestions: [
        "您现在辖区内大概有多少路在用的摄像头？覆盖率和联网率大概是多少？",
        "目前图像真正能用于研判、破案的比例大概有多少？老旧设备的情况怎么样？",
        "现在人脸/车辆布控是怎么操作的？从发现预警到响应，大概要多长时间？",
        "现在用的是哪家平台？和省厅系统是怎么对接的？有没有对接问题？",
        "今年在信息化这块有没有专项预算？大概是什么量级？有没有已经立项的项目？",
        "重大活动安保时，目前最大的压力点在哪里？人力还是技术手段不足？",
        "如果我们能帮您解决一个最痛的问题，您最希望先解决哪个？"
      ],
      pilotSuggestions: [
        "建议从一个派出所辖区做试点，500-800路摄像头规模，投入可控、见效快",
        "从「存量摄像头质量体检 + 智能化改造」切入，利旧不换旧，预算门槛低",
        "或从「人脸布控预警」单点能力切入，有演示效果，便于向上汇报成效"
      ],
      boundaries: {
        technical: [
          "不承诺100%识别率，标准场景（正面、光线充足）下识别率需明确说明区间",
          "不承诺与所有第三方系统无缝对接，需评估接口协议，周期另议"
        ],
        delivery: [
          "项目建设周期不低于3个月，不接受不合理工期要求",
          "施工协调、场地开通依赖甲方配合，不单独对完工时间做承诺"
        ],
        pricing: [
          "报价有效期60天，不承诺长期锁价",
          "不接受超出正常范围的商务折扣要求，需走正规审批"
        ],
        policy: [
          "数据主权归公安机关，平台部署方式须在合同中明确",
          "不承诺替代省厅已定标的核心平台，只做补充集成"
        ]
      }
    }
  },

  {
    id: 2,
    name: "智慧交通管控",
    shortName: "智慧交通",
    icon: "🚦",
    color: "#0d9488",
    colorLight: "#ccfbf1",
    theme: "teal",
    summary: "为城市交管部门建设信号优化、违规抓拍、交通大脑一体化体系",
    modules: {
      tagline: "卖的是让交管部门「通得快、管得严、数据活」的城市交通大脑，降低拥堵指数、提升违规查处效率。",
      targetCustomers: {
        unitTypes: ["市交管局/交警支队", "市政府城管委", "高速公路管理局", "交通运输局"],
        roles: ["科技处长", "指挥中心主任", "秩序大队长", "信息化科长"],
        decisionMakers: ["分管副局长", "局长", "市政府分管副市长"],
        users: ["交警执勤人员", "指挥中心调度员", "违规处理窗口人员"],
        influencers: ["省交管局科技处", "设计院/规划院", "集成商", "运营商"]
      },
      businessConcerns: [
        "早晚高峰拥堵严重，信号配时落后，无法动态调优",
        "违规抓拍设备老旧，漏拍率高，处罚证据不足",
        "数据分散在多个系统，无法形成城市交通全局视图",
        "事故多发路段难预判，应急响应慢",
        "营运车辆监管盲区多，超速超载难以实时掌握",
        "公众对拥堵不满，需要可量化的改善成果向市政府汇报"
      ],
      recommendedSolutions: {
        platform: ["交通大脑平台（数据融合+研判）", "信号控制云平台", "违法行为综合管理系统"],
        equipment: ["一体化智能卡口", "电子警察抓拍仪", "雷达+视频融合感知设备", "可变情报板"],
        communication: ["路侧通信单元（RSU）", "专网/光纤传输", "4G/5G数据回传"],
        perception: ["车牌识别算法", "多目标跟踪", "拥堵指数实时计算", "违规行为AI识别"],
        services: ["信号配时优化服务", "系统集成调试", "运维保障", "数据分析报告服务"]
      },
      firstVisitScript: "李处，我们在XX市做了一个信号优化项目，上线3个月后，主干道平均通行速度提升了18%，早高峰排队长度减少了25%。他们现在每季度给市政府交一份「拥堵指数改善报告」，市领导非常满意。\n\n今天想请教一下，您这边现在对拥堵问题，或者违规管控，最头疼的是哪个环节？",
      keyQuestions: [
        "全市现在有多少个路口？信号控制系统是哪个年代建的？还能远程控制吗？",
        "现在拥堵最严重的路段在哪里？有没有做过信号优化？效果怎么样？",
        "违规抓拍设备的联网率和完好率大概是多少？每年处理的违规案件量级？",
        "现在交通数据归口在哪里管？和公安、城管的数据有没有打通？",
        "有没有已经在建或者立项的「交通大脑」或「信号优化」项目？",
        "今年专项预算大概是什么量级？是省里下拨还是市级财政？",
        "上级部门有没有对「拥堵指数」或「交通文明」有量化考核指标？"
      ],
      pilotSuggestions: [
        "建议选取2-3条主干道交叉口做信号优化试点，4-6周见效，数据对比明显",
        "从「违规抓拍设备体检+算法升级」切入，利旧改造，快速出成效",
        "或先做「交通数据融合」小范围PoC，打通2-3个系统数据，验证效果"
      ],
      boundaries: {
        technical: [
          "信号优化效果受路网结构、驾驶习惯等影响，不承诺具体拥堵降低百分比",
          "车牌识别率受天气、车牌污损影响，需说明适用条件"
        ],
        delivery: [
          "信号系统改造须与交管部门充分协调调试期，不承诺一次性上线无问题",
          "设备安装须占用路面资源，施工协调周期需纳入整体计划"
        ],
        pricing: [
          "按路口、按算法能力分级报价，不做一刀切捆绑销售承诺",
          "运营服务费需单独报价，不包含在设备价格中"
        ],
        policy: [
          "违规证据采集须符合当地法院/交管认可的技术标准，提前确认",
          "不承诺替代已有采购的信号控制系统，只做上层平台或补充设备"
        ]
      }
    }
  },

  {
    id: 3,
    name: "智慧园区",
    shortName: "智慧园区",
    icon: "🏢",
    color: "#7c3aed",
    colorLight: "#ede9fe",
    theme: "purple",
    summary: "为企业/政府园区提供智能安防、通行管理、能耗管理一体化解决方案",
    modules: {
      tagline: "卖的是让园区管理者「人员可管、车辆可控、安全可视、能耗可降」的数字化园区运营平台。",
      targetCustomers: {
        unitTypes: ["大型企业总部园区", "产业园/经济开发区管委会", "政府机关大院", "医院/学校/科技园"],
        roles: ["行政总监", "安保部经理", "物业管理公司负责人", "IT部门经理"],
        decisionMakers: ["集团副总/CFO", "园区管委会主任", "后勤总务处长"],
        users: ["保安/安保人员", "行政人员", "访客管理人员", "停车场管理员"],
        influencers: ["物业管理公司", "工程建设单位", "房地产开发商", "IT系统集成商"]
      },
      businessConcerns: [
        "人员进出管理混乱，访客登记全靠手工，安全漏洞大",
        "停车位紧张，外来车辆无序进入，纠纷多",
        "多个安防系统各自独立，物业管理人员要看N个屏幕",
        "能耗居高不下，空调、照明浪费严重，无法精细化管控",
        "事故/盗窃发生后，取证困难，视频调取费时费力",
        "集团总部要统一管控多个园区，异地管理难度大"
      ],
      recommendedSolutions: {
        platform: ["园区综合管理平台（统一大屏）", "访客管理系统", "能耗管理系统"],
        equipment: ["人脸识别门禁一体机", "车牌识别道闸", "高清网络摄像机", "智能停车引导屏"],
        communication: ["局域网/WiFi6组网", "4G备份链路", "对讲/广播系统"],
        perception: ["人脸通行识别", "车辆进出管控", "周界入侵检测", "人员密度统计"],
        services: ["系统集成部署服务", "运维保障服务", "人员培训", "SaaS托管服务（可选）"]
      },
      firstVisitScript: "张总，我们最近帮XX集团的总部园区做了一个项目，他们之前人员进出全靠保安核验工牌，效率很低，还容易出纰漏。改造之后，刷脸通行，访客系统直接推到前台审核，整个安保人员减少了30%，同时安全性反而提高了。\n\n今天来，想先了解一下您这边园区管理上，目前最让您头疼的是哪个问题？",
      keyQuestions: [
        "园区目前大概多大面积？有几个出入口？日均进出人次和车次大概多少？",
        "现在的门禁、监控是什么品牌、什么年代的系统？有没有联网集中管理？",
        "访客管理现在怎么做的？手工登记还是有系统？有没有因此发生过安全事件？",
        "停车管理现在是什么方式？有没有反向寻车或车位引导需求？",
        "园区能耗这块，有没有做过分项计量？每年电费大概什么量级？",
        "集团有没有统一的安防/IT标准要求？还是各园区自主决定？",
        "这个项目是走采购预算还是资本支出？今年的预算节点是什么时候？"
      ],
      pilotSuggestions: [
        "建议从「人脸门禁改造」切入，选1个主出入口做试点，2-3周见效",
        "或从「访客管理系统」上线开始，纯软件方案，部署快、效果直观",
        "停车场改造也是快切点，业主自费意愿强，回本周期短"
      ],
      boundaries: {
        technical: [
          "人脸识别需要足够的光照条件，口罩/帽子遮挡场景需补充其他验证方式",
          "系统集成须与现有门禁/OA系统评估接口，不保证所有第三方系统可对接"
        ],
        delivery: [
          "施工须与园区正常运营协调，不承诺零影响施工",
          "旧设备拆除处置由甲方负责，不包含在合同范围内"
        ],
        pricing: [
          "SaaS服务按年订阅，不可与硬件一次性买断价格混同报价",
          "扩容增项需单独报价，不包含在初始合同价格中"
        ],
        policy: [
          "人脸数据采集须符合《个人信息保护法》要求，告知同意流程甲方负责",
          "不承诺系统上云公有云部署，默认私有化部署，公有云需另行评估"
        ]
      }
    }
  },

  {
    id: 4,
    name: "政务数字化",
    shortName: "政务数字化",
    icon: "🏛️",
    color: "#ea580c",
    colorLight: "#fed7aa",
    theme: "orange",
    summary: "为政府机关/政务大厅提供数字化运营、安全合规、视频会议一体化方案",
    modules: {
      tagline: "卖的是让政府机关「办事更高效、数据更合规、安全有保障」的数字政务基础设施。",
      targetCustomers: {
        unitTypes: ["市/区政务服务中心", "政府各委办局机关", "街道办/乡镇政府", "行政审批局"],
        roles: ["信息化办主任", "电子政务办负责人", "行政审批局局长", "数字化转型办公室"],
        decisionMakers: ["分管副市长/区长", "政府秘书长", "大数据局局长"],
        users: ["窗口工作人员", "行政审批办事员", "机关工作人员"],
        influencers: ["上级主管部门", "信息化评审专家", "软件集成商", "数字政务运营商"]
      },
      businessConcerns: [
        "群众办事等待时间长，排队叫号效率低，满意度不高",
        "政务数据分散，跨部门数据共享难，「一网通办」落地难",
        "等保2.0合规压力，网络安全和数据安全监管日趋严格",
        "视频会议、远程协作需求增加，现有设备老旧故障多",
        "机关内部信息化建设标准不统一，维护成本高",
        "数字化转型考核指标压力，上级要求提交量化成效数据"
      ],
      recommendedSolutions: {
        platform: ["政务综合管理平台", "排队叫号与服务评价系统", "政务大数据汇聚平台"],
        equipment: ["高清视频会议终端", "自助办事一体机", "电子显示导引屏", "人脸核验设备"],
        communication: ["政务专网接入", "视频会议专线", "无线办公网络"],
        perception: ["人脸身份核验", "电子证件识别", "等待人数统计"],
        services: ["系统集成实施", "等保测评配合服务", "运维保障（含驻场）", "培训服务"]
      },
      firstVisitScript: "陈主任，我们在XX区政务中心做了一套智慧大厅改造，上线后群众平均等待时间从28分钟降到了11分钟，当月满意度评分从82分提升到了96分。而且整套系统满足等保二级要求，审计没有发现任何问题。\n\n今天来，想先了解一下您这边政务大厅目前面临的主要挑战，是服务效率、安全合规还是数字化能力建设这几个方向？",
      keyQuestions: [
        "政务大厅每天业务量大概多少件？高峰时段等待时长是多少？有没有投诉记录？",
        "现在有没有排号叫号系统？是哪家厂商的、用了多少年了？",
        "等保评测的情况怎么样？现在是几级保护？有没有发现过安全问题？",
        "视频会议设备现在用的是什么？经常出故障吗？有没有与省厅/上级开会的需求？",
        "「一网通办」的推进情况怎么样？数据共享的瓶颈在哪里？",
        "今年有没有信息化专项经费？是财政预算还是专项资金？预算节点是几月份？",
        "上级对你们数字化转型有没有具体的量化考核要求？"
      ],
      pilotSuggestions: [
        "建议从「排号叫号+评价系统」改造开始，3-4周可上线，效果可量化汇报",
        "或从「等保合规整改」切入，合规驱动采购、决策阻力小",
        "视频会议设备更新也是好切入点，需求明确、预算易申请、决策链短"
      ],
      boundaries: {
        technical: [
          "数据共享平台需要各业务系统配合开放接口，不单独承诺互联互通",
          "人脸核验系统需接入公安部人口库，须走正规数据合作协议"
        ],
        delivery: [
          "政务系统上线须经过安全测试和压力测试，不接受跳过测试直接上线的要求",
          "驻场运维人员资质须满足涉密或等保相关要求，招募需提前规划"
        ],
        pricing: [
          "等保测评服务由第三方测评机构收费，不在我方合同内，需独立预算",
          "软件License费用按用户数或模块计费，需与硬件费用分开说明"
        ],
        policy: [
          "政务数据不得上传公有云，所有处理须在政务专网内完成",
          "不承诺数据共享效果，数据质量和共享授权由各委办局自行负责"
        ]
      }
    }
  },

  {
    id: 5,
    name: "应急指挥",
    shortName: "应急指挥",
    icon: "🚨",
    color: "#16a34a",
    colorLight: "#dcfce7",
    theme: "green",
    summary: "为应急管理部门构建多灾种感知、扁平化指挥、快速响应的综合应急平台",
    modules: {
      tagline: "卖的是让应急管理部门「险情早发现、指挥不断链、处置有记录」的综合应急指挥大脑。",
      targetCustomers: {
        unitTypes: ["市/区应急管理局", "消防救援支队/大队", "安全生产监督管理局", "防汛抗旱指挥部"],
        roles: ["应急管理局局长", "指挥中心主任", "信息化处长", "安全生产监察大队长"],
        decisionMakers: ["分管副市长", "市政府秘书长", "应急局党委书记"],
        users: ["应急指挥调度员", "消防救援人员", "安全监察人员"],
        influencers: ["省应急管理厅", "国家应急管理部", "消防总队", "安全生产专家"]
      },
      businessConcerns: [
        "各类灾害事故多发，但感知手段单一，险情发现不及时",
        "多部门联合响应时指挥不畅，信息孤岛导致协同效率低",
        "重点危化品企业、矿山等高危场所监管手段不足",
        "事故处置完毕后，复盘数据不完整，无法系统性改进",
        "上级考核要求「双重预防机制」落地，信息化支撑不足",
        "极端天气增多，防汛防台期间指挥体系压力极大"
      ],
      recommendedSolutions: {
        platform: ["综合应急指挥平台", "安全生产风险监测系统", "防汛防台专项指挥系统"],
        equipment: ["应急指挥车/移动指挥箱", "无人机图传系统", "卫星通信终端", "视频会议终端"],
        communication: ["应急通信专网", "卫星通信备份链路", "4G/5G公网补充", "对讲集群通信"],
        perception: ["危化品泄漏传感器", "视频AI危险行为识别", "气象融合感知", "地质灾害传感网"],
        services: ["应急预案数字化服务", "桌面推演/实战演练服务", "系统集成实施", "7×24运维保障"]
      },
      firstVisitScript: "赵局，去年XX市台风期间，他们用我们的应急指挥系统，实现了省市县三级视频指挥同步，前方救援画面实时回传，整个处置过程有完整的数字化记录。事后复盘，市领导非常满意，直接在省里做了经验分享。\n\n今天来，想了解一下您这边在应急响应的哪个环节，目前最大的短板是什么？是感知端、指挥端，还是协同端？",
      keyQuestions: [
        "您辖区内目前主要面临哪些灾害类型？历史上发生过哪些重大事故？",
        "现在的指挥调度是怎么运转的？跨部门协同时主要靠什么手段？",
        "危化品、矿山等重点场所，现在有没有远程监控手段？覆盖率多少？",
        "应急通信保障方面，断网断电情况下有没有备用通信手段？",
        "上级对「双重预防机制」或「应急能力建设」有没有具体的量化考核？",
        "今年应急信息化专项经费大概是多少？有没有已立项的项目？",
        "去年有没有发生过因为信息不畅或指挥失误导致损失扩大的案例？"
      ],
      pilotSuggestions: [
        "建议以「重大危化品企业远程监控」为切入点，监管驱动、见效快",
        "或从「应急指挥视频系统」改造开始，打通省市县三级视频链路",
        "防汛期前做「防汛专项指挥系统」PoC，时间节点驱动，决策快"
      ],
      boundaries: {
        technical: [
          "卫星通信依赖卫星资源协调，须提前确认资源可用性，不承诺随时可用",
          "AI危险行为识别在复杂场景下存在误报，需人工复核，不可全自动处置"
        ],
        delivery: [
          "应急系统须完成联调联试和模拟演练才可投入使用，不接受跳过测试上线",
          "移动指挥设备需要运营商支持开通专线，交期受运营商协调影响"
        ],
        pricing: [
          "卫星通信使用费按流量/时长计费，不包含在硬件价格内，需单独预算",
          "演练服务按次计费，培训和驻场服务费单独报价"
        ],
        policy: [
          "涉密应急预案数据不得在非涉密系统存储，须明确数据分类分级方案",
          "跨部门数据共享须经保密审查，不承诺可直接获取其他单位的原始数据"
        ]
      }
    }
  },

  {
    id: 6,
    name: "工业安全生产",
    shortName: "工业安全",
    icon: "🏭",
    color: "#e11d48",
    colorLight: "#ffe4e6",
    theme: "rose",
    summary: "为工厂/能源/化工企业提供作业人员安全、设备监测、危险区域管控解决方案",
    modules: {
      tagline: "卖的是让工厂管理者「人员行为可管、危险区域可控、事故隐患早发现」的工业安全生产智能平台。",
      targetCustomers: {
        unitTypes: ["大型制造工厂", "石油化工企业", "煤矿/非煤矿山", "电力/能源企业", "钢铁/冶金企业"],
        roles: ["安全总监/安全部经理", "生产厂长", "信息化部门负责人", "设备部经理"],
        decisionMakers: ["集团CEO/副总", "工厂厂长", "安委会主任"],
        users: ["安全管理员", "班组长", "现场作业人员", "监控室值班人员"],
        influencers: ["安全生产监察部门", "行业协会", "EPC总包商", "安全咨询机构"]
      },
      businessConcerns: [
        "生产事故时有发生，人员伤亡和财产损失导致巨大损失，还影响生产连续性",
        "危险区域人员违规进入，实时管控手段不足，只靠保安巡逻",
        "作业人员是否佩戴安全帽/安全带等防护用品，无法实时核查",
        "设备故障预警不足，往往等到停机才发现，影响生产计划",
        "生产数据和安全数据分离，无法关联分析，隐患排查靠人工",
        "安全监管部门检查压力大，电子化台账和证据留存不完整"
      ],
      recommendedSolutions: {
        platform: ["工业安全生产智能平台", "人员定位与行为分析系统", "设备状态监测系统"],
        equipment: ["防爆摄像机（适配危险场所）", "人员定位标签+基站", "AI安全帽/安全带识别摄像机", "气体泄漏传感器"],
        communication: ["工业级私有网络（可选5G专网）", "光纤环网", "防爆无线AP"],
        perception: ["安全帽/安全带AI识别", "危险区域入侵检测", "人员实时定位", "设备振动/温度异常检测"],
        services: ["风险评估与方案设计", "系统集成实施（含防爆认证）", "安全隐患排查服务", "运维保障"]
      },
      firstVisitScript: "孙总，我们最近在XX化工集团做了一个项目，他们之前每年平均发生3-4起安全事故，有人员受伤记录。上了我们的AI识别系统之后，去年全年零事故，安全帽佩戴率从68%提升到了99%以上。而且安监局来检查，所有影像记录都有，检查顺利通过。\n\n今天来，想了解一下您这边在安全生产方面，目前最担心的风险点是什么？",
      keyQuestions: [
        "工厂规模大概多大？有多少名现场作业人员？有没有危险化学品/受限空间作业？",
        "最近三年有没有发生过安全事故？主要是什么类型的事故？",
        "现在对危险区域的管控手段是什么？有没有人员定位系统？",
        "安全帽等防护用品的佩戴情况，现在是怎么检查的？频率多高？",
        "现有摄像头的数量和覆盖情况怎么样？有没有接入统一的安防平台？",
        "安监局对你们有哪些具体的整改要求或考核指标？",
        "今年安全生产信息化方面有没有专项预算？是集团统一采购还是工厂自主？"
      ],
      pilotSuggestions: [
        "建议从「安全帽AI识别」切入，选1-2条生产线试点，部署快、效果直观",
        "或从「危险区域电子围栏」开始，解决最高危风险点，决策驱动力强",
        "人员定位系统也是好切入点，大型工厂管理需求明确，特别是在高危区域"
      ],
      boundaries: {
        technical: [
          "防爆设备需要取得相应的防爆认证（Ex认证），须在方案阶段确认认证类型",
          "AI识别在强逆光、极端天气等场景下识别率下降，需要告知客户并补充措施"
        ],
        delivery: [
          "工厂施工须遵守动火作业、有限空间作业等安全规程，工期不得压缩安全程序",
          "设备安装须在工厂停产或维修窗口期进行，工期安排需与生产计划协调"
        ],
        pricing: [
          "防爆认证设备价格高于普通设备，不可用普通设备报价替代",
          "5G专网建设费用须独立报价，不含在安防设备价格内"
        ],
        policy: [
          "生产数据属于企业核心资产，平台数据存储须在企业本地，不上公有云",
          "不承诺系统替代安全管理人员职责，AI识别结果须人工复核确认"
        ]
      }
    }
  }
];

// ===== Flashcard Data Generator =====
// Generates flashcards from each scenario's modules

function generateFlashcards(scenario) {
  const m = scenario.modules;
  const cards = [];

  cards.push({
    id: `${scenario.id}-tagline`,
    category: "场景一句话",
    question: `用一句话说清楚，「${scenario.name}」这个场景卖的是什么？`,
    answer: m.tagline,
    moduleKey: "tagline"
  });

  cards.push({
    id: `${scenario.id}-decisionmakers`,
    category: "目标客户",
    question: `「${scenario.name}」场景的关键决策人通常是谁？`,
    answer: `决策人：${m.targetCustomers.decisionMakers.join("、")}\n\n影响人：${m.targetCustomers.influencers.join("、")}`,
    moduleKey: "targetCustomers"
  });

  cards.push({
    id: `${scenario.id}-roles`,
    category: "目标客户",
    question: `「${scenario.name}」场景，拜访时通常接触哪些部门角色？`,
    answer: `直接接触角色：${m.targetCustomers.roles.join("、")}\n\n终端用户：${m.targetCustomers.users.join("、")}`,
    moduleKey: "targetCustomers"
  });

  cards.push({
    id: `${scenario.id}-concerns`,
    category: "客户痛点",
    question: `「${scenario.name}」客户最关注的业务痛点有哪些？（列出3个核心痛点）`,
    answer: m.businessConcerns.slice(0, 4).map((c, i) => `${i+1}. ${c}`).join("\n"),
    moduleKey: "businessConcerns"
  });

  cards.push({
    id: `${scenario.id}-solution`,
    category: "推荐方案",
    question: `面对「${scenario.name}」客户，我们推荐的方案组合是什么？`,
    answer: `平台：${m.recommendedSolutions.platform.slice(0,2).join("、")}\n设备：${m.recommendedSolutions.equipment.slice(0,3).join("、")}\n感知：${m.recommendedSolutions.perception.slice(0,3).join("、")}`,
    moduleKey: "recommendedSolutions"
  });

  cards.push({
    id: `${scenario.id}-script`,
    category: "话术",
    question: `第一次拜访「${scenario.name}」客户，开场的核心思路是什么？`,
    answer: m.firstVisitScript,
    moduleKey: "firstVisitScript"
  });

  cards.push({
    id: `${scenario.id}-questions`,
    category: "必问问题",
    question: `拜访「${scenario.name}」客户，你必须问的前3个关键问题是什么？`,
    answer: m.keyQuestions.slice(0, 3).map((q, i) => `Q${i+1}: ${q}`).join("\n\n"),
    moduleKey: "keyQuestions"
  });

  cards.push({
    id: `${scenario.id}-pilot`,
    category: "可推试点",
    question: `「${scenario.name}」场景，第一步试点项目建议怎么落地？`,
    answer: m.pilotSuggestions.map((p, i) => `${i+1}. ${p}`).join("\n"),
    moduleKey: "pilotSuggestions"
  });

  cards.push({
    id: `${scenario.id}-boundaries`,
    category: "禁止承诺",
    question: `在「${scenario.name}」场景中，哪些话术绝对不能说？`,
    answer: [
      `技术边界：${m.boundaries.technical[0]}`,
      `交付边界：${m.boundaries.delivery[0]}`,
      `报价边界：${m.boundaries.pricing[0]}`
    ].join("\n\n"),
    moduleKey: "boundaries"
  });

  return cards;
}

// ===== Quiz Question Generator =====
function generateQuizQuestions(scenario) {
  const m = scenario.modules;
  const questions = [];

  // Q1: Decision maker
  const allDecisionMakers = SCENARIOS.flatMap(s => s.modules.targetCustomers.decisionMakers);
  questions.push({
    id: `${scenario.id}-q1`,
    scenarioId: scenario.id,
    question: `在「${scenario.name}」场景中，以下哪个是典型的关键决策人？`,
    options: shuffle([
      { text: m.targetCustomers.decisionMakers[0], correct: true },
      ...getWrongOptions(allDecisionMakers, m.targetCustomers.decisionMakers).slice(0, 3).map(t => ({ text: t, correct: false }))
    ]),
    explanation: `「${scenario.name}」场景的关键决策人通常包括：${m.targetCustomers.decisionMakers.join("、")}。`
  });

  // Q2: Business concern
  questions.push({
    id: `${scenario.id}-q2`,
    scenarioId: scenario.id,
    question: `以下哪个痛点是「${scenario.name}」客户最典型的业务关注？`,
    options: shuffle([
      { text: m.businessConcerns[0], correct: true },
      ...SCENARIOS.filter(s => s.id !== scenario.id)
        .map(s => s.modules.businessConcerns[0])
        .slice(0, 3)
        .map(t => ({ text: t, correct: false }))
    ]),
    explanation: `「${scenario.name}」客户的核心痛点之一：${m.businessConcerns[0]}`
  });

  // Q3: Pilot approach
  questions.push({
    id: `${scenario.id}-q3`,
    scenarioId: scenario.id,
    question: `针对「${scenario.name}」场景，最推荐的试点切入方式是？`,
    options: shuffle([
      { text: m.pilotSuggestions[0], correct: true },
      ...SCENARIOS.filter(s => s.id !== scenario.id)
        .map(s => s.modules.pilotSuggestions[0])
        .slice(0, 3)
        .map(t => ({ text: t, correct: false }))
    ]),
    explanation: `「${scenario.name}」推荐试点方式：${m.pilotSuggestions[0]}`
  });

  return questions;
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getWrongOptions(pool, exclude) {
  return [...new Set(pool)].filter(item => !exclude.includes(item));
}

// Module display config
const MODULE_CONFIG = [
  { key: "tagline",              label: "一句话",   icon: "💡" },
  { key: "targetCustomers",      label: "目标客户", icon: "👥" },
  { key: "businessConcerns",     label: "客户痛点", icon: "🎯" },
  { key: "recommendedSolutions", label: "推荐方案", icon: "📦" },
  { key: "firstVisitScript",     label: "话术",     icon: "💬" },
  { key: "keyQuestions",         label: "必问问题", icon: "❓" },
  { key: "pilotSuggestions",     label: "试点落地", icon: "🚀" },
  { key: "boundaries",           label: "禁止承诺", icon: "🚫" },
];
