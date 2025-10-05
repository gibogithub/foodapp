import { useEffect, useState } from "react";

const API_KEY = "d2e1cfc017144109b23ed08779c5a85b";

export default function FoodDetail({ foodId }) {
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!foodId) return;
    setLoading(true);
    fetch(
      `https://api.spoonacular.com/recipes/${foodId}/information?apiKey=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        setDetail(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [foodId]);

  if (loading) return <div>Loading...</div>;
  if (!detail) return <div>No details found.</div>;

  // Extract steps from analyzedInstructions
  const steps =
    detail.analyzedInstructions &&
    detail.analyzedInstructions[0] &&
    detail.analyzedInstructions[0].steps
      ? detail.analyzedInstructions[0].steps
      : [];

  return (
    <div>
      <h2>{detail.title}</h2>
      <img
        src={detail.image}
        alt={detail.title}
        style={{ maxWidth: "100%" }}
      />
      <p dangerouslySetInnerHTML={{ __html: detail.summary }} />
      {steps.length > 0 && (
        <div>
          <h3>Preparation Steps</h3>
          <ol>
            {steps.map((step) => (
              <li key={step.number}>{step.step}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
