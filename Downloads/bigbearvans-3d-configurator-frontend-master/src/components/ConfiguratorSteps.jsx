import React, { useState } from "react";

import Ceiling from "./model-components/Ceiling";
import DinetteBed from "./model-components/DinetteBed";
import DinetteCushionSet from "./model-components/DinetteCushionSet";
import Elevatorbed from "./model-components/Elevatorbed";
import JumpSeat from "./model-components/JumpSeat";
import Kitchen from "./model-components/Kitchen";
import MaxxAirFan from "./model-components/MaxxAirFan";
import Microwave from "./model-components/Microwave";

const MAX_QUANTITY = {
  ceiling: 1,
  bed: 3,
  seat: 2,
  kitchen: 1,
  ventilation: 1,
  "kitchen-appliance": 1,
};

const stepsData = [
  {
    id: 1,
    title: "Exterior Customizations",
    description: "Enhance your van’s functionality and appearance.",
    options: [
      { label: "Dinette Bed", image: "/images/dinettebed.webp", component: DinetteBed, type: "bed" },
      { label: "Dinette Cushion Set", image: "/images/cushion-bed.webp", component: DinetteCushionSet, type: "bed" },
      { label: "Elevator Bed", image: "/images/elevatorbed.webp", component: Elevatorbed, type: "bed" },
    ],
  },
  {
    id: 2,
    title: "Interior Layout & Partitioning",
    description: "Organize your van’s interior space for privacy & openness.",
    options: [
      { label: "Jump Seat", image: "/images/jump-seat.webp", component: JumpSeat, type: "seat" },
      { label: "Kitchen", image: "/images/kitchen.webp", component: Kitchen, type: "kitchen" },
    ],
  },
  {
    id: 3,
    title: "Ceiling Panels",
    description: "Choose the best ceiling panels for your van.",
    options: [{ label: "Ceiling", image: "/images/ceiling.webp", component: Ceiling, type: "ceiling" }],
  },
  {
    id: 4,
    title: "Flooring",
    description: "Choose a flooring option.",
    options: [
      { label: "MaxxAir Fan", image: "/images/max-air-fan.webp", component: MaxxAirFan, type: "ventilation" },
      { label: "Microwave", image: "/images/microwave.webp", component: Microwave, type: "kitchen-appliance" },
    ],
  },
];

const ConfiguratorSteps = ({
  addModelToScene,
  addExteriorModelToScene,
  removeModelFromScene,
  getAddedQuantity,
  incrementModelQuantity,
  decrementModelQuantity,
  addedModels,
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNextStep = () => {
    if (currentStep < stepsData.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleAddPart = (option) => {
    const currentQuantity = getAddedQuantity(option.label);

    // Restrict addition if max quantity is reached
    if (currentQuantity >= MAX_QUANTITY[option.type]) return;

    const newModel = {
      ...option,
      id: Date.now(),
      position: [0, 0, 0],
      quantity: currentQuantity + 1,
    };

    if (stepsData[currentStep].id === 1) {
      addExteriorModelToScene(newModel);
    } else {
      addModelToScene(newModel);
    }
  };

  const handleRemovePart = (option) => {
    const currentQuantity = getAddedQuantity(option.label);

    if (currentQuantity === 0) return;

    removeModelFromScene(option.label);
  };

  return (
    <div className="bbv-sidebar">
      {/* Sticky Progress Bar */}
      <div className="progress-container">
        <div className="progress px-1" style={{ height: "3px" }}>
          <div className="progress-bar" role="progressbar" style={{ width: `${(currentStep / (stepsData.length - 1)) * 100}%` }}></div>
        </div>
      </div>

      {/* Sticky Step Title & Description */}
      <div className="step-info-container">
        <h2 className="sub-heading">Step {stepsData[currentStep].id}:</h2>
        <h4 className="main-content">{stepsData[currentStep].title}</h4>
        <p className="para">{stepsData[currentStep].description}</p>
        <hr style={{ color: "#fff" }} />
      </div>

      {/* Step Content */}
      <div className="step-content">
        {stepsData[currentStep].options.map((option, index) => {
          const quantity = getAddedQuantity(option.label);

          return (
            <div key={index} className="bbv-parts py-2 d-flex align-items-center justify-content-between">
              <div className="part-img" style={{ width: "150px", height: "150px", overflow: "hidden" }}>
                <img src={option.image} alt={option.label} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "10px" }} />
              </div>
              <div className="part-content p-2">
                <p className="para"><b>{option.label}</b></p>

                {/* Quantity Controls */}
                <div className="quantity-controls">
                  <button className="btn btn-sm btn-secondary" onClick={() => handleRemovePart(option)} disabled={quantity === 0}>
                    -
                  </button>
                  <span className="quantity">{quantity}</span>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => handleAddPart(option)}
                    disabled={quantity >= MAX_QUANTITY[option.type]}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* <ConfiguratorSteps
        models={models} 
        addModelToScene={addModelToScene}
        addedModels={addedModels}
        addExteriorModelToScene={addExteriorModelToScene}
        setActiveModelId={setActiveModelId} 
        removeModelFromScene={removeModelFromScene}
        incrementModelQuantity={incrementModelQuantity}
        decrementModelQuantity={decrementModelQuantity}
        getAddedQuantity={getAddedQuantity}
      /> */}

      {/* Sticky Bottom Navigation */}
      <div className="pagination-container">
        <div className="pagination justify-content-between">
          <button className="btn btn-secondary" onClick={handlePreviousStep} disabled={currentStep === 0}>
            &laquo; Previous
          </button>
          <button className="btn btn-primary" onClick={handleNextStep} disabled={currentStep === stepsData.length - 1}>
            Next &raquo;
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfiguratorSteps;
