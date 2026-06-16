const STORAGE_KEY = "campus-memoir-schools-v2";
const LEGACY_STORAGE_KEY = "campus-memoir-schools-v1";
const CURRENT_SCHOOL_KEY = "campus-memoir-current-school-id";
const DB_NAME = "campus-memoir-local-db";
const DB_VERSION = 4;
const MAP_IMAGE_STORE = "mapImages";
const EDIT_DATA_STORE = "mapEditData";
const PEOPLE_DATA_STORE = "peopleData";
const EXTRA_IMAGES_STORE = "extraImages";
const GAME_DATA_STORE = "gameData";
const STRUCTURE_BRUSH_SIZE = 24;
const LINEAR_STRUCTURE_WIDTH = 12;
const DEFAULT_PLAYER_RADIUS = 26;
const DEFAULT_WALK_SPEED = 320;
const WALK_SPEED_FACTOR = 0.75;
const PHOTO_SPOT_MERGE_FACTOR = 1;
const PHOTO_SPOT_INTERACT_RADIUS_FACTOR = 1;
const PHOTO_SPOT_NAME_PREFIX = "拍照点";
const STRUCTURE_DISPLAY_ORDER = {
  green: 10,
  field: 15,
  water: 20,
  road: 30,
  bridge: 35,
  custom: 40,
  building: 50,
  wall: 60,
  gate: 70
};
const STRUCTURE_WALK_ORDER = {
  water: 10,
  building: 20,
  wall: 30,
  field: 40,
  green: 45,
  custom: 80,
  road: 100,
  bridge: 110,
  gate: 120
};

const TYPE_STYLES = {
  building: { label: "建筑", color: "rgba(196, 92, 76, 0.42)", line: "#b75243", walkable: false },
  road: { label: "道路", color: "rgba(242, 221, 158, 0.56)", line: "#c8a746", walkable: true },
  bridge: { label: "桥", color: "rgba(236, 210, 125, 0.68)", line: "#b8942f", walkable: true },
  water: { label: "水体", color: "rgba(88, 176, 210, 0.46)", line: "#3d99bd", walkable: false },
  field: { label: "操场/场地", color: "rgba(109, 174, 88, 0.42)", line: "#5d984b", walkable: true },
  green: { label: "草地", color: "rgba(124, 181, 107, 0.34)", line: "#6ea05f", walkable: true },
  wall: { label: "围墙", color: "rgba(93, 101, 110, 0.42)", line: "#5d656e", walkable: false },
  gate: { label: "门", color: "rgba(67, 151, 126, 0.45)", line: "#43977e", walkable: true },
  custom: { label: "自定义", color: "rgba(154, 115, 190, 0.36)", line: "#8661ad", walkable: true }
};

function isLinearStructureType(type) {
  return type === "wall" || type === "gate";
}

const DEFAULT_EDIT_DATA = {
  version: 1,
  cropPolygon: [],
  backgroundStrokes: [],
  structureRegions: [],
  judgementStrokes: [],
  structureSelections: []
};

const DEFAULT_GAME_DATA = {
  version: 1,
  player: {
    x: 0,
    y: 0,
    radius: DEFAULT_PLAYER_RADIUS,
    walkSpeed: DEFAULT_WALK_SPEED,
    portrait: null
  },
  settings: {
    showPhotoMarkers: true,
    showInteractionMarkers: true
  },
  location: {
    kind: "campus",
    buildingId: "",
    roomId: ""
  },
  selectedPhotoSpotId: "",
  selectedBuildingId: "",
  selectedSpotPhotoId: "",
  selectedRoomId: "",
  selectedItemId: "",
  selectedPersonId: "",
  photoSpots: [],
  buildings: {}
};

const BUILDING_CATEGORY_RULES = {
  dormitory: {
    label: "宿舍楼",
    roomTypes: ["寝室"],
    personLabel: "舍友",
    itemLabel: "交通工具"
  },
  lab: {
    label: "实验楼",
    roomTypes: ["实验室", "工位", "导师办公室"],
    personLabel: "同学/老师",
    itemLabel: "工位"
  },
  canteen: {
    label: "食堂",
    roomTypes: ["窗口"],
    personLabel: "联系人",
    itemLabel: "菜品"
  },
  gym: {
    label: "体育馆/健身房",
    roomTypes: ["篮球场", "羽毛球场", "健身区", "跑步机"],
    personLabel: "同伴",
    itemLabel: "项目"
  },
  market: {
    label: "超市",
    roomTypes: ["货架", "收银台"],
    personLabel: "店员/同学",
    itemLabel: "商品"
  },
  office: {
    label: "导师办公室",
    roomTypes: ["办公室"],
    personLabel: "老师",
    itemLabel: "物品"
  },
  other: {
    label: "普通建筑",
    roomTypes: ["房间"],
    personLabel: "人物",
    itemLabel: "项目"
  }
};

const BASE_EDITOR_MODES = ["crop", "rotate", "base", "color"];
const STRUCTURE_EDITOR_MODES = ["structure", "structureDisplay"];
const EDITOR_MODES = [...BASE_EDITOR_MODES, ...STRUCTURE_EDITOR_MODES];
const EDITOR_MODE_TOOLS = {
  crop: ["pan", "crop"],
  rotate: ["pan"],
  base: ["pan", "eyedropper", "paint", "erase"],
  color: ["pan", "eyedropper", "fillArea", "colorConnected", "colorAll"],
  structure: ["pan", "structurePolygon", "structureLine", "structureParallelogram", "structureBrush", "structureErase", "sameColorConnected", "sameColorAll"],
  structureDisplay: ["pan"]
};
const DEFAULT_EDITOR_TOOLS = {
  crop: "crop",
  rotate: "pan",
  base: "pan",
  color: "fillArea",
  structure: "structurePolygon",
  structureDisplay: "pan"
};

const COMMON_COLORS = ["#f5e9bd", "#9abd91", "#8ecae6", "#c96b54", "#e49b35", "#ffffff", "#d9e5d2", "#5f5b57"];
const STRUCTURE_REGION_TOOLS = ["structurePolygon", "structureLine", "structureParallelogram", "structureBrush", "sameColorConnected", "sameColorAll"];
const IMAGE_PALETTE_LIMIT = 24;
const STRUCTURE_LIST_PAGE_SIZE = 5;

const ICON_SHAPES = {
  pan: '<path class="tool-soft" d="M8 11.4V6.2a1.4 1.4 0 0 1 2.8 0v4.6V5a1.4 1.4 0 0 1 2.8 0v5.8V6.2a1.4 1.4 0 0 1 2.8 0v6.2V9a1.4 1.4 0 0 1 2.8 0v5.8c0 4.1-2.7 6.2-6.2 6.2h-1.4c-2.2 0-3.4-.8-4.6-2.2L4.7 16a1.6 1.6 0 0 1 .1-2.2 1.6 1.6 0 0 1 2.2.1l1 1.1Z"/><path d="M8 11.4V6.2a1.4 1.4 0 0 1 2.8 0v4.6M10.8 10.8V5a1.4 1.4 0 0 1 2.8 0v5.8M13.6 10.8V6.2a1.4 1.4 0 0 1 2.8 0v6.2M16.4 12.4V9a1.4 1.4 0 0 1 2.8 0v5.8c0 4.1-2.7 6.2-6.2 6.2h-1.4c-2.2 0-3.4-.8-4.6-2.2L4.7 16a1.6 1.6 0 0 1 .1-2.2 1.6 1.6 0 0 1 2.2.1l2 2.1"/>',
  crop: '<path class="tool-soft" d="M8 8h8v8H8z"/><path d="M7 3v14h14M3 7h14v14M8 8h8v8H8"/>',
  eyedropper: '<path class="tool-soft" d="m14.5 3.5 6 6-3 3-6-6 3-3Z"/><path d="m14.5 3.5 6 6-3 3-6-6 3-3Z"/><path d="M13 8 5 16v3h3l8-8M5 19l-2 2M8 16h5"/>',
  paint: '<path class="tool-soft" d="M14 4 20 10l-8.5 8.5c-1.6 1.6-4.4 1.9-7.3 1.2.7-2.9 1-5.7 2.6-7.3L14 4Z"/><path d="M14 4 20 10l-8.5 8.5c-1.6 1.6-4.4 1.9-7.3 1.2.7-2.9 1-5.7 2.6-7.3L14 4Z"/><path d="m12 6 6 6M6.8 17.4c1.3.1 2.3-.2 2.9-.8"/>',
  erase: '<path class="tool-soft" d="m4 15.5 8.5-8.5 7 7-5.5 5.5H8l-4-4Z"/><path d="m4 15.5 8.5-8.5 7 7-5.5 5.5H8l-4-4Z"/><path d="m8.5 11 7 7M3 21h18"/>',
  fillArea: '<path class="tool-soft" d="m4.5 12 7.5-7.5 7.5 7.5-7.5 7.5L4.5 12Z"/><path d="m4.5 12 7.5-7.5 7.5 7.5-7.5 7.5L4.5 12Z"/><path d="M5 12h14"/><path d="M19 16.8c1.1 1.2 1.7 2.2 1.7 3a1.7 1.7 0 0 1-3.4 0c0-.8.6-1.8 1.7-3Z"/>',
  connected: '<path class="tool-soft" d="M5 6h6v6H5zM13 12h6v6h-6z"/><path d="M5 6h6v6H5zM13 12h6v6h-6z"/><path class="tool-dash" d="M11 9c3 0 4 1 4 3M11 12c1.7 0 2.5.5 2.5 1.5"/>',
  road: '<path class="tool-soft" d="M5 20 10 4h4l5 16H5Z"/><path d="M5 20 10 4h4l5 16H5Z"/><path class="tool-dash" d="M12 6.5v3M12 12v3M12 17.5v1.2"/><path d="M8 20h8"/>',
  allColors: '<path class="tool-soft" d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z"/><path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z"/>',
  polygon: '<path class="tool-soft" d="M7 4h9l5 7-4 9H7l-4-8 4-8Z"/><path d="M7 4h9l5 7-4 9H7l-4-8 4-8Z"/><circle class="tool-fill" cx="7" cy="4" r="1.1"/><circle class="tool-fill" cx="21" cy="11" r="1.1"/><circle class="tool-fill" cx="7" cy="20" r="1.1"/>',
  line: '<path class="tool-soft" d="M5 17 9 8l6 5 4-7"/><path d="M5 17 9 8l6 5 4-7"/><circle class="tool-fill" cx="5" cy="17" r="1.4"/><circle class="tool-fill" cx="9" cy="8" r="1.4"/><circle class="tool-fill" cx="15" cy="13" r="1.4"/><circle class="tool-fill" cx="19" cy="6" r="1.4"/>',
  parallelogram: '<path class="tool-soft" d="M8 5h12l-4 14H4L8 5Z"/><path d="M8 5h12l-4 14H4L8 5Z"/><circle class="tool-fill" cx="8" cy="5" r="1.1"/><circle class="tool-fill" cx="20" cy="5" r="1.1"/><circle class="tool-fill" cx="16" cy="19" r="1.1"/><circle class="tool-fill" cx="4" cy="19" r="1.1"/>',
  rect: '<rect class="tool-soft" x="5" y="6" width="14" height="12" rx="1"/><rect x="5" y="6" width="14" height="12" rx="1"/>',
  ellipse: '<ellipse class="tool-soft" cx="12" cy="12" rx="8" ry="5"/><ellipse cx="12" cy="12" rx="8" ry="5"/>',
  undo: '<path d="M9 7H4v5"/><path d="M4 12c2-4.5 6.3-6.2 10.2-4.7 3.5 1.3 5.2 5.2 3.8 8.3-1.3 3-4.7 4.4-7.7 3.2"/>',
  save: '<path class="tool-soft" d="M5 4h12l2 2v14H5V4Z"/><path d="M5 4h12l2 2v14H5V4Z"/><path d="M8 4v6h8V4M8 20v-6h8v6"/>',
  rotateLeft: '<path d="M8 7H4V3"/><path d="M4 7a8 8 0 1 1 2.3 5.7"/><path class="tool-soft" d="M10 10h6v6h-6z"/><path d="M10 10h6v6h-6z"/>',
  rotateRight: '<path d="M16 7h4V3"/><path d="M20 7a8 8 0 1 0-2.3 5.7"/><path class="tool-soft" d="M8 10h6v6H8z"/><path d="M8 10h6v6H8z"/>',
  plusArea: '<path class="tool-soft" d="M7 5h8l4 6-4 8H7l-4-8 4-6Z"/><path d="M7 5h8l4 6-4 8H7l-4-8 4-6Z"/><path d="M12 8v8M8 12h8"/>',
  trash: '<path d="M5 7h14M10 11v6M14 11v6M7 7l1 13h8l1-13M9 7l1-3h4l1 3"/>',
  clear: '<path class="tool-soft" d="M4 4h16v16H4z"/><path d="M6 6l12 12M18 6 6 18"/><path d="M4 4h16v16H4z"/>'
};

const TOOL_ICON_MAP = {
  pan: ["pan", "拖动"],
  crop: ["crop", "选区"],
  eyedropper: ["eyedropper", "取色器"],
  paint: ["paint", "画笔"],
  erase: ["erase", "橡皮擦"],
  fillArea: ["fillArea", "区域涂色"],
  colorConnected: ["connected", "联通同色"],
  colorAll: ["allColors", "全部同色"],
  structurePolygon: ["polygon", "多边形"],
  structureLine: ["line", "线段"],
  structureParallelogram: ["parallelogram", "平行四边形"],
  structureBrush: ["paint", "画笔"],
  structureErase: ["erase", "橡皮擦"],
  sameColorConnected: ["connected", "联通同色"],
  sameColorAll: ["allColors", "全部同色"]
};

const SHAPE_ICON_MAP = {
  polygon: ["polygon", "多边形"],
  rect: ["rect", "矩形"],
  ellipse: ["ellipse", "椭圆"]
};

const COMMAND_ICON_MAP = {
  commitCropButton: ["crop", "裁剪"],
  undoCropButton: ["undo", "撤销"],
  saveCropButton: ["save", "保存"],
  rotateLeftButton: ["rotateLeft", "左转90度"],
  rotateRightButton: ["rotateRight", "右转90度"],
  undoRotateButton: ["undo", "撤销"],
  saveRotateButton: ["save", "保存"],
  undoBaseButton: ["undo", "撤销"],
  saveBaseButton: ["save", "保存"],
  commitBaseRegionButton: ["fillArea", "确定区域"],
  undoColorButton: ["undo", "撤销"],
  saveColorButton: ["save", "保存"],
  addStructureObjectButton: ["plusArea", "新增"],
  saveStructureObjectButton: ["save", "保存"],
  deleteStructureObjectButton: ["trash", "删除"],
  commitStructureRegionButton: ["plusArea", "添加区域"],
  undoEditButton: ["undo", "撤销"],
  clearDraftButton: ["clear", "清除草稿"]
};

const ICON_SHORT_LABELS = {
  拖动: "拖动",
  选区: "选区",
  裁剪: "裁剪",
  取色器: "取色",
  画笔: "画笔",
  橡皮擦: "橡皮",
  区域涂色: "涂色",
  联通同色: "联通",
  全部同色: "全图",
  多边形: "多边",
  线段: "线段",
  平行四边形: "平行",
  矩形: "矩形",
  椭圆: "椭圆",
  撤销: "撤销",
  保存: "保存",
  左转90度: "左转",
  右转90度: "右转",
  新增: "新增",
  删除: "删除",
  确定区域: "确定",
  添加区域: "添加",
  清除草稿: "清除"
};

const OFFICIAL_CATALOG = [
  {
    id: "ustc-gaoxin-demo",
    name: "中国科学技术大学高新校区",
    version: "占位",
    description: "官方文件列表接口预留，后续可接 GitHub Release 或 raw 文件。",
    manifestUrl: "",
    packageUrl: ""
  }
];

function createEmptyFormDraft() {
  return {
    name: "",
    mapFile: null,
    mapImageName: "",
    mapMeta: null,
    editData: null,
    structureFileName: "",
    peopleData: null,
    peopleFileName: "",
    extraImages: []
  };
}

const state = {
  schools: [],
  selectedSchoolId: null,
  dialogSelection: { mode: "new", schoolId: null },
  formDraft: createEmptyFormDraft(),
  db: null,
  objectUrls: new Set(),
  mapImageUrls: new Map(),
  editCache: new Map(),
  gameCache: new Map(),
  mapImage: null,
  mapNaturalSize: { width: 0, height: 0 },
  view: { scale: 1, minScale: 0.05, maxScale: 12, x: 0, y: 0 },
  gameData: createEmptyGameData(),
  gameDirty: false,
  gamePanelKey: "",
  gameNotice: "",
  photoUrlCache: new Map(),
  movementKeys: new Set(),
  lastGameFrameTime: 0,
  gameLoopRunning: false,
  gameSaveTimer: null,
  touchMoveVector: { x: 0, y: 0, active: false },
  activeGameFileTarget: "",
  currentNearbyPhotoSpotId: "",
  currentNearbyInteractionTargets: [],
  currentNearbyBuildingIds: [],
  selectedNearbyInteractionKey: "",
  defaultPhotoSpotInteractionKey: "",
  selectedSpotPhotoForEditId: "",
  gamePointerDown: null,
  editorEnabled: false,
  editorNotice: "",
  editorNoticeTone: "info",
  editorNoticeTimer: null,
  editLayer: "base",
  editorMode: "crop",
  activeTool: "pan",
  showBaseLayer: true,
  showStructureLayer: false,
  baseOpacity: 0.45,
  brushColor: "#f5e9bd",
  sourceColor: "#ffffff",
  activeColorSlot: "target",
  brushSize: 24,
  structureBrushSize: STRUCTURE_BRUSH_SIZE,
  brushShape: "circle",
  areaShape: "polygon",
  imagePalette: [],
  commonColors: [...COMMON_COLORS],
  colorTolerance: 8,
  crossPageEyedropper: false,
  spacePanning: false,
  toolLongPressTimer: null,
  toolLongPressHandled: false,
  draftPolygon: [],
  draftShape: null,
  cropDraft: [],
  rotationDraft: 0,
  rotationDraftSteps: [],
  baseDraftActions: [],
  structureDraftActions: [],
  selectedStructureObjectId: null,
  activeStroke: null,
  structureSelectionPreview: null,
  pointer: {
    down: false,
    moved: false,
    mode: "",
    pointerId: null,
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
    hoverX: 0,
    hoverY: 0,
    hovering: false,
    startViewX: 0,
    startViewY: 0,
    touches: new Map(),
    pinchStartDistance: 0,
    pinchStartScale: 1,
    pinchAnchor: null
  },
  renderQueued: false,
  canvasSize: { width: 1, height: 1, dpr: 1 },
  overlayCanvas: document.createElement("canvas"),
  strokeOverlayCanvas: document.createElement("canvas"),
  structureLayerCanvas: document.createElement("canvas"),
  structureLayerDirty: true,
  structureLayerKey: "",
  draftMapPreviewUrl: "",
  structureListPage: 0,
  interactionPreviewCanvas: document.createElement("canvas"),
  mapAlphaSampleCanvas: document.createElement("canvas"),
  interactionPreviewScale: 1,
  interactionFastUntil: 0,
  interactionIdleTimer: null,
  mapRenderWarm: false,
  paletteRenderKey: "",
  structureObjectListKey: "",
  colorPopoverOpen: false,
  suppressColorHistory: false
};

const els = {
  schoolButton: document.querySelector("#schoolButton"),
  currentSchool: document.querySelector("#currentSchool"),
  editorToggleButton: document.querySelector("#editorToggleButton"),
  zoomReadout: document.querySelector("#zoomReadout"),
  schoolDialog: document.querySelector("#schoolDialog"),
  schoolForm: document.querySelector("#schoolForm"),
  closeDialogButton: document.querySelector("#closeDialogButton"),
  newSchoolChoiceButton: document.querySelector("#newSchoolChoiceButton"),
  schoolList: document.querySelector("#schoolList"),
  campusFormPanel: document.querySelector("#campusFormPanel"),
  downloadCatalogButton: document.querySelector("#downloadCatalogButton"),
  downloadPanel: document.querySelector("#downloadPanel"),
  downloadList: document.querySelector("#downloadList"),
  bulkImportButton: document.querySelector("#bulkImportButton"),
  bulkExportButton: document.querySelector("#bulkExportButton"),
  bulkDeleteButton: document.querySelector("#bulkDeleteButton"),
  resourceImportInput: document.querySelector("#resourceImportInput"),
  resourceSelects: document.querySelectorAll(".resource-select"),
  mapResourceInfo: document.querySelector("#mapResourceInfo"),
  structureResourceInfo: document.querySelector("#structureResourceInfo"),
  peopleResourceInfo: document.querySelector("#peopleResourceInfo"),
  extraImagesResourceInfo: document.querySelector("#extraImagesResourceInfo"),
  schoolNameInput: document.querySelector("#schoolNameInput"),
  createSchoolButton: document.querySelector("#createSchoolButton"),
  saveSchoolButton: document.querySelector("#saveSchoolButton"),
  formNote: document.querySelector("#formNote"),
  mapFrame: document.querySelector("#mapFrame"),
  mapCanvas: document.querySelector("#mapCanvas"),
  mapEmpty: document.querySelector("#mapEmpty"),
  mapActions: document.querySelector("#mapActions"),
  mapPhotoButton: document.querySelector("#mapPhotoButton"),
  mapPhotoMarkersToggle: document.querySelector("#mapPhotoMarkersToggle"),
  mapInteractionMarkersToggle: document.querySelector("#mapInteractionMarkersToggle"),
  panelHeader: document.querySelector("#panelHeader"),
  panelKicker: document.querySelector("#panelKicker"),
  infoTitle: document.querySelector("#infoTitle"),
  infoBody: document.querySelector("#infoBody"),
  gamePanel: document.querySelector("#gamePanel"),
  spotPhotoInput: document.querySelector("#spotPhotoInput"),
  buildingPhotoInput: document.querySelector("#buildingPhotoInput"),
  entrancePhotoInput: document.querySelector("#entrancePhotoInput"),
  roomPhotoInput: document.querySelector("#roomPhotoInput"),
  itemPhotoInput: document.querySelector("#itemPhotoInput"),
  playerPortraitInput: document.querySelector("#playerPortraitInput"),
  personPhotoInput: document.querySelector("#personPhotoInput"),
  missingMapActions: document.querySelector("#missingMapActions"),
  reimportMapButton: document.querySelector("#reimportMapButton"),
  reimportMapInput: document.querySelector("#reimportMapInput"),
  editorPanel: document.querySelector("#editorPanel"),
  editorStatus: document.querySelector("#editorStatus"),
  showBaseLayer: document.querySelector("#showBaseLayer"),
  showStructureLayer: document.querySelector("#showStructureLayer"),
  toolButtons: document.querySelectorAll(".tool-button"),
  editorModeTabs: document.querySelectorAll(".mode-tab"),
  editorWorkspaces: document.querySelectorAll(".editor-workspace"),
  rotateAngleInput: document.querySelector("#rotateAngleInput"),
  rotateAngleNumber: document.querySelector("#rotateAngleNumber"),
  rotateLeftButton: document.querySelector("#rotateLeftButton"),
  rotateRightButton: document.querySelector("#rotateRightButton"),
  undoRotateButton: document.querySelector("#undoRotateButton"),
  saveRotateButton: document.querySelector("#saveRotateButton"),
  commitCropButton: document.querySelector("#commitCropButton"),
  undoCropButton: document.querySelector("#undoCropButton"),
  saveCropButton: document.querySelector("#saveCropButton"),
  colorSlots: document.querySelectorAll("[data-color-slot]"),
  colorPreviews: document.querySelectorAll("[data-color-preview]"),
  imageColorPalettes: document.querySelectorAll('[data-palette="image"]'),
  commonColorPalettes: document.querySelectorAll('[data-palette="common"]'),
  colorPickerPopover: document.querySelector("#colorPickerPopover"),
  popoverColorInput: document.querySelector("#popoverColorInput"),
  popoverHexInput: document.querySelector("#popoverHexInput"),
  popoverSwatches: document.querySelector("#popoverSwatches"),
  shapeToggles: document.querySelectorAll(".shape-toggle"),
  brushShapeToggles: document.querySelectorAll(".brush-shape-toggle"),
  brushSize: document.querySelector("#brushSize"),
  brushSizeReadout: document.querySelector("#brushSizeReadout"),
  structureBrushSize: document.querySelector("#structureBrushSize"),
  structureBrushSizeReadout: document.querySelector("#structureBrushSizeReadout"),
  commitBaseRegionButton: document.querySelector("#commitBaseRegionButton"),
  undoBaseButton: document.querySelector("#undoBaseButton"),
  saveBaseButton: document.querySelector("#saveBaseButton"),
  undoColorButton: document.querySelector("#undoColorButton"),
  saveColorButton: document.querySelector("#saveColorButton"),
  structureObjectNameInput: document.querySelector("#structureObjectNameInput"),
  structureObjectTypeInput: document.querySelector("#structureObjectTypeInput"),
  structureObjectColorInput: document.querySelector("#structureObjectColorInput"),
  addStructureObjectButton: document.querySelector("#addStructureObjectButton"),
  saveStructureObjectButton: document.querySelector("#saveStructureObjectButton"),
  deleteStructureObjectButton: document.querySelector("#deleteStructureObjectButton"),
  structureObjectList: document.querySelector("#structureObjectList"),
  structureListPager: document.querySelector("#structureListPager"),
  structureListPrevButton: document.querySelector("#structureListPrevButton"),
  structureListNextButton: document.querySelector("#structureListNextButton"),
  structureListPageReadout: document.querySelector("#structureListPageReadout"),
  structureObjectWalkableInput: document.querySelector("#structureObjectWalkableInput"),
  colorTolerance: document.querySelector("#colorTolerance"),
  colorToleranceReadout: document.querySelector("#colorToleranceReadout"),
  baseOpacityInput: document.querySelector("#baseOpacityInput"),
  baseOpacityReadout: document.querySelector("#baseOpacityReadout"),
  commitStructureRegionButton: document.querySelector("#commitStructureRegionButton"),
  undoEditButton: document.querySelector("#undoEditButton"),
  clearDraftButton: document.querySelector("#clearDraftButton"),
  showAllStructureButton: document.querySelector("#showAllStructureButton"),
  hideAllStructureButton: document.querySelector("#hideAllStructureButton")
};

void init();

async function init() {
  decorateIconButtons();
  bindEvents();
  resizeCanvas();
  try {
    state.db = await openDatabase();
    state.schools = normalizeSchools(loadSchools());
    saveSchools();
  } catch (error) {
    state.schools = normalizeSchools(loadSchools());
    setFormError("本地图片存储初始化失败，暂时无法新建学校。");
    console.error(error);
  }
  state.selectedSchoolId = loadCurrentSchoolId(state.schools);
  await renderAll({ fit: true });
  window.render_game_to_text = renderToText;
  window.advanceTime = async (ms = 16) => {
    const steps = Math.max(1, Math.round(Number(ms || 16) / (1000 / 60)));
    for (let index = 0; index < steps; index++) {
      updateGameMovement(1 / 60);
    }
    updateNearbyGameContext();
    followPlayer();
    renderGamePanel();
    draw();
  };
  if (new URLSearchParams(window.location.search).has("debug")) {
    window.__campusMemoirDebug = {
      getState: () => state,
      sampleStructureAt,
      canMoveTo: canPlayerMoveTo,
      setBrushColor: (color) => {
        if (!/^#[0-9a-f]{6}$/i.test(color || "")) return;
        state.brushColor = color;
        renderEditorState();
        queueDraw();
      },
      setupTestSchool: async () => {
        const id = "debug-school";
        const school = {
          id,
          name: "Debug School",
          mapImageName: "debug-map.png",
          mapMeta: { width: 600, height: 400 },
          mapImageStored: true,
          structureName: "",
          extraImageCount: 0,
          peopleFileName: "",
          createdAt: new Date().toISOString()
        };
        state.schools = [school];
        state.selectedSchoolId = id;
        state.editCache.set(id, createEmptyEditData());
        state.gameData = createEmptyGameData();
        state.gameCache.set(id, state.gameData);
        const canvas = document.createElement("canvas");
        canvas.width = 600;
        canvas.height = 400;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#d9e5d2";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#c8c0ad";
        ctx.fillRect(80, 70, 440, 260);
        state.mapImage = await loadImageElement(canvas.toDataURL("image/png"));
        state.mapNaturalSize = { width: 600, height: 400 };
        initializeGameForCurrentMap({ resetPlayer: true });
        state.editorEnabled = true;
        setEditorMode("structure");
        fitImageToView();
        renderEditorState();
        queueDraw();
      },
      getCurrentAreaDraft,
      createParallelogramAreaFromThreePoints,
      normalizeArea
    };
  }
}

function decorateIconButtons() {
  for (const button of document.querySelectorAll(".tool-button")) {
    const [iconName, label] = TOOL_ICON_MAP[button.dataset.tool || ""] || [];
    if (iconName) decorateButtonIcon(button, iconName, label);
  }
  for (const button of document.querySelectorAll(".shape-toggle")) {
    const [iconName, label] = SHAPE_ICON_MAP[button.dataset.areaShape || ""] || [];
    if (iconName) decorateButtonIcon(button, iconName, label);
  }
  for (const [id, [iconName, label]] of Object.entries(COMMAND_ICON_MAP)) {
    const button = document.querySelector(`#${id}`);
    if (button) decorateButtonIcon(button, iconName, label);
  }
}

function decorateButtonIcon(button, iconName, label) {
  const icon = ICON_SHAPES[iconName];
  if (!button || !icon) return;
  const existingTitle = button.getAttribute("title");
  const fullLabel = existingTitle && existingTitle !== label ? `${label} - ${existingTitle}` : label;
  const shortLabel = ICON_SHORT_LABELS[label] || label.slice(0, 2);
  button.classList.add("icon-tool");
  button.title = fullLabel;
  button.setAttribute("aria-label", fullLabel);
  button.dataset.label = label;
  button.innerHTML = `<svg class="tool-svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${icon}</svg><span class="tool-label" aria-hidden="true">${shortLabel}</span>`;
}

function bindEvents() {
  els.schoolButton.addEventListener("click", () => {
    openSchoolDialog();
  });

  els.newSchoolChoiceButton.addEventListener("click", () => {
    chooseNewSchoolPanel();
  });

  els.downloadCatalogButton.addEventListener("click", () => {
    chooseDownloadPanel();
  });

  els.schoolNameInput.addEventListener("input", () => {
    state.formDraft.name = els.schoolNameInput.value.trim();
  });

  els.bulkImportButton.addEventListener("click", () => {
    els.resourceImportInput.click();
  });

  els.resourceImportInput.addEventListener("change", () => {
    const files = [...(els.resourceImportInput.files || [])];
    els.resourceImportInput.value = "";
    if (files.length) void importResourceFiles(files);
  });

  els.bulkExportButton.addEventListener("click", () => {
    void exportSelectedResources();
  });

  els.bulkDeleteButton.addEventListener("click", () => {
    void deleteSelectedResources();
  });

  for (const input of els.resourceSelects) {
    input.addEventListener("change", () => {
      setBulkBusy(false);
    });
  }

  els.closeDialogButton.addEventListener("click", () => {
    els.schoolDialog.close();
  });

  els.schoolForm.addEventListener("submit", (event) => {
    event.preventDefault();
    void createSchoolFromForm();
  });

  els.saveSchoolButton.addEventListener("click", () => {
    void saveSchoolFromForm({ enterAfterSave: false });
  });

  els.reimportMapButton.addEventListener("click", () => {
    els.reimportMapInput.click();
  });

  els.mapPhotoButton.addEventListener("click", () => {
    createPhotoSpotAtPlayer();
  });
  els.mapPhotoMarkersToggle.addEventListener("change", () => {
    state.gameData.settings.showPhotoMarkers = els.mapPhotoMarkersToggle.checked;
    markGameDirty({ defer: true });
    renderGamePanel({ force: true });
    queueDraw();
  });
  els.mapInteractionMarkersToggle.addEventListener("change", () => {
    state.gameData.settings.showInteractionMarkers = els.mapInteractionMarkersToggle.checked;
    markGameDirty({ defer: true });
    renderGamePanel({ force: true });
    queueDraw();
  });

  els.reimportMapInput.addEventListener("change", () => {
    const file = els.reimportMapInput.files?.[0] || null;
    els.reimportMapInput.value = "";
    if (file) void reimportSelectedSchoolMap(file);
  });

  els.editorToggleButton.addEventListener("click", () => {
    state.editorEnabled = !state.editorEnabled;
    if (!state.editorEnabled) {
      state.activeTool = "pan";
      state.editorMode = "crop";
      state.editLayer = "base";
      state.showBaseLayer = true;
      state.showStructureLayer = false;
      resetTransientDrafts();
      updateNearbyGameContext();
      setGameViewToDefaultFollow();
      startGameLoop();
    } else {
      if (state.mapImage) fitImageToView();
      setEditorMode(state.editorMode);
    }
    renderEditorState();
    renderGamePanel({ force: true });
    updateCanvasCursor();
    queueDraw();
  });

  els.showBaseLayer.addEventListener("click", () => {
    setEditLayer("base");
  });
  els.showStructureLayer.addEventListener("click", () => {
    setEditLayer("structure");
  });

  for (const button of els.editorModeTabs) {
    button.addEventListener("click", () => {
      markMapInteraction(180);
      setEditorMode(button.dataset.editorMode || "crop");
      renderEditorState();
      queueDraw();
    });
  }

  for (const button of els.toolButtons) {
    button.addEventListener("pointerdown", (event) => {
      const tool = button.dataset.tool || "";
      if (tool !== "eyedropper" || !isToolAvailableInCurrentMode(tool, button)) return;
      button.setPointerCapture?.(event.pointerId);
      state.toolLongPressHandled = false;
      window.clearTimeout(state.toolLongPressTimer);
      state.toolLongPressTimer = window.setTimeout(() => {
        state.toolLongPressHandled = true;
        void openCrossPageEyedropper();
      }, 520);
    });
    button.addEventListener("pointerup", (event) => {
      window.clearTimeout(state.toolLongPressTimer);
      button.releasePointerCapture?.(event.pointerId);
    });
    button.addEventListener("pointercancel", (event) => {
      window.clearTimeout(state.toolLongPressTimer);
      button.releasePointerCapture?.(event.pointerId);
    });
    button.addEventListener("click", () => {
      const tool = button.dataset.tool || "";
      if (!isToolAvailableInCurrentMode(tool, button)) return;
      if (state.toolLongPressHandled) {
        state.toolLongPressHandled = false;
        return;
      }
      markMapInteraction(180);
      state.activeTool = tool;
      state.crossPageEyedropper = tool === "eyedropper";
      clearActiveDraft();
      renderEditorState();
      updateCanvasCursor();
      queueDraw();
    });
  }

  els.rotateLeftButton.addEventListener("click", () => {
    rotateMapDraftBy(-90);
  });

  els.rotateRightButton.addEventListener("click", () => {
    rotateMapDraftBy(90);
  });

  els.undoRotateButton.addEventListener("click", () => {
    undoRotateStep();
  });

  els.saveRotateButton.addEventListener("click", () => {
    void saveRotationDraft();
  });
  els.rotateAngleInput.addEventListener("input", () => {
    setRotationDraft(Number(els.rotateAngleInput.value));
  });
  els.rotateAngleNumber.addEventListener("input", () => {
    setRotationDraft(Number(els.rotateAngleNumber.value));
  });

  els.commitCropButton.addEventListener("click", () => {
    commitCropDraft();
  });

  els.undoCropButton.addEventListener("click", () => {
    undoCropStep();
  });

  els.saveCropButton.addEventListener("click", () => {
    void saveCropDraft();
  });

  for (const slot of els.colorSlots) {
    slot.addEventListener("click", (event) => {
      state.activeColorSlot = slot.dataset.colorSlot || "target";
      renderEditorState();
      openColorPopover(slot);
    });
  }
  for (const palette of els.imageColorPalettes) {
    palette.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-color]");
      if (!button) return;
      setActiveEditorColor(button.dataset.color);
    });
  }
  for (const palette of els.commonColorPalettes) {
    palette.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-color]");
      if (!button) return;
      setActiveEditorColor(button.dataset.color);
    });
  }
  els.popoverColorInput.addEventListener("input", () => {
    setActiveEditorColor(els.popoverColorInput.value);
  });
  els.popoverHexInput.addEventListener("input", () => {
    const color = normalizeHexColor(els.popoverHexInput.value);
    if (color) setActiveEditorColor(color);
  });
  els.popoverSwatches.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-color]");
    if (!button) return;
    setActiveEditorColor(button.dataset.color);
  });
  document.addEventListener("pointerdown", (event) => {
    if (!state.colorPopoverOpen) return;
    if (els.colorPickerPopover.contains(event.target)) return;
    if (event.target.closest("[data-color-slot]")) return;
    closeColorPopover();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeColorPopover();
    if (!isTextEditingTarget(event.target) && handleGameKeyDown(event)) return;
    if (!isTextEditingTarget(event.target) && event.key.toLowerCase() === "f") {
      event.preventDefault();
      void toggleFullscreen();
      return;
    }
    if (event.code === "Space" && !isTextEditingTarget(event.target)) {
      state.spacePanning = true;
      updateCanvasCursor();
    }
  });
  document.addEventListener("keyup", (event) => {
    if (handleGameKeyUp(event)) return;
    if (event.code === "Space") {
      state.spacePanning = false;
      updateCanvasCursor();
    }
  });
  els.saveColorButton.addEventListener("click", () => {
    void saveBaseDraft();
  });
  els.undoColorButton.addEventListener("click", () => {
    undoBaseStep();
  });
  for (const button of els.shapeToggles) {
    button.addEventListener("click", () => {
      state.areaShape = button.dataset.areaShape || "polygon";
      clearActiveDraft();
      renderEditorState();
      queueDraw();
    });
  }
  for (const button of els.brushShapeToggles) {
    button.addEventListener("click", () => {
      state.brushShape = button.dataset.brushShape || "circle";
      renderEditorState();
      queueDraw();
    });
  }
  els.commitBaseRegionButton.addEventListener("click", () => {
    commitBaseRegionDraft();
  });
  els.undoBaseButton.addEventListener("click", () => {
    undoBaseStep();
  });
  els.saveBaseButton.addEventListener("click", () => {
    void saveBaseDraft();
  });
  els.brushSize.addEventListener("input", () => {
    state.brushSize = Number(els.brushSize.value);
    els.brushSizeReadout.textContent = String(state.brushSize);
    queueDraw();
  });
  els.structureBrushSize.addEventListener("input", () => {
    state.structureBrushSize = Number(els.structureBrushSize.value);
    els.structureBrushSizeReadout.textContent = String(state.structureBrushSize);
    queueDraw();
  });
  els.structureObjectTypeInput.addEventListener("change", () => {
    const type = els.structureObjectTypeInput.value;
    els.structureObjectWalkableInput.checked = TYPE_STYLES[type]?.walkable ?? true;
    els.structureObjectWalkableInput.disabled = type !== "custom";
    els.structureObjectWalkableInput.closest(".check-row").hidden = type !== "custom";
    els.structureObjectColorInput.value = TYPE_STYLES[type]?.line || TYPE_STYLES.custom.line;
  });
  els.addStructureObjectButton.addEventListener("click", () => {
    addStructureObject();
  });
  els.saveStructureObjectButton.addEventListener("click", () => {
    updateSelectedStructureObject();
  });
  els.deleteStructureObjectButton.addEventListener("click", () => {
    deleteSelectedStructureObject();
  });
  els.showAllStructureButton.addEventListener("click", () => {
    setAllStructureObjectsVisible(true);
  });
  els.hideAllStructureButton.addEventListener("click", () => {
    setAllStructureObjectsVisible(false);
  });
  els.structureListPrevButton.addEventListener("click", () => {
    state.structureListPage = Math.max(0, state.structureListPage - 1);
    state.structureObjectListKey = "";
    renderStructureObjectList();
  });
  els.structureListNextButton.addEventListener("click", () => {
    const count = getSelectedEditData().structureRegions.length;
    const maxPage = Math.max(0, Math.ceil(count / STRUCTURE_LIST_PAGE_SIZE) - 1);
    state.structureListPage = Math.min(maxPage, state.structureListPage + 1);
    state.structureObjectListKey = "";
    renderStructureObjectList();
  });
  els.structureObjectWalkableInput.addEventListener("change", () => {
    if (!getSelectedStructureObject()) renderEditorState();
  });
  els.structureObjectColorInput.addEventListener("input", () => {
    if (!getSelectedStructureObject()) queueDraw();
  });
  els.colorTolerance.addEventListener("input", () => {
    state.colorTolerance = Number(els.colorTolerance.value);
    els.colorToleranceReadout.textContent = String(state.colorTolerance);
  });
  els.baseOpacityInput.addEventListener("input", () => {
    state.baseOpacity = clamp(Number(els.baseOpacityInput.value) / 100, 0, 1);
    els.baseOpacityReadout.textContent = `${Math.round(state.baseOpacity * 100)}%`;
    queueDraw();
  });
  els.commitStructureRegionButton.addEventListener("click", () => {
    commitStructureRegionDraft();
  });
  els.undoEditButton.addEventListener("click", () => {
    undoStructureStep();
  });
  els.clearDraftButton.addEventListener("click", () => {
    clearActiveDraft();
    renderEditorState();
    queueDraw();
  });
  els.gamePanel.addEventListener("click", onGamePanelClick);
  els.gamePanel.addEventListener("input", onGamePanelInput);
  els.gamePanel.addEventListener("change", onGamePanelChange);
  els.spotPhotoInput.addEventListener("change", () => {
    const files = [...(els.spotPhotoInput.files || [])];
    els.spotPhotoInput.value = "";
    if (files.length) void addPhotosAtPlayer(files);
  });
  els.buildingPhotoInput.addEventListener("change", () => {
    const files = [...(els.buildingPhotoInput.files || [])];
    els.buildingPhotoInput.value = "";
    if (files.length) void addPhotosToSelectedBuilding(files);
  });
  els.entrancePhotoInput.addEventListener("change", () => {
    const files = [...(els.entrancePhotoInput.files || [])];
    els.entrancePhotoInput.value = "";
    if (files.length) void addEntranceAtPlayer(files[0]);
  });
  els.roomPhotoInput.addEventListener("change", () => {
    const files = [...(els.roomPhotoInput.files || [])];
    els.roomPhotoInput.value = "";
    if (files.length) void addPhotosToSelectedRoom(files);
  });
  els.itemPhotoInput.addEventListener("change", () => {
    const files = [...(els.itemPhotoInput.files || [])];
    els.itemPhotoInput.value = "";
    if (files.length) void addPhotosToSelectedItem(files);
  });
  els.playerPortraitInput.addEventListener("change", () => {
    const file = els.playerPortraitInput.files?.[0] || null;
    els.playerPortraitInput.value = "";
    if (file) void setPlayerPortraitFromDorm(file);
  });
  els.personPhotoInput.addEventListener("change", () => {
    const file = els.personPhotoInput.files?.[0] || null;
    els.personPhotoInput.value = "";
    if (file) void setSelectedPersonPhoto(file);
  });

  els.mapCanvas.addEventListener("pointerdown", onPointerDown);
  els.mapCanvas.addEventListener("pointermove", onPointerMove);
  els.mapCanvas.addEventListener("pointerleave", onPointerLeave);
  els.mapCanvas.addEventListener("pointerup", onPointerUp);
  els.mapCanvas.addEventListener("pointercancel", onPointerCancel);
  els.mapCanvas.addEventListener("contextmenu", (event) => event.preventDefault());
  els.mapCanvas.addEventListener("wheel", onWheel, { passive: false });
  window.addEventListener("resize", () => {
    resizeCanvas();
    if (state.editorEnabled) clampView();
    else followPlayer();
    queueDraw();
  });
}

