import React from "react";

const Interior = ({
  models,
  addModelToScene,
  addedModels,
  removeModelFromScene,
  incrementModelQuantity,
  decrementModelQuantity,
  getAddedQuantity,
}) => {
  return (
    <div className="container">
      <div className="model-list row">
        {models.map((model) => {
          const quantity = getAddedQuantity(model.label);
          return (
            <div key={model.id || model.label} className="col-12 mb-3">
              <div className="card h-100">
                <img
                  src={model.image}
                  alt={model.label}
                  className="card-img-top"
                  style={{ objectFit: "cover", height: "150px" }}
                />
                <div className="card-body text-center">
                  <h6 className="card-title">{model.label}</h6>
                  {quantity > 0 ? (
                    <div className="d-flex align-items-center justify-content-center">
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => decrementModelQuantity(model.label)}
                      >
                        –
                      </button>
                      <span className="px-2">{quantity}</span>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => incrementModelQuantity(model)}
                        disabled={model.stock && quantity >= model.stock}
                      >
                        +
                      </button>
                      <button
                        className="btn btn-outline-danger btn-sm ms-2"
                        onClick={() => removeModelFromScene(model.label)}
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => addModelToScene(model)}
                      className="btn btn-primary btn-sm"
                      disabled={model.stock === 0}
                    >
                      {model.stock === 0 ? "Out of Stock" : "Add"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Interior;
