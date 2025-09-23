import Ceiling from "./components/model-components/Ceiling";
import DinetteBed from "./components/model-components/DinetteBed";
import DinetteCushionSet from "./components/model-components/DinetteCushionSet";
import Elevatorbed from "./components/model-components/Elevatorbed";
import JumpSeat from "./components/model-components/JumpSeat";
import MaxxAirFan from "./components/model-components/MaxxAirFan";
import SideLadder from "./components/ex-model-components/SideLadder";
import StorageBox from "./components/model-components/StorageBox";
import ReadingLight from "./components/model-components/ReadingLight";
import { ShowerM } from "./components/model-components/ShowerM";
import ShowerBox from "./components/model-components/ShowerBox";
import SwivelSeat from "./components/model-components/SwivelSeat";
import SwivelTable from "./components/model-components/SwivelTable";
import WallCabinetAboveKitchen from "./components/model-components/WallCabinetAboveKitchen";
import { WallCabinetDriverSide } from "./components/model-components/WallCabinetDriverSide";
import WallPanels from "./components/model-components/WallPanels";
import { FlatWindow } from "./components/model-components/FlatWindow";
import { LagunTable } from "./components/model-components/LagunTable";
import { PartationWall } from "./components/model-components/PartationWall";
import { RoofRack } from "./components/model-components/RoofRack";
import { Ac } from "./components/model-components/Ac";
import { Solar } from "./components/model-components/Solar";
import { StoveSmall } from "./components/model-components/StoveSmall";
import { StoveLarge } from "./components/model-components/StoveLarge";
import { ShowerS } from "./components/model-components/ShowerS";
import { BlackFaucet } from "./components/model-components/BlackFaucet";
import { FaucetV2 } from "./components/model-components/FaucetV2";
import { KitchenExtendedCountertop } from "./components/model-components/KitchenExtendedCountertop";
import { KitchenWithoutShakerStyle } from "./components/model-components/KitchenWithoutShakerStyle";
import { UndermountSinkCover } from "./components/model-components/UndermountSinkCover";
import { UndermountSink } from "./components/model-components/UndermountSink";
import { SmallFridge } from "./components/model-components/SmallFridge";
import Awning from "./components/ex-model-components/Awning";
import BackCarrier from "./components/ex-model-components/BackCarrier";
// import HighRoofLadder from "./components/ex-model-components/HighRoofLadder";
import PopoutWindows from "./components/ex-model-components/PopoutWindows";
import { BubbleWindow } from "./components/ex-model-components/BubbleWindow";