function isTextEditingTarget(target) {
  const element = target instanceof Element ? target : null;
  return Boolean(element?.closest("input, textarea, select, [contenteditable='true']"));
}

async function createSchoolFromForm() {
  await saveSchoolFromForm({ enterAfterSave: true });
}

async function saveSchoolFromForm({ enterAfterSave }) {
  if (state.dialogSelection.mode === "manage" && state.dialogSelection.schoolId) {
    const school = state.schools.find((item) => item.id === state.dialogSelection.schoolId);
    if (school) {
      school.name = els.schoolNameInput.value.trim() || school.name;
      saveSchools();
      renderSchoolList();
      renderSchoolDialogPanels();
      if (state.selectedSchoolId === school.id) await renderAll({ fit: false });
      if (enterAfterSave) enterSchool(school.id);
    }
    return;
  }

  const name = state.formDraft.name || els.schoolNameInput.value.trim();
  const mapFile = state.formDraft.mapFile || null;
  if (!name || !mapFile) {
    setFormError("至少需要名称和大地图。");
    return;
  }
  if (!state.db) {
    setFormError("本地图片存储不可用，无法保存大地图图片。");
    return;
  }

  setCreating(true);
  try {
    const id = createId("school");
    const storedMapMeta = await putMapImage(id, mapFile);
    const mapMeta = mergeMapMeta(state.formDraft.mapMeta, storedMapMeta || await createMapMetaFromFile(mapFile));
    const mapImageUrl = URL.createObjectURL(mapFile);
    state.objectUrls.add(mapImageUrl);
    state.mapImageUrls.set(id, mapImageUrl);

    const school = {
      id,
      name,
      mapImageName: mapFile.name,
      mapMeta,
      mapImageStored: true,
      structureName: state.formDraft.structureFileName || "",
      extraImageCount: state.formDraft.extraImages.length || 0,
      peopleFileName: state.formDraft.peopleFileName || "",
      createdAt: new Date().toISOString()
    };

    await putEditData(id, state.formDraft.editData || createEmptyEditData());
    await putPeopleData(id, state.formDraft.peopleData || null);
    await putExtraImages(id, state.formDraft.extraImages || []);
    await putGameData(id, createEmptyGameData());
    state.editCache.set(id, state.formDraft.editData || createEmptyEditData());
    state.gameCache.set(id, createEmptyGameData());
    state.schools.push(school);
    saveSchools();
    resetFormDraft();
    clearFormNote();
    state.dialogSelection = { mode: "manage", schoolId: id };
    renderSchoolList();
    renderSchoolDialogPanels();
    if (enterAfterSave) {
      state.selectedSchoolId = school.id;
      saveCurrentSchoolId(school.id);
      els.schoolDialog.close();
      await renderAll({ fit: true });
    }
  } catch (error) {
    console.error(error);
    setFormError("导入失败，请检查图片或地图结构文件。");
  } finally {
    setCreating(false);
  }
}

async function reimportSelectedSchoolMap(file) {
  const school = getSelectedSchool();
  if (!school || !state.db) return;
  setMissingMapBusy(true);
  try {
    await reimportMapForSchool(school.id, file);
  } catch (error) {
    console.error(error);
    els.mapEmpty.hidden = false;
    els.mapEmpty.textContent = "重新导入失败，请换一张地图图片再试。";
  } finally {
    setMissingMapBusy(false);
  }
}

async function reimportMapForSchool(schoolId, file, options = {}) {
  const school = state.schools.find((item) => item.id === schoolId);
  if (!school || !state.db) return;
  if (options.stayInDialog) setBulkBusy(true);
  school.mapMeta = await putMapImage(school.id, file) || await createMapMetaFromFile(file);
  const existingUrl = state.mapImageUrls.get(school.id);
  if (existingUrl) URL.revokeObjectURL(existingUrl);
  const mapImageUrl = URL.createObjectURL(file);
  state.objectUrls.add(mapImageUrl);
  state.mapImageUrls.set(school.id, mapImageUrl);
  school.mapImageName = file.name;
  school.mapImageStored = true;
  saveSchools();
  if (options.stayInDialog) {
    renderSchoolDialogPanels();
    setBulkBusy(false);
  }
  if (state.selectedSchoolId === school.id || !options.stayInDialog) {
    await renderAll({ fit: true });
  }
}

function resetFormDraft() {
  if (state.draftMapPreviewUrl) {
    URL.revokeObjectURL(state.draftMapPreviewUrl);
    state.objectUrls.delete(state.draftMapPreviewUrl);
  }
  state.draftMapPreviewUrl = "";
  state.formDraft = createEmptyFormDraft();
}

function setDraftMapFile(file) {
  if (state.draftMapPreviewUrl) {
    URL.revokeObjectURL(state.draftMapPreviewUrl);
    state.objectUrls.delete(state.draftMapPreviewUrl);
  }
  state.formDraft.mapFile = file;
  state.formDraft.mapImageName = file.name || "map-image";
  state.formDraft.mapMeta = null;
  state.draftMapPreviewUrl = URL.createObjectURL(file);
  state.objectUrls.add(state.draftMapPreviewUrl);
  void createDraftMapMetaFromFile(file).then((meta) => {
    if (state.formDraft.mapFile === file) state.formDraft.mapMeta = meta;
  });
}

async function importResourceFiles(files) {
  if (!files.length) return;
  setBulkBusy(true);
  clearFormNote();
  try {
    const zipFiles = files.filter((file) => isZipFile(file));
    if (zipFiles.length) {
      setFormError("zip 导入接口已预留，当前先使用 JSON 包或图片文件。");
      return;
    }

    const jsonFiles = files.filter((file) => isJsonFile(file));
    const imageFiles = files.filter((file) => isImageFile(file));

    for (const file of jsonFiles) {
      await importJsonResourceFile(file);
    }
    if (imageFiles.length) {
      await importImageResourceFiles(imageFiles);
    }
    renderSchoolList();
    renderSchoolDialogPanels();
  } catch (error) {
    console.error(error);
    setFormError("导入失败，请检查文件格式。");
  } finally {
    setBulkBusy(false);
  }
}

async function importJsonResourceFile(file) {
  const data = await readOptionalJsonFile(file);
  const kind = detectJsonResourceKind(data);

  if (kind === "school") {
    await importSchoolPackageFile(file, { stayInDialog: true, parsedData: data });
    return;
  }
  if (kind === "extraImages") {
    await importExtraImagesPackage(file, data);
    return;
  }
  if (kind === "structure") {
    await importStructureDataResource(file, data);
    return;
  }
  await importPeopleDataResource(file, data);
}

function detectJsonResourceKind(data) {
  if (!data || typeof data !== "object") return "people";
  if (data.kind === "campus-memoir-school-package") return "school";
  if (data.kind === "campus-memoir-extra-images") return "extraImages";
  if (data.kind === "campus-memoir-map-structure") return "structure";
  if (
    Array.isArray(data.cropPolygon) ||
    Array.isArray(data.backgroundStrokes) ||
    Array.isArray(data.structureRegions) ||
    Array.isArray(data.judgementStrokes)
  ) {
    return "structure";
  }
  return "people";
}

async function importImageResourceFiles(files) {
  const isNew = state.dialogSelection.mode === "new";
  const school = !isNew
    ? state.schools.find((item) => item.id === state.dialogSelection.schoolId) || null
    : null;

  if (!files.length) return;
  if (files.length > 1) {
    setFormError("普通图片导入用于大地图。其他图片请使用带说明的资源包。");
    return;
  }
  if (isNew) {
    setDraftMapFile(files[0]);
  } else if (school) {
    await reimportMapForSchool(school.id, files[0], { stayInDialog: true });
  }
}

async function importStructureDataResource(file, data) {
  const resource = extractStructureResource(data);
  const editData = normalizeEditData(resource.editData);
  const warning = getStructureImportWarning(resource.mapMeta, editData);
  if (state.dialogSelection.mode === "new") {
    state.formDraft.structureFileName = file.name;
    state.formDraft.editData = editData;
    if (warning) setFormError(warning);
    return;
  }
  if (state.dialogSelection.schoolId) {
    await importStructureObject(state.dialogSelection.schoolId, editData, file.name);
    if (warning) setFormError(warning);
    renderSchoolDialogPanels();
  }
}

async function importPeopleDataResource(file, data) {
  if (!currentFormHasStructure()) {
    setFormError("人物关系依附于地图结构，请先导入或创建地图结构。");
    return;
  }
  if (state.dialogSelection.mode === "new") {
    state.formDraft.peopleFileName = file.name;
    state.formDraft.peopleData = data;
    return;
  }
  if (state.dialogSelection.schoolId) {
    await importPeopleObject(state.dialogSelection.schoolId, data, file.name);
  }
}

async function importExtraImagesPackage(file, data) {
  if (!currentFormHasStructure()) {
    setFormError("其他图片依附于地图结构，请先导入或创建地图结构。");
    return;
  }
  const records = Array.isArray(data.images) ? data.images : [];
  if (state.dialogSelection.mode === "new") {
    state.formDraft.extraImages = records;
    return;
  }
  const school = state.schools.find((item) => item.id === state.dialogSelection.schoolId);
  if (!school) return;
  await putExtraImages(school.id, records);
  school.extraImageCount = records.length;
  saveSchools();
  if (state.selectedSchoolId === school.id) await renderAll({ fit: false });
}

function currentFormHasStructure() {
  if (state.dialogSelection.mode === "new") return Boolean(state.formDraft.editData);
  const school = state.schools.find((item) => item.id === state.dialogSelection.schoolId);
  return Boolean(school?.structureName);
}

function isImageFile(file) {
  return file.type.startsWith("image/");
}

function isJsonFile(file) {
  return file.type === "application/json" || /\.json$/i.test(file.name);
}

function isZipFile(file) {
  return file.type === "application/zip" || /\.zip$/i.test(file.name);
}

async function exportSelectedResources() {
  const keys = getSelectedResourceKeys();
  if (!keys.length) return;
  const schoolId = state.dialogSelection.schoolId;
  if (!schoolId) {
    setFormError("请先保存学校，再导出资源。");
    return;
  }

  clearFormNote();
  for (const key of keys) {
    if (key === "school") await exportSchoolPackage(schoolId);
    if (key === "map") await exportMapImage(schoolId);
    if (key === "structure") await exportStructureData(schoolId);
    if (key === "extraImages") await exportExtraImages(schoolId);
    if (key === "people") await exportPeopleData(schoolId);
  }
}

async function deleteSelectedResources() {
  const keys = getSelectedResourceKeys();
  if (!keys.length) return;
  clearFormNote();

  if (keys.includes("school")) {
    await deleteSelectedSchool();
    return;
  }
  if (keys.includes("structure")) await deleteStructureResource();
  if (keys.includes("map")) await deleteMapResource();
  if (keys.includes("extraImages") && !keys.includes("structure")) await deleteExtraImagesResource();
  if (keys.includes("people") && !keys.includes("structure")) await deletePeopleResource();
  renderSchoolDialogPanels();
}

async function downloadOfficialPackage(item) {
  if (!item.packageUrl) {
    setFormError("暂未配置下载地址。");
    return;
  }
  setBulkBusy(true);
  try {
    const response = await fetch(item.packageUrl);
    if (!response.ok) throw new Error(`download failed: ${response.status}`);
    const blob = await response.blob();
    const file = new File([blob], `${safeFileName(item.name)}.campus-memoir.json`, {
      type: blob.type || "application/json"
    });
    await importSchoolPackageFile(file, { stayInDialog: true });
  } catch (error) {
    console.error(error);
    setFormError("下载失败，请稍后重试。");
  } finally {
    setBulkBusy(false);
  }
}

async function readOptionalStructureFile(file) {
  if (!file) return null;
  const parsed = await readOptionalJsonFile(file);
  return normalizeEditData(extractStructureResource(parsed).editData);
}

async function readOptionalJsonFile(file) {
  if (!file) return null;
  const text = await file.text();
  return JSON.parse(text);
}

function extractStructureResource(data) {
  if (!data || typeof data !== "object") {
    return { editData: createEmptyEditData(), mapMeta: null };
  }
  if (data.kind === "campus-memoir-map-structure") {
    return {
      editData: data.editData && typeof data.editData === "object" ? data.editData : data,
      mapMeta: normalizeMapMeta(data.mapMeta)
    };
  }
  return {
    editData: data,
    mapMeta: normalizeMapMeta(data.mapMeta)
  };
}

function getStructureImportWarning(mapMeta, editData = null) {
  const meta = normalizeMapMeta(mapMeta);
  const current = getCurrentFormMapMeta();
  if (!current) return "";
  const sizeMismatch = meta &&
    meta.width && meta.height && current.width && current.height &&
    (meta.width !== current.width || meta.height !== current.height);
  const hashMismatch = meta && meta.sha256 && current.sha256 && meta.sha256 !== current.sha256;
  const sourceSize = meta?.width && meta?.height ? `${meta.width}x${meta.height}` : "未知尺寸";
  const currentSize = current.width && current.height ? `${current.width}x${current.height}` : "未知尺寸";
  if (sizeMismatch) return `结构来源底图尺寸为 ${sourceSize}，当前底图为 ${currentSize}，导入后可能错位。`;
  const boundsWarning = getStructureBoundsWarning(editData, current);
  if (boundsWarning) return boundsWarning;
  if (!hashMismatch) return "";
  return "结构来源底图与当前底图 hash 不一致，导入后请检查是否错位。";
}

function getStructureBoundsWarning(editData, currentMeta) {
  if (!currentMeta?.width || !currentMeta?.height || !editData) return "";
  const bounds = getEditDataBounds(editData);
  if (!bounds) return "";
  const structureWidth = Math.ceil(bounds.right);
  const structureHeight = Math.ceil(bounds.bottom);
  if (structureWidth <= currentMeta.width * 1.08 && structureHeight <= currentMeta.height * 1.08) return "";
  return `结构坐标范围约为 ${structureWidth}x${structureHeight}，当前底图为 ${currentMeta.width}x${currentMeta.height}，导入后可能错位。`;
}

function getEditDataBounds(editData) {
  let bounds = null;
  const touch = (x, y) => {
    if (!Number.isFinite(x) || !Number.isFinite(y)) return;
    bounds = bounds || { left: Infinity, top: Infinity, right: -Infinity, bottom: -Infinity };
    bounds.left = Math.min(bounds.left, x);
    bounds.top = Math.min(bounds.top, y);
    bounds.right = Math.max(bounds.right, x);
    bounds.bottom = Math.max(bounds.bottom, y);
  };
  const scanArea = (area) => {
    if (!area) return;
    if (area.kind === "polygon") {
      for (const point of area.points || []) touch(Number(point.x), Number(point.y));
    } else if (area.kind === "rect" || area.kind === "ellipse") {
      touch(Number(area.x), Number(area.y));
      touch(Number(area.x) + Number(area.width), Number(area.y) + Number(area.height));
    } else if (area.kind === "pixels") {
      for (const run of area.pixels || []) {
        touch(Number(run.x), Number(run.y));
        touch(Number(run.x) + Number(run.length), Number(run.y) + 1);
      }
    }
  };
  for (const region of editData.structureRegions || []) {
    for (const area of getRegionAreas(region)) scanArea(area);
  }
  for (const selection of editData.structureSelections || []) {
    scanArea({ kind: "pixels", pixels: selection.pixels || [] });
  }
  for (const stroke of editData.judgementStrokes || []) {
    for (const point of stroke.points || []) touch(Number(point.x), Number(point.y));
  }
  return bounds;
}

function getCurrentFormMapMeta() {
  if (state.dialogSelection.mode === "new") return normalizeMapMeta(state.formDraft.mapMeta);
  const school = state.schools.find((item) => item.id === state.dialogSelection.schoolId);
  return normalizeMapMeta(school?.mapMeta);
}

function loadSchools() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function normalizeSchools(schools) {
  return schools
    .filter((school) => school && typeof school === "object")
    .filter((school) => {
      const isLegacyPlaceholder =
        school.name === "示例学校" &&
        !school.mapImageName &&
        !school.structureName &&
        !school.peopleFileName &&
        !school.extraImageCount;
      return !isLegacyPlaceholder;
    })
    .map((school) => ({
      id: typeof school.id === "string" ? school.id : createId("school"),
      name: typeof school.name === "string" ? school.name : "未命名学校",
      mapImageName: typeof school.mapImageName === "string" ? school.mapImageName : "",
      mapMeta: normalizeMapMeta(school.mapMeta),
      mapImageStored: Boolean(school.mapImageStored || school.mapImageName),
      structureName: typeof school.structureName === "string" ? school.structureName : "",
      extraImageCount: Number.isFinite(Number(school.extraImageCount)) ? Number(school.extraImageCount) : 0,
      peopleFileName: typeof school.peopleFileName === "string" ? school.peopleFileName : "",
      createdAt: typeof school.createdAt === "string" ? school.createdAt : new Date().toISOString()
    }));
}

function normalizeMapMeta(meta) {
  if (!meta || typeof meta !== "object") return null;
  const width = Number(meta.width);
  const height = Number(meta.height);
  return {
    name: typeof meta.name === "string" ? meta.name : "",
    type: typeof meta.type === "string" ? meta.type : "",
    size: Number.isFinite(Number(meta.size)) ? Number(meta.size) : 0,
    width: Number.isFinite(width) && width > 0 ? Math.round(width) : 0,
    height: Number.isFinite(height) && height > 0 ? Math.round(height) : 0,
    sha256: typeof meta.sha256 === "string" ? meta.sha256 : "",
    updatedAt: typeof meta.updatedAt === "string" ? meta.updatedAt : ""
  };
}

function mergeMapMeta(base, override) {
  const first = normalizeMapMeta(base) || {};
  const second = normalizeMapMeta(override) || {};
  return {
    ...first,
    ...Object.fromEntries(Object.entries(second).filter(([, value]) => Boolean(value))),
    width: second.width || first.width || 0,
    height: second.height || first.height || 0
  };
}

async function createMapMetaFromFile(file) {
  const hash = await hashBlob(file);
  const size = await readImageNaturalSize(file);
  return {
    name: file.name || "map-image",
    type: file.type || "application/octet-stream",
    size: file.size || 0,
    width: size.width,
    height: size.height,
    sha256: hash,
    updatedAt: new Date().toISOString()
  };
}

async function createDraftMapMetaFromFile(file) {
  const size = await readImageNaturalSize(file);
  return {
    name: file.name || "map-image",
    type: file.type || "application/octet-stream",
    size: file.size || 0,
    width: size.width,
    height: size.height,
    sha256: "",
    updatedAt: new Date().toISOString()
  };
}

async function hashBlob(blob) {
  if (!globalThis.crypto?.subtle) return "";
  const buffer = await blob.arrayBuffer();
  return hashArrayBuffer(buffer);
}

async function hashArrayBuffer(buffer) {
  if (!globalThis.crypto?.subtle) return "";
  const digest = await globalThis.crypto.subtle.digest("SHA-256", buffer);
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function readImageNaturalSize(file) {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve({ width: image.naturalWidth || 0, height: image.naturalHeight || 0 });
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      resolve({ width: 0, height: 0 });
    };
    image.src = url;
  });
}

function saveSchools() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.schools));
}

function loadCurrentSchoolId(schools) {
  const id = localStorage.getItem(CURRENT_SCHOOL_KEY) || "";
  return schools.some((school) => school.id === id) ? id : schools[0]?.id || null;
}

function saveCurrentSchoolId(id) {
  if (id) localStorage.setItem(CURRENT_SCHOOL_KEY, id);
  else localStorage.removeItem(CURRENT_SCHOOL_KEY);
}

function openSchoolDialog() {
  state.dialogSelection = state.selectedSchoolId
    ? { mode: "manage", schoolId: state.selectedSchoolId }
    : { mode: "new", schoolId: null };
  renderSchoolList();
  renderSchoolDialogPanels();
  clearFormNote();
  els.schoolDialog.showModal();
}

function chooseSchoolForManagement(id) {
  state.dialogSelection = { mode: "manage", schoolId: id };
  const school = state.schools.find((item) => item.id === id);
  resetFormDraft();
  state.formDraft.name = school?.name || "";
  renderSchoolList();
  renderSchoolDialogPanels();
}

function chooseNewSchoolPanel() {
  state.dialogSelection = { mode: "new", schoolId: null };
  resetFormDraft();
  renderSchoolList();
  renderSchoolDialogPanels();
}

function chooseDownloadPanel() {
  state.dialogSelection = { mode: "download", schoolId: null };
  resetFormDraft();
  clearFormNote();
  renderSchoolList();
  renderSchoolDialogPanels();
}

function enterSchool(id) {
  state.selectedSchoolId = id;
  saveCurrentSchoolId(id);
  els.schoolDialog.close();
  void renderAll({ fit: true });
}

function getSelectedSchool() {
  return state.schools.find((school) => school.id === state.selectedSchoolId) || null;
}

function getSelectedEditData() {
  const school = getSelectedSchool();
  if (!school) return createEmptyEditData();
  if (!state.editCache.has(school.id)) {
    state.editCache.set(school.id, createEmptyEditData());
  }
  return state.editCache.get(school.id);
}

async function renderAll(options = {}) {
  renderSchoolList();
  renderCurrentSchool();
  await renderGameView(options);
  renderEditorState();
  queueDraw();
}

function renderSchoolList() {
  els.newSchoolChoiceButton.classList.toggle("active", state.dialogSelection.mode === "new");
  els.downloadCatalogButton.classList.toggle("active", state.dialogSelection.mode === "download");
  els.schoolList.innerHTML = "";
  if (!state.schools.length) {
    const empty = document.createElement("div");
    empty.className = "empty-school";
    empty.textContent = "还没有学校。";
    els.schoolList.append(empty);
    return;
  }

  for (const school of state.schools) {
    const button = document.createElement("button");
    button.type = "button";
    button.draggable = true;
    button.dataset.schoolId = school.id;
    button.className = `school-card${school.id === state.dialogSelection.schoolId ? " active" : ""}`;
    button.textContent = school.name;
    button.addEventListener("click", () => chooseSchoolForManagement(school.id));
    button.addEventListener("dragstart", onSchoolDragStart);
    button.addEventListener("dragover", onSchoolDragOver);
    button.addEventListener("drop", onSchoolDrop);
    button.addEventListener("dragend", onSchoolDragEnd);
    els.schoolList.append(button);
  }
}

function onSchoolDragStart(event) {
  event.currentTarget.classList.add("dragging");
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("text/plain", event.currentTarget.dataset.schoolId || "");
}

function onSchoolDragOver(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
}

function onSchoolDrop(event) {
  event.preventDefault();
  const fromId = event.dataTransfer.getData("text/plain");
  const toId = event.currentTarget.dataset.schoolId;
  reorderSchools(fromId, toId);
}

function onSchoolDragEnd(event) {
  event.currentTarget.classList.remove("dragging");
}

function reorderSchools(fromId, toId) {
  if (!fromId || !toId || fromId === toId) return;
  const fromIndex = state.schools.findIndex((school) => school.id === fromId);
  const toIndex = state.schools.findIndex((school) => school.id === toId);
  if (fromIndex < 0 || toIndex < 0) return;
  const [moved] = state.schools.splice(fromIndex, 1);
  state.schools.splice(toIndex, 0, moved);
  saveSchools();
  renderSchoolList();
}

function renderSchoolDialogPanels() {
  const isDownload = state.dialogSelection.mode === "download";
  els.campusFormPanel.hidden = isDownload;
  els.downloadPanel.hidden = !isDownload;
  if (isDownload) {
    renderDownloadCatalog();
    return;
  }

  const isNew = state.dialogSelection.mode === "new";
  const school = !isNew
    ? state.schools.find((item) => item.id === state.dialogSelection.schoolId) || null
    : null;
  if (!isNew && !school) {
    chooseNewSchoolPanel();
    return;
  }

  const hasStructure = isNew ? Boolean(state.formDraft.editData) : Boolean(school.structureName);
  els.schoolNameInput.value = isNew ? state.formDraft.name : school.name;
  renderMapResourceInfo({ isNew, school });
  els.structureResourceInfo.textContent = isNew
    ? state.formDraft.structureFileName || "未导入"
    : school.structureName || "未导入";
  els.extraImagesResourceInfo.textContent = isNew
    ? `${state.formDraft.extraImages.length || 0} 张`
    : `${school.extraImageCount || 0} 张`;
  els.peopleResourceInfo.textContent = isNew
    ? state.formDraft.peopleFileName || "未导入"
    : school.peopleFileName || "未导入";

  els.createSchoolButton.textContent = isNew ? "创建并进入" : "进入";
  syncResourceSelectionState({ isNew, school, hasStructure });
}

function renderMapResourceInfo({ isNew, school }) {
  const name = isNew ? state.formDraft.mapImageName : school.mapImageName;
  const src = isNew ? state.draftMapPreviewUrl : state.mapImageUrls.get(school.id) || "";
  els.mapResourceInfo.replaceChildren();

  if (!name) {
    els.mapResourceInfo.textContent = "未导入";
    return;
  }

  const wrap = document.createElement("span");
  wrap.className = "map-thumb-wrap";
  wrap.title = name;

  if (src) {
    const img = document.createElement("img");
    img.className = "map-thumb";
    img.src = src;
    img.alt = "";
    wrap.append(img);
  } else {
    const placeholder = document.createElement("span");
    placeholder.className = "map-thumb placeholder";
    placeholder.textContent = "图";
    wrap.append(placeholder);
  }

  els.mapResourceInfo.append(wrap);
}

function syncResourceSelectionState({ isNew, school, hasStructure }) {
  const availability = {
    school: true,
    map: isNew ? Boolean(state.formDraft.mapImageName) : Boolean(school.mapImageName),
    structure: isNew ? Boolean(state.formDraft.structureFileName) : Boolean(school.structureName),
    extraImages: hasStructure && (isNew ? state.formDraft.extraImages.length > 0 : (school.extraImageCount || 0) > 0),
    people: hasStructure && (isNew ? Boolean(state.formDraft.peopleFileName) : Boolean(school.peopleFileName))
  };
  const selectable = {
    school: !isNew,
    map: availability.map,
    structure: availability.structure,
    extraImages: hasStructure && availability.extraImages,
    people: hasStructure && availability.people
  };

  for (const input of els.resourceSelects) {
    const key = input.dataset.resource;
    const disabled = !selectable[key];
    input.disabled = disabled;
    if (disabled) input.checked = false;
    input.closest(".resource-row")?.classList.toggle("disabled", disabled);
  }

  const selected = getSelectedResourceKeys();
  els.bulkExportButton.disabled = !selected.length;
  els.bulkDeleteButton.disabled = !selected.length;
  els.bulkImportButton.disabled = false;
}

function renderDownloadCatalog() {
  els.downloadList.innerHTML = "";
  for (const item of OFFICIAL_CATALOG) {
    const row = document.createElement("article");
    row.className = "download-item";

    const text = document.createElement("div");
    text.className = "download-copy";
    const title = document.createElement("strong");
    title.textContent = item.name;
    const meta = document.createElement("span");
    meta.textContent = item.version ? `${item.version} · ${item.description || "官方文件"}` : item.description || "官方文件";
    text.append(title, meta);

    const button = document.createElement("button");
    button.className = "secondary-button";
    button.type = "button";
    button.textContent = "下载到本地";
    button.addEventListener("click", () => {
      void downloadOfficialPackage(item);
    });

    row.append(text, button);
    els.downloadList.append(row);
  }
}

function getSelectedResourceKeys() {
  return [...els.resourceSelects]
    .filter((input) => input.checked && !input.disabled)
    .map((input) => input.dataset.resource);
}

function renderCurrentSchool() {
  const school = getSelectedSchool();
  els.currentSchool.textContent = school ? school.name : "未选择学校";
}

async function renderGameView(options = {}) {
  const school = getSelectedSchool();
  state.mapImage = null;
  state.mapNaturalSize = { width: 0, height: 0 };
  clearMapRenderCache();
  state.draftPolygon = [];
  state.activeStroke = null;
  state.structureObjectListKey = "";

  if (!school) {
    els.panelKicker.textContent = "信息";
    els.infoTitle.textContent = "";
    els.infoBody.textContent = "";
    els.gamePanel.hidden = true;
    els.mapActions.hidden = true;
    els.missingMapActions.hidden = true;
    els.mapEmpty.hidden = false;
    els.mapEmpty.textContent = "请选择或新建学校";
    state.editorEnabled = false;
    return;
  }

  renderSchoolInfoSummary(school);
  els.missingMapActions.hidden = true;

  els.mapEmpty.hidden = false;
  els.mapEmpty.textContent = "正在载入地图图片";
  const mapImageUrl = await getMapImageUrl(school);
  const editData = await getEditData(school.id);
  const gameData = await getGameData(school.id);
  state.editCache.set(school.id, editData);
  state.gameData = gameData;
  state.gameCache.set(school.id, gameData);
  state.gameDirty = false;

  if (mapImageUrl) {
    state.mapImage = await loadImageElement(mapImageUrl);
    state.mapNaturalSize = {
      width: state.mapImage.naturalWidth,
      height: state.mapImage.naturalHeight
    };
    initializeGameForCurrentMap(options);
    els.mapEmpty.hidden = true;
    els.missingMapActions.hidden = true;
    updateImagePalette();
    rebuildInteractionPreview();
    warmupMapRendering();
    if (state.editorEnabled) {
      if (options.fit) fitImageToView();
    } else {
      setGameViewToDefaultFollow();
    }
  } else {
    els.mapEmpty.hidden = false;
    els.mapEmpty.textContent = school.mapImageName
      ? "本地地图图片未找到，请在右侧重新导入地图图片。"
      : "这个学校还没有大地图图片";
    els.missingMapActions.hidden = false;
    els.mapActions.hidden = true;
    state.editorEnabled = false;
    clearMapRenderCache();
  }
  renderGamePanel();
}

function renderSchoolInfoSummary(school) {
  els.panelKicker.textContent = "信息";
  els.infoTitle.textContent = "";
  els.panelHeader.hidden = state.editorEnabled;
  els.infoTitle.hidden = state.editorEnabled;
  els.infoBody.hidden = state.editorEnabled;
  els.gamePanel.hidden = state.editorEnabled || !school || !state.mapImage;
  els.infoBody.textContent = "";
  els.gamePanel.hidden = state.editorEnabled || !school || !state.mapImage;
}

function initializeGameForCurrentMap(options = {}) {
  if (!state.mapNaturalSize.width || !state.mapNaturalSize.height) return;
  const player = state.gameData.player;
  const hasValidPosition = Number.isFinite(player.x) && Number.isFinite(player.y) && player.x > 0 && player.y > 0;
  if (!hasValidPosition || options.resetPlayer) {
    player.x = state.mapNaturalSize.width / 2;
    player.y = state.mapNaturalSize.height / 2;
    markGameDirty();
  }
  player.x = clamp(player.x, 0, state.mapNaturalSize.width);
  player.y = clamp(player.y, 0, state.mapNaturalSize.height);
  if (!canPlayerMoveTo(player)) {
    const walkable = findNearbyWalkablePoint(player) || { x: state.mapNaturalSize.width / 2, y: state.mapNaturalSize.height / 2 };
    player.x = walkable.x;
    player.y = walkable.y;
  }
  updateNearbyGameContext();
}

function setGameViewToDefaultFollow() {
  if (!state.mapImage) return;
  state.view.scale = clamp(1, state.view.minScale, state.view.maxScale);
  followPlayer();
  updateZoomReadout();
}

function followPlayer() {
  if (!state.mapImage || state.editorEnabled) return;
  const { width, height } = state.canvasSize;
  const player = state.gameData.player;
  state.view.x = width / 2 - player.x * state.view.scale;
  state.view.y = height / 2 - player.y * state.view.scale;
  clampView();
}

function startGameLoop() {
  if (state.gameLoopRunning) return;
  state.gameLoopRunning = true;
  state.lastGameFrameTime = performance.now();
  requestAnimationFrame(gameLoop);
}

function gameLoop(now) {
  state.gameLoopRunning = false;
  const dt = Math.min(0.05, Math.max(0, (now - (state.lastGameFrameTime || now)) / 1000));
  state.lastGameFrameTime = now;
  if (!state.editorEnabled && state.mapImage) {
    const moved = updateGameMovement(dt);
    if (moved || getMovementVector().x || getMovementVector().y) {
      state.gameLoopRunning = true;
      requestAnimationFrame(gameLoop);
    }
  }
}

function updateGameMovement(dt) {
  const vector = getMovementVector();
  if (!vector.x && !vector.y) return false;
  const player = state.gameData.player;
  const speed = (Number(player.walkSpeed) || DEFAULT_WALK_SPEED) * WALK_SPEED_FACTOR;
  const next = {
    x: clamp(player.x + vector.x * speed * dt, 0, state.mapNaturalSize.width),
    y: clamp(player.y + vector.y * speed * dt, 0, state.mapNaturalSize.height)
  };
  if (!canPlayerMoveTo(next)) return false;
  player.x = next.x;
  player.y = next.y;
  updateNearbyGameContext();
  followPlayer();
  markGameDirty({ defer: true });
  renderGamePanel();
  queueDraw();
  return true;
}

function getMovementVector() {
  let x = 0;
  let y = 0;
  if (state.movementKeys.has("ArrowLeft") || state.movementKeys.has("KeyA")) x -= 1;
  if (state.movementKeys.has("ArrowRight") || state.movementKeys.has("KeyD")) x += 1;
  if (state.movementKeys.has("ArrowUp") || state.movementKeys.has("KeyW")) y -= 1;
  if (state.movementKeys.has("ArrowDown") || state.movementKeys.has("KeyS")) y += 1;
  if (state.touchMoveVector.active) {
    x += state.touchMoveVector.x;
    y += state.touchMoveVector.y;
  }
  const length = Math.hypot(x, y);
  return length > 0 ? { x: x / length, y: y / length } : { x: 0, y: 0 };
}

function handleGameKeyDown(event) {
  if (state.editorEnabled || !state.mapImage) return false;
  const code = event.code;
  if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "KeyA", "KeyD", "KeyW", "KeyS"].includes(code)) return false;
  event.preventDefault();
  state.movementKeys.add(code);
  startGameLoop();
  return true;
}

