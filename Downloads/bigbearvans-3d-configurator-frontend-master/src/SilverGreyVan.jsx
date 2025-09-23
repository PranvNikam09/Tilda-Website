import React, {
  useEffect,
  lazy,
  Suspense,
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import * as THREE from "three";

import { Canvas, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  PivotControls,
  GizmoHelper,
  GizmoViewport,
  Preload,
  Center,
} from "@react-three/drei";

import ViewButtons from "./components/ViewButtons";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";

const Van_SilverGrey = lazy(() => import("./components/van-models/SilverVan"));

import MultiStepForm from "./MultiStepForm";

const ExportableScene = forwardRef(({ exportSceneCallback }, ref) => {
  const { scene } = useThree();

  useEffect(() => {
    exportSceneCallback(scene);
  }, [scene, exportSceneCallback]);

  useImperativeHandle(ref, () => ({
    getScene: () => scene,
  }));

  return null;
});

function SilverGreyVan() {
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [exteriorHistory, setExteriorHistory] = useState([[0, 0, 0]]);
  const [exteriorFuture, setExteriorFuture] = useState([]);
  const [exteriorPivotResetCounter, setExteriorPivotResetCounter] = useState(0);
  const exteriorGroupRef = useRef();

  const [pivotResetCounter, setPivotResetCounter] = useState(0);
  const [addedExteriorModels, setAddedExteriorModels] = useState([]);
  const [activeExteriorModelId, setActiveExteriorModelId] = useState(null);

  const [addedModels, setAddedModels] = useState([]);
  const [sceneToExport, setSceneToExport] = useState(null);
  const [isPivotoff, setisPivotoff] = useState(false);
  const [showRotateMessage, setShowRotateMessage] = useState(false);
  const [showExterior, setShowExterior] = useState(false);
  const [activeModelId, setActiveModelId] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const [modelUrl, setModelUrl] = useState("");
  const [position, setPosition] = useState([0, 0, 0]);
  const [history, setHistory] = useState([[0, 0, 0]]);
  const [future, setFuture] = useState([]);
  const groupRef = useRef();
  const orbitControlsRef = useRef();
  const sceneRef = useRef(null);
  const [enableRotate, setEnableRotate] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  const toggleRotate = () => {
    setEnableRotate((prev) => !prev);
  };

  const addToHistory = (newPos) => {
    setHistory((prev) => [...prev, newPos]);
    setFuture([]);
  };

  const handleDragEnd = () => {
    if (showExterior && exteriorGroupRef.current && activeExteriorModelId) {
      requestAnimationFrame(() => {
        exteriorGroupRef.current.updateMatrixWorld(true);
        const worldPos = new THREE.Vector3();
        exteriorGroupRef.current.getWorldPosition(worldPos);
        const newPos = [worldPos.x, worldPos.y, worldPos.z];
        setAddedExteriorModels((prevModels) =>
          prevModels.map((model) =>
            model.id === activeExteriorModelId
              ? { ...model, position: newPos }
              : model
          )
        );
        setExteriorHistory((prev) => [...prev, newPos]);
        setExteriorPivotResetCounter((prev) => prev + 1);
      });
    } else if (groupRef.current && !showExterior && activeModelId) {
      requestAnimationFrame(() => {
        groupRef.current.updateMatrixWorld(true);
        const worldPos = new THREE.Vector3();
        groupRef.current.getWorldPosition(worldPos);
        const newPos = [worldPos.x, worldPos.y, worldPos.z];
        setPosition(newPos);
        addToHistory(newPos);
        setAddedModels((prevModels) =>
          prevModels.map((model) =>
            model.id === activeModelId ? { ...model, position: newPos } : model
          )
        );
        setPivotResetCounter((prev) => prev + 1);
      });
    }
  };

  const handleUndo = () => {
    if (history.length > 1) {
      const previous = history[history.length - 2];
      const current = history[history.length - 1];
      setFuture((prev) => [current, ...prev]);
      setHistory((prev) => prev.slice(0, -1));
      setPosition(previous);
      if (groupRef.current && !showExterior && activeModelId) {
        groupRef.current.position.set(...previous);
        groupRef.current.updateMatrixWorld(true);
        setAddedModels((prevModels) =>
          prevModels.map((model) =>
            model.id === activeModelId
              ? { ...model, position: previous }
              : model
          )
        );
      }
    }
  };

  const handleRedo = () => {
    if (future.length > 0) {
      const [next, ...rest] = future;
      setFuture(rest);
      setHistory((prev) => [...prev, next]);
      setPosition(next);
      if (groupRef.current && !showExterior && activeModelId) {
        groupRef.current.position.set(...next);
        groupRef.current.updateMatrixWorld(true);
        setAddedModels((prevModels) =>
          prevModels.map((model) =>
            model.id === activeModelId ? { ...model, position: next } : model
          )
        );
      }
    }
  };

  const handleExteriorUndo = () => {
    if (exteriorHistory.length > 1) {
      const previous = exteriorHistory[exteriorHistory.length - 2];
      const current = exteriorHistory[exteriorHistory.length - 1];
      setExteriorFuture((prev) => [current, ...prev]);
      setExteriorHistory((prev) => prev.slice(0, -1));
      setAddedExteriorModels((prevModels) =>
        prevModels.map((model) =>
          model.id === activeExteriorModelId
            ? { ...model, position: previous }
            : model
        )
      );
      if (exteriorGroupRef.current) {
        exteriorGroupRef.current.position.set(...previous);
        exteriorGroupRef.current.updateMatrixWorld(true);
      }
      setExteriorPivotResetCounter((prev) => prev + 1);
    }
  };

  const handleExteriorRedo = () => {
    if (exteriorFuture.length > 0) {
      const [next, ...rest] = exteriorFuture;
      setExteriorFuture(rest);
      setExteriorHistory((prev) => [...prev, next]);
      setAddedExteriorModels((prevModels) =>
        prevModels.map((model) =>
          model.id === activeExteriorModelId
            ? { ...model, position: next }
            : model
        )
      );
      if (exteriorGroupRef.current) {
        exteriorGroupRef.current.position.set(...next);
        exteriorGroupRef.current.updateMatrixWorld(true);
      }
      setExteriorPivotResetCounter((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      const speed = 0.5;
      if (event.ctrlKey && (event.key === "z" || event.key === "y")) {
        event.preventDefault();
        if (showExterior) {
          event.key === "z" ? handleExteriorUndo() : handleExteriorRedo();
        } else {
          event.key === "z" ? handleUndo() : handleRedo();
        }
        return;
      }
      if (showExterior) {
        if (!activeExteriorModelId) return;
        const activeExterior = addedExteriorModels.find(
          (model) => model.id === activeExteriorModelId
        );
        const currentPos =
          activeExterior && Array.isArray(activeExterior.position)
            ? activeExterior.position
            : [0, 0, 0];
        const newPos = [...currentPos];
        switch (event.key) {
          case "ArrowUp":
            newPos[1] += speed;
            break;
          case "ArrowDown":
            newPos[1] -= speed;
            break;
          case "ArrowLeft":
            newPos[0] -= speed;
            break;
          case "ArrowRight":
            newPos[0] += speed;
            break;
          case "PageUp":
            newPos[2] += speed;
            break;
          case "PageDown":
            newPos[2] -= speed;
            break;
          default:
            return;
        }
        const updatedExteriorModels = addedExteriorModels.map((model) => {
          if (model.id === activeExteriorModelId) {
            return { ...model, position: newPos };
          }
          return model;
        });
        setAddedExteriorModels(updatedExteriorModels);
        setExteriorHistory((prev) => {
          const last = prev[prev.length - 1];
          if (JSON.stringify(last) !== JSON.stringify(newPos)) {
            return [...prev, newPos];
          }
          return prev;
        });
        setExteriorFuture([]);
        setExteriorPivotResetCounter((prev) => prev + 1);
      } else {
        if (!activeModelId) return;
        const newPos = [...position];
        switch (event.key) {
          case "ArrowUp":
            newPos[1] += speed;
            break;
          case "ArrowDown":
            newPos[1] -= speed;
            break;
          case "ArrowLeft":
            newPos[0] -= speed;
            break;
          case "ArrowRight":
            newPos[0] += speed;
            break;
          case "PageUp":
            newPos[2] += speed;
            break;
          case "PageDown":
            newPos[2] -= speed;
            break;
          default:
            return;
        }
        setPosition(newPos);
        addToHistory(newPos);
        if (groupRef.current) {
          groupRef.current.position.set(...newPos);
          groupRef.current.updateMatrixWorld(true);
        }
        const updatedModels = addedModels.map((model) =>
          model.id === activeModelId ? { ...model, position: newPos } : model
        );
        setAddedModels(updatedModels);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    activeModelId,
    addedModels,
    activeExteriorModelId,
    addedExteriorModels,
    showExterior,
    position,
    history,
    future,
    exteriorHistory,
    exteriorFuture,
  ]);

  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.position.set(...position);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerHeight > window.innerWidth) {
        setShowRotateMessage(true);
        setTimeout(() => setShowRotateMessage(false), 2000);
      } else {
        setShowRotateMessage(false);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const MAX_QUANTITY = {
    Ceiling: 1,
    "Control Panel": 1,
    "Dinette Bed": 1,
    "Dinette Cushion Set": 1,
    "Elevator Bed": 1,
    "Jump Seat": 1,
    Kitchen: 1,
    "Maxx Air Fan": 1,
    Microwave: 1,
    "Popout Windows Acrylic": 2,
    "Reading Light": 3,
    Shower: 1,
    "Shower Box": 1,
    "Storage Box": 2,
    "Swivel Seat": 1,
    "Swivel Table": 1,
    "Tall Cabinet Fridge": 1,
    "Tall Cabinet Hanger": 1,
    "Tall Fridge": 1,
    "Wall Cabinet Above Kitchen": 1,
    "Wall Cabinet Behind Driver": 1,
    "Wall Cabinet Driver Side": 1,
    "Wall Panels": 1,
    Ac: 1,
    Awning: 2,
    "Back Carrier": 1,
    "High Roof Ladder": 1,
    "Popout Windows": 2,
    "Roof Rack": 1,
    Solar: 2,
  };

  // Interior Models functions
  const getAddedQuantity = (label) =>
    addedModels.filter((m) => m.label === label).length;

  const addModelToScene = (model) => {
    setAddedModels((prev) => {
      const existingModelIndex = prev.findIndex((m) => m.type === model.type);
      const currentQuantity = prev.filter((m) => m.type === model.type).length;
      if (currentQuantity >= MAX_QUANTITY[model.type]) return prev;
      const newModel = {
        ...model,
        id: Date.now(),
        position:
          existingModelIndex !== -1
            ? prev[existingModelIndex].position
            : [0, 0, 0],
      };
      if (existingModelIndex !== -1) {
        const updatedModels = [...prev];
        updatedModels[existingModelIndex] = newModel;
        setActiveModelId(newModel.id);
        return updatedModels;
      } else {
        setActiveModelId(newModel.id);
        return [...prev, newModel];
      }
    });
  };

  const incrementModelQuantity = (model) => {
    const quantity = getAddedQuantity(model.label);
    if (quantity >= MAX_QUANTITY[model.label]) {
      setPopupMessage(
        `You can add only ${MAX_QUANTITY[model.label]} ${model.label}`
      );
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000);
      return;
    }
    const newModel = { ...model, id: Date.now(), position: [0, 0, 0] };
    setAddedModels((prev) => [...prev, newModel]);
    setActiveModelId(newModel.id);
  };

  const decrementModelQuantity = (label) => {
    setAddedModels((prev) => {
      const instances = prev.filter((m) => m.label === label);
      if (instances.length === 0) return prev;
      const toRemove = instances.reduce((a, b) => (a.id > b.id ? a : b));
      return prev.filter((m) => m.id !== toRemove.id);
    });
  };

  const removeModelFromScene = (label) => {
    setAddedModels((prev) => prev.filter((m) => m.label !== label));
  };

  useEffect(() => {
    return () => {
      if (sceneToExport) {
        sceneToExport.traverse((obj) => {
          if (obj.isMesh) {
            obj.geometry.dispose();
            obj.material.dispose();
          }
        });
      }
    };
  }, [sceneToExport, addedModels]);

  return (
    <div className="container-fluid">
      {showRotateMessage && (
        <div className="bvv-rotate-message">
          For a better experience, please rotate your device.
        </div>
      )}
      <div className="row d-flex">
        <div className="col-xl-8 col-lg-4 col-md-8 col-sm-8 d-flex justify-content-center">
        <ViewButtons
                orbitControlsRef={orbitControlsRef}
                toggleRotate={toggleRotate}
              />
          <Suspense fallback={<span className="loading">Loading...</span>}>

            <div className="canvas-container">

              <Canvas
                // style={{ width: "100%", height: "100%" }}
                gl={{ preserveDrawingBuffer: true }}
                shadows={{ type: "PCFSoftShadowMap", autoUpdate: false }}
                dpr={[1, 1.2]}
                camera={{ position: [-4, 3, -4.8], fov: 50 }}
                frameloop="demand"
              >
                <ambientLight intensity={0.25} />
                <Suspense fallback={null}>
                  <Environment
                    files={"./textures/zwartkops_straight_afternoon_1k.hdr"}
                    background={false}
                    environmentIntensity={1.2}
                  />
                </Suspense>
                <Preload all />
                <Center>
                  <Van_SilverGrey
                    hidePartsWhenFacingCamera={true}
                    showExterior={showExterior}
                  />
                  {addedModels.map((model) => {
                    const ModelComponent = model.component;
                    const keyVal =
                      activeModelId === model.id
                        ? `${model.id}-${pivotResetCounter}`
                        : model.id;
                    return (
                      <PivotControls
                        key={keyVal}
                        depthTest={false}
                        annotations={true}
                        anchor={[0, 0, 0]}
                        onDragEnd={handleDragEnd}
                        enabled={
                          !showExterior &&
                          isPivotoff &&
                          activeModelId === model.id
                        }
                        scale={1.5}
                        disableScaling={true}
                        disableRotations={true}
                        disableSliders={false}
                        opacity={0.9}
                        hoveredColor={0xfff200}
                      >
                        <group
                          ref={activeModelId === model.id ? groupRef : null}
                          position={model.position}
                        >
                          <ModelComponent
                            onClick={() => setActiveModelId(model.id)}
                            isSelected={activeModelId === model.id}
                          />
                        </group>
                      </PivotControls>
                    );
                  })}
                  {addedExteriorModels.map((model) => {
                    const ExteriorModelComponent = model.component;
                    const keyVal =
                      activeExteriorModelId === model.id
                        ? `${model.id}-${exteriorPivotResetCounter}`
                        : model.id;
                    return (
                      <PivotControls
                        key={keyVal}
                        enabled={
                          showExterior &&
                          isPivotoff &&
                          activeExteriorModelId === model.id
                        }
                        depthTest={false}
                        annotations={true}
                        scale={1.5}
                        anchor={[0, 0, 0]}
                        disableScaling={true}
                        disableRotations={true}
                        disableSliders={false}
                        opacity={0.9}
                        hoveredColor={0xfff200}
                        onDragEnd={handleDragEnd}
                      >
                        <group
                          ref={
                            activeExteriorModelId === model.id
                              ? exteriorGroupRef
                              : null
                          }
                          position={model.position}
                        >
                          <ExteriorModelComponent
                            isSelected={activeExteriorModelId === model.id}
                            onClick={() => setActiveExteriorModelId(model.id)}
                          />
                        </group>
                      </PivotControls>
                    );
                  })}
                </Center>
                {/* <GizmoHelper alignment="bottom-left" margin={[50, 50]}>
                  <GizmoViewport labelColor="white" axisHeadScale={1} />
                </GizmoHelper> */}
                <OrbitControls
                  ref={orbitControlsRef}
                  makeDefault
                  enableRotate={enableRotate}
                  enableZoom={true}
                  enablePan={false}
                  maxPolarAngle={Math.PI / 2}
                />
                <ExportableScene
                  ref={sceneRef}
                  exportSceneCallback={setSceneToExport}
                />
              </Canvas>
            </div>
          </Suspense>
        </div>
        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 d-flex justify-content-center align-items-center">
          {/* <div className="bbv-sidebar"> */}
            <MultiStepForm
              isSelected={isSelected}
              addModelToScene={addModelToScene}
              removeModelFromScene={removeModelFromScene}
              incrementModelQuantity={incrementModelQuantity}
              decrementModelQuantity={decrementModelQuantity}
              getAddedQuantity={getAddedQuantity}
              showExterior={showExterior}
              toggleExterior={setShowExterior}
              setActiveModelId={setActiveModelId}
              setActiveExteriorModelId={setActiveExteriorModelId}
              sceneRef={sceneRef}
              setModelUrl={setModelUrl}
              setUploadProgress={setUploadProgress}
              setUploadSuccess={setUploadSuccess}
              uploadProgress={uploadProgress}
            />
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}

export default SilverGreyVan;
