export type Base = {
  /** a string uniquely identifying this node within the document */
  readonly id: string;
  /** the name given to the node by the user in the tool. */
  readonly name: string;
  /** whether or not the node is visible on the canvas */
  readonly visible?: boolean;
  /** the type of the node, refer to table below for details */
  readonly type: NodeType;
  /** data written by plugins that is visible only to the plugin that wrote it. Requires the `pluginData` to include the ID of the plugin. */
  readonly pluginData?: unknown;
  /** data written by plugins that is visible to all plugins. Requires the `pluginData` parameter to include the string "shared". */
  readonly sharedPluginData?: unknown;
};

/**
 * Styles can be one of the following types
 */
export type StyleType = 'FILL' | 'TEXT' | 'EFFECT' | 'GRID';

/**
 * the above styles can be used in the following ways
 */
export type StyleKeyType = 'fill' | 'stroke' | 'effect' | 'grid' | 'text' | 'background';

export type StylesObject = {
  [key in StyleKeyType]: Record<key, string>;
}[StyleKeyType];

export type ScaleMode = 'FILL' | 'FIT' | 'TILE' | 'STRETCH';

export type PaintTypeSolid = 'SOLID';

export type PaintTypeGradient =
  | 'GRADIENT_LINEAR'
  | 'GRADIENT_RADIAL'
  | 'GRADIENT_ANGULAR'
  | 'GRADIENT_DIAMOND';

export type PaintTypeImage = 'IMAGE' | 'EMOJI'; // I'm guessing that EMOJI is like an image, not sure where it is used

export type TextType = 'TEXT';

export type PaintType = PaintTypeSolid | PaintTypeGradient | PaintTypeImage;

/**
 * how the layer blends with layers below
 */
export type BlendMode =
  | 'PASS_THROUGH' /** (Only applicable to objects with children) */
  | 'NORMAL'

  /** Darken: */
  | 'DARKEN'
  | 'MULTIPLY'
  | 'LINEAR_BURN'
  | 'COLOR_BURN'

  /** Lighten: */
  | 'LIGHTEN'
  | 'SCREEN'
  | 'LINEAR_DODGE'
  | 'COLOR_DODGE'

  /** Contrast: */
  | 'OVERLAY'
  | 'SOFT_LIGHT'
  | 'HARD_LIGHT'

  /** Inversion: */
  | 'DIFFERENCE'
  | 'EXCLUSION'

  /** Component: */
  | 'HUE'
  | 'SATURATION'
  | 'COLOR'
  | 'LUMINOSITY';

export type EasingType =
  | 'EASE_IN' /** Ease in with an animation curve similar to CSS ease-in */
  | 'EASE_OUT' /** Ease out with an animation curve similar to CSS ease-out */
  | 'EASE_IN_AND_OUT'; /** Ease in and then out with an animation curve similar to CSS ease-in-out */

export type RoleType = 'viewer' | 'editor' | 'owner';

export type NodeType =
  | 'DOCUMENT'
  | 'CANVAS'
  | 'FRAME'
  | 'GROUP'
  | 'VECTOR'
  | 'BOOLEAN_OPERATION'
  | 'STAR'
  | 'LINE'
  | 'ELLIPSE'
  | 'REGULAR_POLYGON'
  | 'RECTANGLE'
  | 'TEXT'
  | 'SLICE'
  | 'COMPONENT'
  | 'COMPONENT_SET'
  | 'INSTANCE';

export type Node =
  | Document
  | Canvas
  | Frame
  | Group
  | Vector
  | BooleanOperation
  | Star
  | Line
  | Ellipse
  | RegularPolygon
  | Rectangle
  | Text
  | Slice
  | Component
  | ComponentSet
  | Instance;

export type VectorNode =
  | Vector
  | BooleanOperation
  | Star
  | Line
  | Ellipse
  | RegularPolygon
  | Rectangle
  | Text;
/** Node Properties */

/** The root node */
export type Document = {
  readonly type: 'DOCUMENT';
  /** An array of canvases attached to the document */
  readonly children: readonly Node[];
} & Base;