function handleGameKeyUp(event) {
  const code = event.code;
  if (!state.movementKeys.has(code)) return false;
  state.movementKeys.delete(code);
  return true;
}

function canPlayerMoveTo(point) {
  if (!isPointOnVisibleMap(point)) return false;
  const sample = sampleStructureAt(point);
  return sample.walkable !== false;
}

function isPointOnVisibleMap(point) {
  if (!state.mapImage || !state.mapNaturalSize.width || !state.mapNaturalSize.height) return false;
  if (!Number.isFinite(point.x) || !Number.isFinite(point.y)) return false;
  if (point.x < 0 || point.y < 0 || point.x >= state.mapNaturalSize.width || point.y >= state.mapNaturalSize.height) return false;
  const editData = getSelectedEditData();
  if (editData.cropPolygon?.length >= 3 && !pointInPolygon(point, editData.cropPolygon)) return false;
  return !isTransparentMapPixel(point);
}

function isTransparentMapPixel(point) {
  if (!state.mapImage || !state.mapNaturalSize.width || !state.mapNaturalSize.height) return true;
  const canvas = state.mapAlphaSampleCanvas || (state.mapAlphaSampleCanvas = document.createElement("canvas"));
  canvas.width = 1;
  canvas.height = 1;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return false;
  const x = clamp(Math.floor(point.x), 0, state.mapNaturalSize.width - 1);
  const y = clamp(Math.floor(point.y), 0, state.mapNaturalSize.height - 1);
  ctx.clearRect(0, 0, 1, 1);
  ctx.drawImage(state.mapImage, x, y, 1, 1, 0, 0, 1, 1);
  return ctx.getImageData(0, 0, 1, 1).data[3] < 16;
}

function findNearbyWalkablePoint(origin) {
  if (canPlayerMoveTo(origin)) return { x: origin.x, y: origin.y };
  const step = Math.max(20, state.gameData.player.radius || DEFAULT_PLAYER_RADIUS);
  const maxRadius = Math.max(state.mapNaturalSize.width, state.mapNaturalSize.height);
  for (let radius = step; radius <= maxRadius; radius += step) {
    const samples = Math.max(12, Math.ceil(radius / step) * 8);
    for (let index = 0; index < samples; index++) {
      const angle = (Math.PI * 2 * index) / samples;
      const point = {
        x: clamp(origin.x + Math.cos(angle) * radius, 0, state.mapNaturalSize.width),
        y: clamp(origin.y + Math.sin(angle) * radius, 0, state.mapNaturalSize.height)
      };
      if (canPlayerMoveTo(point)) return point;
    }
  }
  return null;
}

async function toggleFullscreen() {
  if (!document.fullscreenElement) await document.documentElement.requestFullscreen?.();
  else await document.exitFullscreen?.();
  resizeCanvas();
  followPlayer();
  queueDraw();
}

async function getMapImageUrl(school) {
  if (!school.mapImageStored) return "";
  const cachedUrl = state.mapImageUrls.get(school.id);
  if (cachedUrl) return cachedUrl;
  const blob = await getMapImage(school.id);
  if (!blob) return "";
  const url = URL.createObjectURL(blob);
  state.objectUrls.add(url);
  state.mapImageUrls.set(school.id, url);
  return url;
}

function loadImageElement(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.decoding = "async";
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("地图图片加载失败"));
    image.src = src;
  });
}

function clearMapRenderCache() {
  state.interactionPreviewCanvas.width = 1;
  state.interactionPreviewCanvas.height = 1;
  state.mapAlphaSampleCanvas.width = 1;
  state.mapAlphaSampleCanvas.height = 1;
  state.interactionPreviewScale = 1;
  state.mapRenderWarm = false;
  clearStructureLayerCache();
}

function clearStructureLayerCache() {
  state.structureLayerCanvas.width = 1;
  state.structureLayerCanvas.height = 1;
  state.structureLayerKey = "";
  state.structureLayerDirty = true;
}

function markStructureLayerDirty() {
  state.structureLayerDirty = true;
}

function markGameDirty(options = {}) {
  state.gameDirty = true;
  const school = getSelectedSchool();
  if (!school) return;
  state.gameCache.set(school.id, state.gameData);
  if (!options.defer) {
    void saveCurrentGameData();
    return;
  }
  window.clearTimeout(state.gameSaveTimer);
  state.gameSaveTimer = window.setTimeout(() => {
    void saveCurrentGameData();
  }, 450);
}

async function saveCurrentGameData() {
  const school = getSelectedSchool();
  if (!school || !state.gameDirty) return;
  state.gameDirty = false;
  await putGameData(school.id, state.gameData);
}

function updateNearbyGameContext() {
  const player = state.gameData.player;
  const photoTarget = getNearbyPhotoSpotTarget(player);
  const structureTargets = getNearbyStructureTargets(player);
  const targets = photoTarget ? [photoTarget, ...structureTargets] : structureTargets;
  state.currentNearbyInteractionTargets = targets;
  state.currentNearbyPhotoSpotId = photoTarget?.id || "";
  state.currentNearbyBuildingIds = structureTargets.map((item) => item.id);
  if (photoTarget && state.defaultPhotoSpotInteractionKey !== photoTarget.key) {
    state.selectedNearbyInteractionKey = photoTarget.key;
    state.defaultPhotoSpotInteractionKey = photoTarget.key;
  } else if (!photoTarget) {
    state.defaultPhotoSpotInteractionKey = "";
  }
  if (!targets.some((item) => item.key === state.selectedNearbyInteractionKey)) {
    state.selectedNearbyInteractionKey = targets[0]?.key || "";
  }
  const selected = getSelectedNearbyInteractionTarget();
  state.gameData.selectedPhotoSpotId = selected?.kind === "photoSpot" ? selected.id : "";
  state.gameData.selectedBuildingId = selected?.kind === "structure" ? selected.id : "";
  if (selected?.kind === "photoSpot") {
    const selectedPhotoId = selected.spot?.photos?.[0]?.id || "";
    if (selectedPhotoId && !selected.spot.photos.some((photo) => photo.id === state.gameData.selectedSpotPhotoId)) {
      state.gameData.selectedSpotPhotoId = selectedPhotoId;
    }
    if (getSelectedSpotPhotoForEditId(selected.spot) !== state.selectedSpotPhotoForEditId) {
      state.selectedSpotPhotoForEditId = "";
    }
  } else {
    state.selectedSpotPhotoForEditId = "";
  }
  if (selected?.kind === "structure") getOrCreateBuildingMemory(selected.id);
}

function getActivePhotoSpot() {
  const id = state.gameData.selectedPhotoSpotId || state.currentNearbyPhotoSpotId;
  return state.gameData.photoSpots.find((spot) => spot.id === id) || null;
}

function getDisplayPhotoSpot() {
  const selected = getSelectedNearbyInteractionTarget();
  if (selected?.kind === "photoSpot") return state.gameData.photoSpots.find((spot) => spot.id === selected.id) || null;
  if (state.currentNearbyPhotoSpotId) return state.gameData.photoSpots.find((spot) => spot.id === state.currentNearbyPhotoSpotId) || null;
  return null;
}

function getNearbyInteractionTargets(point) {
  const photoTarget = getNearbyPhotoSpotTarget(point);
  const structureTargets = getNearbyStructureTargets(point);
  return photoTarget ? [photoTarget, ...structureTargets] : structureTargets;
}

function getSelectedNearbyInteractionTarget() {
  return state.currentNearbyInteractionTargets.find((item) => item.key === state.selectedNearbyInteractionKey)
    || state.currentNearbyInteractionTargets[0]
    || null;
}

function getNearbyPhotoSpotTarget(point) {
  const playerRadius = Number(state.gameData.player.radius) || DEFAULT_PLAYER_RADIUS;
  const maxDistance = Math.max(1, playerRadius * PHOTO_SPOT_INTERACT_RADIUS_FACTOR);
  let best = null;
  for (const spot of state.gameData.photoSpots) {
    const d = distance(point, spot);
    if (d > maxDistance) continue;
    if (!best || d < best.distance) {
      best = {
        id: spot.id,
        spot,
        kind: "photoSpot",
        distance: d,
        label: getPhotoSpotDisplayName(spot),
        key: `photoSpot:${spot.id}`
      };
    }
  }
  return best;
}

function getPhotoSpotDisplayName(spot) {
  if (!spot) return `${PHOTO_SPOT_NAME_PREFIX}00`;
  if (spot.name?.trim()) return spot.name.trim();
  const index = state.gameData.photoSpots.findIndex((item) => item.id === spot.id);
  return `${PHOTO_SPOT_NAME_PREFIX}${String(index >= 0 ? index + 1 : 1).padStart(2, "0")}`;
}

