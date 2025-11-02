import React, { useEffect, useState } from "react";
import Productcard from "./Productcard";
import axios from "../lib/axios";
import toast from "react-hot-toast";
import LoadingSpinner from "./LoadingSpinner";

function PeopleAlsoBought({ hideAddToCart = false }) {
  const [recommandations, setRecommandations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecommandations = async () => {
      try {
        const res = await axios.get("/products/recommandations");
        setRecommandations(res.data);
      } catch (error) {
        console.log(error);
        toast.error(
          error.response?.data?.message ||
            "Error occured on fetching recommandations"
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchRecommandations();
  }, []);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="mt-12">
      <h3 className="mb-6 text-2xl font-semibold text-emerald-600">
        People Also Bought
      </h3>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {recommandations.map((product) => (
          <Productcard
            key={product._id}
            product={product}
            hideAddToCart={hideAddToCart}
          />
        ))}
      </div>
    </div>
  );
}

export default PeopleAlsoBought;
