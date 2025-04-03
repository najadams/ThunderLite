"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface Artwork {
  id: string;
  title: string;
  artist: string;
  price: number;
  image: string;
  description: string;
  installmentOptions: {
    months: number;
    monthlyPayment: number;
  }[];
  medium: string;
  dimensions: string;
  category: string;
}

const sampleArtworks: Artwork[] = [
  {
    id: "1",
    title: "Abstract Harmony",
    artist: "Sarah Johnson",
    price: 1200,
    image: "/arts/art1.jpg",
    description:
      "A vibrant abstract piece that captures the essence of movement and color.",
    installmentOptions: [
      { months: 3, monthlyPayment: 400 },
      { months: 6, monthlyPayment: 200 },
      { months: 12, monthlyPayment: 100 },
    ],
    medium: "Acrylic on Canvas",
    dimensions: '16" x 20"',
    category: "painting",
  },
  {
    id: "2",
    title: "Urban Landscape",
    artist: "Michael Chen",
    price: 800,
    image: "/arts/art2.jpg",
    description: "Contemporary cityscape capturing the energy of urban life.",
    installmentOptions: [
      { months: 3, monthlyPayment: 267 },
      { months: 6, monthlyPayment: 133 },
      { months: 12, monthlyPayment: 67 },
    ],
    medium: "Digital Art",
    dimensions: "3000px x 4000px",
    category: "digital",
  },
  {
    id: "3",
    title: "Natural Flow",
    artist: "Emily Rodriguez",
    price: 1500,
    image: "/arts/art3.jpg",
    description:
      "Organic forms and natural colors create a sense of peace and tranquility.",
    installmentOptions: [
      { months: 3, monthlyPayment: 500 },
      { months: 6, monthlyPayment: 250 },
      { months: 12, monthlyPayment: 125 },
    ],
    medium: "Acrylic on Canvas",
    dimensions: '16" x 20"',
    category: "painting",
  },
  {
    id: "4",
    title: "Dancing Snow",
    artist: "Badr Yakub",
    price: 3500,
    image: "/arts/art4.jpg",
    description:
      "Organic forms and natural colors create a sense of peace and tranquility.",
    installmentOptions: [
      { months: 3, monthlyPayment: 500 },
      { months: 6, monthlyPayment: 250 },
      { months: 12, monthlyPayment: 125 },
    ],
    medium: "Acrylic on Canvas",
    dimensions: '16" x 20"',
    category: "digital",
  },
  {
    id: "5",
    title: "The Last Supper",
    artist: "Najm Mohammed",
    price: 4300,
    image: "/arts/art5.jpg",
    description:
      "Organic forms and natural colors create a sense of peace and tranquility.",
    installmentOptions: [
      { months: 3, monthlyPayment: 500 },
      { months: 6, monthlyPayment: 250 },
      { months: 12, monthlyPayment: 125 },
    ],
    medium: "Acrylic on Canvas",
    dimensions: '16" x 20"',
    category: "painting",
  },
  {
    id: "6",
    title: "Butterfly",
    artist: "Sasha Rodriguez",
    price: 1500,
    image: "/arts/art6.jpg",
    description:
      "Organic forms and natural colors create a sense of peace and tranquility.",
    installmentOptions: [
      { months: 3, monthlyPayment: 500 },
      { months: 6, monthlyPayment: 250 },
      { months: 12, monthlyPayment: 125 },
    ],
    medium: "Acrylic on Canvas",
    dimensions: '16" x 20"',
    category: "painting",
  },
  {
    id: "7",
    title: "Lake of the Moon",
    artist: "Fatima Al-Haj",
    price: 1200,
    image: "/arts/art7.jpg",
    description:
      "Organic forms and natural colors create a sense of peace and tranquility.",
    installmentOptions: [
      { months: 3, monthlyPayment: 500 },
      { months: 6, monthlyPayment: 250 },
      { months: 12, monthlyPayment: 125 },
    ],
    medium: "Acrylic on Canvas",
    dimensions: '16" x 20"',
    category: "drawing",
  },
];

const filters = {
  price: [
    { label: "Under $100", value: "0-100" },
    { label: "$100 - $200", value: "100-200" },
    { label: "$200 - $500", value: "200-500" },
    { label: "Over $500", value: "500+" },
  ],
  medium: [
    { label: "Painting", value: "painting" },
    { label: "Drawing", value: "drawing" },
    { label: "Digital Art", value: "digital" },
    { label: "Photography", value: "photography" },
    { label: "Sculpture", value: "sculpture" },
  ],
};

