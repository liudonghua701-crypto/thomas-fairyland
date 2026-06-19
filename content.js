/*
 * Content management file
 * Add publications to PUBLICATIONS and photos to PHOTOS.
 * Text shown in both languages lives in I18N.
 */

const SITE = {
  contactEmail: "liudh@iphy.ac.cn"
};

const I18N = {
  zh: {
    navResearch: "研究",
    navPhotography: "摄影",
    navAbout: "关于",
    heroKicker: "研究者 · 摄影者",
    heroIntro: "在数据、材料与光影之间，记录可被验证的发现，以及无法重复的瞬间。",
    researchTitle: "研究与发表",
    researchLead: "材料信息学、分子描述符与能源材料研究。",
    filterAll: "全部",
    photoTitle: "摄影作品",
    photoTypeFilm: "胶片摄影",
    photoTypeDigital: "数码摄影",
    cameraLabel: "相机",
    filmLabel: "胶卷",
    photoEmpty: "此分类暂未收录作品。",
    aboutTitle: "自我介绍",
    researchFocusLabel: "学习 / 研究方向",
    researchFocus: "关联电子材料的中子散射及输运特性",
    educationLabel: "教育经历",
    advisorLabel: "导师",
    thesisLabel: "本科毕业论文",
    contactLabel: "联系方式",
    footerLine: "研究 × 摄影",
    backTop: "返回顶部 ↑",
    doiLabel: "查看论文",
    authorSuffix: " 等"
  },
  en: {
    navResearch: "Research",
    navPhotography: "Photography",
    navAbout: "About",
    heroKicker: "Researcher · Photographer",
    heroIntro: "Between data, materials, and light: recording discoveries that can be tested and moments that cannot be repeated.",
    researchTitle: "Research & Publications",
    researchLead: "Materials informatics, molecular descriptors, and energy materials.",
    filterAll: "All",
    photoTitle: "Photography",
    photoTypeFilm: "Film",
    photoTypeDigital: "Digital",
    cameraLabel: "Camera",
    filmLabel: "Film stock",
    photoEmpty: "No work has been added to this category yet.",
    aboutTitle: "Introduction",
    researchFocusLabel: "Research Focus",
    researchFocus: "Neutron scattering and transport properties of correlated-electron materials",
    educationLabel: "Education",
    advisorLabel: "Advisor",
    thesisLabel: "Undergraduate Thesis",
    contactLabel: "Contact",
    footerLine: "Research × Photography",
    backTop: "Back to top ↑",
    doiLabel: "View publication",
    authorSuffix: " et al."
  }
};

const EDUCATION = [
  {
    period: { zh: "2025 年 9 月至今", en: "Sep 2025 - Present" },
    institution: { zh: "中国科学院物理研究所", en: "Institute of Physics, Chinese Academy of Sciences" },
    program: { zh: "凝聚态物理专业 · 硕博连读研究生", en: "Condensed Matter Physics · Integrated M.S.-Ph.D. Program" },
    advisor: { zh: "罗会仟", en: "Huiqian Luo" }
  },
  {
    period: { zh: "2020 年 9 月至 2024 年 7 月", en: "Sep 2020 - Jul 2024" },
    institution: { zh: "中山大学材料科学与工程学院", en: "School of Materials Science and Engineering, Sun Yat-sen University" },
    program: { zh: "材料物理专业 · 理学学士", en: "Materials Physics · Bachelor of Science" },
    advisor: { zh: "周业成", en: "Yecheng Zhou" },
    thesis: {
      title: {
        zh: "基于分子动力学与机器学习的有机半导体电子耦合研究",
        en: "Electronic Coupling in Organic Semiconductors Based on Molecular Dynamics and Machine Learning"
      },
      url: "./assets/documents/undergraduate-thesis.pdf"
    }
  }
];

const PUBLICATIONS = [
  {
    year: 2026,
    title: "A Set of Complementary Descriptors for the Power Conversion Efficiency Predictions of Organic Solar Cells",
    authors: ["Ningyi Cui", "Zhoufa Hu", "Xiaopeng Li", "Xin Ye", "Donghua Liu", "Yufan Bao", "Jiacheng Ma", "Zhengli Zhang", "Mingfei Xiao", "Tao Zhang", "Yecheng Zhou"],
    journal: "ACS Applied Energy Materials",
    details: "9 (2), 1133–1143",
    doi: "10.1021/acsaem.5c03445"
  },
  {
    year: 2026,
    title: "GFDM descriptor-driven machine learning prediction of surface properties of molecular modified surfaces",
    authors: ["Xiaopeng Li", "Xin Ye", "Xiaojian Zeng", "Ningyi Cui", "Donghua Liu", "Yufan Bao", "Zhengli Zhang", "Mingfei Xiao", "Tao Zhang", "Yecheng Zhou"],
    journal: "Surfaces and Interfaces",
    details: "80, 108214",
    doi: "10.1016/j.surfin.2025.108214"
  },
  {
    year: 2025,
    title: "A new simple and efficient molecular descriptor for the fast and accurate prediction of log P",
    authors: ["Xiaojian Zeng", "Xin Ye", "Donghua Liu", "Ningyi Cui", "Xiaopeng Li", "Yufan Bao", "Yecheng Zhou"],
    journal: "Journal of Materials Informatics",
    details: "5 (1)",
    doi: "10.20517/jmi.2024.61"
  },
  {
    year: 2025,
    title: "Revealing the Surface Reconstruction on the High OER Catalytic Activity of Ni₃S₂",
    authors: ["Wen Ou", "Donghua Liu", "Xin Ye", "Ningyi Cui", "Yecheng Zhou"],
    journal: "ChemSusChem",
    details: "18 (10)",
    doi: "10.1002/cssc.202402178"
  },
  {
    year: 2024,
    title: "Explainable optimized 3D-MoRSE descriptors for the power conversion efficiency prediction of molecular passivated perovskite solar cells through machine learning",
    authors: ["Xin Ye", "Ningyi Cui", "Wen Ou", "Donghua Liu", "Yufan Bao", "Bin Ai", "Yecheng Zhou"],
    journal: "Journal of Materials Chemistry A",
    details: "12 (38), 26224–26233",
    doi: "10.1039/d4ta03547j"
  }
];

const PHOTOS = [
  { file: "000006.webp", type: "film", camera: "YASHICA Electro 35", film: "CN400 PROMAX", orientation: "portrait", featured: true },
  { file: "000039.webp", type: "film", camera: "YASHICA Electro 35", film: "CN400 PROMAX", orientation: "landscape" },
  { file: "000047.webp", type: "film", camera: "YASHICA Electro 35", film: "CN400 PROMAX", orientation: "landscape" },
  { file: "000003.webp", type: "film", camera: "YASHICA Electro 35", film: "CN400 PROMAX", orientation: "portrait" },
  { file: "000038.webp", type: "film", camera: "YASHICA Electro 35", film: "CN400 PROMAX", orientation: "landscape" },
  { file: "000051.webp", type: "film", camera: "YASHICA Electro 35", film: "CN400 PROMAX", orientation: "landscape" },
  { file: "000001.webp", type: "film", camera: "YASHICA Electro 35", film: "CN400 PROMAX", orientation: "landscape" },
  { file: "000041.webp", type: "film", camera: "YASHICA Electro 35", film: "CN400 PROMAX", orientation: "landscape" },
  { file: "000040.webp", type: "film", camera: "YASHICA Electro 35", film: "CN400 PROMAX", orientation: "landscape" }
];