function getPhotoSpotDateValue(spot) {
  const raw = spot?.capturedAt || spot?.createdAt || "";
  if (!raw) return "";
  const date = new Date(raw);
  if (!Number.isFinite(date.getTime())) return "";
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function getNearbyStructureTargets(point) {
  const editData = getSelectedEditData();
  return (editData.structureRegions || [])
    .map((region) => {
      const areas = getRegionAreas(region);
      const bounds = getRegionLabelBounds(areas);
      const distance = bounds ? distanceToBounds(point, bounds) : Infinity;
      const preciseDistance = bounds ? distanceToRegion(point, areas, region) : Infinity;
      return bounds ? {
        id: region.id,
        region,
        bounds,
        distance: preciseDistance,
        label: getStructureInteractionLabel(region),
        kind: "structure",
        key: `structure:${region.id}`
      } : null;
    })
    .filter((item) => item && item.distance <= getInteractionRadiusForStructure(item.region))
    .sort((a, b) => a.distance - b.distance);
}

function getNearbyPhotoSpotTargets(point) {
  const target = getNearbyPhotoSpotTarget(point);
  return target ? [target] : [];
}

function getNearestPhotoSpotForMerge(point, radius = DEFAULT_PLAYER_RADIUS) {
  let best = null;
  let bestDistance = Infinity;
  for (const spot of state.gameData.photoSpots) {
    const d = distance(point, spot);
    if (d <= radius && d < bestDistance) {
      best = spot;
      bestDistance = d;
    }
  }
  return best;
}

function getInteractionRadiusForStructure(region) {
  const type = region?.type || "custom";
  if (type === "building") return 72;
  if (type === "field") return 96;
  if (type === "bridge" || type === "road") return 84;
  if (type === "gate") return 44;
  return 60;
}

function getStructureInteractionLabel(region) {
  const memory = state.gameData.buildings[region.id];
  if (memory?.customName) return memory.customName;
  return region?.name || TYPE_STYLES[region?.type || "custom"]?.label || "交互对象";
}

function distanceToBounds(point, bounds) {
  const dx = point.x < bounds.left ? bounds.left - point.x : point.x > bounds.right ? point.x - bounds.right : 0;
  const dy = point.y < bounds.top ? bounds.top - point.y : point.y > bounds.bottom ? point.y - bounds.bottom : 0;
  return Math.hypot(dx, dy);
}

function distanceToRegion(point, areas, region) {
  let best = Infinity;
  for (const area of areas || []) {
    if (isPointInStructureArea(point, area, region)) return 0;
    best = Math.min(best, distanceToArea(point, area));
  }
  return best;
}

function distanceToArea(point, area) {
  if (!area) return Infinity;
  if (area.kind === "line") {
    return distanceToPolyline(point, area.points || [], false) - Math.max(1, (Number(area.width) || LINEAR_STRUCTURE_WIDTH) / 2);
  }
  if (area.kind === "polygon") return distanceToPolyline(point, area.points || [], true);
  if (area.kind === "parallelogram") return distanceToPolyline(point, parallelogramPointsFromArea(area), true);
  if (area.kind === "rect") {
    return distanceToBounds(point, {
      left: Math.min(area.x, area.x + area.width),
      right: Math.max(area.x, area.x + area.width),
      top: Math.min(area.y, area.y + area.height),
      bottom: Math.max(area.y, area.y + area.height)
    });
  }
  if (area.kind === "ellipse") {
    const points = getAreaOutlinePoints(area);
    return distanceToPolyline(point, points, true);
  }
  if (area.kind === "pixels") {
    return distanceToPixelRunsBounds(point, area.pixels || []);
  }
  return Infinity;
}

function distanceToPolyline(point, points, closed) {
  if (!points?.length) return Infinity;
  if (points.length === 1) return distance(point, points[0]);
  let best = Infinity;
  for (let index = 1; index < points.length; index++) {
    best = Math.min(best, distanceToSegment(point, points[index - 1], points[index]));
  }
  if (closed && points.length > 2) {
    best = Math.min(best, distanceToSegment(point, points[points.length - 1], points[0]));
  }
  return Math.max(0, best);
}

function distanceToPixelRunsBounds(point, runs) {
  const bounds = pixelRunsBounds(runs || []);
  return bounds ? distanceToBounds(point, bounds) : Infinity;
}

function getStructureRegionById(id) {
  if (!id) return null;
  return getSelectedEditData().structureRegions.find((region) => region.id === id) || null;
}

function getOrCreateBuildingMemory(regionId) {
  if (!regionId) return null;
  if (!state.gameData.buildings[regionId]) {
    state.gameData.buildings[regionId] = normalizeGameBuilding({ id: regionId }, regionId);
  }
  return state.gameData.buildings[regionId];
}

function getSelectedBuildingMemory() {
  return getOrCreateBuildingMemory(state.gameData.selectedBuildingId || state.gameData.location.buildingId);
}

function peekSelectedBuildingMemory() {
  const id = state.gameData.selectedBuildingId || state.gameData.location.buildingId;
  return id ? state.gameData.buildings[id] || null : null;
}

function getSelectedRoom() {
  const building = getSelectedBuildingMemory();
  if (!building) return null;
  const id = state.gameData.selectedRoomId || state.gameData.location.roomId;
  return building.rooms.find((room) => room.id === id) || null;
}

function getSelectedPerson() {
  const room = getSelectedRoom();
  if (!room) return null;
  return room.people.find((person) => person.id === state.gameData.selectedPersonId) || null;
}

function getSelectedItem() {
  const room = getSelectedRoom();
  if (!room) return null;
  return room.items.find((item) => item.id === state.gameData.selectedItemId) || null;
}

function getBuildingDisplayName(region, memory = null) {
  return memory?.customName || region?.name || "未命名建筑";
}

function getBuildingRule(memory = null) {
  return BUILDING_CATEGORY_RULES[memory?.category] || BUILDING_CATEGORY_RULES.other;
}

function getPhotoUrl(photo) {
  if (!photo?.resource) return "";
  const key = photo.id || `${photo.resource.name}:${photo.resource.size}:${photo.resource.data?.slice(0, 16)}`;
  if (state.photoUrlCache.has(key)) return state.photoUrlCache.get(key);
  const blob = resourceRecordToBlob(photo.resource);
  if (!blob) return "";
  const url = URL.createObjectURL(blob);
  state.objectUrls.add(url);
  state.photoUrlCache.set(key, url);
  return url;
}

function renderGamePanel(options = {}) {
  const school = getSelectedSchool();
  const visible = Boolean(school && state.mapImage && !state.editorEnabled);
  els.gamePanel.hidden = !visible;
  els.mapActions.hidden = !visible;
  els.mapPhotoMarkersToggle.checked = state.gameData.settings.showPhotoMarkers !== false;
  els.mapInteractionMarkersToggle.checked = state.gameData.settings.showInteractionMarkers !== false;
  if (!visible) return;
  els.gamePanel.classList.toggle("inside-building", state.gameData.location.kind === "building");
  els.panelHeader.hidden = true;
  els.infoBody.hidden = true;
  const selectedTarget = getSelectedNearbyInteractionTarget();
  const spot = selectedTarget?.kind === "photoSpot" ? state.gameData.photoSpots.find((item) => item.id === selectedTarget.id) || null : null;
  const building = getSelectedBuildingMemory();
  const region = getStructureRegionById(state.gameData.selectedBuildingId || state.gameData.location.buildingId);
  const room = getSelectedRoom();
  const item = getSelectedItem();
  const person = getSelectedPerson();
  const key = JSON.stringify({
    location: state.gameData.location,
    spotId: spot?.id || "",
    spotPhotos: spot?.photos.length || 0,
    spotPhotoOrder: spot?.photos.map((photo) => photo.id).join(",") || "",
    spotIndex: spot?.activeIndex || 0,
    spotName: spot?.name || "",
    spotDate: spot?.capturedAt || "",
    spotSelectedPhotoId: state.gameData.selectedSpotPhotoId || "",
    spotEditPhotoId: state.selectedSpotPhotoForEditId || "",
    marker: state.gameData.settings.showPhotoMarkers,
    structureMarker: state.gameData.settings.showInteractionMarkers,
    selectedTargetKey: selectedTarget?.key || "",
    nearbyTargets: state.currentNearbyInteractionTargets.map((item) => item.key).join(","),
    buildingId: state.gameData.selectedBuildingId,
    buildingName: building?.customName || region?.name || "",
    buildingPhotos: building?.photos.length || 0,
    buildingPhotoIndex: building?.activePhotoIndex || 0,
    entrances: building?.entrances.length || 0,
    rooms: building?.rooms.length || 0,
    roomId: room?.id || "",
    roomPhotos: room?.photos.length || 0,
    roomPhotoIndex: room?.activePhotoIndex || 0,
    items: room?.items.length || 0,
    itemId: item?.id || "",
    itemPhotos: item?.photos.length || 0,
    itemIndex: item?.activePhotoIndex || 0,
    people: room?.people.length || 0,
    personId: person?.id || "",
    personPhoto: Boolean(person?.photo),
    chat: person?.chat.length || 0,
    playerPortrait: Boolean(state.gameData.player.portrait),
    nearbyBuildings: state.currentNearbyBuildingIds.join(","),
    notice: state.gameNotice
  });
  if (!options.force && key === state.gamePanelKey) return;
  state.gamePanelKey = key;
  if (state.gameData.location.kind === "building") {
    els.gamePanel.innerHTML = renderInteriorPanelHtml(building, room, item, person);
    return;
  }
  if (!selectedTarget) {
    els.gamePanel.innerHTML = "";
    return;
  }
  els.gamePanel.innerHTML = renderNearbyInteractionPanelHtml(selectedTarget, spot, region, building);
}

function renderNearbyInteractionPanelHtml(target, spot, region, building) {
  const chooser = renderNearbyInteractionChooserHtml();
  if (target.kind === "photoSpot") return chooser + renderPhotoPanelHtml(spot);
  if (target.kind === "structure") return chooser + renderCampusInteractionHtml(region, building);
  return "";
}

function renderNearbyInteractionChooserHtml() {
  const targets = state.currentNearbyInteractionTargets;
  if (targets.length <= 1) return "";
  const chips = targets.map((target) => `
    <button class="interaction-chip${target.key === state.selectedNearbyInteractionKey ? " active" : ""}" type="button" data-game-action="selectInteraction" data-interaction-key="${escapeAttr(target.key)}">${escapeHtml(target.label)}</button>
  `).join("");
  return `<div class="interaction-chip-row">${chips}</div>`;
}

function renderPhotoPanelHtml(spot) {
  if (!spot) return "";
  const target = getSelectedNearbyInteractionTarget();
  const selectedId = getSelectedSpotPhotoId(spot);
  const editSelectedId = getSelectedSpotPhotoForEditId(spot);
  const photoList = renderSpotPhotoListHtml(spot, selectedId);
  const spotTitle = getPhotoSpotDisplayName(spot);
  const canDeleteSpot = !spot.photos.length;
  const manyPhotos = spot.photos.length > 1;
  const editIndex = getSpotPhotoIndexById(spot, editSelectedId);
  const prevAction = editSelectedId ? "moveSpotPhotoBackward" : "prevSpotPhoto";
  const nextAction = editSelectedId ? "moveSpotPhotoForward" : "nextSpotPhoto";
  const prevLabel = editSelectedId ? "前移" : "上一张";
  const nextLabel = editSelectedId ? "后移" : "下一张";
  const prevDisabled = editSelectedId ? editIndex <= 0 : !manyPhotos;
  const nextDisabled = editSelectedId ? editIndex >= spot.photos.length - 1 : !manyPhotos;
  return `
    <section class="game-card photo-card">
      <div class="game-card-head">
        <strong>${escapeHtml(spotTitle)}</strong>
        <div class="game-card-head-actions">
          <span class="interaction-meta">最近 ${Math.round(target?.distance || 0)}px</span>
        </div>
      </div>
      <div class="spot-fields">
        <input class="game-input" data-game-field="photoSpotName" type="text" value="${escapeAttr(spot.name || "")}" placeholder="${escapeAttr(spotTitle)}">
        <input class="game-input" data-game-field="photoSpotDate" type="date" value="${escapeAttr(getPhotoSpotDateValue(spot))}">
      </div>
      <div class="photo-list" data-photo-list="spot">
        ${photoList || `<div class="photo-empty list-empty">还没有照片</div>`}
      </div>
      <div class="game-actions dense">
        <button class="secondary-button" type="button" data-game-action="${prevAction}" ${prevDisabled ? "disabled" : ""}>${prevLabel}</button>
        <button class="secondary-button" type="button" data-game-action="${nextAction}" ${nextDisabled ? "disabled" : ""}>${nextLabel}</button>
        <button class="secondary-button" type="button" data-game-action="savePhotoSpot">保存</button>
        <button class="secondary-button" type="button" data-game-action="uploadSpotPhoto">拍照</button>
        <button class="secondary-button danger" type="button" data-game-action="deletePhotoSpotSelected" ${canDeleteSpot || editSelectedId ? "" : "disabled"}>删除</button>
      </div>
      ${state.gameNotice ? `<div class="game-notice">${escapeHtml(state.gameNotice)}</div>` : ""}
    </section>
  `;
}

function renderSpotPhotoListHtml(spot, selectedId) {
  const editSelectedId = getSelectedSpotPhotoForEditId(spot);
  return (spot.photos || []).map((photo, index) => {
    const url = getPhotoUrl(photo);
    const active = photo.id === selectedId;
    const selected = photo.id === editSelectedId;
    return `
      <button class="photo-tile${active ? " active" : ""}${selected ? " selected" : ""}" type="button" data-game-action="selectSpotPhoto" data-photo-id="${escapeAttr(photo.id)}" data-photo-index="${index}">
        ${url ? `<img src="${url}" alt="">` : `<span>照片</span>`}
        <span class="photo-tile-index">${index + 1}</span>
      </button>
    `;
  }).join("");
}

function renderCampusInteractionHtml(region, building) {
  if (state.gameData.location.kind === "building") {
    return "";
  }
  if (!region || !building) return "";
  const hasBuilding = Boolean(region && building);
  const category = building?.category || "other";
  const categories = Object.entries(BUILDING_CATEGORY_RULES).map(([key, rule]) => `<option value="${key}" ${key === category ? "selected" : ""}>${rule.label}</option>`).join("");
  const buildingPhoto = building?.photos?.[clamp(building.activePhotoIndex || 0, 0, Math.max(0, building.photos.length - 1))] || null;
  const buildingPhotoUrl = buildingPhoto ? getPhotoUrl(buildingPhoto) : "";
  return `
    <section class="game-card campus-card">
      <div class="game-card-head"><strong>${escapeHtml(getStructureInteractionLabel(region))}</strong><span>${escapeHtml(TYPE_STYLES[region?.type || "custom"]?.label || "对象")}</span></div>
      <div class="building-editor" ${hasBuilding ? "" : "hidden"}>
        <input class="game-input" data-game-field="buildingName" type="text" value="${escapeAttr(building?.customName || region?.name || "")}" placeholder="建筑名称">
        <select class="game-input" data-game-field="buildingCategory">${categories}</select>
        <div class="mini-photo">
          ${buildingPhotoUrl ? `<img src="${buildingPhotoUrl}" alt="">` : `<span>建筑照片</span>`}
        </div>
        <div class="game-actions dense">
          <button class="secondary-button" type="button" data-game-action="saveBuildingName">命名</button>
          <button class="secondary-button" type="button" data-game-action="uploadBuildingPhoto">建筑图</button>
          <button class="secondary-button" type="button" data-game-action="prevBuildingPhoto" ${!building || building.photos.length < 2 ? "disabled" : ""}>上一张</button>
          <button class="secondary-button" type="button" data-game-action="nextBuildingPhoto" ${!building || building.photos.length < 2 ? "disabled" : ""}>下一张</button>
          <button class="secondary-button danger" type="button" data-game-action="deleteBuildingPhoto" ${!building || !building.photos.length ? "disabled" : ""}>删图</button>
          <button class="secondary-button" type="button" data-game-action="uploadEntrancePhoto">设入口</button>
          <button class="primary-button" type="button" data-game-action="enterBuilding" ${!building?.entrances?.some((entry) => entry.photo) ? "disabled" : ""}>进入</button>
        </div>
        <div class="entrance-list">${renderEntranceListHtml(building)}</div>
      </div>
    </section>
  `;
}

function renderEntranceListHtml(building) {
  if (!building?.entrances?.length) return `<span class="muted-inline">还没有入口</span>`;
  return building.entrances.map((entry, index) => `
    <span class="entrance-row">
      入口${index + 1}${entry.photo ? " 有图" : ""}
      <button class="mini-danger" type="button" data-game-action="deleteEntrance" data-entrance-id="${escapeAttr(entry.id)}">删</button>
    </span>
  `).join("");
}

function renderInteriorPanelHtml(building, room, item, person) {
  if (state.gameData.location.kind !== "building" || !building) return "";
  const rule = getBuildingRule(building);
  const roomOptions = rule.roomTypes.map((type) => `<option value="${escapeAttr(type)}">${escapeHtml(type)}</option>`).join("");
  const rooms = building.rooms.map((item) => `
    <button class="room-chip${item.id === state.gameData.selectedRoomId ? " active" : ""}" type="button" data-game-action="selectRoom" data-room-id="${escapeAttr(item.id)}">${escapeHtml(item.name || item.type)}</button>
  `).join("");
  const roomItems = room?.items?.map((entry) => `
    <button class="item-chip${entry.id === state.gameData.selectedItemId ? " active" : ""}" type="button" data-game-action="selectItem" data-item-id="${escapeAttr(entry.id)}">${escapeHtml(entry.name || rule.itemLabel)}</button>
  `).join("") || "";
  const people = room?.people?.map((item) => `
    <button class="person-chip${item.id === state.gameData.selectedPersonId ? " active" : ""}" type="button" data-game-action="selectPerson" data-person-id="${escapeAttr(item.id)}">${escapeHtml(item.name || "未命名")}</button>
  `).join("") || "";
  const roomPhoto = room?.photos?.[clamp(room.activePhotoIndex || 0, 0, Math.max(0, (room.photos?.length || 1) - 1))] || null;
  const roomPhotoUrl = roomPhoto ? getPhotoUrl(roomPhoto) : "";
  const dormPlayerPortraitHtml = building.category === "dormitory" && room ? `
        <div class="player-portrait-card">
          <span class="player-portrait-status">${state.gameData.player.portrait ? "形象已设置" : "形象未设置"}</span>
          <button class="secondary-button" type="button" data-game-action="uploadPlayerPortrait">设形象</button>
        </div>
  ` : "";
  const itemPhoto = item?.photos?.[clamp(item.activePhotoIndex || 0, 0, Math.max(0, (item.photos?.length || 1) - 1))] || null;
  const itemPhotoUrl = itemPhoto ? getPhotoUrl(itemPhoto) : "";
  const personPhotoUrl = person?.photo ? getPhotoUrl(person.photo) : "";
  return `
    <section class="game-card interior-card">
      <div class="game-card-head">
        <strong>${escapeHtml(rule.label)}</strong>
        <button class="secondary-button compact" type="button" data-game-action="exitBuilding">返回地图</button>
      </div>
      <div class="room-add-row">
        <input class="game-input" data-game-field="newRoomName" type="text" placeholder="名称">
        <select class="game-input" data-game-field="newRoomType">${roomOptions}</select>
        <button class="secondary-button" type="button" data-game-action="addRoom">加房间</button>
      </div>
      <div class="room-chip-row">${rooms || `<span class="muted-inline">添加房间后管理照片和人物</span>`}</div>
      <div class="room-detail" ${room ? "" : "hidden"}>
        <div class="mini-photo wide">
          ${roomPhotoUrl ? `<img src="${roomPhotoUrl}" alt="">` : `<span>房间照片</span>`}
        </div>
        <div class="game-actions dense">
          <button class="secondary-button" type="button" data-game-action="uploadRoomPhoto">房间图</button>
          <button class="secondary-button" type="button" data-game-action="prevRoomPhoto" ${!room || room.photos.length < 2 ? "disabled" : ""}>上一张</button>
          <button class="secondary-button" type="button" data-game-action="nextRoomPhoto" ${!room || room.photos.length < 2 ? "disabled" : ""}>下一张</button>
          <button class="secondary-button danger" type="button" data-game-action="deleteRoomPhoto" ${!room || !room.photos.length ? "disabled" : ""}>删图</button>
          <button class="secondary-button danger" type="button" data-game-action="deleteRoom">删房间</button>
        </div>
        ${dormPlayerPortraitHtml}
        <div class="item-add-row">
          <input class="game-input" data-game-field="newItemName" type="text" placeholder="${escapeAttr(rule.itemLabel)}">
          <button class="secondary-button" type="button" data-game-action="addItem">加${escapeHtml(rule.itemLabel)}</button>
        </div>
        <div class="item-chip-row">${roomItems || `<span class="muted-inline">添加${escapeHtml(rule.itemLabel)}后可保存照片和备注</span>`}</div>
        <div class="item-detail" ${item ? "" : "hidden"}>
          <div class="item-top">
            <div class="item-photo">${itemPhotoUrl ? `<img src="${itemPhotoUrl}" alt="">` : `<span>照片</span>`}</div>
            <div class="item-fields">
              <input class="game-input" data-game-field="itemName" type="text" value="${escapeAttr(item?.name || "")}" placeholder="${escapeAttr(rule.itemLabel)}名称">
              <textarea class="game-input" data-game-field="itemDescription" placeholder="备注">${escapeHtml(item?.description || "")}</textarea>
            </div>
          </div>
          <div class="game-actions dense">
            <button class="secondary-button" type="button" data-game-action="uploadItemPhoto">加照片</button>
            <button class="secondary-button" type="button" data-game-action="prevItemPhoto" ${!item || item.photos.length < 2 ? "disabled" : ""}>上一张</button>
            <button class="secondary-button" type="button" data-game-action="nextItemPhoto" ${!item || item.photos.length < 2 ? "disabled" : ""}>下一张</button>
            <button class="secondary-button" type="button" data-game-action="saveItem">保存</button>
            <button class="secondary-button danger" type="button" data-game-action="deleteItemPhoto" ${!item || !item.photos.length ? "disabled" : ""}>删图</button>
            <button class="secondary-button danger" type="button" data-game-action="deleteItem">删除</button>
          </div>
        </div>
        <div class="person-add-row">
          <input class="game-input" data-game-field="newPersonName" type="text" placeholder="${escapeAttr(rule.personLabel)}">
          <button class="secondary-button" type="button" data-game-action="addPerson">加人物</button>
        </div>
        <div class="person-chip-row">${people}</div>
        <div class="person-detail" ${person ? "" : "hidden"}>
          <div class="person-top">
            <div class="person-photo">${personPhotoUrl ? `<img src="${personPhotoUrl}" alt="">` : `<span>照片</span>`}</div>
            <div class="person-fields">
              <input class="game-input" data-game-field="personName" type="text" value="${escapeAttr(person?.name || "")}" placeholder="姓名">
              <textarea class="game-input" data-game-field="personDescription" placeholder="背景资料">${escapeHtml(person?.description || "")}</textarea>
            </div>
          </div>
          <div class="game-actions dense">
            <button class="secondary-button" type="button" data-game-action="uploadPersonPhoto">人物图</button>
            <button class="secondary-button" type="button" data-game-action="savePerson">保存</button>
            <button class="secondary-button" type="button" data-game-action="sayHello">你好</button>
            <button class="secondary-button danger" type="button" data-game-action="deletePerson">删人物</button>
          </div>
          <div class="chat-log">${renderChatLogHtml(person)}</div>
        </div>
      </div>
    </section>
  `;
}

function renderChatLogHtml(person) {
  if (!person?.chat?.length) return `<span class="muted-inline">还没有聊天记录</span>`;
  return person.chat.slice(-6).map((message) => `<div class="chat-line ${message.from}">${escapeHtml(message.text)}</div>`).join("");
}

function onGamePanelClick(event) {
  const button = event.target.closest("[data-game-action]");
  if (!button) return;
  if (button.matches('input[type="checkbox"]')) return;
  const action = button.dataset.gameAction;
  if (!action) return;
  if (button.tagName !== "INPUT") event.preventDefault();
  handleGameAction(action, button);
}

function onGamePanelInput(event) {
  const field = event.target.closest("[data-game-field]");
  if (!field) return;
  const name = field.dataset.gameField;
  if (name === "buildingCategory") {
    const building = getSelectedBuildingMemory();
    if (!building) return;
    building.category = BUILDING_CATEGORY_RULES[field.value] ? field.value : "other";
    building.updatedAt = new Date().toISOString();
    markGameDirty({ defer: true });
  } else if (name === "photoSpotName" || name === "photoSpotDate") {
    saveActivePhotoSpotMeta({ defer: true, silent: true });
  }
}

function onGamePanelChange() {}

function handleGameAction(action, button) {
  switch (action) {
    case "uploadSpotPhoto":
      els.spotPhotoInput.click();
      return;
    case "savePhotoSpot":
      saveActivePhotoSpotMeta();
      return;
    case "selectSpotPhoto":
      selectSpotPhoto(button.dataset.photoId || "");
      return;
    case "prevSpotPhoto":
      cycleSpotPhoto(-1);
      return;
    case "nextSpotPhoto":
      cycleSpotPhoto(1);
      return;
    case "moveSpotPhotoBackward":
      moveSelectedSpotPhoto(-1);
      return;
    case "moveSpotPhotoForward":
      moveSelectedSpotPhoto(1);
      return;
    case "deletePhotoSpotSelected":
      deleteSelectedPhotoOrSpot();
      return;
    case "selectBuilding":
      selectBuilding(button.dataset.buildingId || "");
      return;
    case "selectInteraction":
      selectNearbyInteraction(button.dataset.interactionKey || "");
      return;
    case "saveBuildingName":
      saveSelectedBuildingMeta();
      return;
    case "uploadBuildingPhoto":
      els.buildingPhotoInput.click();
      return;
    case "prevBuildingPhoto":
      cycleBuildingPhoto(-1);
      return;
    case "nextBuildingPhoto":
      cycleBuildingPhoto(1);
      return;
    case "deleteBuildingPhoto":
      deleteSelectedBuildingPhoto();
      return;
    case "uploadEntrancePhoto":
      els.entrancePhotoInput.click();
      return;
    case "deleteEntrance":
      deleteEntrance(button.dataset.entranceId || "");
      return;
    case "enterBuilding":
      enterSelectedBuilding();
      return;
    case "exitBuilding":
      exitBuilding();
      return;
    case "addRoom":
      addRoomToSelectedBuilding();
      return;
    case "selectRoom":
      selectRoom(button.dataset.roomId || "");
      return;
    case "uploadRoomPhoto":
      els.roomPhotoInput.click();
      return;
    case "uploadPlayerPortrait":
      if (getSelectedBuildingMemory()?.category !== "dormitory" || !getSelectedRoom()) {
        setGameNotice("请先进入寝室");
        return;
      }
      els.playerPortraitInput.click();
      return;
    case "prevRoomPhoto":
      cycleRoomPhoto(-1);
      return;
    case "nextRoomPhoto":
      cycleRoomPhoto(1);
      return;
    case "deleteRoomPhoto":
      deleteSelectedRoomPhoto();
      return;
    case "deleteRoom":
      deleteSelectedRoom();
      return;
    case "addItem":
      addItemToSelectedRoom();
      return;
    case "selectItem":
      selectItem(button.dataset.itemId || "");
      return;
    case "uploadItemPhoto":
      els.itemPhotoInput.click();
      return;
    case "prevItemPhoto":
      cycleItemPhoto(-1);
      return;
    case "nextItemPhoto":
      cycleItemPhoto(1);
      return;
    case "saveItem":
      saveSelectedItem();
      return;
    case "deleteItemPhoto":
      deleteSelectedItemPhoto();
      return;
    case "deleteItem":
      deleteSelectedItem();
      return;
    case "addPerson":
      addPersonToSelectedRoom();
      return;
    case "selectPerson":
      selectPerson(button.dataset.personId || "");
      return;
    case "uploadPersonPhoto":
      els.personPhotoInput.click();
      return;
    case "savePerson":
      saveSelectedPerson();
      return;
    case "sayHello":
      sayHelloToSelectedPerson();
      return;
    case "deletePerson":
      deleteSelectedPerson();
      return;
    default:
      return;
  }
}

async function addPhotosAtPlayer(files) {
  const records = await filesToResourceRecords(files);
  const spot = getActivePhotoSpot();
  if (!spot) {
    setGameNotice("请先建立拍照点");
    renderGamePanel({ force: true });
    return;
  }
  for (const record of records) {
    spot.photos.push(createPhotoFromResource(record));
  }
  spot.activeIndex = Math.max(0, spot.photos.length - 1);
  state.gameData.selectedSpotPhotoId = spot.photos[spot.activeIndex]?.id || "";
  state.selectedSpotPhotoForEditId = "";
  spot.updatedAt = new Date().toISOString();
  state.gameData.selectedPhotoSpotId = spot.id;
  setGameNotice(`已添加 ${records.length} 张照片`);
  markGameDirty();
  renderGamePanel({ force: true });
  queueDraw();
}

function createPhotoSpotAtPlayer(options = {}) {
  const player = state.gameData.player;
  const minDistance = getPhotoSpotMinDistance();
  const existing = getNearestPhotoSpotForMerge(player, minDistance);
  if (existing) {
    if (!options.silent) {
      setGameNotice("距离现有拍照点过近");
      renderGamePanel({ force: true });
    }
    return null;
  }
  const now = new Date().toISOString();
  const spot = {
    id: createId("spot"),
    x: player.x,
    y: player.y,
    name: "",
    capturedAt: now,
    radius: Number(player.radius) || DEFAULT_PLAYER_RADIUS,
    visible: true,
    activeIndex: 0,
    photos: [],
    createdAt: now,
    updatedAt: now
  };
  state.gameData.photoSpots.push(spot);
  state.gameData.selectedPhotoSpotId = spot.id;
  state.gameData.selectedSpotPhotoId = "";
  state.selectedSpotPhotoForEditId = "";
  state.selectedNearbyInteractionKey = `photoSpot:${spot.id}`;
  updateNearbyGameContext();
  markGameDirty();
  if (!options.silent) setGameNotice(`${getPhotoSpotDisplayName(spot)} 已建立`);
  renderGamePanel({ force: true });
  queueDraw();
  return spot;
}

function getPhotoSpotMinDistance() {
  const playerRadius = Number(state.gameData.player.radius) || DEFAULT_PLAYER_RADIUS;
  return Math.max(18, playerRadius * PHOTO_SPOT_MERGE_FACTOR);
}

function createPhotoFromResource(record) {
  return normalizePhotoRecord({
    id: createId("photo"),
    name: record.name || "photo",
    resource: record,
    createdAt: new Date().toISOString()
  });
}

function getSelectedSpotPhotoId(spot) {
  if (!spot?.photos.length) return "";
  const selected = state.gameData.selectedSpotPhotoId;
  if (selected && spot.photos.some((photo) => photo.id === selected)) return selected;
  const index = clamp(spot.activeIndex || 0, 0, spot.photos.length - 1);
  return spot.photos[index]?.id || spot.photos[0]?.id || "";
}

function getSpotPhotoIndexById(spot, photoId) {
  if (!spot || !photoId) return -1;
  return spot.photos.findIndex((photo) => photo.id === photoId);
}

function getSelectedSpotPhotoForEditId(spot) {
  const selected = state.selectedSpotPhotoForEditId;
  return getSpotPhotoIndexById(spot, selected) >= 0 ? selected : "";
}

function selectSpotPhoto(photoId) {
  const spot = getActivePhotoSpot();
  if (!spot || !photoId || !spot.photos.some((photo) => photo.id === photoId)) return;
  state.gameData.selectedSpotPhotoId = photoId;
  spot.activeIndex = spot.photos.findIndex((photo) => photo.id === photoId);
  state.selectedSpotPhotoForEditId = state.selectedSpotPhotoForEditId === photoId ? "" : photoId;
  markGameDirty({ defer: true });
  renderGamePanel({ force: true });
}

function cycleSpotPhoto(direction) {
  const spot = getActivePhotoSpot();
  if (!spot || spot.photos.length < 2) return;
  const currentId = getSelectedSpotPhotoId(spot);
  const currentIndex = Math.max(0, getSpotPhotoIndexById(spot, currentId));
  const nextIndex = (currentIndex + Math.sign(direction || 1) + spot.photos.length) % spot.photos.length;
  const photo = spot.photos[nextIndex];
  state.gameData.selectedSpotPhotoId = photo.id;
  state.selectedSpotPhotoForEditId = "";
  spot.activeIndex = nextIndex;
  markGameDirty({ defer: true });
  renderGamePanel({ force: true });
}

function moveSelectedSpotPhoto(direction) {
  const spot = getActivePhotoSpot();
  if (!spot || spot.photos.length < 2) return;
  const selectedId = getSelectedSpotPhotoForEditId(spot);
  const from = getSpotPhotoIndexById(spot, selectedId);
  if (from < 0) return;
  const to = clamp(from + Math.sign(direction || 1), 0, spot.photos.length - 1);
  if (from === to) return;
  reorderSpotPhotos(from, to);
}

function deleteSelectedPhotoOrSpot() {
  const spot = getActivePhotoSpot();
  if (!spot) return;
  const selectedPhotoId = getSelectedSpotPhotoForEditId(spot);
  if (selectedPhotoId) {
    const index = spot.photos.findIndex((photo) => photo.id === selectedPhotoId);
    if (index >= 0) {
      spot.photos.splice(index, 1);
      const nextPhoto = spot.photos[Math.min(index, spot.photos.length - 1)] || null;
      state.gameData.selectedSpotPhotoId = nextPhoto?.id || "";
      state.selectedSpotPhotoForEditId = "";
      spot.activeIndex = nextPhoto ? spot.photos.findIndex((photo) => photo.id === nextPhoto.id) : 0;
      spot.updatedAt = new Date().toISOString();
      setGameNotice("图片已删除");
      markGameDirty();
      renderGamePanel({ force: true });
      queueDraw();
    }
    return;
  }
  if (spot.photos.length) return;
  deleteActiveSpot();
}

function deleteActiveSpot() {
  const spot = getActivePhotoSpot();
  if (!spot || spot.photos.length) return;
  state.gameData.photoSpots = state.gameData.photoSpots.filter((item) => item.id !== spot.id);
  state.gameData.selectedPhotoSpotId = "";
  state.gameData.selectedSpotPhotoId = "";
  state.selectedSpotPhotoForEditId = "";
  state.currentNearbyPhotoSpotId = "";
  state.selectedNearbyInteractionKey = "";
  state.defaultPhotoSpotInteractionKey = "";
  updateNearbyGameContext();
  setGameNotice("拍照点已删除");
  markGameDirty();
  renderGamePanel({ force: true });
  queueDraw();
}

function saveActivePhotoSpotMeta(options = {}) {
  const spot = getActivePhotoSpot();
  if (!spot) return;
  const nameInput = els.gamePanel.querySelector('[data-game-field="photoSpotName"]');
  const dateInput = els.gamePanel.querySelector('[data-game-field="photoSpotDate"]');
  spot.name = nameInput?.value?.trim() || "";
  const dateValue = dateInput?.value || "";
  spot.capturedAt = dateValue ? new Date(`${dateValue}T00:00:00`).toISOString() : (spot.capturedAt || new Date().toISOString());
  spot.updatedAt = new Date().toISOString();
  markGameDirty(options.defer ? { defer: true } : {});
  if (!options.silent) setGameNotice("拍照点已保存");
  if (!options.silent) renderGamePanel({ force: true });
  queueDraw();
}

function reorderSpotPhotos(fromIndex, toIndex) {
  const spot = getActivePhotoSpot();
  if (!spot || spot.photos.length < 2) return;
  const from = clamp(Number(fromIndex), 0, spot.photos.length - 1);
  const to = clamp(Number(toIndex), 0, spot.photos.length - 1);
  if (from === to) return;
  const [photo] = spot.photos.splice(from, 1);
  spot.photos.splice(to, 0, photo);
  state.gameData.selectedSpotPhotoId = photo.id;
  state.selectedSpotPhotoForEditId = photo.id;
  spot.activeIndex = to;
  spot.updatedAt = new Date().toISOString();
  markGameDirty();
  renderGamePanel({ force: true });
}

function selectBuilding(buildingId) {
  const region = getStructureRegionById(buildingId);
  if (!region) return;
  state.gameData.selectedBuildingId = buildingId;
  state.selectedNearbyInteractionKey = `structure:${buildingId}`;
  getOrCreateBuildingMemory(buildingId);
  markGameDirty({ defer: true });
  renderGamePanel({ force: true });
  queueDraw();
}

function selectNearbyInteraction(key) {
  if (!key) return;
  const target = state.currentNearbyInteractionTargets.find((item) => item.key === key);
  if (!target) return;
  state.selectedNearbyInteractionKey = key;
  state.gameData.selectedPhotoSpotId = target.kind === "photoSpot" ? target.id : "";
  state.gameData.selectedBuildingId = target.kind === "structure" ? target.id : "";
  state.gameData.selectedSpotPhotoId = target.kind === "photoSpot" ? (target.spot?.photos?.[0]?.id || state.gameData.selectedSpotPhotoId || "") : state.gameData.selectedSpotPhotoId;
  state.selectedSpotPhotoForEditId = "";
  if (target.kind === "structure") getOrCreateBuildingMemory(target.id);
  markGameDirty({ defer: true });
  renderGamePanel({ force: true });
  queueDraw();
}

function saveSelectedBuildingMeta() {
  const building = getSelectedBuildingMemory();
  const region = getStructureRegionById(state.gameData.selectedBuildingId);
  if (!building || !region) return;
  const nameInput = els.gamePanel.querySelector('[data-game-field="buildingName"]');
  const categoryInput = els.gamePanel.querySelector('[data-game-field="buildingCategory"]');
  const name = nameInput?.value?.trim() || "";
  building.customName = name;
  building.category = BUILDING_CATEGORY_RULES[categoryInput?.value] ? categoryInput.value : building.category;
  region.name = name || region.name || "";
  building.updatedAt = new Date().toISOString();
  commitStructureDataChange();
  markGameDirty();
  setGameNotice("建筑已保存");
  renderGamePanel({ force: true });
  queueDraw();
}

async function addPhotosToSelectedBuilding(files) {
  const building = getSelectedBuildingMemory();
  if (!building) return;
  const records = await filesToResourceRecords(files);
  for (const record of records) building.photos.push(createPhotoFromResource(record));
  building.activePhotoIndex = Math.max(0, building.photos.length - 1);
  building.updatedAt = new Date().toISOString();
  markGameDirty();
  renderGamePanel({ force: true });
}

function cycleBuildingPhoto(delta) {
  const building = getSelectedBuildingMemory();
  if (!building?.photos.length) return;
  building.activePhotoIndex = wrapIndex((building.activePhotoIndex || 0) + delta, building.photos.length);
  markGameDirty({ defer: true });
  renderGamePanel({ force: true });
}

function deleteSelectedBuildingPhoto() {
  const building = getSelectedBuildingMemory();
  if (!building?.photos.length) return;
  const index = clamp(building.activePhotoIndex || 0, 0, building.photos.length - 1);
  building.photos.splice(index, 1);
  building.activePhotoIndex = clamp(index, 0, Math.max(0, building.photos.length - 1));
  building.updatedAt = new Date().toISOString();
  markGameDirty();
  renderGamePanel({ force: true });
}

async function addEntranceAtPlayer(file) {
  const building = getSelectedBuildingMemory();
  const region = getStructureRegionById(state.gameData.selectedBuildingId);
  if (!building || !region) return;
  const player = state.gameData.player;
  const nearby = getNearbyStructureTargets(player).some((item) => item.id === region.id);
  if (!nearby) {
    setGameNotice("需要靠近建筑才能设置入口");
    renderGamePanel({ force: true });
    return;
  }
  const record = await blobToResourceRecord(file, file.name || "entrance");
  building.entrances.push({
    id: createId("entrance"),
    x: player.x,
    y: player.y,
    photo: createPhotoFromResource(record),
    createdAt: new Date().toISOString()
  });
  building.updatedAt = new Date().toISOString();
  markGameDirty();
  setGameNotice("入口已添加");
  renderGamePanel({ force: true });
  queueDraw();
}

function deleteEntrance(entranceId) {
  const building = getSelectedBuildingMemory();
  if (!building || !entranceId) return;
  building.entrances = building.entrances.filter((entry) => entry.id !== entranceId);
  building.updatedAt = new Date().toISOString();
  markGameDirty();
  renderGamePanel({ force: true });
  queueDraw();
}

function enterSelectedBuilding() {
  const building = getSelectedBuildingMemory();
  const regionId = state.gameData.selectedBuildingId;
  if (!building || !regionId || !building.entrances.some((entry) => entry.photo)) return;
  state.gameData.location = { kind: "building", buildingId: regionId, roomId: "" };
  state.gameData.selectedRoomId = building.rooms[0]?.id || "";
  state.gameData.selectedItemId = "";
  state.gameData.selectedPersonId = "";
  markGameDirty();
  renderGamePanel({ force: true });
  queueDraw();
}

function exitBuilding() {
  state.gameData.location = { kind: "campus", buildingId: "", roomId: "" };
  state.gameData.selectedRoomId = "";
  state.gameData.selectedItemId = "";
  state.gameData.selectedPersonId = "";
  updateNearbyGameContext();
  followPlayer();
  markGameDirty();
  renderGamePanel({ force: true });
  queueDraw();
}

function addRoomToSelectedBuilding() {
  const building = getSelectedBuildingMemory();
  if (!building) return;
  const name = els.gamePanel.querySelector('[data-game-field="newRoomName"]')?.value?.trim() || "";
  const type = els.gamePanel.querySelector('[data-game-field="newRoomType"]')?.value || getBuildingRule(building).roomTypes[0] || "房间";
  const room = normalizeRoom({
    id: createId("room"),
    name: name || type,
    type,
    createdAt: new Date().toISOString()
  });
  building.rooms.push(room);
  state.gameData.selectedRoomId = room.id;
  state.gameData.location.roomId = room.id;
  state.gameData.selectedItemId = "";
  state.gameData.selectedPersonId = "";
  building.updatedAt = new Date().toISOString();
  markGameDirty();
  renderGamePanel({ force: true });
  queueDraw();
}

function selectRoom(roomId) {
  const building = getSelectedBuildingMemory();
  if (!building?.rooms.some((room) => room.id === roomId)) return;
  state.gameData.selectedRoomId = roomId;
  state.gameData.location.roomId = roomId;
  state.gameData.selectedItemId = "";
  state.gameData.selectedPersonId = "";
  markGameDirty({ defer: true });
  renderGamePanel({ force: true });
  queueDraw();
}

async function addPhotosToSelectedRoom(files) {
  const room = getSelectedRoom();
  if (!room) return;
  const records = await filesToResourceRecords(files);
  for (const record of records) room.photos.push(createPhotoFromResource(record));
  room.activePhotoIndex = Math.max(0, room.photos.length - 1);
  room.updatedAt = new Date().toISOString();
  markGameDirty();
  renderGamePanel({ force: true });
  queueDraw();
}

function cycleRoomPhoto(delta) {
  const room = getSelectedRoom();
  if (!room?.photos.length) return;
  room.activePhotoIndex = wrapIndex((room.activePhotoIndex || 0) + delta, room.photos.length);
  markGameDirty({ defer: true });
  renderGamePanel({ force: true });
}

function deleteSelectedRoomPhoto() {
  const room = getSelectedRoom();
  if (!room?.photos.length) return;
  const index = clamp(room.activePhotoIndex || 0, 0, room.photos.length - 1);
  room.photos.splice(index, 1);
  room.activePhotoIndex = clamp(index, 0, Math.max(0, room.photos.length - 1));
  room.updatedAt = new Date().toISOString();
  markGameDirty();
  renderGamePanel({ force: true });
  queueDraw();
}

function deleteSelectedRoom() {
  const building = getSelectedBuildingMemory();
  const room = getSelectedRoom();
  if (!building || !room) return;
  building.rooms = building.rooms.filter((item) => item.id !== room.id);
  state.gameData.selectedRoomId = building.rooms[0]?.id || "";
  state.gameData.location.roomId = state.gameData.selectedRoomId;
  state.gameData.selectedItemId = "";
  state.gameData.selectedPersonId = "";
  markGameDirty();
  renderGamePanel({ force: true });
  queueDraw();
}

function addItemToSelectedRoom() {
  const room = getSelectedRoom();
  if (!room) return;
  const building = getSelectedBuildingMemory();
  const rule = getBuildingRule(building);
  const name = els.gamePanel.querySelector('[data-game-field="newItemName"]')?.value?.trim() || "";
  const item = normalizeMemoryItem({
    id: createId("item"),
    name: name || rule.itemLabel,
    createdAt: new Date().toISOString()
  });
  room.items.push(item);
  state.gameData.selectedItemId = item.id;
  room.updatedAt = new Date().toISOString();
  markGameDirty();
  renderGamePanel({ force: true });
}

function selectItem(itemId) {
  const room = getSelectedRoom();
  if (!room?.items.some((item) => item.id === itemId)) return;
  state.gameData.selectedItemId = itemId;
  markGameDirty({ defer: true });
  renderGamePanel({ force: true });
}

async function addPhotosToSelectedItem(files) {
  const item = getSelectedItem();
  if (!item) return;
  const records = await filesToResourceRecords(files);
  for (const record of records) item.photos.push(createPhotoFromResource(record));
  item.activePhotoIndex = Math.max(0, item.photos.length - 1);
  item.updatedAt = new Date().toISOString();
  markGameDirty();
  renderGamePanel({ force: true });
}

function cycleItemPhoto(delta) {
  const item = getSelectedItem();
  if (!item?.photos.length) return;
  item.activePhotoIndex = wrapIndex((item.activePhotoIndex || 0) + delta, item.photos.length);
  markGameDirty({ defer: true });
  renderGamePanel({ force: true });
}

function saveSelectedItem() {
  const item = getSelectedItem();
  if (!item) return;
  item.name = els.gamePanel.querySelector('[data-game-field="itemName"]')?.value?.trim() || item.name;
  item.description = els.gamePanel.querySelector('[data-game-field="itemDescription"]')?.value?.trim() || "";
  item.updatedAt = new Date().toISOString();
  markGameDirty();
  renderGamePanel({ force: true });
}

function deleteSelectedItemPhoto() {
  const item = getSelectedItem();
  if (!item?.photos.length) return;
  const index = clamp(item.activePhotoIndex || 0, 0, item.photos.length - 1);
  item.photos.splice(index, 1);
  item.activePhotoIndex = clamp(index, 0, Math.max(0, item.photos.length - 1));
  item.updatedAt = new Date().toISOString();
  markGameDirty();
  renderGamePanel({ force: true });
}

function deleteSelectedItem() {
  const room = getSelectedRoom();
  const item = getSelectedItem();
  if (!room || !item) return;
  room.items = room.items.filter((entry) => entry.id !== item.id);
  state.gameData.selectedItemId = room.items[0]?.id || "";
  room.updatedAt = new Date().toISOString();
  markGameDirty();
  renderGamePanel({ force: true });
}

function addPersonToSelectedRoom() {
  const room = getSelectedRoom();
  if (!room) return;
  const name = els.gamePanel.querySelector('[data-game-field="newPersonName"]')?.value?.trim() || "";
  const person = normalizePerson({
    id: createId("person"),
    name,
    createdAt: new Date().toISOString()
  });
  room.people.push(person);
  state.gameData.selectedPersonId = person.id;
  room.updatedAt = new Date().toISOString();
  markGameDirty();
  renderGamePanel({ force: true });
}

function selectPerson(personId) {
  const room = getSelectedRoom();
  if (!room?.people.some((person) => person.id === personId)) return;
  state.gameData.selectedPersonId = personId;
  markGameDirty({ defer: true });
  renderGamePanel({ force: true });
}

async function setSelectedPersonPhoto(file) {
  const person = getSelectedPerson();
  if (!person) return;
  const record = await blobToResourceRecord(file, file.name || "person");
  person.photo = createPhotoFromResource(record);
  person.updatedAt = new Date().toISOString();
  markGameDirty();
  renderGamePanel({ force: true });
}

async function setPlayerPortraitFromDorm(file) {
  const building = getSelectedBuildingMemory();
  const room = getSelectedRoom();
  if (!building || !room || building.category !== "dormitory") {
    setGameNotice("请先在寝室里配置");
    return;
  }
  const record = await blobToResourceRecord(file, file.name || "portrait");
  state.gameData.player.portrait = createPhotoFromResource(record);
  markGameDirty();
  setGameNotice("形象已更新");
  renderGamePanel({ force: true });
  queueDraw();
}

function saveSelectedPerson() {
  const person = getSelectedPerson();
  if (!person) return;
  person.name = els.gamePanel.querySelector('[data-game-field="personName"]')?.value?.trim() || person.name;
  person.description = els.gamePanel.querySelector('[data-game-field="personDescription"]')?.value?.trim() || "";
  person.updatedAt = new Date().toISOString();
  markGameDirty();
  renderGamePanel({ force: true });
}

function sayHelloToSelectedPerson() {
  const person = getSelectedPerson();
  if (!person) return;
  const now = new Date().toISOString();
  person.chat.push({ id: createId("chat"), from: "me", text: "你好", createdAt: now });
  person.chat.push({ id: createId("chat"), from: "person", text: "你好", createdAt: now });
  person.updatedAt = now;
  markGameDirty();
  renderGamePanel({ force: true });
}

function deleteSelectedPerson() {
  const room = getSelectedRoom();
  const person = getSelectedPerson();
  if (!room || !person) return;
  room.people = room.people.filter((item) => item.id !== person.id);
  state.gameData.selectedPersonId = room.people[0]?.id || "";
  markGameDirty();
  renderGamePanel({ force: true });
}

function setGameNotice(text) {
  state.gameNotice = text;
  window.clearTimeout(state.gameNoticeTimer);
  state.gameNoticeTimer = window.setTimeout(() => {
    state.gameNotice = "";
    renderGamePanel({ force: true });
  }, 1800);
}

function setEditorNotice(text, tone = "info") {
  state.editorNotice = text;
  state.editorNoticeTone = tone;
  window.clearTimeout(state.editorNoticeTimer);
  state.editorNoticeTimer = window.setTimeout(() => {
    state.editorNotice = "";
    renderEditorState();
  }, 2600);
  renderEditorState();
}

function wrapIndex(index, length) {
  if (!length) return 0;
  return ((index % length) + length) % length;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeAttr(value) {
  return escapeHtml(value).replace(/'/g, "&#39;");
}

function rebuildInteractionPreview() {
  clearMapRenderCache();
  if (!state.mapImage || !state.mapNaturalSize.width || !state.mapNaturalSize.height) return;
  const maxSide = 2048;
  const scale = Math.min(1, maxSide / Math.max(state.mapNaturalSize.width, state.mapNaturalSize.height));
  const width = Math.max(1, Math.round(state.mapNaturalSize.width * scale));
  const height = Math.max(1, Math.round(state.mapNaturalSize.height * scale));
  const canvas = state.interactionPreviewCanvas;
  canvas.width = width;
  canvas.height = height;
  state.interactionPreviewScale = scale;
  const ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) return;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "low";
  ctx.clearRect(0, 0, width, height);
  ctx.drawImage(state.mapImage, 0, 0, width, height);
}

function warmupMapRendering() {
  if (!state.mapImage || state.mapRenderWarm) return;
  state.mapRenderWarm = true;
  requestAnimationFrame(() => {
    if (!state.mapImage) return;
    const canvas = document.createElement("canvas");
    const maxSide = 1024;
    const scale = Math.min(1, maxSide / Math.max(state.mapNaturalSize.width, state.mapNaturalSize.height));
    canvas.width = Math.max(1, Math.round(state.mapNaturalSize.width * scale));
    canvas.height = Math.max(1, Math.round(state.mapNaturalSize.height * scale));
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "low";
    ctx.drawImage(state.mapImage, 0, 0, canvas.width, canvas.height);
    queueDraw();
  });
}

function markMapInteraction(duration = 140) {
  state.interactionFastUntil = performance.now() + duration;
  if (state.interactionIdleTimer) window.clearTimeout(state.interactionIdleTimer);
  state.interactionIdleTimer = window.setTimeout(() => {
    state.interactionFastUntil = 0;
    state.interactionIdleTimer = null;
    queueDraw();
  }, duration + 20);
}

function renderEditorState() {
  const school = getSelectedSchool();
  els.editorToggleButton.disabled = !school || !state.mapImage;
  els.editorToggleButton.textContent = state.editorEnabled ? "退出地图编辑" : "进入地图编辑";
  els.editorPanel.hidden = !state.editorEnabled || !school;
  els.panelKicker.textContent = "信息";
  els.panelHeader.hidden = state.editorEnabled;
  els.infoTitle.hidden = state.editorEnabled;
  els.infoBody.hidden = state.editorEnabled;

  for (const tab of els.editorModeTabs) {
    const layer = tab.dataset.editorLayer || "base";
    tab.hidden = layer !== state.editLayer;
    const active = tab.dataset.editorMode === state.editorMode;
    tab.classList.toggle("active", active);
    tab.setAttribute("aria-checked", String(active));
  }
  for (const panel of els.editorWorkspaces) {
    panel.hidden = panel.dataset.editorPanel !== state.editorMode;
  }

  for (const button of els.toolButtons) {
    const tool = button.dataset.tool || "";
    button.classList.toggle("active", tool === state.activeTool && isToolAllowedInMode(tool, state.editorMode));
    const inActivePanel = isToolAvailableInCurrentMode(tool, button);
    button.disabled = !state.editorEnabled || !inActivePanel;
  }

  syncLayerToggle(els.showBaseLayer, state.showBaseLayer);
  syncLayerToggle(els.showStructureLayer, state.showStructureLayer);
  els.rotateAngleInput.value = String(state.rotationDraft);
  els.rotateAngleNumber.value = String(state.rotationDraft);
  els.brushSize.value = String(state.brushSize);
  els.brushSizeReadout.textContent = String(state.brushSize);
  els.structureBrushSize.value = String(state.structureBrushSize);
  els.structureBrushSizeReadout.textContent = String(state.structureBrushSize);
  const showStructureBrushSize = state.editorEnabled && state.editorMode === "structure" && ["structureBrush", "structureErase"].includes(state.activeTool);
  els.structureBrushSize.closest(".field-row").hidden = !showStructureBrushSize;
  els.structureBrushSize.disabled = !showStructureBrushSize;
  els.colorTolerance.value = String(state.colorTolerance);
  els.colorToleranceReadout.textContent = String(state.colorTolerance);
  els.baseOpacityInput.value = String(Math.round(state.baseOpacity * 100));
  els.baseOpacityReadout.textContent = `${Math.round(state.baseOpacity * 100)}%`;
  els.rotateLeftButton.disabled = !state.editorEnabled || state.editorMode !== "rotate" || !state.mapImage;
  els.rotateRightButton.disabled = !state.editorEnabled || state.editorMode !== "rotate" || !state.mapImage;
  els.undoRotateButton.disabled = !state.editorEnabled || state.editorMode !== "rotate" || !state.rotationDraft;
  els.saveRotateButton.disabled = !state.editorEnabled || state.editorMode !== "rotate" || !state.rotationDraft;
  els.commitCropButton.disabled = !state.editorEnabled || state.editorMode !== "crop" || state.cropDraft.length > 0 || state.draftPolygon.length < 3;
  els.undoCropButton.disabled = !state.editorEnabled || state.editorMode !== "crop" || (!state.cropDraft.length && !state.draftPolygon.length);
  els.saveCropButton.disabled = !state.editorEnabled || state.editorMode !== "crop" || !state.cropDraft.length;
  els.undoBaseButton.disabled = !state.editorEnabled || state.editorMode !== "base" || (!state.baseDraftActions.length && !state.draftPolygon.length && !state.draftShape);
  els.saveBaseButton.disabled = !state.editorEnabled || state.editorMode !== "base" || !state.baseDraftActions.length;
  els.commitBaseRegionButton.disabled = !state.editorEnabled || state.editorMode !== "color" || !canCommitBaseRegion();
  els.undoColorButton.disabled = !state.editorEnabled || state.editorMode !== "color" || (!state.baseDraftActions.length && !state.draftPolygon.length && !state.draftShape);
  els.saveColorButton.disabled = !state.editorEnabled || state.editorMode !== "color" || !state.baseDraftActions.length;
  const hasSelectedStructureObject = Boolean(getSelectedStructureObject());
  const hasStructureObjects = getSelectedEditData().structureRegions.length > 0;
  els.saveStructureObjectButton.disabled = !state.editorEnabled || state.editorMode !== "structure" || !hasSelectedStructureObject;
  els.deleteStructureObjectButton.disabled = !state.editorEnabled || state.editorMode !== "structure" || !hasSelectedStructureObject;
  els.showAllStructureButton.disabled = !state.editorEnabled || state.editorMode !== "structure" || !hasStructureObjects;
  els.hideAllStructureButton.disabled = !state.editorEnabled || state.editorMode !== "structure" || !hasStructureObjects;
  els.commitStructureRegionButton.disabled = !state.editorEnabled || state.editorMode !== "structure" || !canCommitStructureRegion();
  els.undoEditButton.disabled = !state.editorEnabled || state.editorMode !== "structure" || (!state.structureDraftActions.length && !state.draftPolygon.length && !state.draftShape);
  els.clearDraftButton.disabled = !state.editorEnabled || state.editorMode !== "structure" || (!state.structureDraftActions.length && !state.draftPolygon.length && !state.draftShape);

  for (const button of els.shapeToggles) {
    button.classList.toggle("active", button.dataset.areaShape === state.areaShape);
  }
  for (const button of els.brushShapeToggles) {
    button.classList.toggle("active", button.dataset.brushShape === state.brushShape);
  }
  for (const preview of els.colorPreviews) {
    const color = preview.dataset.colorPreview === "source" ? state.sourceColor : state.brushColor;
    preview.style.setProperty("--slot-color", color);
  }
  for (const slot of els.colorSlots) {
    const label = slot.querySelector("span");
    if (label) label.textContent = "颜色";
    slot.classList.toggle("active", (slot.dataset.colorSlot || "target") === state.activeColorSlot);
  }
  renderPalettes();
  if (state.colorPopoverOpen) {
    if (!state.editorEnabled || !["base", "color"].includes(state.editorMode)) closeColorPopover();
    else syncColorPopover();
  }
  if (els.editorStatus) {
    els.editorStatus.hidden = !state.editorNotice || !state.editorEnabled || state.editorMode !== "structure";
    els.editorStatus.textContent = state.editorNotice || "";
    els.editorStatus.classList.toggle("warning", state.editorNoticeTone === "warning");
  }
  syncSelectedStructureInputs();

  renderStructureObjectList();
}

function syncLayerToggle(button, active) {
  button.classList.toggle("active", active);
  button.setAttribute("aria-pressed", String(active));
}

function setEditLayer(layer) {
  state.editLayer = layer === "structure" ? "structure" : "base";
  if (state.editLayer === "base") {
    state.showBaseLayer = true;
    state.showStructureLayer = false;
    if (!BASE_EDITOR_MODES.includes(state.editorMode)) state.editorMode = "crop";
  } else {
    state.showBaseLayer = true;
    state.showStructureLayer = true;
    if (!STRUCTURE_EDITOR_MODES.includes(state.editorMode)) state.editorMode = "structure";
  }
  if (state.crossPageEyedropper && !EDITOR_MODE_TOOLS[state.editorMode]?.includes("eyedropper")) {
    state.crossPageEyedropper = false;
  }
  setEditorMode(state.editorMode);
  renderEditorState();
  queueDraw();
}

function setEditorMode(mode) {
  const normalized = EDITOR_MODES.includes(mode) ? mode : "crop";
  if (state.colorPopoverOpen && !["base", "color"].includes(normalized)) closeColorPopover();
  state.editorMode = normalized;
  state.editLayer = STRUCTURE_EDITOR_MODES.includes(normalized) ? "structure" : "base";
  state.showBaseLayer = true;
  state.showStructureLayer = state.editLayer === "structure";
  clearActiveDraft();
  if (normalized !== "rotate") {
    state.rotationDraft = 0;
    state.rotationDraftSteps = [];
  }
  state.activeTool = DEFAULT_EDITOR_TOOLS[normalized];
  if (state.crossPageEyedropper) {
    if (isToolAllowedInMode("eyedropper", normalized)) {
      state.activeTool = "eyedropper";
    } else {
      state.crossPageEyedropper = false;
    }
  }
  updateCanvasCursor();
}

function resetTransientDrafts() {
  state.draftPolygon = [];
  state.draftShape = null;
  state.cropDraft = [];
  state.rotationDraft = 0;
  state.rotationDraftSteps = [];
  state.baseDraftActions = [];
  state.structureDraftActions = [];
  state.activeStroke = null;
  state.structureSelectionPreview = null;
}

function clearActiveDraft() {
  state.draftPolygon = [];
  state.draftShape = null;
  if (state.editorMode !== "rotate") {
    state.rotationDraft = 0;
    state.rotationDraftSteps = [];
  }
  state.activeStroke = null;
  state.structureSelectionPreview = null;
}

function isToolAllowedInMode(tool, mode) {
  return Boolean(EDITOR_MODE_TOOLS[mode]?.includes(tool));
}

function isToolAvailableInCurrentMode(tool, element) {
  return isToolAllowedInMode(tool, state.editorMode) && Boolean(element.closest(`[data-editor-panel="${state.editorMode}"]`));
}

function isCurrentTool(tool) {
  return state.editorEnabled && state.activeTool === tool && isToolAllowedInMode(tool, state.editorMode);
}

function getActiveEditorColor() {
  return state.activeColorSlot === "source" ? state.sourceColor : state.brushColor;
}

function openColorPopover(anchor) {
  if (!els.colorPickerPopover || !anchor) return;
  state.colorPopoverOpen = true;
  syncColorPopover();
  els.colorPickerPopover.hidden = false;
  positionColorPopover(anchor);
}

function closeColorPopover() {
  state.colorPopoverOpen = false;
  if (els.colorPickerPopover) els.colorPickerPopover.hidden = true;
}

function syncColorPopover() {
  if (!els.colorPickerPopover) return;
  const color = normalizeHexColor(getActiveEditorColor()) || "#000000";
  if (els.popoverColorInput.value.toLowerCase() !== color) els.popoverColorInput.value = color;
  if (document.activeElement !== els.popoverHexInput && els.popoverHexInput.value.toLowerCase() !== color) {
    els.popoverHexInput.value = color;
  }
  renderPalette(els.popoverSwatches, state.imagePalette.map((item) => item.color), { image: true });
}

function positionColorPopover(anchor) {
  const popover = els.colorPickerPopover;
  if (!popover) return;
  const margin = 8;
  const rect = anchor.getBoundingClientRect();
  const width = Math.min(popover.offsetWidth || 260, window.innerWidth - margin * 2);
  const height = popover.offsetHeight || 120;
  let left = rect.left;
  let top = rect.bottom + margin;
  if (top + height > window.innerHeight - margin) top = rect.top - height - margin;
  left = clamp(left, margin, Math.max(margin, window.innerWidth - width - margin));
  top = clamp(top, margin, Math.max(margin, window.innerHeight - height - margin));
  popover.style.left = `${left}px`;
  popover.style.top = `${top}px`;
}

function setActiveEditorColor(color, options = {}) {
  const normalized = normalizeHexColor(color);
  if (!normalized) return;
  if (state.activeColorSlot === "source") {
    state.sourceColor = normalized;
  } else {
    state.brushColor = normalized;
    if (!state.suppressColorHistory) addCommonColor(normalized);
  }
  renderEditorState();
  queueDraw();
}

function activateEyedropperForCurrentContext() {
  state.crossPageEyedropper = true;
  if (!isToolAllowedInMode("eyedropper", state.editorMode)) {
    setEditorMode("base");
  } else {
    state.activeTool = "eyedropper";
    clearActiveDraft();
    updateCanvasCursor();
  }
}

async function openCrossPageEyedropper() {
  state.crossPageEyedropper = true;
  activateEyedropperForCurrentContext();
  renderEditorState();
  queueDraw();
  if (!window.EyeDropper) return;
  try {
    const result = await new EyeDropper().open();
    if (result?.sRGBHex) setActiveEditorColor(result.sRGBHex);
  } catch (error) {
    // User cancelled or the browser blocked the picker. Keep canvas eyedropper active.
  }
}

function addCommonColor(color) {
  state.commonColors = [color, ...state.commonColors.filter((item) => item.toLowerCase() !== color.toLowerCase())].slice(0, 12);
}

function renderPalettes() {
  const key = [
    state.imagePalette.map((item) => item.color).join(","),
    state.brushColor,
    state.sourceColor
  ].join("|");
  if (key === state.paletteRenderKey) return;
  state.paletteRenderKey = key;
  for (const container of els.imageColorPalettes) {
    renderPalette(container, state.imagePalette.map((item) => item.color), { image: true });
  }
  for (const container of els.commonColorPalettes) container.innerHTML = "";
}

function renderPalette(container, colors, options = {}) {
  container.innerHTML = "";
  const list = colors.length ? colors : [];
  const limit = options.image ? IMAGE_PALETTE_LIMIT : 12;
  for (const color of list.slice(0, limit)) {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.color = color;
    button.style.setProperty("--swatch", color);
    button.classList.toggle("active", color.toLowerCase() === state.brushColor.toLowerCase());
    container.append(button);
  }
}

function updateImagePalette() {
  if (!state.mapImage || !state.mapNaturalSize.width || !state.mapNaturalSize.height) {
    state.imagePalette = [];
    return;
  }
  const maxSample = 720;
  const scale = Math.min(1, maxSample / Math.max(state.mapNaturalSize.width, state.mapNaturalSize.height));
  const width = Math.max(1, Math.round(state.mapNaturalSize.width * scale));
  const height = Math.max(1, Math.round(state.mapNaturalSize.height * scale));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) {
    state.imagePalette = [];
    return;
  }
  ctx.imageSmoothingEnabled = false;
  const buckets = new Map();
  const scaleX = width / state.mapNaturalSize.width;
  const scaleY = height / state.mapNaturalSize.height;
  const passes = scale < 1
    ? [
        { x: 0, y: 0 },
        { x: 0.33, y: 0.33 },
        { x: 0.66, y: 0.66 },
        { x: 0.33, y: 0.66 },
        { x: 0.66, y: 0.33 }
      ]
    : [{ x: 0, y: 0 }];
  let totalSamples = 0;
  for (const pass of passes) {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, width, height);
    ctx.setTransform(scaleX, 0, 0, scaleY, -pass.x, -pass.y);
    ctx.drawImage(state.mapImage, 0, 0, state.mapNaturalSize.width, state.mapNaturalSize.height);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    const data = ctx.getImageData(0, 0, width, height).data;
    totalSamples += width * height;
    for (let index = 0; index < data.length; index += 4) {
      if (data[index + 3] < 16) continue;
      const r = data[index];
      const g = data[index + 1];
      const b = data[index + 2];
      const bucketKey = `${Math.round(r / 8)}-${Math.round(g / 8)}-${Math.round(b / 8)}`;
      const color = rgbToHex(r, g, b);
      if (!buckets.has(bucketKey)) {
        buckets.set(bucketKey, { count: 0, colors: new Map(), r: 0, g: 0, b: 0 });
      }
      const bucket = buckets.get(bucketKey);
      bucket.count += 1;
      bucket.r += r;
      bucket.g += g;
      bucket.b += b;
      bucket.colors.set(color, (bucket.colors.get(color) || 0) + 1);
    }
  }
  const minCount = Math.max(2, Math.floor(totalSamples * 0.00002));
  const candidates = [...buckets.values()]
    .filter((bucket) => bucket.count >= minCount)
    .map((bucket) => {
      const [color] = [...bucket.colors.entries()].sort((a, b) => b[1] - a[1])[0];
      const average = {
        r: bucket.r / bucket.count,
        g: bucket.g / bucket.count,
        b: bucket.b / bucket.count
      };
      const saturation = getRgbSaturation(average.r, average.g, average.b);
      return {
        color,
        count: bucket.count,
        average,
        score: bucket.count * (0.72 + saturation * 0.28)
      };
    })
    .sort((a, b) => b.score - a.score);

  const selected = [];
  for (const candidate of candidates) {
    const rgb = hexToRgb(candidate.color);
    if (!rgb) continue;
    const tooClose = selected.some((item) => {
      const itemRgb = hexToRgb(item.color);
      return itemRgb && euclideanColorDistance(rgb, itemRgb) < 10;
    });
    if (tooClose) continue;
    selected.push({ color: candidate.color, count: candidate.count });
    if (selected.length >= IMAGE_PALETTE_LIMIT) break;
  }
  state.imagePalette = selected;
}

function canCommitBaseRegion() {
  if (state.editorMode === "color" && state.activeTool === "fillArea") {
    if (state.areaShape === "polygon") return state.draftPolygon.length >= 3;
    return Boolean(state.draftShape);
  }
  return false;
}

function canCommitStructureRegion() {
  const selected = getSelectedStructureObject();
  if (!selected) return false;
  if (state.activeTool === "structureLine") return state.draftPolygon.length >= 2;
  if (state.activeTool === "structurePolygon") return state.draftPolygon.length >= 3;
  if (state.activeTool === "structureParallelogram") return state.draftPolygon.length >= 3;
  return false;
}

