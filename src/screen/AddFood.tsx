import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { foodService } from "../services/foodService";

const COMMON_CATEGORIES = [
  "Biryani/Rice",
  "Pizza",
  "Burger",
  "Starter",
  "Main Course",
  "Curry",
  "Beverages",
  "Dessert",
  "Snacks",
];

export default function AddFood() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "Biryani/Rice",
    customCategory: "",
    description: "",
    halfPrice: "",
    fullPrice: "",
    singlePrice: "",
  });

  const [priceType, setPriceType] = useState<"portions" | "single">("portions");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage("");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setErrorMessage("Please select a valid image file (JPEG, PNG, WEBP, etc.)");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage("Image size must be less than 5MB");
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    if (errorMessage) setErrorMessage("");
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
      setImagePreview(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      category: "Biryani/Rice",
      customCategory: "",
      description: "",
      halfPrice: "",
      fullPrice: "",
      singlePrice: "",
    });
    handleRemoveImage();
    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    // Form validations
    if (!formData.name.trim()) {
      setErrorMessage("Food name is required");
      return;
    }

    const selectedCategory =
      formData.category === "custom"
        ? formData.customCategory.trim()
        : formData.category;

    if (!selectedCategory) {
      setErrorMessage("Please select or enter a category");
      return;
    }

    if (!formData.description.trim()) {
      setErrorMessage("Food description is required");
      return;
    }

    if (!imageFile) {
      setErrorMessage("Please upload an image for the food item");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name.trim());
    data.append("category", selectedCategory);
    data.append("CategoryName", selectedCategory); // Compatible with both conventions
    data.append("description", formData.description.trim());
    data.append("image", imageFile);

    if (priceType === "single") {
      if (!formData.singlePrice || Number(formData.singlePrice) <= 0) {
        setErrorMessage("Please enter a valid price");
        return;
      }
      data.append("price", formData.singlePrice);
      data.append(
        "options",
        JSON.stringify([{ regular: formData.singlePrice }])
      );
    } else {
      if (!formData.halfPrice && !formData.fullPrice) {
        setErrorMessage("Please enter at least Half or Full price");
        return;
      }
      const portionOptions: Record<string, string> = {};
      if (formData.halfPrice) portionOptions.half = formData.halfPrice;
      if (formData.fullPrice) portionOptions.full = formData.fullPrice;

      data.append("options", JSON.stringify([portionOptions]));
      // Fallback single price field if backend expects price
      data.append("price", formData.fullPrice || formData.halfPrice);
    }

    setLoading(true);

    try {
      const response = await foodService.addFood(data);
      setSuccessMessage(
        response.message || "Food item added successfully!"
      );
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to add food item. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-dark text-white">
      <Navbar />

      <main className="container flex-grow-1 py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8">
            <div
              className="card shadow-lg p-4 p-md-5 rounded-4 border-0"
              style={{ backgroundColor: "#1e1e24", color: "#f8f9fa" }}
            >
              {/* Header */}
              <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom border-secondary">
                <div>
                  <h2 className="fw-bold mb-1 text-success">Add New Food Item 🍲</h2>
                  <p className="text-secondary small mb-0">
                    Fill in the food details and upload an image
                  </p>
                </div>
                <Link to="/home" className="btn btn-outline-secondary btn-sm">
                  ← Back to Home
                </Link>
              </div>

              {/* Success Notification */}
              {successMessage && (
                <div className="alert alert-success py-3 px-4 rounded-3 mb-4" role="alert">
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <h5 className="alert-heading mb-1">Success! 🎉</h5>
                      <p className="mb-0 small">{successMessage}</p>
                    </div>
                  </div>
                  <hr className="my-2" />
                  <div className="d-flex gap-2 mt-2">
                    <button className="btn btn-success btn-sm" onClick={resetForm}>
                      + Add Another Food
                    </button>
                    <button
                      className="btn btn-outline-light btn-sm"
                      onClick={() => navigate("/home")}
                    >
                      View in Home
                    </button>
                  </div>
                </div>
              )}

              {/* Error Notification */}
              {errorMessage && (
                <div
                  className="alert alert-danger py-2 px-3 small rounded-3 mb-4 d-flex align-items-center justify-content-between"
                  role="alert"
                >
                  <span>{errorMessage}</span>
                  <button
                    type="button"
                    className="btn-close btn-close-sm"
                    aria-label="Close"
                    onClick={() => setErrorMessage("")}
                  ></button>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} noValidate>
                {/* Food Name */}
                <div className="mb-3">
                  <label htmlFor="name" className="form-label small fw-semibold text-light">
                    Food Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control bg-dark text-white border-secondary"
                    placeholder="e.g. Chicken Biryani, Paneer Tikka..."
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Category Selection */}
                <div className="row g-3 mb-3">
                  <div className="col-12 col-sm-6">
                    <label htmlFor="category" className="form-label small fw-semibold text-light">
                      Category <span className="text-danger">*</span>
                    </label>
                    <select
                      id="category"
                      name="category"
                      className="form-select bg-dark text-white border-secondary"
                      value={formData.category}
                      onChange={handleInputChange}
                    >
                      {COMMON_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                      <option value="custom">+ Other / Custom Category</option>
                    </select>
                  </div>

                  {formData.category === "custom" && (
                    <div className="col-12 col-sm-6">
                      <label htmlFor="customCategory" className="form-label small fw-semibold text-light">
                        Custom Category Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="customCategory"
                        name="customCategory"
                        className="form-control bg-dark text-white border-secondary"
                        placeholder="Enter category name"
                        value={formData.customCategory}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  )}
                </div>

                {/* Pricing Type Toggle */}
                <div className="mb-3">
                  <label className="form-label small fw-semibold text-light d-block">
                    Pricing Mode <span className="text-danger">*</span>
                  </label>
                  <div className="btn-group w-100" role="group">
                    <button
                      type="button"
                      className={`btn btn-sm ${
                        priceType === "portions"
                          ? "btn-success fw-semibold"
                          : "btn-outline-secondary"
                      }`}
                      onClick={() => setPriceType("portions")}
                    >
                      Portions (Half / Full)
                    </button>
                    <button
                      type="button"
                      className={`btn btn-sm ${
                        priceType === "single"
                          ? "btn-success fw-semibold"
                          : "btn-outline-secondary"
                      }`}
                      onClick={() => setPriceType("single")}
                    >
                      Single / Fixed Price
                    </button>
                  </div>
                </div>

                {/* Pricing Inputs */}
                {priceType === "portions" ? (
                  <div className="row g-3 mb-3">
                    <div className="col-12 col-sm-6">
                      <label htmlFor="halfPrice" className="form-label small fw-semibold text-light">
                        Half Portion Price (₹)
                      </label>
                      <div className="input-group">
                        <span className="input-group-text bg-dark text-white border-secondary">₹</span>
                        <input
                          type="number"
                          id="halfPrice"
                          name="halfPrice"
                          min="0"
                          step="1"
                          className="form-control bg-dark text-white border-secondary"
                          placeholder="e.g. 130"
                          value={formData.halfPrice}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-sm-6">
                      <label htmlFor="fullPrice" className="form-label small fw-semibold text-light">
                        Full Portion Price (₹)
                      </label>
                      <div className="input-group">
                        <span className="input-group-text bg-dark text-white border-secondary">₹</span>
                        <input
                          type="number"
                          id="fullPrice"
                          name="fullPrice"
                          min="0"
                          step="1"
                          className="form-control bg-dark text-white border-secondary"
                          placeholder="e.g. 250"
                          value={formData.fullPrice}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="mb-3">
                    <label htmlFor="singlePrice" className="form-label small fw-semibold text-light">
                      Price (₹) <span className="text-danger">*</span>
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-dark text-white border-secondary">₹</span>
                      <input
                        type="number"
                        id="singlePrice"
                        name="singlePrice"
                        min="0"
                        step="1"
                        className="form-control bg-dark text-white border-secondary"
                        placeholder="e.g. 199"
                        value={formData.singlePrice}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                )}

                {/* Description */}
                <div className="mb-3">
                  <label htmlFor="description" className="form-label small fw-semibold text-light">
                    Description <span className="text-danger">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    className="form-control bg-dark text-white border-secondary"
                    placeholder="Describe ingredients, flavor, spice level, serving style..."
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Food Image Upload */}
                <div className="mb-4">
                  <label htmlFor="foodImage" className="form-label small fw-semibold text-light">
                    Food Image <span className="text-danger">*</span>
                  </label>
                  <input
                    type="file"
                    id="foodImage"
                    ref={fileInputRef}
                    accept="image/*"
                    className="form-control bg-dark text-white border-secondary"
                    onChange={handleImageChange}
                    required
                  />
                  <small className="text-secondary d-block mt-1">
                    Upload JPEG, PNG, or WEBP image up to 5MB (processed via Multer backend).
                  </small>

                  {/* Image Preview */}
                  {imagePreview && (
                    <div className="mt-3 p-2 bg-dark rounded border border-secondary position-relative d-inline-block">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="rounded"
                        style={{ maxHeight: "200px", maxWidth: "100%", objectFit: "cover" }}
                      />
                      <button
                        type="button"
                        className="btn btn-danger btn-sm position-absolute top-0 end-0 m-2"
                        onClick={handleRemoveImage}
                        title="Remove image"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-success w-100 py-2 fw-semibold rounded-3 d-flex justify-content-center align-items-center gap-2"
                >
                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      <span>Uploading & Saving Food Item...</span>
                    </>
                  ) : (
                    "Save & Add Food Item"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