export default function Store() {
  const [selectedFilters, setSelectedFilters] = useState({
    price: "",
    medium: "",
  });
  const [sortBy, setSortBy] = useState("featured");
  const [filteredArtworks, setFilteredArtworks] = useState(sampleArtworks);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [selectedInstallment, setSelectedInstallment] = useState<number | null>(
    null
  );
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  useEffect(() => {
    let filtered = [...sampleArtworks];

    // Apply price filter
    if (selectedFilters.price) {
      const [min, max] = selectedFilters.price.split("-").map(Number);
      filtered = filtered.filter((artwork) => {
        if (max) {
          return artwork.price >= min && artwork.price <= max;
        }
        return artwork.price >= min;
      });
    }

    // Apply medium filter
    if (selectedFilters.medium) {
      filtered = filtered.filter(
        (artwork) => artwork.category === selectedFilters.medium
      );
    }

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        filtered.sort((a, b) => b.id - a.id);
        break;
      default:
        // 'featured' - no sorting needed
        break;
    }

    setFilteredArtworks(filtered);
  }, [selectedFilters, sortBy]);

  const handleFilterChange = (type, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [type]: prev[type] === value ? "" : value,
    }));
  };

  const handleAddToCart = () => {
    if (!selectedArtwork || !selectedInstallment) return;
    // TODO: Implement cart functionality
    console.log("Added to cart:", {
      artwork: selectedArtwork,
      installment: selectedInstallment,
    });
  };

  const openQuickView = (artwork) => {
    setSelectedArtwork(artwork);
    setIsQuickViewOpen(true);
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Art Store
          </h1>
          <p className="text-xl text-center max-w-2xl mx-auto">
            Purchase unique artwork from talented young artists and support
            their creative journey.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Filters and Sort */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
          <div className="flex flex-wrap gap-4">
            {/* Price Filter */}
            <div className="relative">
              <select
                className="input pr-10"
                value={selectedFilters.price}
                onChange={(e) => handleFilterChange("price", e.target.value)}>
                <option value="">Price Range</option>
                {filters.price.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Medium Filter */}
            <div className="relative">
              <select
                className="input pr-10"
                value={selectedFilters.medium}
                onChange={(e) => handleFilterChange("medium", e.target.value)}>
                <option value="">Medium</option>
                {filters.medium.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              className="input pr-10"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}>
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>

        {/* Artwork Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence>
            {filteredArtworks.map((artwork) => (
              <motion.div
                key={artwork.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="group bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative aspect-square">
                  <Image
                    src={artwork.image}
                    alt={artwork.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300">
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex gap-3">
                        <button
                          onClick={() => openQuickView(artwork)}
                          className="bg-white text-gray-900 px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors duration-200">
                          Quick View
                        </button>
                        <button className="bg-indigo-600 text-white px-4 py-2 rounded-md font-medium hover:bg-indigo-700 transition-colors duration-200">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors duration-200">
                    {artwork.title}
                  </h3>
                  <p className="text-gray-600 mt-1">{artwork.artist}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xl font-bold text-indigo-600">
                      ${artwork.price}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">
                        {artwork.medium}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Quick View Modal */}
        {isQuickViewOpen && selectedArtwork && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-lg max-w-4xl w-full overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/2 relative aspect-square">
                  <Image
                    src={selectedArtwork.image}
                    alt={selectedArtwork.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="w-full md:w-1/2 p-8">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        {selectedArtwork.title}
                      </h2>
                      <p className="text-gray-600 mt-1">
                        {selectedArtwork.artist}
                      </p>
                    </div>
                    <button
                      onClick={() => setIsQuickViewOpen(false)}
                      className="text-gray-400 hover:text-gray-500 transition-colors duration-200">
                      <span className="sr-only">Close</span>
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="mt-6">
                    <p className="text-3xl font-bold text-indigo-600">
                      ${selectedArtwork.price}
                    </p>
                    <div className="mt-6 space-y-4">
                      <div className="space-y-2">
                        <p className="flex items-center gap-2">
                          <span className="font-medium text-gray-900">
                            Medium:
                          </span>
                          <span className="text-gray-600">
                            {selectedArtwork.medium}
                          </span>
                        </p>
                        <p className="flex items-center gap-2">
                          <span className="font-medium text-gray-900">
                            Dimensions:
                          </span>
                          <span className="text-gray-600">
                            {selectedArtwork.dimensions}
                          </span>
                        </p>
                      </div>
                      <p className="text-gray-600">
                        {selectedArtwork.description}
                      </p>
                      <div className="flex gap-4 mt-6">
                        <button
                          onClick={handleAddToCart}
                          disabled={selectedInstallment === null}
                          className="btn-primary flex-1">
                          Add to Cart
                        </button>
                        <button className="btn-secondary flex-1">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
