const STORAGE_KEY = "campus-memoir-schools-v2";
const LEGACY_STORAGE_KEY = "campus-memoir-schools-v1";
const CURRENT_SCHOOL_KEY = "campus-memoir-current-school-id";
const STATS_VISITOR_KEY = "campus-memoir-stats-visitor";
const STATS_LAST_UV_DATE_KEY = "campus-memoir-stats-last-uv-date";
const DB_NAME = "campus-memoir-local-db";
const DB_VERSION = 5;
const MAP_IMAGE_STORE = "mapImages";
const EDIT_DATA_STORE = "mapEditData";
const PEOPLE_DATA_STORE = "peopleData";
const EXTRA_IMAGES_STORE = "extraImages";
const GAME_DATA_STORE = "gameData";
const APP_SETTINGS_STORE = "appSettings";
const ALBUM_SETTINGS_KEY = "album";
const STRUCTURE_BRUSH_SIZE = 24;
const LINEAR_STRUCTURE_WIDTH = 12;
const DEFAULT_PLAYER_RADIUS = 26;
const PLAYER_COLLISION_RADIUS_FACTOR = 0.42;
const PRIORITY_PATH_TOUCH_RADIUS_FACTOR = 1;
const DEFAULT_WALK_SPEED = 320;
const WALK_SPEED_FACTOR = 0.75;
const MOVE_SLIDE_SAMPLE_RADIUS = 8;
const MOVE_SLIDE_MIN_DISTANCE = 0.5;
const MOVE_APPLY_MIN_DISTANCE = 0.02;
const MOVE_TARGET_STOP_DISTANCE = 6;
const MOVE_TARGET_SEARCH_RADIUS = 120;
const MOVE_TARGET_START_SAMPLE_DISTANCE = 18;
const MOVE_TARGET_PROGRESS_EPSILON = 0.75;
const MOVE_TARGET_STUCK_DRIFT_DISTANCE = 6;
const MOVE_TARGET_REPATH_SECONDS = 0.35;
const MOVE_TARGET_STUCK_SECONDS = 2.4;
const MOVE_TARGET_PATH_COOLDOWN_SECONDS = 0.55;
const MOVE_TARGET_WAYPOINT_DISTANCE = 10;
const MOVE_TARGET_PATH_MAX_NODES = 18000;
const MOVE_MAX_BLOCKED_GAP = 3;
const STRUCTURE_CLICK_HIT_DISTANCE = 8;
const MAP_ALPHA_VISIBILITY_TOLERANCE = 2;
const NEARBY_CONTEXT_REFRESH_DISTANCE = 18;
const GAME_CLICK_MOVE_TOLERANCE = 14;
const PHOTO_SPOT_MERGE_FACTOR = 1;
const PHOTO_SPOT_INTERACT_RADIUS_FACTOR = 1;
const PHOTO_SPOT_NAME_PREFIX = "拍照点";
const DEFAULT_BUILDING_MAP_PHOTO_LIMIT = 6;
const MAP_MARKER_PHOTO_MIN_SCALE = 0.22;
const MAP_MARKER_PHOTO_MAX_SCALE = 2;
const INTERIOR_MAP_WIDTH = 1000;
const INTERIOR_MAP_HEIGHT = 1000;
const INTERIOR_MAP_PADDING = 0;
const INTERIOR_PLAYER_RADIUS = 22;
const INTERIOR_MOVE_TARGET_STOP_DISTANCE = 8;
const INTERIOR_WALK_SPEED_FACTOR = 0.82;
const EXPLORATION_TARGET_GRID_COUNT = 52;
const EXPLORATION_MIN_GRID_SIZE = 90;
const EXPLORATION_MAX_GRID_SIZE = 240;
const EXPLORATION_TRANSPARENT_SKIP_RATIO = 0.5;
const PHOTO_PREVIEW_MAX_SIDE = 1600;
const PHOTO_PREVIEW_QUALITY = 0.82;
const PHOTO_PREVIEW_TYPE = "image/jpeg";
const MAP_ALPHA_MASK_MAX_SIDE = 2048;
const STATS_COUNTER_RPC_URL = "https://ypefmpeekfucmarbbdov.supabase.co";
const STATS_COUNTER_RPC_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwZWZtcGVla2Z1Y21hcmJiZG92Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU5NTA2NTYsImV4cCI6MjA4MTUyNjY1Nn0.XTOQNFuuwfu9nwDTnO9-NEqlzZnzdCVnEmYEJh0rXf8";
const STATS_COUNTER_IDS = {
  totalPv: "campus_memoir_pv_total",
  totalUv: "campus_memoir_uv_total",
  dailyPvPrefix: "campus_memoir_pv_day",
  dailyUvPrefix: "campus_memoir_uv_day"
};
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
  return type === "wall";
}

function isInteractiveStructureType(type) {
  return !["road", "water", "wall"].includes(type);
}

function canStructureUseEntrance(type) {
  return type !== "gate";
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
    showInteractionMarkers: true,
    showPeopleMarkers: true,
    showExplorationGrid: false
  },
  location: {
    kind: "campus",
    buildingId: "",
    roomId: ""
  },
  selectedPhotoSpotId: "",
  selectedBuildingId: "",
  selectedSpotPhotoId: "",
  selectedBuildingPhotoId: "",
  selectedRoomId: "",
  selectedItemId: "",
  selectedPersonId: "",
  photoSpots: [],
  buildings: {}
};

const VENUE_TYPES = [
  "寝室",
  "实验室",
  "办公室",
  "篮球场",
  "羽毛球场",
  "网球场",
  "乒乓球场",
  "台球场",
  "溜冰场",
  "游泳池",
  "自习室",
  "食堂窗口",
  "超市",
  "足球场",
  "跑道",
  "健身房",
  "教室",
  "自定义"
];

const VENUE_TYPE_RULES = {
  寝室: { personLabel: "舍友", itemLabel: "交通工具" },
  实验室: { personLabel: "同门", itemLabel: "工位" },
  办公室: { personLabel: "导师", itemLabel: "物品" },
  健身房: { personLabel: "老师/同学", itemLabel: "运动器材" },
  食堂窗口: { personLabel: "老师/同学", itemLabel: "菜" },
  超市: { personLabel: "老师/同学", itemLabel: "货物" }
};

const PERSON_TYPES = ["老师", "同学", "舍友", "同门", "导师", "朋友", "恋人", "店员", "自己", "自定义"];
const ITEM_TYPES = ["物品", "交通工具", "运动器材", "菜", "货物", "工位", "项目", "自定义"];

