export const id = "EVENT_REPLACE_TILESET_SEQUENCE";
export const name = "Replace Tileset Sequence";
export const groups = ["EVENT_GROUP_SCENE"];
export const subGroups = {
  EVENT_GROUP_SCENE: "EVENT_GROUP_TILES",
};

export const autoLabel = (fetchArg) => {
  return `Replace Tileset Sequence`;
};

export const fields = [
  {
    key: `idx_target_tile`,
    label: "Target Tile Index",
    type: "value",
    width: "50%",
    defaultValue: {
      type: "number",
      value: 0,
    },
  },
  {
    key: `idx_target_alt_tile`,
    label: "Target Tile Alt Index",
    type: "value",
    width: "50%",
    defaultValue: {
      type: "number",
      value: 0,
    },
  },
  {
    key: `idx_start_tile`,
    label: "Source Offset Tile Index",
    type: "value",
    width: "50%",
    defaultValue: {
      type: "number",
      value: 0,
    },
  },
  {
    key: "tile_length",
    label: "Tiles length",
    description: "Tiles length",
    type: "number",
    width: "50%",
    defaultValue: 1,
  },
  {
    key: "references",
    type: "references",
    label: "Frames (tilesets)",
    description: "Frames (tilesets)",
  },
];

export const compile = (input, helpers) => {
  const { options, _callNative, _stackPushConst, _stackPush, _stackPop, _addComment, _declareLocal, variableSetToScriptValue, _replaceTile, _idle, appendRaw } = helpers;
  
  const tileset_references = input.references.filter((ref) => ref.type === "tileset").map((ref) => ref.id)
  const { tilesets } = options;
  
  const tmp0 = _declareLocal("tmp_0", 1, true);
  const tmp1 = _declareLocal("tmp_1", 1, true);
  const tmp2 = _declareLocal("tmp_2", 1, true);
  	
  variableSetToScriptValue(tmp0, input.idx_target_tile);
  variableSetToScriptValue(tmp1, input.idx_target_alt_tile);
  variableSetToScriptValue(tmp2, input.idx_start_tile);
  
  for (let tileset_idx = 0; tileset_idx < tileset_references.length; tileset_idx++){
		const tileset = tilesets.find((t) => t.id === tileset_references[tileset_idx]);
		if (!tileset) {
			continue;
		}
		if (tileset_idx % 2){
			_idle();
			_replaceTile(tmp1, tileset.symbol, tmp2, input.tile_length);
			_idle();
			appendRaw('VM_OVERLAY_SETPOS 0, 18');
		} else {
			_idle();
			_replaceTile(tmp0, tileset.symbol, tmp2, input.tile_length);
			_idle();
			appendRaw('VM_OVERLAY_SETPOS 0, 0');
		}
  }
  
};