/** Represents a single page */
export type Canvas = {
  readonly type: 'CANVAS';
  /** An array of top level layers on the canvas */
  readonly children: readonly Node[];
  /** Background color of the canvas */
  readonly backgroundColor: Color;
  /** Node ID that corresponds to the start frame for prototypes */
  readonly prototypeStartNodeID: string | null;
  /** An array of export settings representing images to export from the canvas */
  readonly exportSettings?: readonly ExportSetting[];
} & Base;

export type FrameBase = {
  /** An array of nodes that are direct children of this node */
  readonly children: readonly Node[];
  /**
   * An array of fill paints applied to the node
   * @default []
   */
  readonly fills: readonly Paint[];
  /**
   * An array of stroke paints applied to the node
   * @default []
   */
  readonly strokes: readonly Paint[];
  /** The weight of strokes on the node */
  readonly strokeWeight: number;
  /**
   * Position of stroke relative to vector outline, as a string enum
   * "INSIDE": stroke drawn inside the shape boundary
   * "OUTSIDE": stroke drawn outside the shape boundary
   * "CENTER": stroke drawn centered along the shape boundary
   */
  readonly strokeAlign: 'INSIDE' | 'OUTSIDE' | 'CENTER';
  /**
   * Radius of each corner of the frame if a single radius is set for all
   * corners
   */
  readonly cornerRadius?: number;
  /**
   * Array of length 4 of the radius of each corner of the frame, starting
   * in the top left and proceeding clockwise
   */
  readonly rectangleCornerRadii?: readonly [number, number, number, number];
  /**
   * An array of export settings representing images to export from node
   * @default []
   */
  readonly exportSettings?: readonly ExportSetting[];
  /**
   * How this node blends with nodes behind it in the scene
   * (see blend mode section for more details)
   */
  readonly blendMode: BlendMode;
  /**
   * Keep height and width constrained to same ratio
   * @default false
   */
  readonly preserveRatio?: boolean;
  /** Horizontal and vertical layout constraints for node */
  readonly constraints: LayoutConstraint;
  /**
   * How the layer is aligned inside an auto-layout frame. This property
   * is only provided for direct children of auto-layout frames.
   * MIN
   * CENTER
   * MAX
   * STRETCH
   * In horizontal auto-layout frames, "MIN" and "MAX" correspond to
   * "TOP" and "BOTTOM". * In vertical auto-layout frames, "MIN" and
   * "MAX" correspond to "LEFT" and "RIGHT".
   */
  readonly layoutAlign?: string;
  /**
   * Node ID of node to transition to in prototyping
   * @default null
   */
  readonly transitionNodeID?: string | null;
  /**
   * The duration of the prototyping transition on this node (in milliseconds)
   * @default null
   */
  readonly transitionDuration?: number | null;
  /**
   * The easing curve used in the prototyping transition on this node
   * @default null
   */
  readonly transitionEasing?: EasingType | null;
  /**
   * Opacity of the node
   * @default 1
   */
  readonly opacity?: number;
  /** Bounding box of the node in absolute space coordinates */
  readonly absoluteBoundingBox: Rect;

  /**
   * Width and height of element. This is different from the width and height
   * of the bounding box in that the absolute bounding box represents the
   * element after scaling and rotation. Only present if geometry=paths
   * is passed
   */
  readonly size?: Vector2d;

  /**
   * The top two rows of a matrix that represents the 2D transform of this
   * node relative to its parent. The bottom row of the matrix is implicitly
   * always (0, 0, 1). Use to transform coordinates in geometry.
   * Only present if geometry=paths is passed
   */
  readonly relativeTransform?: Transform;

  /** Does this node clip content outside of its bounds? */
  readonly clipsContent: boolean;
  /**
   * Whether this layer uses auto-layout to position its children.
   * @default NONE
   */
  readonly layoutMode?: 'NONE' | 'HORIZONTAL' | 'VERTICAL';
  /**
   * Whether the counter axis has a fixed length (determined by the user)
   * or an automatic length (determined by the layout engine).
   * This property is only applicable for auto-layout frames
   * @default AUTO
   */
  readonly primaryAxisSizingMode?: 'FIXED' | 'AUTO';
  /**
   * When autolayout is enabled
   */
  readonly primaryAxisAlignItems?: 'MIN' | 'CENTER' | 'MAX' | 'SPACE_BETWEEN';
  /**
   * When autolayout is enabled
   */
  readonly counterAxisAlignItems?: 'MIN' | 'CENTER' | 'MAX';
  /**
   * When autolayout is enabled
   */
  readonly paddingLeft?: number;
  /**
   * The padding betweeen the left border of the frame and its children.
   * This property is only applicable for auto-layout frames.
   * @default 0
   */
  readonly paddingRight?: number;
  /**
   * The padding betweeen the right border of the frame and its children.
   * This property is only applicable for auto-layout frames.
   * @default 0
   */
  readonly paddingTop?: number;
  /**
   * The padding betweeen the top border of the frame and its children.
   * This property is only applicable for auto-layout frames.
   * @default 0
   */
  readonly paddingBottom?: number;
  /**
   * The padding betweeen the bottom border of the frame and its children.
   * This property is only applicable for auto-layout frames.
   * @default 0
   */
  readonly counterAxisSizingMode?: 'FIXED' | 'AUTO';
  /**
   * The horizontal padding between the borders of the frame and its
   * children. This property is only applicable for auto-layout frames.
   * @default 0
   */
  readonly horizontalPadding?: number;
  /**
   * The vertical padding between the borders of the frame and its
   * children. This property is only applicable for auto-layout frames.
   * @default 0
   */
  readonly verticalPadding?: number;
  /**
   * The distance between children of the frame. This property is only
   * applicable for auto-layout frames.
   * @default 0
   */
  readonly itemSpacing?: number;
  /**
   * An array of layout grids attached to this node (see layout grids section
   * for more details). GROUP nodes do not have this attribute
   * @default []
   */
  readonly layoutGrids?: readonly LayoutGrid[];
  /**
   * Defines the scrolling behavior of the frame, if there exist contents
   * outside of the frame boundaries. The frame can either scroll
   * vertically, horizontally, or in both directions to the extents of the
   * content contained within it. This behavior can be observed in a
   * prototype.
   * HORIZONTAL_SCROLLING
   * VERTICAL_SCROLLING
   * HORIZONTAL_AND_VERTICAL_SCROLLING
   * @default NONE
   */
  readonly overflowDirection?: string;
  /**
   * An array of effects attached to this node
   * (see effects sectionfor more details)
   * @default []
   */
  readonly effects: readonly Effect[];
  /**
   * Does this node mask sibling nodes in front of it?
   * @default false
   */
  readonly isMask?: boolean;
} & Base;