function getSelectedStructureObject() {
  const editData = getSelectedEditData();
  return editData.structureRegions.find((region) => region.id === state.selectedStructureObjectId) || null;
}

function syncSelectedStructureInputs() {
  const selected = getSelectedStructureObject();
  if (selected) {
    els.structureObjectNameInput.value = selected.name || "";
    els.structureObjectTypeInput.value = selected.type || "custom";
    els.structureObjectWalkableInput.checked = selected.type === "custom" ? Boolean(selected.walkable) : TYPE_STYLES[selected.type]?.walkable ?? true;
    els.structureObjectWalkableInput.disabled = selected.type !== "custom";
    els.structureObjectWalkableInput.closest(".check-row").hidden = selected.type !== "custom";
    els.structureObjectColorInput.value = selected.color || TYPE_STYLES[selected.type]?.line || TYPE_STYLES.custom.line;
  } else {
    const type = els.structureObjectTypeInput.value;
    els.structureObjectWalkableInput.checked = TYPE_STYLES[type]?.walkable ?? true;
    els.structureObjectWalkableInput.disabled = type !== "custom";
    els.structureObjectWalkableInput.closest(".check-row").hidden = type !== "custom";
    els.structureObjectColorInput.value = TYPE_STYLES[type]?.line || TYPE_STYLES.custom.line;
  }
}

function renderStructureObjectList() {
  const editData = getSelectedEditData();
  const total = editData.structureRegions.length;
  const maxPage = Math.max(0, Math.ceil(total / STRUCTURE_LIST_PAGE_SIZE) - 1);
  state.structureListPage = clamp(state.structureListPage, 0, maxPage);
  const key = JSON.stringify({
    selected: state.selectedStructureObjectId || "",
    page: state.structureListPage,
    regions: editData.structureRegions.map((region) => ({
      id: region.id,
      name: region.name || "",
      type: region.type || "",
      color: region.color || "",
      walkable: Boolean(region.walkable),
      visible: region.visible !== false
    }))
  });
  if (key === state.structureObjectListKey) return;
  state.structureObjectListKey = key;
  els.structureObjectList.innerHTML = "";
  if (!total) {
    const empty = document.createElement("div");
    empty.className = "empty-school";
    empty.textContent = "先添加对象";
    els.structureObjectList.append(empty);
    syncStructureListPager(0, 0);
    return;
  }
  const pageStart = state.structureListPage * STRUCTURE_LIST_PAGE_SIZE;
  const pageItems = editData.structureRegions.slice(pageStart, pageStart + STRUCTURE_LIST_PAGE_SIZE);
  for (const region of pageItems) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "structure-object-item" + (region.id === state.selectedStructureObjectId ? " active" : "") + (region.visible === false ? " hidden-object" : "");
    button.title = getStructureObjectDisplayName(region) + " · " + (TYPE_STYLES[region.type]?.label || "自定义");
    const swatch = document.createElement("span");
    swatch.className = "structure-object-swatch";
    swatch.style.setProperty("--object-color", region.color || TYPE_STYLES[region.type]?.line || TYPE_STYLES.custom.line);
    const text = document.createElement("span");
    text.className = "structure-object-copy";
    const name = document.createElement("strong");
    name.textContent = getStructureObjectDisplayName(region);
    const meta = document.createElement("span");
    meta.className = "structure-object-meta";
    meta.textContent = TYPE_STYLES[region.type]?.label || "自定义";
    text.append(name, meta);
    button.addEventListener("click", () => {
      state.selectedStructureObjectId = region.id;
      region.visible = region.visible === false;
      markStructureLayerDirty();
      persistEditData();
      state.structureObjectListKey = "";
      renderEditorState();
      queueDraw();
    });
    button.append(swatch, text);
    els.structureObjectList.append(button);
  }
  syncStructureListPager(state.structureListPage, maxPage);
}

function syncStructureListPager(page, maxPage) {
  const hasPages = maxPage > 0;
  els.structureListPager.hidden = !hasPages;
  els.structureListPrevButton.disabled = !hasPages || page <= 0;
  els.structureListNextButton.disabled = !hasPages || page >= maxPage;
  els.structureListPageReadout.textContent = (page + 1) + " / " + (maxPage + 1);
}
function getStructureObjectDisplayName(region) {
  const name = String(region?.name || "").trim();
  return name || getStructureObjectFallbackName(region);
}

function getStructureObjectFallbackName(region, options = {}) {
  const editData = getSelectedEditData();
  const used = new Set();
  for (const item of editData.structureRegions) {
    if (options.excludeId && item.id === options.excludeId) continue;
    const name = String(item.name || "").trim();
    if (name) used.add(name);
  }
  const nextName = () => {
    let index = 1;
    while (used.has(String(index))) index += 1;
    const name = String(index);
    used.add(name);
    return name;
  };
  for (const item of editData.structureRegions) {
    if (options.excludeId && item.id === options.excludeId) continue;
    if (String(item.name || "").trim()) continue;
    const name = nextName();
    if (region && item.id === region.id) return name;
  }
  return nextName();
}

function getRegionAreas(region) {
  if (Array.isArray(region.areas)) return region.areas;
  if (isLinearStructureType(region?.type) && Array.isArray(region.polygon) && region.polygon.length >= 2) {
    return [{ kind: "line", points: region.polygon, width: LINEAR_STRUCTURE_WIDTH }];
  }
  if (Array.isArray(region.polygon) && region.polygon.length >= 3) return [{ kind: "polygon", points: region.polygon }];
  return [];
}

function getRegionAreaCount(region) {
  return getRegionAreas(region).length;
}

function resizeCanvas() {
  const rect = els.mapCanvas.getBoundingClientRect();
  const dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 3));
  const width = Math.max(1, Math.round(rect.width));
  const height = Math.max(1, Math.round(rect.height));
  state.canvasSize = { width, height, dpr };
  els.mapCanvas.width = Math.round(width * dpr);
  els.mapCanvas.height = Math.round(height * dpr);
}

function fitImageToView() {
  if (!state.mapImage) return;
  const { width: cw, height: ch } = state.canvasSize;
  const { width: iw, height: ih } = getActiveMapDisplaySize();
  if (!iw || !ih || !cw || !ch) return;
  const scale = Math.min(cw / iw, ch / ih) * 0.96;
  state.view.scale = clamp(scale, state.view.minScale, state.view.maxScale);
  state.view.x = (cw - iw * state.view.scale) / 2;
  state.view.y = (ch - ih * state.view.scale) / 2;
  updateZoomReadout();
}

function clampView() {
  if (!state.mapImage) return;
  const { width: cw, height: ch } = state.canvasSize;
  const bounds = getActiveCropPreviewBounds();
  const activeSize = getActiveMapDisplaySize();
  const iw = bounds ? bounds.width : activeSize.width;
  const ih = bounds ? bounds.height : activeSize.height;
  const sw = iw * state.view.scale;
  const sh = ih * state.view.scale;
  if (sw <= cw) {
    state.view.x = (cw - sw) / 2;
  } else {
    state.view.x = clamp(state.view.x, cw - sw, 0);
  }
  if (sh <= ch) {
    state.view.y = (ch - sh) / 2;
  } else {
    state.view.y = clamp(state.view.y, ch - sh, 0);
  }
  updateZoomReadout();
}

function zoomAt(factor, screenX, screenY) {
  if (!state.mapImage) return;
  const before = screenToImage(screenX, screenY);
  state.view.scale = clamp(state.view.scale * factor, state.view.minScale, state.view.maxScale);
  if (isRotationPreviewActive()) {
    const display = imageToRotatedDisplay(before);
    state.view.x = screenX - display.x * state.view.scale;
    state.view.y = screenY - display.y * state.view.scale;
    clampView();
    queueDraw();
    return;
  }
  const offset = getActiveCropPreviewOffset();
  state.view.x = screenX - (before.x - offset.x) * state.view.scale;
  state.view.y = screenY - (before.y - offset.y) * state.view.scale;
  clampView();
  queueDraw();
}

function updateZoomReadout() {
  els.zoomReadout.textContent = `${Math.round(state.view.scale * 100)}%`;
}

function screenToImage(screenX, screenY) {
  if (isRotationPreviewActive()) {
    return rotatedDisplayToImage({
      x: (screenX - state.view.x) / state.view.scale,
      y: (screenY - state.view.y) / state.view.scale
    });
  }
  const offset = getActiveCropPreviewOffset();
  return {
    x: (screenX - state.view.x) / state.view.scale + offset.x,
    y: (screenY - state.view.y) / state.view.scale + offset.y
  };
}

function imageToScreen(point) {
  if (isRotationPreviewActive()) {
    const display = imageToRotatedDisplay(point);
    return {
      x: display.x * state.view.scale + state.view.x,
      y: display.y * state.view.scale + state.view.y
    };
  }
  const offset = getActiveCropPreviewOffset();
  return {
    x: (point.x - offset.x) * state.view.scale + state.view.x,
    y: (point.y - offset.y) * state.view.scale + state.view.y
  };
}

function getActiveCropPreviewBounds() {
  if (isRotationPreviewActive() || state.editorMode !== "crop" || state.cropDraft.length < 3) return null;
  const bounds = polygonBounds(state.cropDraft);
  const left = clamp(Math.floor(bounds.left), 0, state.mapNaturalSize.width - 1);
  const top = clamp(Math.floor(bounds.top), 0, state.mapNaturalSize.height - 1);
  const right = clamp(Math.ceil(bounds.right), left + 1, state.mapNaturalSize.width);
  const bottom = clamp(Math.ceil(bounds.bottom), top + 1, state.mapNaturalSize.height);
  return { left, top, right, bottom, width: right - left, height: bottom - top };
}

function getActiveCropPreviewOffset() {
  const bounds = getActiveCropPreviewBounds();
  return bounds ? { x: bounds.left, y: bounds.top } : { x: 0, y: 0 };
}

function isRotationPreviewActive() {
  return state.editorMode === "rotate" && normalizeRotation(state.rotationDraft) !== 0;
}

function getActiveMapDisplaySize() {
  if (isRotationPreviewActive()) return getRotatedBoundsSize(normalizeRotation(state.rotationDraft), state.mapNaturalSize);
  return { width: state.mapNaturalSize.width, height: state.mapNaturalSize.height };
}

function normalizeRotation(degrees) {
  const value = Number(degrees) || 0;
  return Math.round((((value % 360) + 360) % 360) * 100) / 100;
}

function imageToRotatedDisplay(point, rotation = state.rotationDraft, size = state.mapNaturalSize) {
  const angle = normalizeRotation(rotation);
  if (!angle) return { x: point.x, y: point.y };
  const transform = getRotationTransform(angle, size);
  const cx = size.width / 2;
  const cy = size.height / 2;
  const dx = point.x - cx;
  const dy = point.y - cy;
  return {
    x: dx * transform.cos - dy * transform.sin + transform.width / 2,
    y: dx * transform.sin + dy * transform.cos + transform.height / 2
  };
}

function rotatedDisplayToImage(point, rotation = state.rotationDraft, size = state.mapNaturalSize) {
  const angle = normalizeRotation(rotation);
  if (!angle) return { x: point.x, y: point.y };
  const transform = getRotationTransform(angle, size);
  const dx = point.x - transform.width / 2;
  const dy = point.y - transform.height / 2;
  return {
    x: dx * transform.cos + dy * transform.sin + size.width / 2,
    y: -dx * transform.sin + dy * transform.cos + size.height / 2
  };
}

function imagePixelToRotatedDisplay(point, rotation = state.rotationDraft, size = state.mapNaturalSize) {
  return imageToRotatedDisplay({ x: point.x + 0.5, y: point.y + 0.5 }, rotation, size);
}

function getRotatedBoundsSize(rotation, size = state.mapNaturalSize) {
  const transform = getRotationTransform(rotation, size);
  return { width: transform.width, height: transform.height };
}

function getRotationTransform(rotation, size = state.mapNaturalSize) {
  const radians = normalizeRotation(rotation) * Math.PI / 180;
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);
  const width = Math.abs(size.width * cos) + Math.abs(size.height * sin);
  const height = Math.abs(size.width * sin) + Math.abs(size.height * cos);
  return { radians, cos, sin, width, height };
}

function getCanvasPoint(event) {
  const rect = els.mapCanvas.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  };
}

function onWheel(event) {
  if (!state.mapImage) return;
  event.preventDefault();
  markMapInteraction(180);
  const point = getCanvasPoint(event);
  const factor = event.deltaY < 0 ? 1.12 : 0.88;
  if (!state.editorEnabled) {
    state.view.scale = clamp(state.view.scale * factor, state.view.minScale, state.view.maxScale);
    followPlayer();
    queueDraw();
    return;
  }
  zoomAt(factor, point.x, point.y);
}

function onPointerDown(event) {
  if (!state.mapImage) return;
  if (!state.editorEnabled) {
    handleGamePointerDown(event);
    return;
  }
  markMapInteraction(220);
  const point = getCanvasPoint(event);
  state.pointer.touches.set(event.pointerId, point);
  if (state.pointer.touches.size === 2) {
    startPinchGesture();
    return;
  }
  els.mapCanvas.setPointerCapture(event.pointerId);
  const imagePoint = screenToImage(point.x, point.y);
  state.pointer = {
    down: true,
    moved: false,
    mode: shouldPan(event) ? "pan" : getCurrentPointerTool(),
    pointerId: event.pointerId,
    startX: point.x,
    startY: point.y,
    lastX: point.x,
    lastY: point.y,
    startViewX: state.view.x,
    startViewY: state.view.y,
    touches: state.pointer.touches,
    pinchStartDistance: state.pointer.pinchStartDistance,
    pinchStartScale: state.pointer.pinchStartScale,
    pinchAnchor: state.pointer.pinchAnchor
  };

  if (!state.editorEnabled || state.pointer.mode === "pan") {
    state.pointer.mode = "pan";
    return;
  }

  if (state.pointer.mode === "paint") {
    state.activeStroke = createBackgroundStroke("paint", imagePoint);
  } else if (state.pointer.mode === "erase") {
    state.activeStroke = createBackgroundStroke("erase", imagePoint);
  } else if (state.pointer.mode === "eyedropper") {
    pickColorAt(imagePoint);
  } else if (state.pointer.mode === "structureBrush") {
    state.activeStroke = createJudgementStroke(imagePoint);
  } else if (state.pointer.mode === "structureErase") {
    state.activeStroke = createStructureEraseStroke(imagePoint);
  } else if (isRectLikeDraftTool(state.pointer.mode)) {
    state.draftShape = createDraftShape(state.pointer.mode, imagePoint, imagePoint);
  } else if (state.pointer.mode === "colorConnected" || state.pointer.mode === "colorAll") {
    createBaseColorFillFromColor(imagePoint, state.pointer.mode);
  } else if (state.pointer.mode === "sameColorConnected" || state.pointer.mode === "sameColorAll") {
    createStructureSelectionFromColor(imagePoint, state.pointer.mode);
  }
  queueDraw();
}

function onPointerMove(event) {
  const point = getCanvasPoint(event);
  if (!state.editorEnabled) {
    handleGamePointerMove(event, point);
    return;
  }
  state.pointer.hoverX = point.x;
  state.pointer.hoverY = point.y;
  state.pointer.hovering = true;
  updateCanvasCursor();
  if (!state.pointer.down || !state.mapImage) {
    queueDraw();
    return;
  }
  markMapInteraction(140);
  if (state.pointer.touches.has(event.pointerId)) {
    state.pointer.touches.set(event.pointerId, point);
  }
  if (state.pointer.touches.size >= 2) {
    updatePinchGesture();
    return;
  }
  const dx = point.x - state.pointer.lastX;
  const dy = point.y - state.pointer.lastY;
  if (Math.hypot(point.x - state.pointer.startX, point.y - state.pointer.startY) > 3) {
    state.pointer.moved = true;
  }
  state.pointer.lastX = point.x;
  state.pointer.lastY = point.y;

  if (state.pointer.mode === "pan") {
    state.view.x += dx;
    state.view.y += dy;
    clampView();
    queueDraw();
    return;
  }

  if (state.activeStroke) {
    const imagePoint = screenToImage(point.x, point.y);
    const points = state.activeStroke.points;
    const last = points[points.length - 1];
    const strokeSize = Number(state.activeStroke.size) || state.brushSize;
    if (!last || distance(last, imagePoint) >= Math.max(1, strokeSize / 4)) {
      points.push(clampImagePoint(imagePoint));
      queueDraw();
    }
  } else if (state.draftShape && isRectLikeDraftTool(state.pointer.mode)) {
    state.draftShape.end = clampImagePoint(screenToImage(point.x, point.y));
    queueDraw();
  }
}

function onPointerLeave() {
  if (!state.editorEnabled) {
    state.touchMoveVector = { x: 0, y: 0, active: false };
    state.gamePointerDown = null;
    return;
  }
  state.pointer.hovering = false;
  updateCanvasCursor();
  queueDraw();
}

function updateCanvasCursor() {
  if (!state.mapImage) {
    els.mapCanvas.style.cursor = "default";
    return;
  }
  if (!state.editorEnabled) {
    els.mapCanvas.style.cursor = "default";
    return;
  }
  if (state.pointer.down && state.pointer.mode === "pan") {
    els.mapCanvas.style.cursor = "grabbing";
  } else if (state.spacePanning || state.activeTool === "pan" || isRotationPreviewActive()) {
    els.mapCanvas.style.cursor = "grab";
  } else if (shouldUseBrushCursor()) {
    els.mapCanvas.style.cursor = "none";
  } else {
    els.mapCanvas.style.cursor = "crosshair";
  }
}

function shouldUseBrushCursor() {
  return state.editorEnabled && ["paint", "erase", "structureBrush", "structureErase"].includes(state.activeTool);
}

function onPointerUp(event) {
  if (!state.editorEnabled) {
    handleGamePointerUp(event);
    return;
  }
  if (!state.pointer.down || !state.mapImage) return;
  markMapInteraction(100);
  const mode = state.pointer.mode;
  state.pointer.touches.delete(event.pointerId);
  if (mode === "pinch") {
    if (state.pointer.touches.size >= 2) {
      startPinchGesture();
    } else {
      state.pointer.down = false;
      state.pointer.mode = "pan";
    }
    queueDraw();
    return;
  }
  if (state.pointer.touches.size >= 2) {
    startPinchGesture();
    return;
  }
  const point = getCanvasPoint(event);
  const imagePoint = clampImagePoint(screenToImage(point.x, point.y));
  const wasMoved = state.pointer.moved;
  state.pointer.down = false;

  if (mode === "crop" && !wasMoved) {
    state.draftPolygon.push(imagePoint);
  } else if (state.editorMode === "color" && mode === "fillArea" && state.areaShape === "polygon" && !wasMoved) {
    state.draftPolygon.push(imagePoint);
  } else if (mode === "structurePolygon" && !wasMoved) {
    state.draftPolygon.push(imagePoint);
  } else if (mode === "structureLine" && !wasMoved) {
    state.draftPolygon.push(imagePoint);
  } else if (mode === "structureParallelogram" && !wasMoved && state.draftPolygon.length < 3) {
    state.draftPolygon.push(imagePoint);
  } else if (isRectLikeDraftTool(mode) && state.draftShape) {
    state.draftShape.end = imagePoint;
  } else if (state.activeStroke) {
    void finishActiveStroke();
  }

  renderEditorState();
  queueDraw();
}

function onPointerCancel() {
  if (!state.editorEnabled) {
    state.touchMoveVector = { x: 0, y: 0, active: false };
    state.gamePointerDown = null;
    return;
  }
  markMapInteraction(80);
  state.pointer.touches.clear();
  state.pointer.down = false;
  state.activeStroke = null;
  queueDraw();
}

function startPinchGesture() {
  const points = [...state.pointer.touches.values()].slice(0, 2);
  if (points.length < 2) return;
  state.pointer.mode = "pinch";
  state.pointer.down = true;
  state.pointer.pinchStartDistance = distance(points[0], points[1]);
  state.pointer.pinchStartScale = state.view.scale;
  const center = {
    x: (points[0].x + points[1].x) / 2,
    y: (points[0].y + points[1].y) / 2
  };
  state.pointer.pinchAnchor = {
    screen: center,
    image: screenToImage(center.x, center.y)
  };
  state.activeStroke = null;
}

function updatePinchGesture() {
  const points = [...state.pointer.touches.values()].slice(0, 2);
  if (points.length < 2 || !state.pointer.pinchAnchor) return;
  const currentDistance = Math.max(1, distance(points[0], points[1]));
  const factor = currentDistance / Math.max(1, state.pointer.pinchStartDistance);
  const center = {
    x: (points[0].x + points[1].x) / 2,
    y: (points[0].y + points[1].y) / 2
  };
  const anchor = state.pointer.pinchAnchor.image;
  markMapInteraction(140);
  state.view.scale = clamp(state.pointer.pinchStartScale * factor, state.view.minScale, state.view.maxScale);
  const displayAnchor = isRotationPreviewActive() ? imageToRotatedDisplay(anchor) : anchor;
  state.view.x = center.x - displayAnchor.x * state.view.scale;
  state.view.y = center.y - displayAnchor.y * state.view.scale;
  clampView();
  queueDraw();
}

function handleGamePointerDown(event) {
  markMapInteraction(120);
  const point = getCanvasPoint(event);
  const imagePoint = clampImagePoint(screenToImage(point.x, point.y));
  state.gamePointerDown = {
    pointerId: event.pointerId,
    pointerType: event.pointerType,
    startX: point.x,
    startY: point.y,
    lastX: point.x,
    lastY: point.y,
    imagePoint,
    moved: false
  };
  els.mapCanvas.setPointerCapture?.(event.pointerId);
  if (event.pointerType === "touch") {
    state.touchMoveVector = { x: 0, y: 0, active: true };
  }
}

function handleGamePointerMove(event, point = getCanvasPoint(event)) {
  if (!state.gamePointerDown || state.gamePointerDown.pointerId !== event.pointerId) return;
  const dx = point.x - state.gamePointerDown.startX;
  const dy = point.y - state.gamePointerDown.startY;
  state.gamePointerDown.lastX = point.x;
  state.gamePointerDown.lastY = point.y;
  state.gamePointerDown.moved = Math.hypot(dx, dy) > 6;
  if (state.gamePointerDown.pointerType === "touch") {
    const max = 54;
    const length = Math.hypot(dx, dy);
    const scale = length > max ? max / length : 1;
    state.touchMoveVector = {
      x: (dx * scale) / max,
      y: (dy * scale) / max,
      active: true
    };
    startGameLoop();
  }
}

function handleGamePointerUp(event) {
  const pointer = state.gamePointerDown;
  if (!pointer || pointer.pointerId !== event.pointerId) return;
  els.mapCanvas.releasePointerCapture?.(event.pointerId);
  if (pointer.pointerType === "touch") {
    state.touchMoveVector = { x: 0, y: 0, active: false };
  }
  if (!pointer.moved) {
    handleGameCanvasClick(pointer.imagePoint);
  }
  state.gamePointerDown = null;
  queueDraw();
}

function handleGameCanvasClick(imagePoint) {
  if (state.gameData.location.kind === "building") {
    selectInteriorRoomAtScreen(state.gamePointerDown || null);
    return;
  }
  const clickedSpot = getNearbyPhotoSpotTarget(imagePoint);
  if (clickedSpot) {
    state.selectedNearbyInteractionKey = clickedSpot.key;
    state.defaultPhotoSpotInteractionKey = clickedSpot.key;
    state.gameData.selectedPhotoSpotId = clickedSpot.id;
    state.gameData.selectedBuildingId = "";
    state.selectedSpotPhotoForEditId = "";
    renderGamePanel({ force: true });
    return;
  }
  const target = getNearbyStructureTargets(imagePoint)[0];
  if (target) {
    state.selectedNearbyInteractionKey = target.key;
    state.gameData.selectedBuildingId = target.id;
    state.selectedSpotPhotoForEditId = "";
    getOrCreateBuildingMemory(target.id);
    markGameDirty({ defer: true });
    renderGamePanel({ force: true });
  }
}

function selectInteriorRoomAtScreen(pointer) {
  const building = getSelectedBuildingMemory();
  if (!building?.rooms?.length || !pointer) return;
  const margin = 28;
  const cols = Math.max(1, Math.min(3, Math.floor((state.canvasSize.width - margin * 2) / 180)));
  const cardW = Math.max(132, (state.canvasSize.width - margin * 2 - 44 - (cols - 1) * 16) / cols);
  const cardH = 92;
  const x = pointer.startX;
  const y = pointer.startY;
  for (let index = 0; index < building.rooms.length; index++) {
    const col = index % cols;
    const row = Math.floor(index / cols);
    const cardX = margin + 22 + col * (cardW + 16);
    const cardY = margin + 62 + row * (cardH + 16);
    if (x >= cardX && x <= cardX + cardW && y >= cardY && y <= cardY + cardH) {
      selectRoom(building.rooms[index].id);
      return;
    }
  }
}

function shouldPan(event) {
  return isRotationPreviewActive() || !state.editorEnabled || !isToolAllowedInMode(state.activeTool, state.editorMode) || state.activeTool === "pan" || event.button === 1 || event.button === 2 || event.altKey || state.spacePanning || isTouchPointer(event);
}

function isTouchPointer(event) {
  return event.pointerType === "touch";
}

function getCurrentPointerTool() {
  return isToolAllowedInMode(state.activeTool, state.editorMode) ? state.activeTool : DEFAULT_EDITOR_TOOLS[state.editorMode];
}

function createBackgroundStroke(mode, point) {
  return {
    id: createId("bgstroke"),
    mode,
    color: state.brushColor,
    size: state.brushSize,
    shape: state.brushShape,
    points: [clampImagePoint(point)],
    createdAt: new Date().toISOString()
  };
}

function isRectLikeDraftTool(tool) {
  return (
    state.editorMode === "color" && tool === "fillArea" && (state.areaShape === "rect" || state.areaShape === "ellipse")
  );
}

function createDraftShape(tool, start, end) {
  const kind = state.editorMode === "color" && state.areaShape === "ellipse" ? "ellipse" : "rect";
  return { kind, start: clampImagePoint(start), end: clampImagePoint(end) };
}

function createJudgementStroke(point) {
  const selected = getSelectedStructureObject();
  const type = selected?.type || els.structureObjectTypeInput.value || "custom";
  const normalizedType = TYPE_STYLES[type] ? type : "custom";
  return {
    id: createId("jstroke"),
    objectId: selected?.id || "",
    name: selected?.name || TYPE_STYLES[normalizedType]?.label || "结构笔触",
    type: normalizedType,
    walkable: getStructureTypeWalkable(normalizedType, selected?.walkable),
    color: selected?.color || TYPE_STYLES[normalizedType]?.line || TYPE_STYLES.custom.line,
    mode: "add",
    size: state.structureBrushSize,
    shape: "circle",
    points: [clampImagePoint(point)],
    createdAt: new Date().toISOString()
  };
}

function createStructureEraseStroke(point) {
  return {
    id: createId("serase"),
    mode: "erase",
    size: state.structureBrushSize,
    shape: "circle",
    points: [clampImagePoint(point)],
    createdAt: new Date().toISOString()
  };
}

function applyBaseActionToContext(ctx, action) {
  if (action.kind === "stroke") {
    if (action.stroke.mode === "erase") return;
    applyImageStroke(ctx, action.stroke);
  } else if (action.kind === "fillArea") {
    fillImageArea(ctx, action.area, action.color);
  } else if (action.kind === "replaceArea") {
    paintImageAreaByColor(ctx, action.area, action.targetColor, action.targetColor, action.tolerance, action.selectionMode);
  }
}

function applyImageStroke(ctx, stroke, compositeOperation = "source-over") {
  if (!stroke?.points?.length) return;
  ctx.save();
  ctx.globalCompositeOperation = compositeOperation;
  ctx.fillStyle = stroke.color || "#ffffff";
  ctx.strokeStyle = ctx.fillStyle;
  ctx.lineWidth = Math.max(1, stroke.size);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  makeImageStrokePath(ctx, stroke.points);
  ctx.stroke();
  ctx.restore();
}

function drawSquareStrokeOnImage(ctx, points, size) {
  const half = Math.max(1, size / 2);
  for (const point of points) {
    ctx.fillRect(point.x - half, point.y - half, size, size);
  }
}

function drawMapImageNatural(ctx) {
  ctx.drawImage(state.mapImage, 0, 0, state.mapNaturalSize.width, state.mapNaturalSize.height);
}

async function saveBaseDraft() {
  if (!state.mapImage || !state.baseDraftActions.length) return;
  const school = getSelectedSchool();
  if (!school || !state.db) return;
  const actionsToSave = [...state.baseDraftActions];
  const canvas = document.createElement("canvas");
  canvas.width = state.mapNaturalSize.width;
  canvas.height = state.mapNaturalSize.height;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return;
  drawMapImageNatural(ctx);
  applyBaseDraftActionsToImage(ctx, actionsToSave);
  await replaceSchoolMapFromCanvas(school, canvas, school.mapImageName || `${safeFileName(school.name)}-map.png`);
  state.baseDraftActions = state.baseDraftActions.filter((action) => !actionsToSave.includes(action));
  clearActiveDraft();
  updateImagePalette();
  renderEditorState();
  queueDraw();
}

function applyBaseDraftActionsToImage(ctx, actions) {
  const strokeLayer = document.createElement("canvas");
  strokeLayer.width = state.mapNaturalSize.width;
  strokeLayer.height = state.mapNaturalSize.height;
  const strokeCtx = strokeLayer.getContext("2d");
  if (!strokeCtx) return;
  for (const action of actions) {
    if (action.kind === "stroke") {
      if (action.stroke.mode === "erase") {
        strokeCtx.save();
        strokeCtx.globalCompositeOperation = "destination-out";
        applyImageStroke(strokeCtx, { ...action.stroke, mode: "paint", color: "#000000" }, "destination-out");
        strokeCtx.restore();
      } else {
        applyImageStroke(strokeCtx, action.stroke);
      }
    } else {
      clearImageArea(strokeCtx, action.area);
      applyBaseActionToContext(ctx, action);
    }
  }
  ctx.drawImage(strokeLayer, 0, 0);
}

async function replaceSchoolMapFromCanvas(school, canvas, name) {
  const blob = await canvasToBlob(canvas, "image/png");
  const fileName = (name || "map.png").replace(/\.[^.]+$/i, ".png");
  const file = new File([blob], fileName || "map.png", { type: "image/png" });
  const mapMeta = await putMapImage(school.id, file);

  const existingUrl = state.mapImageUrls.get(school.id);
  if (existingUrl) URL.revokeObjectURL(existingUrl);
  const url = URL.createObjectURL(file);
  state.objectUrls.add(url);
  state.mapImageUrls.set(school.id, url);
  school.mapImageName = file.name;
  school.mapMeta = mapMeta || await createMapMetaFromFile(file);
  school.mapImageStored = true;
  saveSchools();
  renderSchoolInfoSummary(school);

  state.mapImage = await loadImageElement(url);
  state.mapNaturalSize = {
    width: state.mapImage.naturalWidth,
    height: state.mapImage.naturalHeight
  };
  clearStructureLayerCache();
  rebuildInteractionPreview();
  warmupMapRendering();
  updateImagePalette();
  clampView();
}

function canvasToBlob(canvas, type) {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("无法生成地图图片"));
    }, type);
  });
}

async function finishActiveStroke() {
  const stroke = state.activeStroke;
  state.activeStroke = null;
  if (!stroke || stroke.points.length < 1) return;
  if (stroke.id.startsWith("bgstroke")) {
    state.baseDraftActions.push({ id: createId("base"), kind: "stroke", stroke });
  } else if (stroke.id.startsWith("jstroke")) {
    getSelectedEditData().judgementStrokes.push(stroke);
    state.structureDraftActions.push({ id: createId("sact"), kind: "stroke", objectId: stroke.objectId || "", strokeId: stroke.id, stroke });
    persistEditData();
  } else if (stroke.id.startsWith("serase")) {
    state.structureDraftActions.push({ id: createId("sact"), kind: "eraseStroke", stroke });
  }
  state.structureObjectListKey = "";
  renderEditorState();
  queueDraw();
}

function commitCropDraft() {
  if (!state.editorEnabled || state.editorMode !== "crop" || state.rotationDraft || state.cropDraft.length || state.draftPolygon.length < 3) return;
  state.cropDraft = state.draftPolygon.map((point) => ({ ...point }));
  state.draftPolygon = [];
  renderEditorState();
  queueDraw();
}

function setRotationDraft(angle, options = {}) {
  if (!state.editorEnabled || state.editorMode !== "rotate" || !state.mapImage) return;
  const next = normalizeRotation(clamp(Number(angle) || 0, -180, 180));
  if (options.pushUndo !== false) state.rotationDraftSteps.push(state.rotationDraft);
  state.rotationDraft = next > 180 ? next - 360 : next;
  state.cropDraft = [];
  state.draftPolygon = [];
  state.draftShape = null;
  state.activeStroke = null;
  fitImageToView();
  renderEditorState();
  queueDraw();
}

function rotateMapDraftBy(delta) {
  setRotationDraft((Number(state.rotationDraft) || 0) + delta);
}

function undoCropStep() {
  if (state.editorMode !== "crop") return;
  if (state.cropDraft.length) {
    state.draftPolygon = state.cropDraft.map((point) => ({ ...point }));
    state.cropDraft = [];
  } else if (state.draftPolygon.length) {
    state.draftPolygon.pop();
  }
  renderEditorState();
  queueDraw();
}

function undoRotateStep() {
  if (state.editorMode !== "rotate" || !state.rotationDraft) return;
  state.rotationDraft = state.rotationDraftSteps.pop() ?? 0;
  fitImageToView();
  renderEditorState();
  queueDraw();
}

async function saveCropDraft() {
  if (!state.cropDraft.length || !state.mapImage) return;
  const school = getSelectedSchool();
  if (!school) return;

  const bounds = polygonBounds(state.cropDraft);
  const left = clamp(Math.floor(bounds.left), 0, state.mapNaturalSize.width - 1);
  const top = clamp(Math.floor(bounds.top), 0, state.mapNaturalSize.height - 1);
  const right = clamp(Math.ceil(bounds.right), left + 1, state.mapNaturalSize.width);
  const bottom = clamp(Math.ceil(bounds.bottom), top + 1, state.mapNaturalSize.height);
  const width = right - left;
  const height = bottom - top;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.drawImage(state.mapImage, left, top, width, height, 0, 0, width, height);
  applyCropPolygonAlphaMask(ctx, state.cropDraft, left, top, width, height);

  translateEditDataForCrop(left, top, width, height);
  translateDraftActionsForCrop(left, top, width, height);
  state.cropDraft = [];
  clearActiveDraft();
  await replaceSchoolMapFromCanvas(school, canvas, school.mapImageName || `${safeFileName(school.name)}-map.png`);
  persistEditData();
  state.structureObjectListKey = "";
  renderEditorState();
  fitImageToView();
  queueDraw();
}

async function saveRotationDraft() {
  const rotation = normalizeRotation(state.rotationDraft);
  if (state.editorMode !== "rotate" || !rotation || !state.mapImage) return;
  const school = getSelectedSchool();
  if (!school) return;

  const canvas = createRotatedMapCanvas(rotation);
  if (!canvas) return;

  const sourceSize = { ...state.mapNaturalSize };
  rotateEditData(rotation, sourceSize);
  rotateDraftActions(rotation, sourceSize);
  state.rotationDraft = 0;
  state.rotationDraftSteps = [];
  clearActiveDraft();
  await replaceSchoolMapFromCanvas(school, canvas, school.mapImageName || `${safeFileName(school.name)}-map.png`);
  persistEditData();
  state.structureObjectListKey = "";
  renderEditorState();
  fitImageToView();
  queueDraw();
}

function createRotatedMapCanvas(rotation) {
  const angle = normalizeRotation(rotation);
  if (!state.mapImage || !angle) return null;
  const { width, height } = state.mapNaturalSize;
  const transform = getRotationTransform(angle, state.mapNaturalSize);
  const canvas = document.createElement("canvas");
  canvas.width = Math.ceil(transform.width);
  canvas.height = Math.ceil(transform.height);
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate(transform.radians);
  ctx.drawImage(state.mapImage, -width / 2, -height / 2, width, height);
  ctx.restore();
  return canvas;
}

function commitBaseRegionDraft() {
  if (!canCommitBaseRegion()) return;
  const area = getCurrentAreaDraft();
  if (!area) return;
  if (state.activeTool === "fillArea") {
    state.baseDraftActions.push({ id: createId("base"), kind: "fillArea", area, color: state.brushColor });
  }
  clearActiveDraft();
  renderEditorState();
  queueDraw();
}

function undoBaseStep() {
  if (state.editorMode !== "base" && state.editorMode !== "color") return;
  if (state.draftPolygon.length) {
    state.draftPolygon.pop();
  } else if (state.draftShape) {
    state.draftShape = null;
  } else if (state.baseDraftActions.length) {
    state.baseDraftActions.pop();
  }
  renderEditorState();
  queueDraw();
}

function addStructureObject() {
  const editData = getSelectedEditData();
  const type = els.structureObjectTypeInput.value || "custom";
  const region = {
    id: createId("region"),
    name: els.structureObjectNameInput.value.trim() || getStructureObjectFallbackName(null),
    type,
    walkable: type === "custom" ? els.structureObjectWalkableInput.checked : TYPE_STYLES[type]?.walkable ?? true,
    color: els.structureObjectColorInput.value || TYPE_STYLES[type]?.line || TYPE_STYLES.custom.line,
    visible: true,
    polygon: [],
    areas: [],
    createdAt: new Date().toISOString()
  };
  editData.structureRegions.push(region);
  state.selectedStructureObjectId = region.id;
  if (isLinearStructureType(type)) state.activeTool = "structureLine";
  state.structureListPage = Math.max(0, Math.ceil(editData.structureRegions.length / STRUCTURE_LIST_PAGE_SIZE) - 1);
  state.structureObjectListKey = "";
  markStructureLayerDirty();
  persistEditData();
  renderEditorState();
  queueDraw();
}

function updateSelectedStructureObject() {
  const selected = getSelectedStructureObject();
  if (!selected) return;
  const type = els.structureObjectTypeInput.value || "custom";
  selected.name = els.structureObjectNameInput.value.trim() || getStructureObjectFallbackName(selected, { excludeId: selected.id });
  selected.type = TYPE_STYLES[type] ? type : "custom";
  selected.walkable = selected.type === "custom" ? els.structureObjectWalkableInput.checked : TYPE_STYLES[selected.type]?.walkable ?? true;
  selected.color = els.structureObjectColorInput.value || TYPE_STYLES[selected.type]?.line || selected.color;
  selected.updatedAt = new Date().toISOString();
  for (const stroke of getSelectedEditData().judgementStrokes) {
    if (stroke.objectId !== selected.id) continue;
    stroke.name = selected.name;
    stroke.type = selected.type;
    stroke.walkable = selected.walkable;
    stroke.color = selected.color;
  }
  for (const selection of getSelectedEditData().structureSelections) {
    if (selection.objectId !== selected.id) continue;
    selection.name = selected.name;
    selection.type = selected.type;
    selection.walkable = selected.walkable;
    selection.color = selected.color;
  }
  markStructureLayerDirty();
  persistEditData();
  state.structureObjectListKey = "";
  renderEditorState();
  queueDraw();
}

