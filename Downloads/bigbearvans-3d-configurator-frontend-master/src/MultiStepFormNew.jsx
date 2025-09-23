import React, { useState, useCallback, Suspense } from "react";
import axios from "axios";
import { useAuth } from "./context/AuthContext";
import { Modal, Button, Spinner } from "react-bootstrap";
import AWS from "aws-sdk";
import { Buffer } from "buffer";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter";

import Ceiling from "./components/model-components/Ceiling";
import DinetteBed from "./components/model-components/DinetteBed";
import DinetteCushionSet from "./components/model-components/DinetteCushionSet";
import Elevatorbed from "./components/model-components/Elevatorbed";
import JumpSeat from "./components/model-components/JumpSeat";
import MaxxAirFan from "./components/model-components/MaxxAirFan";
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
import HighRoofLadder from "./components/ex-model-components/HighRoofLadder";
import PopoutWindows from "./components/ex-model-components/PopoutWindows";
import { BubbleWindow } from "./components/ex-model-components/BubbleWindow";
import ExportButton from "./components/ExportButton";
import "./MultiStepForm.css";

const MultiStepForm = ({
  setModelUrl,
  setUploadProgress,
  setUploadSuccess,
  uploadProgress,
  sceneRef,
  addModelToScene,
  removeModelFromScene,
  getAddedQuantity,
  showExterior,
  toggleExterior,
  setActiveModelId,
  setActiveExteriorModelId,
}) => {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [shareLink, setShareLink] = useState("");

  // Define interior and exterior models (same as before)
  const interiorModels = [
    {
      label: "Jump Seat",
      image: "/images/jump-seat.webp",
      component: (props) => <JumpSeat {...props} isVisible={isVisible} />,
      type: "jumpseat",
      group: "Driver’s Area",
      description: "A compact seat for extra capacity.",
    },
    {
      label: "Lagun Table",
      image: "/images/lagun-table.webp",
      component: (props) => <LagunTable {...props} isVisible={isVisible} />,
      type: "jumpseat",
      group: "Driver’s Area",
      description: "Swiveling table with built-in cup holder.",
    },
    {
      label: "Swivel Seat",
      image: "/images/swivel-seat.webp",
      component: (props) => <SwivelSeat {...props} isVisible={isVisible} />,
      type: "swivelseat",
      group: "Behind the Driver",
      description: "Rotating seat for flexible use",
    },

    {
      label: "Dinette Bed",
      image: "/images/dinettebed.webp",
      component: DinetteBed,
      type: "dinette",
      group: "Bed/Dinette",
      description: "Convertible bed with cushions.",
    },
    {
      label: "Dinette Cushion Set",
      image: "/images/cushion-bed.webp",
      component: DinetteCushionSet,
      type: "cushion",
      group: "Bed/Dinette",
      description: "Soft cushions for your dinette.",
    },
    {
      label: "Swivel Table",
      image: "/images/swivel-table.webp",
      component: SwivelTable,
      type: "swiveltable",
      group: "Bed/Dinette",
      description: "Rotating table for dining or work.",
    },
    {
      label: "Elevator Bed",
      image: "/images/elevatorbed.webp",
      component: Elevatorbed,
      type: "bed",
      group: "Bed/Dinette",
      description: "Adjustable, elevating bed.",
    },
    {
      label: "Reading Light",
      image: "/images/reading-light.webp",
      component: ReadingLight,
      type: "light",
      group: "Bed/Dinette",
      description: "Focused light for reading.",
    },
    {
      label: "Shower Box",
      image: "/images/showerbox.webp",
      component: ShowerBox,
      type: "showerbox",
      group: "Bed/Dinette",
      description: "Enclosed shower box.",
    },
    {
      label: "Minimalist Kitchen",
      image: "/images/minimalist-kitchen.webp",
      component: KitchenWithoutShakerStyle,
      type: "kitchen",
      group: "Behind the Passenger Seat",
      description: "Compact cooking area.",
    },
    {
      label: "Undermount Sink",
      image: "/images/undermount-sink.webp",
      component: UndermountSink,
      type: "Sink",
      group: "Behind the Passenger Seat",
      description: "Sink mounted below the countertop.",
    },
    {
      label: "Black Faucet",
      image: "/images/black-faucet.webp",
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
      image: "/images/small-stove.webp",
      component: StoveSmall,
      type: "stove",
      group: "Behind the Passenger Seat",
      description: "Compact stove for cooking.",
    },
    {
      label: "Stove Large",
      image: "/images/large-stove.webp",
      component: StoveLarge,
      type: "stove",
      group: "Behind the Passenger Seat",
      description: "Large cooking stove",
    },
    {
      label: "Extended Countertop",
      image: "/images/extended-countertop.webp",
      component: KitchenExtendedCountertop,
      type: "Countertop",
      group: "Behind the Passenger Seat",
      description: "Extra-long work surface.",
    },
    {
      label: "Compact Fridge",
      image: "/images/tall-fridge.webp",
      component: SmallFridge,
      type: "appliance",
      description: "Compact refrigerator",
      group: "Behind the Passenger Seat",
    },
    {
      label: "Sink Cover",
      image: "/images/sink-cover.webp",
      component: UndermountSinkCover,
      type: "sinkover",
      group: "Behind the Passenger Seat",
      description: "Cover to extend counter space.",
    },
    {
      label: "Wall Cabinet Above Kitchen",
      image: "/images/wallcabinet-above-kitchen.webp",
      component: WallCabinetAboveKitchen,
      type: "wall-cabinet-kitchen",
      group: "Behind the Passenger Seat",
      description: "Storage for kitchen items",
    },
    {
      label: "Partition Wall",
      image: "/images/partation-wall.webp",
      component: PartationWall,
      type: "partition-panel",
      group: "Behind the Passenger Seat",
      description: "Dividing wall for space optimization.",
    },
    {
      label: "Wall Cabinet Driver Side",
      image: "/images/wall-cabinet-driverside.webp",
      component: (props) => (
        <WallCabinetDriverSide {...props} isVisible={isVisible} />
      ),
      type: "wall-cabinet-driver",
      group: "Behind the Driver",
      description: "Overhead storage with microwave.",
    },
    {
      label: "Shower Small",
      image: "/images/small-shower.webp",
      component: (props) => <ShowerS {...props} isVisible={isVisible} />,
      type: "shower",
      group: "Shower",
      description: "Compact shower unit.",
    },
    {
      label: "Shower Medium",
      image: "/images/shower.webp",
      component: (props) => <ShowerM {...props} isVisible={isVisible} />,
      type: "shower",
      group: "Shower",
      description: "Medium-sized shower unit.",
    },
    {
      label: "Wall Panels",
      image: "/images/wall-panel.webp",
      component: WallPanels,
      type: "wall-panel",
      group: "Panel",
      description: "Decorative wall panels.",
    },
    {
      label: "Ceiling",
      image: "/images/ceiling.webp",
      component: Ceiling,
      type: "ceiling",
      group: "Panel",
      description: "Ceiling finish panels.",
    },
  ];

  const stepDescriptions = {
    "Driver’s Area": "Enhance the driver's cabin for functionality.",
    "Behind the Driver": "Optimize space behind the driver's seat.",
    "Bed/Dinette": "Design a versatile sleeping and dining space.",
    Shower: "Incorporate efficient bathroom solutions.",
    "Behind the Passenger Seat":
      "Finish off your design by perfecting the overhead details.",
    Panel: "Customize interior surfaces.",
    "Rear-View": "Add features to the rear of the van.",
    Roof: "Enhance the roof with functional elements.",
    Windows: "Select window options for your van.",
    "Right-Side": "Customize the right side of the van.",
    "Left-Side": "Customize the left side of the van.",
    // Add other groups as needed.
  };
  const exteriorModels = [
    {
      label: "Storage Box",
      image: "/images/storage-box.webp",
      component: StorageBox,
      type: "storage",
      group: "Rear-View",
      description: "Extra storage capacity for your van.",
    },
    {
      label: "AC",
      image: "/images/ac.webp",
      component: Ac,
      type: "climate-control",
      group: "Roof",
      description: "Air conditioner for effective cooling.",
    },
    {
      label: "Maxx Air Fan",
      image: "/images/max-air-fan.webp",
      component: MaxxAirFan,
      type: "ventilation",
      group: "Roof",
      description: "Roof-mounted fan for improved ventilation.",
    },
    {
      label: "Awning",
      image: "/images/awning.webp",
      component: Awning,
      type: "awning",
      group: "Right-Side",
      description: "Extendable awning for shade.",
    },
    {
      label: "Back Carrier",
      image: "/images/bc.webp",
      component: BackCarrier,
      type: "carrier",
      group: "Rear-View",
      description: "Carrier mounted at the back.",
    },
    {
      label: "High Roof Ladder",
      image: "/images/ladder.webp",
      component: HighRoofLadder,
      type: "ladder",
      group: "Left-Side",
      description: "Ladder for high roof access.",
    },

    {
      label: "Flat Window",
      image: "/images/flate-window.webp",
      component: FlatWindow,
      type: "window",
      group: "Windows",
      description: "Sleek, flush-mounted window.",
    },
    {
      label: "Popout Windows",
      image: "/images/poutwindow.webp",
      component: PopoutWindows,
      type: "window",
      group: "Windows",
      description: "Standard outward-opening windows.",
    },
    {
      label: "Bubble Windows",
      image: "/images/poutwindow.webp",
      component: BubbleWindow,
      type: "window",
      group: "Windows",
      description: " Protruding design for expanded views.",
    },

    {
      label: "Roof Rack",
      image: "/images/roofrack.webp",
      component: RoofRack,
      type: "roof-rack",
      group: "Roof",
      description: "Sturdy rack for roof storage.",
    },
    {
      label: "Solar",
      image: "/images/solar.webp",
      component: Solar,
      type: "solar",
      group: "Roof",
      description: "Solar panels for renewable power.",
    },
  ];

  const groupByGroup = (models) =>
    models.reduce((acc, model) => {
      if (!acc[model.group]) acc[model.group] = [];
      acc[model.group].push(model);
      return acc;
    }, {});

  const interiorSteps = Object.entries(groupByGroup(interiorModels));
  const exteriorSteps = Object.entries(groupByGroup(exteriorModels));
  const steps = showExterior ? exteriorSteps : interiorSteps;

  const handleCardClick = (model) => {
    toggleModelSelection(model);
  };

  const toggleModelSelection = (model) => {
    const quantity = getAddedQuantity(model.label);
    if (quantity > 0) removeModelFromScene(model.label);
    else addModelToScene(model);
  };

  // Export scene to S3 and generate share link
  const exportScene = () => {
    const scene = sceneRef.current?.getScene();
    if (!scene) return console.error("Scene is undefined.");

    setShowSuccessPopup(true);
    setIsUploading(true);

    AWS.config.update({
      accessKeyId: import.meta.env.VITE_REACT_APP_AWS_ACCESS_KEY_ID,
      secretAccessKey: import.meta.env.VITE_REACT_APP_AWS_SECRET_ACCESS_KEY,
      region: import.meta.env.VITE_REACT_APP_AWS_REGION,
    });
    const s3 = new AWS.S3({ apiVersion: "2012-10-17" });

    const formattedUserName = user?.name?.replace(/\s+/g, '-').toLowerCase();
    const counterKey = `${formattedUserName}-exportCount`;
    let exportCount = parseInt(sessionStorage.getItem(counterKey) || "0", 10);
    exportCount += 1;
    sessionStorage.setItem(counterKey, exportCount.toString());
    const usernameWithCount = `${formattedUserName}-${exportCount}`;
    const userExportKey = `${usernameWithCount}-campervan-sp-144.glb`;

    const exporter = new GLTFExporter();
    exporter.parse(
      scene,
      (gltf) => {
        const params = {
          Bucket: import.meta.env.VITE_REACT_APP_AWS_S3_BUCKET_NAME,
          Key: userExportKey,
          Body: Buffer.from(gltf),
          ContentType: "application/octet-stream",
        };
        const upload = s3.upload(params);

        upload.on("httpUploadProgress", (progress) => {
          const percent = Math.round((progress.loaded * 100) / progress.total);
          setUploadProgress(percent);
        });

        upload.send((err, data) => {
          setIsUploading(false);
          if (err) return console.error("Upload error:", err);

          setUploadProgress(0);
          setUploadSuccess(true);

          const getSignedUrlParams = {
            Bucket: import.meta.env.VITE_REACT_APP_AWS_S3_BUCKET_NAME,
            Key: userExportKey,
            Expires: 60 * 60 * 24 * 7,
          };
          s3.getSignedUrl("getObject", getSignedUrlParams, async (err, url) => {
            if (err) console.error("Signed URL error:", err);
            else {
              setModelUrl(url);
              try {
                const response = await axios.post(
                  `${import.meta.env.VITE_REACT_APP_API_URL}/api/links/secure`,
                  { s3Url: url, name: usernameWithCount },
                  { headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` } }
                );
                const link = `${window.location.origin}/share?code=${response.data.code}`;
                setShareLink(link);
              } catch (error) {
                console.error("Link creation error:", error);
              }
            }
          });
        });
      },
      (error) => {
        setIsUploading(false);
        console.error("Export error:", error);
      },
      { binary: true }
    );
  };

  const goToPrevStep = useCallback(() => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
    else if (showExterior) {
      toggleExterior(false);
      setCurrentStep(interiorSteps.length - 1);
    }
  }, [currentStep, showExterior, toggleExterior, interiorSteps.length]);

  const goToNextStep = useCallback(() => {
    if (currentStep < steps.length - 1) setCurrentStep((prev) => prev + 1);
    else if (!showExterior) {
      toggleExterior(true);
      setCurrentStep(0);
    }
  }, [currentStep, steps.length, showExterior, toggleExterior]);

  return (
    <div className="container my-1 main-content">
      {/* Upload Status Modal */}
      <Modal show={showSuccessPopup} onHide={() => setShowSuccessPopup(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Upload Status</Modal.Title>
        </Modal.Header>
        <Suspense fallback={<span className="loading">Uploading...</span>}>
          <Modal.Body>
            {isUploading ? (
              uploadProgress > 0 ? (
                <div className="text-center">
                  Uploading... {uploadProgress}%
                  <div style={{ width: "100%", height: "10px", backgroundColor: "grey", marginTop: "10px" }}>
                    <div style={{ width: `${uploadProgress}%`, height: "10px", backgroundColor: "blue" }} />
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <p>Generating GLB...</p>
                  <Spinner animation="border" />
                </div>
              )
            ) : shareLink ? (
              <>
                <p>Your model has been uploaded successfully!</p>
                <p>Share your creation:</p>
                <div className="input-group">
                  <input type="text" className="form-control" value={shareLink} readOnly />
                  <Button variant="primary" onClick={() => navigator.clipboard.writeText(shareLink)}>
                    Copy Link
                  </Button>
                </div>
              </>
            ) : (
              <p>Starting upload...</p>
            )}
          </Modal.Body>
        </Suspense>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSuccessPopup(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

{/* --- Step toggles (Interior / Exterior) --- */}
<div className="d-flex justify-content-center mb-4">
  <button
    className={`btn ${!showExterior ? "btn-light" : "btn-outline-light"}`}
    onClick={() => {
      toggleExterior(false);
      setCurrentStep(0);
    }}
  >
    Interior
  </button>
  <button
    className={`btn ms-3 ${showExterior ? "btn-light" : "btn-outline-light"}`}
    onClick={() => {
      toggleExterior(true);
      setCurrentStep(0);
    }}
  >
    Exterior
  </button>
</div>

{/* --- Step indicators --- */}
<div className="d-flex justify-content-center mb-4 flex-wrap grid gap-2">
  {steps.map(([type], index) => (
    <div
      key={type}
      className={`mx-0 p-0 rounded-circle d-flex justify-content-center align-items-center ${
        index === currentStep
          ? "bg-primary text-white"
          : index < currentStep
          ? "border-success btn-custom text-white"
          : "border-light bg-secondary-subtle"
      }`}
      style={{ width: "35px", height: "35px", cursor: "pointer" }}
      onClick={() => setCurrentStep(index)}
    >
      {index + 1}
    </div>
  ))}
</div>

{/* --- Section title & description --- */}
<h2 className="text-start mb-4">
  {steps[currentStep][0].replace(/-/g, " ")}
</h2>
<p>{stepDescriptions[steps[currentStep][0]]}</p>

{/* --- Model cards grid --- */}
<div className="shadow-sm main-content">
  <div className="row">
    {steps[currentStep][1].map((model) => (
      <div key={model.label} className="col-md-12 mb-3">
        <div
          className={`bbv-parts clickable-card ${
            getAddedQuantity(model.label) > 0
              ? "bg-white text-black border-success border-5"
              : "border-light"
          }`}
          style={{ cursor: "pointer" }}
          onClick={() => handleCardClick(model)}
        >
          <div className="row g-0">
            <div className="col-4">
              <img
                src={model.image}
                alt={model.label}
                className="img-fluid rounded-start float-start"
                style={{ width: "100px", height: "90px" }}
              />
            </div>
            <div className="col-8">
              <div className="card-body p-2">
                <h6 className="card-title">{model.label}</h6>
                {model.description && (
                  <p className="card-text">{model.description}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

      <div className="d-flex justify-content-between mt-3">
        <button className="btn btn-secondary" onClick={goToPrevStep} disabled={currentStep === 0 && !showExterior}>
          Previous
        </button>

        {currentStep === steps.length - 1 && showExterior ? (
          <ExportButton
            onSave={exportScene}
            isUploading={isUploading}
            setIsSelected={setIsSelected}
            setActiveModelId={setActiveModelId}
            setActiveExteriorModelId={setActiveExteriorModelId}
          />
        ) : (
          <button className="btn btn-primary" onClick={goToNextStep}>
            {currentStep === steps.length - 1 ? "Exterior" : "Next"}
          </button>
        )}
      </div>
    </div>
  );
};

export default MultiStepForm;