/** A node of fixed size containing other nodes */
export type Frame = {
  readonly type: 'FRAME';
} & FrameBase;

/** A logical grouping of nodes */
export type Group = {
  readonly type: 'GROUP';
} & FrameBase;

export type VectorBase = {
  /**
   * An array of export settings representing images to export from node
   * @default []
   */
  readonly exportSettings?: readonly ExportSetting[];
  /**
   * How this node blends with nodes behind it in the scene
   * (see blend mode section for more details)
   */
  readonly blendMode: BlendMode;
  /**
   * Keep height and width constrained to same ratio
   * @default false
   */
  readonly preserveRatio?: boolean;
  /**
   * Horizontal and vertical layout constraints for node
   */
  readonly constraints: LayoutConstraint;
  /**
   * Node ID of node to transition to in prototyping
   * @default null
   */
  readonly transitionNodeID?: string | null;
  /**
   * The duration of the prototyping transition on this node (in milliseconds)
   * @default null
   */
  readonly transitionDuration?: number | null;
  /**
   * The easing curve used in the prototyping transition on this node
   * @default null
   */
  readonly transitionEasing?: EasingType | null;
  /**
   * Opacity of the node
   * @default 1
   */
  readonly opacity?: number;
  /** Bounding box of the node in absolute space coordinates */
  readonly absoluteBoundingBox: Rect;

  /**
   * Width and height of element. This is different from the width and height
   * of the bounding box in that the absolute bounding box represents the
   * element after scaling and rotation. Only present if geometry=paths
   * is passed
   */
  readonly size?: Vector2d;

  /**
   * The top two rows of a matrix that represents the 2D transform of this
   * node relative to its parent. The bottom row of the matrix is implicitly
   * always (0, 0, 1). Use to transform coordinates in geometry.
   * Only present if geometry=paths is passed
   */
  readonly relativeTransform?: Transform;

  /**
   * An array of effects attached to this node
   * (see effects sectionfor more details)
   * @default []
   */
  readonly effects: readonly Effect[];
  /**
   * Does this node mask sibling nodes in front of it?
   * @default false
   */
  readonly isMask?: boolean;
  /**
   * An array of fill paints applied to the node
   * @default []
   */
  readonly fills: readonly Paint[];

  /**
   * Only specified if parameter geometry=paths is used. An array of paths
   * representing the object fill
   */
  readonly fillGeometry?: readonly Path[];

  /**
   * An array of stroke paints applied to the node
   * @default []
   */
  readonly strokes: readonly Paint[];

  /** The weight of strokes on the node */
  readonly strokeWeight: number;

  /**
   * Only specified if parameter geometry=paths is used. An array of paths
   * representing the object stroke
   */
  readonly strokeGeometry?: readonly Path[];

  /**
   * Where stroke is drawn relative to the vector outline as a string enum
   * "INSIDE": draw stroke inside the shape boundary
   * "OUTSIDE": draw stroke outside the shape boundary
   * "CENTER": draw stroke centered along the shape boundary
   */
  readonly strokeAlign: 'INSIDE' | 'OUTSIDE' | 'CENTER';

  /**
   * Styles this node uses from the global `styles`
   */
  readonly styles?: StylesObject;
} & Base;

