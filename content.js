/*
 * Content management file
 * Add publications to PUBLICATIONS and photos to PHOTOS.
 * Text shown in both languages lives in I18N.
 */

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
    photoTitle: "光经过的地方",
    photoLead: "第七卷 · 春日的建筑、植物与偶然相遇。",
    aboutTitle: "理性地研究，感性地观看。",
    aboutBody: "我关注计算方法如何帮助我们理解材料，也通过摄影保存日常环境中短暂而具体的光线。这里汇集我的研究工作与个人影像。",
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
    photoTitle: "Where the Light Passed",
    photoLead: "Roll Seven · Architecture, plants, and chance encounters in spring.",
    aboutTitle: "Research with reason. Observe with feeling.",
    aboutBody: "I study how computational methods can help us understand materials, while photography lets me preserve brief, specific qualities of light in everyday surroundings. This space brings those two practices together.",
    footerLine: "Research × Photography",
    backTop: "Back to top ↑",
    doiLabel: "View publication",
    authorSuffix: " et al."
  }
};

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
  { file: "000006.webp", zh: "春日瞭望塔", en: "Spring Observatory", orientation: "portrait", featured: true },
  { file: "000039.webp", zh: "花与蓝天", en: "Blossom / Blue", orientation: "landscape" },
  { file: "000047.webp", zh: "红螺泉", en: "Hongluo Spring", orientation: "landscape" },
  { file: "000003.webp", zh: "旧叶与新墙", en: "Old Leaves, New Wall", orientation: "portrait" },
  { file: "000038.webp", zh: "爬山虎休眠时", en: "When the Ivy Sleeps", orientation: "landscape" },
  { file: "000051.webp", zh: "山间小店", en: "A Shop in the Hills", orientation: "landscape" },
  { file: "000001.webp", zh: "校园早春", en: "Early Spring on Campus", orientation: "landscape" },
  { file: "000041.webp", zh: "日光下的旧屋", en: "The Old House in Sunlight", orientation: "landscape" },
  { file: "000040.webp", zh: "阶梯与树", en: "Steps and Trees", orientation: "landscape" }
];
