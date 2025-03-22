import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function FriendshipAlgorithmApp() {
  const [relationships, setRelationships] = useState([]);
  const [form, setForm] = useState({ name: "", time: "", closeness: "", experiences: "", reciprocity: "", growth: "" });

  const calculateScore = (rel) => {
    return (
      rel.time * 0.3 +
      rel.closeness * 0.25 +
      rel.experiences * 0.2 +
      rel.reciprocity * 0.15 +
      rel.growth * 0.1
    ).toFixed(2);
  };

  const getEmoji = (score) => {
    if (score >= 8) return "💖";
    if (score >= 6) return "😊";
    if (score >= 4) return "🤝";
    return "💬";
  };

  const addRelationship = () => {
    const score = calculateScore(form);
    setRelationships([...relationships, { ...form, score, emoji: getEmoji(score) }]);
    setForm({ name: "", time: "", closeness: "", experiences: "", reciprocity: "", growth: "" });
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-4">🌟 Friendship Algorithm 🌟</h1>
      <div className="grid gap-2 mb-4">
        {Object.keys(form).map((key) => (
          key !== "score" && (
            <input
              key={key}
              type="number"
              placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
              className="border p-2 rounded"
              value={form[key]}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            />
          )
        ))}
        <Button onClick={addRelationship} className="bg-blue-500 text-white">➕ Add Relationship</Button>
      </div>

      <div className="space-y-4">
        {relationships.map((rel, index) => (
          <Card key={index} className="p-4 border rounded shadow flex items-center gap-2">
            <span className="text-2xl">{rel.emoji}</span>
            <CardContent>
              <h2 className="font-bold text-lg">{rel.name}</h2>
              <p>Score: {rel.score}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}