/** A vector network, consisting of vertices and edges */
export type Vector = {
  readonly type: 'VECTOR';
} & VectorBase;

/** A group that has a boolean operation applied to it */
export type BooleanOperation = {
  readonly type: 'BOOLEAN_OPERATION';
  /**
   * A string enum with value of "UNION", "INTERSECT", "SUBTRACT", or "EXCLUDE"
   * indicating the type of boolean operation applied
   */
  readonly booleanOperation: 'UNION' | 'INTERSECT' | 'SUBTRACT' | 'EXCLUDE';
  /** An array of nodes that are being boolean operated on */
  readonly children: readonly Node[];
} & VectorBase;

/** A regular star shape */
export type Star = {
  readonly type: 'STAR';
} & VectorBase;

/** A straight line */
export type Line = {
  readonly type: 'LINE';
} & VectorBase;

/** An ellipse */
export type Ellipse = {
  readonly type: 'ELLIPSE';
} & VectorBase;

/** A regular n-sided polygon */
export type RegularPolygon = {
  readonly type: 'REGULAR_POLYGON';
} & VectorBase;

/** A rectangle */
export type Rectangle = {
  readonly type: 'RECTANGLE';
  /** Radius of each corner of the rectangle if a single radius is set for all corners */
  readonly cornerRadius?: number;
  /** Array of length 4 of the radius of each corner of the rectangle, starting in the top left and proceeding clockwise */
  readonly rectangleCornerRadii?: readonly [number, number, number, number];
} & VectorBase;

/** A text box */
export type Text = {
  readonly type: TextType;
  /** Text contained within text box */
  readonly characters: string;
  /**
   * Style of text including font family and weight (see type style
   * section for more information)
   */
  readonly style: TypeStyle;
  /**
   * Array with same number of elements as characeters in text 'box' |    * each element is a reference to the styleOverrideTable defined
   * below and maps to the corresponding character in the characters
   * field. Elements with value 0 have the default type style
   */
  readonly characterStyleOverrides: readonly number[];
  /** Map from ID to TypeStyle for looking up style overrides */
  readonly styleOverrideTable: Readonly<Record<number, TypeStyle>>;
} & VectorBase;

/** A rectangular region of the canvas that can be exported */
export type Slice = {
  readonly type: 'SLICE';
  /** An array of export settings representing images to export from this node */
  readonly exportSettings: readonly ExportSetting[];
  /** Bounding box of the node in absolute space coordinates */
  readonly absoluteBoundingBox: Rect;
  /**
   * Width and height of element. This is different from the width and height
   * of the bounding box in that the absolute bounding box represents the
   * element after scaling and rotation. Only present if geometry=paths
   * is passed
   */
  readonly size?: Vector2d;

  /**
   * The top two rows of a matrix that represents the 2D transform of this
   * node relative to its parent. The bottom row of the matrix is implicitly
   * always (0, 0, 1). Use to transform coordinates in geometry.
   * Only present if geometry=paths is passed
   */
  readonly relativeTransform?: Transform;
} & Base;