const BUILDING_CATEGORY_RULES = {
  dormitory: {
    label: "宿舍楼",
    roomTypes: VENUE_TYPES,
    personLabel: "舍友",
    itemLabel: "交通工具"
  },
  lab: {
    label: "实验楼",
    roomTypes: VENUE_TYPES,
    personLabel: "同学/老师",
    itemLabel: "工位"
  },
  canteen: {
    label: "食堂",
    roomTypes: VENUE_TYPES,
    personLabel: "联系人",
    itemLabel: "菜品"
  },
  gym: {
    label: "体育馆/健身房",
    roomTypes: VENUE_TYPES,
    personLabel: "同伴",
    itemLabel: "项目"
  },
  market: {
    label: "超市",
    roomTypes: VENUE_TYPES,
    personLabel: "店员/同学",
    itemLabel: "商品"
  },
  office: {
    label: "导师办公室",
    roomTypes: VENUE_TYPES,
    personLabel: "老师",
    itemLabel: "物品"
  },
  other: {
    label: "普通建筑",
    roomTypes: VENUE_TYPES,
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
  clearDraftButton: ["clear", "清除草稿"],
  showAllStructureButton: ["plusArea", "一键启用"],
  hideAllStructureButton: ["clear", "一键隐藏"]
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
  一键启用: "启用",
  一键隐藏: "隐藏",
  确定区域: "确定",
  添加区域: "添加",
  清除草稿: "清除"
};

const OFFICIAL_CATALOG = [
  {
    id: "ustc-gaoxin-3d",
    name: "中国科学技术大学高新校区 3D",
    version: "2026-06-17",
    sizeLabel: "约 71MB",
    description: "含高新校区 3D 底图和结构图。",
    packageUrl: "https://github.com/kw66/campus-memoir/releases/download/maps-20260617/ustc-gaoxin-3d.campus-memoir.json"
  },
  {
    id: "ustc-east-3d",
    name: "中国科学技术大学东校区 3D",
    version: "2026-06-17",
    sizeLabel: "约 112MB",
    description: "含东校区 3D 底图和结构图。",
    packageUrl: "https://github.com/kw66/campus-memoir/releases/download/maps-20260617/ustc-east-3d.campus-memoir.json"
  },
  {
    id: "ustc-west-3d",
    name: "中国科学技术大学西校区 3D",
    version: "2026-06-17",
    sizeLabel: "约 92MB",
    description: "含西校区 3D 底图和结构图。",
    packageUrl: "https://github.com/kw66/campus-memoir/releases/download/maps-20260617/ustc-west-3d.campus-memoir.json"
  },
  {
    id: "ustc-central-3d",
    name: "中国科学技术大学中校区 3D",
    version: "2026-06-17",
    sizeLabel: "约 20MB",
    description: "含中校区 3D 底图和结构图。",
    packageUrl: "https://github.com/kw66/campus-memoir/releases/download/maps-20260617/ustc-central-3d.campus-memoir.json"
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
  explorationCache: null,
  explorationDirty: true,
  globalStats: { totalPv: 0, todayPv: 0, totalUv: 0, todayUv: 0 },
  globalStatsStatus: "正在读取校园足迹...",
  downloadJobs: new Map(),
  album: {
    supported: typeof window.showDirectoryPicker === "function",
    handle: null,
    enabled: false,
    permission: "unknown",
    rootName: "",
    status: "checking",
    message: "正在检测相册库..."
  },
  photoUrlCache: new Map(),
  photoImageCache: new Map(),
  movementKeys: new Set(),
  moveTarget: null,
  moveTargetPath: [],
  moveTargetPathIndex: 0,
  moveTargetBestDistance: Infinity,
  moveTargetBestWaypointDistance: Infinity,
  moveTargetStuckSeconds: 0,
  moveTargetStuckOrigin: null,
  moveTargetRepathSeconds: 0,
  moveTargetPathCooldownSeconds: 0,
  lastGameFrameTime: 0,
  gameLoopRunning: false,
  gameLoopFrameId: null,
  manualStepping: false,
  gameSaveTimer: null,
  activeGameFileTarget: "",
  currentNearbyPhotoSpotId: "",
  currentNearbyInteractionTargets: [],
  currentNearbyBuildingIds: [],
  nearbyContextLastPoint: null,
  selectedNearbyInteractionKey: "",
  defaultPhotoSpotInteractionKey: "",
  selectedSpotPhotoForEditId: "",
  selectedBuildingPhotoForEditId: "",
  gamePointerDown: null,
  gameTouches: new Map(),
  gamePinch: {
    active: false,
    startDistance: 0,
    startScale: 1,
    anchor: null,
    moved: false
  },
  lastGamePointerClickHandledAt: 0,
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
  mapAlphaPixelCache: new Map(),
  mapAlphaMask: null,
  structureBoundsCache: new WeakMap(),
  structureSpatialIndexCache: new WeakMap(),
  movementSampleCache: null,
  interactionPreviewScale: 1,
  interactionFastUntil: 0,
  interactionIdleTimer: null,
  mapRenderWarm: false,
  paletteRenderKey: "",
  structureObjectListKey: "",
  suppressColorHistory: false
};

const els = {
  schoolButton: document.querySelector("#schoolButton"),
  currentSchool: document.querySelector("#currentSchool"),
  gameInfoButton: document.querySelector("#gameInfoButton"),
  gameInfoPanel: document.querySelector("#gameInfoPanel"),
  gameInfoCloseButton: document.querySelector("#gameInfoCloseButton"),
  albumStatus: document.querySelector("#albumStatus"),
  albumDescription: document.querySelector("#albumDescription"),
  albumChooseButton: document.querySelector("#albumChooseButton"),
  albumReconnectButton: document.querySelector("#albumReconnectButton"),
  albumForgetButton: document.querySelector("#albumForgetButton"),
  globalStatsPanel: document.querySelector("#globalStatsPanel"),
  globalStatsStatus: document.querySelector("#globalStatsStatus"),
  explorationProgress: document.querySelector("#explorationProgress"),
  explorationProgressText: document.querySelector("#explorationProgressText"),
  explorationProgressFill: document.querySelector("#explorationProgressFill"),
  mapToolbar: document.querySelector("#mapToolbar"),
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
  importProgress: document.querySelector("#importProgress"),
  importProgressFill: document.querySelector("#importProgressFill"),
  importProgressText: document.querySelector("#importProgressText"),
  mapFrame: document.querySelector("#mapFrame"),
  mapCanvas: document.querySelector("#mapCanvas"),
  mapEmpty: document.querySelector("#mapEmpty"),
  mapActions: document.querySelector("#mapActions"),
  mapPhotoButton: document.querySelector("#mapPhotoButton"),
  mapAnnotationToggle: document.querySelector("#mapAnnotationToggle"),
  mapExplorationGridToggle: document.querySelector("#mapExplorationGridToggle"),
  panelHeader: document.querySelector("#panelHeader"),
  panelKicker: document.querySelector("#panelKicker"),
  infoTitle: document.querySelector("#infoTitle"),
  infoBody: document.querySelector("#infoBody"),
  gamePanel: document.querySelector("#gamePanel"),
  spotPhotoInput: document.querySelector("#spotPhotoInput"),
  spotCameraInput: document.querySelector("#spotCameraInput"),
  buildingPhotoInput: document.querySelector("#buildingPhotoInput"),
  buildingCameraInput: document.querySelector("#buildingCameraInput"),
  roomPhotoInput: document.querySelector("#roomPhotoInput"),
  roomCameraInput: document.querySelector("#roomCameraInput"),
  itemPhotoInput: document.querySelector("#itemPhotoInput"),
  itemCameraInput: document.querySelector("#itemCameraInput"),
  playerPortraitInput: document.querySelector("#playerPortraitInput"),
  playerPortraitCameraInput: document.querySelector("#playerPortraitCameraInput"),
  personPhotoInput: document.querySelector("#personPhotoInput"),
  personCameraInput: document.querySelector("#personCameraInput"),
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
  editorColorInputs: document.querySelectorAll("[data-editor-color-input]"),
  colorPreviews: document.querySelectorAll("[data-color-preview]"),
  imageColorPalettes: document.querySelectorAll('[data-palette="image"]'),
  commonColorPalettes: document.querySelectorAll('[data-palette="common"]'),
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
    await loadAlbumSettings();
    state.schools = normalizeSchools(loadSchools());
    saveSchools();
    await migrateStoredEditData();
  } catch (error) {
    state.schools = normalizeSchools(loadSchools());
    setFormError("本地图片存储初始化失败，暂时无法新建学校。");
    console.error(error);
  }
  state.selectedSchoolId = loadCurrentSchoolId(state.schools);
  await renderAll({ fit: true });
  void initGlobalStats();
  window.render_game_to_text = renderToText;
  window.advanceTime = async (ms = 16) => {
    const steps = Math.max(1, Math.round(Number(ms || 16) / (1000 / 60)));
    state.manualStepping = true;
    if (state.gameLoopFrameId !== null) {
      cancelAnimationFrame(state.gameLoopFrameId);
      state.gameLoopFrameId = null;
    }
    state.gameLoopRunning = false;
    for (let index = 0; index < steps; index++) {
      updateGameMovement(1 / 60);
    }
    state.manualStepping = false;
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
        rebuildMapAlphaMask();
        initializeGameForCurrentMap({ resetPlayer: true });
        state.editorEnabled = true;
        setEditorMode("structure");
        fitImageToView();
        renderEditorState();
        queueDraw();
      },
      setAlbumHandleForTest: async (handle) => {
        state.album = {
          ...state.album,
          supported: true,
          handle,
          enabled: true,
          permission: "granted",
          rootName: handle?.name || "test-album",
          status: "connected",
          message: "测试相册库已连接。"
        };
        renderAlbumStatus();
      },
      getCurrentAreaDraft,
      createParallelogramAreaFromThreePoints,
      normalizeArea,
      refreshMapCaches: () => {
        rebuildInteractionPreview();
        clearExplorationCache();
        queueDraw();
      },
      initializeGameForCurrentMap,
      setupInteriorTest: async () => {
        await window.__campusMemoirDebug.setupTestSchool();
        const editData = getSelectedEditData();
        const buildingRegion = normalizeRegion({
          id: "debug-building",
          name: "图书教育中心",
          type: "building",
          walkable: false,
          color: TYPE_STYLES.building.line,
          areas: [{ kind: "rect", x: 210, y: 120, width: 180, height: 150 }]
        });
        editData.structureRegions = [buildingRegion];
        const building = getOrCreateBuildingMemory("debug-building");
        building.customName = "图书教育中心";
        building.rooms = ["寝室", "实验室", "自习室", "健身房"].map((type, index) => normalizeRoom({
          id: `debug-room-${index + 1}`,
          name: index === 1 ? "课题组实验室" : type,
          type,
          createdAt: new Date().toISOString()
        }));
        building.rooms[0].people.push(normalizePerson({ id: "debug-person-self", name: "我", type: "自己" }));
        building.rooms[1].people.push(normalizePerson({ id: "debug-person-labmate", name: "同门A", type: "同门" }));
        building.rooms[3].items.push(normalizeMemoryItem({ id: "debug-item-treadmill", name: "跑步机", type: "运动器材" }));
        building.interiorPlayer = { x: 250, y: 250 };
        state.gameData.location = { kind: "building", buildingId: "debug-building", roomId: building.rooms[0].id };
        state.gameData.selectedBuildingId = "debug-building";
        state.gameData.selectedRoomId = building.rooms[0].id;
        state.editorEnabled = false;
        els.mapEmpty.hidden = true;
        els.missingMapActions.hidden = true;
        clearMoveTarget();
        fitImageToView();
        renderEditorState();
        renderGamePanel({ force: true });
        queueDraw();
      },
      updateNearbyGameContext,
      followPlayer,
      renderGamePanel,
      updateGameMovement,
      updateInteriorMovement,
      getMovementVector,
      getCurrentMovementPoint,
      setMoveTarget,
      setMoveTargetFromClick,
      setInteriorMoveTargetFromClick,
      findMoveTargetNear,
      findStartableMoveTarget,
      resolvePlayerMove,
      screenToInterior,
      getInteriorRoomLayout,
      screenToImage,
      queueDraw
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

  els.gameInfoButton.addEventListener("click", () => {
    toggleGameInfoPanel();
  });

  els.gameInfoCloseButton.addEventListener("click", () => {
    toggleGameInfoPanel(false);
  });

  els.albumChooseButton.addEventListener("click", () => {
    void chooseAlbumFolder();
  });

  els.albumReconnectButton.addEventListener("click", () => {
    void reconnectAlbumFolder();
  });

  els.albumForgetButton.addEventListener("click", () => {
    void forgetAlbumFolder();
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
  els.mapAnnotationToggle.addEventListener("change", () => {
    setMapAnnotationsVisible(els.mapAnnotationToggle.checked);
    markGameDirty({ defer: true });
    renderGamePanel({ force: true });
    queueDraw();
  });
  els.mapExplorationGridToggle.addEventListener("change", () => {
    state.gameData.settings.showExplorationGrid = els.mapExplorationGridToggle.checked;
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

  for (const input of els.editorColorInputs) {
    input.addEventListener("input", () => {
      state.activeColorSlot = input.dataset.editorColorInput || "target";
      setActiveEditorColor(input.value);
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
  document.addEventListener("keydown", (event) => {
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
  els.gamePanel.addEventListener("load", onGamePanelResourceLoad, true);
  bindPhotoInput(els.spotPhotoInput, addPhotosAtPlayer);
  bindPhotoInput(els.spotCameraInput, addPhotosAtPlayer);
  bindPhotoInput(els.buildingPhotoInput, addPhotosToSelectedBuilding);
  bindPhotoInput(els.buildingCameraInput, addPhotosToSelectedBuilding);
  bindPhotoInput(els.roomPhotoInput, addPhotosToSelectedRoom);
  bindPhotoInput(els.roomCameraInput, addPhotosToSelectedRoom);
  bindPhotoInput(els.itemPhotoInput, addPhotosToSelectedItem);
  bindPhotoInput(els.itemCameraInput, addPhotosToSelectedItem);
  bindSinglePhotoInput(els.playerPortraitInput, setPlayerPortraitFromDorm);
  bindSinglePhotoInput(els.playerPortraitCameraInput, setPlayerPortraitFromDorm);
  bindSinglePhotoInput(els.personPhotoInput, setSelectedPersonPhoto);
  bindSinglePhotoInput(els.personCameraInput, setSelectedPersonPhoto);

  els.mapCanvas.addEventListener("pointerdown", onPointerDown);
  els.mapCanvas.addEventListener("pointermove", onPointerMove);
  els.mapCanvas.addEventListener("pointerleave", onPointerLeave);
  els.mapCanvas.addEventListener("pointerup", onPointerUp);
  els.mapCanvas.addEventListener("pointercancel", onPointerCancel);
  els.mapCanvas.addEventListener("click", onCanvasClick);
  els.mapCanvas.addEventListener("contextmenu", (event) => event.preventDefault());
  els.mapCanvas.addEventListener("wheel", onWheel, { passive: false });
  window.addEventListener("resize", () => {
    resizeCanvas();
    if (state.editorEnabled) clampView();
    else followPlayer();
    queueDraw();
  });
}

function bindPhotoInput(input, handler) {
  input?.addEventListener("change", () => {
    const files = [...(input.files || [])];
    input.value = "";
    if (files.length) void handler(files);
  });
}

function bindSinglePhotoInput(input, handler) {
  input?.addEventListener("change", () => {
    const file = input.files?.[0] || null;
    input.value = "";
    if (file) void handler(file);
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
  setImportProgress({
    status: "running",
    message: files.length > 1 ? `准备导入 ${files.length} 个文件...` : `准备导入 ${files[0].name || "文件"}...`,
    loaded: 0,
    total: files.reduce((sum, file) => sum + (file.size || 0), 0),
    percent: 0
  });
  try {
    const zipFiles = files.filter((file) => isZipFile(file));
    if (zipFiles.length) {
      setFormError("zip 导入接口已预留，当前先使用 JSON 包或图片文件。");
      setImportProgress({
        status: "error",
        message: "zip 导入暂未启用，请选择 JSON 整校包或图片。",
        percent: 0
      });
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
    setImportProgress({
      status: "done",
      message: "导入完成。",
      percent: 100
    });
  } catch (error) {
    console.error(error);
    setImportProgress({
      status: "error",
      message: "导入失败，请检查文件格式。",
      percent: 0
    });
    setFormError("导入失败，请检查文件格式。");
  } finally {
    setBulkBusy(false);
  }
}

async function importJsonResourceFile(file) {
  const text = await readTextFileWithProgress(file, (progress) => {
    setImportProgress({
      status: "running",
      message: `正在读取 ${file.name || "JSON 文件"}...`,
      loaded: progress.loaded,
      total: progress.total,
      percent: progress.percent
    });
  });
  setImportProgress({
    status: "running",
    message: `正在解析 ${file.name || "JSON 文件"}...`,
    loaded: file.size || 0,
    total: file.size || 0,
    percent: 70
  });
  await new Promise((resolve) => requestAnimationFrame(resolve));
  const data = JSON.parse(text);
  const kind = detectJsonResourceKind(data);

  if (kind === "school") {
    await importSchoolPackageFile(file, {
      stayInDialog: true,
      parsedData: data,
      onProgress: setImportProgress
    });
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
  clearFormNote();
  const job = setDownloadJob(item.id, {
    status: "running",
    message: "正在连接...",
    loaded: 0,
    total: 0,
    percent: 0
  });
  els.formNote.textContent = `正在下载 ${item.name}...`;
  els.formNote.classList.remove("error");
  setBulkBusy(true);
  try {
    const response = await fetch(item.packageUrl);
    if (!response.ok) throw new Error(`download failed: ${response.status}`);
    const blob = await readResponseBlobWithProgress(response, item.id);
    setDownloadJob(item.id, {
      ...job,
      status: "running",
      message: "正在解析并导入...",
      loaded: blob.size,
      total: blob.size,
      percent: 100
    });
    const file = new File([blob], `${safeFileName(item.name)}.campus-memoir.json`, {
      type: blob.type || "application/json"
    });
    const importedSchool = await importSchoolPackageFile(file, { stayInDialog: true, keepDownloadPanel: true });
    const schoolName = importedSchool?.name || state.schools.find((school) => school.id === state.dialogSelection.schoolId)?.name || item.name;
    setDownloadJob(item.id, {
      status: "done",
      message: `已导入：${schoolName}`,
      loaded: blob.size,
      total: blob.size,
      percent: 100
    });
    els.formNote.textContent = `已导入 ${schoolName}。`;
    els.formNote.classList.remove("error");
  } catch (error) {
    console.warn(error);
    const errorMessage = getDownloadFailureMessage(error);
    setDownloadJob(item.id, {
      status: "error",
      message: errorMessage,
      loaded: 0,
      total: 0,
      percent: 0
    });
    setFormError(errorMessage);
  } finally {
    setBulkBusy(false);
  }
}

function getDownloadFailureMessage(error) {
  const text = String(error?.message || error || "");
  if (/Failed to fetch|Load failed|NetworkError/i.test(text)) {
    return "浏览器无法直接读取 GitHub Release，请点手动下载后再用导入。";
  }
  return "自动导入失败，请点手动下载后再用导入。";
}

async function readResponseBlobWithProgress(response, itemId) {
  const total = Number(response.headers.get("Content-Length")) || 0;
  const contentType = response.headers.get("Content-Type") || "application/json";
  const reader = response.body?.getReader ? response.body.getReader() : null;
  if (!reader) {
    setDownloadJob(itemId, {
      status: "running",
      message: "正在下载...",
      loaded: 0,
      total,
      percent: 0
    });
    return response.blob();
  }

  const chunks = [];
  let loaded = 0;
  setDownloadJob(itemId, {
    status: "running",
    message: total ? `正在下载 0%` : "正在下载 0 MB",
    loaded,
    total,
    percent: 0
  });

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (!value) continue;
    chunks.push(value);
    loaded += value.byteLength || value.length || 0;
    const percent = total ? clamp(loaded / total * 100, 0, 99.5) : 0;
    setDownloadJob(itemId, {
      status: "running",
      message: total ? `正在下载 ${Math.floor(percent)}%` : `正在下载 ${formatBytes(loaded)}`,
      loaded,
      total,
      percent
    });
  }

  return new Blob(chunks, { type: contentType });
}

function setDownloadJob(itemId, next) {
  const previous = state.downloadJobs.get(itemId) || {};
  const job = { ...previous, ...next, updatedAt: Date.now() };
  state.downloadJobs.set(itemId, job);
  renderDownloadJob(itemId);
  return job;
}

function getDownloadJob(itemId) {
  return state.downloadJobs.get(itemId) || null;
}

function setImportProgress(job = null) {
  if (!els.importProgress || !els.importProgressFill || !els.importProgressText) return;
  if (!job) {
    els.importProgress.hidden = true;
    els.importProgressFill.style.width = "0%";
    els.importProgressText.textContent = "";
    return;
  }
  const percent = clamp(Number(job.percent) || 0, 0, 100);
  els.importProgress.hidden = false;
  els.importProgress.dataset.status = job.status || "running";
  els.importProgressFill.style.width = `${percent.toFixed(1)}%`;
  const detail = job.total
    ? `${formatBytes(job.loaded || 0)} / ${formatBytes(job.total || 0)}`
    : job.loaded ? formatBytes(job.loaded) : "";
  els.importProgressText.textContent = detail
    ? `${job.message || "正在处理..."} · ${detail}`
    : job.message || "正在处理...";
}

function formatBytes(bytes) {
  const value = Number(bytes) || 0;
  if (value >= 1024 * 1024 * 1024) return `${(value / 1024 / 1024 / 1024).toFixed(1)} GB`;
  if (value >= 1024 * 1024) return `${(value / 1024 / 1024).toFixed(1)} MB`;
  if (value >= 1024) return `${(value / 1024).toFixed(1)} KB`;
  return `${Math.max(0, Math.round(value))} B`;
}

function openOfficialPackageDownload(item) {
  if (!item.packageUrl) {
    setFormError("暂未配置下载地址。");
    return;
  }
  window.open(item.packageUrl, "_blank", "noopener,noreferrer");
}

async function readOptionalStructureFile(file) {
  if (!file) return null;
  const parsed = await readOptionalJsonFile(file);
  return normalizeEditData(extractStructureResource(parsed).editData);
}

async function readOptionalJsonFile(file, options = {}) {
  if (!file) return null;
  const text = options.onProgress
    ? await readTextFileWithProgress(file, options.onProgress)
    : await file.text();
  return JSON.parse(text);
}

function readTextFileWithProgress(file, onProgress) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    const total = file.size || 0;
    reader.onprogress = (event) => {
      const loaded = event.loaded || 0;
      const eventTotal = event.lengthComputable ? event.total : total;
      onProgress({
        loaded,
        total: eventTotal,
        percent: eventTotal ? clamp(loaded / eventTotal * 65, 0, 65) : 0
      });
    };
    reader.onload = () => {
      onProgress({
        loaded: total,
        total,
        percent: 65
      });
      resolve(String(reader.result || ""));
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsText(file);
  });
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
  const current = readStoredSchoolList(STORAGE_KEY);
  const legacy = readStoredSchoolList(LEGACY_STORAGE_KEY);
  if (hasUsableSchoolList(current)) return current;
  if (hasUsableSchoolList(legacy)) return legacy;
  return current || legacy || [];
}

function readStoredSchoolList(key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function hasUsableSchoolList(schools) {
  return Array.isArray(schools) && normalizeSchools(schools).length > 0;
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
    setImportProgress(null);
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
    const job = getDownloadJob(item.id);
    const busy = job?.status === "running";
    const row = document.createElement("article");
    row.className = "download-item";
    row.dataset.downloadId = item.id;

    const text = document.createElement("div");
    text.className = "download-copy";
    const title = document.createElement("strong");
    title.textContent = item.name;
    const meta = document.createElement("span");
    meta.textContent = `GitHub Release 官方包 · ${item.version || "最新"} · ${item.sizeLabel || "文件大小未知"}`;
    const desc = document.createElement("span");
    desc.textContent = item.description || "点击后下载并导入到本地浏览器。";
    const progress = document.createElement("div");
    progress.className = "download-progress";
    progress.hidden = !job;
    progress.innerHTML = `
      <div class="download-progress-track" aria-hidden="true"><span style="width:${clamp(Number(job?.percent) || 0, 0, 100).toFixed(1)}%"></span></div>
      <span class="download-progress-text">${escapeHtml(getDownloadJobText(job))}</span>
    `;
    text.append(title, meta, desc, progress);

    const actions = document.createElement("div");
    actions.className = "download-actions";

    const button = document.createElement("button");
    button.className = "secondary-button";
    button.type = "button";
    button.textContent = busy ? "下载中..." : job?.status === "done" ? "重新导入" : "下载并导入";
    button.disabled = busy;
    button.addEventListener("click", () => {
      void downloadOfficialPackage(item);
    });

    const fallback = document.createElement("button");
    fallback.className = "secondary-button";
    fallback.type = "button";
    fallback.textContent = "手动下载";
    fallback.title = "打开 GitHub Release 下载链接";
    fallback.disabled = busy;
    fallback.addEventListener("click", () => {
      openOfficialPackageDownload(item);
    });

    actions.append(button, fallback);
    row.append(text, actions);
    els.downloadList.append(row);
  }
}

function renderDownloadJob(itemId) {
  const item = OFFICIAL_CATALOG.find((entry) => entry.id === itemId);
  if (!item) return;
  const row = [...els.downloadList.querySelectorAll(".download-item")]
    .find((element) => element.dataset.downloadId === itemId);
  if (!row) {
    renderDownloadCatalog();
    return;
  }
  const job = getDownloadJob(itemId);
  const busy = job?.status === "running";
  const progress = row.querySelector(".download-progress");
  const fill = row.querySelector(".download-progress-track span");
  const text = row.querySelector(".download-progress-text");
  const buttons = row.querySelectorAll("button");
  if (progress) progress.hidden = !job;
  if (fill) fill.style.width = `${clamp(Number(job?.percent) || 0, 0, 100).toFixed(1)}%`;
  if (text) text.textContent = getDownloadJobText(job);
  if (buttons[0]) {
    buttons[0].disabled = busy;
    buttons[0].textContent = busy ? "下载中..." : job?.status === "done" ? "重新导入" : "下载并导入";
  }
  if (buttons[1]) buttons[1].disabled = busy;
}

function getDownloadJobText(job) {
  if (!job) return "";
  const detail = job.total
    ? `${formatBytes(job.loaded || 0)} / ${formatBytes(job.total || 0)}`
    : job.loaded ? formatBytes(job.loaded) : "";
  return detail ? `${job.message || "正在处理..."} · ${detail}` : job.message || "正在处理...";
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
  els.zoomReadout.hidden = false;
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
    els.mapToolbar.hidden = true;
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
  if (editData.__migrated) {
    delete editData.__migrated;
    await putEditData(school.id, editData);
  }
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
    const initializedChanged = initializeGameForCurrentMap(options);
    if (initializedChanged) await saveCurrentGameData();
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
    els.mapToolbar.hidden = true;
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
  if (!state.mapNaturalSize.width || !state.mapNaturalSize.height) return false;
  let changed = false;
  const player = state.gameData.player;
  const hasValidPosition = Number.isFinite(player.x) && Number.isFinite(player.y) && player.x > 0 && player.y > 0;
  if (!hasValidPosition || options.resetPlayer) {
    player.x = state.mapNaturalSize.width / 2;
    player.y = state.mapNaturalSize.height / 2;
    markGameDirty({ defer: true });
    changed = true;
  }
  const clampedX = clamp(player.x, 0, state.mapNaturalSize.width);
  const clampedY = clamp(player.y, 0, state.mapNaturalSize.height);
  if (player.x !== clampedX || player.y !== clampedY) {
    player.x = clampedX;
    player.y = clampedY;
    markGameDirty({ defer: true });
    changed = true;
  }
  if (!canPlayerMoveFreelyFrom(player)) {
    const walkable = findNearbyWalkablePoint(player, { requireFreedom: true })
      || findNearbyWalkablePoint(player)
      || { x: state.mapNaturalSize.width / 2, y: state.mapNaturalSize.height / 2 };
    if (player.x !== walkable.x || player.y !== walkable.y) {
      player.x = walkable.x;
      player.y = walkable.y;
      markGameDirty({ defer: true });
      changed = true;
    }
  }
  updateNearbyGameContext();
  return changed;
}

function setGameViewToDefaultFollow() {
  if (!state.mapImage) return;
  state.view.scale = clamp(1, state.view.minScale, state.view.maxScale);
  followPlayer();
  updateZoomReadout();
}

function followPlayer() {
  if (!state.mapImage || state.editorEnabled) return;
  if (state.gameData.location.kind === "building") return;
  const { width, height } = state.canvasSize;
  const player = state.gameData.player;
  state.view.x = width / 2 - player.x * state.view.scale;
  state.view.y = height / 2 - player.y * state.view.scale;
  clampView();
}

function startGameLoop() {
  if (state.manualStepping || state.gameLoopRunning) return;
  state.gameLoopRunning = true;
  state.lastGameFrameTime = performance.now();
  state.gameLoopFrameId = requestAnimationFrame(gameLoop);
}

function clearMoveTarget() {
  state.moveTarget = null;
  state.moveTargetPath = [];
  state.moveTargetPathIndex = 0;
  state.moveTargetBestDistance = Infinity;
  state.moveTargetBestWaypointDistance = Infinity;
  state.moveTargetStuckSeconds = 0;
  state.moveTargetStuckOrigin = null;
  state.moveTargetRepathSeconds = 0;
  state.moveTargetPathCooldownSeconds = 0;
}

function setMoveTarget(target) {
  if (!target) {
    clearMoveTarget();
    return;
  }
  const origin = getCurrentMovementPoint();
  state.moveTarget = target;
  state.moveTargetPath = [];
  state.moveTargetPathIndex = 0;
  state.moveTargetBestDistance = distance(origin, target);
  state.moveTargetBestWaypointDistance = state.moveTargetBestDistance;
  state.moveTargetStuckSeconds = 0;
  state.moveTargetStuckOrigin = { x: origin.x, y: origin.y };
  state.moveTargetRepathSeconds = 0;
  state.moveTargetPathCooldownSeconds = 0;
}

function getCurrentMovementPoint() {
  if (state.gameData.location.kind === "building") return getInteriorPlayer();
  return state.gameData.player;
}

function resetMoveTargetStuckWatch(point = state.gameData.player) {
  state.moveTargetStuckSeconds = 0;
  state.moveTargetStuckOrigin = { x: point.x, y: point.y };
}

function updateMoveTargetStuckWatch(dt) {
  if (!state.moveTarget) return;
  if (!state.moveTargetStuckOrigin) {
    resetMoveTargetStuckWatch();
    return;
  }
  if (distance(state.gameData.player, state.moveTargetStuckOrigin) > MOVE_TARGET_STUCK_DRIFT_DISTANCE) {
    resetMoveTargetStuckWatch();
    return;
  }
  state.moveTargetStuckSeconds += dt;
}

function updateMoveTargetProgress(dt, previousPoint) {
  if (!state.moveTarget) return;
  const activeTarget = getActiveMoveTargetPoint();
  const currentDistance = distance(state.gameData.player, state.moveTarget);
  const waypointDistance = distance(state.gameData.player, activeTarget);
  if (!Number.isFinite(state.moveTargetBestDistance)) {
    state.moveTargetBestDistance = currentDistance;
    state.moveTargetBestWaypointDistance = waypointDistance;
    state.moveTargetStuckSeconds = 0;
    return;
  }
  const previousDistance = previousPoint ? distance(previousPoint, activeTarget) : Infinity;
  const isProgressing = waypointDistance < previousDistance - MOVE_TARGET_PROGRESS_EPSILON
    || waypointDistance < state.moveTargetBestWaypointDistance - MOVE_TARGET_PROGRESS_EPSILON
    || currentDistance < state.moveTargetBestDistance - MOVE_TARGET_PROGRESS_EPSILON;
  state.moveTargetBestDistance = Math.min(state.moveTargetBestDistance, currentDistance);
  state.moveTargetBestWaypointDistance = Math.min(state.moveTargetBestWaypointDistance, waypointDistance);
  if (isProgressing) {
    resetMoveTargetStuckWatch();
    state.moveTargetRepathSeconds = 0;
  } else {
    state.moveTargetRepathSeconds += dt;
  }
}

function gameLoop(now) {
  state.gameLoopRunning = false;
  state.gameLoopFrameId = null;
  const dt = Math.min(0.05, Math.max(0, (now - (state.lastGameFrameTime || now)) / 1000));
  state.lastGameFrameTime = now;
  if (!state.editorEnabled && state.mapImage) {
    const moved = updateGameMovement(dt);
    if (moved || getMovementVector().x || getMovementVector().y || (state.moveTarget && !state.movementKeys.size)) {
      state.gameLoopRunning = true;
      state.gameLoopFrameId = requestAnimationFrame(gameLoop);
    }
  }
}

function updateGameMovement(dt) {
  state.movementSampleCache = new Map();
  try {
    return updateGameMovementCore(dt);
  } finally {
    state.movementSampleCache = null;
  }
}

function updateGameMovementCore(dt) {
  if (state.gameData.location.kind === "building") return updateInteriorMovement(dt);
  const autoMove = state.moveTarget && !state.movementKeys.size;
  if (autoMove) {
    state.moveTargetPathCooldownSeconds = Math.max(0, state.moveTargetPathCooldownSeconds - dt);
    advanceMoveTargetWaypoint();
  }
  if (state.moveTarget && !state.movementKeys.size && distance(state.gameData.player, state.moveTarget) <= MOVE_TARGET_STOP_DISTANCE) {
    clearMoveTarget();
  }
  let vector = getMovementVector();
  if (!vector.x && !vector.y && state.moveTarget && !state.movementKeys.size && hasActiveMoveTargetPath()) {
    clearMoveTargetPath();
    vector = getMovementVector();
  }
  if (!vector.x && !vector.y && state.moveTarget && !state.movementKeys.size) {
    updateMoveTargetStuckWatch(dt);
    if (state.moveTargetStuckSeconds >= MOVE_TARGET_STUCK_SECONDS) {
      clearMoveTarget();
    }
    queueDraw();
    return false;
  }
  if (!vector.x && !vector.y) return false;
  const player = state.gameData.player;
  const previousPoint = { x: player.x, y: player.y };
  const speed = (Number(player.walkSpeed) || DEFAULT_WALK_SPEED) * WALK_SPEED_FACTOR;
  let next = resolvePlayerMove(player, vector, speed * dt);
  if (!next && state.moveTarget && !state.movementKeys.size) {
    next = resolveMoveTargetStep(player, speed * dt);
  }
  if (next && distance(player, next) < MOVE_APPLY_MIN_DISTANCE) next = null;
  if (!next) {
    if (state.moveTarget && !state.movementKeys.size) {
      if (hasActiveMoveTargetPath()) {
        clearMoveTargetPath();
        state.moveTargetRepathSeconds = 0;
        state.moveTargetPathCooldownSeconds = 0;
        queueDraw();
        return false;
      }
      updateMoveTargetStuckWatch(dt);
      state.moveTargetRepathSeconds += dt;
      if (state.moveTargetStuckSeconds >= 0.35) {
        const recovery = resolveMoveTargetStep(player, Math.max(speed * dt, MOVE_SLIDE_MIN_DISTANCE * 8));
        if (recovery) {
          player.x = recovery.x;
          player.y = recovery.y;
          resetMoveTargetStuckWatch();
          state.moveTargetRepathSeconds = 0;
          const contextChanged = updateNearbyGameContextIfNeeded({ force: true });
          followPlayer();
          if (contextChanged) renderGamePanel();
          queueDraw();
          return true;
        }
      }
      if (state.moveTargetRepathSeconds >= MOVE_TARGET_REPATH_SECONDS && tryBuildMoveTargetPath(player)) {
        queueDraw();
        return false;
      }
      if (state.moveTargetStuckSeconds >= MOVE_TARGET_STUCK_SECONDS) {
        clearMoveTarget();
      }
      queueDraw();
    }
    return false;
  }
  markMapInteraction(90);
  player.x = next.x;
  player.y = next.y;
  let targetReached = false;
  if (state.moveTarget && !state.movementKeys.size && distance(player, state.moveTarget) <= MOVE_TARGET_STOP_DISTANCE) {
    clearMoveTarget();
    targetReached = true;
  } else if (state.moveTarget && !state.movementKeys.size) {
    updateMoveTargetStuckWatch(dt);
    updateMoveTargetProgress(dt, previousPoint);
    if (state.moveTarget && state.moveTargetRepathSeconds >= MOVE_TARGET_REPATH_SECONDS) {
      tryBuildMoveTargetPath(player);
    }
    if (state.moveTarget && state.moveTargetStuckSeconds >= MOVE_TARGET_STUCK_SECONDS) {
      clearMoveTarget();
      targetReached = true;
    }
  }
  const contextChanged = updateNearbyGameContextIfNeeded({ force: targetReached });
  followPlayer();
  if (targetReached) {
    markGameDirty({ defer: true, keepExplorationCache: true });
  }
  if (contextChanged || targetReached) renderGamePanel();
  queueDraw();
  return true;
}

function updateInteriorMovement(dt) {
  const building = getSelectedBuildingMemory();
  if (!building) return false;
  const player = getInteriorPlayer(building);
  if (state.moveTarget && !state.movementKeys.size && distance(player, state.moveTarget) <= INTERIOR_MOVE_TARGET_STOP_DISTANCE) {
    clearMoveTarget();
  }
  const vector = getMovementVector();
  if (!vector.x && !vector.y) return false;
  const previous = { x: player.x, y: player.y };
  const speed = (Number(state.gameData.player.walkSpeed) || DEFAULT_WALK_SPEED) * WALK_SPEED_FACTOR * INTERIOR_WALK_SPEED_FACTOR;
  const target = clampInteriorPoint({
    x: player.x + vector.x * speed * dt,
    y: player.y + vector.y * speed * dt
  });
  building.interiorPlayer = target;
  if (state.moveTarget && !state.movementKeys.size && distance(target, state.moveTarget) <= INTERIOR_MOVE_TARGET_STOP_DISTANCE) {
    clearMoveTarget();
  }
  const moved = distance(previous, target) >= MOVE_APPLY_MIN_DISTANCE;
  const roomChanged = syncSelectedRoomFromInteriorPlayer({ silent: true });
  if (moved) markGameDirty({ defer: true, keepExplorationCache: true });
  if (roomChanged) renderGamePanel({ force: true });
  queueDraw();
  return moved || roomChanged;
}

function resolvePlayerMove(origin, direction, distanceValue) {
  if (!distanceValue || (!direction.x && !direction.y)) return null;
  const fullDelta = {
    x: direction.x * distanceValue,
    y: direction.y * distanceValue
  };
  const direct = clampMoveTarget(origin, fullDelta);
  if (canPlayerMoveTo(direct)) return direct;
  const projected = getProjectedSlideMove(origin, direction, distanceValue, direct);
  if (projected) return projected;
  return getFallbackSlideMove(origin, fullDelta);
}

function resolveMoveTargetRecovery(origin, direction, distanceValue) {
  if (!distanceValue || (!direction.x && !direction.y)) return null;
  const probeDistance = Math.max(distanceValue * 3, MOVE_SLIDE_MIN_DISTANCE * 8, getPlayerCollisionRadius(origin) * 2, 12);
  const angles = [
    Math.PI / 10,
    -Math.PI / 10,
    Math.PI / 6,
    -Math.PI / 6,
    Math.PI / 4,
    -Math.PI / 4,
    Math.PI / 2,
    -Math.PI / 2,
    (Math.PI * 2) / 3,
    -(Math.PI * 2) / 3,
    (Math.PI * 3) / 4,
    -(Math.PI * 3) / 4
  ];
  const baseAngle = Math.atan2(direction.y, direction.x);
  let best = null;
  let bestScore = -Infinity;
  for (const offset of angles) {
    const candidateDirection = {
      x: Math.cos(baseAngle + offset),
      y: Math.sin(baseAngle + offset)
    };
    const move = findFarthestWalkableMove(origin, {
      x: candidateDirection.x * probeDistance,
      y: candidateDirection.y * probeDistance
    });
    if (!move) continue;
    const moved = distance(origin, move);
    const progress = candidateDirection.x * direction.x + candidateDirection.y * direction.y;
    const score = progress * 4 + moved;
    if (score > bestScore) {
      best = move;
      bestScore = score;
    }
  }
  return best;
}

function resolveMoveTargetStep(origin, distanceValue) {
  const target = getActiveMoveTargetPoint();
  if (!target || !distanceValue) return null;
  const primary = normalizeVector({ x: target.x - origin.x, y: target.y - origin.y });
  if (!primary) return null;
  const direct = resolvePlayerMove(origin, primary, distanceValue);
  if (direct) return direct;
  const fanMove = findBestFanMoveToward(origin, primary, target, distanceValue);
  if (fanMove) return fanMove;
  return resolveMoveTargetRecovery(origin, primary, distanceValue);
}

function findBestFanMoveToward(origin, primary, target, distanceValue) {
  const probeDistance = Math.max(distanceValue * 2.6, getPlayerCollisionRadius(origin) * 1.35, 18);
  const baseAngle = Math.atan2(primary.y, primary.x);
  const offsets = [
    0,
    Math.PI / 18,
    -Math.PI / 18,
    Math.PI / 12,
    -Math.PI / 12,
    Math.PI / 8,
    -Math.PI / 8,
    Math.PI / 6,
    -Math.PI / 6,
    Math.PI / 4,
    -Math.PI / 4,
    Math.PI / 3,
    -Math.PI / 3,
    Math.PI / 2,
    -Math.PI / 2,
    (Math.PI * 2) / 3,
    -(Math.PI * 2) / 3
  ];
  const currentTargetDistance = distance(origin, target);
  let best = null;
  let bestScore = -Infinity;
  for (const offset of offsets) {
    const direction = {
      x: Math.cos(baseAngle + offset),
      y: Math.sin(baseAngle + offset)
    };
    const move = findFarthestWalkableMove(origin, {
      x: direction.x * probeDistance,
      y: direction.y * probeDistance
    });
    if (!move) continue;
    const moved = distance(origin, move);
    if (moved < MOVE_SLIDE_MIN_DISTANCE) continue;
    const targetGain = currentTargetDistance - distance(move, target);
    const alignment = direction.x * primary.x + direction.y * primary.y;
    const score = targetGain * 8 + alignment * 2 + moved * 0.35 - Math.abs(offset) * 0.45;
    if (score > bestScore) {
      best = move;
      bestScore = score;
    }
  }
  return best;
}

function getActiveMoveTargetPoint() {
  if (state.moveTargetPath?.length && state.moveTargetPathIndex < state.moveTargetPath.length) {
    return state.moveTargetPath[state.moveTargetPathIndex];
  }
  return state.moveTarget || state.gameData.player;
}

function hasActiveMoveTargetPath() {
  return Boolean(state.moveTargetPath?.length && state.moveTargetPathIndex < state.moveTargetPath.length);
}

function clearMoveTargetPath() {
  state.moveTargetPath = [];
  state.moveTargetPathIndex = 0;
  state.moveTargetBestWaypointDistance = Number.isFinite(state.moveTargetBestDistance)
    ? state.moveTargetBestDistance
    : distance(state.gameData.player, state.moveTarget || state.gameData.player);
}

function advanceMoveTargetWaypoint() {
  if (!state.moveTargetPath?.length) return;
  const player = state.gameData.player;
  while (state.moveTargetPathIndex < state.moveTargetPath.length) {
    const waypoint = state.moveTargetPath[state.moveTargetPathIndex];
    if (distance(player, waypoint) > MOVE_TARGET_WAYPOINT_DISTANCE) break;
    state.moveTargetPathIndex += 1;
    state.moveTargetBestWaypointDistance = Infinity;
  }
  if (state.moveTargetPathIndex >= state.moveTargetPath.length) {
    clearMoveTargetPath();
  }
}

function tryBuildMoveTargetPath(origin = state.gameData.player) {
  if (!state.moveTarget || state.moveTargetPathCooldownSeconds > 0) return false;
  state.moveTargetPathCooldownSeconds = MOVE_TARGET_PATH_COOLDOWN_SECONDS;
  const path = buildMoveTargetPath(origin, state.moveTarget);
  if (!path?.length) {
    state.moveTargetRepathSeconds = 0;
    return false;
  }
  const firstUsableIndex = path.findIndex((point) => distance(origin, point) > MOVE_TARGET_WAYPOINT_DISTANCE);
  const usablePath = firstUsableIndex >= 0 ? path.slice(firstUsableIndex) : [];
  if (!usablePath.length || !hasClearMoveSegment(origin, usablePath[0])) {
    state.moveTargetRepathSeconds = 0;
    return false;
  }
  state.moveTargetPath = usablePath;
  state.moveTargetPathIndex = 0;
  state.moveTargetBestWaypointDistance = distance(origin, getActiveMoveTargetPoint());
  state.moveTargetRepathSeconds = 0;
  return true;
}

function buildMoveTargetPath(origin, target) {
  if (!origin || !target || !state.mapNaturalSize.width || !state.mapNaturalSize.height) return null;
  if (!canPlayerMoveTo(origin) || !canPlayerMoveTo(target)) return null;
  const radius = Math.max(8, getPlayerCollisionRadius(origin));
  const routeDistance = distance(origin, target);
  const margin = clamp(Math.max(radius * 8, routeDistance * 0.35), 180, 720);
  const bounds = {
    left: clamp(Math.min(origin.x, target.x) - margin, 0, state.mapNaturalSize.width),
    top: clamp(Math.min(origin.y, target.y) - margin, 0, state.mapNaturalSize.height),
    right: clamp(Math.max(origin.x, target.x) + margin, 0, state.mapNaturalSize.width),
    bottom: clamp(Math.max(origin.y, target.y) + margin, 0, state.mapNaturalSize.height)
  };
  let cellSize = clamp(radius * 1.35, 18, 44);
  let cols = Math.max(1, Math.ceil((bounds.right - bounds.left) / cellSize));
  let rows = Math.max(1, Math.ceil((bounds.bottom - bounds.top) / cellSize));
  if (cols * rows > MOVE_TARGET_PATH_MAX_NODES) {
    cellSize = Math.min(96, Math.ceil(Math.sqrt(((bounds.right - bounds.left) * (bounds.bottom - bounds.top)) / MOVE_TARGET_PATH_MAX_NODES)));
    cols = Math.max(1, Math.ceil((bounds.right - bounds.left) / cellSize));
    rows = Math.max(1, Math.ceil((bounds.bottom - bounds.top) / cellSize));
  }
  if (cols * rows > MOVE_TARGET_PATH_MAX_NODES) return null;
  const toCell = (point) => ({
    col: clamp(Math.floor((point.x - bounds.left) / cellSize), 0, cols - 1),
    row: clamp(Math.floor((point.y - bounds.top) / cellSize), 0, rows - 1)
  });
  const toKey = (cell) => `${cell.col},${cell.row}`;
  const cellCenter = (cell) => clampImagePoint({
    x: Math.min(bounds.right, bounds.left + (cell.col + 0.5) * cellSize),
    y: Math.min(bounds.bottom, bounds.top + (cell.row + 0.5) * cellSize)
  });
  const start = toCell(origin);
  const goal = toCell(target);
  const startKey = toKey(start);
  const goalKey = toKey(goal);
  if (startKey === goalKey) return [target];
  const walkableCache = new Map();
  const isCellWalkable = (cell) => {
    if (cell.col < 0 || cell.row < 0 || cell.col >= cols || cell.row >= rows) return false;
    const key = toKey(cell);
    if (key === startKey || key === goalKey) return true;
    if (walkableCache.has(key)) return walkableCache.get(key);
    const value = canPlayerMoveTo(cellCenter(cell));
    walkableCache.set(key, value);
    return value;
  };
  if (!isCellWalkable(start) || !isCellWalkable(goal)) return null;
  const queue = [start];
  const cameFrom = new Map([[startKey, ""]]);
  let head = 0;
  let foundKey = "";
  while (head < queue.length) {
    const current = queue[head++];
    const currentKey = toKey(current);
    if (currentKey === goalKey) {
      foundKey = currentKey;
      break;
    }
    const neighbors = [
      { col: current.col + 1, row: current.row },
      { col: current.col - 1, row: current.row },
      { col: current.col, row: current.row + 1 },
      { col: current.col, row: current.row - 1 },
      { col: current.col + 1, row: current.row + 1 },
      { col: current.col - 1, row: current.row + 1 },
      { col: current.col + 1, row: current.row - 1 },
      { col: current.col - 1, row: current.row - 1 }
    ].sort((a, b) => distance(cellCenter(a), target) - distance(cellCenter(b), target));
    for (const neighbor of neighbors) {
      const key = toKey(neighbor);
      if (cameFrom.has(key) || !isCellWalkable(neighbor)) continue;
      if (neighbor.col !== current.col && neighbor.row !== current.row) {
        if (!isCellWalkable({ col: neighbor.col, row: current.row }) || !isCellWalkable({ col: current.col, row: neighbor.row })) continue;
      }
      cameFrom.set(key, currentKey);
      queue.push(neighbor);
      if (key === goalKey) {
        foundKey = key;
        head = queue.length;
        break;
      }
    }
  }
  if (!foundKey) return null;
  const cells = [];
  let key = foundKey;
  while (key && key !== startKey) {
    const [col, row] = key.split(",").map(Number);
    cells.push({ col, row });
    key = cameFrom.get(key);
  }
  cells.reverse();
  const points = simplifyMovePath(cells.map(cellCenter), origin);
  if (!points.length || distance(points[points.length - 1], target) > MOVE_TARGET_STOP_DISTANCE) {
    points.push(target);
  } else {
    points[points.length - 1] = target;
  }
  return points;
}

function simplifyMovePath(points, origin) {
  const simplified = [];
  let anchor = origin;
  for (let index = 0; index < points.length; index++) {
    const point = points[index];
    if (hasClearMoveSegment(anchor, point)) continue;
    const previous = points[Math.max(0, index - 1)];
    if (!simplified.length || distance(simplified[simplified.length - 1], previous) > 1) {
      simplified.push(previous);
    }
    anchor = previous;
  }
  if (points.length) {
    const last = points[points.length - 1];
    if (!simplified.length || distance(simplified[simplified.length - 1], last) > 1) {
      simplified.push(last);
    }
  }
  return simplified;
}

function hasClearMoveSegment(from, to) {
  const length = distance(from, to);
  if (length <= MOVE_TARGET_STOP_DISTANCE) return true;
  const steps = Math.max(1, Math.ceil(length / Math.max(8, getPlayerCollisionRadius(from) * 0.45)));
  for (let index = 1; index <= steps; index++) {
    const t = index / steps;
    const point = {
      x: from.x + (to.x - from.x) * t,
      y: from.y + (to.y - from.y) * t
    };
    if (!canPlayerMoveTo(point)) return false;
  }
  return true;
}

function clampMoveTarget(origin, delta) {
  return {
    x: clamp(origin.x + delta.x, 0, state.mapNaturalSize.width),
    y: clamp(origin.y + delta.y, 0, state.mapNaturalSize.height)
  };
}

function getProjectedSlideMove(origin, direction, distanceValue, blockedPoint) {
  const normal = findBlockingNormal(blockedPoint) || estimateBlockedBoundaryNormal(blockedPoint);
  if (!normal) return null;
  const dot = direction.x * normal.x + direction.y * normal.y;
  const projected = {
    x: direction.x - normal.x * dot,
    y: direction.y - normal.y * dot
  };
  const projectedLength = Math.hypot(projected.x, projected.y);
  const tangent = normalizeVector(projected);
  if (tangent) {
    const projectedDistance = distanceValue * projectedLength;
    const projectedMove = findFarthestWalkableMove(origin, {
      x: tangent.x * projectedDistance,
      y: tangent.y * projectedDistance
    });
    if (projectedMove) return projectedMove;
  }
  return getTangentSlideMove(origin, direction, normal, distanceValue);
}

function getTangentSlideMove(origin, direction, normal, distanceValue) {
  const first = normalizeVector({ x: -normal.y, y: normal.x });
  if (!first) return null;
  const second = { x: -first.x, y: -first.y };
  const ordered = direction.x * first.x + direction.y * first.y >= direction.x * second.x + direction.y * second.y
    ? [first, second]
    : [second, first];
  for (const tangent of ordered) {
    for (const factor of [1, 0.75, 0.5, 0.25]) {
      const move = findFarthestWalkableMove(origin, {
        x: tangent.x * distanceValue * factor,
        y: tangent.y * distanceValue * factor
      });
      if (move) return move;
    }
  }
  return null;
}

function estimateBlockedBoundaryNormal(point) {
  const radius = MOVE_SLIDE_SAMPLE_RADIUS;
  const offsets = [
    { x: radius, y: 0 },
    { x: -radius, y: 0 },
    { x: 0, y: radius },
    { x: 0, y: -radius },
    { x: radius, y: radius },
    { x: -radius, y: radius },
    { x: radius, y: -radius },
    { x: -radius, y: -radius }
  ];
  let x = 0;
  let y = 0;
  for (const offset of offsets) {
    const sample = {
      x: point.x + offset.x,
      y: point.y + offset.y
    };
    if (canPlayerMoveTo(sample)) {
      x += offset.x;
      y += offset.y;
    } else {
      x -= offset.x;
      y -= offset.y;
    }
  }
  return normalizeVector({ x: -x, y: -y });
}

function getFallbackSlideMove(origin, fullDelta) {
  const candidates = [];
  if (Math.abs(fullDelta.x) >= MOVE_SLIDE_MIN_DISTANCE) candidates.push({ x: fullDelta.x, y: 0 });
  if (Math.abs(fullDelta.y) >= MOVE_SLIDE_MIN_DISTANCE) candidates.push({ x: 0, y: fullDelta.y });
  candidates.push(
    { x: fullDelta.x * 0.75, y: fullDelta.y * 0.25 },
    { x: fullDelta.x * 0.25, y: fullDelta.y * 0.75 },
    { x: fullDelta.x * 0.5, y: 0 },
    { x: 0, y: fullDelta.y * 0.5 }
  );
  let best = null;
  let bestDistance = 0;
  for (const candidate of candidates) {
    const move = findFarthestWalkableMove(origin, candidate);
    if (!move) continue;
    const moved = distance(origin, move);
    if (moved > bestDistance) {
      best = move;
      bestDistance = moved;
    }
  }
  return bestDistance >= MOVE_SLIDE_MIN_DISTANCE ? best : null;
}

function findFarthestWalkableMove(origin, delta) {
  if (Math.hypot(delta.x, delta.y) < MOVE_SLIDE_MIN_DISTANCE) return null;
  const originWalkable = canPlayerMoveTo(origin);
  const originTouchesPriorityPath = isPlayerCircleTouchingPriorityPath(origin);
  const bridged = findFarthestWalkableMoveWithGap(origin, delta);
  if (bridged) return bridged;
  let low = 0;
  let high = 1;
  let best = null;
  for (let index = 0; index < 8; index++) {
    const t = (low + high) / 2;
    const point = clampMoveTarget(origin, {
      x: delta.x * t,
      y: delta.y * t
    });
    if (canPlayerMoveTo(point)) {
      best = point;
      low = t;
    } else {
      high = t;
    }
  }
  if (!best && (!originWalkable || originTouchesPriorityPath)) {
    const escape = findFirstWalkableMove(origin, delta);
    if (escape) return escape;
  }
  return best && distance(origin, best) >= MOVE_SLIDE_MIN_DISTANCE ? best : null;
}

function findFarthestWalkableMoveWithGap(origin, delta) {
  const length = Math.hypot(delta.x, delta.y);
  if (length < MOVE_SLIDE_MIN_DISTANCE) return null;
  const step = Math.max(1, Math.min(3, getPlayerCollisionRadius(origin) * 0.22));
  const steps = Math.max(2, Math.ceil(length / step));
  let best = null;
  let blockedDistance = 0;
  for (let index = 1; index <= steps; index++) {
    const t = index / steps;
    const point = clampMoveTarget(origin, {
      x: delta.x * t,
      y: delta.y * t
    });
    if (canPlayerMoveTo(point)) {
      best = point;
      blockedDistance = 0;
      continue;
    }
    blockedDistance += length / steps;
    if (blockedDistance > MOVE_MAX_BLOCKED_GAP) break;
  }
  return best && distance(origin, best) >= MOVE_SLIDE_MIN_DISTANCE ? best : null;
}

function findFirstWalkableMove(origin, delta) {
  const length = Math.hypot(delta.x, delta.y);
  if (length < MOVE_SLIDE_MIN_DISTANCE) return null;
  const steps = Math.max(6, Math.ceil(length / Math.max(1, MOVE_SLIDE_MIN_DISTANCE)));
  for (let index = 1; index <= steps; index++) {
    const point = clampMoveTarget(origin, {
      x: delta.x * (index / steps),
      y: delta.y * (index / steps)
    });
    if (canPlayerMoveTo(point)) return point;
  }
  return null;
}

function normalizeVector(vector) {
  const length = Math.hypot(vector.x, vector.y);
  if (!Number.isFinite(length) || length < 0.0001) return null;
  return {
    x: vector.x / length,
    y: vector.y / length
  };
}

function getMovementVector() {
  let x = 0;
  let y = 0;
  if (state.movementKeys.has("ArrowLeft") || state.movementKeys.has("KeyA")) x -= 1;
  if (state.movementKeys.has("ArrowRight") || state.movementKeys.has("KeyD")) x += 1;
  if (state.movementKeys.has("ArrowUp") || state.movementKeys.has("KeyW")) y -= 1;
  if (state.movementKeys.has("ArrowDown") || state.movementKeys.has("KeyS")) y += 1;
  if (!x && !y && state.moveTarget) {
    const player = getCurrentMovementPoint();
    const target = getActiveMoveTargetPoint();
    x = target.x - player.x;
    y = target.y - player.y;
  }
  const length = Math.hypot(x, y);
  return length > 0 ? { x: x / length, y: y / length } : { x: 0, y: 0 };
}

function handleGameKeyDown(event) {
  if (state.editorEnabled || !state.mapImage) return false;
  const code = event.code;
  if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "KeyA", "KeyD", "KeyW", "KeyS"].includes(code)) return false;
  event.preventDefault();
  clearMoveTarget();
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
  const cache = state.movementSampleCache;
  if (cache) {
    const key = `${Math.round(point.x * 4) / 4},${Math.round(point.y * 4) / 4}`;
    if (cache.has(key)) return cache.get(key);
    const value = canPlayerMoveToUncached(point);
    cache.set(key, value);
    return value;
  }
  return canPlayerMoveToUncached(point);
}

function canPlayerMoveToUncached(point) {
  const touchesPriorityPath = isPlayerCircleTouchingPriorityPath(point);
  if (!isPointOnVisibleMap(point)) return false;
  const sample = samplePlayerCollisionAt(point);
  if (sample.walkable !== false) return true;
  return touchesPriorityPath;
}

function isPlayerCircleOnVisibleMap(point) {
  const radius = getPlayerCollisionRadius(point);
  if (!isPointOnVisibleMap(point)) return false;
  const samples = [
    point,
    { x: point.x + radius, y: point.y },
    { x: point.x - radius, y: point.y },
    { x: point.x, y: point.y + radius },
    { x: point.x, y: point.y - radius },
    { x: point.x + radius * 0.7071, y: point.y + radius * 0.7071 },
    { x: point.x - radius * 0.7071, y: point.y + radius * 0.7071 },
    { x: point.x + radius * 0.7071, y: point.y - radius * 0.7071 },
    { x: point.x - radius * 0.7071, y: point.y - radius * 0.7071 }
  ];
  return samples.every(isPointOnVisibleMap);
}

function isPointOnVisibleMap(point) {
  if (!state.mapImage || !state.mapNaturalSize.width || !state.mapNaturalSize.height) return false;
  if (!Number.isFinite(point.x) || !Number.isFinite(point.y)) return false;
  if (point.x < 0 || point.y < 0 || point.x >= state.mapNaturalSize.width || point.y >= state.mapNaturalSize.height) return false;
  const editData = getSelectedEditData();
  if (editData.cropPolygon?.length >= 3 && !pointInPolygon(point, editData.cropPolygon)) return false;
  if (!isTransparentMapPixel(point)) return true;
  return hasNearbyVisibleMapPixel(point, MAP_ALPHA_VISIBILITY_TOLERANCE);
}

function hasNearbyVisibleMapPixel(point, radius) {
  if (!radius) return false;
  for (let y = -radius; y <= radius; y += 1) {
    for (let x = -radius; x <= radius; x += 1) {
      if (!x && !y) continue;
      const sample = { x: point.x + x, y: point.y + y };
      if (sample.x < 0 || sample.y < 0 || sample.x >= state.mapNaturalSize.width || sample.y >= state.mapNaturalSize.height) continue;
      if (!isTransparentMapPixel(sample)) return true;
    }
  }
  return false;
}

function samplePlayerCollisionAt(point) {
  const sample = sampleStructureAt(point);
  if (sample.priorityHit || isPlayerCircleTouchingPriorityPath(point)) {
    return { ...sample, walkable: true, top: sample.priorityHit || sample.walkableHit || sample.top };
  }
  if (sample.walkable === false) return sample;
  if (!hasNearbyBlockingStructure(point)) return sample;
  const blocker = findNearestBlockingStructure(point);
  if (!blocker) return sample;
  return {
    walkable: false,
    top: blocker.hit,
    hits: [blocker.hit, ...sample.hits]
  };
}

function isPriorityPathType(type) {
  return type === "road" || type === "bridge" || type === "gate";
}

function isPlayerCircleTouchingPriorityPath(point) {
  return isPlayerCircleTouchingWalkableStructure(point, {
    priorityOnly: true,
    radius: getPriorityPathTouchRadius(point)
  });
}

function isPlayerCircleTouchingWalkableStructure(point, options = {}) {
  const radius = Number.isFinite(Number(options.radius)) ? Math.max(1, Number(options.radius)) : getPlayerCollisionRadius(point);
  const visibleObjects = getVisibleStructureObjectIds();
  for (const region of getStructureRegionCandidatesNear(point, radius)) {
    if (region.visible === false) continue;
    const type = region.type || "custom";
    const walkable = getStructureTypeWalkable(type, region.walkable);
    if (!walkable) continue;
    if (options.priorityOnly && !isPriorityPathType(type)) continue;
    if (!isPointNearStructureRegionBounds(point, region, radius)) continue;
    if (distanceToRegion(point, getRegionAreas(region), region) <= radius) return true;
  }
  for (const stroke of getJudgementStrokeCandidatesNear(point, radius)) {
    const type = stroke.type || "custom";
    const walkable = getStructureTypeWalkable(type, stroke.walkable);
    if (!walkable) continue;
    if (options.priorityOnly && !isPriorityPathType(type)) continue;
    if (!stroke.objectId || !visibleObjects.has(stroke.objectId)) continue;
    if (!isPointNearJudgementStrokeBounds(point, stroke, radius)) continue;
    if (distanceToStroke(point, stroke) <= radius) return true;
  }
  return false;
}

function findBlockingNormal(point) {
  const blocker = findNearestBlockingStructure(point);
  if (!blocker?.normal) return null;
  return blocker.normal;
}

function findNearestBlockingStructure(point) {
  const radius = getPlayerCollisionRadius(point);
  let best = null;
  for (const hit of getBlockingStructureDistances(point)) {
    if (hit.distance > radius) continue;
    if (!best || hit.distance < best.distance) best = hit;
  }
  return best;
}

function getBlockingStructureDistances(point) {
  const editData = getSelectedEditData();
  const visibleObjects = getVisibleStructureObjectIds();
  const hits = [];
  for (const region of editData.structureRegions) {
    if (region.visible === false || getStructureTypeWalkable(region.type, region.walkable)) continue;
    const info = nearestRegionBoundaryInfo(point, region);
    if (!info) continue;
    hits.push({
      distance: isPointInRegion(point, region) ? 0 : info.distance,
      normal: info.normal,
      hit: {
        id: region.id,
        name: region.name || "",
        type: region.type || "custom",
        walkable: false,
        displayRank: getStructureDisplayRank(region.type),
        walkRank: getStructureWalkRank(region.type)
      }
    });
  }
  for (const stroke of editData.judgementStrokes) {
    if (!stroke.objectId || !visibleObjects.has(stroke.objectId)) continue;
    if (getStructureTypeWalkable(stroke.type, stroke.walkable)) continue;
    const info = nearestStrokeBoundaryInfo(point, stroke);
    if (!info) continue;
    hits.push({
      distance: info.distance,
      normal: info.normal,
      hit: {
        id: stroke.objectId || stroke.id,
        name: stroke.name || "",
        type: stroke.type || "custom",
        walkable: false,
        displayRank: getStructureDisplayRank(stroke.type),
        walkRank: getStructureWalkRank(stroke.type)
      }
    });
  }
  return hits.sort((a, b) => a.distance - b.distance);
}

function nearestRegionBoundaryInfo(point, region) {
  let best = null;
  for (const area of getRegionAreas(region)) {
    if (getRegionEraseAreas(region).some((eraseArea) => isPointInArea(point, eraseArea))) continue;
    const info = nearestAreaBoundaryInfo(point, area, region);
    if (!info) continue;
    if (!best || info.distance < best.distance) best = info;
  }
  return best;
}

function nearestAreaBoundaryInfo(point, area, region) {
  if (area.kind === "line") {
    return nearestPolylineBoundaryInfo(point, area.points || [], false, Math.max(1, (Number(area.width) || LINEAR_STRUCTURE_WIDTH) / 2));
  }
  if (area.kind === "pixels") {
    const bounds = pixelRunsBounds(area.pixels || []);
    return bounds ? nearestBoundsBoundaryInfo(point, bounds) : null;
  }
  if (area.kind === "rect") return nearestBoundsBoundaryInfo(point, {
    left: Math.min(area.x, area.x + area.width),
    top: Math.min(area.y, area.y + area.height),
    right: Math.max(area.x, area.x + area.width),
    bottom: Math.max(area.y, area.y + area.height)
  });
  if (area.kind === "ellipse") return nearestPolylineBoundaryInfo(point, getAreaOutlinePoints(area), true, 0);
  const outline = isLinearStructureType(region?.type)
    ? getAreaOutlinePoints(area)
    : area.kind === "parallelogram"
      ? parallelogramPointsFromArea(area)
      : area.points || getAreaOutlinePoints(area);
  return nearestPolylineBoundaryInfo(point, outline, area.kind !== "line", isLinearStructureType(region?.type) ? LINEAR_STRUCTURE_WIDTH / 2 : 0);
}

function nearestStrokeBoundaryInfo(point, stroke) {
  const points = stroke.points || [];
  if (!points.length) return null;
  return nearestPolylineBoundaryInfo(point, points, false, Math.max(0.5, (Number(stroke.size) || STRUCTURE_BRUSH_SIZE) / 2));
}

function nearestBoundsBoundaryInfo(point, bounds) {
  const insideX = point.x >= bounds.left && point.x <= bounds.right;
  const insideY = point.y >= bounds.top && point.y <= bounds.bottom;
  if (insideX && insideY) {
    const distances = [
      { distance: point.x - bounds.left, normal: { x: -1, y: 0 } },
      { distance: bounds.right - point.x, normal: { x: 1, y: 0 } },
      { distance: point.y - bounds.top, normal: { x: 0, y: -1 } },
      { distance: bounds.bottom - point.y, normal: { x: 0, y: 1 } }
    ];
    return distances.sort((a, b) => a.distance - b.distance)[0] || null;
  }
  const nearest = {
    x: clamp(point.x, bounds.left, bounds.right),
    y: clamp(point.y, bounds.top, bounds.bottom)
  };
  const distanceValue = distance(point, nearest);
  return {
    distance: distanceValue,
    normal: normalizeVector({ x: point.x - nearest.x, y: point.y - nearest.y }) || { x: 0, y: -1 }
  };
}

function nearestPolylineBoundaryInfo(point, points, closed, thickness = 0) {
  if (!points?.length) return null;
  if (points.length === 1) {
    const distanceValue = Math.max(0, distance(point, points[0]) - thickness);
    return {
      distance: distanceValue,
      normal: normalizeVector({ x: point.x - points[0].x, y: point.y - points[0].y }) || { x: 0, y: -1 }
    };
  }
  let best = null;
  const count = closed && points.length > 2 ? points.length : points.length - 1;
  for (let index = 0; index < count; index++) {
    const start = points[index];
    const end = points[(index + 1) % points.length];
    const nearest = nearestPointOnSegment(point, start, end);
    const distanceValue = Math.max(0, distance(point, nearest) - thickness);
    if (!best || distanceValue < best.distance) {
      best = {
        distance: distanceValue,
        normal: normalizeVector({ x: point.x - nearest.x, y: point.y - nearest.y })
          || normalizeVector({ x: -(end.y - start.y), y: end.x - start.x })
          || { x: 0, y: -1 }
      };
    }
  }
  return best;
}

function nearestPointOnSegment(point, start, end) {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const lengthSq = dx * dx + dy * dy;
  if (!lengthSq) return { x: start.x, y: start.y };
  const t = clamp(((point.x - start.x) * dx + (point.y - start.y) * dy) / lengthSq, 0, 1);
  return { x: start.x + dx * t, y: start.y + dy * t };
}

function getPlayerCollisionRadius(point = state.gameData.player) {
  const visualRadius = Number(point?.radius || state.gameData.player.radius) || DEFAULT_PLAYER_RADIUS;
  return Math.max(4, visualRadius * PLAYER_COLLISION_RADIUS_FACTOR);
}

function getPriorityPathTouchRadius(point = state.gameData.player) {
  const visualRadius = Number(point?.radius || state.gameData.player.radius) || DEFAULT_PLAYER_RADIUS;
  return Math.max(getPlayerCollisionRadius(point), visualRadius * PRIORITY_PATH_TOUCH_RADIUS_FACTOR);
}

function isTransparentMapPixel(point) {
  if (!state.mapImage || !state.mapNaturalSize.width || !state.mapNaturalSize.height) return true;
  const x = clamp(Math.floor(point.x), 0, state.mapNaturalSize.width - 1);
  const y = clamp(Math.floor(point.y), 0, state.mapNaturalSize.height - 1);
  const key = `${x},${y}`;
  if (state.mapAlphaPixelCache.has(key)) return state.mapAlphaPixelCache.get(key);
  const transparent = sampleMapAlphaMask(x, y) ?? sampleMapAlphaPixelSlow(x, y);
  state.mapAlphaPixelCache.set(key, transparent);
  return transparent;
}

function sampleMapAlphaMask(x, y) {
  const mask = state.mapAlphaMask;
  if (!mask?.data?.length || !mask.width || !mask.height || !mask.scale) return null;
  const sampleX = clamp(Math.floor(x * mask.scale), 0, mask.width - 1);
  const sampleY = clamp(Math.floor(y * mask.scale), 0, mask.height - 1);
  const transparent = mask.data[sampleY * mask.width + sampleX] < 16;
  for (let offsetY = -1; offsetY <= 1; offsetY += 1) {
    for (let offsetX = -1; offsetX <= 1; offsetX += 1) {
      const nx = sampleX + offsetX;
      const ny = sampleY + offsetY;
      if (nx < 0 || ny < 0 || nx >= mask.width || ny >= mask.height) continue;
      if ((mask.data[ny * mask.width + nx] < 16) !== transparent) return null;
    }
  }
  return transparent;
}

function sampleMapAlphaPixelSlow(x, y) {
  const canvas = state.mapAlphaSampleCanvas || (state.mapAlphaSampleCanvas = document.createElement("canvas"));
  canvas.width = 1;
  canvas.height = 1;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return false;
  ctx.clearRect(0, 0, 1, 1);
  ctx.drawImage(state.mapImage, x, y, 1, 1, 0, 0, 1, 1);
  return ctx.getImageData(0, 0, 1, 1).data[3] < 16;
}

function findNearbyWalkablePoint(origin, options = {}) {
  const accepts = options.requireFreedom ? canPlayerMoveFreelyFrom : canPlayerMoveTo;
  if (accepts(origin)) return { x: origin.x, y: origin.y };
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
      if (accepts(point)) return point;
    }
  }
  return null;
}

function canPlayerMoveFreelyFrom(point) {
  if (!canPlayerMoveTo(point)) return false;
  const testDistance = Math.max(18, getPlayerCollisionRadius(point) * 2.5);
  const directions = [
    { x: 1, y: 0 },
    { x: -1, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: -1 },
    normalizeVector({ x: 1, y: 1 }),
    normalizeVector({ x: -1, y: 1 }),
    normalizeVector({ x: 1, y: -1 }),
    normalizeVector({ x: -1, y: -1 })
  ].filter(Boolean);
  let open = 0;
  for (const direction of directions) {
    const target = clampMoveTarget(point, { x: direction.x * testDistance, y: direction.y * testDistance });
    if (canPlayerMoveTo(target)) open += 1;
  }
  return open >= 3;
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

function loadImageElement(src, options = {}) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.decoding = "async";
    image.onload = () => {
      if (options.revoke) URL.revokeObjectURL(src);
      resolve(image);
    };
    image.onerror = () => {
      if (options.revoke) URL.revokeObjectURL(src);
      reject(new Error(options.message || "地图图片加载失败"));
    };
    image.src = src;
  });
}

function clearMapRenderCache() {
  state.interactionPreviewCanvas.width = 1;
  state.interactionPreviewCanvas.height = 1;
  state.mapAlphaSampleCanvas.width = 1;
  state.mapAlphaSampleCanvas.height = 1;
  state.mapAlphaPixelCache.clear();
  state.mapAlphaMask = null;
  clearStructureBoundsCache();
  state.interactionPreviewScale = 1;
  state.mapRenderWarm = false;
  clearExplorationCache();
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
  clearStructureBoundsCache();
  clearExplorationCache();
}

function clearStructureBoundsCache() {
  state.structureBoundsCache = new WeakMap();
  state.structureSpatialIndexCache = new WeakMap();
}

function markGameDirty(options = {}) {
  state.gameDirty = true;
  if (!options.keepExplorationCache) clearExplorationCache();
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

function updateNearbyGameContextIfNeeded(options = {}) {
  if (options.force || shouldRefreshNearbyGameContext()) {
    const changed = updateNearbyGameContext();
    state.nearbyContextLastPoint = { x: state.gameData.player.x, y: state.gameData.player.y };
    return changed;
  }
  return false;
}

function shouldRefreshNearbyGameContext() {
  if (state.gameData.location.kind === "building") return true;
  const player = state.gameData.player;
  if (!state.nearbyContextLastPoint) return true;
  return distance(player, state.nearbyContextLastPoint) >= NEARBY_CONTEXT_REFRESH_DISTANCE;
}

function updateNearbyGameContext() {
  const previousKey = getNearbyContextKey();
  if (state.gameData.location.kind === "building") {
    const buildingId = state.gameData.location.buildingId || state.gameData.selectedBuildingId || "";
    state.currentNearbyInteractionTargets = [];
    state.currentNearbyPhotoSpotId = "";
    state.currentNearbyBuildingIds = [];
    state.selectedNearbyInteractionKey = "";
    state.defaultPhotoSpotInteractionKey = "";
    state.gameData.selectedPhotoSpotId = "";
    state.gameData.selectedSpotPhotoId = "";
    state.selectedSpotPhotoForEditId = "";
    state.selectedBuildingPhotoForEditId = "";
    state.gameData.selectedBuildingId = buildingId;
    if (buildingId) getOrCreateBuildingMemory(buildingId);
    return previousKey !== getNearbyContextKey();
  }
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
    state.gameData.selectedBuildingPhotoId = "";
    state.selectedBuildingPhotoForEditId = "";
    const selectedPhotoId = selected.spot?.photos?.[0]?.id || "";
    if (selectedPhotoId && !selected.spot.photos.some((photo) => photo.id === state.gameData.selectedSpotPhotoId)) {
      state.gameData.selectedSpotPhotoId = selectedPhotoId;
    }
    if (getSelectedSpotPhotoForEditId(selected.spot) !== state.selectedSpotPhotoForEditId) {
      state.selectedSpotPhotoForEditId = "";
    }
  } else {
    state.selectedSpotPhotoForEditId = "";
    if (selected?.kind === "structure") {
      const building = getOrCreateBuildingMemory(selected.id);
      const selectedPhotoId = getSelectedBuildingPhotoId(building);
      state.gameData.selectedBuildingPhotoId = selectedPhotoId;
      if (getSelectedBuildingPhotoForEditId(building) !== state.selectedBuildingPhotoForEditId) {
        state.selectedBuildingPhotoForEditId = "";
      }
    } else {
      state.gameData.selectedBuildingPhotoId = "";
      state.selectedBuildingPhotoForEditId = "";
    }
  }
  if (selected?.kind === "structure") getOrCreateBuildingMemory(selected.id);
  return previousKey !== getNearbyContextKey();
}

function getNearbyContextKey() {
  return [
    state.gameData.location.kind,
    state.gameData.location.buildingId || "",
    state.currentNearbyPhotoSpotId || "",
    state.currentNearbyInteractionTargets.map((item) => item.key).join(","),
    state.currentNearbyBuildingIds.join(","),
    state.selectedNearbyInteractionKey || "",
    state.gameData.selectedPhotoSpotId || "",
    state.gameData.selectedBuildingId || ""
  ].join("|");
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
  let best = null;
  for (const spot of state.gameData.photoSpots) {
    const d = distance(point, spot);
    const spotRadius = Number(spot.radius) || playerRadius;
    const maxDistance = getPhotoSpotEntrance(spot)
      ? playerRadius + spotRadius
      : Math.max(1, playerRadius * PHOTO_SPOT_INTERACT_RADIUS_FACTOR);
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
  const entrance = getPhotoSpotEntrance(spot);
  if (entrance && (entrance.autoName !== false || !spot.name?.trim())) return getEntranceSpotAutoName(spot);
  if (spot.name?.trim()) return spot.name.trim();
  const index = state.gameData.photoSpots.findIndex((item) => item.id === spot.id);
  return `${PHOTO_SPOT_NAME_PREFIX}${String(index >= 0 ? index + 1 : 1).padStart(2, "0")}`;
}

function getPhotoSpotEntrance(spot) {
  const entrance = spot?.entranceFor;
  if (!entrance || typeof entrance !== "object") return null;
  return typeof entrance.buildingId === "string" && entrance.buildingId ? entrance : null;
}

function getEntranceBuildingForSpot(spot) {
  const entrance = getPhotoSpotEntrance(spot);
  if (!entrance) return null;
  const region = getStructureRegionById(entrance.buildingId);
  const building = region ? getOrCreateBuildingMemory(region.id) : null;
  return region && building ? { region, building, entrance } : null;
}

function getBuildingEntranceSpots(regionId) {
  if (!regionId) return [];
  const order = new Map((state.gameData.buildings[regionId]?.entrances || []).map((entry, index) => [entry.photoSpotId, index]));
  const spots = state.gameData.photoSpots
    .filter((spot) => getPhotoSpotEntrance(spot)?.buildingId === regionId)
    .sort((a, b) => {
      const ai = order.has(a.id) ? order.get(a.id) : Number.MAX_SAFE_INTEGER;
      const bi = order.has(b.id) ? order.get(b.id) : Number.MAX_SAFE_INTEGER;
      if (ai !== bi) return ai - bi;
      return state.gameData.photoSpots.indexOf(a) - state.gameData.photoSpots.indexOf(b);
    });
  return spots.map((spot, index) => ({ spot, index }));
}

function getEntranceSpotAutoName(spot) {
  const entrance = getPhotoSpotEntrance(spot);
  if (!entrance) return "";
  const region = getStructureRegionById(entrance.buildingId);
  const building = region ? getOrCreateBuildingMemory(region.id) : null;
  const index = getBuildingEntranceSpots(entrance.buildingId).findIndex((item) => item.spot.id === spot.id);
  return `${getBuildingDisplayName(region, building)}入口${Math.max(1, index + 1)}`;
}

function getPhotoSpotDateValue(spot) {
  return getIsoDateInputValue(spot?.capturedAt || spot?.createdAt || "");
}

function getSpotPanelDateValue(spot) {
  const selectedPhoto = getSelectedSpotPhotoForEdit(spot);
  return selectedPhoto
    ? getIsoDateInputValue(selectedPhoto.capturedAt || selectedPhoto.createdAt || "")
    : getPhotoSpotDateValue(spot);
}

function getSelectedBuildingPhotoForEdit(building) {
  const selectedId = getSelectedBuildingPhotoForEditId(building);
  return selectedId ? building.photos.find((photo) => photo.id === selectedId) || null : null;
}

function getBuildingPanelDateValue(building) {
  const selectedPhoto = getSelectedBuildingPhotoForEdit(building);
  return selectedPhoto
    ? getIsoDateInputValue(selectedPhoto.capturedAt || selectedPhoto.createdAt || "")
    : getIsoDateInputValue(building?.capturedAt || building?.createdAt || "");
}

function getPhotoDateLabel(photo) {
  const value = getIsoDateInputValue(photo?.capturedAt || photo?.createdAt || "");
  return value ? value.replaceAll("-", ".") : "";
}

function getIsoDateInputValue(raw) {
  if (!raw) return "";
  const datePrefix = String(raw).match(/^(\d{4}-\d{2}-\d{2})/);
  if (datePrefix) return datePrefix[1];
  const date = new Date(raw);
  if (!Number.isFinite(date.getTime())) return "";
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function dateInputValueToIso(dateValue, fallback = "") {
  if (!dateValue) return fallback || new Date().toISOString();
  return `${dateValue}T12:00:00.000Z`;
}

function getNearbyStructureTargets(point) {
  const targets = [];
  for (const region of getStructureRegionCandidatesNear(point, 128)) {
    if (region.visible === false || !isInteractiveStructureType(region?.type || "custom")) continue;
    const radius = getInteractionRadiusForStructure(region);
    const bounds = getStructureRegionBounds(region);
    if (!bounds || distanceToBounds(point, bounds) > radius) continue;
    const areas = getRegionAreas(region);
    const preciseDistance = distanceToRegion(point, areas, region);
    if (preciseDistance > radius) continue;
    targets.push({
      id: region.id,
      region,
      bounds,
      distance: preciseDistance,
      label: getStructureInteractionLabel(region),
      kind: "structure",
      key: `structure:${region.id}`
    });
  }
  return targets.sort((a, b) => a.distance - b.distance);
}

function getClickedStructureTarget(point) {
  let best = null;
  for (const region of getStructureRegionCandidatesNear(point, STRUCTURE_CLICK_HIT_DISTANCE)) {
    if (region.visible === false || !isInteractiveStructureType(region?.type || "custom")) continue;
    const bounds = getStructureRegionBounds(region);
    if (!bounds || distanceToBounds(point, bounds) > STRUCTURE_CLICK_HIT_DISTANCE) continue;
    const areas = getRegionAreas(region);
    const insideBaseArea = areas.some((area) => isPointInStructureArea(point, area, region));
    const insideErasedArea = insideBaseArea && getRegionEraseAreas(region).some((area) => isPointInArea(point, area));
    if (insideErasedArea) continue;
    const distanceToHit = insideBaseArea ? 0 : distanceToRegion(point, areas, region);
    if (distanceToHit > STRUCTURE_CLICK_HIT_DISTANCE) continue;
    const target = {
      id: region.id,
      region,
      bounds,
      distance: distanceToHit,
      label: getStructureInteractionLabel(region),
      kind: "structure",
      key: `structure:${region.id}`
    };
    if (!best || target.distance < best.distance) best = target;
  }
  return best;
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

function getVenueRule(room = null, building = null) {
  const buildingRule = getBuildingRule(building);
  const venueType = room?.type || "";
  return {
    personLabel: VENUE_TYPE_RULES[venueType]?.personLabel || "老师/同学",
    itemLabel: VENUE_TYPE_RULES[venueType]?.itemLabel || "物品",
    venueLabel: venueType || "场地",
    buildingLabel: buildingRule.label
  };
}

function getRoomDisplayName(room) {
  return room?.name || room?.type || "场地";
}

function getInteriorPanelTitle(building, room) {
  return room ? getRoomDisplayName(room) : "建筑内部";
}

function getInteriorPanelSubtitle(building, room) {
  const buildingName = building?.customName || "当前建筑";
  return room?.type ? `${buildingName} / ${room.type}` : buildingName;
}

function getPersonDisplayName(person) {
  return person?.name || person?.type || "未命名";
}

function getPersonMarkerLabel(person, room = null) {
  const relation = person?.type || (room?.type === "寝室" && room.relation ? room.relation : "人物");
  const name = getPersonDisplayName(person);
  return relation && name && name !== relation ? `${relation}${name}` : name || relation || "人物";
}

function getInteriorPlayer(building = getSelectedBuildingMemory()) {
  if (!building) return { x: INTERIOR_MAP_WIDTH / 2, y: INTERIOR_MAP_HEIGHT / 2 };
  building.interiorPlayer = normalizeInteriorPlayer(building.interiorPlayer);
  return building.interiorPlayer;
}

function getInteriorGridDimensions(count, aspect = state.canvasSize.width / Math.max(1, state.canvasSize.height)) {
  if (count <= 1) return { cols: 1, rows: 1 };
  if (count === 2) return aspect >= 1 ? { cols: 2, rows: 1 } : { cols: 1, rows: 2 };
  if (count <= 4) return { cols: 2, rows: 2 };
  const cols = Math.max(1, Math.ceil(Math.sqrt(count * Math.max(0.7, aspect))));
  const rows = Math.max(1, Math.ceil(count / cols));
  return { cols, rows };
}

function getInteriorRoomLayout(building = getSelectedBuildingMemory()) {
  const rooms = building?.rooms || [];
  const count = Math.max(1, rooms.length || 1);
  const { cols, rows } = getInteriorGridDimensions(count);
  const gap = rooms.length > 1 ? 10 : 0;
  const cellW = (INTERIOR_MAP_WIDTH - gap * (cols - 1)) / cols;
  const cellH = (INTERIOR_MAP_HEIGHT - gap * (rows - 1)) / rows;
  const cells = rooms.map((room, index) => {
    const col = index % cols;
    const row = Math.floor(index / cols);
    return {
      room,
      index,
      col,
      row,
      x: col * (cellW + gap),
      y: row * (cellH + gap),
      width: cellW,
      height: cellH
    };
  });
  return { cols, rows, gap, cellW, cellH, cells, width: INTERIOR_MAP_WIDTH, height: INTERIOR_MAP_HEIGHT };
}

function getInteriorCellForPoint(point, building = getSelectedBuildingMemory()) {
  const layout = getInteriorRoomLayout(building);
  for (const cell of layout.cells) {
    if (
      point.x >= cell.x
      && point.x <= cell.x + cell.width
      && point.y >= cell.y
      && point.y <= cell.y + cell.height
    ) {
      return cell;
    }
  }
  if (!layout.cells.length) return null;
  let best = layout.cells[0];
  let bestDistance = Infinity;
  for (const cell of layout.cells) {
    const dx = point.x < cell.x ? cell.x - point.x : point.x > cell.x + cell.width ? point.x - (cell.x + cell.width) : 0;
    const dy = point.y < cell.y ? cell.y - point.y : point.y > cell.y + cell.height ? point.y - (cell.y + cell.height) : 0;
    const d = Math.hypot(dx, dy);
    if (d < bestDistance) {
      best = cell;
      bestDistance = d;
    }
  }
  return best;
}

function syncSelectedRoomFromInteriorPlayer(options = {}) {
  const building = getSelectedBuildingMemory();
  if (!building?.rooms?.length) return false;
  const player = getInteriorPlayer(building);
  const cell = getInteriorCellForPoint(player, building);
  const roomId = cell?.room?.id || "";
  if (!roomId || roomId === state.gameData.selectedRoomId) return false;
  state.gameData.selectedRoomId = roomId;
  state.gameData.location.roomId = roomId;
  state.gameData.selectedItemId = "";
  state.gameData.selectedPersonId = "";
  if (!options.silent) renderGamePanel({ force: true });
  return true;
}

function moveInteriorPlayerToRoom(roomId) {
  const building = getSelectedBuildingMemory();
  if (!building?.rooms?.length) return;
  const cell = getInteriorRoomLayout(building).cells.find((entry) => entry.room.id === roomId);
  if (!cell) return;
  const player = getInteriorPlayer(building);
  player.x = cell.x + cell.width / 2;
  player.y = cell.y + cell.height / 2;
  state.gameData.selectedRoomId = roomId;
  state.gameData.location.roomId = roomId;
  state.gameData.selectedItemId = "";
  state.gameData.selectedPersonId = "";
  clearMoveTarget();
  markGameDirty({ defer: true });
  renderGamePanel({ force: true });
  queueDraw();
}

function getInteriorCanvasRect() {
  const margin = 18;
  const titleSpace = 0;
  const availableW = Math.max(1, state.canvasSize.width - margin * 2);
  const availableH = Math.max(1, state.canvasSize.height - margin * 2 - titleSpace);
  const scale = Math.min(availableW / INTERIOR_MAP_WIDTH, availableH / INTERIOR_MAP_HEIGHT);
  const width = INTERIOR_MAP_WIDTH * scale;
  const height = INTERIOR_MAP_HEIGHT * scale;
  return {
    x: (state.canvasSize.width - width) / 2,
    y: (state.canvasSize.height - height) / 2,
    width,
    height,
    scale
  };
}

function interiorToScreen(point) {
  const rect = getInteriorCanvasRect();
  return {
    x: rect.x + point.x * rect.scale,
    y: rect.y + point.y * rect.scale
  };
}

function screenToInterior(screenX, screenY) {
  const rect = getInteriorCanvasRect();
  return clampInteriorPoint({
    x: (screenX - rect.x) / rect.scale,
    y: (screenY - rect.y) / rect.scale
  });
}

function clampInteriorPoint(point) {
  return {
    x: clamp(Number(point?.x) || 0, INTERIOR_MAP_PADDING, INTERIOR_MAP_WIDTH - INTERIOR_MAP_PADDING),
    y: clamp(Number(point?.y) || 0, INTERIOR_MAP_PADDING, INTERIOR_MAP_HEIGHT - INTERIOR_MAP_PADDING)
  };
}

function isDormRoom(room) {
  return room?.type === "寝室";
}

function isSelfPerson(person) {
  return person?.type === "自己";
}

function getSelfPersonInRoom(room) {
  return (room?.people || []).find(isSelfPerson) || null;
}

function getBuildingPeople(building) {
  const entries = [];
  for (const room of building?.rooms || []) {
    for (const person of room.people || []) {
      entries.push({ person, room });
    }
  }
  return entries;
}

function getItemDisplayName(item, fallback = "物品") {
  return item?.name || item?.type || fallback;
}

function renderOptions(values, selectedValue) {
  return values.map((value) => `<option value="${escapeAttr(value)}" ${value === selectedValue ? "selected" : ""}>${escapeHtml(value)}</option>`).join("");
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

function getFirstPhoto(entity) {
  return Array.isArray(entity?.photos) && entity.photos.length ? entity.photos[0] : null;
}

function getActivePhoto(entity) {
  if (!Array.isArray(entity?.photos) || !entity.photos.length) return null;
  const index = clampInt(entity.activePhotoIndex || 0, 0, entity.photos.length - 1);
  return entity.photos[index] || entity.photos[0] || null;
}

function getRepresentativePhotoUrl(entity) {
  return getPhotoUrl(getFirstPhoto(entity));
}

function getRepresentativePhotoImage(entity) {
  return getCachedPhotoImage(getFirstPhoto(entity));
}

function getCachedPhotoImage(photo) {
  if (!photo?.resource) return null;
  const url = getPhotoUrl(photo);
  if (!url) return null;
  const key = photo.id || url;
  const cached = state.photoImageCache.get(key);
  if (cached?.image) return cached.image;
  const image = new Image();
  state.photoImageCache.set(key, { image, loaded: false });
  image.onload = () => {
    const entry = state.photoImageCache.get(key);
    if (entry) entry.loaded = true;
    queueDraw();
  };
  image.onerror = () => {
    state.photoImageCache.delete(key);
  };
  image.src = url;
  return image;
}

function isPhotoImageReady(image) {
  return Boolean(image?.complete && image.naturalWidth > 0 && image.naturalHeight > 0);
}

function drawCoverImage(ctx, image, x, y, width, height) {
  if (!isPhotoImageReady(image) || width <= 0 || height <= 0) return false;
  const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
  const sourceWidth = width / scale;
  const sourceHeight = height / scale;
  const sourceX = (image.naturalWidth - sourceWidth) / 2;
  const sourceY = (image.naturalHeight - sourceHeight) / 2;
  ctx.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, x, y, width, height);
  return true;
}

function drawContainImage(ctx, image, x, y, width, height) {
  if (!isPhotoImageReady(image) || width <= 0 || height <= 0) return false;
  const scale = Math.min(width / image.naturalWidth, height / image.naturalHeight);
  const drawWidth = Math.max(1, image.naturalWidth * scale);
  const drawHeight = Math.max(1, image.naturalHeight * scale);
  const drawX = x + (width - drawWidth) / 2;
  const drawY = y + (height - drawHeight) / 2;
  ctx.drawImage(image, drawX, drawY, drawWidth, drawHeight);
  return true;
}

function getMapMarkerThumbnailSize(image, options = {}) {
  const maxWidth = options.maxThumbWidth || 148;
  const maxHeight = options.maxThumbHeight || 104;
  const minWidth = options.minThumbWidth || 48;
  const minHeight = options.minThumbHeight || 36;
  const fallbackRatio = options.fallbackRatio || 4 / 3;
  const naturalWidth = isPhotoImageReady(image) ? image.naturalWidth : fallbackRatio;
  const naturalHeight = isPhotoImageReady(image) ? image.naturalHeight : 1;
  const scale = Math.min(maxWidth / naturalWidth, maxHeight / naturalHeight);
  return {
    width: Math.max(minWidth, Math.round(naturalWidth * scale)),
    height: Math.max(minHeight, Math.round(naturalHeight * scale))
  };
}

function hasNearbyBlockingStructure(point) {
  const radius = getPlayerCollisionRadius(point);
  const visibleObjects = getVisibleStructureObjectIds();
  for (const region of getStructureRegionCandidatesNear(point, radius)) {
    if (region.visible === false || getStructureTypeWalkable(region.type, region.walkable)) continue;
    const bounds = getStructureRegionBounds(region);
    if (bounds && distanceToBounds(point, bounds) <= radius) return true;
  }
  for (const stroke of getJudgementStrokeCandidatesNear(point, radius)) {
    if (!stroke.objectId || !visibleObjects.has(stroke.objectId)) continue;
    if (getStructureTypeWalkable(stroke.type, stroke.walkable)) continue;
    const bounds = getJudgementStrokeBounds(stroke);
    if (bounds && distanceToBounds(point, bounds) <= radius) return true;
  }
  return false;
}

function getStructureRegionCandidatesNear(point, radius = 0) {
  return getStructureSpatialCandidates("regions", point, radius);
}

function getJudgementStrokeCandidatesNear(point, radius = 0) {
  return getStructureSpatialCandidates("strokes", point, radius);
}

function getStructureSpatialCandidates(kind, point, radius = 0) {
  const editData = getSelectedEditData();
  const index = getStructureSpatialIndex(editData);
  const cellSize = index.cellSize;
  const minCol = Math.floor((point.x - radius) / cellSize);
  const maxCol = Math.floor((point.x + radius) / cellSize);
  const minRow = Math.floor((point.y - radius) / cellSize);
  const maxRow = Math.floor((point.y + radius) / cellSize);
  const seen = new Set();
  const items = [];
  for (let row = minRow; row <= maxRow; row++) {
    for (let col = minCol; col <= maxCol; col++) {
      const bucket = index.cells.get(`${col},${row}`);
      if (!bucket) continue;
      for (const item of bucket[kind]) {
        const id = item.id || item.objectId || `${kind}:${items.length}`;
        if (seen.has(id)) continue;
        seen.add(id);
        items.push(item);
      }
    }
  }
  return items;
}

function getStructureSpatialIndex(editData = getSelectedEditData()) {
  if (state.structureSpatialIndexCache.has(editData)) {
    return state.structureSpatialIndexCache.get(editData);
  }
  const cellSize = Math.max(96, DEFAULT_PLAYER_RADIUS * 6);
  const cells = new Map();
  const addItem = (kind, item, bounds) => {
    if (!bounds) return;
    const minCol = Math.floor(bounds.left / cellSize);
    const maxCol = Math.floor(bounds.right / cellSize);
    const minRow = Math.floor(bounds.top / cellSize);
    const maxRow = Math.floor(bounds.bottom / cellSize);
    for (let row = minRow; row <= maxRow; row++) {
      for (let col = minCol; col <= maxCol; col++) {
        const key = `${col},${row}`;
        let bucket = cells.get(key);
        if (!bucket) {
          bucket = { regions: [], strokes: [] };
          cells.set(key, bucket);
        }
        bucket[kind].push(item);
      }
    }
  };
  for (const region of editData.structureRegions || []) {
    addItem("regions", region, getStructureRegionBounds(region));
  }
  for (const stroke of editData.judgementStrokes || []) {
    addItem("strokes", stroke, getJudgementStrokeBounds(stroke));
  }
  const index = { cellSize, cells };
  state.structureSpatialIndexCache.set(editData, index);
  return index;
}

function getStructureRegionBounds(region) {
  if (region && state.structureBoundsCache.has(region)) {
    return state.structureBoundsCache.get(region);
  }
  const areas = getRegionAreas(region);
  let bounds = null;
  for (const area of areas) {
    bounds = mergeBounds(bounds, getAreaBounds(area));
  }
  const result = bounds || getRegionLabelBounds(areas);
  if (region) state.structureBoundsCache.set(region, result);
  return result;
}

function getJudgementStrokeBounds(stroke) {
  const points = stroke?.points || [];
  const bounds = polygonBounds(points);
  if (!bounds) return null;
  const padding = Math.max(1, (Number(stroke.size) || STRUCTURE_BRUSH_SIZE) / 2);
  return {
    left: bounds.left - padding,
    top: bounds.top - padding,
    right: bounds.right + padding,
    bottom: bounds.bottom + padding
  };
}

function mergeBounds(a, b) {
  if (!a) return b || null;
  if (!b) return a;
  return {
    left: Math.min(a.left, b.left),
    top: Math.min(a.top, b.top),
    right: Math.max(a.right, b.right),
    bottom: Math.max(a.bottom, b.bottom)
  };
}

function getMapMarkerPhotoEntries(entity, options = {}) {
  const photos = Array.isArray(entity?.photos) ? entity.photos : [];
  return photos.map((photo, index) => ({
    photo,
    label: options.label || (index === 0 ? "" : String(index + 1)),
    source: options.source || "photo"
  }));
}

function getBuildingMapPhotoEntries(building) {
  if (!building) return [];
  for (const room of building.rooms || []) {
    const photo = getFirstPhoto(room);
    if (photo) return [{
      photo,
      label: getRoomDisplayName(room),
      source: "room"
    }];
  }
  const buildingPhoto = getFirstPhoto(building);
  return buildingPhoto ? [{
    photo: buildingPhoto,
    label: "楼",
    source: "building"
  }] : [];
}

function getMapMarkerGalleryLayout(entries, options = {}) {
  const count = entries.length;
  if (!count) return { width: 0, height: 0, items: [] };
  const scale = getMapMarkerPhotoScale(options);
  const gap = Math.max(1, Math.round((options.gap || 5) * scale));
  const hero = Boolean(options.hero) && count > 1;
  const columns = options.columns || Math.min(count, count >= 4 ? 2 : count);
  const itemMaxWidth = scaleMapMarkerPhotoSize(options.itemMaxWidth || (count === 1 ? 190 : count === 2 ? 138 : 118), scale);
  const itemMaxHeight = scaleMapMarkerPhotoSize(options.itemMaxHeight || (count === 1 ? 140 : count === 2 ? 104 : 92), scale);
  const items = entries.map((entry) => {
    const image = getCachedPhotoImage(entry.photo);
    return {
      ...entry,
      image,
      size: getMapMarkerThumbnailSize(image, {
        maxThumbWidth: itemMaxWidth,
        maxThumbHeight: itemMaxHeight,
        minThumbWidth: scaleMapMarkerPhotoSize(48, scale),
        minThumbHeight: scaleMapMarkerPhotoSize(36, scale)
      })
    };
  });
  if (hero) {
    const heroImage = items[0].image;
    const heroSize = getMapMarkerThumbnailSize(heroImage, {
      maxThumbWidth: scaleMapMarkerPhotoSize(options.heroMaxWidth || 260, scale),
      maxThumbHeight: scaleMapMarkerPhotoSize(options.heroMaxHeight || 170, scale),
      minThumbWidth: scaleMapMarkerPhotoSize(48, scale),
      minThumbHeight: scaleMapMarkerPhotoSize(36, scale)
    });
    const restMaxWidth = scaleMapMarkerPhotoSize(options.restMaxWidth || 82, scale);
    const restMaxHeight = scaleMapMarkerPhotoSize(options.restMaxHeight || 64, scale);
    const restColumns = Math.min(options.restColumns || 3, items.length - 1);
    items[0].size = heroSize;
    for (let index = 1; index < items.length; index++) {
      items[index].size = getMapMarkerThumbnailSize(items[index].image, {
        maxThumbWidth: restMaxWidth,
        maxThumbHeight: restMaxHeight,
        minThumbWidth: scaleMapMarkerPhotoSize(48, scale),
        minThumbHeight: scaleMapMarkerPhotoSize(36, scale)
      });
    }
    const rows = [[items[0]]];
    for (let index = 1; index < items.length; index += restColumns) {
      rows.push(items.slice(index, index + restColumns));
    }
    const rowWidths = rows.map((row) => row.reduce((sum, item) => sum + item.size.width, 0) + gap * Math.max(0, row.length - 1));
    const rowHeights = rows.map((row) => Math.max(...row.map((item) => item.size.height)));
    return {
      width: Math.max(...rowWidths),
      height: rowHeights.reduce((sum, height) => sum + height, 0) + gap * Math.max(0, rows.length - 1),
      gap,
      rows
    };
  }
  const rows = [];
  for (let index = 0; index < items.length; index += columns) {
    const rowItems = items.slice(index, index + columns);
    rows.push(rowItems);
  }
  const rowWidths = rows.map((row) => row.reduce((sum, item) => sum + item.size.width, 0) + gap * Math.max(0, row.length - 1));
  const rowHeights = rows.map((row) => Math.max(...row.map((item) => item.size.height)));
  return {
    width: Math.max(...rowWidths),
    height: rowHeights.reduce((sum, height) => sum + height, 0) + gap * Math.max(0, rows.length - 1),
    gap,
    rows
  };
}

function getMapMarkerPhotoScale(options = {}) {
  if (options.scalePhotos === false) return 1;
  return clamp(Number(state.view.scale) || 1, MAP_MARKER_PHOTO_MIN_SCALE, MAP_MARKER_PHOTO_MAX_SCALE);
}

function scaleMapMarkerPhotoSize(value, scale) {
  return Math.max(1, Math.round(Number(value || 1) * scale));
}

function drawMapMarkerGallery(ctx, layout, centerX, topY, options = {}) {
  if (!layout?.rows?.length) return;
  const selected = Boolean(options.selected);
  let y = topY;
  for (const row of layout.rows) {
    const rowWidth = row.reduce((sum, item) => sum + item.size.width, 0) + layout.gap * Math.max(0, row.length - 1);
    const rowHeight = Math.max(...row.map((item) => item.size.height));
    let x = centerX - rowWidth / 2;
    for (const item of row) {
      const drawY = y + (rowHeight - item.size.height) / 2;
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(x, drawY, item.size.width, item.size.height, 6);
      ctx.clip();
      ctx.fillStyle = "rgba(232, 225, 211, 0.92)";
      ctx.fillRect(x, drawY, item.size.width, item.size.height);
      drawContainImage(ctx, item.image, x, drawY, item.size.width, item.size.height);
      ctx.restore();
      ctx.strokeStyle = selected ? "rgba(255, 250, 240, 0.50)" : "rgba(31, 85, 78, 0.18)";
      ctx.beginPath();
      ctx.roundRect(x, drawY, item.size.width, item.size.height, 6);
      ctx.stroke();
      if (item.label && options.showLabels !== false) {
        ctx.save();
        ctx.fillStyle = "rgba(31, 85, 78, 0.82)";
        ctx.font = "800 9px Microsoft YaHei, sans-serif";
        ctx.textAlign = "left";
        ctx.textBaseline = "bottom";
        ctx.fillText(item.label, x + 4, drawY + item.size.height - 4, item.size.width - 8);
        ctx.restore();
      }
      x += item.size.width + layout.gap;
    }
    y += rowHeight + layout.gap;
  }
}

function getPhotoImageRatio(image, fallback = 1) {
  return isPhotoImageReady(image) ? image.naturalWidth / image.naturalHeight : fallback;
}

function clearExplorationCache() {
  state.explorationCache = null;
  state.explorationDirty = true;
}

function updateExplorationProgressUi() {
  if (!els.explorationProgress || els.explorationProgress.hidden) return;
  const progress = getExplorationProgress();
  const percentText = `${Math.round(progress.percent)}%`;
  els.explorationProgressText.textContent = percentText;
  els.explorationProgressFill.style.width = `${clamp(progress.percent, 0, 100).toFixed(1)}%`;
  els.explorationProgress.title = `探索 ${percentText}，已点亮 ${progress.litCells}/${progress.totalCells} 个区域`;
}

function getExplorationProgress() {
  const school = getSelectedSchool();
  if (!school || !state.mapImage || !state.mapNaturalSize.width || !state.mapNaturalSize.height) return createEmptyExplorationProgress();
  if (!state.explorationDirty && state.explorationCache?.progress) return state.explorationCache.progress;
  const editData = getSelectedEditData();
  const key = createExplorationCacheKey(school, editData, state.gameData);
  if (state.explorationCache?.key === key) {
    state.explorationDirty = false;
    return state.explorationCache.progress;
  }
  const progress = calculateExplorationProgress(editData, state.gameData);
  state.explorationCache = { key, progress };
  state.explorationDirty = false;
  return progress;
}

function getMemoryStructureIds(editData) {
  return (editData?.structureRegions || [])
    .filter((region) => region.visible !== false && isInteractiveStructureType(region.type || "custom"))
    .map((region) => region.id)
    .filter(Boolean);
}

function createEmptyExplorationProgress() {
  return {
    percent: 0,
    litCells: 0,
    totalCells: 0,
    gridSize: 0,
    columns: 0,
    rows: 0,
    cells: []
  };
}

function createExplorationCacheKey(school, editData, gameData) {
  const structures = (editData.structureRegions || [])
    .filter((region) => region.visible !== false && isInteractiveStructureType(region.type))
    .map((region) => `${region.id}:${region.type}:${region.visible !== false ? 1 : 0}:${getRegionAreaCount(region)}:${hasLitBuildingMemory(gameData.buildings?.[region.id]) ? 1 : 0}`)
    .join("|");
  const spots = (gameData.photoSpots || [])
    .map((spot) => `${Math.round(spot.x)},${Math.round(spot.y)}:${hasLitPhotoSpotMemory(spot) ? 1 : 0}`)
    .join("|");
  return [
    school.id,
    state.mapNaturalSize.width,
    state.mapNaturalSize.height,
    editData.cropPolygon?.length || 0,
    EXPLORATION_TRANSPARENT_SKIP_RATIO,
    structures,
    spots
  ].join(";");
}

function calculateExplorationProgress(editData, gameData) {
  const width = state.mapNaturalSize.width;
  const height = state.mapNaturalSize.height;
  const gridSize = getExplorationGridSize(width, height);
  const columns = Math.max(1, Math.ceil(width / gridSize));
  const rows = Math.max(1, Math.ceil(height / gridSize));
  const cells = Array.from({ length: columns * rows }, () => ({ valid: false, lit: false, hasBuilding: false }));
  const indexFor = (col, row) => row * columns + col;
  const validInteractiveRegions = (editData.structureRegions || [])
    .filter((region) => region.visible !== false && isInteractiveStructureType(region.type));
  const litRegions = validInteractiveRegions
    .filter((region) => hasLitBuildingMemory(gameData.buildings?.[region.id]));

  for (const region of validInteractiveRegions) {
    markRegionCells(region, gridSize, columns, rows, (index) => {
      cells[index].hasBuilding = true;
    });
  }

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      const index = indexFor(col, row);
      const bounds = getExplorationCellBounds(col, row, gridSize, width, height);
      if (explorationCellTransparentRatio(bounds) > EXPLORATION_TRANSPARENT_SKIP_RATIO) continue;
      cells[index].valid = true;
    }
  }

  for (const region of litRegions) {
    markRegionCells(region, gridSize, columns, rows, (index) => {
      if (cells[index].valid) cells[index].lit = true;
    });
  }

  for (const spot of gameData.photoSpots || []) {
    if (!hasLitPhotoSpotMemory(spot)) continue;
    const col = Math.floor(clamp(spot.x, 0, Math.max(0, width - 1)) / gridSize);
    const row = Math.floor(clamp(spot.y, 0, Math.max(0, height - 1)) / gridSize);
    const index = indexFor(clamp(col, 0, columns - 1), clamp(row, 0, rows - 1));
    if (cells[index].valid) cells[index].lit = true;
  }

  let totalCells = 0;
  let litCells = 0;
  for (const cell of cells) {
    if (!cell.valid) continue;
    totalCells += 1;
    if (cell.lit) litCells += 1;
  }
  return {
    percent: totalCells ? litCells / totalCells * 100 : 0,
    litCells,
    totalCells,
    gridSize,
    columns,
    rows,
    cells
  };
}

function getExplorationGridSize(width, height) {
  const base = Math.sqrt((width * height) / (EXPLORATION_TARGET_GRID_COUNT * EXPLORATION_TARGET_GRID_COUNT));
  const smallGridSize = clamp(Math.round(base / 10) * 10, EXPLORATION_MIN_GRID_SIZE, EXPLORATION_MAX_GRID_SIZE);
  return smallGridSize * 4;
}

function getExplorationCellBounds(col, row, gridSize, width, height) {
  return {
    left: col * gridSize,
    top: row * gridSize,
    right: Math.min(width, (col + 1) * gridSize),
    bottom: Math.min(height, (row + 1) * gridSize)
  };
}

function explorationCellTransparentRatio(bounds) {
  const maskRatio = explorationCellTransparentMaskRatio(bounds);
  if (maskRatio !== null) return maskRatio;
  const points = getExplorationCellSamplePoints(bounds);
  if (!points.length) return 1;
  const transparentCount = points.filter((point) => !isPointOnVisibleMap(point)).length;
  return transparentCount / points.length;
}

function explorationCellTransparentMaskRatio(bounds) {
  const mask = state.mapAlphaMask;
  if (!mask?.data?.length || !mask.width || !mask.height || !mask.scale) return null;
  const editData = getSelectedEditData();
  const cropPolygon = editData.cropPolygon?.length >= 3 ? editData.cropPolygon : null;
  const left = clamp(Math.floor(bounds.left * mask.scale), 0, mask.width - 1);
  const right = clamp(Math.ceil(bounds.right * mask.scale) - 1, 0, mask.width - 1);
  const top = clamp(Math.floor(bounds.top * mask.scale), 0, mask.height - 1);
  const bottom = clamp(Math.ceil(bounds.bottom * mask.scale) - 1, 0, mask.height - 1);
  let total = 0;
  let transparent = 0;
  for (let y = top; y <= bottom; y += 1) {
    for (let x = left; x <= right; x += 1) {
      total += 1;
      let isTransparent = mask.data[y * mask.width + x] < 16;
      if (cropPolygon) {
        const point = {
          x: (x + 0.5) / mask.scale,
          y: (y + 0.5) / mask.scale
        };
        if (!pointInPolygon(point, cropPolygon)) isTransparent = true;
      }
      if (isTransparent) transparent += 1;
    }
  }
  return total ? transparent / total : 1;
}

function getExplorationCellSamplePoints(bounds) {
  const left = Math.max(0, bounds.left + 1);
  const top = Math.max(0, bounds.top + 1);
  const right = Math.max(left, bounds.right - 1);
  const bottom = Math.max(top, bounds.bottom - 1);
  const cx = (left + right) / 2;
  const cy = (top + bottom) / 2;
  return [
    { x: cx, y: cy },
    { x: left, y: top },
    { x: cx, y: top },
    { x: right, y: top },
    { x: left, y: cy },
    { x: right, y: cy },
    { x: left, y: bottom },
    { x: cx, y: bottom },
    { x: right, y: bottom }
  ];
}

function markRegionCells(region, gridSize, columns, rows, mark) {
  const bounds = getRegionLabelBounds(getRegionAreas(region));
  if (!bounds) return;
  const minCol = clamp(Math.floor(bounds.left / gridSize), 0, columns - 1);
  const maxCol = clamp(Math.floor(Math.max(bounds.left, bounds.right - 1) / gridSize), 0, columns - 1);
  const minRow = clamp(Math.floor(bounds.top / gridSize), 0, rows - 1);
  const maxRow = clamp(Math.floor(Math.max(bounds.top, bounds.bottom - 1) / gridSize), 0, rows - 1);
  for (let row = minRow; row <= maxRow; row++) {
    for (let col = minCol; col <= maxCol; col++) {
      const cellBounds = getExplorationCellBounds(col, row, gridSize, state.mapNaturalSize.width, state.mapNaturalSize.height);
      if (!regionIntersectsExplorationCell(region, cellBounds)) continue;
      mark(row * columns + col);
    }
  }
}

function regionIntersectsExplorationCell(region, bounds) {
  const points = getExplorationCellSamplePoints(bounds);
  if (points.some((point) => isPointInRegion(point, region))) return true;
  const center = { x: (bounds.left + bounds.right) / 2, y: (bounds.top + bounds.bottom) / 2 };
  if (distanceToRegion(center, getRegionAreas(region), region) <= Math.hypot(bounds.right - bounds.left, bounds.bottom - bounds.top) / 2) return true;
  return getRegionAreas(region).some((area) => {
    const areaBounds = getAreaBounds(area);
    return areaBounds ? boundsOverlap(bounds, areaBounds) : false;
  });
}

function boundsOverlap(a, b) {
  return a.left <= b.right && a.right >= b.left && a.top <= b.bottom && a.bottom >= b.top;
}

function hasLitBuildingMemory(building) {
  if (!building) return false;
  if (building.photos?.length) return true;
  return (building.rooms || []).some((room) => {
    if (room.photos?.length) return true;
    const hasItemPhoto = (room.items || []).some((item) => item.photos?.length);
    const hasPersonPhoto = (room.people || []).some((person) => Boolean(person.photo || person.portrait));
    return hasItemPhoto || hasPersonPhoto;
  });
}

function hasLitPhotoSpotMemory(spot) {
  return Boolean(spot?.photos?.length);
}

function showMapAnnotations() {
  const settings = state.gameData.settings || {};
  return settings.showInteractionMarkers !== false
    && settings.showPhotoMarkers !== false
    && settings.showPeopleMarkers !== false;
}

function setMapAnnotationsVisible(visible) {
  const value = Boolean(visible);
  state.gameData.settings.showPhotoMarkers = value;
  state.gameData.settings.showInteractionMarkers = value;
  state.gameData.settings.showPeopleMarkers = value;
}

function renderGamePanel(options = {}) {
  const school = getSelectedSchool();
  const visible = Boolean(school && state.mapImage && !state.editorEnabled);
  const insideBuilding = state.gameData.location.kind === "building";
  els.gamePanel.hidden = !visible;
  els.mapToolbar.hidden = !visible || insideBuilding;
  els.mapActions.hidden = !visible || insideBuilding;
  els.zoomReadout.hidden = visible && insideBuilding;
  els.explorationProgress.hidden = !visible || insideBuilding;
  updateExplorationProgressUi();
  els.mapAnnotationToggle.checked = showMapAnnotations();
  els.mapExplorationGridToggle.checked = state.gameData.settings.showExplorationGrid === true;
  if (!visible) return;
  els.gamePanel.classList.toggle("inside-building", insideBuilding);
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
    spotEditPhotoDate: spot ? getSelectedSpotPhotoForEdit(spot)?.capturedAt || "" : "",
    spotSelectedPhotoId: state.gameData.selectedSpotPhotoId || "",
    spotEditPhotoId: state.selectedSpotPhotoForEditId || "",
    spotEntrance: spot ? getPhotoSpotEntrance(spot)?.buildingId || "" : "",
    annotations: showMapAnnotations(),
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
  const selectedId = getSelectedSpotPhotoId(spot);
  const photoList = renderSpotPhotoListHtml(spot, selectedId);
  const spotTitle = getPhotoSpotDisplayName(spot);
  const entranceTarget = getEntranceBuildingForSpot(spot);
  const entranceActive = Boolean(entranceTarget && spot.photos.length);
  const canDeleteSpot = !spot.photos.length;
  const editSelectedId = getSelectedSpotPhotoForEditId(spot);
  const editIndex = getSpotPhotoIndexById(spot, editSelectedId);
  const moveBackDisabled = editIndex <= 0;
  const moveForwardDisabled = editIndex < 0 || editIndex >= spot.photos.length - 1;
  return `
    <section class="game-card photo-card${entranceTarget ? " entrance-card" : ""}">
      <div class="spot-fields">
        <input class="game-input" data-game-field="photoSpotName" type="text" value="${escapeAttr(spot.name || (entranceTarget ? spotTitle : ""))}" placeholder="${escapeAttr(spotTitle)}">
        <input class="game-input" data-game-field="photoSpotDate" type="date" value="${escapeAttr(getSpotPanelDateValue(spot))}">
      </div>
      <div class="game-actions dense photo-actions">
        ${entranceTarget ? `<button class="primary-button" type="button" data-game-action="enterFromPhotoSpot" ${entranceActive ? "" : "disabled"}>进入</button>` : ""}
        <button class="secondary-button" type="button" data-game-action="moveSpotPhotoBackward" ${moveBackDisabled ? "disabled" : ""}>前移</button>
        <button class="secondary-button" type="button" data-game-action="moveSpotPhotoForward" ${moveForwardDisabled ? "disabled" : ""}>后移</button>
        <button class="secondary-button" type="button" data-game-action="captureSpotPhoto"${getPhotoSourceDisabledAttr("camera")}>拍照</button>
        <button class="secondary-button" type="button" data-game-action="uploadSpotPhoto"${getPhotoSourceDisabledAttr("album")}>相册</button>
        <button class="secondary-button danger" type="button" data-game-action="deletePhotoSpotSelected" ${canDeleteSpot || editSelectedId ? "" : "disabled"}>删除</button>
      </div>
      <div class="photo-list" data-photo-list="spot">
        ${photoList || `<div class="photo-empty list-empty">还没有照片</div>`}
      </div>
      ${state.gameNotice ? `<div class="game-notice">${escapeHtml(state.gameNotice)}</div>` : ""}
    </section>
  `;
}

function renderSpotPhotoListHtml(spot, selectedId) {
  const editSelectedId = getSelectedSpotPhotoForEditId(spot);
  return renderPhotoTileListHtml(spot.photos || [], {
    activeId: selectedId,
    selectedId: editSelectedId,
    action: "selectSpotPhoto"
  });
}

function renderBuildingPhotoListHtml(building) {
  const activeId = getSelectedBuildingPhotoId(building);
  const selectedId = getSelectedBuildingPhotoForEditId(building);
  return renderPhotoTileListHtml(building?.photos || [], {
    activeId,
    selectedId,
    action: "selectBuildingPhoto",
    showDate: true
  });
}

function renderPhotoTileListHtml(photos, options) {
  return (photos || []).map((photo, index) => {
    const url = getPhotoUrl(photo);
    const active = photo.id === options.activeId;
    const selected = photo.id === options.selectedId;
    const style = getPhotoTileStyle(photo);
    const dateLabel = options.showDate ? getPhotoDateLabel(photo) : "";
    return `
      <button class="photo-tile${active ? " active" : ""}${selected ? " selected" : ""}" type="button" data-game-action="${escapeAttr(options.action)}" data-photo-id="${escapeAttr(photo.id)}" data-photo-index="${index}"${style ? ` style="${style}"` : ""}>
        ${url ? `<img src="${url}" alt="">` : `<span>照片</span>`}
        <span class="photo-tile-index">${index + 1}</span>
        ${dateLabel ? `<span class="photo-tile-date">${escapeHtml(dateLabel)}</span>` : ""}
      </button>
    `;
  }).join("");
}

function getPhotoTileStyle(photo) {
  const width = Number(photo?.width || photo?.resource?.width);
  const height = Number(photo?.height || photo?.resource?.height);
  if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) return "";
  const ratio = clamp(width / height, 0.15, 8);
  return `--photo-ratio:${ratio.toFixed(6)};--photo-natural-width:${Math.round(width)}px;`;
}

function onGamePanelResourceLoad(event) {
  const img = event.target;
  if (!(img instanceof HTMLImageElement)) return;
  const tile = img.closest(".photo-tile");
  if (!tile || !img.naturalWidth || !img.naturalHeight) return;
  const ratio = clamp(img.naturalWidth / img.naturalHeight, 0.15, 8);
  tile.style.setProperty("--photo-ratio", ratio.toFixed(6));
  tile.style.setProperty("--photo-natural-width", `${img.naturalWidth}px`);
}

function canUsePhotoSource(source) {
  if (!window.File || !window.FileReader) return false;
  if (source === "album") return Boolean(els.spotPhotoInput || els.buildingPhotoInput);
  if (source !== "camera") return false;
  const ua = navigator.userAgent || "";
  const mobileLike = /Android|iPhone|iPad|iPod|Mobile|HarmonyOS|MicroMessenger/i.test(ua);
  const coarsePointer = window.matchMedia?.("(pointer: coarse)")?.matches === true;
  return Boolean((els.spotCameraInput || els.buildingCameraInput) && (mobileLike || coarsePointer));
}

function getPhotoSourceDisabledAttr(source) {
  if (canUsePhotoSource(source)) return "";
  const message = source === "camera" ? "当前设备不支持直接拍照" : "当前浏览器不支持相册导入";
  return ` disabled title="${escapeAttr(message)}"`;
}

function renderCampusInteractionHtml(region, building) {
  if (state.gameData.location.kind === "building") {
    return "";
  }
  if (!region || !building) return "";
  const hasBuilding = Boolean(region && building);
  const photoList = renderBuildingPhotoListHtml(building);
  const entranceCandidate = getEntranceLinkCandidate(region);
  const showEntranceTools = canStructureUseEntrance(region?.type || "custom");
  const editSelectedId = getSelectedBuildingPhotoForEditId(building);
  const editIndex = getBuildingPhotoIndexById(building, editSelectedId);
  const moveBackDisabled = editIndex <= 0;
  const moveForwardDisabled = editIndex < 0 || editIndex >= building.photos.length - 1;
  return `
    <section class="game-card campus-card">
      <div class="building-editor" ${hasBuilding ? "" : "hidden"}>
        <div class="building-fields">
          <input class="game-input" data-game-field="buildingName" type="text" value="${escapeAttr(building?.customName || region?.name || "")}" placeholder="建筑名称">
          <input class="game-input" data-game-field="buildingPhotoDate" type="date" value="${escapeAttr(getBuildingPanelDateValue(building))}">
        </div>
        ${showEntranceTools ? `
          <div class="game-actions entrance-actions">
            <button class="secondary-button" type="button" data-game-action="linkPhotoSpotEntrance" title="${escapeAttr(entranceCandidate.reason)}">设入口</button>
          </div>
          <div class="entrance-list">${renderEntranceListHtml(region, building)}</div>
        ` : ""}
        <div class="game-actions dense photo-actions">
          <button class="secondary-button" type="button" data-game-action="moveBuildingPhotoBackward" ${moveBackDisabled ? "disabled" : ""}>前移</button>
          <button class="secondary-button" type="button" data-game-action="moveBuildingPhotoForward" ${moveForwardDisabled ? "disabled" : ""}>后移</button>
          <button class="secondary-button" type="button" data-game-action="captureBuildingPhoto"${getPhotoSourceDisabledAttr("camera")}>拍照</button>
          <button class="secondary-button" type="button" data-game-action="uploadBuildingPhoto"${getPhotoSourceDisabledAttr("album")}>相册</button>
          <button class="secondary-button danger" type="button" data-game-action="deleteBuildingPhoto" ${!editSelectedId ? "disabled" : ""}>删图</button>
        </div>
        <div class="photo-list building-photo-list" data-photo-list="building">
          ${photoList || `<div class="photo-empty list-empty">还没有照片</div>`}
        </div>
      </div>
    </section>
  `;
}

function renderEntranceListHtml(region, building) {
  const entries = getBuildingEntranceSpots(region?.id);
  if (!entries.length) return `<span class="muted-inline">还没有入口</span>`;
  return entries.map(({ spot }, index) => `
    <span class="entrance-row">
      <span>${escapeHtml(getPhotoSpotDisplayName(spot) || `入口${index + 1}`)}</span>
      <button class="secondary-button compact" type="button" data-game-action="unlinkPhotoSpotEntrance" data-spot-id="${escapeAttr(spot.id)}">取消绑定</button>
    </span>
  `).join("");
}

function renderInteriorPanelHtml(building, room, item, person) {
  if (state.gameData.location.kind !== "building" || !building) return "";
  const rule = getBuildingRule(building);
  const venueRule = getVenueRule(room, building);
  const selectedIsSelf = isSelfPerson(person);
  const roomOptions = renderOptions(rule.roomTypes, "自定义");
  const roomTypeOptions = renderOptions(rule.roomTypes, room?.type || "自定义");
  const itemTypeOptions = renderOptions(ITEM_TYPES, item?.type || "物品");
  const personTypeOptions = renderOptions(PERSON_TYPES, person?.type || "同学");
  const region = getStructureRegionById(state.gameData.location.buildingId);
  const buildingName = getBuildingDisplayName(region, building);
  const entranceCount = getBuildingEntranceSpots(building.id).length;
  const rooms = building.rooms.map((item) => `
    <button class="room-chip${item.id === state.gameData.selectedRoomId ? " active" : ""}" type="button" data-game-action="selectRoom" data-room-id="${escapeAttr(item.id)}">${escapeHtml(getRoomDisplayName(item))}</button>
  `).join("");
  const roomItems = room?.items?.map((entry) => `
    <button class="item-chip${entry.id === state.gameData.selectedItemId ? " active" : ""}" type="button" data-game-action="selectItem" data-item-id="${escapeAttr(entry.id)}">${escapeHtml(getItemDisplayName(entry, venueRule.itemLabel))}</button>
  `).join("") || "";
  const people = room?.people?.map((item) => `
    <button class="person-chip${item.id === state.gameData.selectedPersonId ? " active" : ""}" type="button" data-game-action="selectPerson" data-person-id="${escapeAttr(item.id)}">${escapeHtml(getPersonDisplayName(item))}</button>
  `).join("") || "";
  const roomPhotoList = renderPhotoTileListHtml(room?.photos || [], {
    activeId: getActivePhoto(room)?.id || "",
    selectedId: "",
    action: "selectRoomPhoto",
    showDate: true
  });
  const dormPlayerPortraitHtml = selectedIsSelf ? `
        <div class="player-portrait-card">
          <span class="player-portrait-status">${state.gameData.player.portrait ? "地图大头贴已设置" : "地图仍使用默认圆点"}</span>
          <button class="secondary-button" type="button" data-game-action="capturePlayerPortrait">拍大头贴</button>
          <button class="secondary-button" type="button" data-game-action="uploadPlayerPortrait">选大头贴</button>
        </div>
  ` : "";
  const itemPhotoList = renderPhotoTileListHtml(item?.photos || [], {
    activeId: getActivePhoto(item)?.id || "",
    selectedId: "",
    action: "selectItemPhoto",
    showDate: true
  });
  const personPhotoUrl = person?.photo ? getPhotoUrl(person.photo) : "";
  return `
    <section class="game-card interior-card">
      <div class="game-card-head">
        <span class="interior-title">
          <strong>${escapeHtml(buildingName)}</strong>
          <small>${building.rooms.length} 个场所${entranceCount ? ` / ${entranceCount} 个入口` : ""}</small>
        </span>
        <button class="secondary-button compact" type="button" data-game-action="exitBuilding">返回地图</button>
      </div>
      <div class="interior-building-summary">
        <div class="interior-building-meta">
          <span>关联入口</span>
          <strong>${entranceCount || 0}</strong>
        </div>
        <div class="interior-building-meta">
          <span>关联场所</span>
          <strong>${building.rooms.length || 0}</strong>
        </div>
      </div>
      <div class="room-chip-row venue-chip-row">${rooms || `<span class="muted-inline">添加场所后，室内地图会自动划分区域</span>`}</div>
      <div class="room-add-row interior-add-row">
        <input class="game-input" data-game-field="newRoomName" type="text" placeholder="场所名称">
        <select class="game-input" data-game-field="newRoomType">${roomOptions}</select>
        <button class="secondary-button" type="button" data-game-action="addRoom">加场所</button>
      </div>
      <div class="room-detail" ${room ? "" : "hidden"}>
        <div class="room-fields">
          <input class="game-input" data-game-field="roomName" type="text" value="${escapeAttr(room?.name || "")}" placeholder="场地名称">
          <select class="game-input" data-game-field="roomType">${roomTypeOptions}</select>
        </div>
        <div class="game-actions dense interior-photo-actions">
          <button class="secondary-button" type="button" data-game-action="captureRoomPhoto"${getPhotoSourceDisabledAttr("camera")}>拍照</button>
          <button class="secondary-button" type="button" data-game-action="uploadRoomPhoto"${getPhotoSourceDisabledAttr("album")}>相册</button>
          <button class="secondary-button danger" type="button" data-game-action="deleteRoomPhoto" ${!room || !room.photos.length ? "disabled" : ""}>删图</button>
          <button class="secondary-button danger" type="button" data-game-action="deleteRoom">删场所</button>
        </div>
        <div class="photo-list interior-photo-list" data-photo-list="room">
          ${roomPhotoList || `<div class="photo-empty list-empty">还没有场所照片</div>`}
        </div>
        <div class="item-add-row">
          <input class="game-input" data-game-field="newItemName" type="text" placeholder="物品名称">
          <button class="secondary-button" type="button" data-game-action="addItem">加物品</button>
        </div>
        <div class="item-chip-row">${roomItems || `<span class="muted-inline">通过当前场所添加物品</span>`}</div>
        <div class="item-detail" ${item ? "" : "hidden"}>
          <div class="item-top">
            <div class="item-fields">
              <input class="game-input" data-game-field="itemName" type="text" value="${escapeAttr(item?.name || "")}" placeholder="物品名称">
              <select class="game-input" data-game-field="itemType">${itemTypeOptions}</select>
              <textarea class="game-input" data-game-field="itemDescription" placeholder="备注">${escapeHtml(item?.description || "")}</textarea>
            </div>
          </div>
          <div class="game-actions dense interior-photo-actions">
            <button class="secondary-button" type="button" data-game-action="captureItemPhoto"${getPhotoSourceDisabledAttr("camera")}>拍照</button>
            <button class="secondary-button" type="button" data-game-action="uploadItemPhoto"${getPhotoSourceDisabledAttr("album")}>相册</button>
            <button class="secondary-button" type="button" data-game-action="interactItem">互动</button>
            <button class="secondary-button danger" type="button" data-game-action="deleteItemPhoto" ${!item || !item.photos.length ? "disabled" : ""}>删图</button>
            <button class="secondary-button danger" type="button" data-game-action="deleteItem">删除</button>
          </div>
          <div class="photo-list interior-photo-list" data-photo-list="item">
            ${itemPhotoList || `<div class="photo-empty list-empty">还没有物品照片</div>`}
          </div>
        </div>
        <div class="person-add-row">
          <input class="game-input" data-game-field="newPersonName" type="text" placeholder="人物名称">
          <button class="secondary-button" type="button" data-game-action="addPerson">加人物</button>
        </div>
        <div class="person-chip-row">${people}</div>
        <div class="person-detail" ${person ? "" : "hidden"}>
          <div class="person-top">
            <div class="person-photo${personPhotoUrl ? " has-photo" : ""}">${personPhotoUrl ? `<img src="${personPhotoUrl}" alt="">` : `<span>照片</span>`}</div>
            <div class="person-fields">
              <input class="game-input" data-game-field="personName" type="text" value="${escapeAttr(person?.name || "")}" placeholder="姓名">
              <select class="game-input" data-game-field="personType" ${selectedIsSelf ? "disabled" : ""}>${personTypeOptions}</select>
              <textarea class="game-input" data-game-field="personDescription" placeholder="背景资料">${escapeHtml(person?.description || "")}</textarea>
            </div>
          </div>
          ${dormPlayerPortraitHtml}
          <div class="game-actions dense">
            <button class="secondary-button" type="button" data-game-action="capturePersonPhoto"${getPhotoSourceDisabledAttr("camera")}>拍照</button>
            <button class="secondary-button" type="button" data-game-action="uploadPersonPhoto"${getPhotoSourceDisabledAttr("album")}>相册</button>
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
  if (name === "buildingName") {
    saveSelectedBuildingMeta({ defer: true, silent: true });
  } else if (name === "buildingPhotoDate") {
    saveSelectedBuildingMeta({ defer: true, silent: true, refresh: true });
  } else if (name === "photoSpotName" || name === "photoSpotDate") {
    saveActivePhotoSpotMeta({ defer: true, silent: true });
  } else if (name === "roomName") {
    saveSelectedRoom({ defer: true, silent: true });
  } else if (name === "itemName" || name === "itemDescription") {
    saveSelectedItem({ defer: true, silent: true });
  } else if (name === "personName" || name === "personDescription") {
    saveSelectedPerson({ defer: true, silent: true });
  }
}

function onGamePanelChange(event) {
  const field = event.target.closest("[data-game-field]");
  if (!field) return;
  const name = field.dataset.gameField;
  if (name === "roomType") {
    saveSelectedRoom();
  } else if (name === "itemType") {
    saveSelectedItem();
  } else if (name === "personType") {
    saveSelectedPerson();
  }
}

function handleGameAction(action, button) {
  switch (action) {
    case "captureSpotPhoto":
      els.spotCameraInput.click();
      return;
    case "uploadSpotPhoto":
      els.spotPhotoInput.click();
      return;
    case "selectSpotPhoto":
      selectSpotPhoto(button.dataset.photoId || "");
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
    case "captureBuildingPhoto":
      els.buildingCameraInput.click();
      return;
    case "uploadBuildingPhoto":
      els.buildingPhotoInput.click();
      return;
    case "selectBuildingPhoto":
      selectBuildingPhoto(button.dataset.photoId || "");
      return;
    case "moveBuildingPhotoBackward":
      moveSelectedBuildingPhoto(-1);
      return;
    case "moveBuildingPhotoForward":
      moveSelectedBuildingPhoto(1);
      return;
    case "deleteBuildingPhoto":
      deleteSelectedBuildingPhoto();
      return;
    case "linkPhotoSpotEntrance":
      linkNearbyPhotoSpotAsEntrance();
      return;
    case "unlinkPhotoSpotEntrance":
      unlinkPhotoSpotEntranceBinding(button.dataset.spotId || "");
      return;
    case "enterFromPhotoSpot":
      enterFromActivePhotoSpot();
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
    case "selectRoomPhoto":
      selectRoomPhoto(button.dataset.photoId || "");
      return;
    case "captureRoomPhoto":
      els.roomCameraInput.click();
      return;
    case "uploadRoomPhoto":
      els.roomPhotoInput.click();
      return;
    case "capturePlayerPortrait":
      if (!isSelfPerson(getSelectedPerson())) {
        setGameNotice("请先把人物关系设为自己");
        return;
      }
      els.playerPortraitCameraInput.click();
      return;
    case "uploadPlayerPortrait":
      if (!isSelfPerson(getSelectedPerson())) {
        setGameNotice("请先把人物关系设为自己");
        return;
      }
      els.playerPortraitInput.click();
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
    case "selectItemPhoto":
      selectItemPhoto(button.dataset.photoId || "");
      return;
    case "captureItemPhoto":
      els.itemCameraInput.click();
      return;
    case "uploadItemPhoto":
      els.itemPhotoInput.click();
      return;
    case "interactItem":
      interactWithSelectedItem();
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
    case "capturePersonPhoto":
      els.personCameraInput.click();
      return;
    case "uploadPersonPhoto":
      els.personPhotoInput.click();
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
  const spot = getActivePhotoSpot();
  if (!spot) {
    setGameNotice("请先建立拍照点");
    renderGamePanel({ force: true });
    return;
  }
  const photos = await filesToPhotoRecords(files, { kind: "photoSpot", spotId: spot.id });
  for (const photo of photos) spot.photos.push(photo);
  spot.activeIndex = Math.max(0, spot.photos.length - 1);
  state.gameData.selectedSpotPhotoId = spot.photos[spot.activeIndex]?.id || "";
  state.selectedSpotPhotoForEditId = "";
  spot.updatedAt = new Date().toISOString();
  state.gameData.selectedPhotoSpotId = spot.id;
  setGameNotice(`已添加 ${photos.length} 张照片`);
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

async function filesToPhotoRecords(files, context = {}) {
  const photos = [];
  for (const file of files) {
    photos.push(await createPhotoFromFile(file, context));
  }
  return photos;
}

async function createPhotoFromFile(file, context = {}) {
  const photoId = createId("photo");
  let original = null;
  let previewSource = file;
  let previewSize = null;
  if (await canUseAlbumFolder()) {
    try {
      original = await saveOriginalPhotoToAlbum(file, photoId, context);
    } catch (error) {
      console.warn("保存原图到相册库失败，改用浏览器存储:", error);
      state.album.enabled = false;
      state.album.status = "needs-permission";
      state.album.message = "相册库写入失败，本次照片已存入浏览器。";
      renderAlbumStatus();
    }
    if (original) {
      try {
        const preview = await createPreviewBlob(file);
        previewSource = preview.blob;
        previewSize = preview.size;
      } catch (error) {
        console.warn("预览图压缩失败，改用原图预览:", error);
        previewSource = file;
      }
    }
  }
  if (!previewSize && file.type?.startsWith("image/")) {
    previewSize = await readImageBlobSize(previewSource);
  }
  const previewName = original ? makePreviewFileName(file.name, photoId) : (file.name || "photo");
  const record = await blobToResourceRecord(previewSource, previewName);
  if (previewSize?.width && previewSize?.height) {
    record.width = previewSize.width;
    record.height = previewSize.height;
  }
  return normalizePhotoRecord({
    id: photoId,
    name: file.name || "photo",
    width: record.width || 0,
    height: record.height || 0,
    resource: record,
    original,
    createdAt: new Date().toISOString()
  });
}

async function canUseAlbumFolder() {
  if (!state.album.supported || !state.album.handle) return false;
  if (state.album.enabled) return true;
  const permission = await queryAlbumPermission(state.album.handle);
  state.album.permission = permission;
  state.album.enabled = permission === "granted";
  state.album.status = state.album.enabled ? "connected" : "needs-permission";
  state.album.message = state.album.enabled ? "原图会保存到本机相册库。" : "相册库需要重新授权，本次使用浏览器存储。";
  renderAlbumStatus();
  return state.album.enabled;
}

async function saveOriginalPhotoToAlbum(file, photoId, context = {}) {
  const school = getSelectedSchool();
  const root = state.album.handle;
  const appDir = await getOrCreateDirectory(root, "campus-memoir");
  const schoolsDir = await getOrCreateDirectory(appDir, "schools");
  const schoolDirName = safeFileName(school?.name || school?.id || "unknown-school");
  const schoolDir = await getOrCreateDirectory(schoolsDir, schoolDirName);
  const photosDir = await getOrCreateDirectory(schoolDir, "photos");
  const originalsDir = await getOrCreateDirectory(photosDir, "originals");
  const now = new Date();
  const yearDir = await getOrCreateDirectory(originalsDir, String(now.getFullYear()));
  const monthDir = await getOrCreateDirectory(yearDir, String(now.getMonth() + 1).padStart(2, "0"));
  const fileName = makeAlbumPhotoFileName(file.name, photoId);
  const fileHandle = await monthDir.getFileHandle(fileName, { create: true });
  const writable = await fileHandle.createWritable();
  await writable.write(file);
  await writable.close();
  return {
    storage: "local-folder",
    albumRoot: state.album.rootName || root.name || "",
    relativePath: ["campus-memoir", "schools", schoolDirName, "photos", "originals", String(now.getFullYear()), String(now.getMonth() + 1).padStart(2, "0"), fileName].join("/"),
    name: file.name || fileName,
    type: file.type || "application/octet-stream",
    size: file.size || 0,
    lastModified: Number.isFinite(file.lastModified) ? file.lastModified : null,
    schoolId: school?.id || "",
    context: sanitizePhotoContext(context),
    savedAt: now.toISOString()
  };
}

function sanitizePhotoContext(context = {}) {
  return Object.fromEntries(Object.entries(context)
    .filter(([, value]) => value !== undefined && value !== null && value !== "")
    .map(([key, value]) => [key, String(value).slice(0, 120)]));
}

async function getOrCreateDirectory(parent, name) {
  return parent.getDirectoryHandle(safeFileName(name), { create: true });
}

function makeAlbumPhotoFileName(name, photoId) {
  const safeName = safeFileName(name || "photo");
  const dot = safeName.lastIndexOf(".");
  const hasExtension = dot > 0 && dot < safeName.length - 1;
  const base = hasExtension ? safeName.slice(0, dot) : safeName;
  const ext = hasExtension ? safeName.slice(dot) : "";
  return `${photoId}-${base}`.slice(0, Math.max(16, 120 - ext.length)) + ext;
}

function makePreviewFileName(name, photoId) {
  const safeName = safeFileName(name || "photo");
  const dot = safeName.lastIndexOf(".");
  const base = dot > 0 ? safeName.slice(0, dot) : safeName;
  return `${photoId}-${base}-preview.jpg`;
}

async function createPreviewBlob(file) {
  if (!file.type?.startsWith("image/")) return file;
  const image = await loadImageElement(URL.createObjectURL(file), { revoke: true });
  const scale = Math.min(1, PHOTO_PREVIEW_MAX_SIDE / Math.max(image.naturalWidth || 1, image.naturalHeight || 1));
  const width = Math.max(1, Math.round((image.naturalWidth || 1) * scale));
  const height = Math.max(1, Math.round((image.naturalHeight || 1) * scale));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(image, 0, 0, width, height);
  return {
    blob: await canvasToBlob(canvas, PHOTO_PREVIEW_TYPE, PHOTO_PREVIEW_QUALITY),
    size: { width, height }
  };
}

async function readImageBlobSize(blob) {
  if (!blob?.type?.startsWith("image/")) return null;
  try {
    const image = await loadImageElement(URL.createObjectURL(blob), { revoke: true });
    return {
      width: image.naturalWidth || 0,
      height: image.naturalHeight || 0
    };
  } catch {
    return null;
  }
}

function canvasToBlob(canvas, type, quality) {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("预览图生成失败"));
    }, type, quality);
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

function getBuildingPhotoIndexById(building, photoId) {
  if (!building || !photoId) return -1;
  return building.photos.findIndex((photo) => photo.id === photoId);
}

function getSelectedSpotPhotoForEditId(spot) {
  const selected = state.selectedSpotPhotoForEditId;
  return getSpotPhotoIndexById(spot, selected) >= 0 ? selected : "";
}

function getSelectedSpotPhotoForEdit(spot) {
  const selectedId = getSelectedSpotPhotoForEditId(spot);
  return selectedId ? spot.photos.find((photo) => photo.id === selectedId) || null : null;
}

function getSelectedBuildingPhotoId(building) {
  if (!building?.photos?.length) return "";
  const selected = state.gameData.selectedBuildingPhotoId;
  if (selected && building.photos.some((photo) => photo.id === selected)) return selected;
  const index = clamp(building.activePhotoIndex || 0, 0, building.photos.length - 1);
  return building.photos[index]?.id || building.photos[0]?.id || "";
}

function getSelectedBuildingPhotoForEditId(building) {
  const selected = state.selectedBuildingPhotoForEditId;
  return getBuildingPhotoIndexById(building, selected) >= 0 ? selected : "";
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
  const entrance = getPhotoSpotEntrance(spot);
  if (entrance?.buildingId && state.gameData.buildings[entrance.buildingId]) {
    const building = state.gameData.buildings[entrance.buildingId];
    building.entrances = normalizeBuildingEntranceRefs(building.entrances).filter((entry) => entry.photoSpotId !== spot.id);
    building.updatedAt = new Date().toISOString();
  }
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

function unlinkPhotoSpotEntranceBinding(spotId) {
  const spot = state.gameData.photoSpots.find((item) => item.id === spotId);
  const entrance = getPhotoSpotEntrance(spot);
  if (!spot || !entrance?.buildingId) return;
  const building = state.gameData.buildings[entrance.buildingId];
  if (building) {
    building.entrances = normalizeBuildingEntranceRefs(building.entrances).filter((entry) => entry.photoSpotId !== spot.id);
    building.updatedAt = new Date().toISOString();
  }
  delete spot.entranceFor;
  spot.updatedAt = new Date().toISOString();
  state.selectedNearbyInteractionKey = `photoSpot:${spot.id}`;
  state.gameData.selectedPhotoSpotId = spot.id;
  state.gameData.selectedBuildingId = "";
  state.gameData.selectedSpotPhotoId = spot.photos[0]?.id || "";
  state.selectedSpotPhotoForEditId = "";
  state.selectedBuildingPhotoForEditId = "";
  updateNearbyGameContext();
  setGameNotice("入口已取消，保留为拍照点");
  markGameDirty();
  renderGamePanel({ force: true });
  queueDraw();
}

function saveActivePhotoSpotMeta(options = {}) {
  const spot = getActivePhotoSpot();
  if (!spot) return;
  const nameInput = els.gamePanel.querySelector('[data-game-field="photoSpotName"]');
  const dateInput = els.gamePanel.querySelector('[data-game-field="photoSpotDate"]');
  const name = nameInput?.value?.trim() || "";
  const entrance = getPhotoSpotEntrance(spot);
  if (entrance) {
    const autoName = getEntranceSpotAutoName(spot);
    entrance.autoName = !name || name === autoName;
    spot.name = entrance.autoName ? "" : name;
  } else {
    spot.name = name;
  }
  const dateValue = dateInput?.value || "";
  const selectedPhoto = getSelectedSpotPhotoForEdit(spot);
  if (selectedPhoto) {
    selectedPhoto.capturedAt = dateInputValueToIso(dateValue, selectedPhoto.capturedAt || selectedPhoto.createdAt || "");
  } else {
    spot.capturedAt = dateInputValueToIso(dateValue, spot.capturedAt || spot.createdAt || "");
  }
  spot.updatedAt = new Date().toISOString();
  markGameDirty(options.defer ? { defer: true } : {});
  if (!options.silent) setGameNotice("拍照点已保存");
  if (!options.silent || options.refresh) renderGamePanel({ force: true });
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
  const building = getOrCreateBuildingMemory(buildingId);
  state.gameData.selectedBuildingPhotoId = getSelectedBuildingPhotoId(building);
  state.selectedBuildingPhotoForEditId = "";
  state.selectedSpotPhotoForEditId = "";
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
  if (target.kind === "structure") {
    const building = getOrCreateBuildingMemory(target.id);
    state.gameData.selectedBuildingPhotoId = getSelectedBuildingPhotoId(building);
  } else {
    state.gameData.selectedBuildingPhotoId = "";
  }
  state.selectedBuildingPhotoForEditId = "";
  markGameDirty({ defer: true });
  renderGamePanel({ force: true });
  queueDraw();
}

function saveSelectedBuildingMeta(options = {}) {
  const building = getSelectedBuildingMemory();
  const region = getStructureRegionById(state.gameData.selectedBuildingId);
  if (!building || !region) return;
  const nameInput = els.gamePanel.querySelector('[data-game-field="buildingName"]');
  const dateInput = els.gamePanel.querySelector('[data-game-field="buildingPhotoDate"]');
  const name = nameInput?.value?.trim() || "";
  building.customName = name;
  region.name = name || region.name || "";
  const dateValue = dateInput?.value || "";
  const selectedPhoto = getSelectedBuildingPhotoForEdit(building);
  if (selectedPhoto) {
    selectedPhoto.capturedAt = dateInputValueToIso(dateValue, selectedPhoto.capturedAt || selectedPhoto.createdAt || "");
  } else {
    building.capturedAt = dateInputValueToIso(dateValue, building.capturedAt || building.createdAt || "");
  }
  building.updatedAt = new Date().toISOString();
  commitStructureDataChange();
  markGameDirty(options.defer ? { defer: true } : {});
  if (!options.silent) setGameNotice("建筑已保存");
  if (!options.silent || options.refresh) renderGamePanel({ force: true });
  queueDraw();
}

async function addPhotosToSelectedBuilding(files) {
  const building = getSelectedBuildingMemory();
  if (!building) return;
  const photos = await filesToPhotoRecords(files, { kind: "building", buildingId: building.id });
  for (const photo of photos) building.photos.push(photo);
  building.activePhotoIndex = Math.max(0, building.photos.length - 1);
  const photo = building.photos[building.activePhotoIndex] || null;
  state.gameData.selectedBuildingPhotoId = photo?.id || "";
  state.selectedBuildingPhotoForEditId = photo?.id || "";
  building.updatedAt = new Date().toISOString();
  markGameDirty();
  renderGamePanel({ force: true });
}

function selectBuildingPhoto(photoId) {
  const building = getSelectedBuildingMemory();
  if (!building || !photoId || !building.photos.some((photo) => photo.id === photoId)) return;
  state.gameData.selectedBuildingPhotoId = photoId;
  building.activePhotoIndex = building.photos.findIndex((photo) => photo.id === photoId);
  state.selectedBuildingPhotoForEditId = state.selectedBuildingPhotoForEditId === photoId ? "" : photoId;
  markGameDirty({ defer: true });
  renderGamePanel({ force: true });
}

function moveSelectedBuildingPhoto(direction) {
  const building = getSelectedBuildingMemory();
  if (!building || building.photos.length < 2) return;
  const selectedId = getSelectedBuildingPhotoForEditId(building);
  const from = getBuildingPhotoIndexById(building, selectedId);
  if (from < 0) return;
  const to = clamp(from + Math.sign(direction || 1), 0, building.photos.length - 1);
  if (from === to) return;
  const [photo] = building.photos.splice(from, 1);
  building.photos.splice(to, 0, photo);
  building.activePhotoIndex = to;
  state.gameData.selectedBuildingPhotoId = photo.id;
  state.selectedBuildingPhotoForEditId = photo.id;
  building.updatedAt = new Date().toISOString();
  markGameDirty();
  renderGamePanel({ force: true });
}

function deleteSelectedBuildingPhoto() {
  const building = getSelectedBuildingMemory();
  if (!building?.photos.length) return;
  const selectedId = getSelectedBuildingPhotoForEditId(building);
  const index = getBuildingPhotoIndexById(building, selectedId);
  if (index < 0) return;
  building.photos.splice(index, 1);
  const nextPhoto = building.photos[Math.min(index, building.photos.length - 1)] || null;
  state.gameData.selectedBuildingPhotoId = nextPhoto?.id || "";
  state.selectedBuildingPhotoForEditId = "";
  building.activePhotoIndex = nextPhoto ? building.photos.findIndex((photo) => photo.id === nextPhoto.id) : 0;
  building.updatedAt = new Date().toISOString();
  markGameDirty();
  renderGamePanel({ force: true });
}

function getEntranceLinkCandidate(region) {
  const spot = getNearestPhotoSpotTouchingPlayer();
  if (!region) return { canLink: false, spot: null, reason: "没有可关联对象" };
  if (!canStructureUseEntrance(region.type || "custom")) return { canLink: false, spot, reason: "门不设置入口" };
  if (!spot) return { canLink: false, spot: null, reason: "需要站在拍照点附近" };
  const existing = getPhotoSpotEntrance(spot);
  if (existing?.buildingId === region.id) return { canLink: false, spot, reason: "这个拍照点已经是入口" };
  if (existing?.buildingId) return { canLink: false, spot, reason: "这个拍照点已关联其他入口" };
  if (!isPlayerCircleTouchingPhotoSpot(spot)) return { canLink: false, spot, reason: "需要更靠近拍照点" };
  if (!isPlayerCircleTouchingRegion(region)) return { canLink: false, spot, reason: "需要同时靠近建筑或场景" };
  return { canLink: true, spot, reason: "关联当前拍照点为入口" };
}

function getNearestPhotoSpotTouchingPlayer() {
  let best = null;
  let bestDistance = Infinity;
  for (const spot of state.gameData.photoSpots) {
    const d = distance(state.gameData.player, spot);
    if (!isPlayerCircleTouchingPhotoSpot(spot) || d >= bestDistance) continue;
    best = spot;
    bestDistance = d;
  }
  return best;
}

function isPlayerCircleTouchingPhotoSpot(spot) {
  const player = state.gameData.player;
  const playerRadius = Number(player.radius) || DEFAULT_PLAYER_RADIUS;
  const spotRadius = Number(spot?.radius) || playerRadius;
  return distance(player, spot) <= playerRadius + spotRadius;
}

function isPlayerCircleTouchingRegion(region) {
  const player = state.gameData.player;
  const radius = Number(player.radius) || DEFAULT_PLAYER_RADIUS;
  const areas = getRegionAreas(region);
  if (!areas.length) return false;
  return distanceToRegion(player, areas, region) <= radius;
}

function linkNearbyPhotoSpotAsEntrance() {
  const region = getStructureRegionById(state.gameData.selectedBuildingId);
  const building = getSelectedBuildingMemory();
  const candidate = getEntranceLinkCandidate(region);
  if (!building || !region || !candidate.canLink || !candidate.spot) {
    setGameNotice(candidate.reason || "需要同时靠近拍照点和建筑");
    renderGamePanel({ force: true });
    return;
  }
  const spot = candidate.spot;
  const now = new Date().toISOString();
  spot.entranceFor = {
    buildingId: region.id,
    autoName: true,
    createdAt: now
  };
  spot.name = "";
  spot.updatedAt = now;
  building.entrances = normalizeBuildingEntranceRefs(building.entrances);
  if (!building.entrances.some((entry) => entry.photoSpotId === spot.id)) {
    building.entrances.push({ id: createId("entrance"), photoSpotId: spot.id, createdAt: now });
  }
  building.updatedAt = now;
  state.selectedNearbyInteractionKey = `photoSpot:${spot.id}`;
  state.gameData.selectedPhotoSpotId = spot.id;
  state.gameData.selectedBuildingId = "";
  updateNearbyGameContext();
  markGameDirty();
  setGameNotice(`${getPhotoSpotDisplayName(spot)} 已设为入口`);
  renderGamePanel({ force: true });
  queueDraw();
}

function enterFromActivePhotoSpot() {
  const spot = getActivePhotoSpot();
  const entranceTarget = getEntranceBuildingForSpot(spot);
  if (!spot || !entranceTarget || !isPlayerCircleTouchingPhotoSpot(spot)) {
    setGameNotice("需要站在入口附近");
    renderGamePanel({ force: true });
    return;
  }
  if (!spot.photos.length) {
    setGameNotice("入口需要先拍照");
    renderGamePanel({ force: true });
    return;
  }
  const building = entranceTarget.building;
  const regionId = entranceTarget.region.id;
  building.interiorPlayer = normalizeInteriorPlayer(building.interiorPlayer);
  state.gameData.location = { kind: "building", buildingId: regionId, roomId: "" };
  state.gameData.selectedBuildingId = regionId;
  state.gameData.selectedPhotoSpotId = "";
  state.gameData.selectedRoomId = getInteriorCellForPoint(building.interiorPlayer, building)?.room?.id || building.rooms[0]?.id || "";
  state.gameData.location.roomId = state.gameData.selectedRoomId;
  state.gameData.selectedItemId = "";
  state.gameData.selectedPersonId = "";
  clearMoveTarget();
  markGameDirty();
  renderGamePanel({ force: true });
  queueDraw();
}

function exitBuilding() {
  state.gameData.location = { kind: "campus", buildingId: "", roomId: "" };
  state.gameData.selectedRoomId = "";
  state.gameData.selectedItemId = "";
  state.gameData.selectedPersonId = "";
  clearMoveTarget();
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
  const type = els.gamePanel.querySelector('[data-game-field="newRoomType"]')?.value || getBuildingRule(building).roomTypes[0] || "自定义";
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
  if (state.gameData.location.kind === "building") {
    moveInteriorPlayerToRoom(room.id);
  }
  markGameDirty();
  renderGamePanel({ force: true });
  queueDraw();
}

function selectRoom(roomId) {
  const building = getSelectedBuildingMemory();
  if (!building?.rooms.some((room) => room.id === roomId)) return;
  if (state.gameData.location.kind === "building") {
    moveInteriorPlayerToRoom(roomId);
    return;
  }
  state.gameData.selectedRoomId = roomId;
  state.gameData.location.roomId = roomId;
  state.gameData.selectedItemId = "";
  state.gameData.selectedPersonId = "";
  markGameDirty({ defer: true });
  renderGamePanel({ force: true });
  queueDraw();
}

function saveSelectedRoom(options = {}) {
  const room = getSelectedRoom();
  if (!room) return;
  const name = els.gamePanel.querySelector('[data-game-field="roomName"]')?.value?.trim() || "";
  const type = els.gamePanel.querySelector('[data-game-field="roomType"]')?.value || room.type || "自定义";
  room.name = name || type;
  room.type = type;
  room.relation = "";
  room.updatedAt = new Date().toISOString();
  markGameDirty(options.defer ? { defer: true } : {});
  if (!options.silent) renderGamePanel({ force: true });
  queueDraw();
}

async function addPhotosToSelectedRoom(files) {
  const room = getSelectedRoom();
  if (!room) return;
  const photos = await filesToPhotoRecords(files, { kind: "venue", buildingId: state.gameData.location.buildingId, roomId: room.id });
  for (const photo of photos) room.photos.push(photo);
  room.activePhotoIndex = Math.max(0, room.photos.length - 1);
  room.updatedAt = new Date().toISOString();
  markGameDirty();
  renderGamePanel({ force: true });
  queueDraw();
}

function selectRoomPhoto(photoId) {
  const room = getSelectedRoom();
  if (!room?.photos?.length) return;
  const index = room.photos.findIndex((photo) => photo.id === photoId);
  if (index < 0) return;
  room.activePhotoIndex = index;
  markGameDirty({ defer: true });
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
  if (state.gameData.selectedRoomId && state.gameData.location.kind === "building") {
    const cell = getInteriorRoomLayout(building).cells.find((entry) => entry.room.id === state.gameData.selectedRoomId);
    if (cell) {
      const player = getInteriorPlayer(building);
      player.x = cell.x + cell.width / 2;
      player.y = cell.y + cell.height / 2;
    }
  }
  markGameDirty();
  renderGamePanel({ force: true });
  queueDraw();
}

function addItemToSelectedRoom() {
  const room = getSelectedRoom();
  if (!room) return;
  const name = els.gamePanel.querySelector('[data-game-field="newItemName"]')?.value?.trim() || "";
  const item = normalizeMemoryItem({
    id: createId("item"),
    name: name || "物品",
    type: "物品",
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
  const photos = await filesToPhotoRecords(files, { kind: "item", buildingId: state.gameData.location.buildingId, roomId: state.gameData.selectedRoomId, itemId: item.id });
  for (const photo of photos) item.photos.push(photo);
  item.activePhotoIndex = Math.max(0, item.photos.length - 1);
  item.updatedAt = new Date().toISOString();
  markGameDirty();
  renderGamePanel({ force: true });
}

function selectItemPhoto(photoId) {
  const item = getSelectedItem();
  if (!item?.photos?.length) return;
  const index = item.photos.findIndex((photo) => photo.id === photoId);
  if (index < 0) return;
  item.activePhotoIndex = index;
  markGameDirty({ defer: true });
  renderGamePanel({ force: true });
}

function cycleItemPhoto(delta) {
  const item = getSelectedItem();
  if (!item?.photos.length) return;
  item.activePhotoIndex = wrapIndex((item.activePhotoIndex || 0) + delta, item.photos.length);
  markGameDirty({ defer: true });
  renderGamePanel({ force: true });
}

function saveSelectedItem(options = {}) {
  const item = getSelectedItem();
  if (!item) return;
  item.name = els.gamePanel.querySelector('[data-game-field="itemName"]')?.value?.trim() || item.name;
  item.type = els.gamePanel.querySelector('[data-game-field="itemType"]')?.value || item.type || "物品";
  item.description = els.gamePanel.querySelector('[data-game-field="itemDescription"]')?.value?.trim() || "";
  item.updatedAt = new Date().toISOString();
  markGameDirty(options.defer ? { defer: true } : {});
  if (!options.silent) renderGamePanel({ force: true });
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

function interactWithSelectedItem() {
  const item = getSelectedItem();
  if (!item) return;
  const name = getItemDisplayName(item, item.type || "物品");
  const type = item.type || "物品";
  const verbs = {
    交通工具: "查看这辆交通工具",
    运动器材: "使用这件运动器材",
    菜: "点一份菜",
    货物: "拿起这件货物",
    工位: "坐到这个工位"
  };
  setGameNotice(`${verbs[type] || "查看"}：${name}`);
  renderGamePanel({ force: true });
}

function addPersonToSelectedRoom() {
  const room = getSelectedRoom();
  if (!room) return;
  const name = els.gamePanel.querySelector('[data-game-field="newPersonName"]')?.value?.trim() || "";
  const person = normalizePerson({
    id: createId("person"),
    name: name || "人物",
    type: "同学",
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
  person.photo = await createPhotoFromFile(file, { kind: "person", buildingId: state.gameData.location.buildingId, roomId: state.gameData.selectedRoomId, personId: person.id });
  person.updatedAt = new Date().toISOString();
  markGameDirty();
  renderGamePanel({ force: true });
}

async function setPlayerPortraitFromDorm(file) {
  const building = getSelectedBuildingMemory();
  const room = getSelectedRoom();
  const person = getSelectedPerson();
  if (!building || !room || !isSelfPerson(person)) {
    setGameNotice("请先把人物关系设为自己");
    return;
  }
  const photo = await createPhotoFromFile(file, { kind: "portrait", buildingId: building.id, roomId: room.id, personId: person.id });
  state.gameData.player.portrait = photo;
  person.portrait = photo;
  person.updatedAt = new Date().toISOString();
  markGameDirty();
  setGameNotice("地图大头贴已更新");
  renderGamePanel({ force: true });
  queueDraw();
}

function saveSelectedPerson(options = {}) {
  const person = getSelectedPerson();
  if (!person) return;
  const room = getSelectedRoom();
  person.name = els.gamePanel.querySelector('[data-game-field="personName"]')?.value?.trim() || person.name;
  const requestedType = els.gamePanel.querySelector('[data-game-field="personType"]')?.value || person.type || "同学";
  if (requestedType === "自己") {
    for (const entry of room?.people || []) {
      if (entry.id !== person.id && isSelfPerson(entry)) entry.type = "同学";
    }
    person.type = "自己";
  } else {
    person.type = requestedType;
  }
  person.description = els.gamePanel.querySelector('[data-game-field="personDescription"]')?.value?.trim() || "";
  person.updatedAt = new Date().toISOString();
  markGameDirty(options.defer ? { defer: true } : {});
  if (!options.silent) renderGamePanel({ force: true });
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
  const wasSelf = isSelfPerson(person);
  room.people = room.people.filter((item) => item.id !== person.id);
  if (wasSelf) state.gameData.player.portrait = null;
  state.gameData.selectedPersonId = room.people[0]?.id || "";
  markGameDirty();
  renderGamePanel({ force: true });
  queueDraw();
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

function toggleGameInfoPanel(forceOpen = null) {
  const open = forceOpen === null ? els.gameInfoPanel.hidden : Boolean(forceOpen);
  els.gameInfoPanel.hidden = !open;
  els.gameInfoButton.setAttribute("aria-expanded", String(open));
  if (open) {
    renderAlbumStatus();
    void refreshStatsPanel();
  }
}

async function initGlobalStats() {
  renderGlobalStatsPanel();
  try {
    if (shouldRecordGlobalStats()) {
      await recordGlobalVisit();
      await refreshGlobalStats();
      state.globalStatsStatus = "校园足迹已更新。";
    } else {
      state.globalStatsStatus = "本地预览只显示本机统计。";
    }
  } catch (error) {
    console.warn("校园足迹初始化失败:", error);
    state.globalStatsStatus = "全站统计暂时不可用，已显示本机统计。";
  }
  await refreshStatsPanel();
}

async function refreshStatsPanel() {
  renderGlobalStatsPanel(await getLocalPlayerStats());
}

async function recordGlobalVisit() {
  const today = getLocalDateKey();
  await incrementStatsCounter(STATS_COUNTER_IDS.totalPv);
  await incrementStatsCounter(makeDailyCounterId(STATS_COUNTER_IDS.dailyPvPrefix, today));
  const isKnownVisitor = localStorage.getItem(STATS_VISITOR_KEY) === "true";
  const lastUvDate = localStorage.getItem(STATS_LAST_UV_DATE_KEY);
  if (!isKnownVisitor) {
    await incrementStatsCounter(STATS_COUNTER_IDS.totalUv);
    localStorage.setItem(STATS_VISITOR_KEY, "true");
  }
  if (lastUvDate !== today) {
    await incrementStatsCounter(makeDailyCounterId(STATS_COUNTER_IDS.dailyUvPrefix, today));
    localStorage.setItem(STATS_LAST_UV_DATE_KEY, today);
  }
}

async function refreshGlobalStats() {
  const today = getLocalDateKey();
  const dailyPv = makeDailyCounterId(STATS_COUNTER_IDS.dailyPvPrefix, today);
  const dailyUv = makeDailyCounterId(STATS_COUNTER_IDS.dailyUvPrefix, today);
  const counters = await fetchStatsCounters([
    STATS_COUNTER_IDS.totalPv,
    STATS_COUNTER_IDS.totalUv,
    dailyPv,
    dailyUv
  ]);
  state.globalStats = {
    totalPv: clampInt(counters[STATS_COUNTER_IDS.totalPv], 0, 99999999),
    totalUv: clampInt(counters[STATS_COUNTER_IDS.totalUv], 0, 99999999),
    todayPv: clampInt(counters[dailyPv], 0, 99999999),
    todayUv: clampInt(counters[dailyUv], 0, 99999999)
  };
}

async function getLocalPlayerStats() {
  const stats = {
    schoolCount: state.schools.length,
    photoCount: 0,
    peopleCount: 0,
    activeBuildingCount: 0,
    totalBuildingCount: 0
  };
  for (const school of state.schools) {
    const data = school.id === state.selectedSchoolId
      ? state.gameData
      : await getGameData(school.id).catch(() => createEmptyGameData());
    const editData = school.id === state.selectedSchoolId
      ? getSelectedEditData()
      : await getEditData(school.id).catch(() => createEmptyEditData());
    const structureBuildingIds = getMemoryStructureIds(editData);
    stats.photoCount += (data.photoSpots || []).reduce((sum, spot) => sum + (spot.photos?.length || 0), 0);
    stats.totalBuildingCount += structureBuildingIds.length;
    stats.activeBuildingCount += structureBuildingIds.filter((id) => (data.buildings?.[id]?.photos || []).length > 0).length;
    for (const building of Object.values(data.buildings || {})) {
      stats.photoCount += (building.photos || []).length;
      for (const room of building.rooms || []) {
        stats.photoCount += (room.photos || []).length;
        stats.peopleCount += (room.people || []).length;
        for (const item of room.items || []) stats.photoCount += (item.photos || []).length;
      }
    }
  }
  return stats;
}

function renderGlobalStatsPanel(localStats = null) {
  if (!els.globalStatsPanel) return;
  const local = localStats || { schoolCount: 0, photoCount: 0, peopleCount: 0, activeBuildingCount: 0, totalBuildingCount: 0 };
  const stats = state.globalStats || {};
  const groups = [
    {
      title: "全部玩家",
      items: [
        ["访问", stats.totalPv || 0, stats.todayPv || 0],
        ["访客", stats.totalUv || 0, stats.todayUv || 0]
      ]
    },
    {
      title: "我的回忆",
      items: [
        ["校区", local.schoolCount, ""],
        ["拍照", local.photoCount, ""],
        ["人物", local.peopleCount, ""],
        ["建筑", `${local.activeBuildingCount}/${local.totalBuildingCount}`, ""]
      ]
    }
  ];
  els.globalStatsPanel.innerHTML = groups.map((group) => `
    <section class="stat-group" aria-label="${escapeAttr(group.title)}统计">
      <h3>${escapeHtml(group.title)}</h3>
      <div class="stat-grid">
        ${group.items.map(([label, total, today]) => `
          <div class="stat-card">
            <span>${escapeHtml(label)}</span>
            <strong>${escapeHtml(formatStatValue(total))}</strong>
            ${today === "" ? "" : `<em>今日 ${escapeHtml(formatCompactCount(today))}</em>`}
          </div>
        `).join("")}
      </div>
    </section>
  `).join("");
  if (els.globalStatsStatus) els.globalStatsStatus.textContent = state.globalStatsStatus || "";
}

function shouldRecordGlobalStats() {
  const hostname = window.location.hostname;
  if (!hostname || hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1") return false;
  return window.location.protocol === "https:" || window.location.protocol === "http:";
}

async function incrementStatsCounter(counterId) {
  return postStatsRpc("increment_counter", { counter_id: counterId });
}

async function fetchStatsCounters(counterIds) {
  const rows = await postStatsRpc("get_counters", { counter_ids: counterIds });
  const result = Object.create(null);
  for (const id of counterIds) result[id] = 0;
  if (Array.isArray(rows)) {
    for (const row of rows) {
      if (row?.id) result[row.id] = clampInt(row.count, 0, 99999999);
    }
  }
  return result;
}

async function postStatsRpc(endpoint, payload) {
  const response = await fetch(`${STATS_COUNTER_RPC_URL}/rest/v1/rpc/${endpoint}`, {
    method: "POST",
    headers: {
      apikey: STATS_COUNTER_RPC_ANON_KEY,
      Authorization: `Bearer ${STATS_COUNTER_RPC_ANON_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });
  if (!response.ok) throw new Error(`统计接口 ${endpoint} 返回 ${response.status}`);
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

function makeDailyCounterId(prefix, dateKey = getLocalDateKey()) {
  return `${prefix}_${dateKey.replaceAll("-", "")}`;
}

function getLocalDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatCompactCount(value) {
  const count = clampInt(value, 0, 99999999);
  if (count >= 100000) return `${(count / 10000).toFixed(1)}万`;
  return String(count);
}

function formatStatValue(value) {
  return typeof value === "string" ? value : formatCompactCount(value);
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
  rebuildMapAlphaMask();
}

function rebuildMapAlphaMask() {
  state.mapAlphaMask = null;
  state.mapAlphaPixelCache.clear();
  if (!state.mapImage || !state.mapNaturalSize.width || !state.mapNaturalSize.height) return;
  const scale = Math.min(1, MAP_ALPHA_MASK_MAX_SIDE / Math.max(state.mapNaturalSize.width, state.mapNaturalSize.height));
  const width = Math.max(1, Math.round(state.mapNaturalSize.width * scale));
  const height = Math.max(1, Math.round(state.mapNaturalSize.height * scale));
  const canvas = state.mapAlphaSampleCanvas || (state.mapAlphaSampleCanvas = document.createElement("canvas"));
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return;
  ctx.clearRect(0, 0, width, height);
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(state.mapImage, 0, 0, width, height);
  const imageData = ctx.getImageData(0, 0, width, height).data;
  const alpha = new Uint8Array(width * height);
  for (let index = 0, pixel = 0; index < imageData.length; index += 4, pixel += 1) {
    alpha[pixel] = imageData[index + 3];
  }
  state.mapAlphaMask = { width, height, scale, data: alpha };
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
  state.interactionFastUntil = Math.max(state.interactionFastUntil, performance.now() + duration);
  scheduleInteractionIdleRedraw(duration + 20);
}

function scheduleInteractionIdleRedraw(delay = 160) {
  if (state.interactionIdleTimer) return;
  state.interactionIdleTimer = window.setTimeout(() => {
    state.interactionIdleTimer = null;
    const remaining = state.interactionFastUntil - performance.now();
    if (remaining > 0) {
      scheduleInteractionIdleRedraw(Math.min(220, Math.max(32, remaining + 20)));
      return;
    }
    state.interactionFastUntil = 0;
    queueDraw();
  }, delay);
}

function renderEditorState() {
  const school = getSelectedSchool();
  els.zoomReadout.hidden = false;
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
  for (const input of els.editorColorInputs) {
    const color = input.dataset.editorColorInput === "source" ? state.sourceColor : state.brushColor;
    if (input.value.toLowerCase() !== color.toLowerCase()) input.value = color;
  }
  renderPalettes();
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
      visible: region.visible !== false,
      eraseAreas: getRegionEraseAreas(region).length
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

function getRegionEraseAreas(region) {
  return Array.isArray(region?.eraseAreas) ? region.eraseAreas : [];
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

function isInsideBuildingView() {
  return !state.editorEnabled && state.gameData.location.kind === "building";
}

function onWheel(event) {
  if (!state.mapImage) return;
  event.preventDefault();
  if (isInsideBuildingView()) return;
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
    if (getSelectedStructureObject()) state.activeStroke = createStructureEraseStroke(imagePoint);
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
    updateCanvasCursor();
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
    if (!state.gamePinch.active) {
      state.gameTouches.clear();
      state.gamePointerDown = null;
    }
    updateCanvasCursor();
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
    els.mapCanvas.style.cursor = state.gamePointerDown ? "grabbing" : "grab";
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

function onPointerCancel(event) {
  if (!state.editorEnabled) {
    state.gameTouches.delete(event.pointerId);
    if (!state.gameTouches.size) {
      resetGamePinch();
    }
    state.gamePointerDown = null;
    updateCanvasCursor();
    return;
  }
  markMapInteraction(80);
  state.pointer.touches.clear();
  state.pointer.down = false;
  state.activeStroke = null;
  queueDraw();
}

function onCanvasClick(event) {
  if (!state.mapImage || state.editorEnabled) return;
  if (performance.now() - state.lastGamePointerClickHandledAt < 220) return;
  const point = getCanvasPoint(event);
  handleGameCanvasClick(point);
}

function startPinchGesture() {
  if (isInsideBuildingView()) return;
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
  if (isInsideBuildingView()) return;
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

function resetGamePinch() {
  state.gamePinch = {
    active: false,
    startDistance: 0,
    startScale: 1,
    anchor: null,
    moved: false
  };
}

function startGamePinchGesture() {
  if (isInsideBuildingView()) return;
  const points = [...state.gameTouches.values()].slice(0, 2);
  if (points.length < 2) return;
  const center = {
    x: (points[0].x + points[1].x) / 2,
    y: (points[0].y + points[1].y) / 2
  };
  state.gamePinch = {
    active: true,
    startDistance: Math.max(1, distance(points[0], points[1])),
    startScale: state.view.scale,
    anchor: {
      screen: center,
      image: screenToImage(center.x, center.y)
    },
    moved: false
  };
  state.gamePointerDown = null;
  clearMoveTarget();
  markMapInteraction(160);
  updateCanvasCursor();
}

function updateGamePinchGesture() {
  if (isInsideBuildingView()) return;
  const points = [...state.gameTouches.values()].slice(0, 2);
  if (points.length < 2 || !state.gamePinch.active || !state.gamePinch.anchor) return;
  const currentDistance = Math.max(1, distance(points[0], points[1]));
  const factor = currentDistance / Math.max(1, state.gamePinch.startDistance);
  const center = {
    x: (points[0].x + points[1].x) / 2,
    y: (points[0].y + points[1].y) / 2
  };
  const nextScale = clamp(state.gamePinch.startScale * factor, state.view.minScale, state.view.maxScale);
  if (Math.abs(nextScale - state.view.scale) > 0.001 || distance(center, state.gamePinch.anchor.screen) > 1.5) {
    state.gamePinch.moved = true;
  }
  const anchor = state.gamePinch.anchor.image;
  state.view.scale = nextScale;
  state.view.x = center.x - anchor.x * state.view.scale;
  state.view.y = center.y - anchor.y * state.view.scale;
  clampView();
  markMapInteraction(120);
  queueDraw();
}

function finishGamePinchGesture() {
  if (state.gamePinch.active || state.gamePinch.moved) {
    state.lastGamePointerClickHandledAt = performance.now();
  }
  resetGamePinch();
  updateCanvasCursor();
  queueDraw();
}

function handleGamePointerDown(event) {
  markMapInteraction(120);
  const point = getCanvasPoint(event);
  state.gameTouches.set(event.pointerId, point);
  if (state.gameTouches.size >= 2) {
    els.mapCanvas.setPointerCapture?.(event.pointerId);
    startGamePinchGesture();
    return;
  }
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
  updateCanvasCursor();
}

function handleGamePointerMove(event, point = getCanvasPoint(event)) {
  if (state.gameTouches.has(event.pointerId)) {
    state.gameTouches.set(event.pointerId, point);
  }
  if (state.gamePinch.active || state.gameTouches.size >= 2) {
    if (!state.gamePinch.active) startGamePinchGesture();
    updateGamePinchGesture();
    return;
  }
  if (!state.gamePointerDown || state.gamePointerDown.pointerId !== event.pointerId) {
    updateCanvasCursor();
    return;
  }
  const dx = point.x - state.gamePointerDown.startX;
  const dy = point.y - state.gamePointerDown.startY;
  state.gamePointerDown.lastX = point.x;
  state.gamePointerDown.lastY = point.y;
  state.gamePointerDown.moved = Math.hypot(dx, dy) > GAME_CLICK_MOVE_TOLERANCE;
  updateCanvasCursor();
}

function handleGamePointerUp(event) {
  const wasPinching = state.gamePinch.active || state.gamePinch.moved || state.gameTouches.size >= 2;
  state.gameTouches.delete(event.pointerId);
  if (wasPinching) {
    els.mapCanvas.releasePointerCapture?.(event.pointerId);
    if (state.gameTouches.size >= 2) {
      startGamePinchGesture();
    } else {
      state.gamePointerDown = null;
      finishGamePinchGesture();
    }
    return;
  }
  const pointer = state.gamePointerDown;
  if (!pointer || pointer.pointerId !== event.pointerId) return;
  state.gameTouches.delete(event.pointerId);
  els.mapCanvas.releasePointerCapture?.(event.pointerId);
  state.lastGamePointerClickHandledAt = performance.now();
  if (!pointer.moved) {
    const point = getCanvasPoint(event);
    handleGameCanvasClick(point);
  }
  state.gamePointerDown = null;
  updateCanvasCursor();
  queueDraw();
}

function handleGameCanvasClick(canvasPoint) {
  if (state.gameData.location.kind === "building") {
    setInteriorMoveTargetFromClick(canvasPoint);
    return;
  }
  const imagePoint = clampImagePoint(screenToImage(canvasPoint.x, canvasPoint.y));
  setMoveTargetFromClick(imagePoint);
}

function setInteriorMoveTargetFromClick(canvasPoint) {
  if (!canvasPoint) return;
  const target = screenToInterior(canvasPoint.x, canvasPoint.y);
  setMoveTarget(target);
  state.movementKeys.clear();
  const building = getSelectedBuildingMemory();
  if (building?.rooms?.length) {
    const cell = getInteriorCellForPoint(target, building);
    if (cell?.room) {
      state.gameData.selectedRoomId = cell.room.id;
      state.gameData.location.roomId = cell.room.id;
      state.gameData.selectedItemId = "";
      state.gameData.selectedPersonId = "";
      renderGamePanel({ force: true });
    }
  }
  startGameLoop();
  queueDraw();
}

function setMoveTargetFromClick(imagePoint) {
  const target = findMoveTargetNear(imagePoint);
  if (!target) {
    clearMoveTarget();
    queueDraw();
    return;
  }
  setMoveTarget(target);
  state.movementKeys.clear();
  updateNearbyGameContext();
  renderGamePanel();
  startGameLoop();
  queueDraw();
}

function findMoveTargetNear(point) {
  const clamped = clampImagePoint(point);
  const player = state.gameData.player;
  if (isClickableMoveTarget(clamped)) return clamped;
  const lineTarget = findWalkableTargetAlongPlayerLine(player, clamped);
  if (lineTarget) return lineTarget;
  return findNearestWalkableClickTarget(clamped, MOVE_TARGET_SEARCH_RADIUS, player);
}

function findNearestWalkableClickTarget(point, maxRadius, origin = state.gameData.player) {
  const step = Math.max(8, getPlayerCollisionRadius() * 0.5);
  let best = null;
  let bestDistance = Infinity;
  for (let radius = step; radius <= maxRadius; radius += step) {
    const samples = Math.max(12, Math.ceil((Math.PI * 2 * radius) / step));
    for (let index = 0; index < samples; index++) {
      const angle = (index / samples) * Math.PI * 2;
      const candidate = clampImagePoint({
        x: point.x + Math.cos(angle) * radius,
        y: point.y + Math.sin(angle) * radius
      });
      const d = distance(point, candidate);
      if (d >= bestDistance || !isClickableMoveTarget(candidate)) continue;
      best = candidate;
      bestDistance = d;
    }
    if (best) return best;
  }
  return null;
}

function isClickableMoveTarget(target) {
  return canPlayerMoveTo(target);
}

function isStartableMoveTarget(target, origin = state.gameData.player) {
  if (!canPlayerMoveTo(target)) return false;
  if (!origin || distance(origin, target) <= MOVE_TARGET_STOP_DISTANCE) return true;
  const direction = normalizeVector({ x: target.x - origin.x, y: target.y - origin.y });
  if (!direction) return true;
  return Boolean(resolvePlayerMove(origin, direction, MOVE_TARGET_START_SAMPLE_DISTANCE));
}

function findStartableMoveTarget(target, origin = state.gameData.player) {
  if (isStartableMoveTarget(target, origin)) return target;
  return findWalkableTargetAlongPlayerLine(origin, target)
    || findNearestWalkableClickTarget(target, Math.min(MOVE_TARGET_SEARCH_RADIUS, 64), origin);
}

function findWalkableTargetAlongPlayerLine(origin, target) {
  if (!origin) return null;
  const dx = target.x - origin.x;
  const dy = target.y - origin.y;
  const length = Math.hypot(dx, dy);
  if (length <= MOVE_TARGET_STOP_DISTANCE) return isClickableMoveTarget(target) ? target : null;
  const step = Math.max(8, getPlayerCollisionRadius(origin) * 0.5);
  for (let remaining = length; remaining >= MOVE_TARGET_STOP_DISTANCE; remaining -= step) {
    const t = remaining / length;
    const candidate = clampImagePoint({
      x: origin.x + dx * t,
      y: origin.y + dy * t
    });
    if (isClickableMoveTarget(candidate)) return candidate;
  }
  return null;
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
    objectId: getSelectedStructureObject()?.id || "",
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
    applyStructureEraseStroke(stroke);
  }
  state.structureObjectListKey = "";
  renderEditorState();
  queueDraw();
}

function applyStructureEraseStroke(stroke) {
  const selected = stroke.objectId ? getSelectedEditData().structureRegions.find((region) => region.id === stroke.objectId) : getSelectedStructureObject();
  if (!selected || !stroke.points.length) return;
  const eraseArea = {
    kind: "line",
    points: stroke.points.map((point) => ({ ...point })),
    width: Math.max(1, Number(stroke.size) || state.structureBrushSize)
  };
  selected.eraseAreas = [...getRegionEraseAreas(selected), eraseArea];
  selected.updatedAt = new Date().toISOString();
  state.structureDraftActions.push({ id: createId("sact"), kind: "eraseArea", objectId: selected.id, area: eraseArea });
  markStructureLayerDirty();
  persistEditData();
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
  const normalizedType = TYPE_STYLES[type] ? type : "custom";
  const defaultColor = TYPE_STYLES[normalizedType]?.line || TYPE_STYLES.custom.line;
  const region = {
    id: createId("region"),
    name: els.structureObjectNameInput.value.trim() || getStructureObjectFallbackName(null),
    type: normalizedType,
    walkable: normalizedType === "custom" ? els.structureObjectWalkableInput.checked : TYPE_STYLES[normalizedType]?.walkable ?? true,
    color: getStructureObjectInputColor(normalizedType, "", defaultColor),
    visible: true,
    polygon: [],
    areas: [],
    eraseAreas: [],
    createdAt: new Date().toISOString()
  };
  editData.structureRegions.push(region);
  state.selectedStructureObjectId = region.id;
  state.activeTool = isLinearStructureType(normalizedType) ? "structureLine" : "structurePolygon";
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
  const previousType = selected.type || "custom";
  const type = els.structureObjectTypeInput.value || "custom";
  selected.name = els.structureObjectNameInput.value.trim() || getStructureObjectFallbackName(selected, { excludeId: selected.id });
  selected.type = TYPE_STYLES[type] ? type : "custom";
  selected.walkable = selected.type === "custom" ? els.structureObjectWalkableInput.checked : TYPE_STYLES[selected.type]?.walkable ?? true;
  const defaultColor = TYPE_STYLES[selected.type]?.line || TYPE_STYLES.custom.line;
  selected.color = getStructureObjectInputColor(selected.type, previousType, selected.color || defaultColor);
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

function getStructureObjectInputColor(type, previousType, fallbackColor) {
  const defaultColor = TYPE_STYLES[type]?.line || TYPE_STYLES.custom.line;
  const inputColor = els.structureObjectColorInput.value || "";
  const defaultColors = new Set(Object.values(TYPE_STYLES).map((style) => style.line));
  const previousDefaultColor = TYPE_STYLES[previousType]?.line || "";
  if (!inputColor) return fallbackColor || defaultColor;
  if (type !== previousType && (inputColor === previousDefaultColor || defaultColors.has(inputColor))) return defaultColor;
  return inputColor;
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
  if (!points?.length) return null;
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

function isPointInRegion(point, region) {
  if (!getRegionAreas(region).some((area) => isPointInStructureArea(point, area, region))) return false;
  return !getRegionEraseAreas(region).some((area) => isPointInArea(point, area));
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
  const regions = includeHidden ? editData.structureRegions : getStructureRegionCandidatesNear(point);
  const strokes = includeHidden ? editData.judgementStrokes : getJudgementStrokeCandidatesNear(point);
  for (const region of regions) {
    if (!includeHidden && region.visible === false) continue;
    if (!includeHidden && !isPointNearStructureRegionBounds(point, region)) continue;
    if (!isPointInRegion(point, region)) continue;
    hits.push({
      id: region.id,
      name: region.name || "",
      type: region.type || "custom",
      walkable: getStructureTypeWalkable(region.type, region.walkable),
      displayRank: getStructureDisplayRank(region.type),
      walkRank: getStructureWalkRank(region.type)
    });
  }
  for (const stroke of strokes) {
    if (!includeHidden && !stroke.objectId) continue;
    if (!includeHidden && stroke.objectId && !visibleObjects.has(stroke.objectId)) continue;
    if (!includeHidden && !isPointNearJudgementStrokeBounds(point, stroke)) continue;
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
  hits.sort((a, b) => b.walkRank - a.walkRank || b.displayRank - a.displayRank);
  const top = hits[0] || null;
  const walkableHit = hits.find((hit) => hit.walkable) || null;
  const priorityHit = hits.find((hit) => hit.walkable && isPriorityPathType(hit.type)) || null;
  return {
    walkable: top ? top.walkable : true,
    top,
    walkableHit,
    priorityHit,
    hits
  };
}

function isPointNearStructureRegionBounds(point, region, padding = 0) {
  const bounds = getStructureRegionBounds(region);
  return Boolean(bounds && point.x >= bounds.left - padding && point.x <= bounds.right + padding && point.y >= bounds.top - padding && point.y <= bounds.bottom + padding);
}

function isPointNearJudgementStrokeBounds(point, stroke, padding = 0) {
  const bounds = getJudgementStrokeBounds(stroke);
  return Boolean(bounds && point.x >= bounds.left - padding && point.x <= bounds.right + padding && point.y >= bounds.top - padding && point.y <= bounds.bottom + padding);
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

function distanceToStroke(point, stroke) {
  const points = stroke?.points || [];
  if (!points.length) return Infinity;
  const radius = Math.max(0.5, (Number(stroke.size) || STRUCTURE_BRUSH_SIZE) / 2);
  if (points.length === 1) return Math.max(0, distance(point, points[0]) - radius);
  let best = Infinity;
  for (let index = 1; index < points.length; index++) {
    best = Math.min(best, distanceToSegment(point, points[index - 1], points[index]));
  }
  return Math.max(0, best - radius);
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
        .filter(Boolean),
      eraseAreas: getRegionEraseAreas(region)
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
    areas: getRegionAreas(region).map((area) => rotateArea(area, rotation, sourceSize)).filter(Boolean),
    eraseAreas: getRegionEraseAreas(region).map((area) => rotateArea(area, rotation, sourceSize)).filter(Boolean)
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
  } else if (action.kind === "eraseArea") {
    const region = getSelectedEditData().structureRegions.find((item) => item.id === action.objectId);
    if (!region) return;
    const eraseAreas = getRegionEraseAreas(region);
    eraseAreas.pop();
    region.eraseAreas = eraseAreas;
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
  drawExplorationGridOverlay(ctx);
  drawGamePhotoMarkers(ctx);
  drawNearbyBuildingHints(ctx, editData);
  drawMoveTarget(ctx);
  drawPlayer(ctx);
  drawGameDepthSortedMapCards(ctx, editData);
}

function drawExplorationGridOverlay(ctx) {
  if (state.gameData.settings.showExplorationGrid !== true) return;
  const progress = getExplorationProgress();
  if (!progress.gridSize || !progress.cells.length) return;
  ctx.save();
  ctx.lineWidth = 1;
  for (let row = 0; row < progress.rows; row++) {
    for (let col = 0; col < progress.columns; col++) {
      const cell = progress.cells[row * progress.columns + col];
      if (!cell?.valid) continue;
      const bounds = getExplorationCellBounds(col, row, progress.gridSize, state.mapNaturalSize.width, state.mapNaturalSize.height);
      const topLeft = imageToScreen({ x: bounds.left, y: bounds.top });
      const bottomRight = imageToScreen({ x: bounds.right, y: bounds.bottom });
      const width = bottomRight.x - topLeft.x;
      const height = bottomRight.y - topLeft.y;
      if (topLeft.x > state.canvasSize.width || topLeft.y > state.canvasSize.height || bottomRight.x < 0 || bottomRight.y < 0) continue;
      ctx.fillStyle = cell.lit ? "rgba(93, 152, 75, 0.24)" : "rgba(255, 250, 240, 0.22)";
      ctx.strokeStyle = cell.lit ? "rgba(93, 152, 75, 0.62)" : "rgba(162, 61, 52, 0.32)";
      ctx.fillRect(topLeft.x, topLeft.y, width, height);
      ctx.strokeRect(topLeft.x + 0.5, topLeft.y + 0.5, Math.max(0, width - 1), Math.max(0, height - 1));
    }
  }
  ctx.restore();
}

function drawGamePhotoMarkers(ctx) {
  const showAnnotations = showMapAnnotations();
  const playerRadius = state.gameData.player.radius || DEFAULT_PLAYER_RADIUS;
  const spots = [...state.gameData.photoSpots].sort(compareMapDepthItems);
  for (const spot of spots) {
    const screen = imageToScreen(spot);
    const radius = Math.max(7, (spot.radius || playerRadius) * state.view.scale * 0.36);
    if (screen.x < -radius || screen.y < -radius || screen.x > state.canvasSize.width + radius || screen.y > state.canvasSize.height + radius) continue;
    const active = spot.id === state.gameData.selectedPhotoSpotId || spot.id === state.currentNearbyPhotoSpotId;
    if (!active && !showAnnotations) continue;
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
    ctx.restore();
  }
}

function drawNearbyBuildingHints(ctx, editData) {
  const nearby = new Set(state.currentNearbyBuildingIds);
  const showNames = showMapAnnotations();
  if (!nearby.size && !showNames) return;
  for (const region of editData.structureRegions || []) {
    if (region.visible === false || !isInteractiveStructureType(region.type || "custom")) continue;
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
  }
}

function drawGameDepthSortedMapCards(ctx, editData) {
  const nearby = new Set(state.currentNearbyBuildingIds);
  const showNames = showMapAnnotations();
  if (!showNames) return;
  const cards = [];
  const playerRadius = state.gameData.player.radius || DEFAULT_PLAYER_RADIUS;

  for (const region of editData.structureRegions || []) {
    if (region.visible === false || !isInteractiveStructureType(region.type || "custom")) continue;
    const bounds = getRegionLabelBounds(getRegionAreas(region));
    if (!bounds) continue;
    const anchor = {
      x: (bounds.left + bounds.right) / 2,
      y: (bounds.top + bounds.bottom) / 2
    };
    cards.push({
      kind: "building",
      id: region.id,
      mapX: anchor.x,
      mapY: bounds.bottom,
      order: cards.length,
      draw: () => {
        const center = imageToScreen(anchor);
        const isNearby = nearby.has(region.id);
        const selected = region.id === state.gameData.selectedBuildingId;
        drawBuildingMarkerCard(ctx, region, center, {
          selected,
          nearby: isNearby,
          maxWidth: 340,
          font: "800 13px Microsoft YaHei, sans-serif"
        });
      }
    });
  }

  for (const spot of state.gameData.photoSpots) {
    const screen = imageToScreen(spot);
    const radius = Math.max(7, (spot.radius || playerRadius) * state.view.scale * 0.36);
    if (screen.x < -radius || screen.y < -radius || screen.x > state.canvasSize.width + radius || screen.y > state.canvasSize.height + radius) continue;
    const active = spot.id === state.gameData.selectedPhotoSpotId || spot.id === state.currentNearbyPhotoSpotId;
    cards.push({
      kind: "photoSpot",
      id: spot.id,
      mapX: spot.x,
      mapY: spot.y,
      order: cards.length,
      draw: () => {
        drawPhotoSpotMarkerCard(ctx, spot, screen, {
          selected: active,
          nearby: active,
          yOffset: -radius - 8
        });
      }
    });
  }

  cards.sort(compareMapDepthItems).forEach((card) => card.draw());
}

function compareMapDepthItems(a, b) {
  const dy = (Number(a.mapY ?? a.y) || 0) - (Number(b.mapY ?? b.y) || 0);
  if (Math.abs(dy) > 0.001) return dy;
  const dx = (Number(a.mapX ?? a.x) || 0) - (Number(b.mapX ?? b.x) || 0);
  if (Math.abs(dx) > 0.001) return dx;
  return (Number(a.order) || 0) - (Number(b.order) || 0);
}

function drawPhotoSpotMarkerCard(ctx, spot, screen, options = {}) {
  const label = getPhotoSpotDisplayName(spot);
  const firstPhotoEntry = getMapMarkerPhotoEntries(spot).slice(0, 1);
  const gallery = getMapMarkerGalleryLayout(firstPhotoEntry, {
    maxThumbWidth: 210,
    maxThumbHeight: 150
  });
  ctx.save();
  ctx.font = "800 12px Microsoft YaHei, sans-serif";
  const labelWidth = Math.min(ctx.measureText(label).width + 20, 220);
  const hasGallery = gallery.width > 0;
  const countLabel = `${spot.photos?.length || 0}张`;
  const countWidth = ctx.measureText(countLabel).width + 20;
  let width = Math.max(92, labelWidth, countWidth, hasGallery ? gallery.width + 18 : 0);
  const maxWidth = Math.max(options.maxWidth || 230, hasGallery ? gallery.width + 18 : 0);
  width = Math.min(width, maxWidth);
  const titleHeight = hasGallery ? 20 : 26;
  const height = titleHeight + (hasGallery ? gallery.height + 10 : 18);
  const x = screen.x - width / 2;
  const y = screen.y + (options.yOffset || -46) - height;
  const selected = Boolean(options.selected);
  ctx.fillStyle = selected ? "rgba(31, 85, 78, 0.94)" : "rgba(255, 250, 240, 0.88)";
  ctx.strokeStyle = selected ? "rgba(31, 85, 78, 0.38)" : "rgba(31, 85, 78, 0.18)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(x, y, width, height, 7);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = selected ? "#fffaf0" : "#1d2a24";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = hasGallery ? "800 11px Microsoft YaHei, sans-serif" : ctx.font;
  ctx.fillText(label, screen.x, y + titleHeight / 2 + 1, width - 10);
  let cursorY = y + titleHeight;
  if (hasGallery) {
    drawMapMarkerGallery(ctx, gallery, screen.x, cursorY + 5, { selected, showLabels: false });
  } else {
    ctx.fillStyle = selected ? "rgba(255, 250, 240, 0.82)" : "rgba(31, 85, 78, 0.72)";
    ctx.font = "800 10px Microsoft YaHei, sans-serif";
    ctx.fillText(countLabel, screen.x, cursorY + 8, width - 10);
  }
  ctx.restore();
}

function drawBuildingMarkerCard(ctx, region, screen, options = {}) {
  const building = state.gameData.buildings[region.id] || null;
  const label = getStructureInteractionLabel(region);
  const gallery = getMapMarkerGalleryLayout(getBuildingMapPhotoEntries(building), {
    hero: true,
    heroMaxWidth: 286,
    heroMaxHeight: 182,
    restMaxWidth: 92,
    restMaxHeight: 68,
    restColumns: 3,
    gap: 6
  });
  const people = showMapAnnotations() ? getBuildingPeople(building) : [];
  const font = options.font || "800 13px Microsoft YaHei, sans-serif";
  ctx.save();
  ctx.font = font;
  const labelWidth = Math.min(ctx.measureText(label).width + 20, options.maxWidth || 220);
  let width = Math.max(84, labelWidth);
  const hasGallery = gallery.width > 0;
  if (hasGallery) width = Math.max(width, gallery.width + 18);
  if (people.length) width = Math.max(width, 168);
  const maxWidth = Math.max(options.maxWidth || 320, hasGallery ? gallery.width + 18 : 0);
  width = Math.min(width, maxWidth);
  const peopleHeight = people.length ? 28 + Math.ceil(people.length / 2) * 20 : 0;
  const titleHeight = hasGallery ? 20 : 26;
  const height = titleHeight + (hasGallery ? gallery.height + 10 : 0) + peopleHeight;
  const x = screen.x - width / 2;
  const y = screen.y - height / 2;
  const selected = Boolean(options.selected);
  const nearby = Boolean(options.nearby);
  ctx.fillStyle = selected ? "rgba(31, 85, 78, 0.94)" : nearby ? "rgba(255, 250, 240, 0.92)" : "rgba(255, 250, 240, 0.84)";
  ctx.strokeStyle = selected ? "rgba(31, 85, 78, 0.38)" : "rgba(31, 85, 78, 0.18)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(x, y, width, height, 7);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = selected ? "#fffaf0" : "#1d2a24";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = hasGallery ? "800 11px Microsoft YaHei, sans-serif" : font;
  ctx.fillText(label, screen.x, y + titleHeight / 2 + 1, width - 10);
  let cursorY = y + titleHeight;
  if (hasGallery) {
    drawMapMarkerGallery(ctx, gallery, screen.x, cursorY + 5, { selected, showLabels: false });
    cursorY += gallery.height + 12;
  }
  if (people.length) {
    drawPeopleMarkerList(ctx, people, screen.x, cursorY + 4, {
      maxWidth: width - 12,
      compact: true,
      selected,
      limit: people.length
    });
  }
  ctx.restore();
}

function drawPeopleMarkerList(ctx, entries, centerX, y, options = {}) {
  const visibleEntries = (entries || []).slice(0, options.limit || 4);
  if (!visibleEntries.length) return 0;
  const lineHeight = options.compact ? 20 : 24;
  const columns = visibleEntries.length > 2 ? 2 : 1;
  const columnWidth = Math.min(92, Math.max(68, (options.maxWidth || 180) / columns));
  const startX = centerX - (columns * columnWidth) / 2;
  visibleEntries.forEach((entry, index) => {
    const col = index % columns;
    const row = Math.floor(index / columns);
    const x = startX + col * columnWidth;
    const rowY = y + row * lineHeight;
    drawPersonMarker(ctx, entry.person, entry.room, x, rowY, {
      width: columnWidth - 4,
      selected: options.selected
    });
  });
  const hiddenCount = Math.max(0, (entries || []).length - visibleEntries.length);
  if (hiddenCount) {
    ctx.save();
    ctx.fillStyle = options.selected ? "rgba(255, 250, 240, 0.88)" : "rgba(31, 85, 78, 0.72)";
    ctx.font = "800 10px Microsoft YaHei, sans-serif";
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    ctx.fillText(`+${hiddenCount}`, centerX + (options.maxWidth || 180) / 2 - 8, y + Math.ceil(visibleEntries.length / columns) * lineHeight - 10);
    ctx.restore();
  }
  return Math.ceil(visibleEntries.length / columns) * lineHeight;
}

function drawPersonMarker(ctx, person, room, x, y, options = {}) {
  const avatarSize = options.avatarSize || 16;
  const label = getPersonMarkerLabel(person, room);
  const image = person?.photo ? getCachedPhotoImage(person.photo) : null;
  ctx.save();
  ctx.beginPath();
  ctx.arc(x + avatarSize / 2, y + avatarSize / 2, avatarSize / 2, 0, Math.PI * 2);
  ctx.fillStyle = "#f4d799";
  ctx.fill();
  if (image && isPhotoImageReady(image)) {
    ctx.clip();
    drawCoverImage(ctx, image, x, y, avatarSize, avatarSize);
  }
  ctx.restore();
  ctx.save();
  ctx.strokeStyle = options.selected ? "rgba(255, 250, 240, 0.72)" : "rgba(31, 85, 78, 0.34)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(x + avatarSize / 2, y + avatarSize / 2, avatarSize / 2, 0, Math.PI * 2);
  ctx.stroke();
  if (!image || !isPhotoImageReady(image)) {
    ctx.fillStyle = "#1f554e";
    ctx.font = "900 10px Microsoft YaHei, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText((person?.name || person?.type || "人").slice(0, 1), x + avatarSize / 2, y + avatarSize / 2 + 0.5);
  }
  ctx.fillStyle = options.selected ? "#fffaf0" : "#1d2a24";
  ctx.font = "800 10px Microsoft YaHei, sans-serif";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText(label, x + avatarSize + 4, y + avatarSize / 2, Math.max(24, (options.width || 78) - avatarSize - 5));
  ctx.restore();
}

function drawGameLabel(ctx, label, x, y, options = {}) {
  if (!label) return;
  const font = options.font || "800 12px Microsoft YaHei, sans-serif";
  ctx.save();
  ctx.font = font;
  const metrics = ctx.measureText(label);
  const width = Math.min(metrics.width + 18, options.maxWidth || 220);
  const height = options.height || 24;
  const selected = Boolean(options.selected);
  const nearby = Boolean(options.nearby);
  ctx.fillStyle = selected ? "rgba(31, 85, 78, 0.94)" : nearby ? "rgba(255, 250, 240, 0.90)" : "rgba(255, 250, 240, 0.82)";
  ctx.strokeStyle = selected ? "rgba(31, 85, 78, 0.36)" : "rgba(31, 85, 78, 0.18)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(x - width / 2, y - height / 2, width, height, 6);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = selected ? "#fffaf0" : "#1d2a24";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(label, x, y, width - 10);
  ctx.restore();
}

function drawPlayer(ctx) {
  const player = state.gameData.player;
  const screen = imageToScreen(player);
  const radius = Math.max(10, (player.radius || DEFAULT_PLAYER_RADIUS) * state.view.scale);
  const coreRadius = Math.max(5, radius * PLAYER_COLLISION_RADIUS_FACTOR);
  const portraitImage = player.portrait ? getCachedPhotoImage(player.portrait) : null;
  ctx.save();
  ctx.beginPath();
  ctx.arc(screen.x, screen.y, radius, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(255, 250, 240, 0.24)";
  ctx.fill();
  ctx.strokeStyle = "#1f554e";
  ctx.lineWidth = Math.max(2, 2.5 * state.view.scale);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(screen.x, screen.y, coreRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#8dbf59";
  ctx.fill();
  if (portraitImage && isPhotoImageReady(portraitImage)) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(screen.x, screen.y, coreRadius, 0, Math.PI * 2);
    ctx.clip();
    drawCoverImage(ctx, portraitImage, screen.x - coreRadius, screen.y - coreRadius, coreRadius * 2, coreRadius * 2);
    ctx.restore();
    ctx.beginPath();
    ctx.arc(screen.x, screen.y, coreRadius, 0, Math.PI * 2);
    ctx.strokeStyle = "#fffaf0";
    ctx.lineWidth = Math.max(1.5, 1.5 * state.view.scale);
    ctx.stroke();
  }
  ctx.restore();
}

function drawMoveTarget(ctx) {
  if (!state.moveTarget || state.gameData.location.kind !== "campus") return;
  const screen = imageToScreen(state.moveTarget);
  if (screen.x < -40 || screen.y < -40 || screen.x > state.canvasSize.width + 40 || screen.y > state.canvasSize.height + 40) return;
  ctx.save();
  ctx.strokeStyle = "rgba(31, 85, 78, 0.82)";
  ctx.fillStyle = "rgba(255, 250, 240, 0.72)";
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(screen.x, screen.y, 11, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.strokeStyle = "rgba(31, 85, 78, 0.58)";
  ctx.beginPath();
  ctx.moveTo(screen.x - 18, screen.y);
  ctx.lineTo(screen.x - 6, screen.y);
  ctx.moveTo(screen.x + 6, screen.y);
  ctx.lineTo(screen.x + 18, screen.y);
  ctx.moveTo(screen.x, screen.y - 18);
  ctx.lineTo(screen.x, screen.y - 6);
  ctx.moveTo(screen.x, screen.y + 6);
  ctx.lineTo(screen.x, screen.y + 18);
  ctx.stroke();
  ctx.restore();
}

function drawInteriorScene(ctx) {
  const building = getSelectedBuildingMemory();
  const region = getStructureRegionById(state.gameData.location.buildingId);
  const layout = getInteriorRoomLayout(building);
  const rect = getInteriorCanvasRect();
  ctx.save();
  ctx.fillStyle = "#e8e1d3";
  ctx.fillRect(0, 0, state.canvasSize.width, state.canvasSize.height);
  ctx.fillStyle = "#fffaf0";
  ctx.strokeStyle = "#c9bca7";
  ctx.lineWidth = 1;
  ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
  ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
  ctx.save();
  ctx.beginPath();
  ctx.rect(rect.x, rect.y, rect.width, rect.height);
  ctx.clip();
  const rooms = building?.rooms || [];
  if (!rooms.length) {
    ctx.fillStyle = "#f2eadc";
    ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
    ctx.fillStyle = "#1f554e";
    ctx.font = "900 18px Microsoft YaHei, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(getBuildingDisplayName(region, building), rect.x + rect.width / 2, rect.y + rect.height / 2 - 14, rect.width - 40);
    ctx.fillStyle = "rgba(31, 85, 78, 0.68)";
    ctx.font = "800 13px Microsoft YaHei, sans-serif";
    ctx.fillText("在右侧添加场所后，这里会自动划分室内区域", rect.x + rect.width / 2, rect.y + rect.height / 2 + 18, rect.width - 40);
  }
  for (const cell of layout.cells) {
    const room = cell.room;
    const x = rect.x + cell.x * rect.scale;
    const y = rect.y + cell.y * rect.scale;
    const w = cell.width * rect.scale;
    const h = cell.height * rect.scale;
    const active = room.id === state.gameData.selectedRoomId;
    const image = getRepresentativePhotoImage(room);
    ctx.save();
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.clip();
    ctx.fillStyle = active ? "#e8f0e7" : "#f7efe2";
    ctx.fillRect(x, y, w, h);
    if (image && isPhotoImageReady(image)) {
      drawCoverImage(ctx, image, x, y, w, h);
      ctx.fillStyle = active ? "rgba(31, 85, 78, 0.18)" : "rgba(255, 250, 240, 0.12)";
      ctx.fillRect(x, y, w, h);
    } else {
      drawInteriorFloorPattern(ctx, x, y, w, h, cell.index);
    }
    ctx.restore();
    ctx.strokeStyle = active ? "#1f554e" : "rgba(31, 85, 78, 0.28)";
    ctx.lineWidth = active ? 3 : 1.5;
    ctx.strokeRect(x + 0.5, y + 0.5, Math.max(0, w - 1), Math.max(0, h - 1));
    drawInteriorRoomLabel(ctx, room, x, y, w, active);
    drawInteriorRoomEntities(ctx, room, x, y, w, h, active);
  }
  drawInteriorMoveTarget(ctx);
  drawInteriorPlayer(ctx);
  ctx.restore();
  ctx.fillStyle = "rgba(255, 250, 240, 0.88)";
  ctx.strokeStyle = "rgba(31, 85, 78, 0.18)";
  ctx.lineWidth = 1;
  const label = getBuildingDisplayName(region, building);
  ctx.font = "900 14px Microsoft YaHei, sans-serif";
  const labelWidth = Math.min(ctx.measureText(label).width + 22, rect.width - 20);
  ctx.beginPath();
  ctx.roundRect(rect.x + 10, rect.y + 10, labelWidth, 30, 7);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#1f554e";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText(label, rect.x + 21, rect.y + 25, labelWidth - 22);
  ctx.restore();
}

function drawInteriorFloorPattern(ctx, x, y, width, height, index) {
  const colors = ["#f4eadb", "#edf1e5", "#efe7d4", "#e8efe7", "#f1eadf"];
  ctx.fillStyle = colors[index % colors.length];
  ctx.fillRect(x, y, width, height);
  ctx.save();
  ctx.strokeStyle = "rgba(31, 85, 78, 0.06)";
  ctx.lineWidth = 1;
  const step = Math.max(34, Math.min(width, height) / 6);
  for (let px = x; px <= x + width; px += step) {
    ctx.beginPath();
    ctx.moveTo(px, y);
    ctx.lineTo(px, y + height);
    ctx.stroke();
  }
  for (let py = y; py <= y + height; py += step) {
    ctx.beginPath();
    ctx.moveTo(x, py);
    ctx.lineTo(x + width, py);
    ctx.stroke();
  }
  ctx.restore();
}

function drawInteriorRoomLabel(ctx, room, x, y, width, active) {
  const title = getRoomDisplayName(room);
  const type = room?.type && room.type !== title ? room.type : "";
  ctx.save();
  ctx.font = "900 13px Microsoft YaHei, sans-serif";
  const titleWidth = Math.min(width - 16, Math.max(72, ctx.measureText(title).width + (type ? 44 : 18)));
  ctx.fillStyle = active ? "rgba(31, 85, 78, 0.92)" : "rgba(255, 250, 240, 0.88)";
  ctx.strokeStyle = active ? "rgba(31, 85, 78, 0.36)" : "rgba(31, 85, 78, 0.16)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(x + 8, y + 8, titleWidth, 28, 6);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = active ? "#fffaf0" : "#1d2a24";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText(title, x + 17, y + 22, titleWidth - (type ? 50 : 16));
  if (type) {
    ctx.fillStyle = active ? "rgba(255, 250, 240, 0.78)" : "rgba(31, 85, 78, 0.70)";
    ctx.font = "800 10px Microsoft YaHei, sans-serif";
    ctx.textAlign = "right";
    ctx.fillText(type, x + 8 + titleWidth - 8, y + 22, 42);
  }
  ctx.restore();
}

function drawInteriorRoomEntities(ctx, room, x, y, width, height, active) {
  const people = room?.people || [];
  const items = room?.items || [];
  const entries = [
    ...people.map((person) => ({ kind: "person", person })),
    ...items.slice(0, 4).map((item) => ({ kind: "item", item }))
  ].slice(0, 10);
  if (!entries.length) return;
  const size = Math.max(20, Math.min(34, Math.min(width, height) / 9));
  const gap = 6;
  const cols = Math.max(1, Math.min(entries.length, Math.floor((width - 18) / (size + gap))));
  const startX = x + 10;
  const startY = y + height - Math.ceil(entries.length / cols) * (size + gap) - 10;
  ctx.save();
  entries.forEach((entry, index) => {
    const col = index % cols;
    const row = Math.floor(index / cols);
    const px = startX + col * (size + gap);
    const py = startY + row * (size + gap);
    if (entry.kind === "person") {
      drawPersonMarker(ctx, entry.person, room, px, py, {
        avatarSize: size,
        width: size,
        selected: active
      });
    } else {
      const image = getRepresentativePhotoImage(entry.item);
      ctx.beginPath();
      ctx.roundRect(px, py, size, size, 6);
      ctx.fillStyle = active ? "rgba(255, 250, 240, 0.90)" : "rgba(255, 250, 240, 0.78)";
      ctx.fill();
      if (image && isPhotoImageReady(image)) {
        ctx.save();
        ctx.beginPath();
        ctx.roundRect(px, py, size, size, 6);
        ctx.clip();
        drawCoverImage(ctx, image, px, py, size, size);
        ctx.restore();
      } else {
        ctx.fillStyle = "#1f554e";
        ctx.font = `900 ${Math.max(10, size * 0.42)}px Microsoft YaHei, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText((entry.item?.name || entry.item?.type || "物").slice(0, 1), px + size / 2, py + size / 2 + 0.5);
      }
      ctx.strokeStyle = active ? "rgba(31, 85, 78, 0.62)" : "rgba(31, 85, 78, 0.28)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(px, py, size, size, 6);
      ctx.stroke();
    }
  });
  ctx.restore();
}

function drawInteriorPlayer(ctx) {
  const building = getSelectedBuildingMemory();
  if (!building) return;
  const player = getInteriorPlayer(building);
  const screen = interiorToScreen(player);
  const rect = getInteriorCanvasRect();
  const radius = Math.max(11, INTERIOR_PLAYER_RADIUS * rect.scale);
  const coreRadius = Math.max(6, radius * PLAYER_COLLISION_RADIUS_FACTOR);
  const portraitImage = state.gameData.player.portrait ? getCachedPhotoImage(state.gameData.player.portrait) : null;
  ctx.save();
  ctx.beginPath();
  ctx.arc(screen.x, screen.y, radius, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(255, 250, 240, 0.24)";
  ctx.fill();
  ctx.strokeStyle = "#1f554e";
  ctx.lineWidth = 2.5;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(screen.x, screen.y, coreRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#8dbf59";
  ctx.fill();
  if (portraitImage && isPhotoImageReady(portraitImage)) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(screen.x, screen.y, coreRadius, 0, Math.PI * 2);
    ctx.clip();
    drawCoverImage(ctx, portraitImage, screen.x - coreRadius, screen.y - coreRadius, coreRadius * 2, coreRadius * 2);
    ctx.restore();
    ctx.beginPath();
    ctx.arc(screen.x, screen.y, coreRadius, 0, Math.PI * 2);
    ctx.strokeStyle = "#fffaf0";
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }
  ctx.restore();
}

function drawInteriorMoveTarget(ctx) {
  if (!state.moveTarget || state.gameData.location.kind !== "building") return;
  const screen = interiorToScreen(state.moveTarget);
  const rect = getInteriorCanvasRect();
  if (screen.x < rect.x - 30 || screen.y < rect.y - 30 || screen.x > rect.x + rect.width + 30 || screen.y > rect.y + rect.height + 30) return;
  ctx.save();
  ctx.strokeStyle = "rgba(31, 85, 78, 0.78)";
  ctx.fillStyle = "rgba(255, 250, 240, 0.68)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(screen.x, screen.y, 10, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(screen.x - 16, screen.y);
  ctx.lineTo(screen.x - 5, screen.y);
  ctx.moveTo(screen.x + 5, screen.y);
  ctx.lineTo(screen.x + 16, screen.y);
  ctx.moveTo(screen.x, screen.y - 16);
  ctx.lineTo(screen.x, screen.y - 5);
  ctx.moveTo(screen.x, screen.y + 5);
  ctx.lineTo(screen.x, screen.y + 16);
  ctx.stroke();
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
    .map((region) => `${region.id}:${region.visible !== false}:${getRegionAreaCount(region)}:${getRegionEraseAreas(region).length}:${region.type}:${region.color || ""}`)
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
  eraseStructureRegionAreasOnImage(ctx, region);
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
  eraseStructureRegionAreas(ctx, region);
  ctx.restore();
}

function eraseStructureRegionAreasOnImage(ctx, region) {
  const eraseAreas = getRegionEraseAreas(region);
  if (!eraseAreas.length) return;
  ctx.save();
  ctx.globalCompositeOperation = "destination-out";
  ctx.fillStyle = "#000";
  ctx.strokeStyle = "#000";
  for (const area of eraseAreas) {
    drawImageEraseArea(ctx, area);
  }
  ctx.restore();
}

function eraseStructureRegionAreas(ctx, region) {
  const eraseAreas = getRegionEraseAreas(region);
  if (!eraseAreas.length) return;
  ctx.save();
  ctx.globalCompositeOperation = "destination-out";
  ctx.fillStyle = "#000";
  ctx.strokeStyle = "#000";
  for (const area of eraseAreas) {
    drawScreenEraseArea(ctx, area);
  }
  ctx.restore();
}

function drawImageEraseArea(ctx, area) {
  if (!area) return;
  if (area.kind === "pixels") {
    for (const run of area.pixels || []) ctx.fillRect(run.x, run.y, run.length, 1);
    return;
  }
  if (area.kind === "line") {
    ctx.lineWidth = Math.max(1, Number(area.width) || LINEAR_STRUCTURE_WIDTH);
    makeImageAreaPath(ctx, area);
    ctx.stroke();
    return;
  }
  makeImageAreaPath(ctx, area);
  ctx.fill();
}

function drawScreenEraseArea(ctx, area) {
  if (!area) return;
  if (area.kind === "pixels") {
    for (const run of area.pixels || []) drawPixelRun(ctx, run);
    return;
  }
  if (area.kind === "line") {
    ctx.lineWidth = Math.max(1, (Number(area.width) || LINEAR_STRUCTURE_WIDTH) * state.view.scale);
    drawScreenAreaPath(ctx, area);
    ctx.stroke();
    return;
  }
  drawScreenAreaPath(ctx, area);
  ctx.fill();
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
  const showAnnotations = settings.showPhotoMarkers !== false
    && settings.showInteractionMarkers !== false
    && settings.showPeopleMarkers !== false;
  base.settings.showPhotoMarkers = showAnnotations;
  base.settings.showInteractionMarkers = showAnnotations;
  base.settings.showPeopleMarkers = showAnnotations;
  base.settings.showExplorationGrid = settings.showExplorationGrid === true;
  const location = source.location && typeof source.location === "object" ? source.location : {};
  const locationKind = location.kind === "building" || location.kind === "room" ? "building" : "campus";
  base.location = {
    kind: locationKind,
    buildingId: typeof location.buildingId === "string" ? location.buildingId : "",
    roomId: typeof location.roomId === "string" ? location.roomId : ""
  };
  base.selectedPhotoSpotId = typeof source.selectedPhotoSpotId === "string" ? source.selectedPhotoSpotId : "";
  base.selectedBuildingId = typeof source.selectedBuildingId === "string" ? source.selectedBuildingId : "";
  base.selectedSpotPhotoId = typeof source.selectedSpotPhotoId === "string" ? source.selectedSpotPhotoId : "";
  base.selectedBuildingPhotoId = typeof source.selectedBuildingPhotoId === "string" ? source.selectedBuildingPhotoId : "";
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
  migrateLegacyEntrancesToPhotoSpots(base);
  syncPlayerPortraitFromSelfPerson(base);
  return base;
}

function syncPlayerPortraitFromSelfPerson(gameData) {
  for (const building of Object.values(gameData.buildings || {})) {
    for (const room of building.rooms || []) {
      if (!isDormRoom(room)) continue;
      const self = getSelfPersonInRoom(room);
      if (self?.portrait) {
        gameData.player.portrait = self.portrait;
        return;
      }
    }
  }
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
    entranceFor: normalizePhotoSpotEntrance(source.entranceFor),
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
    width: Number.isFinite(Number(source.width || resource.width)) ? Math.max(1, Math.round(Number(source.width || resource.width))) : 0,
    height: Number.isFinite(Number(source.height || resource.height)) ? Math.max(1, Math.round(Number(source.height || resource.height))) : 0,
    resource: {
      name: resource.name || source.name || "photo",
      type: resource.type || "image/*",
      size: Number.isFinite(Number(resource.size)) ? Number(resource.size) : 0,
      width: Number.isFinite(Number(resource.width || source.width)) ? Math.max(1, Math.round(Number(resource.width || source.width))) : 0,
      height: Number.isFinite(Number(resource.height || source.height)) ? Math.max(1, Math.round(Number(resource.height || source.height))) : 0,
      data: resource.data || "",
      buffer: resource.buffer || null
    },
    original: normalizePhotoOriginal(source.original),
    capturedAt: typeof source.capturedAt === "string" ? source.capturedAt : (typeof source.createdAt === "string" ? source.createdAt : new Date().toISOString()),
    createdAt: typeof source.createdAt === "string" ? source.createdAt : new Date().toISOString()
  };
}

function normalizePhotoOriginal(source) {
  if (!source || typeof source !== "object") return null;
  if (source.storage !== "local-folder" || typeof source.relativePath !== "string" || !source.relativePath) return null;
  return {
    storage: "local-folder",
    albumRoot: typeof source.albumRoot === "string" ? source.albumRoot : "",
    relativePath: source.relativePath,
    name: typeof source.name === "string" ? source.name : "",
    type: typeof source.type === "string" ? source.type : "",
    size: Number.isFinite(Number(source.size)) ? Number(source.size) : 0,
    lastModified: Number.isFinite(Number(source.lastModified)) ? Number(source.lastModified) : null,
    schoolId: typeof source.schoolId === "string" ? source.schoolId : "",
    context: source.context && typeof source.context === "object" ? sanitizePhotoContext(source.context) : {},
    savedAt: typeof source.savedAt === "string" ? source.savedAt : ""
  };
}

function normalizeGameBuilding(source, fallbackId) {
  if (!source || typeof source !== "object") return {
    id: fallbackId,
    customName: "",
    category: "other",
    photos: [],
    activePhotoIndex: 0,
    mapPhotoLimit: DEFAULT_BUILDING_MAP_PHOTO_LIMIT,
    interiorPlayer: { x: INTERIOR_MAP_WIDTH / 2, y: INTERIOR_MAP_HEIGHT / 2 },
    entrances: [],
    rooms: [],
    capturedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  return {
    id: typeof source.id === "string" ? source.id : fallbackId,
    customName: typeof source.customName === "string" ? source.customName : "",
    category: BUILDING_CATEGORY_RULES[source.category] ? source.category : "other",
    photos: Array.isArray(source.photos) ? source.photos.map(normalizePhotoRecord).filter(Boolean) : [],
    activePhotoIndex: Number.isFinite(Number(source.activePhotoIndex)) ? Math.max(0, Math.floor(Number(source.activePhotoIndex))) : 0,
    mapPhotoLimit: Number.isFinite(Number(source.mapPhotoLimit)) ? clamp(Math.floor(Number(source.mapPhotoLimit)), 1, 12) : DEFAULT_BUILDING_MAP_PHOTO_LIMIT,
    interiorPlayer: normalizeInteriorPlayer(source.interiorPlayer),
    entrances: Array.isArray(source.entrances) ? source.entrances.map(normalizeEntrance).filter(Boolean) : [],
    rooms: Array.isArray(source.rooms) ? source.rooms.map(normalizeRoom).filter(Boolean) : [],
    capturedAt: typeof source.capturedAt === "string" ? source.capturedAt : (typeof source.createdAt === "string" ? source.createdAt : new Date().toISOString()),
    createdAt: typeof source.createdAt === "string" ? source.createdAt : new Date().toISOString(),
    updatedAt: typeof source.updatedAt === "string" ? source.updatedAt : new Date().toISOString()
  };
}

function normalizeInteriorPlayer(source) {
  const point = source && typeof source === "object" ? source : {};
  return {
    x: Number.isFinite(Number(point.x)) ? clamp(Number(point.x), INTERIOR_MAP_PADDING, INTERIOR_MAP_WIDTH - INTERIOR_MAP_PADDING) : INTERIOR_MAP_WIDTH / 2,
    y: Number.isFinite(Number(point.y)) ? clamp(Number(point.y), INTERIOR_MAP_PADDING, INTERIOR_MAP_HEIGHT - INTERIOR_MAP_PADDING) : INTERIOR_MAP_HEIGHT / 2
  };
}

function normalizeEntrance(source) {
  if (!source || typeof source !== "object") return null;
  return {
    id: typeof source.id === "string" ? source.id : createId("entrance"),
    photoSpotId: typeof source.photoSpotId === "string" ? source.photoSpotId : "",
    x: Number.isFinite(Number(source.x)) ? Number(source.x) : null,
    y: Number.isFinite(Number(source.y)) ? Number(source.y) : null,
    photo: normalizePhotoRecord(source.photo) || null,
    createdAt: typeof source.createdAt === "string" ? source.createdAt : new Date().toISOString()
  };
}

function normalizePhotoSpotEntrance(source) {
  if (!source || typeof source !== "object" || typeof source.buildingId !== "string" || !source.buildingId) return null;
  return {
    buildingId: source.buildingId,
    autoName: source.autoName !== false,
    createdAt: typeof source.createdAt === "string" ? source.createdAt : new Date().toISOString()
  };
}

function normalizeBuildingEntranceRefs(entrances) {
  return (Array.isArray(entrances) ? entrances : [])
    .map((entry) => ({
      id: typeof entry?.id === "string" ? entry.id : createId("entrance"),
      photoSpotId: typeof entry?.photoSpotId === "string" ? entry.photoSpotId : "",
      createdAt: typeof entry?.createdAt === "string" ? entry.createdAt : new Date().toISOString()
    }))
    .filter((entry) => entry.photoSpotId);
}

function migrateLegacyEntrancesToPhotoSpots(gameData) {
  const now = new Date().toISOString();
  for (const [buildingId, building] of Object.entries(gameData.buildings || {})) {
    const refs = [];
    for (const entry of building.entrances || []) {
      let spot = entry.photoSpotId ? gameData.photoSpots.find((item) => item.id === entry.photoSpotId) : null;
      if (!spot && Number.isFinite(Number(entry.x)) && Number.isFinite(Number(entry.y))) {
        spot = normalizePhotoSpot({
          id: createId("spot"),
          x: Number(entry.x),
          y: Number(entry.y),
          name: "",
          capturedAt: entry.createdAt || now,
          radius: DEFAULT_PLAYER_RADIUS,
          photos: entry.photo ? [entry.photo] : [],
          entranceFor: { buildingId, autoName: true, createdAt: entry.createdAt || now },
          createdAt: entry.createdAt || now,
          updatedAt: now
        });
        if (spot) gameData.photoSpots.push(spot);
      }
      if (!spot) continue;
      spot.entranceFor = normalizePhotoSpotEntrance(spot.entranceFor) || { buildingId, autoName: true, createdAt: entry.createdAt || now };
      refs.push({ id: entry.id || createId("entrance"), photoSpotId: spot.id, createdAt: entry.createdAt || now });
    }
    building.entrances = refs.filter((entry, index, array) => array.findIndex((item) => item.photoSpotId === entry.photoSpotId) === index);
  }
}

function normalizeRoom(source) {
  if (!source || typeof source !== "object") return null;
  const type = typeof source.type === "string" ? source.type : "自定义";
  return {
    id: typeof source.id === "string" ? source.id : createId("room"),
    name: typeof source.name === "string" ? source.name : "",
    type,
    relation: type === "寝室" && typeof source.relation === "string" ? source.relation : "",
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
    type: typeof source.type === "string" ? source.type : "同学",
    description: typeof source.description === "string" ? source.description : "",
    photo: normalizePhotoRecord(source.photo) || null,
    portrait: normalizePhotoRecord(source.portrait) || null,
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
    type: typeof source.type === "string" ? source.type : "物品",
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
  let migrated = false;
  const editData = {
    version: 1,
    cropPolygon: normalizePoints(source.cropPolygon),
    backgroundStrokes: Array.isArray(source.backgroundStrokes)
      ? source.backgroundStrokes.map(normalizeBackgroundStroke).filter(Boolean)
      : [],
    structureRegions: Array.isArray(source.structureRegions)
      ? source.structureRegions.map((region) => {
        const normalized = normalizeRegion(region);
        if (normalized?.__migrated) {
          migrated = true;
          delete normalized.__migrated;
        }
        return normalized;
      }).filter(Boolean)
      : [],
    judgementStrokes: Array.isArray(source.judgementStrokes)
      ? source.judgementStrokes.map(normalizeJudgementStroke).filter(Boolean)
      : [],
    structureSelections: Array.isArray(source.structureSelections)
      ? source.structureSelections.map(normalizeStructureSelection).filter(Boolean)
      : []
  };
  mergeStructureSelectionsIntoRegions(editData);
  if (migrated) editData.__migrated = true;
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
  const rawType = TYPE_STYLES[region.type] ? region.type : "custom";
  const type = inferStructureRegionType(region);
  const migrated = type !== rawType || type === "gate" && hasLineLikeGateAreas(areas, polygon);
  if (type === "gate") convertGateLineAreasToRegions(areas, polygon);
  if (polygon.length >= 2 && !areas.length && isLinearStructureType(type)) {
    areas.push({ kind: "line", points: polygon, width: LINEAR_STRUCTURE_WIDTH });
  } else if (polygon.length >= 3 && !areas.length) {
    areas.push({ kind: "polygon", points: polygon });
  }
  const eraseAreas = Array.isArray(region.eraseAreas) ? region.eraseAreas.map(normalizeArea).filter(Boolean) : [];
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
    eraseAreas,
    createdAt: typeof region.createdAt === "string" ? region.createdAt : new Date().toISOString(),
    __migrated: migrated
  };
}

function inferStructureRegionType(region) {
  const rawType = TYPE_STYLES[region.type] ? region.type : "custom";
  const name = String(region.name || "");
  if (rawType === "custom" && /门/.test(name)) return "gate";
  return rawType;
}

function convertGateLineAreasToRegions(areas, polygon) {
  for (let index = 0; index < areas.length; index++) {
    const area = areas[index];
    if (area.kind !== "line") continue;
    const converted = lineAreaToPolygonArea(area);
    if (converted) areas[index] = converted;
  }
  if (areas.length || polygon.length < 2) return;
  const converted = lineAreaToPolygonArea({ kind: "line", points: polygon, width: LINEAR_STRUCTURE_WIDTH });
  if (converted) areas.push(converted);
}

function hasLineLikeGateAreas(areas, polygon) {
  return areas.some((area) => area.kind === "line") || !areas.length && polygon.length >= 2;
}

function lineAreaToPolygonArea(area) {
  const points = normalizePoints(area.points);
  if (points.length < 2) return null;
  const width = Math.max(1, Number(area.width) || LINEAR_STRUCTURE_WIDTH);
  const first = points[0];
  const last = points[points.length - 1];
  const dx = last.x - first.x;
  const dy = last.y - first.y;
  const length = Math.hypot(dx, dy);
  if (!length) return null;
  const nx = (-dy / length) * width / 2;
  const ny = (dx / length) * width / 2;
  return {
    kind: "polygon",
    points: [
      { x: first.x + nx, y: first.y + ny },
      { x: last.x + nx, y: last.y + ny },
      { x: last.x - nx, y: last.y - ny },
      { x: first.x - nx, y: first.y - ny }
    ]
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
  if (state.dialogSelection.mode === "download") {
    for (const item of OFFICIAL_CATALOG) renderDownloadJob(item.id);
  }
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

function isAlbumModeSupported() {
  return typeof window.showDirectoryPicker === "function";
}

async function loadAlbumSettings() {
  state.album.supported = isAlbumModeSupported();
  if (!state.db || !state.album.supported) {
    state.album = {
      ...state.album,
      handle: null,
      enabled: false,
      permission: state.album.supported ? "prompt" : "unsupported",
      rootName: "",
      status: state.album.supported ? "not-set" : "unsupported",
      message: state.album.supported ? "还没有设置相册库。" : "当前浏览器不支持本地相册库，照片会存入浏览器。"
    };
    renderAlbumStatus();
    return;
  }
  const settings = await getStoreValue(APP_SETTINGS_STORE, ALBUM_SETTINGS_KEY).catch(() => null);
  const handle = settings?.handle || null;
  if (!handle) {
    state.album = {
      ...state.album,
      handle: null,
      enabled: false,
      permission: "prompt",
      rootName: "",
      status: "not-set",
      message: "还没有设置相册库。"
    };
    renderAlbumStatus();
    return;
  }
  const permission = await queryAlbumPermission(handle);
  state.album = {
    ...state.album,
    handle,
    enabled: permission === "granted",
    permission,
    rootName: settings.rootName || handle.name || "相册库",
    status: permission === "granted" ? "connected" : "needs-permission",
    message: permission === "granted" ? "原图会保存到本机相册库。" : "浏览器需要重新授权相册库。"
  };
  renderAlbumStatus();
}

async function saveAlbumSettings() {
  if (!state.db) return;
  const value = state.album.handle
    ? {
        version: 1,
        handle: state.album.handle,
        rootName: state.album.rootName || state.album.handle.name || "相册库",
        updatedAt: new Date().toISOString()
      }
    : null;
  if (value) await putStoreValue(APP_SETTINGS_STORE, ALBUM_SETTINGS_KEY, value);
  else await deleteStoreValue(APP_SETTINGS_STORE, ALBUM_SETTINGS_KEY);
}

async function queryAlbumPermission(handle) {
  if (!handle || typeof handle.queryPermission !== "function") return "denied";
  try {
    return await handle.queryPermission({ mode: "readwrite" });
  } catch (error) {
    console.warn("相册库权限检测失败:", error);
    return "denied";
  }
}

async function requestAlbumPermission(handle) {
  if (!handle) return "denied";
  if (typeof handle.requestPermission !== "function") return queryAlbumPermission(handle);
  try {
    return await handle.requestPermission({ mode: "readwrite" });
  } catch (error) {
    console.warn("相册库授权失败:", error);
    return "denied";
  }
}

async function chooseAlbumFolder() {
  if (!isAlbumModeSupported()) {
    state.album.supported = false;
    state.album.status = "unsupported";
    state.album.message = "当前浏览器不支持本地相册库，照片会存入浏览器。";
    renderAlbumStatus();
    return;
  }
  try {
    const handle = await window.showDirectoryPicker({ mode: "readwrite" });
    const permission = await requestAlbumPermission(handle);
    state.album = {
      ...state.album,
      supported: true,
      handle,
      enabled: permission === "granted",
      permission,
      rootName: handle.name || "相册库",
      status: permission === "granted" ? "connected" : "needs-permission",
      message: permission === "granted" ? "相册库已连接，原图会保存到本机文件夹。" : "没有获得写入权限，暂时使用浏览器存储。"
    };
    await saveAlbumSettings();
  } catch (error) {
    if (error?.name !== "AbortError") {
      console.warn("选择相册库失败:", error);
      state.album.message = "相册库设置失败，暂时使用浏览器存储。";
    }
  }
  renderAlbumStatus();
}

async function reconnectAlbumFolder() {
  if (!state.album.handle) {
    await chooseAlbumFolder();
    return;
  }
  const permission = await requestAlbumPermission(state.album.handle);
  state.album.enabled = permission === "granted";
  state.album.permission = permission;
  state.album.status = permission === "granted" ? "connected" : "needs-permission";
  state.album.message = permission === "granted" ? "相册库已重新授权。" : "仍未获得相册库写入权限。";
  await saveAlbumSettings();
  renderAlbumStatus();
}

async function forgetAlbumFolder() {
  state.album = {
    ...state.album,
    handle: null,
    enabled: false,
    permission: state.album.supported ? "prompt" : "unsupported",
    rootName: "",
    status: state.album.supported ? "not-set" : "unsupported",
    message: state.album.supported ? "已关闭相册库，之后照片会存入浏览器。" : "当前浏览器不支持本地相册库。"
  };
  await saveAlbumSettings();
  renderAlbumStatus();
}

function renderAlbumStatus() {
  if (!els.albumStatus || !els.albumDescription) return;
  const album = state.album;
  const labels = {
    unsupported: "不支持",
    "not-set": "未设置",
    "needs-permission": "需授权",
    connected: "已连接",
    checking: "检测中"
  };
  els.albumStatus.textContent = labels[album.status] || "未设置";
  els.albumStatus.dataset.status = album.status || "not-set";
  els.albumDescription.textContent = album.message || "原图可保存到本机文件夹，游戏内只保留预览图。";
  if (els.albumChooseButton) {
    els.albumChooseButton.disabled = !album.supported;
    els.albumChooseButton.textContent = album.handle ? "更换相册" : "设置相册";
  }
  if (els.albumReconnectButton) {
    els.albumReconnectButton.disabled = !album.supported || !album.handle;
  }
  if (els.albumForgetButton) {
    els.albumForgetButton.disabled = !album.handle;
  }
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
      if (!db.objectStoreNames.contains(APP_SETTINGS_STORE)) {
        db.createObjectStore(APP_SETTINGS_STORE);
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

function migrateStoredEditData() {
  if (!state.db) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const tx = state.db.transaction(EDIT_DATA_STORE, "readwrite");
    const store = tx.objectStore(EDIT_DATA_STORE);
    const request = store.openCursor();
    request.onsuccess = () => {
      const cursor = request.result;
      if (!cursor) return;
      const normalized = normalizeEditData(cursor.value);
      if (normalized.__migrated) {
        delete normalized.__migrated;
        cursor.update(normalized);
      }
      cursor.continue();
    };
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(tx.error);
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
  const report = typeof options.onProgress === "function" ? options.onProgress : null;
  const reportImport = (message, percent) => {
    if (!report) return;
    report({
      status: "running",
      message,
      loaded: file?.size || 0,
      total: file?.size || 0,
      percent
    });
  };
  reportImport("正在准备整校包...", 72);
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
    reportImport("正在写入大地图图片...", 78);
    await putMapImageRecord(id, data.mapImage);
    if (!school.mapMeta) {
      reportImport("正在读取地图尺寸...", 84);
      const blob = resourceRecordToBlob(data.mapImage);
      if (blob) {
        const mapFile = new File([blob], school.mapImageName || data.mapImage.name || "map-image", { type: blob.type || data.mapImage.type || "application/octet-stream" });
        school.mapMeta = await createMapMetaFromFile(mapFile);
      }
    }
  }
  reportImport("正在写入地图结构...", 88);
  await putEditData(id, normalizeEditData(extractStructureResource(data.editData).editData));
  reportImport("正在写入游戏数据...", 91);
  await putGameData(id, normalizeGameData(data.gameData));
  reportImport("正在写入人物关系...", 94);
  await putPeopleData(id, data.peopleData || null);
  reportImport("正在写入附属图片...", 97);
  await putExtraImages(id, Array.isArray(data.extraImages) ? data.extraImages : []);
  state.schools.push(school);
  saveSchools();
  if (!options.keepDownloadPanel) state.dialogSelection = { mode: "manage", schoolId: id };
  if (options.stayInDialog) {
    renderSchoolList();
    renderSchoolDialogPanels();
    if (state.selectedSchoolId === id) await renderAll({ fit: true });
    if (report) report({ status: "done", message: `已导入 ${school.name}。`, percent: 100 });
    return school;
  }
  state.selectedSchoolId = id;
  saveCurrentSchoolId(id);
  els.schoolDialog.close();
  await renderAll({ fit: true });
  if (report) report({ status: "done", message: `已导入 ${school.name}。`, percent: 100 });
  return school;
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
    album: {
      supported: state.album.supported,
      enabled: state.album.enabled,
      status: state.album.status,
      permission: state.album.permission,
      rootName: state.album.rootName || ""
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
  const venueRule = getVenueRule(room, building);
  const exploration = getExplorationProgress();
  const interiorPlayer = state.gameData.location.kind === "building" && building ? getInteriorPlayer(building) : null;
  return {
    mode: state.editorEnabled ? "editor" : state.gameData.location.kind,
    coordinateSystem: state.gameData.location.kind === "building"
      ? "interior pixels, origin top-left, x right, y down"
      : "map image pixels, origin top-left, x right, y down",
    zoom: Number(state.view.scale.toFixed(3)),
    player: {
      x: Number((player.x || 0).toFixed(2)),
      y: Number((player.y || 0).toFixed(2)),
      radius: player.radius || DEFAULT_PLAYER_RADIUS,
      walkSpeed: player.walkSpeed || DEFAULT_WALK_SPEED,
      portrait: Boolean(player.portrait)
    },
    interiorPlayer: interiorPlayer ? {
      x: Number(interiorPlayer.x.toFixed(2)),
      y: Number(interiorPlayer.y.toFixed(2)),
      radius: INTERIOR_PLAYER_RADIUS
    } : null,
    moveTarget: state.moveTarget ? {
      x: Number(state.moveTarget.x.toFixed(2)),
      y: Number(state.moveTarget.y.toFixed(2))
    } : null,
    movementDebug: getMovementDebugState(player),
    follow: {
      screenX: state.mapImage ? Number(imageToScreen(player).x.toFixed(2)) : 0,
      screenY: state.mapImage ? Number(imageToScreen(player).y.toFixed(2)) : 0
    },
    photoSpotCount: state.gameData.photoSpots.length,
    exploration: {
      percent: Number(exploration.percent.toFixed(1)),
      litCells: exploration.litCells,
      totalCells: exploration.totalCells,
      gridSize: exploration.gridSize
    },
    activePhotoSpotId: spot?.id || "",
    activePhotoSpotName: spot ? getPhotoSpotDisplayName(spot) : "",
    activePhotoCount: spot?.photos?.length || 0,
    selectedSpotPhotoId: state.gameData.selectedSpotPhotoId || "",
    selectedSpotPhotoForEditId: state.selectedSpotPhotoForEditId || "",
    nearbyPhotoSpotId: state.currentNearbyPhotoSpotId || "",
    showAnnotations: showMapAnnotations(),
    showPhotoMarkers: state.gameData.settings.showPhotoMarkers,
    showInteractionMarkers: state.gameData.settings.showInteractionMarkers,
    showPeopleMarkers: state.gameData.settings.showPeopleMarkers,
    showExplorationGrid: state.gameData.settings.showExplorationGrid === true,
    nearbyTargets: state.currentNearbyInteractionTargets.map((target) => target.key),
    nearbyBuildingIds: [...state.currentNearbyBuildingIds],
    selectedBuildingId: state.gameData.selectedBuildingId || "",
    selectedBuilding: building ? {
      name: building.customName || getStructureRegionById(state.gameData.selectedBuildingId || state.gameData.location.buildingId)?.name || "",
      category: building.category,
      photoCount: building.photos.length,
      selectedPhotoId: state.gameData.selectedBuildingPhotoId || "",
      selectedPhotoForEditId: state.selectedBuildingPhotoForEditId || "",
      entranceCount: building.entrances.length,
      roomCount: building.rooms.length,
      venueCount: building.rooms.length
    } : null,
    selectedRoom: room ? {
      id: room.id,
      name: room.name,
      type: room.type,
      venueLabel: getRoomDisplayName(room),
      itemLabel: venueRule.itemLabel,
      personLabel: venueRule.personLabel,
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

function getMovementDebugState(player) {
  const vector = getMovementVector();
  const target = state.moveTarget;
  if (state.gameData.location.kind === "building") {
    const interiorPlayer = getInteriorPlayer();
    return {
      playerCanMove: true,
      targetCanMove: target ? isInteriorPointInBounds(target) : null,
      vector: {
        x: Number(vector.x.toFixed(3)),
        y: Number(vector.y.toFixed(3))
      },
      interiorPlayer: {
        x: Number(interiorPlayer.x.toFixed(2)),
        y: Number(interiorPlayer.y.toFixed(2))
      },
      pathLength: 0,
      pathIndex: 0
    };
  }
  return {
    playerCanMove: state.mapImage ? canPlayerMoveTo(player) : false,
    targetCanMove: state.mapImage && target ? canPlayerMoveTo(target) : null,
    vector: {
      x: Number(vector.x.toFixed(3)),
      y: Number(vector.y.toFixed(3))
    },
    stuckSeconds: Number(state.moveTargetStuckSeconds.toFixed(2)),
    repathSeconds: Number(state.moveTargetRepathSeconds.toFixed(2)),
    pathLength: state.moveTargetPath?.length || 0,
    pathIndex: state.moveTargetPathIndex || 0
  };
}

function isInteriorPointInBounds(point) {
  return Boolean(point
    && Number.isFinite(Number(point.x))
    && Number.isFinite(Number(point.y))
    && point.x >= INTERIOR_MAP_PADDING
    && point.y >= INTERIOR_MAP_PADDING
    && point.x <= INTERIOR_MAP_WIDTH - INTERIOR_MAP_PADDING
    && point.y <= INTERIOR_MAP_HEIGHT - INTERIOR_MAP_PADDING);
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function clampInt(value, min, max) {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed)) return min;
  return Math.min(max, Math.max(min, parsed));
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