function deleteSelectedStructureObject() {
  const selected = getSelectedStructureObject();
  if (!selected) return;
  const editData = getSelectedEditData();
  editData.structureRegions = editData.structureRegions.filter((region) => region.id !== selected.id);
  editData.judgementStrokes = editData.judgementStrokes.filter((stroke) => stroke.objectId !== selected.id);
  editData.structureSelections = editData.structureSelections.filter((selection) => selection.objectId !== selected.id);
  state.structureDraftActions = state.structureDraftActions.filter((action) => action.objectId !== selected.id && action.stroke?.objectId !== selected.id);
  state.selectedStructureObjectId = editData.structureRegions[0]?.id || null;
  if (!state.selectedStructureObjectId) {
    els.structureObjectNameInput.value = "";
  }
  clearActiveDraft();
  markStructureLayerDirty();
  persistEditData();
  state.structureObjectListKey = "";
  renderEditorState();
  queueDraw();
}

function setAllStructureObjectsVisible(visible) {
  const editData = getSelectedEditData();
  if (!editData.structureRegions.length) return;
  for (const region of editData.structureRegions) {
    region.visible = Boolean(visible);
  }
  markStructureLayerDirty();
  persistEditData();
  state.structureObjectListKey = "";
  renderEditorState();
  queueDraw();
}

function commitStructureRegionDraft() {
  if (!canCommitStructureRegion()) return;
  const selected = getSelectedStructureObject();
  const area = getCurrentAreaDraft();
  if (!selected || !area) return;
  state.structureDraftActions.push({ id: createId("sact"), kind: "area", objectId: selected.id, area });
  selected.areas = [...getRegionAreas(selected), area];
  if (!selected.polygon?.length && (area.kind === "polygon" || area.kind === "line")) selected.polygon = area.points.map((point) => ({ ...point }));
  markStructureLayerDirty();
  persistEditData();
  clearActiveDraft();
  renderEditorState();
  queueDraw();
}

function undoStructureStep() {
  if (state.editorMode !== "structure") return;
  if (state.draftPolygon.length) {
    state.draftPolygon.pop();
  } else if (state.draftShape) {
    state.draftShape = null;
  } else if (state.structureDraftActions.length) {
    const action = state.structureDraftActions.pop();
    undoStructureAction(action);
  }
  persistEditData();
  renderEditorState();
  queueDraw();
}

function polygonBounds(points) {
  return points.reduce(
    (bounds, point) => ({
      left: Math.min(bounds.left, point.x),
      top: Math.min(bounds.top, point.y),
      right: Math.max(bounds.right, point.x),
      bottom: Math.max(bounds.bottom, point.y)
    }),
    { left: Infinity, top: Infinity, right: -Infinity, bottom: -Infinity }
  );
}

function getCurrentAreaDraft() {
  if (state.editorMode === "crop" || state.editorMode === "rotate") return null;
  if (state.editorMode === "color") {
    if (state.areaShape === "polygon") {
      return state.draftPolygon.length >= 3 ? { kind: "polygon", points: state.draftPolygon.map((point) => ({ ...point })) } : null;
    }
    return state.draftShape ? normalizeShapeArea(state.draftShape) : null;
  }
  if (state.activeTool === "structurePolygon") {
    return state.draftPolygon.length >= 3 ? { kind: "polygon", points: state.draftPolygon.map((point) => ({ ...point })) } : null;
  }
  if (state.activeTool === "structureLine") {
    return state.draftPolygon.length >= 2
      ? { kind: "line", points: state.draftPolygon.map((point) => ({ ...point })), width: LINEAR_STRUCTURE_WIDTH }
      : null;
  }
  if (state.activeTool === "structureParallelogram") {
    return state.draftPolygon.length >= 3 ? createParallelogramAreaFromThreePoints(state.draftPolygon) : null;
  }
  return null;
}

function commitStructureDataChange() {
  markStructureLayerDirty();
  persistEditData();
  state.structureObjectListKey = "";
}

function normalizeShapeArea(shape) {
  const left = Math.min(shape.start.x, shape.end.x);
  const top = Math.min(shape.start.y, shape.end.y);
  const right = Math.max(shape.start.x, shape.end.x);
  const bottom = Math.max(shape.start.y, shape.end.y);
  if (right - left < 1 || bottom - top < 1) return null;
  return { kind: shape.kind, x: left, y: top, width: right - left, height: bottom - top };
}

function createParallelogramAreaFromThreePoints(points) {
  const source = (points || []).slice(0, 3).map(clampImagePoint);
  if (source.length < 3) return null;
  const fourth = {
    x: source[0].x + source[2].x - source[1].x,
    y: source[0].y + source[2].y - source[1].y
  };
  const areaPoints = [source[0], source[1], source[2], fourth];
  const bounds = polygonBounds(areaPoints);
  if (!Number.isFinite(bounds.left) || bounds.right - bounds.left < 1 || bounds.bottom - bounds.top < 1) return null;
  return { kind: "parallelogram", points: areaPoints };
}

function parallelogramPointsFromArea(area) {
  if (!area) return [];
  if (Array.isArray(area.points) && area.points.length >= 4) {
    return area.points.slice(0, 4).map((point) => ({ x: Number(point.x), y: Number(point.y) })).filter((point) => Number.isFinite(point.x) && Number.isFinite(point.y));
  }
  const skew = Math.min(Math.abs(area.width) * 0.24, Math.abs(area.height) * 0.55);
  return [
    { x: area.x + skew, y: area.y },
    { x: area.x + area.width, y: area.y },
    { x: area.x + area.width - skew, y: area.y + area.height },
    { x: area.x, y: area.y + area.height }
  ];
}

function fillImageArea(ctx, area, color) {
  if (!area) return;
  if (area.kind === "pixels") {
    const rgb = hexToRgb(color);
    if (!rgb) return;
    const imageData = ctx.getImageData(0, 0, state.mapNaturalSize.width, state.mapNaturalSize.height);
    for (const run of expandPixelRuns(area.pixels, imageData.width, imageData.height, 1)) {
      for (let x = run.x; x < run.x + run.length; x++) {
        const index = (run.y * imageData.width + x) * 4;
        imageData.data[index] = rgb.r;
        imageData.data[index + 1] = rgb.g;
        imageData.data[index + 2] = rgb.b;
        imageData.data[index + 3] = 255;
      }
    }
    ctx.putImageData(imageData, 0, 0);
    return;
  }
  ctx.save();
  makeImageAreaPath(ctx, area);
  ctx.fillStyle = color || "#ffffff";
  ctx.fill();
  ctx.strokeStyle = ctx.fillStyle;
  ctx.lineWidth = 2;
  ctx.lineJoin = "round";
  ctx.stroke();
  ctx.restore();
}

function paintImageAreaByColor(ctx, area, color) {
  fillImageArea(ctx, area, color);
}

function clearImageArea(ctx, area) {
  if (!area) return;
  ctx.save();
  ctx.globalCompositeOperation = "destination-out";
  if (area.kind === "pixels") {
    const imageData = ctx.getImageData(0, 0, state.mapNaturalSize.width, state.mapNaturalSize.height);
    for (const run of expandPixelRuns(area.pixels || [], imageData.width, imageData.height, 1)) {
      for (let x = run.x; x < run.x + run.length; x++) {
        const index = (run.y * imageData.width + x) * 4;
        imageData.data[index + 3] = 0;
      }
    }
    ctx.putImageData(imageData, 0, 0);
  } else {
    makeImageAreaPath(ctx, area);
    ctx.fillStyle = "#000000";
    ctx.fill();
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2;
    ctx.lineJoin = "round";
    ctx.stroke();
  }
  ctx.restore();
}

function getAreaBounds(area) {
  if (area.kind === "polygon") return polygonBounds(area.points);
  if (area.kind === "line") return polygonBounds(area.points || []);
  if (area.kind === "parallelogram") return polygonBounds(parallelogramPointsFromArea(area));
  if (area.kind === "rect" || area.kind === "ellipse") {
    return { left: area.x, top: area.y, right: area.x + area.width, bottom: area.y + area.height };
  }
  if (area.kind === "pixels") return pixelRunsBounds(area.pixels || []);
  return null;
}

function pixelRunsBounds(runs) {
  if (!runs.length) return null;
  return runs.reduce((bounds, run) => ({
    left: Math.min(bounds.left, run.x),
    top: Math.min(bounds.top, run.y),
    right: Math.max(bounds.right, run.x + run.length),
    bottom: Math.max(bounds.bottom, run.y + 1)
  }), { left: Infinity, top: Infinity, right: -Infinity, bottom: -Infinity });
}

function expandPixelRuns(runs, width, height, radius = 1) {
  const normalized = normalizePixelRuns(runs);
  if (!normalized.length || radius <= 0) return normalized;
  const selected = new Uint8Array(width * height);
  const expanded = new Uint8Array(width * height);
  for (const run of normalized) {
    if (run.y < 0 || run.y >= height) continue;
    const start = clamp(run.x, 0, width);
    const end = clamp(run.x + run.length, 0, width);
    for (let x = start; x < end; x++) selected[run.y * width + x] = 1;
  }
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (!selected[y * width + x]) continue;
      for (let dy = -radius; dy <= radius; dy++) {
        const yy = y + dy;
        if (yy < 0 || yy >= height) continue;
        for (let dx = -radius; dx <= radius; dx++) {
          const xx = x + dx;
          if (xx < 0 || xx >= width) continue;
          expanded[yy * width + xx] = 1;
        }
      }
    }
  }
  return selectedMaskToRuns(expanded, width, height);
}

function makeImageAreaPath(ctx, area) {
  ctx.beginPath();
  if (area.kind === "polygon") {
    ctx.moveTo(area.points[0].x, area.points[0].y);
    for (const point of area.points.slice(1)) ctx.lineTo(point.x, point.y);
    ctx.closePath();
  } else if (area.kind === "line") {
    const points = area.points || [];
    if (!points.length) return;
    ctx.moveTo(points[0].x, points[0].y);
    for (const point of points.slice(1)) ctx.lineTo(point.x, point.y);
  } else if (area.kind === "parallelogram") {
    const points = parallelogramPointsFromArea(area);
    ctx.moveTo(points[0].x, points[0].y);
    for (const point of points.slice(1)) ctx.lineTo(point.x, point.y);
    ctx.closePath();
  } else if (area.kind === "rect") {
    ctx.rect(area.x, area.y, area.width, area.height);
  } else if (area.kind === "ellipse") {
    ctx.ellipse(area.x + area.width / 2, area.y + area.height / 2, Math.abs(area.width / 2), Math.abs(area.height / 2), 0, 0, Math.PI * 2);
  }
}

function isPointInArea(point, area) {
  if (area.kind === "polygon") return pointInPolygon(point, area.points);
  if (area.kind === "line") return isPointInLineArea(point, area);
  if (area.kind === "parallelogram") return pointInPolygon(point, parallelogramPointsFromArea(area));
  if (area.kind === "rect") return point.x >= area.x && point.y >= area.y && point.x <= area.x + area.width && point.y <= area.y + area.height;
  if (area.kind === "ellipse") {
    const rx = Math.max(0.5, area.width / 2);
    const ry = Math.max(0.5, area.height / 2);
    const cx = area.x + rx;
    const cy = area.y + ry;
    return ((point.x - cx) ** 2) / (rx ** 2) + ((point.y - cy) ** 2) / (ry ** 2) <= 1;
  }
  if (area.kind === "pixels") return isPointInPixelRuns(point, area.pixels || []);
  return false;
}

function isPointInStructureArea(point, area, region) {
  if (area.kind === "line") return isPointInLineArea(point, area);
  if (isLinearStructureType(region?.type)) return isPointOnAreaOutline(point, area, LINEAR_STRUCTURE_WIDTH);
  return isPointInArea(point, area);
}

function isPointOnAreaOutline(point, area, width = LINEAR_STRUCTURE_WIDTH) {
  const radius = Math.max(1, Number(width) / 2);
  const points = getAreaOutlinePoints(area);
  if (points.length < 2) return isPointInArea(point, area);
  for (let index = 1; index < points.length; index++) {
    if (distanceToSegment(point, points[index - 1], points[index]) <= radius) return true;
  }
  if (area.kind !== "line" && points.length > 2 && distanceToSegment(point, points[points.length - 1], points[0]) <= radius) return true;
  return false;
}

function getAreaOutlinePoints(area) {
  if (area.kind === "polygon" || area.kind === "line") return area.points || [];
  if (area.kind === "parallelogram") return parallelogramPointsFromArea(area);
  if (area.kind === "rect" || area.kind === "ellipse") {
    const steps = area.kind === "ellipse" ? 36 : 4;
    if (area.kind === "rect") {
      return [
        { x: area.x, y: area.y },
        { x: area.x + area.width, y: area.y },
        { x: area.x + area.width, y: area.y + area.height },
        { x: area.x, y: area.y + area.height }
      ];
    }
    const rx = Math.abs(area.width / 2);
    const ry = Math.abs(area.height / 2);
    const cx = area.x + area.width / 2;
    const cy = area.y + area.height / 2;
    return Array.from({ length: steps }, (_, index) => {
      const angle = (Math.PI * 2 * index) / steps;
      return { x: cx + Math.cos(angle) * rx, y: cy + Math.sin(angle) * ry };
    });
  }
  return [];
}

function isPointInLineArea(point, area) {
  const points = area.points || [];
  if (!points.length) return false;
  const radius = Math.max(1, (Number(area.width) || LINEAR_STRUCTURE_WIDTH) / 2);
  if (points.length === 1) return distance(point, points[0]) <= radius;
  for (let index = 1; index < points.length; index++) {
    if (distanceToSegment(point, points[index - 1], points[index]) <= radius) return true;
  }
  return false;
}

function isPointInPixelRuns(point, runs) {
  const x = Math.floor(point.x);
  const y = Math.floor(point.y);
  for (const run of runs) {
    if (run.y !== y) continue;
    if (x >= run.x && x < run.x + run.length) return true;
  }
  return false;
}

function sampleStructureAt(point, options = {}) {
  const editData = getSelectedEditData();
  const includeHidden = Boolean(options.includeHidden);
  const visibleObjects = getVisibleStructureObjectIds();
  const hits = [];
  for (const region of editData.structureRegions) {
    if (!includeHidden && region.visible === false) continue;
    if (!getRegionAreas(region).some((area) => isPointInStructureArea(point, area, region))) continue;
    hits.push({
      id: region.id,
      name: region.name || "",
      type: region.type || "custom",
      walkable: getStructureTypeWalkable(region.type, region.walkable),
      displayRank: getStructureDisplayRank(region.type),
      walkRank: getStructureWalkRank(region.type)
    });
  }
  for (const stroke of editData.judgementStrokes) {
    if (!includeHidden && stroke.objectId && !visibleObjects.has(stroke.objectId)) continue;
    if (!isPointInStroke(point, stroke)) continue;
    hits.push({
      id: stroke.objectId || stroke.id,
      name: stroke.name || "",
      type: stroke.type || "custom",
      walkable: getStructureTypeWalkable(stroke.type, stroke.walkable),
      displayRank: getStructureDisplayRank(stroke.type),
      walkRank: getStructureWalkRank(stroke.type)
    });
  }
  const top = hits.sort((a, b) => b.walkRank - a.walkRank || b.displayRank - a.displayRank)[0] || null;
  return {
    walkable: top ? top.walkable : true,
    top,
    hits
  };
}

function isPointInStroke(point, stroke) {
  const points = stroke.points || [];
  if (!points.length) return false;
  const radius = Math.max(0.5, (Number(stroke.size) || STRUCTURE_BRUSH_SIZE) / 2);
  if (points.length === 1) return distance(point, points[0]) <= radius;
  for (let index = 1; index < points.length; index++) {
    if (distanceToSegment(point, points[index - 1], points[index]) <= radius) return true;
  }
  return false;
}

function distanceToSegment(point, start, end) {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const lengthSq = dx * dx + dy * dy;
  if (!lengthSq) return distance(point, start);
  const t = clamp(((point.x - start.x) * dx + (point.y - start.y) * dy) / lengthSq, 0, 1);
  return distance(point, { x: start.x + dx * t, y: start.y + dy * t });
}

function pointInPolygon(point, polygon) {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].x;
    const yi = polygon[i].y;
    const xj = polygon[j].x;
    const yj = polygon[j].y;
    const intersect = yi > point.y !== yj > point.y && point.x < ((xj - xi) * (point.y - yi)) / ((yj - yi) || 1e-9) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

function colorDistance(r, g, b, target) {
  return Math.max(Math.abs(r - target.r), Math.abs(g - target.g), Math.abs(b - target.b));
}

function hexToRgb(hex) {
  const match = /^#?([0-9a-f]{6})$/i.exec(hex || "");
  if (!match) return null;
  const value = parseInt(match[1], 16);
  return { r: (value >> 16) & 255, g: (value >> 8) & 255, b: value & 255 };
}

function euclideanColorDistance(a, b) {
  return Math.hypot(a.r - b.r, a.g - b.g, a.b - b.b);
}

function getRgbSaturation(r, g, b) {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  return max <= 0 ? 0 : (max - min) / max;
}

function translateEditDataForCrop(offsetX, offsetY, width, height) {
  const editData = getSelectedEditData();
  editData.cropPolygon = [];
  editData.backgroundStrokes = [];
  editData.structureRegions = editData.structureRegions
    .map((region) => ({
      ...region,
      polygon: region.polygon
        .map((point) => ({ x: point.x - offsetX, y: point.y - offsetY }))
        .filter((point) => point.x >= 0 && point.y >= 0 && point.x <= width && point.y <= height),
      areas: getRegionAreas(region)
        .map((area) => translateAreaForCrop(area, offsetX, offsetY, width, height))
        .filter(Boolean)
    }))
    .filter((region) => region.polygon.length >= 3 || getRegionAreas(region).length > 0);
  editData.judgementStrokes = editData.judgementStrokes
    .map((stroke) => ({
      ...stroke,
      points: stroke.points
        .map((point) => ({ x: point.x - offsetX, y: point.y - offsetY }))
        .filter((point) => point.x >= 0 && point.y >= 0 && point.x <= width && point.y <= height)
    }))
    .filter((stroke) => stroke.points.length > 0);
  editData.structureSelections = editData.structureSelections
    .map((selection) => ({
      ...selection,
      pixels: translatePixelRuns(selection.pixels, offsetX, offsetY, width, height)
    }))
    .filter((selection) => selection.pixels.length > 0);
}

function translateDraftActionsForCrop(offsetX, offsetY, width, height) {
  state.baseDraftActions = state.baseDraftActions
    .map((action) => translateBaseActionForCrop(action, offsetX, offsetY, width, height))
    .filter(Boolean);
  state.structureDraftActions = state.structureDraftActions
    .map((action) => translateStructureActionForCrop(action, offsetX, offsetY, width, height))
    .filter(Boolean);
}

function rotateEditData(rotation, sourceSize) {
  const editData = getSelectedEditData();
  editData.cropPolygon = [];
  editData.backgroundStrokes = [];
  editData.structureRegions = editData.structureRegions.map((region) => ({
    ...region,
    polygon: rotatePoints(region.polygon || [], rotation, sourceSize),
    areas: getRegionAreas(region).map((area) => rotateArea(area, rotation, sourceSize)).filter(Boolean)
  }));
  editData.judgementStrokes = editData.judgementStrokes.map((stroke) => ({
    ...stroke,
    points: rotatePoints(stroke.points || [], rotation, sourceSize)
  }));
  editData.structureSelections = editData.structureSelections.map((selection) => ({
    ...selection,
    pixels: rotatePixelRuns(selection.pixels || [], rotation, sourceSize)
  }));
}

function rotateDraftActions(rotation, sourceSize) {
  state.baseDraftActions = state.baseDraftActions
    .map((action) => rotateBaseAction(action, rotation, sourceSize))
    .filter(Boolean);
  state.structureDraftActions = state.structureDraftActions
    .map((action) => rotateStructureAction(action, rotation, sourceSize))
    .filter(Boolean);
}

function rotateBaseAction(action, rotation, sourceSize) {
  if (action.kind === "stroke") {
    return { ...action, stroke: { ...action.stroke, points: rotatePoints(action.stroke.points || [], rotation, sourceSize) } };
  }
  const area = rotateArea(action.area, rotation, sourceSize);
  return area ? { ...action, area } : null;
}

function rotateStructureAction(action, rotation, sourceSize) {
  if (action.kind === "stroke" || action.kind === "eraseStroke") {
    return { ...action, stroke: { ...action.stroke, points: rotatePoints(action.stroke.points || [], rotation, sourceSize) } };
  }
  const area = rotateArea(action.area, rotation, sourceSize);
  return area ? { ...action, area } : null;
}

function rotatePoints(points, rotation, sourceSize) {
  return (points || []).map((point) => imageToRotatedDisplay(point, rotation, sourceSize));
}

function rotateArea(area, rotation, sourceSize) {
  if (!area) return null;
  if (area.kind === "polygon") {
    const points = rotatePoints(area.points || [], rotation, sourceSize);
    return points.length >= 3 ? { ...area, points } : null;
  }
  if (area.kind === "line") {
    const points = rotatePoints(area.points || [], rotation, sourceSize);
    return points.length >= 2 ? { ...area, points } : null;
  }
  if (area.kind === "parallelogram") {
    const points = parallelogramPointsFromArea(area).map((point) => imageToRotatedDisplay(point, rotation, sourceSize));
    return points.length >= 3 ? { kind: "polygon", points } : null;
  }
  if (area.kind === "rect" || area.kind === "ellipse") {
    const corners = [
      { x: area.x, y: area.y },
      { x: area.x + area.width, y: area.y },
      { x: area.x + area.width, y: area.y + area.height },
      { x: area.x, y: area.y + area.height }
    ].map((point) => imageToRotatedDisplay(point, rotation, sourceSize));
    const bounds = polygonBounds(corners);
    return { ...area, x: bounds.left, y: bounds.top, width: bounds.right - bounds.left, height: bounds.bottom - bounds.top };
  }
  return null;
}

function rotatePixelRuns(runs, rotation, sourceSize) {
  const angle = normalizeRotation(rotation);
  if (!angle) return normalizePixelRuns(runs);
  const rows = new Map();
  for (const run of normalizePixelRuns(runs)) {
    for (let x = run.x; x < run.x + run.length; x++) {
      const point = imagePixelToRotatedDisplay({ x, y: run.y }, angle, sourceSize);
      const px = Math.round(point.x);
      const py = Math.round(point.y);
      if (!rows.has(py)) rows.set(py, []);
      rows.get(py).push(px);
    }
  }
  const result = [];
  const sortedRows = [...rows.entries()].sort((a, b) => a[0] - b[0]);
  for (const [y, xs] of sortedRows) {
    const unique = [...new Set(xs)].sort((a, b) => a - b);
    let start = unique[0];
    let previous = unique[0];
    for (const x of unique.slice(1)) {
      if (x === previous + 1) {
        previous = x;
      } else {
        result.push({ y, x: start, length: previous - start + 1 });
        start = x;
        previous = x;
      }
    }
    if (Number.isFinite(start)) result.push({ y, x: start, length: previous - start + 1 });
  }
  return result;
}

function translateBaseActionForCrop(action, offsetX, offsetY, width, height) {
  if (action.kind === "stroke") {
    const points = action.stroke.points
      .map((point) => ({ x: point.x - offsetX, y: point.y - offsetY }))
      .filter((point) => point.x >= 0 && point.y >= 0 && point.x <= width && point.y <= height);
    return points.length ? { ...action, stroke: { ...action.stroke, points } } : null;
  }
  const area = translateAreaForCrop(action.area, offsetX, offsetY, width, height);
  return area ? { ...action, area } : null;
}

function translateStructureActionForCrop(action, offsetX, offsetY, width, height) {
  if (action.kind === "stroke" || action.kind === "eraseStroke") {
    const points = action.stroke.points
      .map((point) => ({ x: point.x - offsetX, y: point.y - offsetY }))
      .filter((point) => point.x >= 0 && point.y >= 0 && point.x <= width && point.y <= height);
    return points.length ? { ...action, stroke: { ...action.stroke, points } } : null;
  }
  if (action.kind === "area") {
    const area = translateAreaForCrop(action.area, offsetX, offsetY, width, height);
    return area ? { ...action, area } : null;
  }
  return action;
}

function translateAreaForCrop(area, offsetX, offsetY, width, height) {
  if (!area) return null;
  if (area.kind === "polygon") {
    const points = area.points
      .map((point) => ({ x: point.x - offsetX, y: point.y - offsetY }))
      .filter((point) => point.x >= 0 && point.y >= 0 && point.x <= width && point.y <= height);
    return points.length >= 3 ? { ...area, points } : null;
  }
  if (area.kind === "line") {
    const points = area.points
      .map((point) => ({ x: point.x - offsetX, y: point.y - offsetY }))
      .filter((point) => point.x >= 0 && point.y >= 0 && point.x <= width && point.y <= height);
    return points.length >= 2 ? { ...area, points } : null;
  }
  if (area.kind === "parallelogram" && Array.isArray(area.points)) {
    const points = parallelogramPointsFromArea(area)
      .map((point) => ({ x: point.x - offsetX, y: point.y - offsetY }))
      .filter((point) => point.x >= 0 && point.y >= 0 && point.x <= width && point.y <= height);
    return points.length >= 4 ? { kind: "parallelogram", points } : null;
  }
  if (area.kind === "pixels") {
    const pixels = translatePixelRuns(area.pixels || [], offsetX, offsetY, width, height);
    return pixels.length ? { ...area, pixels } : null;
  }
  const translated = { ...area, x: area.x - offsetX, y: area.y - offsetY };
  const bounds = getAreaBounds(translated);
  if (!bounds || bounds.right < 0 || bounds.bottom < 0 || bounds.left > width || bounds.top > height) return null;
  return translated;
}

function undoStructureAction(action) {
  if (!action) return;
  if (action.kind === "area") {
    const region = getSelectedEditData().structureRegions.find((item) => item.id === action.objectId);
    if (!region) return;
    const areas = getRegionAreas(region);
    areas.pop();
    region.areas = areas;
    const fallbackArea = areas.find((area) => area.kind === "polygon" || area.kind === "line");
    region.polygon = fallbackArea?.points?.map((point) => ({ ...point })) || [];
  } else if (action.kind === "pixels") {
    const editData = getSelectedEditData();
    const region = editData.structureRegions.find((item) => item.id === action.objectId);
    if (region) {
      const areas = getRegionAreas(region);
      areas.pop();
      region.areas = areas;
    }
    editData.structureSelections = editData.structureSelections.filter((selection) => selection.id !== action.selectionId);
  } else if (action.kind === "stroke") {
    const editData = getSelectedEditData();
    editData.judgementStrokes = editData.judgementStrokes.filter((stroke) => stroke.id !== action.strokeId);
  }
}

function translatePixelRuns(runs, offsetX, offsetY, width, height) {
  const translated = [];
  for (const run of runs) {
    const y = run.y - offsetY;
    if (y < 0 || y >= height) continue;
    const start = Math.max(0, run.x - offsetX);
    const end = Math.min(width, run.x + run.length - offsetX);
    if (end > start) translated.push({ y, x: start, length: end - start });
  }
  return translated;
}

function offsetPixelRuns(runs, offsetX, offsetY) {
  return normalizePixelRuns(runs).map((run) => ({
    y: run.y + offsetY,
    x: run.x + offsetX,
    length: run.length
  }));
}

function undoLastEdit() {
  const editData = getSelectedEditData();
  if (state.draftPolygon.length) {
    state.draftPolygon.pop();
  } else if (editData.structureSelections.length) {
    editData.structureSelections.pop();
  } else if (editData.judgementStrokes.length) {
    editData.judgementStrokes.pop();
  } else if (editData.structureRegions.length) {
    editData.structureRegions.pop();
  }
  persistEditData();
  state.structureObjectListKey = "";
  queueDraw();
}

function pickColorAt(imagePoint) {
  if (!state.mapImage || !state.mapNaturalSize.width || !state.mapNaturalSize.height) return;
  const x = clamp(Math.round(imagePoint.x), 0, state.mapNaturalSize.width - 1);
  const y = clamp(Math.round(imagePoint.y), 0, state.mapNaturalSize.height - 1);
  const imageData = getCurrentMapImageData();
  const index = (y * imageData.width + x) * 4;
  const [r, g, b, a] = imageData.data.slice(index, index + 4);
  if (a < 16) return;
  setActiveEditorColor(rgbToHex(r, g, b));
}

function createStructureSelectionFromColor(imagePoint, mode) {
  const selected = getSelectedStructureObject();
  if (!state.mapImage || !selected) return;
  const x = Math.round(imagePoint.x);
  const y = Math.round(imagePoint.y);
  if (x < 0 || y < 0 || x >= state.mapNaturalSize.width || y >= state.mapNaturalSize.height) return;
  const imageData = getCurrentMapImageData();
  if (!imageData) return;

  const target = getPixel(imageData, x, y);
  const pixels = mode === "sameColorAll"
    ? selectAllSameColor(imageData, target, state.colorTolerance)
    : selectConnectedSameColor(imageData, x, y, target, state.colorTolerance);
  if (!pixels.length) return;
  addPixelSelectionToStructureObject(selected, pixels, rgbToHex(target.r, target.g, target.b));
}


function addPixelSelectionToStructureObject(selected, pixels, color) {
  const pixelsKey = pixelRunsKey(pixels);
  const existingArea = getRegionAreas(selected).some((area) => area.kind === "pixels" && pixelRunsKey(area.pixels || []) === pixelsKey);
  if (existingArea) {
    state.structureSelectionPreview = null;
    renderEditorState();
    queueDraw();
    return false;
  }

  const selection = {
    id: createId("sel"),
    objectId: selected.id,
    name: getStructureObjectDisplayName(selected),
    type: selected.type,
    walkable: selected.walkable,
    color,
    pixels,
    createdAt: new Date().toISOString()
  };

  const editData = getSelectedEditData();
  const existingSelection = editData.structureSelections.some((item) => item.objectId === selected.id && pixelRunsKey(item.pixels || []) === pixelsKey);
  if (!existingSelection) editData.structureSelections.push(selection);
  selected.areas = [...getRegionAreas(selected), { kind: "pixels", pixels, color: selection.color }];
  state.structureDraftActions.push({ id: createId("sact"), kind: "pixels", objectId: selected.id, selectionId: selection.id });
  state.structureSelectionPreview = selection;
  markStructureLayerDirty();
  persistEditData();
  state.structureObjectListKey = "";
  renderEditorState();
  queueDraw();
  return true;
}

function createBaseColorFillFromColor(imagePoint, mode) {
  if (!state.mapImage) return;
  const x = Math.round(imagePoint.x);
  const y = Math.round(imagePoint.y);
  if (x < 0 || y < 0 || x >= state.mapNaturalSize.width || y >= state.mapNaturalSize.height) return;
  const imageData = getCurrentMapImageData();
  if (!imageData) return;
  const target = getPixel(imageData, x, y);
  const pixels = mode === "colorAll"
    ? selectAllSameColor(imageData, target, state.colorTolerance)
    : selectConnectedSameColor(imageData, x, y, target, state.colorTolerance);
  if (!pixels.length) return;
  state.baseDraftActions.push({
    id: createId("base"),
    kind: "replaceArea",
    area: { kind: "pixels", pixels },
    targetColor: state.brushColor,
    tolerance: state.colorTolerance,
    selectionMode: mode
  });
  clearActiveDraft();
  renderEditorState();
  queueDraw();
}

function getCurrentMapImageData() {
  const canvas = document.createElement("canvas");
  canvas.width = state.mapNaturalSize.width;
  canvas.height = state.mapNaturalSize.height;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx || !state.mapImage) return null;
  drawMapImageNatural(ctx);
  return ctx.getImageData(0, 0, canvas.width, canvas.height);
}

function getPixel(imageData, x, y) {
  const index = (y * imageData.width + x) * 4;
  return {
    r: imageData.data[index],
    g: imageData.data[index + 1],
    b: imageData.data[index + 2],
    a: imageData.data[index + 3]
  };
}

function isSamePixel(imageData, x, y, target, tolerance = 0) {
  const index = (y * imageData.width + x) * 4;
  return (
    Math.abs(imageData.data[index] - target.r) <= tolerance &&
    Math.abs(imageData.data[index + 1] - target.g) <= tolerance &&
    Math.abs(imageData.data[index + 2] - target.b) <= tolerance &&
    Math.abs(imageData.data[index + 3] - target.a) <= tolerance
  );
}


function selectAllSameColor(imageData, target, tolerance = 0) {
  const runs = [];
  for (let y = 0; y < imageData.height; y++) {
    let runStart = -1;
    for (let x = 0; x < imageData.width; x++) {
      const same = isSamePixel(imageData, x, y, target, tolerance);
      if (same && runStart < 0) runStart = x;
      if ((!same || x === imageData.width - 1) && runStart >= 0) {
        const end = same && x === imageData.width - 1 ? x + 1 : x;
        runs.push({ y, x: runStart, length: end - runStart });
        runStart = -1;
      }
    }
  }
  return runs;
}

function selectConnectedSameColor(imageData, startX, startY, target, tolerance = 0) {
  const width = imageData.width;
  const height = imageData.height;
  const visited = new Uint8Array(width * height);
  const selected = new Uint8Array(width * height);
  const queue = [{ x: startX, y: startY }];
  visited[startY * width + startX] = 1;
  let head = 0;

  while (head < queue.length) {
    const point = queue[head++];
    if (!isSamePixel(imageData, point.x, point.y, target, tolerance)) continue;
    selected[point.y * width + point.x] = 1;
    const neighbors = [
      { x: point.x + 1, y: point.y },
      { x: point.x - 1, y: point.y },
      { x: point.x, y: point.y + 1 },
      { x: point.x, y: point.y - 1 }
    ];
    for (const next of neighbors) {
      if (next.x < 0 || next.y < 0 || next.x >= width || next.y >= height) continue;
      const index = next.y * width + next.x;
      if (visited[index]) continue;
      visited[index] = 1;
      queue.push(next);
    }
  }

  return selectedMaskToRuns(selected, width, height);
}

function selectedMaskToRuns(mask, width, height) {
  const runs = [];
  for (let y = 0; y < height; y++) {
    let runStart = -1;
    for (let x = 0; x < width; x++) {
      const selected = mask[y * width + x] === 1;
      if (selected && runStart < 0) runStart = x;
      if ((!selected || x === width - 1) && runStart >= 0) {
        const end = selected && x === width - 1 ? x + 1 : x;
        runs.push({ y, x: runStart, length: end - runStart });
        runStart = -1;
      }
    }
  }
  return runs;
}

function persistEditData() {
  const school = getSelectedSchool();
  if (!school) return;
  const editData = getSelectedEditData();
  state.editCache.set(school.id, editData);
  markStructureLayerDirty();
  syncSchoolStructureResourceState(school, editData);
  void putEditData(school.id, editData);
}

function syncSchoolStructureResourceState(school, editData) {
  if (!school) return;
  const hasStructure = hasMeaningfulEditData(editData);
  if (hasStructure && !school.structureName) {
    school.structureName = "已编辑结构";
    saveSchools();
    renderCurrentSchool();
    renderSchoolInfoSummary(school);
    if (els.schoolDialog.open) renderSchoolDialogPanels();
  } else if (!hasStructure && school.structureName === "已编辑结构") {
    school.structureName = "";
    saveSchools();
    renderCurrentSchool();
    renderSchoolInfoSummary(school);
    if (els.schoolDialog.open) renderSchoolDialogPanels();
  }
}

function hasMeaningfulEditData(editData) {
  return Boolean(
    editData?.cropPolygon?.length ||
    editData?.backgroundStrokes?.length ||
    editData?.structureRegions?.length ||
    editData?.judgementStrokes?.length ||
    editData?.structureSelections?.length
  );
}

function queueDraw() {
  if (state.renderQueued) return;
  state.renderQueued = true;
  requestAnimationFrame(() => {
    state.renderQueued = false;
    draw();
  });
}

function draw() {
  const canvas = els.mapCanvas;
  const ctx = canvas.getContext("2d");
  const { width, height, dpr } = state.canvasSize;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#d9e5d2";
  ctx.fillRect(0, 0, width, height);

  if (!state.mapImage) {
    updateZoomReadout();
    return;
  }

  const editData = getSelectedEditData();
  ctx.save();

  if (!state.editorEnabled) {
    drawGameScene(ctx, editData);
    ctx.restore();
    updateZoomReadout();
    return;
  }

  const fastDraw = isFastMapInteraction();
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = fastDraw ? "low" : "high";
  if (state.showBaseLayer) {
    ctx.save();
    if (state.editLayer === "structure") ctx.globalAlpha = state.baseOpacity;
    drawBaseMapLayer(ctx, fastDraw);
    ctx.restore();
    if (state.editorMode === "base" || state.editorMode === "color") {
      drawBaseDraftActions(ctx, state.baseDraftActions, state.editorMode === "base" ? state.activeStroke : null);
    }
  }

  if (state.showStructureLayer) {
    drawStructureLayer(ctx, editData);
    if (state.editorMode === "structure" && state.activeStroke && state.activeStroke.id.startsWith("jstroke")) {
      drawJudgementStrokes(ctx, [state.activeStroke]);
    }
  }
  ctx.restore();

  drawDraftShape(ctx);
  drawDraftPolygon(ctx);
  drawBrushCursor(ctx);
  updateZoomReadout();
}

function isFastMapInteraction() {
  return performance.now() < state.interactionFastUntil || state.pointer.down;
}

function drawGameScene(ctx, editData) {
  if (state.gameData.location.kind === "building") {
    drawInteriorScene(ctx);
    return;
  }
  const fastDraw = isFastMapInteraction();
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = fastDraw ? "low" : "high";
  drawBaseMapLayer(ctx, fastDraw);
  drawGamePhotoMarkers(ctx);
  drawNearbyBuildingHints(ctx, editData);
  drawPlayer(ctx);
  drawTouchJoystick(ctx);
}