/** A node that can have instances created of it that share the same properties */
export type Component = {
  readonly type: 'COMPONENT';
} & FrameBase;

/** A node that can have multiple component variations */
export type ComponentSet = {
  readonly type: 'COMPONENT_SET';
} & FrameBase;

/**
 * An instance of a component, changes to the component result in the same
 * changes applied to the instance
 */
export type Instance = {
  readonly type: 'INSTANCE';
  /**
   * ID of component that this instance came from, refers to components
   * table (see endpoints section below)
   */
  readonly componentId: string;
} & FrameBase;

// Types

/** An RGBA color */
export type Color = {
  /** Red channel value, between 0 and 1 */
  readonly r: number;
  /** Green channel value, between 0 and 1 */
  readonly g: number;
  /** Blue channel value, between 0 and 1 */
  readonly b: number;
  /** Alpha channel value, between 0 and 1 */
  readonly a: number;
};

/** Format and size to export an asset at */
export type ExportSetting = {
  /** File suffix to append to all filenames */
  readonly suffix: string;
  /** Image type, string enum */
  readonly format: 'JPG' | 'PNG' | 'SVG' | 'PDF';
  /** Constraint that determines sizing of exported asset */
  readonly constraint: Constraint;
};

/** Sizing constraint for exports */
export type Constraint = {
  /**
   * Type of constraint to apply; string enum with potential values below
   * "SCALE": Scale by value
   * "WIDTH": Scale proportionally and set width to value
   * "HEIGHT": Scale proportionally and set height to value
   */
  readonly type: 'SCALE' | 'WIDTH' | 'HEIGHT';
  /** See type property for effect of this field */
  readonly value: number;
};

/** A rectangle that expresses a bounding box in absolute coordinates */
export type Rect = {
  /** X coordinate of top left corner of the rectangle */
  readonly x: number;
  /** Y coordinate of top left corner of the rectangle */
  readonly y: number;
  /** Width of the rectangle */
  readonly width: number;
  /** Height of the rectangle */
  readonly height: number;
};

/** Layout constraint relative to containing Frame */
export type LayoutConstraint = {
  /**
   * Vertical constraint as an enum
   * "TOP": Node is laid out relative to top of the containing frame
   * "BOTTOM": Node is laid out relative to bottom of the containing frame
   * "CENTER": Node is vertically centered relative to containing frame
   * "TOP_BOTTOM": Both top and bottom of node are constrained relative to containing frame (node stretches with frame)
   * "SCALE": Node scales vertically with containing frame
   */
  readonly vertical: 'TOP' | 'BOTTOM' | 'CENTER' | 'TOP_BOTTOM' | 'SCALE';
  /**
   * Horizontal constraint as an enum
   * "LEFT": Node is laid out relative to left of the containing frame
   * "RIGHT": Node is laid out relative to right of the containing frame
   * "CENTER": Node is horizontally centered relative to containing frame
   * "LEFT_RIGHT": Both left and right of node are constrained relative to containing frame (node stretches with frame)
   * "SCALE": Node scales horizontally with containing frame
   */
  readonly horizontal: 'LEFT' | 'RIGHT' | 'CENTER' | 'LEFT_RIGHT' | 'SCALE';
};

/** Guides to align and place objects within a frame */
export type LayoutGrid = {
  /**
   * Orientation of the grid as a string enum
   * "COLUMNS": Vertical grid
   * "ROWS": Horizontal grid
   * "GRID": Square grid
   */
  readonly pattern: 'COLUMNS' | 'ROWS' | 'GRID';
  /** Width of column grid or height of row grid or square grid spacing */
  readonly sectionSize: number;
  /** Is the grid currently visible? */
  readonly visible: boolean;
  /** Color of the grid */
  readonly color: Color;
  /**
   * Positioning of grid as a string enum
   * "MIN": Grid starts at the left or top of the frame
   * "MAX": Grid starts at the right or bottom of the frame
   * "CENTER": Grid is center aligned
   */
  readonly alignment: 'MIN' | 'MAX' | 'CENTER';
  /** Spacing in between columns and rows */
  readonly gutterSize: number;
  /** Spacing before the first column or row */
  readonly offset: number;
  /** Number of columns or rows */
  readonly count: number;
};