// --- INTERIOR MODELS ---
const interiorModels = [
  {
    label: "Jump Seat",
    image: "/images/png/jump-seat.png",
    component: (props) => <JumpSeat {...props} isVisible={props?.isVisible} />,
    type: "jumpseat",
    group: "Driver’s Area",
    description: "A compact seat for extra capacity.",
  },
  {
    label: "Lagun Table",
    image: "/images/png/lagun-table.png",
    component: (props) => <LagunTable {...props} isVisible={props?.isVisible} />,
    type: "jumpseat",
    group: "Driver’s Area",
    description: "Swiveling table with built-in cup holder.",
  },
  {
    label: "Swivel Seat",
    image: "/images/png/swivel-seat.png",
    component: (props) => <SwivelSeat {...props} isVisible={props?.isVisible} />,
    type: "swivelseat",
    group: "Behind the Driver",
    description: "Rotating seat for flexible use",
  },
  {
    label: "Dinette Bed",
    image: "/images/png/dinettebed.png",
    component: DinetteBed,
    type: "dinette",
    group: "Bed/Dinette",
    description: "Convertible bed with cushions.",
  },
  {
    label: "Dinette Cushion Set",
    image: "/images/png/cushion-bed.png",
    component: DinetteCushionSet,
    type: "cushion",
    group: "Bed/Dinette",
    description: "Soft cushions for your dinette.",
  },
  {
    label: "Swivel Table",
    image: "/images/png/swivel-table.png",
    component: SwivelTable,
    type: "swiveltable",
    group: "Bed/Dinette",
    description: "Rotating table for dining or work.",
  },
  {
    label: "Elevator Bed",
    image: "/images/png/elevatorbed.png",
    component: Elevatorbed,
    type: "bed",
    group: "Bed/Dinette",
    description: "Adjustable, elevating bed.",
  },
  {
    label: "Reading Light",
    image: "/images/png/reading-single.png",
    component: ReadingLight,
    type: "light",
    group: "Bed/Dinette",
    description: "Focused light for reading.",
  },
  {
    label: "Shower Box",
    image: "/images/png/shower-box-one.png",
    component: ShowerBox,
    type: "showerbox",
    group: "Bed/Dinette",
    description: "Enclosed shower box.",
  },
  {
    label: "Minimalist Kitchen",
    image: "/images/png/minimalist-kitchen.jpg",
    component: KitchenWithoutShakerStyle,
    type: "kitchen",
    group: "Behind the Passenger Seat",
    description: "Compact cooking area.",
  },
  {
    label: "Undermount Sink",
    image: "/images/png/undermount-sink.png",
    component: UndermountSink,
    type: "Sink",
    group: "Behind the Passenger Seat",
    description: "Sink mounted below the countertop.",
  },
  {
    label: "Black Faucet",
    image: "/images/png/black-faucet.png",
    component: BlackFaucet,
    type: "Faucet",
    group: "Behind the Passenger Seat",
    description: "Modern, sleek faucet",
  },
  {
    label: "Black Faucet Version ",
    image: "/images/faucet-two.png",
    component: FaucetV2,
    type: "Faucet",
    group: "Behind the Passenger Seat",
    description: "Double, sleek faucet",
  },
  {
    label: "Stove Small",
    image: "/images/png/small-stove.png",
    component: StoveSmall,
    type: "stove",
    group: "Behind the Passenger Seat",
    description: "Compact stove for cooking.",
  },
  {
    label: "Stove Large",
    image: "/images/png/large-stove.png",
    component: StoveLarge,
    type: "stove",
    group: "Behind the Passenger Seat",
    description: "Large cooking stove",
  },
  {
    label: "Extended Countertop",
    image: "/images/png/extended-countertop.png",
    component: KitchenExtendedCountertop,
    type: "Countertop",
    group: "Behind the Passenger Seat",
    description: "Extra-long work surface.",
  },
  {
    label: "Compact Fridge",
    image: "/images/png/small-fridge.png",
    component: SmallFridge,
    type: "appliance",
    description: "Compact refrigerator",
    group: "Behind the Passenger Seat",
  },
  {
    label: "Sink Cover",
    image: "/images/png/sink-cover.png",
    component: UndermountSinkCover,
    type: "sinkover",
    group: "Behind the Passenger Seat",
    description: "Cover to extend counter space.",
  },
  {
    label: "Wall Cabinet Above Kitchen",
    image: "/images/png/wallcabinet-above-kitchen.png",
    component: WallCabinetAboveKitchen,
    type: "wall-cabinet-kitchen",
    group: "Behind the Passenger Seat",
    description: "Storage for kitchen items",
  },
  {
    label: "Partition Wall",
    image: "/images/png/partation-wall.png",
    component: PartationWall,
    type: "partition-panel",
    group: "Behind the Passenger Seat",
    description: "Dividing wall for space optimization.",
  },
  {
    label: "Wall Cabinet Driver Side",
    image: "/images/png/wall-cabinet-driverside.png",
    component: (props) => <WallCabinetDriverSide {...props} isVisible={props?.isVisible} />,
    type: "wall-cabinet-driver",
    group: "Behind the Driver",
    description: "Overhead storage with microwave.",
  },
  {
    label: "Shower Small",
    image: "/images/png/small-shower.png",
    component: (props) => <ShowerS {...props} isVisible={props?.isVisible} />,
    type: "shower",
    group: "Shower",
    description: "Compact shower unit.",
  },
  {
    label: "Shower Medium",
    image: "/images/png/shower.png",
    component: (props) => <ShowerM {...props} isVisible={props?.isVisible} />,
    type: "shower",
    group: "Shower",
    description: "Medium-sized shower unit.",
  },
  {
    label: "Wall Panels",
    image: "/images/png/wall-panel-one.png",
    component: (props) => (
      <WallPanels
        {...props}
        isSelected={props?.lastSelectedLabel === "Wall Panels"}
      />
    ),
    type: "wall-panel",
    group: "Panel",
    description: "Decorative wall panels.",
  },
  {
    label: "Ceiling",
    image: "/images/png/ceiling.png",
    component: (props) => <Ceiling {...props} />,
    type: "ceiling",
    group: "Panel",
    description: "Ceiling finish panels.",
  },
];

// --- EXTERIOR MODELS ---
const exteriorModels = [
  {
    label: "Awning",
    image: "/images/png/awning.png",
    component: Awning,
    type: "awning",
    group: "Right-Side",
    description: "Extendable awning for shade.",
  },
  {
    label: "Storage Box",
    image: "/images/png/storage-box.png",
    component: StorageBox,
    type: "storage",
    group: "Rear-View",
    description: "Extra storage capacity for your van.",
  },
  {
    label: "Back Carrier",
    image: "/images/png/bc.png",
    component: BackCarrier,
    type: "carrier",
    group: "Rear-View",
    description: "Carrier mounted at the back.",
  },
  {
    label: "Side Ladder",
    image: "/images/png/ladder.png",
    component: SideLadder,
    type: "ladder",
    group: "Left-Side",
    description: "Side-mounted access ladder",
  },
  {
    label: "Popout Windows",
    image: "/images/png/poutwindow.png",
    component: PopoutWindows,
    type: "Popout",
    group: "Windows",
    description: "Standard outward-opening windows.",
  },
  {
    label: "Flat Window",
    image: "/images/png/flate-window.png",
    component: FlatWindow,
    type: "window",
    group: "Windows",
    description: "Sleek, flush-mounted window.",
  },
  {
    label: "Bubble Windows",
    image: "/images/png/bubble-window.png",
    component: BubbleWindow,
    type: "window",
    group: "Windows",
    description: " Protruding design for expanded views.",
  },
  {
    label: "Roof Rack",
    image: "/images/png/roofrack.png",
    component: RoofRack,
    type: "roof-rack",
    group: "Roof",
    description: "Sturdy rack for roof storage.",
  },
];

// --- SYSTEM MODELS ---
const systemModels = [
  {
    label: "AC",
    image: "/images/png/ac.png",
    component: Ac,
    type: "climate-control",
    group: "Climate",
    description: "Air conditioner for effective cooling.",
  },
  {
    label: "Solar",
    image: "/images/png/solar.png",
    component: Solar,
    type: "solar",
    group: "Power",
    description: "Solar panels for renewable power.",
  },
  {
    label: "Maxx Air Fan",
    image: "/images/png/max-air-fan.png",
    component: MaxxAirFan,
    type: "ventilation",
    group: "Ventilation",
    description: "Roof-mounted fan for improved ventilation.",
  },
  // Add more system elements as needed
];

export { interiorModels, exteriorModels, systemModels };