function drawGamePhotoMarkers(ctx) {
  const showFarMarkers = state.gameData.settings.showPhotoMarkers !== false;
  const playerRadius = state.gameData.player.radius || DEFAULT_PLAYER_RADIUS;
  for (const spot of state.gameData.photoSpots) {
    const screen = imageToScreen(spot);
    const radius = Math.max(7, (spot.radius || playerRadius) * state.view.scale * 0.36);
    if (screen.x < -radius || screen.y < -radius || screen.x > state.canvasSize.width + radius || screen.y > state.canvasSize.height + radius) continue;
    const active = spot.id === state.gameData.selectedPhotoSpotId || spot.id === state.currentNearbyPhotoSpotId;
    if (!active && !showFarMarkers) continue;
    ctx.save();
    ctx.fillStyle = active ? "rgba(226, 118, 77, 0.95)" : "rgba(255, 250, 240, 0.88)";
    ctx.strokeStyle = active ? "#8f3f2d" : "rgba(31, 85, 78, 0.88)";
    ctx.lineWidth = active ? Math.max(3, state.view.scale * 0.9) : Math.max(2, state.view.scale * 0.55);
    ctx.beginPath();
    ctx.arc(screen.x, screen.y, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    if (active) {
      ctx.beginPath();
      ctx.arc(screen.x, screen.y, radius + Math.max(4, state.view.scale * 0.8), 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(143, 63, 45, 0.24)";
      ctx.lineWidth = Math.max(2, state.view.scale * 0.4);
      ctx.stroke();
    }
    ctx.fillStyle = active ? "#fffaf0" : "#1f554e";
    ctx.font = "900 12px Microsoft YaHei, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(String(spot.photos.length || 0), screen.x, screen.y + 0.5);
    if (active && (spot.name || getPhotoSpotDisplayName(spot))) {
      const label = getPhotoSpotDisplayName(spot);
      const metrics = ctx.measureText(label);
      const labelWidth = Math.min(metrics.width + 16, 180);
      ctx.fillStyle = "rgba(255, 250, 240, 0.9)";
      ctx.strokeStyle = "rgba(31, 85, 78, 0.22)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(screen.x - labelWidth / 2, screen.y - radius - 28, labelWidth, 22, 6);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#1d2a24";
      ctx.font = "800 12px Microsoft YaHei, sans-serif";
      ctx.fillText(label, screen.x, screen.y - radius - 17);
    }
    ctx.restore();
  }
}

function drawNearbyBuildingHints(ctx, editData) {
  const nearby = new Set(state.currentNearbyBuildingIds);
  const showNames = state.gameData.settings.showInteractionMarkers !== false;
  if (!nearby.size && !showNames) return;
  for (const region of editData.structureRegions || []) {
    const isNearby = nearby.has(region.id);
    if (!isNearby && !showNames) continue;
    const selected = region.id === state.gameData.selectedBuildingId;
    const type = region.type || "custom";
    if (isNearby) {
      ctx.save();
      ctx.fillStyle = selected
        ? "rgba(47, 111, 102, 0.22)"
        : type === "field"
          ? "rgba(109, 174, 88, 0.20)"
          : "rgba(255, 250, 240, 0.16)";
      ctx.strokeStyle = selected
        ? "#1f554e"
        : type === "field"
          ? "rgba(74, 126, 58, 0.85)"
          : "rgba(31, 85, 78, 0.72)";
      ctx.lineWidth = selected ? 4 : 3;
      ctx.shadowColor = selected ? "rgba(31, 85, 78, 0.18)" : "rgba(31, 85, 78, 0.12)";
      ctx.shadowBlur = selected ? 10 : 7;
      for (const area of getRegionAreas(region)) {
        if (area.kind === "pixels") continue;
        drawScreenAreaPath(ctx, area);
        ctx.fill();
        ctx.stroke();
      }
      ctx.restore();
    }
    ctx.save();
    const bounds = getRegionLabelBounds(getRegionAreas(region));
    if (bounds && showNames) {
      const center = imageToScreen({
        x: (bounds.left + bounds.right) / 2,
        y: (bounds.top + bounds.bottom) / 2
      });
      const label = getStructureInteractionLabel(region);
      ctx.font = "800 13px Microsoft YaHei, sans-serif";
      const metrics = ctx.measureText(label);
      const width = Math.min(metrics.width + 18, 220);
      const height = 24;
      ctx.fillStyle = selected ? "rgba(31, 85, 78, 0.92)" : isNearby ? "rgba(255, 250, 240, 0.82)" : "rgba(255, 250, 240, 0.68)";
      ctx.strokeStyle = selected ? "rgba(31, 85, 78, 0.34)" : "rgba(31, 85, 78, 0.16)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(center.x - width / 2, center.y - height / 2, width, height, 6);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = selected ? "#fffaf0" : "#1d2a24";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(label, center.x, center.y, width - 10);
    }
    ctx.restore();
  }
}

function drawPlayer(ctx) {
  const player = state.gameData.player;
  const screen = imageToScreen(player);
  const radius = Math.max(10, (player.radius || DEFAULT_PLAYER_RADIUS) * state.view.scale);
  ctx.save();
  ctx.beginPath();
  ctx.arc(screen.x, screen.y, radius, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(255, 250, 240, 0.24)";
  ctx.fill();
  ctx.strokeStyle = "#1f554e";
  ctx.lineWidth = Math.max(2, 2.5 * state.view.scale);
  ctx.stroke();
  ctx.fillStyle = "#8dbf59";
  ctx.beginPath();
  ctx.arc(screen.x, screen.y, radius * 0.42, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawTouchJoystick(ctx) {
  if (!state.touchMoveVector.active || !state.gamePointerDown) return;
  const pointer = state.gamePointerDown;
  ctx.save();
  ctx.fillStyle = "rgba(255, 250, 240, 0.24)";
  ctx.strokeStyle = "rgba(31, 85, 78, 0.55)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(pointer.startX, pointer.startY, 54, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "rgba(31, 85, 78, 0.75)";
  ctx.beginPath();
  ctx.arc(pointer.startX + state.touchMoveVector.x * 54, pointer.startY + state.touchMoveVector.y * 54, 18, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawInteriorScene(ctx) {
  const building = getSelectedBuildingMemory();
  const region = getStructureRegionById(state.gameData.location.buildingId);
  ctx.save();
  ctx.fillStyle = "#e8e1d3";
  ctx.fillRect(0, 0, state.canvasSize.width, state.canvasSize.height);
  ctx.fillStyle = "#fffaf0";
  ctx.strokeStyle = "#c9bca7";
  ctx.lineWidth = 1;
  const margin = 28;
  ctx.fillRect(margin, margin, state.canvasSize.width - margin * 2, state.canvasSize.height - margin * 2);
  ctx.strokeRect(margin, margin, state.canvasSize.width - margin * 2, state.canvasSize.height - margin * 2);
  ctx.fillStyle = "#1f554e";
  ctx.font = "800 18px Microsoft YaHei, sans-serif";
  ctx.fillText(getBuildingDisplayName(region, building), margin + 18, margin + 34);
  const rooms = building?.rooms || [];
  const cols = Math.max(1, Math.min(3, Math.floor((state.canvasSize.width - margin * 2) / 180)));
  const cardW = Math.max(132, (state.canvasSize.width - margin * 2 - 44 - (cols - 1) * 16) / cols);
  const cardH = 92;
  rooms.forEach((room, index) => {
    const col = index % cols;
    const row = Math.floor(index / cols);
    const x = margin + 22 + col * (cardW + 16);
    const y = margin + 62 + row * (cardH + 16);
    const active = room.id === state.gameData.selectedRoomId;
    ctx.fillStyle = active ? "#e8f0e7" : "#fffdf6";
    ctx.strokeStyle = active ? "#1f554e" : "#d7cbb8";
    ctx.lineWidth = active ? 2 : 1;
    ctx.beginPath();
    ctx.roundRect(x, y, cardW, cardH, 8);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#1d2a24";
    ctx.font = "800 14px Microsoft YaHei, sans-serif";
    ctx.fillText(room.name || room.type || "房间", x + 12, y + 28, cardW - 24);
    ctx.fillStyle = "#667064";
    ctx.font = "700 12px Microsoft YaHei, sans-serif";
    ctx.fillText(`${room.people.length} 人  ${room.photos.length} 图`, x + 12, y + 54, cardW - 24);
  });
  ctx.restore();
}

function drawBaseMapLayer(ctx, fastDraw = false) {
  if (isRotationPreviewActive()) {
    drawRotatedMapLayer(ctx);
    return;
  }
  const bounds = getActiveCropPreviewBounds();
  if (bounds) {
    drawTransparentCheckerboard(ctx, state.view.x, state.view.y, bounds.width * state.view.scale, bounds.height * state.view.scale);
    ctx.save();
    makeCropPreviewClipPath(ctx, state.cropDraft);
    ctx.clip();
    drawMapImageRegion(ctx, bounds.left, bounds.top, bounds.width, bounds.height, state.view.x, state.view.y, bounds.width * state.view.scale, bounds.height * state.view.scale, fastDraw);
    ctx.restore();
    return;
  }
  drawMapImageRegion(ctx, 0, 0, state.mapNaturalSize.width, state.mapNaturalSize.height, state.view.x, state.view.y, state.mapNaturalSize.width * state.view.scale, state.mapNaturalSize.height * state.view.scale, fastDraw);
}

function drawMapImageRegion(ctx, sx, sy, sw, sh, dx, dy, dw, dh, fastDraw = false) {
  const visibleLeft = Math.max(0, dx);
  const visibleTop = Math.max(0, dy);
  const visibleRight = Math.min(state.canvasSize.width, dx + dw);
  const visibleBottom = Math.min(state.canvasSize.height, dy + dh);
  if (visibleRight <= visibleLeft || visibleBottom <= visibleTop || dw <= 0 || dh <= 0 || sw <= 0 || sh <= 0) return;

  const sourceLeft = sx + ((visibleLeft - dx) / dw) * sw;
  const sourceTop = sy + ((visibleTop - dy) / dh) * sh;
  const sourceWidth = Math.min(sx + sw - sourceLeft, ((visibleRight - visibleLeft) / dw) * sw);
  const sourceHeight = Math.min(sy + sh - sourceTop, ((visibleBottom - visibleTop) / dh) * sh);
  if (sourceWidth <= 0 || sourceHeight <= 0) return;
  const preview = state.interactionPreviewCanvas;
  if (fastDraw && preview.width > 1 && preview.height > 1 && state.interactionPreviewScale > 0) {
    const scale = state.interactionPreviewScale;
    ctx.drawImage(
      preview,
      sourceLeft * scale,
      sourceTop * scale,
      sourceWidth * scale,
      sourceHeight * scale,
      visibleLeft,
      visibleTop,
      visibleRight - visibleLeft,
      visibleBottom - visibleTop
    );
    return;
  }
  ctx.drawImage(
    state.mapImage,
    sourceLeft,
    sourceTop,
    sourceWidth,
    sourceHeight,
    visibleLeft,
    visibleTop,
    visibleRight - visibleLeft,
    visibleBottom - visibleTop
  );
}

function drawRotatedMapLayer(ctx) {
  const rotation = normalizeRotation(state.rotationDraft);
  if (!rotation) return;
  const size = getActiveMapDisplaySize();
  const transform = getRotationTransform(rotation, state.mapNaturalSize);
  drawTransparentCheckerboard(ctx, state.view.x, state.view.y, size.width * state.view.scale, size.height * state.view.scale);
  ctx.save();
  ctx.translate(state.view.x, state.view.y);
  ctx.scale(state.view.scale, state.view.scale);
  ctx.translate(size.width / 2, size.height / 2);
  ctx.rotate(transform.radians);
  ctx.drawImage(state.mapImage, -state.mapNaturalSize.width / 2, -state.mapNaturalSize.height / 2, state.mapNaturalSize.width, state.mapNaturalSize.height);
  ctx.restore();
  drawRotationPreviewLabel(ctx, rotation, size);
}

function drawRotationPreviewLabel(ctx, rotation, size) {
  const label = `旋转预览 ${rotation}°`;
  ctx.save();
  ctx.strokeStyle = "#d08c27";
  ctx.lineWidth = 3;
  ctx.strokeRect(state.view.x, state.view.y, size.width * state.view.scale, size.height * state.view.scale);
  ctx.fillStyle = "rgba(255, 250, 240, 0.9)";
  ctx.font = "700 13px Microsoft YaHei, sans-serif";
  const metrics = ctx.measureText(label);
  const labelX = state.view.x + 8;
  const labelY = state.view.y + 8;
  ctx.fillRect(labelX - 4, labelY - 2, metrics.width + 8, 22);
  ctx.fillStyle = "#1f554e";
  ctx.fillText(label, labelX, labelY + 15);
  ctx.restore();
}

function drawBaseDraftActions(ctx, actions, activeStroke = null) {
  if (!actions.length && !activeStroke) return;
  const overlay = state.overlayCanvas;
  const strokeOverlay = state.strokeOverlayCanvas;
  overlay.width = state.canvasSize.width;
  overlay.height = state.canvasSize.height;
  strokeOverlay.width = state.canvasSize.width;
  strokeOverlay.height = state.canvasSize.height;
  const overlayCtx = overlay.getContext("2d");
  const strokeCtx = strokeOverlay.getContext("2d");
  if (!overlayCtx || !strokeCtx) return;
  overlayCtx.clearRect(0, 0, overlay.width, overlay.height);
  strokeCtx.clearRect(0, 0, strokeOverlay.width, strokeOverlay.height);
  for (const action of actions) {
    if (action.kind === "stroke") drawBaseStrokePreview(strokeCtx, action.stroke);
    else if (action.kind === "fillArea") {
      clearScreenArea(strokeCtx, action.area);
      drawScreenArea(overlayCtx, action.area, action.color, "", false);
    } else if (action.kind === "replaceArea") {
      clearScreenArea(strokeCtx, action.area);
      drawScreenArea(overlayCtx, action.area, action.targetColor, "", false);
    }
  }
  if (activeStroke?.id?.startsWith("bgstroke")) {
    drawBaseStrokePreview(strokeCtx, activeStroke);
  }
  ctx.drawImage(overlay, 0, 0);
  ctx.drawImage(strokeOverlay, 0, 0);
}

function drawBaseStrokePreview(ctx, stroke) {
  if (!stroke?.points.length) return;
  ctx.save();
  ctx.globalCompositeOperation = stroke.mode === "erase" ? "destination-out" : "source-over";
  ctx.strokeStyle = stroke.color || "#ffffff";
  ctx.fillStyle = ctx.strokeStyle;
  ctx.lineWidth = Math.max(1, stroke.size * state.view.scale);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  makeStrokePath(ctx, stroke.points);
  ctx.stroke();
  ctx.restore();
}

function drawSquareStrokeOnScreen(ctx, points, size) {
  const half = Math.max(1, size / 2);
  for (const point of points) {
    const screen = imageToScreen(point);
    ctx.fillRect(screen.x - half, screen.y - half, size, size);
  }
}

function drawStructureLayer(ctx, editData) {
  if (canUseStructureLayerCache()) {
    const cache = getStructureLayerCache(editData);
    if (cache) {
      drawStructureLayerCache(ctx, cache);
      drawStructureLabels(ctx, editData);
      return;
    }
  }
  drawStructureLayerDirect(ctx, editData);
  drawStructureLabels(ctx, editData);
}

function canUseStructureLayerCache() {
  return Boolean(
    state.mapNaturalSize.width &&
    state.mapNaturalSize.height &&
    !isRotationPreviewActive() &&
    !getActiveCropPreviewBounds()
  );
}

function getStructureLayerCache(editData) {
  if (!editData || !state.mapNaturalSize.width || !state.mapNaturalSize.height) return null;
  const scale = getStructureCacheScale();
  const width = Math.max(1, Math.round(state.mapNaturalSize.width * scale));
  const height = Math.max(1, Math.round(state.mapNaturalSize.height * scale));
  const key = getStructureLayerCacheKey(editData, scale);
  const canvas = state.structureLayerCanvas;
  if (!state.structureLayerDirty && state.structureLayerKey === key && canvas.width === width && canvas.height === height) {
    return { canvas, scale };
  }
  canvas.width = width;
  canvas.height = height;
  const cacheCtx = canvas.getContext("2d", { alpha: true });
  if (!cacheCtx) return null;
  cacheCtx.clearRect(0, 0, width, height);
  cacheCtx.save();
  cacheCtx.scale(scale, scale);
  drawStructureLayerToImage(cacheCtx, editData);
  cacheCtx.restore();
  state.structureLayerDirty = false;
  state.structureLayerKey = key;
  return { canvas, scale };
}

function getStructureCacheScale() {
  const maxSide = 8192;
  const maxPixels = 50000000;
  const { width, height } = state.mapNaturalSize;
  if (!width || !height) return 1;
  return Math.min(1, maxSide / Math.max(width, height), Math.sqrt(maxPixels / Math.max(1, width * height)));
}

function getStructureLayerCacheKey(editData, scale) {
  const visible = getVisibleStructureObjectIds();
  const regionKey = editData.structureRegions
    .map((region) => `${region.id}:${region.visible !== false}:${getRegionAreaCount(region)}:${region.type}:${region.color || ""}`)
    .join("|");
  const strokeKey = editData.judgementStrokes
    .filter((stroke) => !stroke.objectId || visible.has(stroke.objectId))
    .map((stroke) => `${stroke.id}:${stroke.objectId || ""}:${stroke.points?.length || 0}:${stroke.type}:${stroke.color || ""}:${stroke.size || 0}:${stroke.mode || ""}`)
    .join("|");
  return `${state.mapNaturalSize.width}x${state.mapNaturalSize.height}:${scale}:${regionKey}:${strokeKey}`;
}

function drawStructureLayerCache(ctx, cache) {
  const { canvas, scale } = cache;
  if (canvas.width <= 1 || canvas.height <= 1 || !scale) return;
  const dx = state.view.x;
  const dy = state.view.y;
  const dw = state.mapNaturalSize.width * state.view.scale;
  const dh = state.mapNaturalSize.height * state.view.scale;
  const visibleLeft = Math.max(0, dx);
  const visibleTop = Math.max(0, dy);
  const visibleRight = Math.min(state.canvasSize.width, dx + dw);
  const visibleBottom = Math.min(state.canvasSize.height, dy + dh);
  if (visibleRight <= visibleLeft || visibleBottom <= visibleTop || dw <= 0 || dh <= 0) return;

  const sourceLeft = ((visibleLeft - dx) / dw) * canvas.width;
  const sourceTop = ((visibleTop - dy) / dh) * canvas.height;
  const sourceWidth = ((visibleRight - visibleLeft) / dw) * canvas.width;
  const sourceHeight = ((visibleBottom - visibleTop) / dh) * canvas.height;
  ctx.save();
  ctx.imageSmoothingEnabled = scale < 1;
  if (scale < 1) ctx.imageSmoothingQuality = "high";
  ctx.drawImage(
    canvas,
    sourceLeft,
    sourceTop,
    sourceWidth,
    sourceHeight,
    visibleLeft,
    visibleTop,
    visibleRight - visibleLeft,
    visibleBottom - visibleTop
  );
  ctx.restore();
}

function drawStructureLayerDirect(ctx, editData) {
  const items = [];
  const visibleObjects = getVisibleStructureObjectIds();
  editData.structureRegions.forEach((region, index) => {
    if (region.visible === false) return;
    items.push({ kind: "region", item: region, index });
  });
  editData.judgementStrokes.forEach((stroke, index) => {
    if (stroke.objectId && !visibleObjects.has(stroke.objectId)) return;
    items.push({ kind: "stroke", item: stroke, index });
  });
  items.sort((a, b) => getStructureDisplayRank(a.item.type) - getStructureDisplayRank(b.item.type) || a.index - b.index);
  for (const entry of items) {
    if (entry.kind === "region") drawStructureRegion(ctx, entry.item);
    else drawStructureStroke(ctx, entry.item);
  }
}

function drawStructureLayerToImage(ctx, editData) {
  const items = [];
  const visibleObjects = getVisibleStructureObjectIds();
  editData.structureRegions.forEach((region, index) => {
    if (region.visible === false) return;
    items.push({ kind: "region", item: region, index });
  });
  editData.judgementStrokes.forEach((stroke, index) => {
    if (stroke.objectId && !visibleObjects.has(stroke.objectId)) return;
    items.push({ kind: "stroke", item: stroke, index });
  });
  items.sort((a, b) => getStructureDisplayRank(a.item.type) - getStructureDisplayRank(b.item.type) || a.index - b.index);
  for (const entry of items) {
    if (entry.kind === "region") drawStructureRegionOnImage(ctx, entry.item);
    else drawStructureStrokeOnImage(ctx, entry.item);
  }
}

function drawStructureRegionOnImage(ctx, region) {
  const style = TYPE_STYLES[region.type] || TYPE_STYLES.custom;
  const color = region.color || style.color;
  const areas = getRegionAreas(region);
  if (!areas.length) return;
  ctx.save();
  const linearOnly = isLinearStructureType(region.type);
  ctx.fillStyle = colorToFill(color, 0.36);
  ctx.strokeStyle = region.color || style.line;
  ctx.lineWidth = linearOnly ? Math.max(2, LINEAR_STRUCTURE_WIDTH) : 2;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  for (const area of areas) {
    const lineArea = area.kind === "line";
    ctx.lineWidth = lineArea ? Math.max(2, Number(area.width) || LINEAR_STRUCTURE_WIDTH) : linearOnly ? Math.max(2, LINEAR_STRUCTURE_WIDTH) : 2;
    if (area.kind === "pixels") {
      for (const run of area.pixels || []) ctx.fillRect(run.x, run.y, run.length, 1);
    } else {
      makeImageAreaPath(ctx, area);
      if (!linearOnly && !lineArea) ctx.fill();
      ctx.stroke();
    }
  }
  ctx.restore();
}

function drawStructureStrokeOnImage(ctx, stroke) {
  if (!stroke.points.length) return;
  const style = TYPE_STYLES[stroke.type] || TYPE_STYLES.custom;
  ctx.save();
  ctx.strokeStyle = stroke.mode === "erase" ? "#fffaf0" : stroke.color || style.line;
  ctx.fillStyle = ctx.strokeStyle;
  ctx.globalAlpha = 0.78;
  ctx.lineWidth = Math.max(1, stroke.size);
  ctx.lineCap = stroke.shape === "square" ? "butt" : "round";
  ctx.lineJoin = stroke.shape === "square" ? "miter" : "round";
  if (stroke.shape === "square") {
    drawSquareStrokeOnImage(ctx, stroke.points, stroke.size);
  } else {
    makeImageStrokePath(ctx, stroke.points);
    ctx.stroke();
  }
  ctx.restore();
}

function drawStructureRegion(ctx, region) {
  const style = TYPE_STYLES[region.type] || TYPE_STYLES.custom;
  const color = region.color || style.color;
  const areas = getRegionAreas(region);
  if (!areas.length) return;
  ctx.save();
  const linearOnly = isLinearStructureType(region.type);
  ctx.fillStyle = colorToFill(color, 0.36);
  ctx.strokeStyle = region.color || style.line;
  ctx.lineWidth = Math.max(1.5, (linearOnly ? LINEAR_STRUCTURE_WIDTH : 2) * state.view.scale);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  for (const area of areas) {
    const lineArea = area.kind === "line";
    ctx.lineWidth = Math.max(1.5, (lineArea ? Number(area.width) || LINEAR_STRUCTURE_WIDTH : linearOnly ? LINEAR_STRUCTURE_WIDTH : 2) * state.view.scale);
    if (area.kind === "pixels") {
      for (const run of area.pixels || []) drawPixelRun(ctx, run);
    } else {
      drawScreenAreaPath(ctx, area);
      if (!linearOnly && !lineArea) ctx.fill();
      ctx.stroke();
    }
  }
  ctx.restore();
}

function drawStructureLabels(ctx, editData) {
  if (!state.showStructureLayer || state.editorMode !== "structure" && state.editorMode !== "structureDisplay") return;
  for (const region of getVisibleStructureRegionsInDrawOrder(editData.structureRegions || [])) {
    drawStructureRegionLabel(ctx, region, getRegionAreas(region));
  }
}

function drawStructureRegionLabel(ctx, region, areas) {
  const bounds = getRegionLabelBounds(areas);
  if (!bounds) return;
  const typeLabel = TYPE_STYLES[region.type]?.label || "自定义";
  const label = `${getStructureObjectDisplayName(region)} · ${typeLabel}`;
  const center = imageToScreen({
    x: (bounds.left + bounds.right) / 2,
    y: (bounds.top + bounds.bottom) / 2
  });
  if (center.x < -80 || center.y < -24 || center.x > state.canvasSize.width + 80 || center.y > state.canvasSize.height + 24) return;
  ctx.save();
  ctx.font = "700 12px Microsoft YaHei, sans-serif";
  const metrics = ctx.measureText(label);
  const width = Math.min(metrics.width + 12, 180);
  const height = 22;
  const x = center.x - width / 2;
  const y = center.y - height / 2;
  ctx.fillStyle = "rgba(255, 250, 240, 0.88)";
  ctx.strokeStyle = "rgba(29, 42, 36, 0.28)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(x, y, width, height, 5);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#1d2a24";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(label, center.x, center.y, width - 8);
  ctx.restore();
}

function getRegionLabelBounds(areas) {
  const boundsList = areas.map(getAreaBounds).filter(Boolean);
  if (!boundsList.length) return null;
  return boundsList.reduce((result, bounds) => ({
    left: Math.min(result.left, bounds.left),
    top: Math.min(result.top, bounds.top),
    right: Math.max(result.right, bounds.right),
    bottom: Math.max(result.bottom, bounds.bottom)
  }), { left: Infinity, top: Infinity, right: -Infinity, bottom: -Infinity });
}

function drawJudgementStrokes(ctx, strokes) {
  const visibleObjects = getVisibleStructureObjectIds();
  for (const stroke of strokes) {
    if (stroke.objectId && !visibleObjects.has(stroke.objectId)) continue;
    if (!stroke.points.length) continue;
    drawStructureStroke(ctx, stroke);
  }
}

function drawStructureStroke(ctx, stroke) {
  if (!stroke.points.length) return;
  const style = TYPE_STYLES[stroke.type] || TYPE_STYLES.custom;
  ctx.save();
  ctx.strokeStyle = stroke.mode === "erase" ? "#fffaf0" : stroke.color || style.line;
  ctx.fillStyle = ctx.strokeStyle;
  ctx.globalAlpha = 0.78;
  ctx.lineWidth = Math.max(1, stroke.size * state.view.scale);
  ctx.lineCap = stroke.shape === "square" ? "butt" : "round";
  ctx.lineJoin = stroke.shape === "square" ? "miter" : "round";
  if (stroke.shape === "square") {
    drawSquareStrokeOnScreen(ctx, stroke.points, stroke.size * state.view.scale);
  } else {
    makeStrokePath(ctx, stroke.points);
    ctx.stroke();
  }
  ctx.restore();
}

function getVisibleStructureObjectIds() {
  return new Set(getSelectedEditData().structureRegions.filter((region) => region.visible !== false).map((region) => region.id));
}

function getVisibleStructureRegionsInDrawOrder(regions) {
  return regions
    .filter((region) => region.visible !== false)
    .map((region, index) => ({ region, index }))
    .sort((a, b) => getStructureDisplayRank(a.region.type) - getStructureDisplayRank(b.region.type) || a.index - b.index)
    .map((item) => item.region);
}

function getStructureDisplayRank(type) {
  return STRUCTURE_DISPLAY_ORDER[type] ?? STRUCTURE_DISPLAY_ORDER.custom;
}

function getStructureWalkRank(type) {
  return STRUCTURE_WALK_ORDER[type] ?? STRUCTURE_WALK_ORDER.custom;
}

function getStructureTypeWalkable(type, fallback = true) {
  const normalized = TYPE_STYLES[type] ? type : "custom";
  return normalized === "custom" ? Boolean(fallback) : Boolean(TYPE_STYLES[normalized].walkable);
}

function drawPixelRun(ctx, run) {
  if (!isRotationPreviewActive()) {
    const offset = getActiveCropPreviewOffset();
    ctx.fillRect(
      (run.x - offset.x) * state.view.scale + state.view.x,
      (run.y - offset.y) * state.view.scale + state.view.y,
      Math.max(1, run.length * state.view.scale),
      Math.max(1, state.view.scale)
    );
    return;
  }
  for (let x = run.x; x < run.x + run.length; x++) {
    const screen = imageToScreen({ x, y: run.y });
    ctx.fillRect(screen.x, screen.y, Math.max(1, state.view.scale), Math.max(1, state.view.scale));
  }
}

function drawDraftPolygon(ctx) {
  const pointsSource = state.cropDraft.length ? state.cropDraft : state.draftPolygon;
  if (!pointsSource.length) return;
  ctx.save();
  const isCrop = state.editorMode === "crop";
  const isCommittedCrop = isCrop && state.cropDraft.length >= 3;
  const isStructureLineDraft = state.editorMode === "structure" && state.activeTool === "structureLine";
  const parallelogramDraft = state.activeTool === "structureParallelogram" && state.editorMode === "structure" && pointsSource.length >= 3
    ? createParallelogramAreaFromThreePoints(pointsSource)
    : null;
  if (isCommittedCrop) {
    drawCropCommitPreview(ctx, state.cropDraft);
  }
  ctx.strokeStyle = isCrop ? "#1f554e" : "#7b4aa3";
  ctx.fillStyle = isCrop ? "rgba(47, 111, 102, 0.12)" : "rgba(123, 74, 163, 0.14)";
  ctx.lineWidth = isCommittedCrop ? 3 : 2;
  ctx.setLineDash([5, 4]);
  const points = (parallelogramDraft ? parallelogramPointsFromArea(parallelogramDraft) : pointsSource).map(imageToScreen);
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (const point of points.slice(1)) ctx.lineTo(point.x, point.y);
  if (points.length >= 3 && !isStructureLineDraft) {
    ctx.closePath();
    ctx.fill();
  }
  ctx.stroke();
  ctx.setLineDash([]);
  for (const point of points) {
    ctx.beginPath();
    ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
    ctx.fillStyle = "#fffaf0";
    ctx.fill();
    ctx.strokeStyle = "#1d2a24";
    ctx.stroke();
  }
  ctx.restore();
}

function drawCropCommitPreview(ctx, polygon) {
  const bounds = polygonBounds(polygon);
  const left = clamp(bounds.left, 0, state.mapNaturalSize.width);
  const top = clamp(bounds.top, 0, state.mapNaturalSize.height);
  const right = clamp(bounds.right, 0, state.mapNaturalSize.width);
  const bottom = clamp(bounds.bottom, 0, state.mapNaturalSize.height);
  const topLeft = imageToScreen({ x: left, y: top });
  const bottomRight = imageToScreen({ x: right, y: bottom });

  ctx.save();
  ctx.setLineDash([]);
  ctx.strokeStyle = "#d08c27";
  ctx.lineWidth = 3;
  ctx.strokeRect(topLeft.x, topLeft.y, bottomRight.x - topLeft.x, bottomRight.y - topLeft.y);

  ctx.fillStyle = "rgba(255, 250, 240, 0.88)";
  const label = "裁剪预览";
  ctx.font = "700 13px Microsoft YaHei, sans-serif";
  const metrics = ctx.measureText(label);
  const labelX = topLeft.x + 8;
  const labelY = topLeft.y + 8;
  ctx.fillRect(labelX - 4, labelY - 2, metrics.width + 8, 22);
  ctx.fillStyle = "#1f554e";
  ctx.fillText(label, labelX, labelY + 15);
  ctx.restore();
}

function drawTransparentCheckerboard(ctx, x, y, width, height) {
  const tile = 14;
  ctx.save();
  ctx.fillStyle = "#f8f2e7";
  ctx.fillRect(x, y, width, height);
  ctx.beginPath();
  ctx.rect(x, y, width, height);
  ctx.clip();
  ctx.fillStyle = "#d7cbb8";
  const cols = Math.ceil(width / tile);
  const rows = Math.ceil(height / tile);
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if ((row + col) % 2 === 0) {
        ctx.fillRect(x + col * tile, y + row * tile, tile, tile);
      }
    }
  }
  ctx.restore();
}

function makeCropPreviewClipPath(ctx, polygon) {
  const points = polygon.map(imageToScreen);
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (const point of points.slice(1)) ctx.lineTo(point.x, point.y);
  ctx.closePath();
}

function applyCropPolygonAlphaMask(ctx, polygon, offsetX, offsetY) {
  if (!polygon?.length) return;
  ctx.save();
  ctx.globalCompositeOperation = "destination-in";
  ctx.beginPath();
  ctx.moveTo(polygon[0].x - offsetX, polygon[0].y - offsetY);
  for (const point of polygon.slice(1)) {
    ctx.lineTo(point.x - offsetX, point.y - offsetY);
  }
  ctx.closePath();
  ctx.fillStyle = "#000000";
  ctx.fill();
  ctx.restore();
}

function drawDraftShape(ctx) {
  if (!state.draftShape) return;
  const area = normalizeShapeArea(state.draftShape);
  if (!area) return;
  ctx.save();
  drawScreenArea(ctx, area, "rgba(123, 74, 163, 0.14)", "#7b4aa3", true);
  ctx.restore();
}

function drawScreenArea(ctx, area, fill, stroke = "rgba(31, 85, 78, 0.7)", dashed = false) {
  ctx.save();
  if (area.kind === "pixels") {
    ctx.fillStyle = fill || "rgba(47, 111, 102, 0.18)";
    for (const run of area.pixels || []) drawPixelRun(ctx, run);
    ctx.restore();
    return;
  }
  if (dashed) ctx.setLineDash([5, 4]);
  drawScreenAreaPath(ctx, area);
  ctx.fillStyle = fill || "rgba(47, 111, 102, 0.18)";
  ctx.lineWidth = 2;
  ctx.fill();
  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.stroke();
  }
  ctx.restore();
}

function clearScreenArea(ctx, area) {
  if (!area) return;
  ctx.save();
  ctx.globalCompositeOperation = "destination-out";
  if (area.kind === "pixels") {
    ctx.fillStyle = "#000000";
    for (const run of expandPixelRuns(area.pixels || [], state.mapNaturalSize.width, state.mapNaturalSize.height, 1)) {
      drawPixelRun(ctx, run);
    }
  } else {
    drawScreenAreaPath(ctx, area);
    ctx.fillStyle = "#000000";
    ctx.fill();
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2;
    ctx.lineJoin = "round";
    ctx.stroke();
  }
  ctx.restore();
}

function drawScreenAreaPath(ctx, area) {
  ctx.beginPath();
  if (area.kind === "polygon") {
    const points = area.points.map(imageToScreen);
    ctx.moveTo(points[0].x, points[0].y);
    for (const point of points.slice(1)) ctx.lineTo(point.x, point.y);
    ctx.closePath();
  } else if (area.kind === "line") {
    const points = (area.points || []).map(imageToScreen);
    if (!points.length) return;
    ctx.moveTo(points[0].x, points[0].y);
    for (const point of points.slice(1)) ctx.lineTo(point.x, point.y);
  } else if (area.kind === "parallelogram") {
    const points = parallelogramPointsFromArea(area).map(imageToScreen);
    ctx.moveTo(points[0].x, points[0].y);
    for (const point of points.slice(1)) ctx.lineTo(point.x, point.y);
    ctx.closePath();
  } else if (area.kind === "rect") {
    const topLeft = imageToScreen({ x: area.x, y: area.y });
    ctx.rect(topLeft.x, topLeft.y, area.width * state.view.scale, area.height * state.view.scale);
  } else if (area.kind === "ellipse") {
    const center = imageToScreen({ x: area.x + area.width / 2, y: area.y + area.height / 2 });
    ctx.ellipse(center.x, center.y, Math.abs(area.width * state.view.scale / 2), Math.abs(area.height * state.view.scale / 2), 0, 0, Math.PI * 2);
  }
}

function drawBrushCursor(ctx) {
  if (!shouldUseBrushCursor()) return;
  if (!state.pointer.hovering && !state.pointer.down) return;
  const x = state.pointer.down ? state.pointer.lastX : state.pointer.hoverX;
  const y = state.pointer.down ? state.pointer.lastY : state.pointer.hoverY;
  if (!Number.isFinite(x) || !Number.isFinite(y)) return;
  const brushSize = ["structureBrush", "structureErase"].includes(state.activeTool) ? state.structureBrushSize : state.brushSize;
  const size = Math.max(2, brushSize * state.view.scale);
  ctx.save();
  ctx.strokeStyle = "#1d2a24";
  ctx.fillStyle = "rgba(255, 250, 240, 0.18)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(x, y, size / 2, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

function colorToFill(color, alpha) {
  const rgb = hexToRgb(color);
  if (!rgb) return color;
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
}

function makeScreenPolygonPath(ctx, polygon) {
  const points = polygon.map(imageToScreen);
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (const point of points.slice(1)) ctx.lineTo(point.x, point.y);
  ctx.closePath();
}

function makeStrokePath(ctx, points) {
  const first = imageToScreen(points[0]);
  ctx.beginPath();
  ctx.moveTo(first.x, first.y);
  if (points.length === 1) {
    ctx.lineTo(first.x + 0.01, first.y + 0.01);
    return;
  }
  for (const point of points.slice(1)) {
    const screen = imageToScreen(point);
    ctx.lineTo(screen.x, screen.y);
  }
}

function makeImageStrokePath(ctx, points) {
  const first = points[0];
  ctx.beginPath();
  ctx.moveTo(first.x, first.y);
  if (points.length === 1) {
    ctx.lineTo(first.x + 0.01, first.y + 0.01);
    return;
  }
  for (const point of points.slice(1)) {
    ctx.lineTo(point.x, point.y);
  }
}

function createEmptyEditData() {
  return structuredClone(DEFAULT_EDIT_DATA);
}

function createEmptyGameData() {
  return structuredClone(DEFAULT_GAME_DATA);
}

function normalizeGameData(source) {
  const base = createEmptyGameData();
  if (!source || typeof source !== "object") return base;
  const player = source.player && typeof source.player === "object" ? source.player : {};
  base.player = {
    x: Number.isFinite(Number(player.x)) ? Number(player.x) : 0,
    y: Number.isFinite(Number(player.y)) ? Number(player.y) : 0,
    radius: Number.isFinite(Number(player.radius)) ? clamp(Number(player.radius), 12, 80) : DEFAULT_PLAYER_RADIUS,
    walkSpeed: Number.isFinite(Number(player.walkSpeed)) ? clamp(Number(player.walkSpeed), 80, 1200) : DEFAULT_WALK_SPEED,
    portrait: normalizePhotoRecord(player.portrait) || null
  };
  const settings = source.settings && typeof source.settings === "object" ? source.settings : {};
  base.settings.showPhotoMarkers = settings.showPhotoMarkers !== false;
  base.settings.showInteractionMarkers = settings.showInteractionMarkers !== false;
  const location = source.location && typeof source.location === "object" ? source.location : {};
  base.location = {
    kind: location.kind === "building" || location.kind === "room" ? location.kind : "campus",
    buildingId: typeof location.buildingId === "string" ? location.buildingId : "",
    roomId: typeof location.roomId === "string" ? location.roomId : ""
  };
  base.selectedPhotoSpotId = typeof source.selectedPhotoSpotId === "string" ? source.selectedPhotoSpotId : "";
  base.selectedBuildingId = typeof source.selectedBuildingId === "string" ? source.selectedBuildingId : "";
  base.selectedSpotPhotoId = typeof source.selectedSpotPhotoId === "string" ? source.selectedSpotPhotoId : "";
  base.selectedRoomId = typeof source.selectedRoomId === "string" ? source.selectedRoomId : "";
  base.selectedItemId = typeof source.selectedItemId === "string" ? source.selectedItemId : "";
  base.selectedPersonId = typeof source.selectedPersonId === "string" ? source.selectedPersonId : "";
  base.photoSpots = Array.isArray(source.photoSpots) ? source.photoSpots.map(normalizePhotoSpot).filter(Boolean) : [];
  const buildings = source.buildings && typeof source.buildings === "object" ? source.buildings : {};
  base.buildings = {};
  for (const [id, building] of Object.entries(buildings)) {
    const normalized = normalizeGameBuilding(building, id);
    if (normalized) base.buildings[id] = normalized;
  }
  return base;
}

function normalizePhotoSpot(source) {
  if (!source || typeof source !== "object") return null;
  const x = Number(source.x);
  const y = Number(source.y);
  if (!Number.isFinite(x) || !Number.isFinite(y)) return null;
  return {
    id: typeof source.id === "string" ? source.id : createId("spot"),
    x,
    y,
    name: typeof source.name === "string" ? source.name : "",
    capturedAt: typeof source.capturedAt === "string" ? source.capturedAt : (typeof source.createdAt === "string" ? source.createdAt : new Date().toISOString()),
    radius: Number.isFinite(Number(source.radius)) ? clamp(Number(source.radius), 8, 100) : DEFAULT_PLAYER_RADIUS,
    visible: source.visible !== false,
    activeIndex: Number.isFinite(Number(source.activeIndex)) ? Math.max(0, Math.floor(Number(source.activeIndex))) : 0,
    photos: Array.isArray(source.photos) ? source.photos.map(normalizePhotoRecord).filter(Boolean) : [],
    createdAt: typeof source.createdAt === "string" ? source.createdAt : new Date().toISOString(),
    updatedAt: typeof source.updatedAt === "string" ? source.updatedAt : new Date().toISOString()
  };
}

function normalizePhotoRecord(source) {
  if (!source || typeof source !== "object") return null;
  const resource = source.resource && typeof source.resource === "object" ? source.resource : source;
  if (!resource.data && !resource.buffer) return null;
  return {
    id: typeof source.id === "string" ? source.id : createId("photo"),
    name: typeof source.name === "string" ? source.name : resource.name || "photo",
    resource: {
      name: resource.name || source.name || "photo",
      type: resource.type || "image/*",
      size: Number.isFinite(Number(resource.size)) ? Number(resource.size) : 0,
      data: resource.data || "",
      buffer: resource.buffer || null
    },
    createdAt: typeof source.createdAt === "string" ? source.createdAt : new Date().toISOString()
  };
}

function normalizeGameBuilding(source, fallbackId) {
  if (!source || typeof source !== "object") return {
    id: fallbackId,
    customName: "",
    category: "other",
    photos: [],
    activePhotoIndex: 0,
    entrances: [],
    rooms: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  return {
    id: typeof source.id === "string" ? source.id : fallbackId,
    customName: typeof source.customName === "string" ? source.customName : "",
    category: BUILDING_CATEGORY_RULES[source.category] ? source.category : "other",
    photos: Array.isArray(source.photos) ? source.photos.map(normalizePhotoRecord).filter(Boolean) : [],
    activePhotoIndex: Number.isFinite(Number(source.activePhotoIndex)) ? Math.max(0, Math.floor(Number(source.activePhotoIndex))) : 0,
    entrances: Array.isArray(source.entrances) ? source.entrances.map(normalizeEntrance).filter(Boolean) : [],
    rooms: Array.isArray(source.rooms) ? source.rooms.map(normalizeRoom).filter(Boolean) : [],
    createdAt: typeof source.createdAt === "string" ? source.createdAt : new Date().toISOString(),
    updatedAt: typeof source.updatedAt === "string" ? source.updatedAt : new Date().toISOString()
  };
}

function normalizeEntrance(source) {
  if (!source || typeof source !== "object") return null;
  const x = Number(source.x);
  const y = Number(source.y);
  if (!Number.isFinite(x) || !Number.isFinite(y)) return null;
  return {
    id: typeof source.id === "string" ? source.id : createId("entrance"),
    x,
    y,
    photo: normalizePhotoRecord(source.photo) || null,
    createdAt: typeof source.createdAt === "string" ? source.createdAt : new Date().toISOString()
  };
}

function normalizeRoom(source) {
  if (!source || typeof source !== "object") return null;
  return {
    id: typeof source.id === "string" ? source.id : createId("room"),
    name: typeof source.name === "string" ? source.name : "",
    type: typeof source.type === "string" ? source.type : "房间",
    photos: Array.isArray(source.photos) ? source.photos.map(normalizePhotoRecord).filter(Boolean) : [],
    activePhotoIndex: Number.isFinite(Number(source.activePhotoIndex)) ? Math.max(0, Math.floor(Number(source.activePhotoIndex))) : 0,
    people: Array.isArray(source.people) ? source.people.map(normalizePerson).filter(Boolean) : [],
    items: Array.isArray(source.items) ? source.items.map(normalizeMemoryItem).filter(Boolean) : [],
    createdAt: typeof source.createdAt === "string" ? source.createdAt : new Date().toISOString(),
    updatedAt: typeof source.updatedAt === "string" ? source.updatedAt : new Date().toISOString()
  };
}

function normalizePerson(source) {
  if (!source || typeof source !== "object") return null;
  return {
    id: typeof source.id === "string" ? source.id : createId("person"),
    name: typeof source.name === "string" ? source.name : "",
    description: typeof source.description === "string" ? source.description : "",
    photo: normalizePhotoRecord(source.photo) || null,
    chat: Array.isArray(source.chat) ? source.chat.map(normalizeChatMessage).filter(Boolean) : [],
    createdAt: typeof source.createdAt === "string" ? source.createdAt : new Date().toISOString(),
    updatedAt: typeof source.updatedAt === "string" ? source.updatedAt : new Date().toISOString()
  };
}

function normalizeMemoryItem(source) {
  if (!source || typeof source !== "object") return null;
  return {
    id: typeof source.id === "string" ? source.id : createId("item"),
    name: typeof source.name === "string" ? source.name : "",
    description: typeof source.description === "string" ? source.description : "",
    photos: Array.isArray(source.photos) ? source.photos.map(normalizePhotoRecord).filter(Boolean) : [],
    activePhotoIndex: Number.isFinite(Number(source.activePhotoIndex)) ? Math.max(0, Math.floor(Number(source.activePhotoIndex))) : 0,
    createdAt: typeof source.createdAt === "string" ? source.createdAt : new Date().toISOString(),
    updatedAt: typeof source.updatedAt === "string" ? source.updatedAt : new Date().toISOString()
  };
}

function normalizeChatMessage(source) {
  if (!source || typeof source !== "object") return null;
  const text = typeof source.text === "string" ? source.text : "";
  if (!text) return null;
  return {
    id: typeof source.id === "string" ? source.id : createId("chat"),
    from: source.from === "me" ? "me" : "person",
    text,
    createdAt: typeof source.createdAt === "string" ? source.createdAt : new Date().toISOString()
  };
}

function normalizeEditData(data) {
  const source = data && typeof data === "object" ? data : {};
  const editData = {
    version: 1,
    cropPolygon: normalizePoints(source.cropPolygon),
    backgroundStrokes: Array.isArray(source.backgroundStrokes)
      ? source.backgroundStrokes.map(normalizeBackgroundStroke).filter(Boolean)
      : [],
    structureRegions: Array.isArray(source.structureRegions)
      ? source.structureRegions.map(normalizeRegion).filter(Boolean)
      : [],
    judgementStrokes: Array.isArray(source.judgementStrokes)
      ? source.judgementStrokes.map(normalizeJudgementStroke).filter(Boolean)
      : [],
    structureSelections: Array.isArray(source.structureSelections)
      ? source.structureSelections.map(normalizeStructureSelection).filter(Boolean)
      : []
  };
  mergeStructureSelectionsIntoRegions(editData);
  return editData;
}

function mergeStructureSelectionsIntoRegions(editData) {
  for (const selection of editData.structureSelections) {
    if (!selection.objectId) continue;
    const region = editData.structureRegions.find((item) => item.id === selection.objectId);
    if (!region) continue;
    const key = pixelRunsKey(selection.pixels);
    const alreadyMerged = getRegionAreas(region).some((area) => area.kind === "pixels" && pixelRunsKey(area.pixels || []) === key);
    if (!alreadyMerged) {
      region.areas = [...getRegionAreas(region), { kind: "pixels", pixels: selection.pixels, color: selection.color || "" }];
    }
  }
}

function pixelRunsKey(runs) {
  return normalizePixelRuns(runs)
    .map((run) => `${run.y}:${run.x}:${run.length}`)
    .join("|");
}

function normalizeBackgroundStroke(stroke) {
  if (!stroke || typeof stroke !== "object") return null;
  const points = normalizePoints(stroke.points);
  if (!points.length) return null;
  return {
    id: typeof stroke.id === "string" ? stroke.id : createId("bgstroke"),
    mode: stroke.mode === "erase" ? "erase" : "paint",
    color: typeof stroke.color === "string" ? stroke.color : "#ffffff",
    size: Number.isFinite(Number(stroke.size)) ? Number(stroke.size) : 24,
    points,
    createdAt: typeof stroke.createdAt === "string" ? stroke.createdAt : new Date().toISOString()
  };
}

function normalizeRegion(region) {
  if (!region || typeof region !== "object") return null;
  const polygon = normalizePoints(region.polygon);
  const areas = Array.isArray(region.areas) ? region.areas.map(normalizeArea).filter(Boolean) : [];
  const type = TYPE_STYLES[region.type] ? region.type : "custom";
  if (polygon.length >= 2 && !areas.length && isLinearStructureType(type)) {
    areas.push({ kind: "line", points: polygon, width: LINEAR_STRUCTURE_WIDTH });
  } else if (polygon.length >= 3 && !areas.length) {
    areas.push({ kind: "polygon", points: polygon });
  }
  const walkable = getStructureTypeWalkable(type, region.walkable);
  return {
    id: typeof region.id === "string" ? region.id : createId("region"),
    name: typeof region.name === "string" ? region.name : TYPE_STYLES[type].label,
    type,
    walkable,
    color: typeof region.color === "string" ? region.color : TYPE_STYLES[type].line,
    visible: region.visible !== false,
    polygon,
    areas,
    createdAt: typeof region.createdAt === "string" ? region.createdAt : new Date().toISOString()
  };
}

function normalizeJudgementStroke(stroke) {
  if (!stroke || typeof stroke !== "object") return null;
  const points = normalizePoints(stroke.points);
  if (!points.length) return null;
  const type = TYPE_STYLES[stroke.type] ? stroke.type : "custom";
  const walkable = getStructureTypeWalkable(type, stroke.walkable);
  return {
    id: typeof stroke.id === "string" ? stroke.id : createId("jstroke"),
    name: typeof stroke.name === "string" ? stroke.name : TYPE_STYLES[type].label,
    type,
    walkable,
    size: Number.isFinite(Number(stroke.size)) ? Number(stroke.size) : STRUCTURE_BRUSH_SIZE,
    shape: "circle",
    mode: stroke.mode === "erase" ? "erase" : "add",
    color: typeof stroke.color === "string" ? stroke.color : TYPE_STYLES[type].line,
    objectId: typeof stroke.objectId === "string" ? stroke.objectId : "",
    points,
    createdAt: typeof stroke.createdAt === "string" ? stroke.createdAt : new Date().toISOString()
  };
}

function normalizeStructureSelection(selection) {
  if (!selection || typeof selection !== "object") return null;
  const pixels = normalizePixelRuns(selection.pixels);
  if (!pixels.length) return null;
  const type = TYPE_STYLES[selection.type] ? selection.type : "custom";
  const walkable = getStructureTypeWalkable(type, selection.walkable);
  return {
    id: typeof selection.id === "string" ? selection.id : createId("sel"),
    name: typeof selection.name === "string" ? selection.name : TYPE_STYLES[type].label,
    type,
    walkable,
    pixels,
    color: typeof selection.color === "string" ? selection.color : "",
    objectId: typeof selection.objectId === "string" ? selection.objectId : "",
    createdAt: typeof selection.createdAt === "string" ? selection.createdAt : new Date().toISOString()
  };
}

function normalizeArea(area) {
  if (!area || typeof area !== "object") return null;
  if (area.kind === "polygon") {
    const points = normalizePoints(area.points);
    return points.length >= 3 ? { kind: "polygon", points } : null;
  }
  if (area.kind === "line") {
    const points = normalizePoints(area.points);
    const width = Number.isFinite(Number(area.width)) ? Math.max(1, Number(area.width)) : LINEAR_STRUCTURE_WIDTH;
    return points.length >= 2 ? { kind: "line", points, width } : null;
  }
  if (area.kind === "parallelogram") {
    const points = normalizePoints(area.points);
    if (points.length >= 4) return { kind: "parallelogram", points: points.slice(0, 4) };
    const normalized = {
      kind: area.kind,
      x: Number(area.x),
      y: Number(area.y),
      width: Number(area.width),
      height: Number(area.height)
    };
    return [normalized.x, normalized.y, normalized.width, normalized.height].every(Number.isFinite) && normalized.width > 0 && normalized.height > 0
      ? normalized
      : null;
  }
  if (area.kind === "rect" || area.kind === "ellipse") {
    const normalized = {
      kind: area.kind,
      x: Number(area.x),
      y: Number(area.y),
      width: Number(area.width),
      height: Number(area.height)
    };
    return [normalized.x, normalized.y, normalized.width, normalized.height].every(Number.isFinite) && normalized.width > 0 && normalized.height > 0
      ? normalized
      : null;
  }
  if (area.kind === "pixels") {
    const pixels = normalizePixelRuns(area.pixels);
    return pixels.length ? { kind: "pixels", pixels, color: typeof area.color === "string" ? area.color : "" } : null;
  }
  return null;
}

function normalizePixelRuns(runs) {
  if (!Array.isArray(runs)) return [];
  return runs
    .map((run) => ({
      y: Math.round(Number(run?.y)),
      x: Math.round(Number(run?.x)),
      length: Math.round(Number(run?.length))
    }))
    .filter((run) => Number.isFinite(run.x) && Number.isFinite(run.y) && Number.isFinite(run.length) && run.length > 0);
}

function normalizePoints(points) {
  if (!Array.isArray(points)) return [];
  return points
    .map((point) => ({
      x: Number(point?.x),
      y: Number(point?.y)
    }))
    .filter((point) => Number.isFinite(point.x) && Number.isFinite(point.y));
}

function clampImagePoint(point) {
  const width = Number(state.mapNaturalSize.width);
  const height = Number(state.mapNaturalSize.height);
  if (!width || !height) {
    return {
      x: Number(point.x),
      y: Number(point.y)
    };
  }
  return {
    x: clamp(point.x, 0, width),
    y: clamp(point.y, 0, height)
  };
}

function setCreating(isCreating) {
  els.createSchoolButton.disabled = isCreating;
  els.createSchoolButton.textContent = isCreating
    ? "处理中..."
    : state.dialogSelection.mode === "new" ? "创建并进入" : "进入";
  els.saveSchoolButton.disabled = isCreating;
}

function setMissingMapBusy(isBusy) {
  els.reimportMapButton.disabled = isBusy;
  els.reimportMapButton.textContent = isBusy ? "正在导入..." : "重新导入地图图片";
}

function setBulkBusy(isBusy) {
  els.bulkImportButton.disabled = isBusy;
  els.bulkExportButton.disabled = isBusy || !getSelectedResourceKeys().length;
  els.bulkDeleteButton.disabled = isBusy || !getSelectedResourceKeys().length;
  els.bulkImportButton.textContent = isBusy ? "处理中..." : "导入";
}

function setFormError(message) {
  els.formNote.textContent = message;
  els.formNote.classList.add("error");
}

function clearFormNote() {
  els.formNote.textContent = "必填：名称、大图。";
  els.formNote.classList.remove("error");
}

function createId(prefix) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(MAP_IMAGE_STORE)) {
        db.createObjectStore(MAP_IMAGE_STORE);
      }
      if (!db.objectStoreNames.contains(EDIT_DATA_STORE)) {
        db.createObjectStore(EDIT_DATA_STORE);
      }
      if (!db.objectStoreNames.contains(PEOPLE_DATA_STORE)) {
        db.createObjectStore(PEOPLE_DATA_STORE);
      }
      if (!db.objectStoreNames.contains(EXTRA_IMAGES_STORE)) {
        db.createObjectStore(EXTRA_IMAGES_STORE);
      }
      if (!db.objectStoreNames.contains(GAME_DATA_STORE)) {
        db.createObjectStore(GAME_DATA_STORE);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function putMapImage(schoolId, file) {
  const buffer = await file.arrayBuffer();
  const record = {
    version: 2,
    name: file.name || "map-image",
    type: file.type || "application/octet-stream",
    size: file.size || buffer.byteLength,
    buffer
  };
  await new Promise((resolve, reject) => {
    const tx = state.db.transaction(MAP_IMAGE_STORE, "readwrite");
    tx.objectStore(MAP_IMAGE_STORE).put(record, schoolId);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(tx.error);
  });
  const size = await readImageNaturalSize(file);
  return {
    name: record.name,
    type: record.type,
    size: record.size,
    width: size.width,
    height: size.height,
    sha256: await hashArrayBuffer(buffer),
    updatedAt: new Date().toISOString()
  };
}

function getMapImage(schoolId) {
  if (!state.db) return Promise.resolve(null);
  return new Promise((resolve, reject) => {
    const tx = state.db.transaction(MAP_IMAGE_STORE, "readonly");
    const request = tx.objectStore(MAP_IMAGE_STORE).get(schoolId);
    request.onsuccess = () => resolve(normalizeStoredMapImage(request.result));
    request.onerror = () => reject(request.error);
  });
}

function normalizeStoredMapImage(stored) {
  if (!stored) return null;
  if (stored instanceof Blob) return stored;
  if (stored.data) {
    return resourceRecordToBlob(stored);
  }
  if (stored.buffer && typeof stored.buffer.byteLength === "number") {
    return new Blob([stored.buffer], { type: stored.type || "application/octet-stream" });
  }
  if (ArrayBuffer.isView(stored.buffer)) {
    return new Blob([stored.buffer.buffer], { type: stored.type || "application/octet-stream" });
  }
  return null;
}

function putEditData(schoolId, editData) {
  if (!state.db) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const tx = state.db.transaction(EDIT_DATA_STORE, "readwrite");
    tx.objectStore(EDIT_DATA_STORE).put(normalizeEditData(editData), schoolId);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(tx.error);
  });
}

function getEditData(schoolId) {
  if (!state.db) return Promise.resolve(createEmptyEditData());
  return new Promise((resolve, reject) => {
    const tx = state.db.transaction(EDIT_DATA_STORE, "readonly");
    const request = tx.objectStore(EDIT_DATA_STORE).get(schoolId);
    request.onsuccess = () => resolve(normalizeEditData(request.result));
    request.onerror = () => reject(request.error);
  });
}

function putPeopleData(schoolId, data) {
  if (!state.db) return Promise.resolve();
  return putStoreValue(PEOPLE_DATA_STORE, schoolId, data || null);
}

function getPeopleData(schoolId) {
  if (!state.db) return Promise.resolve(null);
  return getStoreValue(PEOPLE_DATA_STORE, schoolId).then((data) => data || null);
}

function putExtraImages(schoolId, records) {
  if (!state.db) return Promise.resolve();
  return putStoreValue(EXTRA_IMAGES_STORE, schoolId, records || []);
}

function getExtraImages(schoolId) {
  if (!state.db) return Promise.resolve([]);
  return getStoreValue(EXTRA_IMAGES_STORE, schoolId).then((records) => Array.isArray(records) ? records : []);
}

function putGameData(schoolId, data) {
  if (!state.db) return Promise.resolve();
  return putStoreValue(GAME_DATA_STORE, schoolId, normalizeGameData(data));
}

function getGameData(schoolId) {
  if (!state.db) return Promise.resolve(createEmptyGameData());
  return getStoreValue(GAME_DATA_STORE, schoolId).then((data) => normalizeGameData(data));
}

function putStoreValue(storeName, key, value) {
  return new Promise((resolve, reject) => {
    const tx = state.db.transaction(storeName, "readwrite");
    tx.objectStore(storeName).put(value, key);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(tx.error);
  });
}

function getStoreValue(storeName, key) {
  return new Promise((resolve, reject) => {
    const tx = state.db.transaction(storeName, "readonly");
    const request = tx.objectStore(storeName).get(key);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function deleteStoreValue(storeName, key) {
  if (!state.db) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const tx = state.db.transaction(storeName, "readwrite");
    tx.objectStore(storeName).delete(key);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(tx.error);
  });
}

async function importStructureFile(schoolId, file) {
  const school = state.schools.find((item) => item.id === schoolId);
  if (!school) return;
  const data = await readOptionalStructureFile(file);
  await importStructureObject(schoolId, data || createEmptyEditData(), file.name);
}

async function importStructureObject(schoolId, editData, name) {
  const school = state.schools.find((item) => item.id === schoolId);
  if (!school) return;
  const normalized = normalizeEditData(editData || createEmptyEditData());
  await putEditData(schoolId, normalized);
  state.editCache.set(schoolId, normalized);
  markStructureLayerDirty();
  school.structureName = name || "导入结构";
  saveSchools();
  renderSchoolDialogPanels();
  if (state.selectedSchoolId === schoolId) await renderAll({ fit: false });
}

async function exportStructureData(schoolId) {
  const school = state.schools.find((item) => item.id === schoolId);
  if (!school) return;
  const data = await getEditData(schoolId);
  downloadJson(`${safeFileName(school.name)}-structure.json`, createStructureResourcePackage(school, data));
}

function createStructureResourcePackage(school, editData) {
  const normalized = normalizeEditData(editData);
  return {
    kind: "campus-memoir-map-structure",
    version: 2,
    exportedAt: new Date().toISOString(),
    school: {
      name: school?.name || "",
      mapImageName: school?.mapImageName || "",
      structureName: school?.structureName || ""
    },
    mapMeta: getSchoolMapMetaForExport(school),
    editData: normalized
  };
}

function createRuntimeMapMeta(school) {
  const hasRuntimeSize = state.selectedSchoolId === school?.id && state.mapNaturalSize.width && state.mapNaturalSize.height;
  return {
    name: school?.mapImageName || "",
    type: "",
    size: 0,
    width: hasRuntimeSize ? state.mapNaturalSize.width : 0,
    height: hasRuntimeSize ? state.mapNaturalSize.height : 0,
    sha256: "",
    updatedAt: ""
  };
}

function getSchoolMapMetaForExport(school) {
  const meta = normalizeMapMeta(school?.mapMeta);
  const runtime = createRuntimeMapMeta(school);
  return {
    ...runtime,
    ...Object.fromEntries(Object.entries(meta || {}).filter(([, value]) => Boolean(value))),
    width: meta?.width || runtime.width,
    height: meta?.height || runtime.height
  };
}

async function importPeopleFile(schoolId, file) {
  const school = state.schools.find((item) => item.id === schoolId);
  if (!school) return;
  const data = await readOptionalJsonFile(file);
  await importPeopleObject(schoolId, data, file.name);
}

async function importPeopleObject(schoolId, data, name) {
  const school = state.schools.find((item) => item.id === schoolId);
  if (!school) return;
  await putPeopleData(schoolId, data);
  school.peopleFileName = name || "导入人物";
  saveSchools();
  renderSchoolDialogPanels();
  if (state.selectedSchoolId === schoolId) await renderAll({ fit: false });
}

async function exportPeopleData(schoolId) {
  const school = state.schools.find((item) => item.id === schoolId);
  if (!school) return;
  const data = await getPeopleData(schoolId);
  downloadJson(`${safeFileName(school.name)}-people.json`, data || {});
}

async function importExtraImageFiles(schoolId, files) {
  const school = state.schools.find((item) => item.id === schoolId);
  if (!school) return;
  const records = await filesToResourceRecords(files);
  await putExtraImages(schoolId, records);
  school.extraImageCount = records.length;
  saveSchools();
  renderSchoolDialogPanels();
  if (state.selectedSchoolId === schoolId) await renderAll({ fit: false });
}

async function deleteSelectedSchool() {
  if (state.dialogSelection.mode !== "manage" || !state.dialogSelection.schoolId) return;
  const schoolId = state.dialogSelection.schoolId;
  await deleteStoreValue(MAP_IMAGE_STORE, schoolId);
  await deleteStoreValue(EDIT_DATA_STORE, schoolId);
  await deleteStoreValue(PEOPLE_DATA_STORE, schoolId);
  await deleteStoreValue(EXTRA_IMAGES_STORE, schoolId);
  await deleteStoreValue(GAME_DATA_STORE, schoolId);
  const cachedUrl = state.mapImageUrls.get(schoolId);
  if (cachedUrl) URL.revokeObjectURL(cachedUrl);
  state.mapImageUrls.delete(schoolId);
  state.editCache.delete(schoolId);
  state.gameCache.delete(schoolId);
  state.schools = state.schools.filter((school) => school.id !== schoolId);
  if (state.selectedSchoolId === schoolId) {
    state.selectedSchoolId = state.schools[0]?.id || null;
    saveCurrentSchoolId(state.selectedSchoolId);
  }
  saveSchools();
  chooseNewSchoolPanel();
  await renderAll({ fit: true });
  if (!els.schoolDialog.open) return;
  renderSchoolList();
  renderSchoolDialogPanels();
}

async function deleteMapResource() {
  if (state.dialogSelection.mode === "new") {
    state.formDraft.mapFile = null;
    state.formDraft.mapImageName = "";
    renderSchoolDialogPanels();
    return;
  }
  const school = state.schools.find((item) => item.id === state.dialogSelection.schoolId);
  if (!school) return;
  const cachedUrl = state.mapImageUrls.get(school.id);
  if (cachedUrl) URL.revokeObjectURL(cachedUrl);
  state.mapImageUrls.delete(school.id);
  school.mapImageName = "";
  school.mapImageStored = false;
  saveSchools();
  renderSchoolDialogPanels();
  if (state.selectedSchoolId === school.id) await renderAll({ fit: true });
  await deleteStoreValue(MAP_IMAGE_STORE, school.id);
}

async function deleteStructureResource() {
  if (state.dialogSelection.mode === "new") {
    state.formDraft.editData = null;
    state.formDraft.structureFileName = "";
    state.formDraft.peopleData = null;
    state.formDraft.peopleFileName = "";
    state.formDraft.extraImages = [];
    renderSchoolDialogPanels();
    return;
  }
  const school = state.schools.find((item) => item.id === state.dialogSelection.schoolId);
  if (!school) return;
  state.editCache.set(school.id, createEmptyEditData());
  school.structureName = "";
  school.peopleFileName = "";
  school.extraImageCount = 0;
  saveSchools();
  renderSchoolDialogPanels();
  if (state.selectedSchoolId === school.id) await renderAll({ fit: false });
  await putEditData(school.id, createEmptyEditData());
  await putPeopleData(school.id, null);
  await putExtraImages(school.id, []);
}

async function deletePeopleResource() {
  if (state.dialogSelection.mode === "new") {
    state.formDraft.peopleData = null;
    state.formDraft.peopleFileName = "";
    renderSchoolDialogPanels();
    return;
  }
  const school = state.schools.find((item) => item.id === state.dialogSelection.schoolId);
  if (!school) return;
  school.peopleFileName = "";
  saveSchools();
  renderSchoolDialogPanels();
  if (state.selectedSchoolId === school.id) await renderAll({ fit: false });
  await putPeopleData(school.id, null);
}

async function deleteExtraImagesResource() {
  if (state.dialogSelection.mode === "new") {
    state.formDraft.extraImages = [];
    renderSchoolDialogPanels();
    return;
  }
  const school = state.schools.find((item) => item.id === state.dialogSelection.schoolId);
  if (!school) return;
  school.extraImageCount = 0;
  saveSchools();
  renderSchoolDialogPanels();
  if (state.selectedSchoolId === school.id) await renderAll({ fit: false });
  await putExtraImages(school.id, []);
}

async function exportExtraImages(schoolId) {
  const school = state.schools.find((item) => item.id === schoolId);
  if (!school) return;
  const records = await getExtraImages(schoolId);
  downloadJson(`${safeFileName(school.name)}-images.json`, {
    kind: "campus-memoir-extra-images",
    version: 1,
    images: records
  });
}

async function exportMapImage(schoolId) {
  const school = state.schools.find((item) => item.id === schoolId);
  if (!school) return;
  const blob = await getMapImage(schoolId);
  if (!blob) return;
  downloadBlob(school.mapImageName || `${safeFileName(school.name)}-map`, blob);
}

async function exportSchoolPackage(schoolId) {
  const school = state.schools.find((item) => item.id === schoolId);
  if (!school) return;
  const mapBlob = await getMapImage(schoolId);
  const packageData = {
    kind: "campus-memoir-school-package",
    version: 1,
    exportedAt: new Date().toISOString(),
    school: {
      name: school.name,
      mapImageName: school.mapImageName,
      mapMeta: getSchoolMapMetaForExport(school),
      structureName: school.structureName,
      extraImageCount: school.extraImageCount,
      peopleFileName: school.peopleFileName,
      createdAt: school.createdAt
    },
    mapImage: mapBlob ? await blobToResourceRecord(mapBlob, school.mapImageName || "map-image") : null,
    editData: await getEditData(schoolId),
    gameData: await getGameData(schoolId),
    peopleData: await getPeopleData(schoolId),
    extraImages: await getExtraImages(schoolId)
  };
  downloadJson(`${safeFileName(school.name)}.campus-memoir.json`, packageData);
}

async function importSchoolPackageFile(file, options = {}) {
  const data = options.parsedData || await readOptionalJsonFile(file);
  if (!data || data.kind !== "campus-memoir-school-package") {
    setFormError("整校包格式不正确。");
    chooseNewSchoolPanel();
    return;
  }
  const id = createId("school");
  const school = {
    id,
    name: data.school?.name || file.name.replace(/\.campus-memoir\.json$/i, ""),
    mapImageName: data.school?.mapImageName || data.mapImage?.name || "",
    mapMeta: normalizeMapMeta(data.school?.mapMeta),
    mapImageStored: Boolean(data.mapImage),
    structureName: data.school?.structureName || (data.editData ? "导入结构" : ""),
    extraImageCount: Array.isArray(data.extraImages) ? data.extraImages.length : 0,
    peopleFileName: data.school?.peopleFileName || (data.peopleData ? "导入人物" : ""),
    createdAt: data.school?.createdAt || new Date().toISOString()
  };
  if (data.mapImage) {
    await putMapImageRecord(id, data.mapImage);
    if (!school.mapMeta) {
      const blob = resourceRecordToBlob(data.mapImage);
      if (blob) {
        const mapFile = new File([blob], school.mapImageName || data.mapImage.name || "map-image", { type: blob.type || data.mapImage.type || "application/octet-stream" });
        school.mapMeta = await createMapMetaFromFile(mapFile);
      }
    }
  }
  await putEditData(id, normalizeEditData(extractStructureResource(data.editData).editData));
  await putGameData(id, normalizeGameData(data.gameData));
  await putPeopleData(id, data.peopleData || null);
  await putExtraImages(id, Array.isArray(data.extraImages) ? data.extraImages : []);
  state.schools.push(school);
  saveSchools();
  state.dialogSelection = { mode: "manage", schoolId: id };
  if (options.stayInDialog) {
    renderSchoolList();
    renderSchoolDialogPanels();
    if (state.selectedSchoolId === id) await renderAll({ fit: true });
    return;
  }
  state.selectedSchoolId = id;
  saveCurrentSchoolId(id);
  els.schoolDialog.close();
  await renderAll({ fit: true });
}

async function filesToResourceRecords(files) {
  const records = [];
  for (const file of files) {
    records.push(await blobToResourceRecord(file, file.name || "resource"));
  }
  return records;
}

async function blobToResourceRecord(blob, name) {
  return {
    name,
    type: blob.type || "application/octet-stream",
    size: blob.size || 0,
    data: await blobToBase64(blob)
  };
}

function resourceRecordToBlob(record) {
  if (!record) return null;
  if (record.buffer) return normalizeStoredMapImage(record);
  if (!record.data) return null;
  const bytes = base64ToUint8Array(record.data);
  return new Blob([bytes], { type: record.type || "application/octet-stream" });
}

function putMapImageRecord(schoolId, record) {
  const blob = resourceRecordToBlob(record);
  if (!blob) return Promise.resolve();
  return blob.arrayBuffer().then((buffer) => putStoreValue(MAP_IMAGE_STORE, schoolId, {
    version: 2,
    name: record.name || "map-image",
    type: record.type || blob.type || "application/octet-stream",
    size: blob.size || buffer.byteLength,
    buffer
  }));
}

function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result || "");
      resolve(result.includes(",") ? result.split(",")[1] : result);
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}

function base64ToUint8Array(base64) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function downloadJson(filename, data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  downloadBlob(filename, blob);
}

function downloadBlob(filename, blob) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 500);
}

function safeFileName(name) {
  return String(name || "school")
    .trim()
    .replace(/[\\/:*?"<>|]+/g, "-")
    .replace(/\s+/g, "-")
    .slice(0, 80) || "school";
}

function renderToText() {
  const school = getSelectedSchool();
  const editData = school ? getSelectedEditData() : createEmptyEditData();
  const selectedObject = getSelectedStructureObject();
  return JSON.stringify({
    mode: state.editorEnabled ? "map-editor" : "school-shell",
    selectedSchool: school
      ? {
          id: school.id,
          name: school.name,
          hasMapImage: Boolean(school.mapImageStored),
          mapImageName: school.mapImageName || "",
          mapMeta: normalizeMapMeta(school.mapMeta),
          mapImageLoaded: Boolean(state.mapImage),
          imageSize: state.mapNaturalSize,
          structureName: school.structureName || "",
          extraImageCount: school.extraImageCount || 0,
          peopleFileName: school.peopleFileName || ""
        }
      : null,
    schoolCount: state.schools.length,
    dialogOpen: els.schoolDialog.open,
    dialogSelection: {
      mode: state.dialogSelection.mode,
      schoolId: state.dialogSelection.schoolId,
      selectedResources: getSelectedResourceKeys(),
      downloadPanelVisible: !els.downloadPanel.hidden
    },
    editor: {
      enabled: state.editorEnabled,
      mode: state.editorMode,
      activeTool: state.activeTool,
      brushColor: state.brushColor,
      activeColorSlot: state.activeColorSlot,
      colorPopoverOpen: state.colorPopoverOpen,
      imagePalette: state.imagePalette.map((item) => item.color),
      zoom: Number(state.view.scale.toFixed(3)),
      rotationDraft: state.rotationDraft,
      rotationDraftStepCount: state.rotationDraftSteps.length,
      draftPoints: state.draftPolygon.length,
      cropDraftPoints: state.cropDraft.length,
      draftShape: state.draftShape ? state.draftShape.kind : "",
      currentAreaDraft: getCurrentAreaDraft(),
      baseDraftActionCount: state.baseDraftActions.length,
      structureDraftActionCount: state.structureDraftActions.length,
      structureRegionCount: editData.structureRegions.length,
      judgementStrokeCount: editData.judgementStrokes.length,
      structureSelectionCount: editData.structureSelections.length,
      structureLayerCache: {
        width: state.structureLayerCanvas.width,
        height: state.structureLayerCanvas.height,
        dirty: state.structureLayerDirty,
        scale: getStructureCacheScale()
      },
      selectedStructureObjectId: state.selectedStructureObjectId || "",
      selectedStructureObjectAreaCount: selectedObject ? getRegionAreaCount(selectedObject) : 0,
      layers: {
        base: state.showBaseLayer,
        structure: state.showStructureLayer
      },
      visibleWorkspaces: [...els.editorWorkspaces].filter((panel) => !panel.hidden).map((panel) => panel.dataset.editorPanel)
    },
    game: getGameTextState(),
    layout: {
      map: "left",
      info: "right"
    }
  });
}

function getGameTextState() {
  const player = state.gameData.player || {};
  const spot = getDisplayPhotoSpot();
  const building = peekSelectedBuildingMemory();
  const room = getSelectedRoom();
  const item = getSelectedItem();
  const person = getSelectedPerson();
  return {
    mode: state.editorEnabled ? "editor" : state.gameData.location.kind,
    coordinateSystem: "map image pixels, origin top-left, x right, y down",
    zoom: Number(state.view.scale.toFixed(3)),
    player: {
      x: Number((player.x || 0).toFixed(2)),
      y: Number((player.y || 0).toFixed(2)),
      radius: player.radius || DEFAULT_PLAYER_RADIUS,
      walkSpeed: player.walkSpeed || DEFAULT_WALK_SPEED,
      portrait: Boolean(player.portrait)
    },
    follow: {
      screenX: state.mapImage ? Number(imageToScreen(player).x.toFixed(2)) : 0,
      screenY: state.mapImage ? Number(imageToScreen(player).y.toFixed(2)) : 0
    },
    photoSpotCount: state.gameData.photoSpots.length,
    activePhotoSpotId: spot?.id || "",
    activePhotoSpotName: spot ? getPhotoSpotDisplayName(spot) : "",
    activePhotoCount: spot?.photos?.length || 0,
    selectedSpotPhotoId: state.gameData.selectedSpotPhotoId || "",
    selectedSpotPhotoForEditId: state.selectedSpotPhotoForEditId || "",
    nearbyPhotoSpotId: state.currentNearbyPhotoSpotId || "",
    showPhotoMarkers: state.gameData.settings.showPhotoMarkers,
    showInteractionMarkers: state.gameData.settings.showInteractionMarkers,
    nearbyTargets: state.currentNearbyInteractionTargets.map((target) => target.key),
    nearbyBuildingIds: [...state.currentNearbyBuildingIds],
    selectedBuildingId: state.gameData.selectedBuildingId || "",
    selectedBuilding: building ? {
      name: building.customName || getStructureRegionById(state.gameData.selectedBuildingId || state.gameData.location.buildingId)?.name || "",
      category: building.category,
      photoCount: building.photos.length,
      entranceCount: building.entrances.length,
      roomCount: building.rooms.length
    } : null,
    selectedRoom: room ? {
      id: room.id,
      name: room.name,
      type: room.type,
      photoCount: room.photos.length,
      itemCount: room.items.length,
      personCount: room.people.length
    } : null,
    selectedItem: item ? {
      id: item.id,
      name: item.name,
      photoCount: item.photos.length,
      activePhotoIndex: item.activePhotoIndex || 0,
      description: item.description || ""
    } : null,
    selectedPerson: person ? {
      id: person.id,
      name: person.name,
      hasPhoto: Boolean(person.photo),
      chatCount: person.chat.length
    } : null,
    playerPortrait: Boolean(player.portrait)
  };
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function distance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function rgbToHex(r, g, b) {
  return `#${[r, g, b].map((value) => value.toString(16).padStart(2, "0")).join("")}`;
}

function normalizeHexColor(value) {
  const raw = String(value || "").trim();
  const normalized = raw.startsWith("#") ? raw : `#${raw}`;
  return /^#[0-9a-f]{6}$/i.test(normalized) ? normalized.toLowerCase() : "";
}