/** A visual effect such as a shadow or blur */
export type Effect = {
  /** Type of effect as a string enum */
  readonly type: 'INNER_SHADOW' | 'DROP_SHADOW' | 'LAYER_BLUR' | 'BACKGROUND_BLUR';
  /** Is the effect active? */
  readonly visible: boolean;
  /** Radius of the blur effect (applies to shadows as well) */
  readonly radius: number;

  // The following properties are for shadows only:
  readonly color?: Color;
  readonly blendMode?: BlendMode;
  readonly offset?: Vector2d;
};

type PaintBase = {
  /**
   * How this node blends with nodes behind it in the scene
   * (see blend mode section for more details)
   */
  readonly blendMode: BlendMode;
  /**
   * Is the paint enabled?
   * @default true
   */
  readonly visible?: boolean;
  /**
   * Overall opacity of paint (colors within the paint can also have opacity
   * values which would blend with this)
   * @default 1
   */
  readonly opacity?: number;
};

export type SolidPaint = PaintBase & {
  readonly type: 'SOLID';
  /** Solid color of the paint */
  readonly color: Color;
};

export type GradientPaint = PaintBase & {
  type: PaintTypeGradient;
  // for gradient paints
  /**
   * This field contains three vectors, each of which are a position in
   * normalized object space (normalized object space is if the top left
   * corner of the bounding box of the object is (0, 0) and the bottom
   * right is (1,1)). The first position corresponds to the start of the
   * gradient (value 0 for the purposes of calculating gradient stops),
   * the second position is the end of the gradient (value 1), and the
   * third handle position determines the width of the gradient (only
   * relevant for non-linear gradients).
   *
   */
  readonly gradientHandlePositions?: readonly Vector2d[];
  /**
   * Positions of key points along the gradient axis with the colors
   * anchored there. Colors along the gradient are interpolated smoothly
   * between neighboring gradient stops.
   */
  readonly gradientStops?: readonly ColorStop[];
};

export type ImagePaint = {
  type: PaintTypeImage;
  /** Image scaling mode */
  readonly scaleMode?: ScaleMode;
  /**
   * Affine transform applied to the image, only present if scaleMode is `STRETCH`
   */
  readonly imageTransform?: Transform;
  /**
   * Amount image is scaled by in tiling, only present if scaleMode is `TILE`
   */
  readonly scalingFactor?: number;
  /**
   * A reference to an image embedded in the file. To download the image using this reference,
   * use the GET file images endpoint to retrieve the mapping from image references to image URLs
   */
  readonly imageRef?: string;
  /**
   * A reference to the GIF embedded in this node, if the image is a GIF.
   * To download the image using this reference,
   * use the GET file images endpoint to retrieve the mapping from image references to image URLs
   */
  readonly gifRef?: string;
};

/** A solid color, gradient, or image texture that can be applied as fills or strokes */
export type Paint = SolidPaint | GradientPaint | ImagePaint;

export type Path = {
  /** A sequence of path commands in SVG notation */
  readonly path: string;
  /** Winding rule for the path */
  readonly windingRule: 'EVENODD' | 'NONZERO';
};

export type Transform = readonly (readonly number[])[];

/** A 2d vector */
export type Vector2d = {
  /** X coordinate of the vector */
  readonly x: number;
  /** Y coordinate of the vector */
  readonly y: number;
};

/** A position color pair representing a gradient stop */
export type ColorStop = {
  /** Value between 0 and 1 representing position along gradient axis */
  readonly position: number;
  /** Color attached to corresponding position */
  readonly color: Color;
};

/** Metadata for character formatting */
export type TypeStyle = {
  /** Font family of text (standard name) */
  readonly fontFamily: string;
  /** PostScript font name */
  readonly fontPostScriptName: string;
  /** Space between paragraphs in px, 0 if not present */
  readonly paragraphSpacing?: number;
  /** Paragraph indentation in px, 0 if not present */
  readonly paragraphIndent?: number;
  /** Is text italicized? */
  readonly italic?: boolean;
  /** Numeric font weight */
  readonly fontWeight: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
  /** Font size in px */
  readonly fontSize: number;
  /** Horizontal text alignment as string enum */
  readonly textAlignHorizontal: 'LEFT' | 'RIGHT' | 'CENTER' | 'JUSTIFIED';
  /** Vertical text alignment as string enum */
  readonly textAlignVertical: 'TOP' | 'CENTER' | 'BOTTOM';
  /** Space between characters in px */
  readonly letterSpacing: number;
  /** Paints applied to characters */
  readonly fills?: readonly Paint[];
  /** Line height in px */
  readonly lineHeightPx: number;
  /** Line height as a percentage of normal line height */
  readonly lineHeightPercent: number;
  /** The unit of the line height value specified by the user. */
  readonly lineHeightUnit: 'PIXELS' | 'FONT_SIZE_%' | 'INTRINSIC_%';
  /** Text casing applied to the node, default is the original casing */
  readonly textCase?: 'UPPER' | 'LOWER' | 'TITLE';
  /** Text decoration applied to the node, default is none */
  readonly textDecoration?: 'STRIKETHROUGH' | 'UNDERLINE';
  /** Line height as a percentage of the font size. Only returned when lineHeightPercent is not 100. */
  readonly lineHeightPercentFontSize?: number;
};

/**
 * A description of a master component. Helps you identify which component
 * instances are attached to
 */
export type ComponentMetadata = {
  /** The unique identifier of the element */
  readonly key: string;
  /** The name of the element */
  readonly name: string;
  /** The description of the element as entered in the editor */
  readonly description: string;
  /** Links to documentation */
  readonly documentationLinks: string[];
};

export type ComponentSetMetadata = {
  /** The unique identifier of the element */
  readonly key: string;
  /** The name of the element */
  readonly name: string;
  /** The description of the element as entered in the editor */
  readonly description: string;
  /** Links to documentation */
  readonly documentationLinks: string[];
};

export type FrameInfo = {
  /** Id of the frame node within the figma file */
  readonly node_id: string;
  /** The name of the frame */
  readonly name: string;
  /** Background color of the frame */
  readonly background_color: string;
  /** Id of the frame's residing page */
  readonly page_id: string;
  /** Name of the frame's residing page */
  readonly page_name: string;
};

export type SharedElement = {
  /** The unique identifier of the figma file which contains the element */
  readonly file_key: string;
  /** Id of the component node within the figma file */
  readonly node_id: string;
  /** URL link to the element's thumbnail image */
  readonly thumbnail_url: string;
  /** The UTC ISO 8601 time at which the element was created */
  readonly created_at: string;
  /** The UTC ISO 8601 time at which the element was updated */
  readonly updated_at: string;
  /** The user who last updated the element */
  readonly user: User;
} & ComponentMetadata;

/**
 * An arrangement of published UI elements that can be instantiated across figma files
 */
export type FullComponentMetadata = {
  /** Data on component's containing frame, if component resides within a frame */
  readonly containing_frame: FrameInfo;
  /** Data on component's containing page, if component resides in a multi-page file */
  readonly containing_page: unknown; // broken link in the doc
} & SharedElement;

export type FullComponentSetMetadata = FullComponentMetadata;

export type FullStyleMetadata = {
  /** The type of style */
  readonly style_type: StyleType;
  /** A user specified order number by which the style can be sorted */
  readonly sort_position: string;
} & SharedElement;

/**
 *  A description of styles used in a file.
 */
export type Style = {
  /** The name of the stlye */
  readonly name: string;
  /** A description of the style */
  readonly description: string;
  /** The unique identifier of the style */
  readonly key: string;
  /** The type of style */
  readonly styleType: StyleType;
  /** Whether this style is a remote style that doesn't live in this file */
  readonly remote: boolean;
};

// General API Types

/** A comment or reply left by a user */
export type Comment = {
  /** Unique identifier for comment */
  readonly id: string;
  /** The file in which the comment lives */
  readonly file_key: string;
  /** If present, the id of the comment to which this is the reply */
  readonly parent_id: string;
  /** The user who left the comment */
  readonly user: User;
  /** The time at which the comment was left */
  readonly created_at: Date;
  /** If set, when the comment was resolved */
  readonly resolved_at: Date | null;
  /**
   * (MISSING IN DOCS)
   * The content of the comment
   */
  readonly message: string;
  readonly client_meta: Vector2d | FrameOffset;
  /**
   * Only set for top level comments. The number displayed with the
   * comment in the UI
   */
  readonly order_id: number;
};

/** A description of a user */
export type User = {
  /** Unique stable id of the user */
  readonly id: string;
  /** Name of the user */
  readonly handle: string;
  /** URL link to the user's profile image */
  readonly img_url: string;
};

/** A relative offset within a frame */
export type FrameOffset = {
  /** Unique id specifying the frame */
  readonly node_id: string;
  /** 2d vector offset within the frame */
  readonly node_offset: Vector2d;
};

export type ProjectSummary = {
  readonly id: string;
  readonly name: string;
};

export type FileResponse = {
  readonly components: Readonly<Record<string, ComponentMetadata>>;
  readonly styles: Readonly<Record<string, Style>>;
  readonly document: Document;
  readonly lastModified: string;
  readonly name: string;
  readonly role: RoleType;
  readonly schemaVersion: number;
  readonly thumbnailUrl: string;
  readonly version: string;
};

export type NodeStyles = Readonly<Record<string, Style>>;

export type NodeResponse = {
  readonly document: Node;
  readonly components: Readonly<Record<string, ComponentMetadata>>;
  readonly componentSets: Readonly<Record<string, ComponentSetMetadata>>;
  readonly styles: NodeStyles;
  readonly schemaVersion: number;
};

export type FileNodesResponse = {
  readonly nodes: Readonly<Record<string, null | NodeResponse>>;
  readonly lastModified: string;
  readonly name: string;
  readonly role: RoleType;
  readonly thumbnailUrl: string;
  readonly version: string;
};

export type VersionMetadata = {
  /** Unique identifier for version */
  readonly id: string;
  /** The UTC ISO 8601 time at which the version was created */
  readonly created_at: string;
  /** The label given to the version in the editor */
  readonly label: string;
  /** The description of the version as entered in the editor */
  readonly description: string;
  /** The user that created the version */
  readonly user: User;
};

export type FileVersionsResponse = {
  readonly versions: readonly VersionMetadata[];
};

export type FileImageResponse = {
  readonly err: string | null;
  readonly images: Readonly<Record<string, string>>;
};

export type FileImageFillsResponse = {
  readonly error: boolean;
  readonly status: number;
  readonly meta: {
    readonly images: Readonly<Record<string, string>>;
  };
};

export type CommentsResponse = {
  readonly comments: readonly Comment[];
};

export type ComponentResponse = {
  readonly error: boolean;
  readonly status: number;
  readonly meta: FullComponentMetadata;
};

export type ComponentSetResponse = {
  readonly error: boolean;
  readonly status: number;
  readonly meta: FullComponentSetMetadata;
};

export type StyleResponse = {
  readonly error: boolean;
  readonly status: number;
  readonly meta: FullStyleMetadata;
};

export type FileSummary = {
  readonly key: string;
  readonly name: string;
  readonly thumbnail_url: string;
  readonly last_modified: string;
};

export type TeamProjectsResponse = {
  readonly name: string;
  readonly projects: readonly ProjectSummary[];
};

export type ProjectFilesResponse = {
  readonly name: string;
  readonly files: readonly FileSummary[];
};

type PaginationMeta = {
  readonly before: number;
  readonly after: number;
};

export type TeamComponentsResponse = {
  readonly error: boolean;
  readonly status: number;
  readonly meta: {
    readonly components: readonly FullComponentMetadata[];
    readonly cursor: PaginationMeta;
  };
};

export type FileComponentsResponse = {
  readonly error: boolean;
  readonly status: number;
  readonly meta: {
    readonly components: readonly FullComponentMetadata[];
  };
};

export type TeamComponentSetsResponse = {
  readonly error: boolean;
  readonly status: number;
  readonly meta: {
    readonly component_sets: readonly FullComponentSetMetadata[];
    readonly cursor: PaginationMeta;
  };
};

export type FileComponentSetsResponse = {
  readonly error: boolean;
  readonly status: number;
  readonly meta: {
    readonly component_sets: readonly FullComponentSetMetadata[];
  };
};

export type TeamStylesResponse = {
  readonly error: boolean;
  readonly status: number;
  readonly meta: {
    readonly styles: readonly FullStyleMetadata[];
    readonly cursor: PaginationMeta;
  };
};

export type FileStylesResponse = {
  readonly error: boolean;
  readonly status: number;
  readonly meta: {
    readonly styles: FullStyleMetadata[];
  };
};
